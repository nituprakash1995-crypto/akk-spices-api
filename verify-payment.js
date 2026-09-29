// api/verify-payment.js
// Vercel serverless function — verifies the Razorpay payment signature
// server-side (so a browser can never fake a "successful payment"), then
// fetches the ORDER BACK FROM RAZORPAY to read the trusted amount/notes we
// set in create-order.js. We never trust order_details sent by the browser
// for anything we save — only what Razorpay itself has on record.
//
// Needs env vars: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET,
// SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (see SUPABASE-SETUP.md).

'use strict';
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { computeRetailOrder } = require('./_pricing');
const { getSupabaseAdmin } = require('./_supabase-admin');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(503).json({ error: 'payments_not_configured' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing fields', verified: false });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ verified: false });
    }

    // Signature is valid. Now pull the order back from Razorpay itself —
    // this is data Razorpay stored when WE created the order, so it cannot
    // have been tampered with by the browser in between.
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const order = await instance.orders.fetch(razorpay_order_id);
    const notes = order.notes || {};
    const admin = getSupabaseAdmin();

    if (notes.type === 'kit') {
      if (admin && notes.local_order_id) {
        const { error: updErr } = await admin
          .from('partner_orders')
          .update({
            status: 'confirmed',
            amount_paid: order.amount / 100,
            razorpay_order_id,
            razorpay_payment_id,
          })
          .eq('id', notes.local_order_id)
          .eq('partner_id', notes.partner_id); // extra safety: must still match
        if (updErr) console.error('verify-payment: could not update partner_orders', updErr);
      } else {
        console.error('verify-payment: kit payment verified but could not persist (Supabase not configured or missing local_order_id)');
      }
    } else if (notes.type === 'retail') {
      let items = [];
      try { items = JSON.parse(notes.items || '[]').map(([key, qty]) => ({ key, qty })); } catch (e) { items = []; }
      let customer = {};
      try { customer = JSON.parse(notes.customer || '{}'); } catch (e) { customer = {}; }

      let computed = null;
      try { computed = computeRetailOrder(items, notes.coupon); } catch (e) { computed = null; }

      if (admin) {
        const { error: insErr } = await admin.from('retail_orders').insert({
          items: computed ? computed.lineItems : items,
          subtotal: computed ? computed.subtotal : null,
          discount: computed ? computed.discount : 0,
          total_amount: order.amount / 100,
          customer_name: customer.name || null,
          customer_phone: customer.phone || null,
          address_line: customer.address || null,
          city: customer.city || null,
          state: customer.state || null,
          pincode: customer.pin || null,
          status: 'confirmed',
          razorpay_order_id,
          razorpay_payment_id,
        });
        if (insErr) console.error('verify-payment: could not save retail_orders row', insErr);
      } else {
        console.error('verify-payment: retail payment verified but could not persist (Supabase not configured)');
      }
    }

    return res.status(200).json({ verified: true });
  } catch (err) {
    console.error('verify-payment error:', err);
    return res.status(500).json({ verified: false, error: 'Verification failed' });
  }
};
