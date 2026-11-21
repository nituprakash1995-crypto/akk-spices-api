// api/_pricing.js
// Canonical prices used by the serverless payment functions to compute the
// amount that gets charged. The browser NEVER gets to decide the amount —
// it only tells us WHAT the customer/partner wants (product keys / kit
// name); this file decides what that costs.
//
// IMPORTANT: if you ever change a price in checkout.html / cart.html
// (RETAIL_PRODUCTS below) or in partner/partner-config.js (DISTRIBUTOR_PRICE
// / KITS below), update BOTH places. They are kept separate on purpose
// (this is a static site with no shared build step) but must always match.

'use strict';

// ---------- Retail (Shop / Cart / Checkout) ----------
const RETAIL_PRODUCTS = {
  turmeric_100g: { name: 'Turmeric Powder',   price: 48,  weight: '100g' },
  turmeric_200g: { name: 'Turmeric Powder',   price: 95,  weight: '200g' },
  turmeric_500g: { name: 'Turmeric Powder',   price: 235, weight: '500g' },
  chilli_100g:   { name: 'Red Chilli Powder', price: 68,  weight: '100g' },
  chilli_200g:   { name: 'Red Chilli Powder', price: 135, weight: '200g' },
  chilli_500g:   { name: 'Red Chilli Powder', price: 278, weight: '500g' },
  dhaniya_100g:  { name: 'Dhaniya Powder',    price: 46,  weight: '100g' },
  dhaniya_200g:  { name: 'Dhaniya Powder',    price: 90,  weight: '200g' },
  dhaniya_500g:  { name: 'Dhaniya Powder',    price: 215, weight: '500g' },
};

const MAX_QTY_PER_LINE = 500; // sanity cap, not a real business limit

// ---- Weight-based delivery (India Post Parcel Retail, "Other States" column, effective 01.08.2026,
// + 18% GST, rounded up to the next rupee). One nationwide price per weight slab.
// Parcel weight = product weight + packing allowance. Weigh a real packed order and adjust the two
// PACK_* numbers if needed. Must match the same block in checkout.html.
const PACK_BOX_G = 50;        // outer box / mailer per order
const PACK_PER_UNIT_G = 10;   // pouch + padding per pack
const DELIVERY_SLABS = [      // [max grams, charge in rupees incl. GST]
  [500, 85], [1000, 135], [1500, 202], [2000, 283], [3000, 398], [4000, 496], [5000, 608],
];
const DELIVERY_PER_EXTRA_KG = 107; // beyond 5 kg: each extra kg (or part) incl. GST

// Samastipur Town: AKK delivers by hand, so NO delivery charge here. Add more PIN codes to extend.
const LOCAL_FREE_PINS = ['848101'];
function isLocalDelivery(pin) {
  return LOCAL_FREE_PINS.includes(String(pin || '').trim());
}

function deliveryChargeForGrams(g) {
  if (!(g > 0)) return 0;
  for (const [max, fee] of DELIVERY_SLABS) if (g <= max) return fee;
  return 608 + Math.ceil((g - 5000) / 1000) * DELIVERY_PER_EXTRA_KG;
}

function round2(n) { return Math.round(n * 100) / 100; }

// items: [{ key, qty }] as sent by the browser. Throws on anything invalid
// rather than silently clamping, so a bad request fails loudly.
function computeRetailOrder(items, location) {
  if (!Array.isArray(items) || items.length === 0) throw new Error('empty_cart');
  let subtotal = 0;
  let productGrams = 0, units = 0;
  const lineItems = items.map(({ key, qty }) => {
    const p = RETAIL_PRODUCTS[key];
    const q = Number(qty);
    if (!p) throw new Error('unknown_product');
    if (!Number.isInteger(q) || q <= 0 || q > MAX_QTY_PER_LINE) throw new Error('invalid_qty');
    const lineTotal = round2(p.price * q);
    subtotal += lineTotal;
    productGrams += parseInt(p.weight, 10) * q;
    units += q;
    return { key, product: p.name, size: p.weight, price: p.price, qty: q, lineTotal };
  });
  subtotal = round2(subtotal);
  const discount = 0; // no discount codes / offers
  const parcelWeightG = productGrams + units * PACK_PER_UNIT_G + PACK_BOX_G;
  const local = isLocalDelivery(location && location.pin) && /^bihar$/i.test(String((location && location.state) || '').trim());
  const deliveryCharge = local ? 0 : deliveryChargeForGrams(parcelWeightG); // Samastipur Town = free hand delivery
  const total = round2(subtotal - discount + deliveryCharge);
  return { lineItems, subtotal, discount, deliveryCharge, parcelWeightG, total };
}

