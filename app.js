/* =========================================================
   APP STATE - catalog is fetched from the backend (/api/config)
   so pricing always matches what the server will charge.
========================================================= */

// Define your live Render backend URL:
const API_BASE_URL = 'https://a-s-collection.onrender.com';

const state = {
  activeCategory: 'all',
  cart: [],          // { key, type, productId?, variantName?, comboId?, label, price }
  products: [],
  comboOptions: [],
  destinations: {},
  paystackPublicKey: '',
  whatsappNumber: '',
  deliveryKey: 'pickup',
  cardVariantIndex: {}   // tracks which image-variant is showing on each product card, keyed by product id
};

function formatMoney(value) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
}
// A product only gets the hover-arrow image cycler if its variants
// actually point to different image files (not just different names/prices).
function getImageVariants(product) {
  if (!product.variants || product.variants.length < 2) return null;
  const uniqueImages = new Set(product.variants.map(v => v.image));
  if (uniqueImages.size < 2) return null;
  return product.variants;
}

function updateCardVariant(product, variant) {
  const imgSrc = variant.image?.startsWith('/') ? variant.image : `/${variant.image}`;
  const imgEl = document.getElementById(`cardImg-${product.id}`);
  if (imgEl) imgEl.src = imgSrc;
  const priceEl = document.getElementById(`cardPrice-${product.id}`);
  if (priceEl) priceEl.textContent = formatMoney(variant.price);
  const descEl = document.getElementById(`cardDesc-${product.id}`);
  if (descEl) descEl.textContent = variant.note || product.description;
  const labelEl = document.getElementById(`cardVariantLabel-${product.id}`);
  if (labelEl) labelEl.textContent = variant.name;
}

function shareProduct(product) {
  const variants = getImageVariants(product);
  const idx = variants ? (state.cardVariantIndex[product.id] ?? 0) : null;
  const variant = variants ? variants[idx] : null;
  const name = variant ? `${product.name} (${variant.name})` : product.name;
  const price = variant ? variant.price : product.price;
  const url = `${window.location.origin}${window.location.pathname}`;
  const text = `Check out ${name} — ${formatMoney(price)} at A's Collection! ${url}`;

  if (navigator.share) {
    navigator.share({ title: name, text, url }).catch(() => {});
  } else {
    // Fallback for browsers without the native share sheet (mostly desktop)
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }
}

async function loadConfig() {
  const res = await fetch(`${API_BASE_URL}/api/config`);
  const cfg = await res.json();
  state.products = cfg.products;
  state.comboOptions = cfg.comboOptions;
  state.destinations = cfg.destinations;
  state.paystackPublicKey = cfg.paystackPublicKey;
  state.whatsappNumber = cfg.whatsappNumber;

  renderFilterButtons();
  renderNavCategoryChips();
  renderProducts();
  renderComboItems();
  populateDestinations();

  const waLink = `https://wa.me/${state.whatsappNumber}?text=Hi%2C%20I%27d%20like%20some%20help%20with%20an%20order%20from%20A%27s%20Collection`;
  document.getElementById('whatsappSupportLink').href = waLink;
  document.getElementById('trackingWhatsappLink').href = `https://wa.me/${state.whatsappNumber}`;
  document.getElementById('footerSupportNumber').textContent = `Support: +${state.whatsappNumber}`;
}

