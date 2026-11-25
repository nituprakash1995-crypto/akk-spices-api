// api/create-order.js
// Vercel serverless function — records an order (status "placed") and returns the TRUSTED amount
// that the customer / partner must pay by UPI.
//
// SECURITY: the browser only tells us WHAT is being bought (retail cart items, or which
// distributor kit) — never how much it costs. The amount is always computed here from
// api/_pricing.js, so a tampered request from DevTools cannot change the amount shown to pay.
//
// There is no payment gateway any more: the customer pays by UPI (QR / UPI app) using the amount
// returned here, and YOU confirm the payment in your UPI app / bank, then change the order's
// status to "confirmed" in Supabase (Table Editor). See SUPABASE-SETUP.md.
//
// Needs env vars (Vercel: Settings -> Environment Variables):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// If they are missing this returns 503 and the website falls back to a WhatsApp order.

'use strict';
const crypto = require('crypto');
const { computeRetailOrder, computeKitOrder, computePartnerOrder, isRetailerAreaOpen } = require('./_pricing');
const { getSupabaseAdmin } = require('./_supabase-admin');

// ---------- Anti-spam / abuse protection ----------
// Only the real website may call this from a browser. (Add other domains via the EXTRA_ORIGINS env var,
// comma separated, e.g. a Vercel preview URL while testing.)
const ALLOWED_ORIGINS = ['https://akkspices.in', 'https://www.akkspices.in']
  .concat(String(process.env.EXTRA_ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean));

// Best-effort per-IP limiter (memory of one serverless instance — slows bursts; the database limits below are the real guard).
const ipHits = new Map();
function ipLimited(req) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'x').split(',')[0].trim();
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  hits.push(now);
  ipHits.set(ip, hits);
  if (ipHits.size > 5000) ipHits.clear();
  return hits.length > 8 || hits.filter(t => now - t < 60 * 1000).length > 3;
}

const iso = ms => new Date(Date.now() - ms).toISOString();
async function countRecent(admin, table, filters, ms) {
  let q = admin.from(table).select('id', { count: 'exact', head: true }).gte('created_at', iso(ms));
  for (const [k, v] of Object.entries(filters)) q = q.eq(k, v);
  const { count, error } = await q;
  if (error) throw error;
  return count || 0;
}