// ---------- Distributor kits (Partner Dashboard) ----------
// Mirrors partner/partner-config.js DISTRIBUTOR_PRICE + KITS exactly.
const DISTRIBUTOR_PRICE = {
  'Turmeric Powder':   { '50g': 15.40, '100g': 33.60, '200g': 61.75, '500g': 152.75 },
  'Red Chilli Powder': { '50g': 17.50, '100g': 47.60, '200g': 87.75, '500g': 180.70 },
  'Dhaniya Powder':    { '50g': 15.40, '100g': 32.20, '200g': 58.50, '500g': 139.75 },
  'Ladi Pouch Pack':   { '3 ladi (450g)': 210.00 },   // 3 ladi x 10 pouch x 15g, Rs7 per pouch
};


// ---------------------------------------------------------------------------------------------
// Distributor / Retailer custom orders (placed from the partner portal, paid by UPI)
// Quantities are in BUNDLES (2 KG: 50g x40, 100g x20, 200g x10, 500g x4; ladi pack = 1 bundle of 3 ladi).
// Prices per pack come from the tier's table; everything is recalculated here so the UPI amount is trusted.
// ---------------------------------------------------------------------------------------------
const RETAILER_PRICE = {
  'Turmeric Powder':   { '50g': 17.60, '100g': 38.40, '200g': 76.00, '500g': 188.00 },
  'Red Chilli Powder': { '50g': 20.00, '100g': 54.40, '200g': 108.00, '500g': 222.40 },
  'Dhaniya Powder':    { '50g': 17.60, '100g': 36.80, '200g': 72.00, '500g': 172.00 },
  'Ladi Pouch Pack':   { '3 ladi (450g)': 240.00 },
};
const BUNDLE_PACKS = { '50g': 40, '100g': 20, '200g': 10, '500g': 4 };
const LADI_PRODUCT = 'Ladi Pouch Pack';
const LADI_SIZE = '3 ladi (450g)';
const LADI_GRAMS = 450;
const HANGER_CHARGE = 25;       // optional hanger when fewer than HANGER_FREE_BUNDLES ladi bundles are ordered
const HANGER_FREE_BUNDLES = 5;  // 5 or more ladi bundles: hanger is free
const PARTNER_DELIVERY_LABEL = 'Delivery charges (Bihar)';

function partnerTierPrice(product, size, tier) {
  const table = tier === 'retailer' ? RETAILER_PRICE : DISTRIBUTOR_PRICE;
  return table[product] && table[product][size];
}

// lines: [{ product, size, qty }]  (qty = bundles). Returns { items (stored in packs), total }.
function computePartnerOrder(lines, tier, partnerPin, wantsHanger) {
  if (!Array.isArray(lines) || lines.length === 0) throw new Error('empty_cart');
  const items = [];
  const seen = new Set();
  let goods = 0, grams = 0, packsTotal = 0, ladiBundles = 0;
  for (const l of lines) {
    const product = l && l.product, size = l && l.size;
    const price = partnerTierPrice(product, size, tier);
    if (price === undefined) throw new Error('unknown_product');
    const q = Number(l.qty);
    if (!Number.isInteger(q) || q <= 0 || q > MAX_QTY_PER_LINE) throw new Error('invalid_qty');
    const key = product + '|' + size;
    if (seen.has(key)) throw new Error('invalid_qty');
    seen.add(key);
    const isLadi = product === LADI_PRODUCT && size === LADI_SIZE;
    const unit = isLadi ? 1 : BUNDLE_PACKS[size];
    if (!unit) throw new Error('unknown_product');
    const packs = q * unit;
    const lineTotal = round2(packs * price);
    items.push({ product, size, qty: packs, price, lineTotal });
    goods += lineTotal;
    grams += packs * (isLadi ? LADI_GRAMS : parseInt(size, 10));
    packsTotal += packs;
    if (isLadi) ladiBundles += q;
  }
  let total = goods;
  if (ladiBundles >= HANGER_FREE_BUNDLES) {
    items.push({ product: 'Ladi Hanger', size: '1 pc', qty: 1, price: 0, lineTotal: 0 });            // free with 5+ bundles
  } else if (ladiBundles > 0 && wantsHanger) {
    items.push({ product: 'Ladi Hanger', size: '1 pc', qty: 1, price: HANGER_CHARGE, lineTotal: HANGER_CHARGE });
    total += HANGER_CHARGE;
  }
  if (tier === 'retailer' && !isLocalDelivery(partnerPin)) {    // retailers pay India Post delivery by parcel weight; Samastipur Town is free
    const parcelG = grams + packsTotal * PACK_PER_UNIT_G + PACK_BOX_G;
    const fee = deliveryChargeForGrams(parcelG);
    items.push({ product: PARTNER_DELIVERY_LABEL, size: parcelG + ' g parcel', qty: 1, price: fee, lineTotal: fee });
    total += fee;
  }
  return { items, total: round2(total) };
}

