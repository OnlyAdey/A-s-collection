const { Pool } = require('pg');
const { products: seedProducts } = require('./catalog');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Render's managed Postgres requires SSL; disable the strict cert check
  // since Render uses a Render-issued cert chain that Node doesn't have by default.
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      reference TEXT UNIQUE NOT NULL,
      tracking_id TEXT UNIQUE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      destination TEXT,
      delivery_fee INTEGER DEFAULT 0,
      items JSONB NOT NULL,
      subtotal INTEGER NOT NULL,
      discount INTEGER DEFAULT 0,
      total INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      badge TEXT,
      description TEXT,
      images JSONB DEFAULT '[]',
      price INTEGER NOT NULL,
      variants JSONB DEFAULT '[]',
      in_stock BOOLEAN DEFAULT true,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    );
  `);

  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM products');
  if (rows[0].count === 0) {
    console.log('Seeding products table from catalog.js (first run only)...');
    for (let i = 0; i < seedProducts.length; i++) {
      const p = seedProducts[i];
      await pool.query(
        `INSERT INTO products (id, name, category, badge, description, images, price, variants, in_stock, sort_order)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,true,$9)
         ON CONFLICT (id) DO NOTHING`,
        [p.id, p.name, p.category, p.badge || null, p.description || '', JSON.stringify(p.images || []), p.price, JSON.stringify(p.variants || []), i]
      );
    }
    await pool.query(
      `SELECT setval(pg_get_serial_sequence('products','id'), COALESCE((SELECT MAX(id) FROM products), 1))`
    );
    console.log(`Seeded ${seedProducts.length} products.`);
  }
}

module.exports = { pool, initDb };
