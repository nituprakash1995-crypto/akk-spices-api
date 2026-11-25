// api/_supabase-admin.js
// Server-side Supabase client using the SERVICE ROLE key. This bypasses
// Row Level Security entirely, so it must NEVER be imported into anything
// that ships to the browser — only serverless functions under /api.
//
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY as environment variables
// (Vercel: Settings -> Environment Variables). The service role key is
// different from the public "anon" key used in partner/partner-config.js —
// find it in Supabase: Settings -> API -> "service_role" (secret).

'use strict';
const { createClient } = require('@supabase/supabase-js');

let client = null;

function getSupabaseAdmin() {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null; // caller decides how to handle "not configured"
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

module.exports = { getSupabaseAdmin };
