/* AKK Spices — Partner Portal shared config & helpers
   ---------------------------------------------------
   1. Create a free project at https://supabase.com
   2. Run the SQL in SUPABASE-SETUP.md inside the Supabase SQL Editor
   3. Copy your Project URL and anon public key from Project Settings > API
   4. Paste them below
*/

const SUPABASE_URL = "https://xxvjvmboyyujcqvzdcxl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_H9Szo0wKjmxSpq9P84yq7Q_o57On95j";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------- Product catalog & wholesale tier pricing ----------
// MRP is the retail/shop price. Distributor price is set explicitly per pack
// (from the Retailer Margin / Distributor Margin table) — not a flat % off MRP.
const MRP = {
  "Turmeric Powder":  { "50g": 22, "100g": 48, "200g": 95,  "500g": 235 },
  "Red Chilli Powder":{ "50g": 25, "100g": 68, "200g": 135, "500g": 278 },
  "Dhaniya Powder":   { "50g": 22, "100g": 46, "200g": 90,  "500g": 215 },
  // Trio bundle — 1 pack each of Turmeric, Red Chilli & Dhaniya at that size,
  // priced ~10% below buying all three separately.
  "AKK Trio Bundle":  { "50g": 62, "100g": 146, "200g": 288, "500g": 655 },
  "Ladi Pouch Pack":  { "3 ladi (450g)": 300 }
};

// Retail price = MRP − 20% (Retailer's purchase/buying price, i.e. retailer margin = 20% of MRP).
const RETAIL_PRICE = {
  "Turmeric Powder":  { "50g": 17.60, "100g": 38.40,  "200g": 76.00,  "500g": 188.00 },
  "Red Chilli Powder":{ "50g": 20.00, "100g": 54.40,  "200g": 108.00, "500g": 222.40 },
  "Dhaniya Powder":   { "50g": 17.60, "100g": 36.80,  "200g": 72.00,  "500g": 172.00 },
  "AKK Trio Bundle":  { "50g": 49.60, "100g": 116.80, "200g": 230.40, "500g": 524.00 },
  "Ladi Pouch Pack":  { "3 ladi (450g)": 240 }
};

// Distributor wholesale price per pack = MRP − 30% for 50g/100g packs,
// MRP − 35% for 200g/500g packs (bigger packs carry the bigger margin).
const DISTRIBUTOR_PRICE = {
  "Turmeric Powder":  { "50g": 15.40, "100g": 33.60,  "200g": 61.75,  "500g": 152.75 },
  "Red Chilli Powder":{ "50g": 17.50, "100g": 47.60,  "200g": 87.75,  "500g": 180.70 },
  "Dhaniya Powder":   { "50g": 15.40, "100g": 32.20,  "200g": 58.50,  "500g": 139.75 },
  "AKK Trio Bundle":  { "50g": 43.40, "100g": 102.20, "200g": 187.20, "500g": 425.75 },
  "Ladi Pouch Pack":  { "3 ladi (450g)": 210 }
};

// Site is distributor-only for now (retailer/dealer tiers removed from signup).
const TIER_LABEL = {
  distributor: "Distributor"
};

// ---------- Ladi pouch pack (15g pouches) ----------
// 1 ladi = 10 pouches x 15g of ONE masala. 1 pack = 3 ladi (haldi + dhaniya + mirch, 1 ladi each)
// = 30 pouches = 450g. Per pouch: MRP Rs10 / Retailer Rs8 / Distributor Rs7.
// Hanger (to hang the ladi in the shop): FREE with 5 or more ladi packs, otherwise Rs25 once per order.
const LADI_PRODUCT = "Ladi Pouch Pack";
const LADI_SIZE = "3 ladi (450g)";
const LADI_GRAMS = 450;
const HANGER_CHARGE = 25;
const HANGER_FREE_PACKS = 5;