const KIT_ITEMS = {
  'Starter Kit': [
    { product: 'Turmeric Powder', size: '50g', qty: 160 },
    { product: 'Turmeric Powder', size: '100g', qty: 20 },
    { product: 'Turmeric Powder', size: '200g', qty: 10 },
    { product: 'Turmeric Powder', size: '500g', qty: 12 },
    { product: 'Red Chilli Powder', size: '50g', qty: 40 },
    { product: 'Red Chilli Powder', size: '100g', qty: 40 },
    { product: 'Red Chilli Powder', size: '200g', qty: 10 },
    { product: 'Red Chilli Powder', size: '500g', qty: 20 },
    { product: 'Dhaniya Powder', size: '50g', qty: 120 },
    { product: 'Dhaniya Powder', size: '100g', qty: 60 },
    { product: 'Dhaniya Powder', size: '200g', qty: 20 },
    { product: 'Dhaniya Powder', size: '500g', qty: 8 },
    { product: 'Ladi Pouch Pack', size: '3 ladi (450g)', qty: 25 },
  ],
  'Growth Kit': [
    { product: 'Turmeric Powder', size: '50g', qty: 320 },
    { product: 'Turmeric Powder', size: '100g', qty: 40 },
    { product: 'Turmeric Powder', size: '200g', qty: 20 },
    { product: 'Turmeric Powder', size: '500g', qty: 24 },
    { product: 'Red Chilli Powder', size: '50g', qty: 80 },
    { product: 'Red Chilli Powder', size: '100g', qty: 80 },
    { product: 'Red Chilli Powder', size: '200g', qty: 20 },
    { product: 'Red Chilli Powder', size: '500g', qty: 40 },
    { product: 'Dhaniya Powder', size: '50g', qty: 240 },
    { product: 'Dhaniya Powder', size: '100g', qty: 120 },
    { product: 'Dhaniya Powder', size: '200g', qty: 40 },
    { product: 'Dhaniya Powder', size: '500g', qty: 16 },
    { product: 'Ladi Pouch Pack', size: '3 ladi (450g)', qty: 50 },
  ],
  'Business Kit': [
    { product: 'Turmeric Powder', size: '50g', qty: 640 },
    { product: 'Turmeric Powder', size: '100g', qty: 80 },
    { product: 'Turmeric Powder', size: '200g', qty: 40 },
    { product: 'Turmeric Powder', size: '500g', qty: 48 },
    { product: 'Red Chilli Powder', size: '50g', qty: 160 },
    { product: 'Red Chilli Powder', size: '100g', qty: 160 },
    { product: 'Red Chilli Powder', size: '200g', qty: 40 },
    { product: 'Red Chilli Powder', size: '500g', qty: 80 },
    { product: 'Dhaniya Powder', size: '50g', qty: 480 },
    { product: 'Dhaniya Powder', size: '100g', qty: 240 },
    { product: 'Dhaniya Powder', size: '200g', qty: 80 },
    { product: 'Dhaniya Powder', size: '500g', qty: 32 },
    { product: 'Ladi Pouch Pack', size: '3 ladi (450g)', qty: 100 },
  ],
};

// Bihar delivery, included in each kit price (kit price = goods + delivery).
const KIT_DELIVERY_LABEL = 'Delivery charges (Bihar)';
const KIT_DELIVERY = { 'Starter Kit': 1000, 'Growth Kit': 2000, 'Business Kit': 4000 };

function tierPrice(product, size) {
  const row = DISTRIBUTOR_PRICE[product];
  return row ? row[size] : undefined;
}

function computeKitOrder(kitName, partnerPin) {
  const spec = KIT_ITEMS[kitName];
  if (!spec) throw new Error('invalid_kit');
  let total = 0;
  const items = spec.map((it) => {
    const price = tierPrice(it.product, it.size);
    const lineTotal = round2(price * it.qty);
    total += lineTotal;
    return { product: it.product, size: it.size, qty: it.qty, price, lineTotal };
  });
  const delivery = KIT_DELIVERY[kitName] || 0; // kit price is the same everywhere (Rs 25,000 / 50,000 / 1,00,000)
  if (delivery > 0) items.push({ product: KIT_DELIVERY_LABEL, size: '', qty: 1, price: delivery, lineTotal: delivery });
  total = round2(total + delivery);
  return { items, total };
}

module.exports = {
  RETAIL_PRODUCTS, deliveryChargeForGrams, computeRetailOrder,
  DISTRIBUTOR_PRICE, KIT_ITEMS, KIT_DELIVERY, isLocalDelivery, tierPrice, computeKitOrder, computePartnerOrder, RETAILER_PRICE,
};
