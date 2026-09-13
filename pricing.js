const { pool } = require('./db');
const { comboOptions, destinations } = require('./catalog');

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

// Promotional discount: Sept 21-26 (10% off, or 15% off orders above ₦15,000)
function calculateDiscount(subtotal) {
  const now = new Date();
  const year = now.getFullYear();
  const saleStart = new Date(year, 8, 21, 0, 0, 0);
  const saleEnd = new Date(year, 8, 26, 23, 59, 59);
  if (now < saleStart || now > saleEnd) return 0;
  return subtotal > 15000 ? Math.round(subtotal * 0.15) : Math.round(subtotal * 0.10);
}

async function priceOrder(items, destinationKey) {
  if (!Array.isArray(items) || items.length === 0) {
    return { priced: [], subtotal: 0, discount: 0, deliveryFee: 0, destinationLabel: 'Pick Up', total: 0 };
  }
  const priced = await Promise.all(items.map(priceItem));
  const subtotal = priced.reduce((sum, i) => sum + i.price, 0);
  const discount = calculateDiscount(subtotal);
  const destination = destinations[destinationKey] || destinations.pickup;
  const total = subtotal - discount + destination.fee;
  return { priced, subtotal, discount, deliveryFee: destination.fee, destinationLabel: destination.label, total };
}

module.exports = { priceItem, calculateDiscount, priceOrder };
