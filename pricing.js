const { pool } = require('./db');
const { comboOptions } = require('./catalog');

async function getSetting(key, fallback) {
  const { rows } = await pool.query('SELECT value FROM site_settings WHERE key = $1', [key]);
  return rows.length ? rows[0].value : fallback;
}

async function priceItem(item) {
  if (item.type === 'product') {
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1 AND in_stock = true', [item.productId]);
    const product = rows[0];
    if (!product) throw new Error('Unknown or out-of-stock product in cart');
    if (item.variantName) {
      const variant = (product.variants || []).find(v => v.name === item.variantName);
      if (!variant) throw new Error('Unknown variant in cart');
      return { label: `${product.name} (${variant.name})`, price: variant.price };
    }
    return { label: product.name, price: product.price };
  }
  if (item.type === 'combo') {
    const combo = comboOptions.find(c => c.id === item.comboId);
    if (!combo) throw new Error('Unknown combo option in cart');
    const allowedNotes = ['Unisex', 'Feminine', 'Masculine', 'Fruity', 'Floral', 'Woody', 'Oriental', 'Fresh', 'Spicy'];
    const note = typeof item.note === 'string'
      ? item.note.split(', ').filter(n => allowedNotes.includes(n)).join(', ')
      : '';
    return { label: note ? `Set: ${combo.label} — ${note}` : `Set: ${combo.label}`, price: combo.price };
  }
  throw new Error('Unknown item type in cart');
}

async function calculateDiscount(subtotal) {
  const promo = await getSetting('promo', { enabled: false });
  if (!promo.enabled) return 0;
  const now = new Date();
  const start = new Date(promo.startDate + 'T00:00:00');
  const end = new Date(promo.endDate + 'T23:59:59');
  if (now < start || now > end) return 0;
  return subtotal > promo.bulkThreshold
    ? Math.round(subtotal * (promo.bulkPercent / 100))
    : Math.round(subtotal * (promo.standardPercent / 100));
}

async function priceOrder(items, destinationKey) {
  if (!Array.isArray(items) || items.length === 0) {
    return { priced: [], subtotal: 0, discount: 0, deliveryFee: 0, destinationLabel: 'Pick Up', total: 0 };
  }
  const priced = await Promise.all(items.map(priceItem));
  const subtotal = priced.reduce((sum, i) => sum + i.price, 0);
  const discount = await calculateDiscount(subtotal);
  const destinations = await getSetting('destinations', { pickup: { label: 'Pick Up', fee: 0 } });
  const destination = destinations[destinationKey] || destinations.pickup;
  const total = subtotal - discount + destination.fee;
  return { priced, subtotal, discount, deliveryFee: destination.fee, destinationLabel: destination.label, total };
}

module.exports = { priceItem, calculateDiscount, priceOrder };
