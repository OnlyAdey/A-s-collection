require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const { initDb, pool } = require('./db');
const { comboOptions, destinations } = require('./catalog');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const webhooksRouter = require('./routes/webhooks');
const adminRouter = require('./routes/admin');

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());

// Webhook needs the RAW body for signature verification, so it must be
// mounted before express.json() below.
app.use('/api/webhooks', webhooksRouter);

app.use(express.json());

// Frontend loads this once on page load to get product data + public keys.
// Nothing secret lives here - PAYSTACK_SECRET_KEY and ADMIN_KEY never leave the server.
const DEFAULT_THEME = { primary: '#2A1215', accent: '#D4AF37', secondary: '#5A2D82', dark: '#0E0812', background: '#FAFAFA' };

app.get('/api/config', async (req, res) => {
  try {
        const { rows } = await pool.query('SELECT * FROM products ORDER BY sort_order ASC, id ASC');
    const products = rows.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      badge: p.badge,
      description: p.description,
      images: p.images,
      price: p.price,
      variants: p.variants,
      inStock: p.in_stock
    }));
    const { rows: destRows } = await pool.query(`SELECT value FROM site_settings WHERE key = 'destinations'`);
    const liveDestinations = destRows.length ? destRows[0].value : destinations;
    res.json({
      paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY || '',
      whatsappNumber: process.env.WHATSAPP_NUMBER || '',
      products,
      comboOptions,
      destinations: liveDestinations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load site config' });
  }
});

app.get('/api/theme', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT value FROM site_settings WHERE key = 'theme'`);
    const defaults = { primary: '#2A1215', accent: '#D4AF37', bg: '#FAFAFA', dark: '#0E0812', secondary: '#5A2D82' };
    res.json(rows.length ? { ...defaults, ...rows[0].value } : defaults);
  } catch (err) {
    res.json({ primary: '#2A1215', accent: '#D4AF37', bg: '#FAFAFA', dark: '#0E0812', secondary: '#5A2D82' });
  }
});

app.get('/api/promo', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT value FROM site_settings WHERE key = 'promo'`);
    const promo = rows.length ? rows[0].value : { enabled: false };
    if (!promo.enabled) return res.json({ active: false, enabled: false });
    const now = new Date();
    const start = new Date(promo.startDate + 'T00:00:00');
    const end = new Date(promo.endDate + 'T23:59:59');
    const active = now >= start && now <= end;
    res.json({
      active,
      enabled: true,
      startDate: promo.startDate,
      endDate: promo.endDate,
      standardPercent: promo.standardPercent,
      bulkPercent: promo.bulkPercent,
      bulkThreshold: promo.bulkThreshold
    });
  } catch (err) {
    res.json({ active: false, enabled: false });
  }
});

app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/admin', adminRouter);

// Serve the storefront itself
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`A's Collection server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
