// SINGLE SOURCE OF TRUTH for products & prices.
// Edit names/prices/categories here — the frontend just displays what this returns via /api/config.
const products = [
  { id: 1, name: 'Opulent by Lattafa', category: 'Arabian perfumes', badge: 'Best Seller',
    description: 'Two signatures in the Opulent line by Lattafa. Opulent Red: blood orange, pear, pink pepper and cardamom open into tuberose, jasmine and cognac, settling on oud, vanilla, amber and tonka bean. Opulent Musk: white musk, saffron and lemon open into white flowers and jasmine, closing on white musk, cedar, amber and resin.',
    images: ['/images/Opulent.jpg'],
    price: 25000,
    variants: [
      { name: 'Opulent Red', price: 25000, image: '/images/Opulent.jpg' },
      { name: 'Opulent Musk', price: 25000, image: '/images/Opulent.jpg' }
    ] },

  { id: 2, name: 'Khamrah by Lattafa', category: 'Arabian perfumes', badge: 'Popular',
    description: 'Warm sweet gourmet fragrance with oriental spicy accents.',
    images: ['/images/Khamrah.jpg', '/images/Khamrah Waha.jpg', '/images/Khamrah Dukhan.jpg', '/images/Khamrah Qahwa.jpg'],
    price: 45000,
    variants: [
      { name: 'Khamrah Standard', price: 45000, image: '/images/Khamrah.jpg' },
      { name: 'Khamrah Waha', price: 49000, image: '/images/Khamrah Waha.jpg' },
      { name: 'Khamrah Dukhan', price: 45000, image: '/images/Khamrah Dukhan.jpg' },
      { name: 'Khamrah Qahwa', price: 45000, image: '/images/Khamrah Qahwa.jpg' }
    ] },

  { id: 3, name: 'Asad by Lattafa', category: 'Arabian perfumes', badge: 'Top Rated',
    description: 'A dark, spicy Lattafa signature. Asad opens with pink pepper, lavender and mirabelle plum, warms through cacao, nutmeg and davana, and settles into vetiver, bourbon vanilla and amber for an intense, long-lasting presence.',
    images: ['/images/Asad.jpg', '/images/Asad Bourbon.jpg'],
    price: 30000,
    variants: [
      { name: 'Asad', price: 30000, image: '/images/Asad.jpg' },
      { name: 'Asad Bourbon', price: 30000, image: '/images/Asad Bourbon.jpg' }
    ] },

  { id: 4, name: 'KALY Eau de Parfum (50ml)', category: 'Designer perfumes', badge: 'New',
    description: "KALY's affordable takes on cult designer profiles. Libre Intense mirrors YSL's Libre Intense (lavender, mandarin orange, orange blossom, jasmine sambac, vanilla, tonka bean, ambergris). Lovefest Burning Cherry mirrors Kayali's Lovefest (black cherry, raspberry, bergamot, rose, jasmine, praline, palo santo, patchouli). Eden Juicy Apple mirrors Kayali's Eden (red apple, black currant, lychee, wild berries, vanilla flower, amber, musk). Glory Days is a KALY house original — a bold, warm evening scent.",
    images: ['/images/KALY.jpg'], price: 11000,
    variants: [
      { name: 'Libre Intense', price: 11000, image: '/images/KALY.jpg' },
      { name: 'Glory Days', price: 11000, image: '/images/KALY.jpg' },
      { name: 'Lovefest Burning Cherry', price: 11000, image: '/images/KALY.jpg' },
      { name: 'Eden Juicy Apple', price: 11000, image: '/images/KALY.jpg' }
    ] },

  { id: 5, name: 'Confetti London', category: 'Body mists/spray', badge: 'Fresh',
    description: 'Perfumed deodorant body sprays from Confetti London, 250ml. Dear.. is a soft, powdery floral-musk. Maple is a warm, cozy woody-gourmand inspired by its namesake.',
    images: ['/images/Confetti.jpg'],
    price: 6500,
    variants: [
      { name: 'Dear..', price: 5000, image: '/images/Confetti.jpg' },
      { name: 'Maple', price: 5000, image: '/images/Confetti.jpg' }
    ] },

  { id: 6, name: 'Mousuf Perfume Gift Set (4-piece)', category: 'Giftset/box', badge: 'Luxury Gift',
    description: "A 4-bottle Ard Al Zaafaran Mousuf set. Mousuf (gold): grape and chocolate top, musky oud heart, toffee/tobacco/floral base. Mousuf Sapphire (blue): bergamot, orange and lime top, violet and nutmeg heart, musk and amber base. Mousuf Ramadi (grey): bergamot, orange and lime top, cardamom, pepper, nutmeg and violet heart, amber, oak and musk base. Mousuf Wardi (pink): lychee, rhubarb and strawberry top, rose, vanilla and apple heart, white musk and cashmeran base.",
    images: ['/images/Mousuf 4in1.jpg'], price: 20000, variants: [] },

  { id: 7, name: '9am by Afnan', category: 'Designer perfumes', badge: 'New',
    description: 'A bright, energising morning fragrance. Opens with mandarin, cedrat, cardamom and pink pepper, softens into lavender, orange blossom, rose and green apple, and settles on a warm cedarwood, moss, patchouli and musk base. 100ml EDP.',
    images: ['/images/9am by Afnan.jpg'], price: 55000, variants: [] },

  { id: 8, name: '9pm by Afnan', category: 'Designer perfumes', badge: 'Popular',
    description: 'An oriental vanilla fragrance for men. Opens with apple, cinnamon, wild lavender and bergamot, moves through orange blossom and lily-of-the-valley, and finishes on a sweet, addictive base of patchouli, amber, vanilla and tonka bean. 100ml EDP.',
    images: ['/images/9pm by Afnan.jpg'], price: 55000, variants: [] },

  { id: 9, name: '9am Dive by Afnan', category: 'Designer perfumes', badge: 'New',
    description: 'An invigorating aquatic fragrance for women and men. Lemon, pink pepper, mint and black currant open into apple, incense and cedar, drying down to patchouli, jasmine, ginger and sandalwood — like a brisk morning plunge into clear water. 260ml EDP.',
    images: ['/images/9am Diva by Afnan.jpg'], price: 52000, variants: [] },

  { id: 10, name: '9pm Elixir (Mini) by Afnan', category: 'Mini perfumes', badge: 'New',
    description: 'An intense, unisex extrait de parfum. Nutmeg, elemi and cardamom open into a smooth heart of pimento, lavandin and leather, deepening into labdanum, patchouli and vanilla — bold and long-lasting in mini form.',
    images: ['/images/9pm Elixir (Mini).jpg'], price: 6000, variants: [] },

  { id: 11, name: '9pm Pour Femme by Afnan', category: 'Designer perfumes', badge: 'New',
    description: 'A bold oriental floral for women. Raspberry, violet, apple and orange open into a heart of rose, iris, peony and jasmine, grounded by cypress, pine, cedar and amber — designed for confident evening wear. 100ml EDP.',
    images: ['/images/9pm Pour Homme by Afnan.jpg'], price: 52000, variants: [] },

  { id: 12, name: '24K White', category: 'Designer perfumes', badge: 'New',
    description: 'A warm, amber-spiced fragrance blending Egyptian jasmine, musk and Virginian cedarwood, finished with a touch of warm spice for a chic, long-lasting aromatic trail. 100ml EDP.',
    images: ['/images/24K white.jpg'], price: 7000, variants: [] },

  { id: 13, name: "Bade'e Al Oud Gift Set by Lattafa", category: 'Giftset/box', badge: 'Luxury Gift',
    description: "A 3-piece 50ml gift set from Lattafa: Amethyst (bergamot and pink pepper over Turkish rose, jasmine, oud and vanilla), Oud For Glory (saffron, nutmeg and lavender over agarwood, patchouli and musk), and Sublime (apple, litchi and rose over plum, jasmine, vanilla, moss and patchouli).",
    images: ["/images/Bade'e Al Oud.jpg"], price: 22000, variants: [] },

  { id: 14, name: 'Choco Musk by Al-Rehab', category: 'Mini perfumes', badge: 'Fresh',
    description: 'A cozy gourmand fragrance opening with vanilla and chocolate, warmed by cinnamon, spices and musk, and finished with rose, sandalwood and amber — sweet, comforting and easy to wear all day. 50ml EDP.',
    images: ['/images/Choco Musk.jpg'], price: 5000, variants: [] },

  { id: 15, name: 'Club de Nuit Iconic by Armaf', category: 'Designer perfumes', badge: 'Popular',
    description: 'A citrus-woody signature opening with grapefruit, lemon, mint and pink pepper, moving through ginger, melon and jasmine, and settling into a resinous base of incense, sandalwood, amber and cedar.',
    images: ['/images/Club de Nuit Iconic.jpg'], price: 60000, variants: [] },

  { id: 16, name: 'Club de Nuit Intense Man by Armaf', category: 'Designer perfumes', badge: 'Best Seller',
    description: 'A cult-favorite woody-spicy fragrance for men. Lemon, pineapple, bergamot and blackcurrant open into a smoky birch, jasmine and rose heart, drying down to musk, ambergris, patchouli and vanilla.',
    images: ['/images/Club De Nuit Intense Man.jpg'], price: 55000, variants: [] },

  { id: 17, name: 'Lasgidi Body Mist', category: 'Body mists/spray', badge: 'Fresh',
    description: 'A playful 6-flavor local body mist line: Juicy Crush, Gelato Crush, Vanilla Crush, Pinky Crush, Candy Crush and Pistachio Crush — light, fruity-sweet scents for everyday layering.',
    images: ['/images/Lasgidi Body mist.jpg'], price: 3500,
    variants: [
      { name: 'Juicy Crush', price: 3500, image: '/images/Lasgidi Body mist.jpg' },
      { name: 'Gelato Crush', price: 3500, image: '/images/Lasgidi Body mist.jpg' },
      { name: 'Vanilla Crush', price: 3500, image: '/images/Lasgidi Body mist.jpg' },
      { name: 'Pinky Crush', price: 3500, image: '/images/Lasgidi Body mist.jpg' },
      { name: 'Candy Crush', price: 3500, image: '/images/Lasgidi Body mist.jpg' },
      { name: 'Pistachio Crush', price: 3500, image: '/images/Lasgidi Body mist.jpg' }
    ] },

  { id: 18, name: 'Matelot Eau de Parfum', category: 'Designer perfumes', badge: 'New',
    description: 'A clean, fresh aromatic fragrance for men from Fragrance World, opening with Calabrian bergamot and settling into a woody-musky drydown. Known for exceptional all-day longevity. Comes in a branded drawstring pouch.',
    images: ['/images/Matelot.jpg'], price: 18000, variants: [] },

  { id: 19, name: 'Matelot Gift Set', category: 'Giftset/box', badge: 'Luxury Gift',
    description: 'The Matelot Eau de Parfum paired with a matching roll-on deodorant, presented in nautical navy-and-cream packaging — ready to gift.',
    images: ['/images/Matelot gift set.jpg'], price: 22000, variants: [] },

  { id: 20, name: 'Hayaati Women by Ard Al Zaafaran', category: 'Arabian perfumes', badge: 'New',
    description: 'A floral fruity fragrance for women. Green almond and jasmine open into praline, gardenia and licorice, settling into apricot, peach, vanilla and sandalwood for a sweet, inviting finish. 100ml EDP.',
    images: ['/images/Hayaati.jpg'], price: 20000, variants: [] },

  { id: 21, name: 'Oud Al Layl by Ard Al Zaafaran', category: 'Arabian perfumes', badge: 'New',
    description: 'A rich, dark oud fragrance in two editions. The blue-and-silver original opens with a bold blend of spices and rose over a deep oud and amber base. The black-and-gold Midnight Edition intensifies this with smoky agarwood, incense and warm musk for an even heavier, long-lasting evening trail. 100ml EDP.',
    images: ['/images/Oud Al layl.jpg'], price: 22000,
    variants: [
      { name: 'Oud Al Layl', price: 22000, image: '/images/Oud Al layl.jpg' },
      { name: 'Oud Al Layl Midnight Edition', price: 24000, image: '/images/Oud Al layl.jpg' }
    ] },

  { id: 22, name: 'Oud Mood Perfume Set (3-in-1)', category: 'Giftset/box', badge: 'Luxury Gift',
    description: 'A 3-bottle Lattafa Oud Mood perfume oil gift set in a keepsake box. Each concentrated oil blends smoky agarwood with warm amber, musk and floral undertones — a traditional Arabian attar experience, alcohol-free and long-lasting.',
    images: ['/images/Oud mood 3in1.jpg'], price: 20000, variants: [] },

  { id: 23, name: 'Pocket Perfumes Collection', category: 'Mini perfumes', badge: 'Fresh',
    description: 'A line of compact 35ml Arabian eau de parfums, perfect for on-the-go touch-ups. Sultan Al Quloob is a bold, spicy-woody scent for men. Washwashah is a soft, rosy floral-musk for women (available in several editions). Kashka Crystal is a light, sweet floral spray.',
    images: ['/images/Pocket perfumes.jpg'], price: 1700,
    variants: [
      { name: 'Sultan Al Quloob', price: 1700, image: '/images/Pocket perfumes.jpg' },
      { name: 'Washwashah', price: 1700, image: '/images/Pocket perfumes.jpg' },
      { name: 'Kashka Crystal', price: 1700, image: '/images/Pocket perfumes.jpg' }
    ] },

  { id: 24, name: 'Qaed Al Fursan by Lattafa', category: 'Arabian perfumes', badge: 'Popular',
    description: 'A bold, masculine fragrance from Lattafa featuring a striking galloping-horse emblem. Opens with sharp, spicy top notes, moving through a warm, woody heart into a rich amber and musk base — built for a strong, lasting presence. 90ml EDP.',
    images: ["/images/Qa'ed Al Fursan.jpg"], price: 25000, variants: [] },

  { id: 25, name: 'Ramz Gold by Lattafa', category: 'Arabian perfumes', badge: 'New',
    description: "Part of Lattafa's Ramz line, marked with an embossed fingerprint-style design. A warm, sweet oriental fragrance blending spicy top notes with a smooth amber, vanilla and musk base — designed as an elegant, unisex signature scent.",
    images: ['/images/Ramz Gold by Lattafa.jpg'], price: 20000, variants: [] },

  { id: 26, name: 'Riggs London Body Mist', category: 'Body mists/spray', badge: 'Fresh',
    description: 'All-over perfumed body sprays from Riggs London, 250ml. West is a fresh, sharp aromatic blend. Pink is a fruity-floral, feminine scent. Dynamo is an energetic, citrus-woody spray — all light enough for everyday layering.',
    images: ['/images/Riggs body mist.jpg'], price: 5000,
    variants: [
      { name: 'West', price: 5000, image: '/images/Riggs body mist.jpg' },
      { name: 'Pink', price: 5000, image: '/images/Riggs body mist.jpg' },
      { name: 'Dynamo', price: 5000, image: '/images/Riggs body mist.jpg' }
    ] },

  { id: 27, name: 'Smart Collection Perfume', category: 'Mini perfumes', badge: 'Luxury Gift',
    description: "Smart World eau de parfum mini collection, 30ml each. Intense is a rich amber-spice blend. Oud For Glory pairs smoky agarwood with sweet resin. Saheb is a warm, spicy-woody scent. Al Dirgham is a bold, musky classic-inspired fragrance.",
    images: ['/images/Smart collection (Mini).JPG'], price: 5000, variants: [] },

  { id: 28, name: 'Veyes Perfume Gift Box (4-in-1)', category: 'Giftset/box', badge: 'Luxury Gift',
    description: 'A 4-bottle 25ml mini perfume set for women. Glamour is a clean, elegant floral. Veyes Essence is a warm, fruity-floral in a deep red bottle. The gold bottle offers a soft, powdery floral note. Temptation is a light, sweet floral-fruity spray — a ready-to-gift variety pack.',
    images: ['/images/Veyes gift box.jpg'], price: 20000, variants: [] },

  { id: 29, name: "Victoria's Secret Fragrance Mist", category: 'Body mists/spray', badge: 'Popular',
    description: "Classic Victoria's Secret fine fragrance body mists in a range of fruity-floral scents. Light and layerable, perfect for everyday wear.",
    images: ['/images/Victoria Secret body mist.jpg'], price: 6000, variants: [] },

  { id: 30, name: 'Vintage Radio Mini by HNN', category: 'Mini perfumes', badge: 'New',
    description: 'A retro-inspired eau de parfum line packaged in a charming vintage-radio box. The Lamanda edition opens with bright citrus and floral notes over a smooth, sweet musky base. 60ml EDP.',
    images: ['/images/Vintage Radio (Mini).jpg'], price: 7000,
    variants: [
      { name: 'Vintage Radio Lamanda', price: 7000, image: '/images/Vintage Radio (Mini).jpg' },
      { name: 'Vintage Radio Classic', price: 7000, image: '/images/Vintage Radio (Mini).jpg' }
    ] }
  ];
{ id: 31, name: 'Fakhar Perfume Mist by Lattafa', category: 'Body mists/spray', badge: 'Fresh',
    description: 'A 250ml fruity-floral perfume mist from Lattafa, in three shades. A light, fresh opening leads into soft jasmine and floral accords, settling on a clean musky-woody base — an easy, non-overpowering daily spray.',
    images: ['/images/Lattafa Mist.jpg'], price: 7000,
    variants: [
      { name: 'Fakhar Mist (Pink)', price: 7000, image: '/images/Lattafa Mist.jpg' },
      { name: 'Fakhar Mist (Gold)', price: 7000, image: '/images/Lattafa Mist.jpg' },
      { name: 'Fakhar Mist (Hot Pink)', price: 7000, image: '/images/Lattafa Mist.jpg' }
    ] },

  { id: 32, name: 'Hawas Ice by Rasasi', category: 'Designer perfumes', badge: 'Best Seller',
    description: 'A fresh, energetic aromatic fragrance for men from Rasasi. Opens with apple, Italian lemon, Sicilian bergamot and star anise, moves into a plum, orange blossom and cardamom heart, and settles on musk, amber, moss and driftwood. 100ml EDP.',
    images: ['/images/Hawas Ice by Rasasi.jpg'], price: 65000, variants: [] }
  ];

const comboOptions = [
  { id: '50ml-bottle-1', label: '50ml Bottle', price: 6000 },
  { id: '50ml-bottle-2', label: '50ml Bottle', price: 5000 },
  { id: '30ml-bottle-1', label: '30ml Bottle', price: 5000 },
  { id: '30ml-bottle-2', label: '30ml Bottle', price: 4500 },
  { id: '25ml-bottle', label: '25ml Bottle', price: 4500 },
  { id: 'roll-on', label: 'Roll-on Oil', price: 2700 },
  { id: 'mist-1', label: 'Body Mist', price: 6000 },
  { id: 'mist-2', label: 'Body Mist', price: 5000 },
  { id: 'body-spray-1', label: 'Body Spray', price: 5000 },
  { id: 'body-spray-2', label: 'Body Spray', price: 4500 }
];

const destinations = {
  pickup: { label: 'Pick Up', fee: 0 },
  abuja_central: { label: 'Abuja Central', fee: 2000 },
  abuja_regional: { label: 'Abuja Regional / Outskirts', fee: 3500 },
  lagos_state: { label: 'Lagos / State Capitals', fee: 4500 },
  interstate: { label: 'Interstate Other Regions', fee: 6000 }
};

module.exports = { products, comboOptions, destinations }; 