/* COUNTDOWN TIMER (Sept 21-26 promo) */
function updateCountdown() {
  const now = new Date();
  const year = now.getFullYear();
  const saleStart = new Date(year, 8, 21, 0, 0, 0);
  const saleEnd = new Date(year, 8, 26, 23, 59, 59);
  const timerLabel = document.getElementById('timerLabel');
  const display = document.getElementById('countdownDisplay');
  let diff = 0;
  if (now < saleStart) { timerLabel.textContent = "Sales Start In"; diff = saleStart - now; }
  else if (now <= saleEnd) { timerLabel.textContent = "Sales End In"; diff = saleEnd - now; }
  else { timerLabel.textContent = "Promo Ended"; display.textContent = "00d 00h 00m 00s"; return; }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  display.textContent = `${String(days).padStart(2,'0')}d ${String(hours).padStart(2,'0')}h ${String(mins).padStart(2,'0')}m ${String(secs).padStart(2,'0')}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* CATEGORY FILTER BUTTONS (catalog section) */
function getCategories() {
  return ['all', ...new Set(state.products.map(p => p.category))];
}

function renderFilterButtons() {
  document.getElementById('filterButtons').innerHTML = getCategories().map(cat => `
    <button class="filter-btn rounded-full border border-[#2A1215]/10 px-3 py-2 text-xs font-semibold ${cat === state.activeCategory ? 'bg-[#2A1215] text-white' : 'bg-white text-[#2A1215]'}" data-category="${cat}">${cat === 'all' ? 'All' : cat}</button>
  `).join('');
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setActiveCategory(btn.dataset.category));
  });
}

function renderNavCategoryChips() {
  document.getElementById('navCategoryChips').innerHTML = getCategories().map(cat => `
    <button type="button" class="nav-category-btn flex-shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#5A2D82] shadow-sm ring-1 ring-[#e3d5c6] transition hover:bg-[#2A1215] hover:text-white" data-category="${cat}">${cat === 'all' ? 'All' : cat}</button>
  `).join('');
  document.querySelectorAll('.nav-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveCategory(btn.dataset.category);
      document.getElementById('bestsellers').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setActiveCategory(category) {
  state.activeCategory = category;
  renderFilterButtons();
  renderProducts();
}

/* RENDER PRODUCTS */
function renderProducts() {
  const filtered = state.products.filter(p => state.activeCategory === 'all' || p.category === state.activeCategory);

  document.getElementById('productGrid').innerHTML = filtered.map(product => {
    const imgVariants = getImageVariants(product);
    const idx = imgVariants ? (state.cardVariantIndex[product.id] ?? 0) : 0;
    const activeVariant = imgVariants ? imgVariants[idx] : null;

    const rawImg = activeVariant ? activeVariant.image : product.images[0];
    const imgSrc = rawImg?.startsWith('/') ? rawImg : `/${rawImg}`;
    const displayPrice = activeVariant ? activeVariant.price : product.price;
    const displayDesc = activeVariant ? (activeVariant.note || product.description) : product.description;

    return `
    <article class="product-card group overflow-hidden rounded-[28px] border border-[#efe3d4] bg-white shadow-sm transition hover:-translate-y-2" data-id="${product.id}">
      <div class="relative overflow-hidden">
        <img id="cardImg-${product.id}" src="${imgSrc}" alt="${product.name}" class="h-72 w-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80'" />
        <div class="absolute left-4 top-4 rounded-full bg-[#2A1215] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f7d77d]">${product.badge}</div>

        <button type="button" class="share-btn absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#2A1215] shadow-md transition hover:bg-white" data-id="${product.id}" aria-label="Share ${product.name}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.6" y1="10.6" x2="15.4" y2="6.4"></line>
            <line x1="8.6" y1="13.4" x2="15.4" y2="17.6"></line>
          </svg>
        </button>

        ${imgVariants ? `
          <button type="button" class="card-arrow absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-lg font-bold text-[#2A1215] shadow-md hover:bg-white" data-id="${product.id}" data-dir="-1" aria-label="Previous variant">‹</button>
          <button type="button" class="card-arrow absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-lg font-bold text-[#2A1215] shadow-md hover:bg-white" data-id="${product.id}" data-dir="1" aria-label="Next variant">›</button>
        ` : ''}
      </div>
      <div class="p-5">
        <div class="mb-3 flex items-center justify-between gap-3">
          <div>
            <div class="text-xs uppercase tracking-[0.2em] text-[#8d7b6d]">${product.category}</div>
            <h3 class="mt-1 font-display text-2xl text-[#2A1215]">${product.name}</h3>
            ${imgVariants ? `<div id="cardVariantLabel-${product.id}" class="mt-0.5 text-xs font-semibold text-[#5A2D82]">${activeVariant.name}</div>` : ''}
          </div>
          <div class="text-xl font-bold text-[#2A1215]" id="cardPrice-${product.id}">${formatMoney(displayPrice)}</div>
        </div>
        <p class="mb-4 text-sm leading-6 text-[#5f504a]" id="cardDesc-${product.id}">${displayDesc}</p>
        <div class="flex gap-3">
          <button class="add-cart-btn flex-1 rounded-full bg-[#2A1215] px-4 py-3 text-sm font-semibold text-white" data-id="${product.id}">Add to Cart</button>
          <button class="quick-view-btn rounded-full border border-[#e7d8c7] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#2A1215]" data-id="${product.id}">View</button>
        </div>
      </div>
    </article>
  `}).join('');

  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const product = state.products.find(p => p.id === id);
      const imgVariants = getImageVariants(product);
      if (imgVariants) {
        const idx = state.cardVariantIndex[id] ?? 0;
        const variant = imgVariants[idx];
        addToCart({ type: 'product', productId: id, variantName: variant.name, label: `${product.name} (${variant.name})`, price: variant.price });
      } else {
        quickAdd(id);
      }
    });
  });

  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      const product = state.products.find(p => p.id === id);
      if (!product) return;
      const imgVariants = getImageVariants(product);
      const initialVariant = imgVariants ? imgVariants[state.cardVariantIndex[id] ?? 0].name : null;
      openProductModal(product, initialVariant);
    });
  });

  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = state.products.find(p => p.id === Number(btn.dataset.id));
      if (product) shareProduct(product);
    });
  });

  document.querySelectorAll('.card-arrow').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      const product = state.products.find(p => p.id === id);
      const imgVariants = getImageVariants(product);
      if (!imgVariants) return;
      const dir = Number(btn.dataset.dir);
      const current = state.cardVariantIndex[id] ?? 0;
      const next = (current + dir + imgVariants.length) % imgVariants.length;
      state.cardVariantIndex[id] = next;
      updateCardVariant(product, imgVariants[next]);
    });
  });
}

function addToCart(item) {
  state.cart.push({ key: crypto.randomUUID(), ...item });
  updateCartBadge();
  openToast(`${item.label} added to cart`);
}

function quickAdd(id) {
  const product = state.products.find(p => p.id === id);
  if (product) addToCart({ type: 'product', productId: product.id, label: product.name, price: product.price });
}

function updateCartBadge() {
  document.getElementById('cartCount').textContent = state.cart.length;
}

function openToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-[90] rounded-full bg-[#2A1215] px-5 py-3 text-sm font-medium text-white shadow-lg';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

/* PRODUCT MODAL WITH VARIANT SELECTOR */
function openProductModal(product, initialVariantName) {
  const initialVariant = initialVariantName
    ? product.variants.find(v => v.name === initialVariantName)
    : null;

  let currentPrice = initialVariant ? initialVariant.price : product.price;
  let currentVariantName = initialVariant ? initialVariant.name : null;

  const content = document.getElementById('productModalContent');
  const initialImg = initialVariant?.image || product.images[0];
  const mainImgSrc = initialImg?.startsWith('/') ? initialImg : `/${initialImg}`;
  content.innerHTML = `
    <div class="grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
      <div>
        <div class="overflow-hidden rounded-[26px] bg-gradient-to-br from-[#5A2D82] via-[#2F1B42] to-[#0E0812] p-4">
          <img id="modalMainImg" src="${mainImgSrc}" alt="${product.name}" class="floating-bottle h-[380px] w-full rounded-[24px] object-cover shadow-[0_30px_80px_rgba(212,175,55,0.35)]" onerror="this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80'" />
        </div>
        <div class="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
          ${product.images.map((img, idx) => {
            const thumbSrc = img.startsWith('/') ? img : `/${img}`;
            return `
            <button type="button" class="img-thumb flex-shrink-0 overflow-hidden rounded-xl border-2 ${idx === 0 ? 'border-[#D4AF37]' : 'border-transparent'} w-16 h-16" data-src="${thumbSrc}">
              <img src="${thumbSrc}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80'" />
            </button>
          `}).join('')}
        </div>
      </div>

      <div class="space-y-5">
        <div class="flex items-center justify-between gap-4">
          <div>
            <div class="text-xs uppercase tracking-[0.2em] text-[#d9c3ff]">${product.category}</div>
            <h3 class="font-display text-4xl text-white">${product.name}</h3>
          </div>
          <div id="modalPrice" class="text-2xl font-bold text-[#f5d77b]">${formatMoney(currentPrice)}</div>
        </div>
        <p class="text-sm leading-7 text-white/75">${product.description}</p>
        ${product.variants.length > 0 ? `
          <div class="rounded-[22px] border border-white/10 bg-white/5 p-4">
            <label class="mb-2 block text-xs uppercase tracking-[0.2em] text-[#d9c3ff]">Select Variant</label>
            <select id="variantSelect" class="w-full rounded-xl bg-[#2A1215] border border-white/20 px-3 py-2 text-sm text-white outline-none">
              ${product.variants.map(v => {
                const varImg = v.image?.startsWith('/') ? v.image : `/${v.image}`;
                const isSelected = currentVariantName === v.name ? 'selected' : '';
                return `<option value="${v.name}" data-price="${v.price}" data-img="${varImg}" ${isSelected}>${v.name} - ${formatMoney(v.price)}</option>`;
              }).join('')}
            </select>
          </div>
        ` : ''}
        <div class="flex gap-3">
          <button id="modalAddCart" class="flex-1 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#2A1215]">Add to Cart</button>
          <button class="close-modal rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white">Close</button>
        </div>
      </div>
    </div>
  `;

  const modal = document.getElementById('productModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  content.querySelectorAll('.img-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      content.querySelectorAll('.img-thumb').forEach(t => t.classList.replace('border-[#D4AF37]', 'border-transparent'));
      thumb.classList.replace('border-transparent', 'border-[#D4AF37]');
      document.getElementById('modalMainImg').src = thumb.dataset.src;
    });
  });

  const variantSelect = document.getElementById('variantSelect');
  if (variantSelect) {
    currentVariantName = variantSelect.value;
    variantSelect.addEventListener('change', (e) => {
      const opt = e.target.options[e.target.selectedIndex];
      currentPrice = Number(opt.dataset.price);
      currentVariantName = opt.value;
      document.getElementById('modalPrice').textContent = formatMoney(currentPrice);
      if (opt.dataset.img) document.getElementById('modalMainImg').src = opt.dataset.img;
    });
  }

  document.getElementById('modalAddCart').addEventListener('click', () => {
    const label = currentVariantName ? `${product.name} (${currentVariantName})` : product.name;
    addToCart({ type: 'product', productId: product.id, variantName: currentVariantName || undefined, label, price: currentPrice });
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });
}

/* COMBO BUILDER */
function renderComboItems() {
  document.getElementById('comboItems').innerHTML = state.comboOptions.map(item => `
    <button type="button" class="combo-item rounded-[24px] border border-[#efe3d4] bg-[#fffaf6] p-4 text-left transition" data-id="${item.id}">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-xs uppercase tracking-[0.18em] text-[#8d7b6d]">Option</div>
          <div class="mt-1 text-xl font-bold text-[#2A1215]">${item.label}</div>
        </div>
        <span class="rounded-full bg-[#f5efe7] text-[#2A1215] px-2 py-1 text-[10px] font-semibold">Add</span>
      </div>
      <div class="mt-4 text-sm text-[#5d4f49]">${formatMoney(item.price)}</div>
    </button>
  `).join('');

  document.querySelectorAll('.combo-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const combo = state.comboOptions.find(c => c.id === btn.dataset.id);
      addToCart({ type: 'combo', comboId: combo.id, label: `Set: ${combo.label}`, price: combo.price });
    });
  });
}

/* DESTINATION SELECT */
function populateDestinations() {
  const select = document.getElementById('destinationSelect');
  select.innerHTML = Object.entries(state.destinations).map(([key, d]) =>
    `<option value="${key}">${d.label}${d.fee > 0 ? ` (${formatMoney(d.fee)})` : ''}</option>`
  ).join('');
  select.value = state.deliveryKey;
  select.addEventListener('change', (e) => {
    state.deliveryKey = e.target.value;
    updateCheckoutSummary();
  });
}

/* PRICE THE CART VIA THE BACKEND (authoritative) */
function cartToApiItems() {
  return state.cart.map(i => i.type === 'product'
    ? { type: 'product', productId: i.productId, variantName: i.variantName }
    : { type: 'combo', comboId: i.comboId });
}

async function fetchQuote() {
  const res = await fetch(`${API_BASE_URL}/api/orders/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cartToApiItems(), destinationKey: state.deliveryKey })
  });
  return res.json();
}

