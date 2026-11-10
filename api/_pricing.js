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

const DISCOUNT_CODE = 'PREBOOK10';
const DISCOUNT_RATE = 0.10;
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

function deliveryChargeForGrams(g) {
  if (!(g > 0)) return 0;
  for (const [max, fee] of DELIVERY_SLABS) if (g <= max) return fee;
  return 608 + Math.ceil((g - 5000) / 1000) * DELIVERY_PER_EXTRA_KG;
}

function round2(n) { return Math.round(n * 100) / 100; }

// items: [{ key, qty }] as sent by the browser. Throws on anything invalid
// rather than silently clamping, so a bad request fails loudly.
function computeRetailOrder(items, couponCode) {
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
  const couponApplied = typeof couponCode === 'string' && couponCode.trim().toUpperCase() === DISCOUNT_CODE;
  const discount = couponApplied ? round2(subtotal * DISCOUNT_RATE) : 0;
  const parcelWeightG = productGrams + units * PACK_PER_UNIT_G + PACK_BOX_G;
  const deliveryCharge = deliveryChargeForGrams(parcelWeightG); // charged after the discount code
  const total = round2(subtotal - discount + deliveryCharge);
  return { lineItems, subtotal, discount, couponApplied, deliveryCharge, parcelWeightG, total };
}

// ---------- Distributor kits (Partner Dashboard) ----------
// Mirrors partner/partner-config.js DISTRIBUTOR_PRICE + KITS exactly.
const DISTRIBUTOR_PRICE = {
  'Turmeric Powder':   { '20g': 7.00, '50g': 15.40, '100g': 33.60, '200g': 61.75, '500g': 152.75 },
  'Red Chilli Powder': { '20g': 7.00, '50g': 17.50, '100g': 47.60, '200g': 87.75, '500g': 180.70 },
  'Dhaniya Powder':    { '20g': 7.00, '50g': 15.40, '100g': 32.20, '200g': 58.50, '500g': 139.75 },
};

const KIT_ITEMS = {
  'Starter Kit': [
    { product: 'Turmeric Powder',   size: '20g',  qty: 242 },
    { product: 'Turmeric Powder',   size: '50g',  qty: 105 },
    { product: 'Turmeric Powder',   size: '100g', qty: 47 },
    { product: 'Turmeric Powder',   size: '200g', qty: 23 },
    { product: 'Turmeric Powder',   size: '500g', qty: 11 },
    { product: 'Red Chilli Powder', size: '20g',  qty: 242 },
    { product: 'Red Chilli Powder', size: '50g',  qty: 92 },
    { product: 'Red Chilli Powder', size: '100g', qty: 35 },
    { product: 'Red Chilli Powder', size: '200g', qty: 12 },
    { product: 'Red Chilli Powder', size: '500g', qty: 11 },
    { product: 'Dhaniya Powder',    size: '20g',  qty: 242 },
    { product: 'Dhaniya Powder',    size: '50g',  qty: 115 },
    { product: 'Dhaniya Powder',    size: '100g', qty: 58 },
    { product: 'Dhaniya Powder',    size: '200g', qty: 34 },
    { product: 'Dhaniya Powder',    size: '500g', qty: 12 },
  ],
  'Growth Kit': [
    { product: 'Turmeric Powder',   size: '20g',  qty: 484 },
    { product: 'Turmeric Powder',   size: '50g',  qty: 210 },
    { product: 'Turmeric Powder',   size: '100g', qty: 94 },
    { product: 'Turmeric Powder',   size: '200g', qty: 46 },
    { product: 'Turmeric Powder',   size: '500g', qty: 22 },
    { product: 'Red Chilli Powder', size: '20g',  qty: 484 },
    { product: 'Red Chilli Powder', size: '50g',  qty: 184 },
    { product: 'Red Chilli Powder', size: '100g', qty: 70 },
    { product: 'Red Chilli Powder', size: '200g', qty: 24 },
    { product: 'Red Chilli Powder', size: '500g', qty: 22 },
    { product: 'Dhaniya Powder',    size: '20g',  qty: 484 },
    { product: 'Dhaniya Powder',    size: '50g',  qty: 230 },
    { product: 'Dhaniya Powder',    size: '100g', qty: 116 },
    { product: 'Dhaniya Powder',    size: '200g', qty: 68 },
    { product: 'Dhaniya Powder',    size: '500g', qty: 24 },
  ],
  'Business Kit': [
    { product: 'Turmeric Powder',   size: '20g',  qty: 968 },
    { product: 'Turmeric Powder',   size: '50g',  qty: 420 },
    { product: 'Turmeric Powder',   size: '100g', qty: 188 },
    { product: 'Turmeric Powder',   size: '200g', qty: 92 },
    { product: 'Turmeric Powder',   size: '500g', qty: 44 },
    { product: 'Red Chilli Powder', size: '20g',  qty: 968 },
    { product: 'Red Chilli Powder', size: '50g',  qty: 368 },
    { product: 'Red Chilli Powder', size: '100g', qty: 140 },
    { product: 'Red Chilli Powder', size: '200g', qty: 48 },
    { product: 'Red Chilli Powder', size: '500g', qty: 44 },
    { product: 'Dhaniya Powder',    size: '20g',  qty: 968 },
    { product: 'Dhaniya Powder',    size: '50g',  qty: 460 },
    { product: 'Dhaniya Powder',    size: '100g', qty: 232 },
    { product: 'Dhaniya Powder',    size: '200g', qty: 136 },
    { product: 'Dhaniya Powder',    size: '500g', qty: 48 },
  ],
};

function tierPrice(product, size) {
  const row = DISTRIBUTOR_PRICE[product];
  return row ? row[size] : undefined;
}

function computeKitOrder(kitName) {
  const spec = KIT_ITEMS[kitName];
  if (!spec) throw new Error('invalid_kit');
  let total = 0;
  const items = spec.map((it) => {
    const price = tierPrice(it.product, it.size);
    const lineTotal = round2(price * it.qty);
    total += lineTotal;
    return { product: it.product, size: it.size, qty: it.qty, price, lineTotal };
  });
  total = round2(total);
  return { items, total };
}

module.exports = {
  RETAIL_PRODUCTS, DISCOUNT_CODE, DISCOUNT_RATE, deliveryChargeForGrams, computeRetailOrder,
  DISTRIBUTOR_PRICE, KIT_ITEMS, tierPrice, computeKitOrder,
};
