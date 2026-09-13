const API_BASE_URL = 'https://a-s-collection.onrender.com';
let adminKey = sessionStorage.getItem('asc_admin_key') || '';
let products = [];
let editingId = null;
let variantRows = [];

const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginError = document.getElementById('loginError');
const keyInput = document.getElementById('adminKeyInput');
const formPanel = document.getElementById('productForm');

document.getElementById('loginBtn').addEventListener('click', attemptLogin);
keyInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') attemptLogin(); });
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('addProductBtn').addEventListener('click', () => openForm(null));
document.getElementById('cancelFormBtn').addEventListener('click', closeForm);
document.getElementById('addVariantBtn').addEventListener('click', () => {
  variantRows.push({ name: '', price: Number(document.getElementById('f_price').value) || 0, image: document.getElementById('f_image').value });
  renderVariantRows();
});
document.getElementById('saveProductBtn').addEventListener('click', saveProduct);

async function attemptLogin() {
  const key = keyInput.value.trim();
  if (!key) return;
  loginError.classList.add('hidden');
  const ok = await tryKey(key);
  if (ok) {
    adminKey = key;
    sessionStorage.setItem('asc_admin_key', key);
    showDashboard();
  } else {
    loginError.classList.remove('hidden');
  }
}

async function tryKey(key) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/products`, { headers: { 'x-admin-key': key } });
    return res.ok;
  } catch {
    return false;
  }
}

function logout() {
  sessionStorage.removeItem('asc_admin_key');
  adminKey = '';
  dashboard.classList.add('hidden');
  loginScreen.classList.remove('hidden');
}

async function showDashboard() {
  loginScreen.classList.add('hidden');
  dashboard.classList.remove('hidden');
  await loadProducts();
}

async function loadProducts() {
  const res = await fetch(`${API_BASE_URL}/api/admin/products`, { headers: { 'x-admin-key': adminKey } });
  if (!res.ok) { alert('Session expired — please log in again.'); return logout(); }
  products = await res.json();
  renderProductList();
}

function formatMoney(n) {
  return '₦' + Number(n).toLocaleString('en-NG');
}

function renderProductList() {
  document.getElementById('productList').innerHTML = products.map(p => `
    <div class="rounded-2xl border border-[#efe3d4] bg-white p-4 shadow-sm">
      <div class="flex items-center gap-4">
        <img src="${(p.images && p.images[0]) || ''}" class="h-16 w-16 rounded-xl object-cover bg-[#f5efe7]" onerror="this.style.visibility='hidden'" />
        <div class="min-w-0 flex-1">
          <div class="truncate font-semibold text-[#2A1215]">${p.name}</div>
          <div class="text-xs text-[#8d7b6d]">${p.category} • ${formatMoney(p.price)}</div>
        </div>
        <label class="flex items-center gap-2 text-xs">
          <span class="font-semibold ${p.in_stock ? 'text-green-700' : 'text-red-600'}">${p.in_stock ? 'In stock' : 'Out of stock'}</span>
          <input type="checkbox" class="stock-toggle h-5 w-5" data-id="${p.id}" ${p.in_stock ? 'checked' : ''} />
        </label>
      </div>
      <div class="mt-3 flex gap-2">
        <button class="edit-btn flex-1 rounded-full border border-[#e7d8c7] bg-[#fffaf5] px-3 py-2 text-xs font-semibold text-[#2A1215]" data-id="${p.id}">Edit</button>
        <button class="delete-btn flex-1 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600" data-id="${p.id}">Delete</button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.stock-toggle').forEach(cb => {
    cb.addEventListener('change', async () => {
      await fetch(`${API_BASE_URL}/api/admin/products/${cb.dataset.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ in_stock: cb.checked })
      });
      await loadProducts();
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openForm(products.find(p => p.id == btn.dataset.id)));
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Delete this product? This cannot be undone.')) return;
      await fetch(`${API_BASE_URL}/api/admin/products/${btn.dataset.id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey }
      });
      await loadProducts();
    });
  });
}

function openForm(product) {
  editingId = product ? product.id : null;
  document.getElementById('formTitle').textContent = product ? 'Edit Product' : 'Add Product';
  document.getElementById('f_name').value = product ? product.name : '';
  document.getElementById('f_category').value = product ? product.category : '';
  document.getElementById('f_badge').value = product ? (product.badge || '') : '';
  document.getElementById('f_description').value = product ? (product.description || '') : '';
  document.getElementById('f_image').value = product && product.images && product.images[0] ? product.images[0] : '';
  document.getElementById('f_price').value = product ? product.price : '';
  variantRows = product && product.variants ? product.variants.map(v => ({ ...v })) : [];
  renderVariantRows();
  formPanel.classList.remove('hidden');
  formPanel.scrollIntoView({ behavior: 'smooth' });
}

