const express = require('express');
const router = express.Router();
const { pool } = require('../db');

function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// GET with header  x-admin-key: <your ADMIN_KEY>
router.get('/orders', requireAdmin, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC LIMIT 200');
  res.json(rows);
});

// PATCH { "status": "shipped" }  with header  x-admin-key: <your ADMIN_KEY>
router.patch('/orders/:id/status', requireAdmin, async (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  await pool.query('UPDATE orders SET status = $1, updated_at = now() WHERE id = $2', [status, req.params.id]);
  res.json({ ok: true });
});

// GET all products (admin view, includes out-of-stock)
router.get('/products', requireAdmin, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM products ORDER BY sort_order ASC, id ASC');
  res.json(rows);
});

// POST create a new product
router.post('/products', requireAdmin, async (req, res) => {
  const { name, category, badge, description, images, price, variants, sortOrder } = req.body;
  if (!name || !category || !price) {
    return res.status(400).json({ error: 'name, category and price are required' });
  }
  const { rows } = await pool.query(
    `INSERT INTO products (name, category, badge, description, images, price, variants, in_stock, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,true,$8) RETURNING *`,
    [name, category, badge || null, description || '', JSON.stringify(images || []), price, JSON.stringify(variants || []), sortOrder || 0]
  );
  res.json(rows[0]);
});

// PATCH update a product (send only the fields you want changed)
router.patch('/products/:id', requireAdmin, async (req, res) => {
  const allowed = ['name', 'category', 'badge', 'description', 'images', 'price', 'variants', 'in_stock', 'sort_order'];
  const updates = [];
  const values = [];
  let i = 1;
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      const val = (key === 'images' || key === 'variants') ? JSON.stringify(req.body[key]) : req.body[key];
      updates.push(`${key} = $${i}`);
      values.push(val);
      i++;
    }
  }
  if (!updates.length) return res.status(400).json({ error: 'No valid fields to update' });
  values.push(req.params.id);
  const { rows } = await pool.query(
    `UPDATE products SET ${updates.join(', ')}, updated_at = now() WHERE id = $${i} RETURNING *`,
    values
  );
  if (!rows.length) return res.status(404).json({ error: 'Product not found' });
  res.json(rows[0]);
});

// DELETE a product
router.delete('/products/:id', requireAdmin, async (req, res) => {
  await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