function removeFromCart(key) {
  state.cart = state.cart.filter(i => i.key !== key);
  updateCartBadge();
  updateCheckoutSummary();
}

async function updateCheckoutSummary() {
  const summaryEl = document.getElementById('checkoutSummary');
  if (state.cart.length === 0) {
    summaryEl.innerHTML = '<div class="text-[#6d5e56]">No items added yet.</div>';
    document.getElementById('builderTotal').textContent = formatMoney(0);
    return;
  }

  const quote = await fetchQuote();
  let html = state.cart.map(i => `
    <div class="flex items-center justify-between gap-3">
      <span>${i.label}</span>
      <span class="flex items-center gap-2">
        <span>${formatMoney(i.price)}</span>
        <button type="button" class="remove-cart-item-btn flex h-6 w-6 items-center justify-center rounded-full border border-[#e7d8c7] bg-[#fffaf5] text-xs font-bold text-[#8d3a3a] transition hover:bg-[#f3d9d9]" data-key="${i.key}" aria-label="Remove ${i.label}" title="Remove">&times;</button>
      </span>
    </div>`).join('');
  html += `<div class="mt-2 flex justify-between border-t pt-2"><span>Subtotal</span><span>${formatMoney(quote.subtotal)}</span></div>`;
  if (quote.discount > 0) html += `<div class="flex justify-between text-green-700 font-semibold"><span>Promo Discount</span><span>-${formatMoney(quote.discount)}</span></div>`;
  if (quote.deliveryFee > 0) html += `<div class="flex justify-between text-xs"><span>Shipping (${quote.destinationLabel})</span><span>${formatMoney(quote.deliveryFee)}</span></div>`;
  html += `<div class="mt-2 flex justify-between border-t pt-2 font-bold text-[#2A1215] text-base"><span>Grand Total</span><span>${formatMoney(quote.total)}</span></div>`;
  summaryEl.innerHTML = html;

  document.querySelectorAll('.remove-cart-item-btn').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.key));
  });
}

