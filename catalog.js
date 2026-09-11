// SINGLE SOURCE OF TRUTH for products & prices.
// Edit names/prices/categories here — the frontend just displays what this returns via /api/config.
const products = [
  { id: 1, name: 'Opulent by Lattafa', category: 'Arabian perfumes', badge: 'Best Seller',
    description: 'Luxurious Arabian formulation rich in signature resins and woods.',
    images: ['images/opulent_oud.jpg', 'images/opulent_redmusk.jpg'],
    price: 25000,
    variants: [
      { name: 'Oud', price: 25000, image: 'images/opulent_oud.jpg' },
      { name: 'Red Musk', price: 25000, image: 'images/opulent_redmusk.jpg' }
    ] },
  { id: 2, name: 'Khamrah by Lattafa', category: 'Arabian perfumes', badge: 'Popular',
    description: 'Warm sweet gourmet fragrance with oriental spicy accents.',
    images: ['images/khamrah.jpg', 'images/khamrah_waha.jpg', 'images/khamrah_dukhan.jpg', 'images/khamrah_qhawa.jpg'],
    price: 45000,
    variants: [
      { name: 'Khamrah Standard', price: 45000, image: 'images/khamrah.jpg' },
      { name: 'Khamrah Waha', price: 49000, image: 'images/khamrah_waha.jpg' },
      { name: 'Khamrah Dukhan', price: 45000, image: 'images/khamrah_dukhan.jpg' },
      { name: 'Khamrah Qhawa', price: 45000, image: 'images/khamrah_qhawa.jpg' }
    ] },
  { id: 3, name: 'Asad by Lattafa', category: 'Arabian perfumes', badge: 'Top Rated',
    description: 'A dark, spicy signature for intense presence.',
    images: ['images/asad.jpg', 'images/asad_bourbon.jpg'],
    price: 30000,
    variants: [
      { name: 'Asad Standard', price: 30000, image: 'images/asad.jpg' },
      { name: 'Asad Bourbon', price: 30000, image: 'images/asad_bourbon.jpg' }
    ] },
  { id: 4, name: 'KALY 50ml', category: 'Designer perfumes', badge: 'New',
    description: 'Clean modern floral design for everyday elegance.',
    images: ['images/kaly.jpg'], price: 12000, variants: [] },
  { id: 5, name: 'Confetti', category: 'Body mists/spray', badge: 'Fresh',
    description: 'Refreshing daily body spray with vibrant top notes.',
    images: ['images/confetti.jpg'], price: 5000, variants: [] },
  { id: 6, name: 'Mousuf 4 in 1 (25ml)', category: 'Giftset/box', badge: 'Luxury Gift',
    description: 'Complete gift set featuring 4 iconic fragrance miniatures.',
    images: ['images/mousuf_set.jpg'], price: 20000, variants: [] },
  { id: 7, name: 'Custom Perfume 1', category: 'Oil perfume', badge: 'New',
    description: 'Edit description here.', images: ['images/placeholder.jpg'], price: 15000, variants: [] },
  { id: 8, name: 'Custom Perfume 2', category: 'Body mists/spray', badge: 'Special',
    description: 'Edit description here.', images: ['images/placeholder.jpg'], price: 18000, variants: [] }
];

const comboOptions = [
  { id: '100ml', label: '100ml Bottle', price: 9500 },
  { id: '50ml', label: '50ml Bottle', price: 6500 },
  { id: '30ml', label: '30ml Pocket', price: 4200 },
  { id: 'roll-on', label: 'Roll-on Oil', price: 1800 },
  { id: 'mist', label: 'Body Mist', price: 3200 }
];

const destinations = {
  pickup: { label: 'Pick Up', fee: 0 },
  abuja_central: { label: 'Abuja Central', fee: 2000 },
  abuja_regional: { label: 'Abuja Regional / Outskirts', fee: 3500 },
  lagos_state: { label: 'Lagos / State Capitals', fee: 4500 },
  interstate: { label: 'Interstate Other Regions', fee: 6000 }
};

module.exports = { products, comboOptions, destinations };
