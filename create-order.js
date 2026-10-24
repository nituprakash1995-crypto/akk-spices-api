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
// If they are missing this returns 503 and the website falls back to a WhatsApp pre-order.

'use strict';
const crypto = require('crypto');
const { computeRetailOrder, computeKitOrder } = require('./_pricing');
const { getSupabaseAdmin } = require('./_supabase-admin');

// Short reference that goes into the UPI payment note, so you can match a payment to an order.
function makeRef(id) {
  return 'AKK-' + String(id).replace(/-/g, '').slice(0, 8).toUpperCase();
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const admin = getSupabaseAdmin();
  if (!admin) return res.status(503).json({ error: 'not_configured' });

  const { type } = req.body || {};

  try {
    const id = crypto.randomUUID();
    const orderRef = makeRef(id);

    if (type === 'retail') {
      const { items, coupon, customer } = req.body || {};
      const c = customer || {};
      const name = `${c.fname || ''} ${c.lname || ''}`.trim();
      if (!name || !c.phone) return res.status(400).json({ error: 'missing_customer_details' });

      const computed = computeRetailOrder(items, coupon);
      if (!computed.total || computed.total <= 0) return res.status(400).json({ error: 'invalid_amount' });

      const { error } = await admin.from('retail_orders').insert({
        id,
        order_ref: orderRef,
        items: computed.lineItems,
        subtotal: computed.subtotal,
        discount: computed.discount,
        total_amount: computed.total,
        customer_name: name,
        customer_phone: String(c.phone).slice(0, 20),
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

      // Confirm this is a real, approved partner before creating any order.
      const { data: partner, error: partnerErr } = await admin
        .from('partners').select('id, status, business_name').eq('id', partner_id).single();
      if (partnerErr || !partner) return res.status(400).json({ error: 'partner_not_found' });
      if (partner.status !== 'approved') return res.status(403).json({ error: 'partner_not_approved' });

      const computed = computeKitOrder(kit_name);

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
    const known = ['empty_cart', 'unknown_product', 'invalid_qty', 'invalid_kit'];
    if (known.includes(err.message)) return res.status(400).json({ error: err.message });
    return res.status(500).json({ error: 'Failed to create order' });
  }
};
