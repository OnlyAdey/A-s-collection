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

module.exports = router;