// ---------- Kit delivery (Bihar only for now) ----------
const KIT_DELIVERY_LABEL = "Delivery charges (Bihar)";
const KIT_DELIVERY_GST_RATE = 18; // % (as advised by CA); goods use GST_RATE
const BUNDLE_PACKS = { "50g": 40, "100g": 20, "200g": 10, "500g": 4 }; // packs in one 2 KG bundle

const TIER_MIN_QTY = {
  distributor: 20   // minimum units per order line
};

// Minimum total order value (₹) required to place an order, on top of the
// per-line minimum quantity above.
const TIER_MIN_ORDER_VALUE = {
  distributor: 10000
};

// ---------- GST / Invoice settings ----------
// Packaged & branded spice powders: 5% GST (HSN 0910 turmeric, 0904 chilli, 0909 coriander).
// GST_INCLUSIVE = true  -> the prices above already include GST (invoice shows the tax split out of the total).
// GST_INCLUSIVE = false -> GST is added on top of the total.
// Confirm rate/HSN with your CA before issuing tax invoices.
const GST_RATE = 5;
const GST_INCLUSIVE = true;
const SELLER_GSTIN = "10KCWPK0610J1ZL";   // <-- apni GSTIN yaha likho (e.g. "10ABCDE1234F1Z5"); khali rahe to invoice par nahi dikhegi
const SELLER_ADDRESS = ""; // <-- optional: invoice header me dikhane ke liye address
const HSN_CODE = {
  "Turmeric Powder":   "0910",
  "Red Chilli Powder": "0904",
  "Dhaniya Powder":    "0909",
  "AKK Trio Bundle":   "0910",
  "Ladi Pouch Pack":   "0910 / 0904 / 0909",
  "Delivery charges (Bihar)": "9968"
};

// ---------- Service area ----------
// Abhi sirf Bihar active hai. Naya state kholne ke liye: uska naam ACTIVE_STATES me jodo
// aur STATE_DISTRICTS me uske districts ki list daal do. Baaki sab automatic.
const ACTIVE_STATES = ["Bihar"];
const STATE_DISTRICTS = {
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran (Motihari)", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran (Bettiah)"]
};

// "We will be in your area soon" popup - jab koi non-active state choose kare
function showComingSoon(stateName) {
  const old = document.getElementById("akkSoonOverlay");
  if (old) old.remove();
  const safe = String(stateName).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const wa = "https://wa.me/917257097766?text=" + encodeURIComponent(
    "Hello AKK Spices, please inform me when distributor partnership opens in " + stateName + ".");
  const o = document.createElement("div");
  o.id = "akkSoonOverlay";
  o.setAttribute("style", "position:fixed;inset:0;background:rgba(15,51,36,0.62);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;");
  o.innerHTML =
    '<div style="background:#fff;max-width:400px;width:100%;border-radius:8px 24px 8px 24px;padding:30px 26px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,0.3);">' +
      '<div style="font-size:2.6rem;line-height:1;">🌿</div>' +
      '<h2 style="margin:12px 0 8px;font-size:1.3rem;color:#0f3324;">Coming soon to ' + safe + '!</h2>' +
      '<p style="margin:0 0 6px;font-size:0.95rem;color:#333;line-height:1.55;">Abhi AKK Spices distributor partnership sirf <b>Bihar</b> me available hai.</p>' +
      '<p style="margin:0 0 20px;font-size:0.95rem;color:#333;line-height:1.55;">We are expanding fast and will start service in your area very soon. Stay tuned!</p>' +
      '<a href="' + wa + '" target="_blank" rel="noopener" style="display:block;background:#25D366;color:#fff;text-decoration:none;padding:12px;border-radius:6px 14px 6px 14px;font-weight:700;margin-bottom:10px;">💬 Notify me on WhatsApp</a>' +
      '<button type="button" id="akkSoonClose" style="width:100%;background:#fff;border:1px solid #0f3324;color:#0f3324;padding:11px;border-radius:6px 14px 6px 14px;font-weight:700;cursor:pointer;font-size:0.95rem;">OK, Got it</button>' +
    '</div>';
  document.body.appendChild(o);
  const close = () => o.remove();
  o.addEventListener("click", e => { if (e.target === o) close(); });
  document.getElementById("akkSoonClose").addEventListener("click", close);
}

