(function(){
  const isNode = typeof module !== 'undefined' && module.exports;

  /**
   * COMPLETE PRODUCT CATALOG - A's Collection
   * All images use Vercel-compatible relative paths (images/filename.ext)
   * 38 Products: 29 Named + 8 Placeholders + 1 Asset
   */
  const sampleProducts = [
    // ========================================
    // ARABIAN OILS & PREMIUM PERFUMES
    // ========================================
    {
      id: 1,
      title: 'Khamrah by Lattafa',
      category: 'Arabian Perfumes',
      price: 45000,
      stock: 6,
      image: 'images/Khamrah.HEIC',
      images: ['images/Khamrah.HEIC', 'images/Khamrah Dukhan.jpg', 'images/Khamrah Qahwa.jpg', 'images/Khamrah Waha.jpg'],
      variants: [
        { size: '100ml', price: 45000, image: 'images/Khamrah.HEIC' },
        { size: '100ml Dukhan', price: 45000, image: 'images/Khamrah Dukhan.jpg' },
        { size: '100ml Qahwa', price: 48000, image: 'images/Khamrah Qahwa.jpg' },
        { size: '100ml Waha', price: 48000, image: 'images/Khamrah Waha.jpg' }
      ]
    },
    {
      id: 2,
      title: 'Asad Elixir',
      category: 'Arabian Perfumes',
      price: 35000,
      stock: 8,
      image: 'images/Asad.HEIC',
      images: ['images/Asad.HEIC', 'images/Asad Bourbon.HEIC'],
      variants: [
        { size: '100ml Classic', price: 35000, image: 'images/Asad.HEIC' },
        { size: '100ml Bourbon', price: 38000, image: 'images/Asad Bourbon.HEIC' }
      ]
    },
    {
      id: 3,
      title: 'Opulent by Lattafa - 100ml',
      category: 'Arabian Perfumes',
      price: 25000,
      stock: 3,
      image: 'images/Opulent.HEIC',
      images: ['images/Opulent.HEIC'],
      variants: [{ size: '100ml', price: 25000, image: 'images/Opulent.HEIC' }]
    },
    {
      id: 4,
      title: 'Oud Al Layl',
      category: 'Arabian Perfumes',
      price: 17000,
      stock: 5,
      image: 'images/Oud Al layl.jpg',
      images: ['images/Oud Al layl.jpg'],
      variants: [{ size: '100ml', price: 17000, image: 'images/Oud Al layl.jpg' }]
    },
    {
      id: 5,
      title: 'Hayaati by Lattafa',
      category: 'Arabian Perfumes',
      price: 22000,
      stock: 5,
      image: 'images/Hayaati.HEIC',
      images: ['images/Hayaati.HEIC'],
      variants: [{ size: '100ml', price: 22000, image: 'images/Hayaati.HEIC' }]
    },
    {
      id: 6,
      title: 'Bade\'e Al Oud - Gift Box',
      category: 'Gift Box',
      price: 20000,
      stock: 4,
      image: 'images/Bade\'e Al Oud.HEIC',
      images: ['images/Bade\'e Al Oud.HEIC'],
      variants: [{ size: '100ml', price: 20000, image: 'images/Bade\'e Al Oud.HEIC' }]
    },
    {
      id: 7,
      title: 'Qe\'ad Al Fursan',
      category: 'Arabian perfumes',
      price: 25000,
      stock: 4,
      image: 'images/Qe\'ad Al Fursan.jpg',
      images: ['images/Qe\'ad Al Fursan.jpg'],
      variants: [{ size: '100ml', price: 25000, image: 'images/Qe\'ad Al Fursan.jpg' }]
    },
    {
      id: 8,
      title: 'Ramz Gold by Lattafa',
      category: 'Arabian Perfumes',
      price: 20000,
      stock: 4,
      image: 'images/Ramz Gold by Lattafa.jpg',
      images: ['images/Ramz Gold by Lattafa.jpg'],
      variants: [{ size: '100ml', price: 20000, image: 'images/Ramz Gold by Lattafa.jpg' }]
    },
    // ========================================
    // DESIGNER PERFUMES & FRAGRANCE LINES
    // ========================================
    {
      id: 9,
      title: 'KALY',
      category: 'Designer Perfumes',
      price: 12000,
      stock: 10,
      image: 'images/KALY.HEIC',
      images: ['images/KALY.HEIC'],
      variants: [
        { size: '50ml', price: 12000, image: 'images/KALY.HEIC' },
        { size: '30ml', price: 7000, image: 'images/KALY.HEIC' }
      ]
    },
    {
      id: 10,
      title: 'Matelot - Designer Perfume',
      category: 'Designer Perfumes',
      price: 15000,
      stock: 4,
      image: 'images/Matelot.HEIC',
      images: ['images/Matelot.HEIC', 'images/Matelot gift set.HEIC'],
      variants: [
        { size: '100ml', price: 15000, image: 'images/Matelot.HEIC' },
        { size: 'Gift Set', price: 22000, image: 'images/Matelot gift set.HEIC' }
      ]
    },
    {
      id: 11,
      title: 'Club de Nuit Iconic',
      category: 'Designer Perfumes',
      price: 55000,
      stock: 9,
      image: 'images/Club de Nuit Iconic.jpg',
      images: ['images/Club de Nuit Iconic.jpg'],
      variants: [{ size: '105ml', price: 55000, image: 'images/Club de Nuit Iconic.jpg' }]
    },
    {
      id: 12,
      title: 'Club De Nuit Intense Man',
      category: 'Designer Perfumes',
      price: 60000,
      stock: 3,
      image: 'images/Club De Nuit Intense Man.jpg',
      images: ['images/Club De Nuit Intense Man.jpg'],
      variants: [{ size: '105ml', price: 60000, image: 'images/Club De Nuit Intense Man.jpg' }]
    },
    {
      id: 13,
      title: 'Coco Mademoiselle - Luxury Perfume',
      category: 'Gift Perfumes',
      price: 42000,
      stock: 2,
      image: 'images/image11.jpg',
      images: ['images/image11.jpg'],
      variants: [{ size: '100ml', price: 42000, image: 'images/image11.jpg' }]
    },
    {
      id: 14,
      title: 'Dior Sauvage - Luxury Fragrance',
      category: 'Gift Perfumes',
      price: 55000,
      stock: 5,
      image: 'images/image6.jpg',
      images: ['images/image6.jpg'],
      variants: [{ size: '100ml', price: 55000, image: 'images/image6.jpg' }]
    },
    // ========================================
    // 9AM BY AFNAN - FRAGRANCE LINE
    // ========================================
    {
      id: 15,
      title: '9AM by Afnan',
      category: 'Designer Perfumes',
      price: 45000,
      stock: 5,
      image: 'images/9am by Afnan.HEIC',
      images: ['images/9am by Afnan.HEIC', 'images/9am Diva by Afnan.HEIC'],
      variants: [
        { size: '100ml Classic', price: 20000, image: 'images/9am by Afnan.HEIC' },
        { size: '100ml Diva', price: 20000, image: 'images/9am Diva by Afnan.HEIC' }
      ]
    },
    {
      id: 16,
      title: '9PM by Afnan',
      category: 'Designer Perfumes',
      price: 50000,
      stock: 5,
      image: 'images/9pm by Afnan.HEIC',
      images: ['images/9pm by Afnan.HEIC', 'images/9pm Pour Homme by Afnan.HEIC'],
      variants: [
        { size: '100ml Classic', price: 20000, image: 'images/9pm by Afnan.HEIC' },
        { size: '100ml Pour Homme', price: 20000, image: 'images/9pm Pour Homme by Afnan.HEIC' }
      ]
    },
    {
      id: 17,
      title: '9PM Elixir (Mini) by Afnan',
      category: 'Mini Perfumes',
      price: 5000,
      stock: 8,
      image: 'images/9pm Elixir (Mini).jpg',
      images: ['images/9pm Elixir (Mini).jpg'],
      variants: [{ size: '30ml Mini', price: 5000, image: 'images/9pm Elixir (Mini).jpg' }]
    },
    // ========================================
    // BODY MISTS & BODY SPRAYS
    // ========================================
    {
      id: 18,
      title: 'Victoria Secret Body Mist',
      category: 'Body Mists',
      price: 5000,
      stock: 12,
      image: 'images/Victoria Secret body mist.jpg',
      images: ['images/Victoria Secret body mist.jpg'],
      variants: [{ size: '250ml', price: 5000, image: 'images/Victoria Secret body mist.jpg' }]
    },
    {
      id: 19,
      title: 'Lasgidi Body Mist',
      category: 'Body Spray',
      price: 3500,
      stock: 16,
      image: 'images/Lasgidi Body mist.jpg',
      images: ['images/Lasgidi Body mist.jpg'],
      variants: [{ size: '100ml', price: 3500, image: 'images/Lasgidi Body mist.jpg' }]
    },
    {
      id: 20,
      title: 'Riggs Body Mist',
      category: 'Body Mists',
      price: 5000,
      stock: 6,
      image: 'images/Riggs body mist.HEIC',
      images: ['images/Riggs body mist.HEIC'],
      variants: [{ size: '100ml', price: 5000, image: 'images/Riggs body mist.HEIC' }]
    },
    // ========================================
    // GIFT SETS & SPECIAL COLLECTIONS
    // ========================================
    {
      id: 21,
      title: 'Smart Collection',
      category: 'Mini Perfumes',
      price: 5000,
      stock: 5,
      image: 'images/Smart collection (Mini).JPG',
      images: ['images/Smart collection (Mini).JPG'],
      variants: [{ size: '30ml', price: 5000, image: 'images/Smart collection (Mini).JPG' }]
    },
    {
      id: 22,
      title: 'Veyes Gift Box Set',
      category: 'Gift Perfumes',
      price: 20000,
      stock: 4,
      image: 'images/Veyes gift box.HEIC',
      images: ['images/Veyes gift box.HEIC'],
      variants: [{ size: 'Gift Box', price: 20000, image: 'images/Veyes gift box.HEIC' }]
    },
    {
      id: 23,
      title: 'Vintage Radio Mini Collection',
      category: 'Mini Perfumes',
      price: 9000,
      stock: 5,
      image: 'images/Vintage Radio (Mini).jpg',
      images: ['images/Vintage Radio (Mini).jpg'],
      variants: [{ size: 'Mini Set', price: 9000, image: 'images/Vintage Radio (Mini).jpg' }]
    },
    {
      id: 24,
      title: 'Pocket Perfumes Collection',
      category: 'Mini Perfumes',
      price: 1700,
      stock: 50,
      image: 'images/Pocket perfumes.HEIC',
      images: ['images/Pocket perfumes.HEIC'],
      variants: [{ size: 'Pocket Set', price: 1700, image: 'images/Pocket perfumes.HEIC' }]
    },
    // ========================================
    // SPECIALTY & MULTI-PURPOSE PRODUCTS
    // ========================================
    {
      id: 25,
      title: 'Mousuf 4in1',
      category: 'Gift Perfumes',
      price: 22000,
      stock: 5,
      image: 'images/Mousuf 4in1.HEIC',
      images: ['images/Mousuf 4in1.HEIC'],
      variants: [{ size: '25ml 4in1', price: 22000, image: 'images/Mousuf 4in1.HEIC' }]
    },
    {
      id: 26,
      title: 'Oud Mood 3in1',
      category: 'Gift Perfumes',
      price: 22000,
      stock: 4,
      image: 'images/Oud mood 3in1.HEIC',
      images: ['images/Oud mood 3in1.HEIC'],
      variants: [{ size: '50ml 3in1', price: 22000, image: 'images/Oud mood 3in1.HEIC' }]
    },
    {
      id: 27,
      title: 'Choco Musk - Premium Fragrance',
      category: 'Mini Perfumes',
      price: 5000,
      stock: 6,
      image: 'images/Choco Musk.HEIC',
      images: ['images/Choco Musk.HEIC'],
      variants: [{ size: '50ml', price: 5000, image: 'images/Choco Musk.HEIC' }]
    },
    {
      id: 28,
      title: 'Confetti',
      category: 'Body Spray',
      price: 5000,
      stock: 20,
      image: 'images/Confetti.HEIC',
      images: ['images/Confetti.HEIC'],
      variants: [{ size: '100ml', price: 5000, image: 'images/Confetti.HEIC' }]
    },
    {
      id: 29,
      title: '24K White',
      category: 'Designer Perfumes',
      price: 7000,
      stock: 4,
      image: 'images/24K white.HEIC',
      images: ['images/24K white.HEIC'],
      variants: [{ size: '100ml', price: 7000, image: 'images/24K white.HEIC' }]
    },
    // ========================================
    // PLACEHOLDER ENTRIES (PENDING CATEGORIZATION)
    // ========================================
    {
      id: 30,
      title: 'Generic Perfume (Image 1)',
      category: 'Uncategorized',
      price: 0,
      stock: 0,
      image: 'images/image1.jpg',
      isPendingEdit: true,
      variants: []
    },
    {
      id: 31,
      title: 'Generic Perfume (Image 2)',
      category: 'Uncategorized',
      price: 0,
      stock: 0,
      image: 'images/image2.jpg',
      isPendingEdit: true,
      variants: []
    },
    {
      id: 32,
      title: 'Generic Perfume (Image 3)',
      category: 'Uncategorized',
      price: 0,
      stock: 0,
      image: 'images/image3.jpg',
      isPendingEdit: true,
      variants: []
    },
    {
      id: 33,
      title: 'Generic Perfume (Image 4)',
      category: 'Uncategorized',
      price: 0,
      stock: 0,
      image: 'images/image4.jpg',
      isPendingEdit: true,
      variants: []
    },
    {
      id: 34,
      title: 'Generic Perfume (Image 5)',
      category: 'Uncategorized',
      price: 0,
      stock: 0,
      image: 'images/image5.jpg',
      isPendingEdit: true,
      variants: []
    },
    {
      id: 35,
      title: 'Generic Perfume (Image 8)',
      category: 'Uncategorized',
      price: 0,
      stock: 0,
      image: 'images/image8.jpeg',
      isPendingEdit: true,
      variants: []
    },
    {
      id: 36,
      title: 'Generic Perfume (Image 9)',
      category: 'Uncategorized',
      price: 0,
      stock: 0,
      image: 'images/image9.jpg',
      isPendingEdit: true,
      variants: []
    },
    {
      id: 37,
      title: 'Generic Perfume (Image 16)',
      category: 'Uncategorized',
      price: 0,
      stock: 0,
      image: 'images/image16.jpg',
      isPendingEdit: true,
      variants: []
    },
    {
      id: 38,
      title: 'Logo Asset',
      category: 'Uncategorized',
      price: 0,
      stock: 0,
      image: 'images/Logo.jpg',
      isPendingEdit: true,
      isAsset: true,
      variants: []
    }
  ];

  // Delivery destinations and fees
  const deliveryDestinations = [
    { id: 0, name: 'Pick up', fee: 0},
    { id: 1, name: 'Abuja Central', fee: 2000 },
    { id: 2, name: 'Abuja Satellite Towns', fee: 2500 },
    { id: 3, name: 'Lagos', fee: 5000 },
    { id: 4, name: 'Interstate Shipping', fee: 8000 }
  ];

  // Categories
  const categories = [
    'All Perfumes',
    'Gift Perfumes',
    'Oil Perfumes',
    'Body Spray',
    'Body Mists',
    'Mini Perfumes'
  ];

  function getStorage(key, fallback){
    try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; } catch(e){ return fallback; }
  }
  function setStorage(key, val){ try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){} }

  function generateTrackingId(){
    const timestamp = Date.now().toString().slice(-5);
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `TRK-ASC-${random}${timestamp}`;
  }

  function calculateDiscount(subtotal){
    const today = new Date();
    const discountStart = new Date(2026, 8, 21); // September 21
    const discountEnd = new Date(2026, 8, 26); // September 26
    
    if(today >= discountStart && today <= discountEnd) {
      let discountPercent = 10;
      if(subtotal > 15000) discountPercent = 15;
      return { percent: discountPercent, amount: (subtotal * discountPercent) / 100 };
    }
    return { percent: 0, amount: 0 };
  }

  let products = [];
  let currentUser = null;
  let cart = [];
  let orders = [];
  let currentFilter = 'All Perfumes';
  let searchQuery = '';

  function init(){
    const storedProducts = getStorage('products', null);
    products = Array.isArray(storedProducts) && storedProducts.length > 0
      ? storedProducts
      : sampleProducts;
    currentUser = getStorage('currentUser', null);
    cart = getStorage('cart', []);
    orders = getStorage('orders', []);
    
    const authBtn = document.getElementById('authNavBtn');
    if(currentUser && authBtn) {
      authBtn.textContent = 'Logout';
    }
    
    renderProducts();
    attachUI();
    updateCartBadge();
    renderCategoryDropdown();
  }

  function renderCategoryDropdown(){
    const dropdown = document.getElementById('categoryDropdown');
    if(!dropdown) return;
    
    dropdown.innerHTML = '';
    categories.forEach(cat => {
      const li = document.createElement('li');
      li.style.cssText = 'padding: 10px 15px; cursor: pointer; border-bottom: 1px solid #eee; transition: all 0.3s;';
      li.textContent = cat;
      li.addEventListener('mouseover', () => li.style.backgroundColor = '#f0f0f0');
      li.addEventListener('mouseout', () => li.style.backgroundColor = 'transparent');
      li.addEventListener('click', () => {
        currentFilter = cat;
        searchQuery = '';
        document.getElementById('searchInput').value = '';
        renderProducts();
        const menu = document.getElementById('categoryMenu');
        if(menu) menu.style.display = 'none';
      });
      dropdown.appendChild(li);
    });
  }

  function filterProducts(){
    let filtered = [...products];
    
    // Apply category filter
    if(currentFilter !== 'All Perfumes') {
      filtered = filtered.filter(p => p.category === currentFilter);
    }
    
    // Apply search filter
    if(searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }

  function renderProducts(){
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    
    const filtered = filterProducts();
    grid.innerHTML = '';
    
    // Show "No products found" message
    if(filtered.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 40px; color: #999; font-size: 18px;';
      emptyMsg.textContent = searchQuery ? 
        `No perfumes found matching "${searchQuery}"` : 
        `No perfumes found in "${currentFilter}"`;
      grid.appendChild(emptyMsg);
      return;
    }
    
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'gallery-items';
      card.style.position = 'relative';
      
      // Out of stock overlay
      const outOfStockHTML = p.stock === 0 ? `
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
          background: rgba(0,0,0,0.7); border-radius: 8px; display: flex; 
          align-items: center; justify-content: center; z-index: 10;">
          <div style="background: #e53e3e; color: white; padding: 12px 24px; 
            border-radius: 6px; font-weight: bold; font-size: 16px;">
            Out of Stock
          </div>
        </div>
      ` : '';
      
      card.innerHTML = `
        <div style="position: relative; overflow: hidden; border-radius: 10px;">
          <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; cursor: pointer;" 
            onclick="openProductModal(${p.id})">
          ${outOfStockHTML}
        </div>
        <p style="margin: 10px 0; font-weight: bold; color: #333;">${p.title}</p>
        <span style="color: #8a7350; font-size: 0.95rem; font-weight: bold; display: block; margin: 10px 0;">₦${p.price.toLocaleString()}</span>
        <span style="color: #999; font-size: 0.85rem; display: block; margin: 5px 0;">${p.category}</span>
        <button data-id="${p.id}" class="add-btn gradient-btn" style="width: 100%;" ${p.stock === 0 ? 'disabled' : ''}>
          ${p.stock === 0 ? 'Out of Stock' : 'Add to cart'}
        </button>
      `;
      grid.appendChild(card);
    });
    
    document.querySelectorAll('.add-btn:not(:disabled)').forEach(b => 
      b.addEventListener('click', (e) => {
        e.preventDefault();
        const id = Number(e.currentTarget.dataset.id);
        addToCart(id, 1);
      })
    );
  }

  function openProductModal(productId){
    const product = products.find(p => p.id === productId);
    if(!product) return;
    
    const modal = document.getElementById('productModal');
    if(!modal) return;
    
    // Store current product for variant selection
    window.currentProductVariant = product.variants ? product.variants[0] : { price: product.price, size: '1x', image: product.image };
    
    let variantHTML = '';
    if(product.variants && product.variants.length > 0) {
      variantHTML = `
        <div style="margin: 15px 0;">
          <h4 style="color: #8a7350; margin-bottom: 10px;">Select Variant:</h4>
          <div class="variant-slider" style="display: flex; gap: 10px; overflow-x: auto; padding: 10px 0;">
      `;
      product.variants.forEach((v, idx) => {
        variantHTML += `
          <div onclick="selectVariant(${productId}, ${idx})" style="
            cursor: pointer; border: 2px solid #ddd; border-radius: 8px; 
            padding: 10px; text-align: center; min-width: 100px; 
            transition: all 0.3s;" class="variant-option-${productId}-${idx}">
            <img src="${v.image}" alt="${v.size}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;">
            <p style="margin: 5px 0; font-weight: bold;">${v.size}</p>
            <p style="margin: 0; color: #8a7350; font-weight: bold;">₦${v.price.toLocaleString()}</p>
          </div>
        `;
      });
      variantHTML += `</div></div>`;
    }
    
    const productContent = document.getElementById('productModalContent');
    productContent.innerHTML = `
      <button class="close-modal" onclick="closeModal('productModal')" style="float: right; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
      <div style="clear: both; margin-top: 10px;">
        <h3>${product.title}</h3>
        <img src="${product.image}" alt="${product.title}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin: 15px 0;">
        ${variantHTML}
        <p style="color: #666; margin: 15px 0; line-height: 1.6;">${product.description || 'Premium quality fragrance'}</p>
        <p style="color: #8a7350; font-size: 1.2rem; font-weight: bold; margin: 15px 0;">
          Current Price: ₦<span id="modalPrice">${window.currentProductVariant.price.toLocaleString()}</span>
        </p>
        <p style="color: #999; font-size: 0.9rem; margin: 10px 0;">
          Stock Available: <strong>${product.stock}</strong>
        </p>
        <button onclick="addToCartFromModal(${productId}, 1)" class="gradient-btn" style="width: 100%; margin-top: 15px;" ${product.stock === 0 ? 'disabled' : ''}>
          ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    `;
    openModal('productModal');
  }

  window.selectVariant = function(productId, variantIdx){
    const product = products.find(p => p.id === productId);
    if(!product || !product.variants) return;
    
    window.currentProductVariant = product.variants[variantIdx];
    document.getElementById('modalPrice').textContent = window.currentProductVariant.price.toLocaleString();
    
    // Update active variant styling
    document.querySelectorAll(`.variant-option-${productId}-${variantIdx}`).forEach(el => {
      el.style.borderColor = '#8a7350';
      el.style.backgroundColor = '#f9f9f9';
    });
    document.querySelectorAll(`[class*="variant-option-${productId}-"]`).forEach((el, idx) => {
      if(idx !== variantIdx) {
        el.style.borderColor = '#ddd';
        el.style.backgroundColor = 'transparent';
      }
    });
  };

  window.addToCartFromModal = function(id, qty){
    closeModal('productModal');
    addToCart(id, qty);
  };

  function attachUI(){
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
      });
    }

    // Category menu toggle
    const categoryMenuBtn = document.getElementById('categoryMenuBtn');
    const categoryMenu = document.getElementById('categoryMenu');
    if(categoryMenuBtn && categoryMenu) {
      categoryMenuBtn.addEventListener('click', () => {
        categoryMenu.style.display = categoryMenu.style.display === 'none' ? 'block' : 'none';
      });
      document.addEventListener('click', (e) => {
        if(!e.target.closest('#categoryMenuBtn') && !e.target.closest('#categoryMenu')) {
          categoryMenu.style.display = 'none';
        }
      });
    }

    // Cart button
    const cartNavBtn = document.getElementById('cartNavBtn');
    if(cartNavBtn) cartNavBtn.addEventListener('click', () => {
      if(cart.length === 0) {
        alert('Your cart is empty');
        return;
      }
      showCart();
      openModal('cartModal');
    });

    // Auth button
    const authBtn = document.getElementById('authNavBtn');
    if(authBtn) authBtn.addEventListener('click', () => {
      if(currentUser) {
        currentUser = null;
        setStorage('currentUser', null);
        authBtn.textContent = 'Login';
        alert('Logged out successfully');
      } else {
        openModal('authModal');
      }
    });

    // Login form
    const loginForm = document.getElementById('loginForm');
    if(loginForm) loginForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      if(email && password) {
        currentUser = { id: Date.now(), name: email.split('@')[0], email, phone: '', address: '' };
        setStorage('currentUser', currentUser);
        closeModal('authModal');
        document.getElementById('authNavBtn').textContent = 'Logout';
        alert('Logged in successfully');
        if(loginForm) loginForm.reset();
      }
    });

    // Register form
    const registerForm = document.getElementById('registerForm');
    if(registerForm) registerForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = document.getElementById('r_name').value.trim();
      const email = document.getElementById('r_email').value.trim();
      const password = document.getElementById('r_password').value.trim();
      const phone = document.getElementById('r_phone').value.trim();
      const address = document.getElementById('r_address').value.trim();
      
      if(name && email && password && phone && address) {
        currentUser = { id: Date.now(), name, email, phone, address };
        setStorage('currentUser', currentUser);
        closeModal('authModal');
        document.getElementById('authNavBtn').textContent = 'Logout';
        alert('Account created and logged in!');
        if(registerForm) registerForm.reset();
      }
    });

    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(b => b.addEventListener('click', (e) => {
      const modal = e.currentTarget.closest('.modal');
      if(modal) closeModal(modal.id);
    }));

    // Payment form
    const paymentForm = document.getElementById('paymentForm');
    if(paymentForm) paymentForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      initializePaystack();
    });

    // Delivery destination selector
    const destinationSelect = document.getElementById('deliveryDestination');
    if(destinationSelect) {
      destinationSelect.addEventListener('change', updateDeliveryFee);
    }
  }

  function showCart(){
    const modal = document.getElementById('cartModal');
    const itemsDiv = document.getElementById('cartItems');
    if(!modal || !itemsDiv) return;
    
    itemsDiv.innerHTML = '';
    if(cart.length === 0) {
      itemsDiv.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
    } else {
      cart.forEach(ci => {
        const p = products.find(x => x.id === ci.id);
        if(p) {
          const el = document.createElement('div');
          el.className = 'cart-item';
          el.innerHTML = `
            <img src="${p.image}" alt="${p.title}" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="cart-item-info" style="flex: 1; margin: 0 10px;">
              <p style="font-weight: bold; margin: 0;">${p.title}</p>
              <p style="color: #8a7350; margin: 5px 0;">₦${p.price.toLocaleString()}</p>
              <p style="color: #999; font-size: 12px; margin: 0;">Qty: ${ci.qty}</p>
            </div>
            <p style="font-weight: bold;">₦${(p.price * ci.qty).toLocaleString()}</p>
            <button onclick="removeFromCart(${p.id})" style="background: #e53e3e; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer; margin-left: 10px;">Remove</button>
          `;
          itemsDiv.appendChild(el);
        }
      });
    }
    
    const subtotal = cart.reduce((s, c) => s + (products.find(p => p.id === c.id)?.price || 0) * c.qty, 0);
    
    if(cart.length > 0) {
      itemsDiv.innerHTML += `<hr style="margin: 20px 0;">`;
      itemsDiv.innerHTML += `<div class="cart-total" style="padding: 15px; background: #f9f9f9; text-align: right; font-weight: bold; border-top: 2px solid #ddd; margin-top: 10px;">Subtotal: ₦${subtotal.toLocaleString()}</div>`;
      
      const checkoutBtn = document.createElement('button');
      checkoutBtn.className = 'gradient-btn';
      checkoutBtn.style.width = '100%';
      checkoutBtn.style.marginTop = '15px';
      checkoutBtn.textContent = 'Proceed to Checkout';
      checkoutBtn.addEventListener('click', proceedToPayment);
      itemsDiv.appendChild(checkoutBtn);
    }
    
    modal.style.display = 'flex';
  }

  window.removeFromCart = function(id){
    cart = cart.filter(c => c.id !== id);
    setStorage('cart', cart);
    showCart();
    updateCartBadge();
  };

  function proceedToPayment(){
    if(!currentUser) {
      closeModal('cartModal');
      openModal('authModal');
      return;
    }
    
    closeModal('cartModal');
    openModal('paymentModal');
    updatePaymentSummary();
  }

  function updatePaymentSummary(){
    const subtotal = cart.reduce((s, c) => s + (products.find(p => p.id === c.id)?.price || 0) * c.qty, 0);
    const discount = calculateDiscount(subtotal);
    
    const destinationSelect = document.getElementById('deliveryDestination');
    const selectedOption = destinationSelect.options[destinationSelect.selectedIndex];
    const deliveryFee = parseInt(selectedOption?.dataset?.fee || 0);
    
    const grandTotal = subtotal - discount.amount + deliveryFee;
    
    const orderSummary = document.getElementById('paymentOrderSummary');
    if(orderSummary) {
      let html = '<strong>Order Summary</strong><br>';
      cart.forEach(ci => {
        const p = products.find(x => x.id === ci.id);
        if(p) html += `${p.title} (x${ci.qty}): ₦${(p.price * ci.qty).toLocaleString()}<br>`;
      });
      html += `<br><strong>Subtotal:</strong> ₦${subtotal.toLocaleString()}<br>`;
      if(discount.amount > 0) {
        html += `<strong style="color: #28a745;">Discount (${discount.percent}%):</strong> -₦${discount.amount.toLocaleString()}<br>`;
      }
      html += `<strong>Delivery Fee:</strong> ₦${deliveryFee.toLocaleString()}<br>`;
      html += `<hr style="margin: 10px 0;"><strong style="color: #8a7350; font-size: 1.1rem;">Grand Total: ₦${grandTotal.toLocaleString()}</strong>`;
      orderSummary.innerHTML = html;
    }
    
    // Store totals for payment processing
    window.paymentData = { subtotal, discount, deliveryFee, grandTotal };
  }

  function updateDeliveryFee(){
    updatePaymentSummary();
  }

  function addToCart(id, qty){
    const p = products.find(x => x.id === id);
    if(!p) return alert('Product not found');
    if(p.stock <= 0) return alert('Item out of stock');
    const existing = cart.find(c => c.id === id);
    if(existing) {
      if(existing.qty + qty > p.stock) return alert('Not enough stock');
      existing.qty += qty;
    } else {
      cart.push({id, qty});
    }
    setStorage('cart', cart);
    updateCartBadge();
    alert('Added to cart');
  }

  function initializePaystack(){
    if(!window.paymentData) {
      alert('Payment data not ready');
      return;
    }
    
    const handler = PaystackPop.setup({
      key: 'pk_live_YOUR_PAYSTACK_PUBLIC_KEY', // Replace with your Paystack public key
      email: currentUser.email,
      amount: window.paymentData.grandTotal * 100, // Paystack expects amount in kobo
      ref: 'TRK-' + Math.floor((Math.random() * 1000000000) + 1),
      onClose: function(){
        alert('Payment window closed.');
      },
      onSuccess: function(response){
        completePayment(response.reference);
      }
    });
    handler.openIframe();
  }

  function completePayment(paystackRef){
    const trackingId = generateTrackingId();
    const subtotal = window.paymentData.subtotal;
    const discount = window.paymentData.discount;
    const deliveryFee = window.paymentData.deliveryFee;
    const grandTotal = window.paymentData.grandTotal;
    
    const destinationSelect = document.getElementById('deliveryDestination');
    const destination = destinationSelect.options[destinationSelect.selectedIndex].text;
    
    const order = {
      id: Date.now(),
      trackingId: trackingId,
      user: currentUser,
      items: cart.map(c => ({
        product: products.find(p => p.id === c.id),
        qty: c.qty
      })),
      subtotal: subtotal,
      discountPercent: discount.percent,
      discountAmount: discount.amount,
      deliveryDestination: destination,
      deliveryFee: deliveryFee,
      grandTotal: grandTotal,
      paystackReference: paystackRef,
      paid: true,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };
    
    orders.push(order);
    
    // Update stock
    cart.forEach(ci => {
      const p = products.find(x => x.id === ci.id);
      if(p) p.stock = Math.max(0, p.stock - ci.qty);
    });
    
    // Clear cart and update storage
    cart = [];
    setStorage('orders', orders);
    setStorage('cart', cart);
    setStorage('products', products);
    
    closeModal('paymentModal');
    renderProducts();
    updateCartBadge();
    
    // Show receipt modal
    showReceiptModal(order);
  }

  function showReceiptModal(order){
    const receiptModal = document.getElementById('receiptModal');
    if(!receiptModal) return;
    
    const receiptContent = document.getElementById('receiptContent');
    let itemsHTML = '';
    order.items.forEach(item => {
      itemsHTML += `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.product.title}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₦${(item.product.price * item.qty).toLocaleString()}</td>
      </tr>`;
    });
    
    receiptContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #28a745; margin: 0;">✓ Payment Successful!</h2>
        <p style="color: #666; margin: 10px 0;">Thank you for your order</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <p style="margin: 5px 0;"><strong>Tracking ID:</strong> <span style="color: #8a7350; font-weight: bold; font-size: 1.1rem;">${order.trackingId}</span></p>
        <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
        <p style="margin: 5px 0;"><strong>Delivery To:</strong> ${order.deliveryDestination}</p>
      </div>
      
      <h4 style="color: #333; margin-top: 20px; margin-bottom: 10px;">Order Details</h4>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f0f0f0;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
            <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd;">
        <p style="margin: 8px 0; text-align: right;"><strong>Subtotal:</strong> ₦${order.subtotal.toLocaleString()}</p>
        ${order.discountAmount > 0 ? `<p style="margin: 8px 0; text-align: right; color: #28a745;"><strong>Discount (${order.discountPercent}%):</strong> -₦${order.discountAmount.toLocaleString()}</p>` : ''}
        <p style="margin: 8px 0; text-align: right;"><strong>Delivery Fee:</strong> ₦${order.deliveryFee.toLocaleString()}</p>
        <p style="margin: 15px 0; text-align: right; font-size: 1.2rem; color: #8a7350;"><strong>Grand Total: ₦${order.grandTotal.toLocaleString()}</strong></p>
      </div>
      
      <p style="color: #666; font-size: 0.9rem; margin-top: 20px; text-align: center;">
        A confirmation email has been sent to <strong>${currentUser.email}</strong><br>
        Please keep your tracking ID for delivery updates
      </p>
      
      <button onclick="closeModal('receiptModal'); location.reload();" class="gradient-btn" style="width: 100%; margin-top: 20px;">
        Continue Shopping
      </button>
    `;
    
    openModal('receiptModal');
  }

  function updateCartBadge(){
    const badge = document.getElementById('cartBadge');
    if(badge) badge.textContent = cart.reduce((sum, c) => sum + c.qty, 0);
  }

  function closeModal(id){
    const m = document.getElementById(id);
    if(m) m.style.display = 'none';
  }

  function openModal(id){
    const m = document.getElementById(id);
    if(m) m.style.display = 'flex';
  }

  function switchTab(tabName, btnElement){
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    const tabEl = document.getElementById(tabName);
    if(tabEl) tabEl.classList.add('active');
    if(btnElement) btnElement.classList.add('active');
  }

  if(isNode){
    module.exports = { sampleProducts };
    return;
  }

  if(typeof window !== 'undefined') {
    window.switchTab = switchTab;
    window.closeModal = closeModal;
    window.openModal = openModal;
    window.proceedToPayment = proceedToPayment;
    window.showCart = showCart;
    window.openProductModal = openProductModal;
    
    if(document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  }
})();
