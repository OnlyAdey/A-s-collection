const express = require('express');
const router = express.Router();
const axios = require('axios');
const { pool } = require('../db');
const { generateTrackingId } = require('../utils');

// Called by the frontend right after Paystack's inline popup reports success.
// This is what actually confirms the payment - never trust the browser callback alone.
router.post('/verify', async (req, res) => {
  try {
    const { reference } = req.body;
    if (!reference) return res.status(400).json({ error: 'reference is required' });

    const { rows } = await pool.query('SELECT * FROM orders WHERE reference = $1', [reference]);
    const order = rows[0];
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.status === 'paid') {
      return res.json({ status: 'paid', trackingId: order.tracking_id });
    }

    const verifyRes = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });

    const data = verifyRes.data.data;
    const paidAmountKobo = data.amount;
    const expectedAmountKobo = order.total * 100;

    if (data.status !== 'success' || paidAmountKobo !== expectedAmountKobo) {
      await pool.query('UPDATE orders SET status = $1, updated_at = now() WHERE id = $2', ['failed', order.id]);
      return res.status(400).json({ error: 'Payment could not be verified' });
    }

    const trackingId = generateTrackingId();
    await pool.query(
      'UPDATE orders SET status = $1, tracking_id = $2, updated_at = now() WHERE id = $3',
      ['paid', trackingId, order.id]
    );

    res.json({ status: 'paid', trackingId });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Verification failed' });
  }
});

module.exports = router;
