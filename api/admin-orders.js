// api/admin-orders.js
// Vercel serverless function — returns the latest retail orders to the owner-only admin page
// (admin-orders.html) so you can print the customer invoice and the shipping label.
//
// SECURITY: retail_orders holds customer names, phones and addresses, so this endpoint is locked
// with a password that only exists as a Vercel environment variable (never in any file):
//   ADMIN_PASSWORD  -> choose a long one (12+ characters)
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  -> already set for create-order.js
// If ADMIN_PASSWORD is not set this endpoint stays closed (503).

'use strict';
const crypto = require('crypto');
const { getSupabaseAdmin } = require('./_supabase-admin');
const SIGNATURE = require('./_signature');

const ALLOWED_ORIGINS = ['https://akkspices.in', 'https://www.akkspices.in'];

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const round2 = (n) => Math.round(n * 100) / 100;
const txt = (v, max) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, max);

// Manual order (a retailer who ordered by phone/WhatsApp, not on the website) -> saved in retail_orders with an
// order_ref starting "MAN-", so you can print its Tax Invoice from the admin page. All amounts are recalculated here.
function buildManualOrder(o) {
  o = o || {};
  const name = txt(o.name, 80);
  if (name.length < 2) throw new Error('Retailer / shop name is required.');
  const address = txt(o.address, 300), city = txt(o.city, 80), state = txt(o.state, 60);
  if (address.length < 4 || city.length < 2 || !state) throw new Error('Address, city and state are required.');
  const pin = txt(o.pin, 10);
  if (!/^\d{6}$/.test(pin)) throw new Error('PIN code must be 6 digits.');
  const gstin = txt(o.gstin, 20).toUpperCase();
  if (gstin && !/^[0-9A-Z]{15}$/.test(gstin)) throw new Error('GSTIN must be 15 letters/digits (or leave it empty).');
  const payment = ['UPI', 'Cash', 'Bank transfer', 'Pending'].includes(o.payment) ? o.payment : 'Pending';

  const lines = Array.isArray(o.lines) ? o.lines : [];
  if (lines.length < 1 || lines.length > 30) throw new Error('Add 1 to 30 item lines.');
  let subtotal = 0;
  const items = lines.map((l) => {
    const product = txt(l && l.product, 80), size = txt(l && l.size, 40);
    const qty = Number(l && l.qty), rate = Number(l && l.rate);
    if (!product) throw new Error('Every item needs a product name.');
    if (!Number.isInteger(qty) || qty < 1 || qty > 100000) throw new Error('Quantity must be a whole number (1 or more).');
    if (!(rate > 0) || rate > 1000000) throw new Error('Rate must be more than 0.');
    const lineTotal = round2(rate * qty);
    subtotal += lineTotal;
    return { key: 'manual', product, size, price: round2(rate), qty, lineTotal };
  });
  subtotal = round2(subtotal);
  const delivery = round2(Number(o.delivery) || 0);
  if (delivery < 0 || delivery > 100000) throw new Error('Delivery charge is not valid.');
  if (delivery > 0) items.push({ key: 'delivery', product: 'Delivery / transport charges', size: '', price: delivery, qty: 1, lineTotal: delivery });
  items.push({ key: 'meta', gstin, contact: txt(o.contact, 80), payment });

  let createdAt = null;
  if (o.date) {
    const d = new Date(String(o.date) + 'T12:00:00+05:30');
    if (isNaN(d) || d.getFullYear() < 2024 || d.getTime() > Date.now() + 36e5 * 36) throw new Error('Invoice date is not valid.');
    createdAt = d.toISOString();
  }
  const id = crypto.randomUUID();
  const ist = new Date(Date.now() + 5.5 * 36e5).toISOString().slice(2, 10).replace(/-/g, '');
  const row = {
    id,
    order_ref: 'MAN-' + ist + '-' + crypto.randomBytes(2).toString('hex').toUpperCase(),
    items,
    subtotal,
    discount: 0,
    total_amount: round2(subtotal + delivery),
    customer_name: name,
    customer_phone: txt(o.phone, 20),
    address_line: address,
    city,
    state,
    pincode: pin,
    status: payment === 'Pending' ? 'placed' : 'confirmed',
  };
  if (createdAt) row.created_at = createdAt;
  return row;
}

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return res.status(503).json({ error: 'admin_not_configured' });

  const { password } = req.body || {};
  if (typeof password !== 'string' || !safeEqual(password, expected)) {
    await sleep(900); // slows down password guessing
    return res.status(401).json({ error: 'wrong_password' });
  }

  const admin = getSupabaseAdmin();
  if (!admin) return res.status(503).json({ error: 'not_configured' });

  const { action } = req.body || {};
  try {
    if (action === 'create_manual') {
      let row;
      try { row = buildManualOrder(req.body.order); } catch (e) { return res.status(400).json({ error: e.message }); }
      const ins = await admin.from('retail_orders').insert(row).select().single();
      if (ins.error) throw ins.error;
      return res.status(200).json({ ok: true, order: ins.data });
    }
    if (action === 'delete_manual') {
      const id = String((req.body || {}).id || '');
      if (!/^[0-9a-f-]{36}$/i.test(id)) return res.status(400).json({ error: 'bad_id' });
      // only manual entries (order_ref MAN-...) can be deleted here; website orders are never touched
      const del = await admin.from('retail_orders').delete().eq('id', id).like('order_ref', 'MAN-%');
      if (del.error) throw del.error;
      return res.status(200).json({ ok: true });
    }

    const { data, error } = await admin
      .from('retail_orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);
    if (error) throw error;

    // Distributor / Retailer orders, each with the partner's business + address details (for the shipping label)
    let partnerOrders = [];
    const po = await admin.from('partner_orders').select('*').order('created_at', { ascending: false }).limit(300);
    if (!po.error && po.data && po.data.length) {
      const ids = [...new Set(po.data.map((o) => o.partner_id).filter(Boolean))];
      const pr = await admin.from('partners')
        .select('id, business_name, contact_name, phone, partner_type, district, address_line, city, state, pincode, delivery_address')
        .in('id', ids);
      const byId = {};
      (pr.data || []).forEach((p) => { byId[p.id] = p; });
      partnerOrders = po.data.map((o) => ({ ...o, partner: byId[o.partner_id] || null }));
    }
    return res.status(200).json({ orders: data || [], partnerOrders, signature: SIGNATURE });
  } catch (err) {
    console.error('admin-orders error:', err);
    return res.status(500).json({ error: 'Failed to load orders' });
  }
};