function closeForm() {
  formPanel.classList.add('hidden');
  editingId = null;
}

function renderVariantRows() {
  document.getElementById('variantRows').innerHTML = variantRows.map((v, i) => `
    <div class="mb-2 grid grid-cols-[1fr_80px_1fr_28px] gap-2">
      <input class="variant-name rounded-lg border border-[#e7d8c7] px-2 py-1.5 text-sm" placeholder="Variant name" value="${v.name || ''}" data-i="${i}" />
      <input class="variant-price rounded-lg border border-[#e7d8c7] px-2 py-1.5 text-sm" placeholder="Price" type="number" value="${v.price || ''}" data-i="${i}" />
      <input class="variant-image rounded-lg border border-[#e7d8c7] px-2 py-1.5 text-sm" placeholder="/images/xxx.jpg" value="${v.image || ''}" data-i="${i}" />
      <button type="button" class="remove-variant font-bold text-red-500" data-i="${i}">✕</button>
    </div>
  `).join('');

  document.querySelectorAll('.variant-name').forEach(el => el.addEventListener('input', e => variantRows[e.target.dataset.i].name = e.target.value));
  document.querySelectorAll('.variant-price').forEach(el => el.addEventListener('input', e => variantRows[e.target.dataset.i].price = Number(e.target.value)));
  document.querySelectorAll('.variant-image').forEach(el => el.addEventListener('input', e => variantRows[e.target.dataset.i].image = e.target.value));
  document.querySelectorAll('.remove-variant').forEach(el => el.addEventListener('click', e => {
    variantRows.splice(Number(e.target.dataset.i), 1);
    renderVariantRows();
  }));
}

async function saveProduct() {
  const payload = {
    name: document.getElementById('f_name').value.trim(),
    category: document.getElementById('f_category').value.trim(),
    badge: document.getElementById('f_badge').value.trim(),
    description: document.getElementById('f_description').value.trim(),
    images: [document.getElementById('f_image').value.trim()],
    price: Number(document.getElementById('f_price').value),
    variants: variantRows.filter(v => v.name && v.price)
  };
  if (!payload.name || !payload.category || !payload.price) {
    alert('Name, category and price are required.');
    return;
  }
  const url = editingId ? `${API_BASE_URL}/api/admin/products/${editingId}` : `${API_BASE_URL}/api/admin/products`;
  const method = editingId ? 'PATCH' : 'POST';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
    body: JSON.stringify(payload)
  });
  if (!res.ok) { alert('Save failed — check your connection and try again.'); return; }
  closeForm();
  await loadProducts();
}

const THEME_KEYS = ['primary', 'accent', 'bg', 'dark', 'secondary'];

async function loadThemeIntoPicker() {
  const res = await fetch(`${API_BASE_URL}/api/theme`);
  const theme = await res.json();
  THEME_KEYS.forEach(k => {
    document.getElementById(`theme_${k}`).value = theme[k];
    document.getElementById(`theme_${k}_hex`).value = theme[k];
  });
}

THEME_KEYS.forEach(k => {
  const colorInput = document.getElementById(`theme_${k}`);
  const hexInput = document.getElementById(`theme_${k}_hex`);
  colorInput.addEventListener('input', () => { hexInput.value = colorInput.value; });
  hexInput.addEventListener('input', () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(hexInput.value)) colorInput.value = hexInput.value;
  });
});

document.getElementById('saveThemeBtn').addEventListener('click', async () => {
  const payload = {};
  THEME_KEYS.forEach(k => { payload[k] = document.getElementById(`theme_${k}_hex`).value; });
  const res = await fetch(`${API_BASE_URL}/api/admin/theme`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
    body: JSON.stringify(payload)
  });
  const msg = document.getElementById('themeSavedMsg');
  if (res.ok) {
    msg.classList.remove('hidden');
    setTimeout(() => msg.classList.add('hidden'), 3000);
  } else {
    alert('Failed to save theme.');
  }
});

loadThemeIntoPicker();

if (adminKey) {
  tryKey(adminKey).then(ok => {
    if (ok) showDashboard();
    else { sessionStorage.removeItem('asc_admin_key'); adminKey = ''; }
  });
}
