// api/visitor-count.js
// Vercel serverless function — increments and returns a simple homepage
// visit counter, backed by Supabase. Every GET call counts as one visit
// (this is the classic "visitor number" style counter, not a unique-visitor
// count). If Supabase isn't configured yet, responds 503 so the frontend
// can just hide the counter instead of showing a broken number.
//
// Needs env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// (same ones used by api/create-order.js — see SUPABASE-SETUP.md)

'use strict';
const { getSupabaseAdmin } = require('./_supabase-admin');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const admin = getSupabaseAdmin();
  if (!admin) return res.status(503).json({ error: 'not_configured' });

  try {
    const { data, error } = await admin.rpc('increment_homepage_visits');
    if (error) throw error;
    // Supabase RPC returning a single bigint comes back as `data` directly.
    const count = typeof data === 'number' ? data : (Array.isArray(data) ? data[0] : data);
    return res.status(200).json({ count });
  } catch (err) {
    console.error('visitor-count error:', err);
    return res.status(500).json({ error: 'Could not update counter' });
  }
};
