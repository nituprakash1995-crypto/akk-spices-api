// api/create-order.js
// Vercel serverless function — creates a Razorpay order server-side.
//
// SECURITY: the browser only tells us WHAT is being bought (retail cart
// items, or which distributor kit) — never how much it costs. The amount
// is always computed here from api/_pricing.js, so a tampered request from
// DevTools cannot change the amount actually charged.
//
// Needs env vars (Vercel: Settings -> Environment Variables):
//   RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET            (Razorpay dashboard)
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY         (kit orders only — see SUPABASE-SETUP.md)
// Never put any of these in a file that ships to the browser.

'use strict';
const Razorpay = require('razorpay');
const { computeRetailOrder, computeKitOrder, DISCOUNT_CODE } = require('./_pricing');
const { getSupabaseAdmin } = require('./_supabase-admin');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    // Keys not configured yet — tell the frontend clearly so it can fall
    // back to the WhatsApp pre-order flow instead of a generic failure.
    return res.status(503).json({ error: 'payments_not_configured' });
  }

  const { type } = req.body || {};

  try {
    let total, receiptPrefix, notes, localOrderId = null;

    if (type === 'retail') {
      const { items, coupon, customer } = req.body || {};
      const computed = computeRetailOrder(items, coupon);
      total = computed.total;
      receiptPrefix = 'akk_retail_';
      // Keep notes small: re-derive full pricing at verify time from
      // (key, qty) pairs rather than trusting a full breakdown here.
      notes = {
        type: 'retail',
        items: JSON.stringify((items || []).map((i) => [i.key, i.qty])),
        coupon: computed.couponApplied ? DISCOUNT_CODE : '',
        customer: JSON.stringify({
          name: `${(customer && customer.fname) || ''} ${(customer && customer.lname) || ''}`.trim(),
          phone: (customer && customer.phone) || '',
          address: (customer && customer.address) || '',
          city: (customer && customer.city) || '',
          state: (customer && customer.state) || '',
          pin: (customer && customer.pin) || '',
          contact: (customer && customer.contact) || '',
        }),
      };
    } else if (type === 'kit') {
      const { kit_name, partner_id } = req.body || {};
      if (!kit_name || !partner_id) return res.status(400).json({ error: 'missing_fields' });

      const admin = getSupabaseAdmin();
      if (!admin) return res.status(503).json({ error: 'payments_not_configured' });

      // Confirm this is a real, approved partner before creating any order.
      const { data: partner, error: partnerErr } = await admin
        .from('partners').select('id, status, business_name').eq('id', partner_id).single();
      if (partnerErr || !partner) return res.status(400).json({ error: 'partner_not_found' });
      if (partner.status !== 'approved') return res.status(403).json({ error: 'partner_not_approved' });

      const computed = computeKitOrder(kit_name);
      total = computed.total;
      receiptPrefix = 'akk_kit_';

      // Create the order row up front as "placed" (service role bypasses RLS).
      // Payment confirmation (verify-payment.js) will flip it to "confirmed".
      const { data: inserted, error: insertErr } = await admin
        .from('partner_orders')
        .insert({ partner_id, items: computed.items, total_amount: total, status: 'placed' })
        .select('id').single();
      if (insertErr) throw insertErr;
      localOrderId = inserted.id;

      notes = { type: 'kit', kit_name, partner_id, local_order_id: localOrderId };
    } else {
      return res.status(400).json({ error: 'invalid_type' });
    }

    if (!total || total <= 0) return res.status(400).json({ error: 'invalid_amount' });

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: Math.round(total * 100), // paise, computed server-side above
      currency: 'INR',
      receipt: receiptPrefix + Date.now(),
      notes,
    });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID, // public key, safe to expose
      local_order_id: localOrderId,
      computed_total: total, // for the frontend to display/reconcile only
    });
  } catch (err) {
    console.error('create-order error:', err);
    const known = ['empty_cart', 'unknown_product', 'invalid_qty', 'invalid_kit'];
    if (known.includes(err.message)) return res.status(400).json({ error: err.message });
    return res.status(500).json({ error: 'Failed to create order' });
  }
};