// ---------- States (GST state codes) ----------
const INDIAN_STATES = [
  {name:"Andaman & Nicobar Islands",code:"35"},{name:"Andhra Pradesh",code:"37"},{name:"Arunachal Pradesh",code:"12"},
  {name:"Assam",code:"18"},{name:"Bihar",code:"10"},{name:"Chandigarh",code:"04"},{name:"Chhattisgarh",code:"22"},
  {name:"Dadra & Nagar Haveli and Daman & Diu",code:"26"},{name:"Delhi",code:"07"},{name:"Goa",code:"30"},
  {name:"Gujarat",code:"24"},{name:"Haryana",code:"06"},{name:"Himachal Pradesh",code:"02"},{name:"Jammu & Kashmir",code:"01"},
  {name:"Jharkhand",code:"20"},{name:"Karnataka",code:"29"},{name:"Kerala",code:"32"},{name:"Ladakh",code:"38"},
  {name:"Lakshadweep",code:"31"},{name:"Madhya Pradesh",code:"23"},{name:"Maharashtra",code:"27"},{name:"Manipur",code:"14"},
  {name:"Meghalaya",code:"17"},{name:"Mizoram",code:"15"},{name:"Nagaland",code:"13"},{name:"Odisha",code:"21"},
  {name:"Puducherry",code:"34"},{name:"Punjab",code:"03"},{name:"Rajasthan",code:"08"},{name:"Sikkim",code:"11"},
  {name:"Tamil Nadu",code:"33"},{name:"Telangana",code:"36"},{name:"Tripura",code:"16"},{name:"Uttar Pradesh",code:"09"},
  {name:"Uttarakhand",code:"05"},{name:"West Bengal",code:"19"}
];
// Seller (AKK Spices) state - decides CGST+SGST vs IGST on invoices.
// Apni state ka naam yaha EXACTLY list ke jaisa likho (e.g. "Bihar"). Khali rahe to invoice CGST+SGST dikhayega.
const SELLER_STATE = "Bihar";

function stateCode(name) {
  const st = INDIAN_STATES.find(x => x.name === name);
  return st ? st.code : "";
}
function sellerStateCode() { return stateCode(SELLER_STATE) || (SELLER_GSTIN || "").slice(0, 2); }
function partnerStateCode(p) { return stateCode(p && p.state) || ((p && p.gst_number) || "").slice(0, 2); }

function tierPrice(product, size) {
  const price = DISTRIBUTOR_PRICE[product] && DISTRIBUTOR_PRICE[product][size];
  return price !== undefined ? price : MRP[product][size];
}

function formatINR(n) {
  const rounded = Math.round(n * 100) / 100;
  return "₹" + rounded.toLocaleString("en-IN");
}

// ---------- Ready-made distributor kits ----------
// Exact SKU-level breakdown (13 SKUs per kit: 3 products × 4 pack sizes (50/100/200/500g) + 1 ladi pouch pack).
// Packs go in whole 2 KG bundles (50g x40, 100g x20, 200g x10, 500g x4; ladi packs in lots of 5).
// Growth Kit = 2× Starter Kit quantities, Business Kit = 4× Starter Kit.
// Kit price = goods (DISTRIBUTOR_PRICE) + Bihar delivery = exactly ₹25,000 / ₹50,000 / ₹1,00,000.
// Delivery is billed as its own line at 18% GST; the goods carry 5% GST.
const KIT_INCLUDES = [
  "AKK Product Catalogue",
  "Distributor Order Sheet",
  "Retailer Order Sheet",
  "Basic Marketing Material",
  "Product / Price List",
  "Distributor Terms & Conditions"
];

