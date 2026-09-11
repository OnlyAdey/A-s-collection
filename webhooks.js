const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { pool } = require('../db');
const { generateTrackingId } = require('../utils');

// Paystack calls this directly (set the URL in your Paystack dashboard under
// Settings > API Keys & Webhooks: https://YOUR-APP.onrender.com/api/webhooks/paystack)
// This catches payments even if the customer closes the tab before the frontend
// gets a chance to call /api/payments/verify.
router.post('/paystack', express.raw({ type: '*/*' }), async (req, res) => {
  try {
    const signature = req.headers['x-paystack-signature'];
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const hash = crypto.createHmac('sha512', secret).update(req.body).digest('hex');

    if (hash !== signature) {
      return res.status(401).send('Invalid signature');
    }

    const event = JSON.parse(req.body.toString('utf8'));

    if (event.event === 'charge.success') {
      const reference = event.data.reference;
      const paidAmountKobo = event.data.amount;

      const { rows } = await pool.query('SELECT * FROM orders WHERE reference = $1', [reference]);
      const order = rows[0];

      if (order && order.status !== 'paid') {
        if (paidAmountKobo === order.total * 100) {
          const trackingId = order.tracking_id || generateTrackingId();
          await pool.query(
            'UPDATE orders SET status = $1, tracking_id = $2, updated_at = now() WHERE id = $3',
            ['paid', trackingId, order.id]
          );
        } else {
          await pool.query('UPDATE orders SET status = $1, updated_at = now() WHERE id = $2', ['amount_mismatch', order.id]);
        }
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(200); // Always 200 so Paystack doesn't endlessly retry a bad payload
  }
});

module.exports = router;