function openCheckoutModal() {
  updateCheckoutSummary();
  document.getElementById('checkoutModal').classList.remove('hidden');
  document.getElementById('checkoutModal').classList.add('flex');
}
document.getElementById('navCheckoutBtn').addEventListener('click', openCheckoutModal);
document.getElementById('cartBtn').addEventListener('click', openCheckoutModal);

/* CHECKOUT: create pending order -> Paystack -> verify server-side */
document.getElementById('checkoutForm').addEventListener('submit', async event => {
  event.preventDefault();
  if (state.cart.length === 0) {
    alert('Please add at least one perfume or set option to your cart before checking out.');
    return;
  }

  const name = document.getElementById('custName').value;
  const email = document.getElementById('custEmail').value;
  const phone = document.getElementById('custPhone').value;
  const payBtn = document.getElementById('payNowBtn');
  payBtn.disabled = true;
  payBtn.textContent = 'Preparing your order...';

  try {
    const orderRes = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartToApiItems(), destinationKey: state.deliveryKey, name, email, phone })
    });
    const order = await orderRes.json();
    if (!orderRes.ok) throw new Error(order.error || 'Could not create order');

    const handler = PaystackPop.setup({
      key: state.paystackPublicKey,
      email: email,
      amount: order.total * 100,
      currency: 'NGN',
      ref: order.reference,
      callback: function() {
        fetch(`${API_BASE_URL}/api/payments/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: order.reference })
        })
          .then(r => r.json())
          .then(result => {
            if (result.status !== 'paid') {
              alert('We could not confirm your payment yet. If you were charged, contact support with reference ' + order.reference);
              return;
            }
            document.getElementById('trackingIdDisplay').textContent = result.trackingId;
            document.getElementById('checkoutModal').classList.add('hidden');
            document.getElementById('checkoutModal').classList.remove('flex');
            document.getElementById('successModal').classList.remove('hidden');
            document.getElementById('successModal').classList.add('flex');
            state.cart = [];
            updateCartBadge();
          })
          .catch(() => alert('Payment verification failed. Please contact support with reference ' + order.reference));
      },
      onClose: function() {
        alert('Transaction cancelled.');
      }
    });
    handler.openIframe();
  } catch (err) {
    alert(err.message);
  } finally {
    payBtn.disabled = false;
    payBtn.textContent = 'Pay Now via Paystack';
  }
});

/* ORDER TRACKING */
document.getElementById('orderTrackingLink').addEventListener('click', () => {
  document.getElementById('trackingResult').innerHTML = '';
  document.getElementById('trackingForm').reset();
  const modal = document.getElementById('trackingModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
});

document.getElementById('trackingForm').addEventListener('submit', async event => {
  event.preventDefault();
  const trackingId = document.getElementById('trackingIdInput').value.trim();
  const email = document.getElementById('trackingEmailInput').value.trim();
  const resultBox = document.getElementById('trackingResult');

  try {
    const res = await fetch(`${API_BASE_URL}/api/orders/track?trackingId=${encodeURIComponent(trackingId)}&email=${encodeURIComponent(email)}`);
    if (!res.ok) {
      resultBox.innerHTML = `<div class="rounded-2xl border border-[#e7d8c7] bg-[#fffaf5] p-4 text-sm text-[#5f504a]">We couldn't find an order with that tracking ID and email. Please double check them, or contact us on WhatsApp.</div>`;
      return;
    }
    const order = await res.json();
    const items = order.items.map(i => i.label).join(', ');
    resultBox.innerHTML = `
      <div class="rounded-2xl border border-[#D4AF37]/40 bg-[#fffaf1] p-4 text-sm text-[#2A1215]">
        <div class="mb-2 flex items-center justify-between">
          <span class="font-semibold">${order.tracking_id}</span>
          <span class="rounded-full bg-[#2A1215] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#f7d87f]">${order.status}</span>
        </div>
        <div class="space-y-1 text-xs text-[#5f504a]">
          <div>Placed: ${new Date(order.created_at).toLocaleString('en-NG')}</div>
          <div>Destination: ${order.destination}</div>
          <div>Items: ${items}</div>
          <div class="pt-1 font-semibold text-[#2A1215]">Total: ${formatMoney(order.total)}</div>
        </div>
      </div>`;
  } catch {
    resultBox.innerHTML = `<div class="rounded-2xl border border-[#e7d8c7] bg-[#fffaf5] p-4 text-sm text-[#5f504a]">Something went wrong. Please try again.</div>`;
  }
});

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.close-modal');
  if (!btn) return;
  const modal = btn.closest('.modal-backdrop');
  if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
});

loadConfig();