const KITS = [
  {
    name: "Starter Kit",
    targetLabel: "₹25,000",
    suitableFor: "New Distributor / Small Area",
    image: "../images/kit-starter-25k.jpg",
    totalSKUs: 13,
    totalPacks: 545,
    delivery: 1000, // Bihar delivery, included in the kit price
    items: [
      { product: "Turmeric Powder", size: "50g", qty: 160 },
      { product: "Turmeric Powder", size: "100g", qty: 20 },
      { product: "Turmeric Powder", size: "200g", qty: 10 },
      { product: "Turmeric Powder", size: "500g", qty: 12 },
      { product: "Red Chilli Powder", size: "50g", qty: 40 },
      { product: "Red Chilli Powder", size: "100g", qty: 40 },
      { product: "Red Chilli Powder", size: "200g", qty: 10 },
      { product: "Red Chilli Powder", size: "500g", qty: 20 },
      { product: "Dhaniya Powder", size: "50g", qty: 120 },
      { product: "Dhaniya Powder", size: "100g", qty: 60 },
      { product: "Dhaniya Powder", size: "200g", qty: 20 },
      { product: "Dhaniya Powder", size: "500g", qty: 8 },
      { product: "Ladi Pouch Pack", size: "3 ladi (450g)", qty: 25 }
    ]
  },
  {
    name: "Growth Kit",
    targetLabel: "₹50,000",
    suitableFor: "Regular Market / Larger Area",
    image: "../images/kit-growth-50k.jpg",
    totalSKUs: 13,
    totalPacks: 1090,
    delivery: 2000, // Bihar delivery, included in the kit price
    items: [
      { product: "Turmeric Powder", size: "50g", qty: 320 },
      { product: "Turmeric Powder", size: "100g", qty: 40 },
      { product: "Turmeric Powder", size: "200g", qty: 20 },
      { product: "Turmeric Powder", size: "500g", qty: 24 },
      { product: "Red Chilli Powder", size: "50g", qty: 80 },
      { product: "Red Chilli Powder", size: "100g", qty: 80 },
      { product: "Red Chilli Powder", size: "200g", qty: 20 },
      { product: "Red Chilli Powder", size: "500g", qty: 40 },
      { product: "Dhaniya Powder", size: "50g", qty: 240 },
      { product: "Dhaniya Powder", size: "100g", qty: 120 },
      { product: "Dhaniya Powder", size: "200g", qty: 40 },
      { product: "Dhaniya Powder", size: "500g", qty: 16 },
      { product: "Ladi Pouch Pack", size: "3 ladi (450g)", qty: 50 }
    ]
  },
  {
    name: "Business Kit",
    targetLabel: "₹1,00,000",
    suitableFor: "Strong Market / Large Territory",
    image: "../images/kit-business-1l.jpg",
    totalSKUs: 13,
    totalPacks: 2180,
    delivery: 4000, // Bihar delivery, included in the kit price
    items: [
      { product: "Turmeric Powder", size: "50g", qty: 640 },
      { product: "Turmeric Powder", size: "100g", qty: 80 },
      { product: "Turmeric Powder", size: "200g", qty: 40 },
      { product: "Turmeric Powder", size: "500g", qty: 48 },
      { product: "Red Chilli Powder", size: "50g", qty: 160 },
      { product: "Red Chilli Powder", size: "100g", qty: 160 },
      { product: "Red Chilli Powder", size: "200g", qty: 40 },
      { product: "Red Chilli Powder", size: "500g", qty: 80 },
      { product: "Dhaniya Powder", size: "50g", qty: 480 },
      { product: "Dhaniya Powder", size: "100g", qty: 240 },
      { product: "Dhaniya Powder", size: "200g", qty: 80 },
      { product: "Dhaniya Powder", size: "500g", qty: 32 },
      { product: "Ladi Pouch Pack", size: "3 ladi (450g)", qty: 100 }
    ]
  }
];

// Goods only (packs x distributor price).
function kitGoodsTotal(kit) {
  return Math.round(kit.items.reduce((sum, it) => sum + tierPrice(it.product, it.size) * it.qty, 0) * 100) / 100;
}
// Kit price = goods + Bihar delivery (exactly Rs 25,000 / 50,000 / 1,00,000).
function kitTotal(kit) {
  return Math.round((kitGoodsTotal(kit) + (kit.delivery || 0)) * 100) / 100;
}

