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

const ALLOWED_ORIGINS = ['https://akkspices.in', 'https://www.akkspices.in'];

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

  try {
    const { data, error } = await admin
      .from('retail_orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(300);
    if (error) throw error;
    return res.status(200).json({ orders: data || [] });
  } catch (err) {
    console.error('admin-orders error:', err);
    return res.status(500).json({ error: 'Failed to load orders' });
  }
};
