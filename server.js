const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/verify-payment', async (req, res) => {
  const { reference, cart, userId, destination, deliveryFee, subtotal, discount } = req.body;

  try {
    const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
    });

    if (paystackRes.data.data.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Payment validation failed' });
    }

    const trackingId = 'TRK-ASC-' + Math.floor(100000 + Math.random() * 900000);
    const grandTotal = subtotal - discount + deliveryFee;

    const orderRes = await pool.query(
      `INSERT INTO orders (tracking_id, user_id, subtotal, discount_amount, delivery_fee, total_amount, destination, paystack_ref)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [trackingId, userId, subtotal, discount, deliveryFee, grandTotal, destination, reference]
    );

    const userRes = await pool.query(`SELECT email, full_name FROM users WHERE id = $1`, [userId]);
    const customer = userRes.rows[0];

    const mailOptions = {
      from: `"A's Collection" <${process.env.EMAIL_USER}>`,
      to: customer.email,
      subject: `Order Confirmation - ${trackingId}`,
      html: `
        <h2>Thank you for shopping with A's Collection!</h2>
        <p>Dear ${customer.full_name},</p>
        <p>Your order has been confirmed.</p>
        <p><strong>Tracking ID:</strong> ${trackingId}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Total Paid:</strong> ₦${grandTotal.toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, trackingId, order: orderRes.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));