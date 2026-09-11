const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const { priceOrder } = require('../pricing');

// Live price quote (no DB write) - used to render the checkout summary as the cart/destination changes
router.post('/quote', (req, res) => {
  try {
    const { items = [], destinationKey } = req.body;
    res.json(priceOrder(items, destinationKey));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a pending order & get a Paystack reference to pay against.
// The frontend only ever sends item IDs - the server looks up real prices.
router.post('/', async (req, res) => {
  try {
    const { items = [], destinationKey, name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'name, email and phone are required' });
    }

    const quote = priceOrder(items, destinationKey);
    if (quote.total <= 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const reference = 'ASC-' + Date.now() + '-' + Math.floor(Math.random() * 100000);

    const { rows } = await pool.query(
      `INSERT INTO orders (reference, name, email, phone, destination, delivery_fee, items, subtotal, discount, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING id, reference, total`,
      [
        reference,
        name,
        email.trim().toLowerCase(),
        phone,
        quote.destinationLabel,
        quote.deliveryFee,
        JSON.stringify(quote.priced),
        quote.subtotal,
        quote.discount,
        quote.total
      ]
    );

    res.json({ orderId: rows[0].id, reference: rows[0].reference, total: rows[0].total, quote });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Track an order. Requires trackingId + the email used at checkout, so strangers
// can't page through other people's orders by guessing tracking IDs.
router.get('/track', async (req, res) => {
  const { trackingId, email } = req.query;
  if (!trackingId || !email) {
    return res.status(400).json({ error: 'trackingId and email are required' });
  }
  const { rows } = await pool.query(
    `SELECT tracking_id, status, items, total, destination, created_at
     FROM orders WHERE tracking_id = $1 AND email = $2`,
    [String(trackingId).trim(), String(email).trim().toLowerCase()]
  );
  if (!rows.length) return res.status(404).json({ error: 'Order not found' });
  res.json(rows[0]);
});

module.exports = router;