// ---------- Demo admin account (for showing the dashboard without a real
// Supabase signup — login only, no signup needed) ----------
// ⚠️ SET THIS TO false BEFORE GOING LIVE with real UPI payments + Supabase.
// This is the ONLY switch needed to fully disable the demo login — once
// false, the admin@akkspices.in / password below stops working even if
// someone finds it in this file (any public JS file can always be read
// in a browser, so this flag — not secrecy — is what actually protects you).
const DEMO_MODE_ENABLED = true;

const DEMO_ADMIN = {
  email: "admin@akkspices.in",
  password: "AkkDemo@2026",
  profile: {
    id: "demo-admin",
    business_name: "AKK Spices — Demo Admin",
    contact_name: "Demo Admin",
    partner_type: "distributor",
    district: "Patna",
    address_line: "Demo Godown, Boring Road",
    city: "Patna",
    state: "Bihar",
    pincode: "800001",
    delivery_address: "",
    gst_number: "DEMOGSTIN0Z1",
    status: "approved"
  }
};

function isDemoSession() {
  return DEMO_MODE_ENABLED && sessionStorage.getItem("akk_demo_admin") === "1";
}

function startDemoSession() {
  if (!DEMO_MODE_ENABLED) return;
  sessionStorage.setItem("akk_demo_admin", "1");
}

function endDemoSession() {
  sessionStorage.removeItem("akk_demo_admin");
}

// ---------- Auth / session helpers ----------
async function requireLogin(redirectTo) {
  if (isDemoSession()) return { demo: true };
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) {
    window.location.href = redirectTo || "partner-login.html";
    return null;
  }
  return session;
}

async function getMyPartnerProfile() {
  if (isDemoSession()) return DEMO_ADMIN.profile;
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return null;

  let { data, error } = await supabaseClient
    .from("partners")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error && error.code === "PGRST116") {
    // No profile row yet. This happens when the account was created while
    // "Confirm email" was still ON — the signup form couldn't insert the
    // profile at that time because there was no session yet. If we saved
    // those signup details locally, create the row now that we have an
    // authenticated session (so the RLS insert check passes).
    const pending = getPendingPartnerProfile(user.email);
    if (pending) {
      const { data: inserted, error: insertError } = await supabaseClient
        .from("partners")
        .insert({ id: user.id, ...pending, status: "pending" })
        .select()
        .single();
      clearPendingPartnerProfile();
      if (!insertError) return inserted;
      console.error("profile backfill error", insertError);
    }
    return null;
  }

  if (error) {
    console.error("profile fetch error", error);
    return null;
  }
  return data;
}

// ---------- Pending signup details (used only if email confirmation is ON,
// so the profile row can be created after the user confirms + logs in) ----------
function savePendingPartnerProfile(email, profile) {
  try {
    localStorage.setItem("akk_pending_partner", JSON.stringify({ email, ...profile }));
  } catch (e) {}
}

function getPendingPartnerProfile(email) {
  try {
    const raw = localStorage.getItem("akk_pending_partner");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.email !== email) return null;
    const { email: _e, ...rest } = parsed;
    return rest;
  } catch (e) {
    return null;
  }
}

function clearPendingPartnerProfile() {
  localStorage.removeItem("akk_pending_partner");
}

async function logoutPartner() {
  if (isDemoSession()) {
    endDemoSession();
    window.location.href = "partner-login.html";
    return;
  }
  await supabaseClient.auth.signOut();
  window.location.href = "partner-login.html";
}

// ---------- Demo order log (kept in this browser only — no backend) ----------
function getDemoOrders() {
  try {
    return JSON.parse(localStorage.getItem("akk_demo_orders") || "[]");
  } catch (e) {
    return [];
  }
}

function saveDemoOrder(order) {
  const orders = getDemoOrders();
  orders.unshift(order);
  localStorage.setItem("akk_demo_orders", JSON.stringify(orders));
}
