// Simple frontend logic to fetch products, manage cart, register user, and checkout (mock)
const API_BASE = (window.location.origin.includes('http') && window.location.hostname === 'localhost') ? 'http://localhost:4000' : (window.__BACKEND_ORIGIN__ || '');

async function fetchProducts() {
  const res = await fetch((API_BASE || '') + '/api/products');
  return res.json();
}

function formatCurrency(n) { return '₦' + Number(n).toLocaleString(); }

async function renderProducts() {
  const products = await fetchProducts();
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'gallery-items product-item';
    div.innerHTML = `
      <img src="${p.image_url || '/images/placeholder.jpg'}" alt="${p.title}">
      <p>${p.title}</p>
      <span>${formatCurrency(p.price)}</span>
      <div style="margin-top:8px;display:flex;gap:8px;">
        <button class="add-btn" data-id="${p.id}">Add</button>
        <small style="align-self:center;color:#666;">Stock: ${p.stock}</small>
      </div>
    `;
    grid.appendChild(div);
  });
  document.querySelectorAll('.add-btn').forEach(b => b.addEventListener('click', addToCartHandler));
}

let CART = JSON.parse(localStorage.getItem('wedding_cart')||'[]');

function saveCart() { localStorage.setItem('wedding_cart', JSON.stringify(CART)); renderCart(); }

function addToCartHandler(e) {
  const id = Number(e.currentTarget.dataset.id);
  const found = CART.find(x=>x.product_id===id);
  if (found) found.qty += 1; else CART.push({ product_id: id, qty: 1 });
  saveCart();
}

async function renderCart() {
  const cartEl = document.getElementById('cartItems');
  if (!cartEl) return;
  if (CART.length === 0) { cartEl.innerHTML = '<p>Cart empty</p>'; return; }
  // fetch product details
  const products = await fetchProducts();
  let html = '';
  let total = 0;
  CART.forEach(it => {
    const p = products.find(x=>x.id===it.product_id);
    if (!p) return;
    const line = p.price * it.qty; total += line;
    html += `<div style="display:flex;justify-content:space-between;margin-bottom:8px;"><div><strong>${p.title}</strong><br><small>₦${p.price} × ${it.qty}</small></div><div><button onclick="decrease(${p.id})">-</button><button onclick="increase(${p.id})">+</button></div></div>`;
  });
  html += `<hr><p><strong>Total: ${formatCurrency(total)}</strong></p><button id="checkoutBtn">Proceed to Payment</button>`;
  cartEl.innerHTML = html;
  document.getElementById('checkoutBtn')?.addEventListener('click', beginCheckout);
}

function decrease(id){ const it=CART.find(x=>x.product_id===id); if(!it) return; it.qty--; if(it.qty<=0) CART=CART.filter(x=>x.product_id!==id); saveCart(); }
function increase(id){ const it=CART.find(x=>x.product_id===id); if(!it) return; it.qty++; saveCart(); }

async function beginCheckout(){
  // ensure user registered
  let user = JSON.parse(localStorage.getItem('wedding_user')||'null');
  if (!user) {
    // open register modal
    document.getElementById('registerModal').style.display = 'flex';
    return;
  }
  // call backend checkout with mock payment
  const res = await fetch((API_BASE || '') + '/api/checkout', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ user_id: user.id, items: CART, payment: { mock: true } })
  });
  const j = await res.json();
  if (res.ok) {
    alert('Payment successful. Order ID: ' + j.order_id);
    CART = []; saveCart(); renderProducts();
  } else {
    alert('Checkout failed: ' + (j.error || 'unknown'));
  }
}

async function submitRegisterForm(e){
  e.preventDefault();
  const full_name = document.getElementById('r_name').value.trim();
  const email = document.getElementById('r_email').value.trim();
  const address = document.getElementById('r_address').value.trim();
  const phone = document.getElementById('r_phone').value.trim();
  if (!full_name || !email) { alert('Name and email required'); return; }
  const res = await fetch((API_BASE || '') + '/api/register', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ full_name,email,address,phone }) });
  const j = await res.json();
  if (res.ok) {
    localStorage.setItem('wedding_user', JSON.stringify(j));
    document.getElementById('registerModal').style.display = 'none';
    renderCart();
    alert('Registered as ' + j.full_name);
  } else {
    alert('Registration failed');
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts(); renderCart();
  document.getElementById('registerForm')?.addEventListener('submit', submitRegisterForm);
  document.getElementById('openCartBtn')?.addEventListener('click', ()=>{ document.getElementById('cartModal').style.display='flex'; renderCart(); });
  document.querySelectorAll('.close-modal').forEach(b=>b.addEventListener('click', (e)=> e.target.closest('.modal').style.display='none'));
});
