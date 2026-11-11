/* launch.js — AKK Spices: shared helpers (cart badge, cart cleanup, toast). The shop is always open. */
(function (w, d) {
  'use strict';

  var LIVE = true; // the shop is open permanently — no pre-booking mode

  // ---- CSS: show/hide helpers + cart badge + toast ----
  if (LIVE) d.documentElement.className += ' akk-live';
  var st = d.createElement('style');
  st.textContent =
    '.akk-live [data-pre-only]{display:none!important}' +
    'html:not(.akk-live) [data-live-only]{display:none!important}' +
    '.akk-cart-badge{position:absolute;top:-5px;right:-5px;min-width:18px;height:18px;padding:0 5px;border-radius:9px;' +
      'background:#C99A3C;color:#fff;font:800 11px/18px Manrope,system-ui,sans-serif;text-align:center;box-sizing:border-box;display:none}' +
    '.akk-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#0F3324;color:#fff;padding:12px 18px;' +
      'border-radius:6px 16px 6px 16px;font:600 14px Manrope,system-ui,sans-serif;z-index:99998;display:flex;gap:16px;align-items:center;' +
      'box-shadow:0 12px 30px rgba(0,0,0,.3);max-width:90vw}' +
    '.akk-toast a{color:#E8C468;font-weight:800;text-decoration:none;white-space:nowrap}';
  (d.head || d.documentElement).appendChild(st);

  function each(sel, fn) {
    var list = d.querySelectorAll(sel);
    for (var i = 0; i < list.length; i++) fn(list[i]);
  }

  // Valid cart keys = <product>_<size>. KEEP THIS IN SYNC with the products in shop.html / cart.html
  // (PRODUCTS). Anything else found in the saved cart is stale data and is dropped.
  var VALID_KEY = /^(turmeric|chilli|dhaniya)_(100g|200g|500g)$/;

  function cleanCart() {
    var out = {}, changed = false;
    try {
      var raw = localStorage.getItem('akk_cart');
      var c = raw ? JSON.parse(raw) : {};
      if (c && typeof c === 'object' && !Array.isArray(c)) {
        Object.keys(c).forEach(function (k) {
          var q = parseInt(c[k], 10);
          if (VALID_KEY.test(k) && q > 0) out[k] = Math.min(q, 99); else changed = true;
        });
      } else { changed = true; }
    } catch (e) { changed = true; }
    if (changed) { try { localStorage.setItem('akk_cart', JSON.stringify(out)); } catch (e2) {} }
    return out;
  }

  function cartCount() {
    var c = cleanCart();
    return Object.keys(c).reduce(function (s, k) { return s + c[k]; }, 0);
  }

  function refreshCartCount() {
    var n = cartCount();
    each('a[aria-label="Shopping cart"]', function (a) {
      var b = a.querySelector('.akk-cart-badge');
      if (!b) {
        if (w.getComputedStyle(a).position === 'static') a.style.position = 'relative';
        b = d.createElement('span'); b.className = 'akk-cart-badge'; a.appendChild(b);
      }
      b.textContent = n;
      b.style.display = n ? 'block' : 'none';
    });
  }

  var toastTimer = null;
  function toast(msg, linkText, href) {
    var old = d.querySelector('.akk-toast'); if (old) old.parentNode.removeChild(old);
    var t = d.createElement('div'); t.className = 'akk-toast';
    t.appendChild(d.createTextNode(msg));
    if (linkText) { var a = d.createElement('a'); a.href = href; a.textContent = linkText; t.appendChild(a); }
    d.body.appendChild(t);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 4000);
  }

  var swapped = false;
  function swap() {
    if (swapped) return; swapped = true;
    if (LIVE) {
      // pages with i18n.js: point the element at its "live" translation key (i18n.js applies it next)
      each('[data-live-i18n]', function (el) {
        var k = el.getAttribute('data-live-i18n');
        if (el.hasAttribute('data-i18n-html')) el.setAttribute('data-i18n-html', k);
        else el.setAttribute('data-i18n', k);
      });
      // pages without i18n.js (cart, checkout): plain replacement
      each('[data-live-text]', function (el) { el.textContent = el.getAttribute('data-live-text'); });
      each('[data-live-html]', function (el) { el.innerHTML = el.getAttribute('data-live-html'); });
      each('[data-live-href]', function (el) {
        var h = el.getAttribute('data-live-href');
        el.setAttribute('href', h);
        if (!/^https?:/i.test(h)) el.removeAttribute('target');     // same-site links open in the same tab
      });
      // product structured data: PreOrder -> InStock (search engines that run JS pick this up)
      each('script[type="application/ld+json"]', function (s) {
        if (s.textContent.indexOf('schema.org/PreOrder') > -1) {
          s.textContent = s.textContent.split('schema.org/PreOrder').join('schema.org/InStock');
        }
      });
    }
    refreshCartCount();
  }

  // Runs before i18n.js's own DOMContentLoaded handler (this script is loaded in <head>).
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', swap); else swap();
  w.addEventListener('storage', refreshCartCount);

  w.AKK_LAUNCH = {
    isLive: function () { return LIVE; },
    refreshCartCount: refreshCartCount,
    cleanCart: cleanCart,
    toast: toast
  };
})(window, document);