function cleanPhone(raw) {
  let d = String(raw || '').replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

// Short reference that goes into the UPI payment note, so you can match a payment to an order.
function makeRef(id) {
  return 'AKK-' + String(id).replace(/-/g, '').slice(0, 8).toUpperCase();
}

// Partner orders: the caller must be logged in as that partner (Supabase access token in the Authorization header).
async function partnerAuthOk(admin, req, partnerId) {
  const m = /^Bearer\s+(.+)$/i.exec(String(req.headers.authorization || ''));
  if (!m) return false;
  const { data, error } = await admin.auth.getUser(m[1]);
  return !error && !!data && !!data.user && data.user.id === partnerId;
}

module.exports = async (req, res) => {
  const origin = req.headers.origin || '';
  if (origin && ALLOWED_ORIGINS.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return res.status(403).json({ error: 'forbidden_origin' });
  if (ipLimited(req)) return res.status(429).json({ error: 'too_many_requests' });

  const admin = getSupabaseAdmin();
  if (!admin) return res.status(503).json({ error: 'not_configured' });

  const { type } = req.body || {};

  try {
    const id = crypto.randomUUID();
    const orderRef = makeRef(id);

    if (type === 'retail') {
      const { items, customer, website } = req.body || {};
      const c = customer || {};
      if (website) return res.status(400).json({ error: 'invalid_request' }); // honeypot: real customers never fill this hidden field
      const name = `${c.fname || ''} ${c.lname || ''}`.trim();
      if (name.length < 2 || name.length > 80) return res.status(400).json({ error: 'missing_customer_details' });
      const phone = cleanPhone(c.phone);
      if (!phone) return res.status(400).json({ error: 'invalid_phone' });
      if (!/^\d{6}$/.test(String(c.pin || '').trim())) return res.status(400).json({ error: 'invalid_pin' });
      if (String(c.address || '').trim().length < 8 || String(c.city || '').trim().length < 2) return res.status(400).json({ error: 'invalid_address' });
      if (!Array.isArray(items) || items.length > 9 || new Set(items.map(i => i && i.key)).size !== items.length) return res.status(400).json({ error: 'invalid_items' });

      // Same phone: max 3 unpaid ("placed") orders per hour. Whole shop: max 30 unpaid orders per 10 minutes.
      if (await countRecent(admin, 'retail_orders', { customer_phone: phone, status: 'placed' }, 60 * 60 * 1000) >= 3) return res.status(429).json({ error: 'too_many_orders' });
      if (await countRecent(admin, 'retail_orders', { status: 'placed' }, 10 * 60 * 1000) >= 30) return res.status(429).json({ error: 'busy' });

      const computed = computeRetailOrder(items, { pin: c.pin, state: c.state });
      if (!computed.total || computed.total <= 0) return res.status(400).json({ error: 'invalid_amount' });

      const { error } = await admin.from('retail_orders').insert({
        id,
        order_ref: orderRef,
        // delivery is stored as its own line so subtotal - discount + delivery = total_amount
        items: computed.deliveryCharge > 0
          ? [...computed.lineItems, { key: 'delivery', product: 'Delivery charge (India Post)', size: computed.parcelWeightG + 'g parcel', price: computed.deliveryCharge, qty: 1, lineTotal: computed.deliveryCharge }]
          : computed.lineItems, // Samastipur Town: hand delivery, no delivery line
        subtotal: computed.subtotal,
        discount: computed.discount,
        total_amount: computed.total,
        customer_name: name,
        customer_phone: phone,
        address_line: String(c.address || '').slice(0, 300),
        city: String(c.city || '').slice(0, 80),
        state: String(c.state || '').slice(0, 80),
        pincode: String(c.pin || '').slice(0, 10),
        status: 'placed',
      });
      if (error) throw error;

      return res.status(200).json({ local_order_id: id, order_ref: orderRef, computed_total: computed.total });
    }

    if (type === 'kit') {
      const { kit_name, partner_id } = req.body || {};
      if (!kit_name || !partner_id) return res.status(400).json({ error: 'missing_fields' });
      if (!(await partnerAuthOk(admin, req, partner_id))) return res.status(401).json({ error: 'login_required' });
      if (await countRecent(admin, 'partner_orders', { partner_id, status: 'placed' }, 60 * 60 * 1000) >= 8) return res.status(429).json({ error: 'too_many_orders' });

      // Confirm this is a real, approved partner before creating any order.
      const { data: partner, error: partnerErr } = await admin
        .from('partners').select('id, status, business_name, pincode').eq('id', partner_id).single();
      if (partnerErr || !partner) return res.status(400).json({ error: 'partner_not_found' });
      if (partner.status !== 'approved') return res.status(403).json({ error: 'partner_not_approved' });

      const computed = computeKitOrder(kit_name, partner.pincode); // Samastipur Town: no delivery charge

      const { error } = await admin.from('partner_orders').insert({
        id,
        order_ref: orderRef,
        partner_id,
        items: computed.items,
        total_amount: computed.total,
        status: 'placed',
      });
      if (error) throw error;

      return res.status(200).json({ local_order_id: id, order_ref: orderRef, computed_total: computed.total });
    }

    if (type === 'partner_order') {
      // Distributor / Retailer custom order (quantities in bundles) — priced here, paid by UPI
      const { partner_id, items: lines, hanger } = req.body || {};
      if (!partner_id || !Array.isArray(lines) || lines.length > 30) return res.status(400).json({ error: 'missing_fields' });
      if (!(await partnerAuthOk(admin, req, partner_id))) return res.status(401).json({ error: 'login_required' });
      if (await countRecent(admin, 'partner_orders', { partner_id, status: 'placed' }, 60 * 60 * 1000) >= 8) return res.status(429).json({ error: 'too_many_orders' });
      const { data: partner, error: partnerErr } = await admin
        .from('partners').select('id, status, business_name, partner_type, pincode, district').eq('id', partner_id).single();
      if (partnerErr || !partner) return res.status(400).json({ error: 'partner_not_found' });
      if (partner.status !== 'approved') return res.status(403).json({ error: 'partner_not_approved' });
      if (partner.partner_type === 'retailer' && !isRetailerAreaOpen(partner)) return res.status(403).json({ error: 'area_not_served' });

      const computed = computePartnerOrder(lines, partner.partner_type, partner.pincode, !!hanger);

      const { error } = await admin.from('partner_orders').insert({
        id,
        order_ref: orderRef,
        partner_id,
        items: computed.items,
        total_amount: computed.total,
        status: 'placed',
      });
      if (error) throw error;

      return res.status(200).json({ local_order_id: id, order_ref: orderRef, computed_total: computed.total });
    }

    return res.status(400).json({ error: 'invalid_type' });
  } catch (err) {
    console.error('create-order error:', err);
    const known = ['empty_cart', 'unknown_product', 'invalid_qty', 'invalid_kit', 'area_not_served'];
    if (known.includes(err.message)) return res.status(400).json({ error: err.message });
    return res.status(500).json({ error: 'Failed to create order' });
  }
};
