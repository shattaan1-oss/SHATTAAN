import { Product, Category, Customer, Order, Review, DiscountCode } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'apparel',
    name: 'Apparel & Couture',
    slug: 'apparel',
    description: 'Bespoke tailoring, pure Mongolian cashmere, and modern architectural silhouettes.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    itemCount: 14,
    featured: true,
  },
  {
    id: 'leather-goods',
    name: 'Fine Leather Goods',
    slug: 'leather-goods',
    description: 'Full-grain Italian calfskin, handcrafted briefcases, weekenders, and wallets.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    itemCount: 18,
    featured: true,
  },
  {
    id: 'timepieces-jewelry',
    name: 'Timepieces & Jewelry',
    slug: 'timepieces-jewelry',
    description: 'Swiss precision automatic movements, solid 18k accents, and heirloom design.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    itemCount: 10,
    featured: true,
  },
  {
    id: 'audio-tech',
    name: 'Acoustics & Tech',
    slug: 'audio-tech',
    description: 'Audiophile grade planar-magnetic headphones, anodized aluminum docks, and studio gear.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    itemCount: 12,
    featured: true,
  },
  {
    id: 'fragrances-grooming',
    name: 'Fragrance & Self',
    slug: 'fragrances-grooming',
    description: 'Rare oud, velvet amber, botanical extracts, and artisanal extrait de parfum.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
    itemCount: 8,
    featured: false,
  },
  {
    id: 'living-decor',
    name: 'Living & Decor',
    slug: 'living-decor',
    description: 'Hand-blown Murano glassware, travertine stone accents, and minimalist sculptural lighting.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
    itemCount: 9,
    featured: false,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'sht-001',
    title: 'Shattaan Obsidian Weekender Duffle',
    slug: 'shattaan-obsidian-weekender-duffle',
    type: 'physical',
    description: 'Handcrafted in Florence from vegetable-tanned full-grain Tuscan leather. Featuring solid brass hardware with matte black PVD coating, reinforced handles, and a dedicated waterproof shoe compartment. Engineered to meet international carry-on requirements while aging with an unrivaled patina over decades of travel.',
    shortDescription: 'Tuscan full-grain leather weekender with matte PVD hardware and custom luggage sleeve.',
    price: 680,
    compareAtPrice: 850,
    costPrice: 260,
    rating: 4.9,
    reviewCount: 48,
    sku: 'SHT-LEA-001',
    stock: 14,
    category: 'leather-goods',
    subcategory: 'Bags & Luggage',
    tags: ['Best Seller', 'Full-Grain', 'Handcrafted', 'Travel'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isTrending: true,
    isNewArrival: false,
    colors: [
      { name: 'Obsidian Black', hex: '#1C1917', inStock: true },
      { name: 'Cognac Saddle', hex: '#8B4513', inStock: true },
      { name: 'Espresso Brown (Vault Sold Out)', hex: '#3E2723', inStock: false }
    ],
    sizes: ['45L Carry-On', '60L Extended'],
    specifications: {
      'Material': '100% Full-Grain Tuscan Calfskin Leather',
      'Hardware': 'Solid Brass with Matte PVD coating',
      'Dimensions': '53cm x 30cm x 26cm (21" x 12" x 10")',
      'Weight': '2.1 kg (4.6 lbs)',
      'Origin': 'Florence, Italy',
      'Warranty': 'Lifetime Guarantee against defects'
    },
    physicalDetails: {
      weight: '2.1 kg (4.6 lbs)',
      dimensions: '53cm x 30cm x 26cm',
      shippingClass: 'Complimentary Global Express'
    },
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'sht-002',
    title: 'Monolith Automatic Field Chronograph 41mm',
    slug: 'monolith-automatic-field-chronograph',
    type: 'physical',
    description: 'Precision mechanical timekeeping housed in a surgical-grade 316L bead-blasted stainless steel case. Powered by a modified Swiss caliber movement with 42-hour power reserve, double-domed anti-reflective sapphire crystal, and 200-meter water resistance with screw-down crown.',
    shortDescription: 'Swiss-movement mechanical chronograph with double-domed sapphire crystal.',
    price: 1450,
    compareAtPrice: 1650,
    costPrice: 580,
    rating: 5.0,
    reviewCount: 32,
    sku: 'SHT-WAT-002',
    stock: 6,
    category: 'timepieces-jewelry',
    subcategory: 'Watches',
    tags: ['Swiss Movement', 'Limited Edition', 'Sapphire Glass', 'Water Resistant'],
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isTrending: false,
    isNewArrival: true,
    colors: [
      { name: 'Stealth Black', hex: '#18181B', inStock: true },
      { name: 'Brushed Silver', hex: '#D4D4D8', inStock: true }
    ],
    sizes: ['41mm Case (20mm Lug)'],
    specifications: {
      'Movement': 'Automatic Caliber SH-880 with 28,800 bph',
      'Case': '316L Surgical Stainless Steel',
      'Crystal': 'Double Domed Sapphire with 5x AR Coating',
      'Strap': 'FKM Fluoroelastomer Rubber & Cordovan Leather included',
      'Water Resistance': '20 ATM / 200 Meters',
      'Origin': 'Geneva, Switzerland'
    },
    physicalDetails: {
      weight: '165 grams',
      dimensions: '41mm diameter x 12.8mm thickness',
      shippingClass: 'Insured White-Glove Courier'
    },
    createdAt: '2026-02-01T12:00:00Z'
  },
  {
    id: 'sht-003',
    title: 'Aura Studio Planar Magnetic Wireless Headphones',
    slug: 'aura-studio-planar-magnetic-headphones',
    type: 'physical',
    description: 'Engineered for audio purists and modern creators. Featuring 50mm ultra-thin planar magnetic transducers, CNC-machined aerospace aluminum earcups, lambskin memory foam ear cushions, and custom high-resolution lossless LDAC/aptX Adaptive wireless transmission.',
    shortDescription: 'Audiophile planar magnetic wireless headphones with real wood inlays and ANC.',
    price: 520,
    compareAtPrice: 599,
    costPrice: 190,
    rating: 4.8,
    reviewCount: 64,
    sku: 'SHT-AUD-003',
    stock: 22,
    category: 'audio-tech',
    subcategory: 'Audio',
    tags: ['Planar Magnetic', 'Hi-Res Audio', 'Wireless', 'Noise Cancelling'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isTrending: true,
    isNewArrival: false,
    colors: [
      { name: 'Space Gray & Walnut', hex: '#374151', inStock: true },
      { name: 'Silver & Birch', hex: '#E5E7EB', inStock: true }
    ],
    sizes: ['Over-Ear Studio Fit'],
    specifications: {
      'Driver Type': '50mm Planar Magnetic',
      'Frequency Response': '5Hz - 52,000Hz',
      'Battery Life': '42 Hours with Fast Charge (10 min = 6 hrs)',
      'Connectivity': 'Bluetooth 5.4, 3.5mm Analog, USB-C DAC Lossless',
      'Weight': '330 grams'
    },
    physicalDetails: {
      weight: '330 grams',
      dimensions: '19cm x 16cm x 8cm',
      shippingClass: 'Complimentary Global Express'
    },
    createdAt: '2026-01-20T08:30:00Z'
  },
  {
    id: 'sht-004',
    title: 'Shattaan Atelier Cashmere Oversized Overcoat',
    slug: 'shattaan-atelier-cashmere-overcoat',
    type: 'physical',
    description: 'Woven from 100% double-faced Grade-A Mongolian cashmere with raw unlined drape construction. Features unstructured natural shoulders, horn button closures, deep interior passport welt pockets, and a classic notched lapel designed to wear seamlessly over knitwear or formal tailoring.',
    shortDescription: '100% Grade-A double-faced Mongolian cashmere tailored overcoat.',
    price: 950,
    compareAtPrice: 1100,
    costPrice: 340,
    rating: 4.9,
    reviewCount: 29,
    sku: 'SHT-APP-004',
    stock: 8,
    category: 'apparel',
    subcategory: 'Outerwear',
    tags: ['Pure Cashmere', 'Tailored', 'Luxury Apparel', 'Hand-Stitched'],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isTrending: false,
    isNewArrival: true,
    colors: [
      { name: 'Camel Melange', hex: '#C19A6B', inStock: true },
      { name: 'Midnight Charcoal', hex: '#262626', inStock: true },
      { name: 'Oatmeal Heather', hex: '#D6CEBE', inStock: true }
    ],
    sizes: ['S (38R)', 'M (40R)', 'L (42R)', 'XL (44R)'],
    specifications: {
      'Composition': '100% Grade-A Mongolian Cashmere (650gsm)',
      'Buttons': 'Genuine Hand-Polished Buffalo Horn',
      'Lining': '100% Bemberg Cupro in sleeves only',
      'Fit': 'Modern Relaxed / Unstructured drape',
      'Care': 'Specialist Dry Clean Only'
    },
    physicalDetails: {
      weight: '1.4 kg',
      dimensions: 'Garment bag protected',
      shippingClass: 'Signature Courier Delivery'
    },
    createdAt: '2026-02-10T14:15:00Z'
  },
  {
    id: 'sht-005',
    title: 'Nocturne Oud & Smoked Vetiver Extrait (100ml)',
    slug: 'nocturne-oud-smoked-vetiver-extrait',
    type: 'physical',
    description: 'A dense, hypnotic olfactory composition developed with master perfumers in Grasse. Built upon wild Cambodian Agarwood resin, Bourbon vetiver, sun-drenched saffron, and dry cedarwood layered over a heart of dark blackcurrant and Indonesian patchouli. 30% fragrance oil concentration for 18+ hours longevity.',
    shortDescription: 'High-concentration 30% artisanal extrait de parfum with rare aged oud.',
    price: 240,
    compareAtPrice: 280,
    costPrice: 65,
    rating: 4.9,
    reviewCount: 53,
    sku: 'SHT-FRG-005',
    stock: 35,
    category: 'fragrances-grooming',
    subcategory: 'Perfumes',
    tags: ['Artisanal', 'Extrait de Parfum', 'Unisex', 'Grasse France'],
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isTrending: true,
    isNewArrival: false,
    colors: [
      { name: 'Amber Smoked Flacon', hex: '#78350F', inStock: true }
    ],
    sizes: ['50ml Spray', '100ml Flacon'],
    specifications: {
      'Concentration': 'Extrait de Parfum (30% pure oil)',
      'Top Notes': 'Saffron, Pink Pepper, Blackcurrant',
      'Heart Notes': 'Aged Wild Oud, Cardamom, Rose Absolute',
      'Base Notes': 'Bourbon Vetiver, Smoky Birch, Ambergris, Patchouli',
      'Origin': 'Grasse, France'
    },
    physicalDetails: {
      weight: '450 grams',
      dimensions: '14cm x 6cm x 6cm',
      shippingClass: 'Complimentary Global Express'
    },
    createdAt: '2026-01-05T09:00:00Z'
  },
  {
    id: 'sht-006',
    title: 'Sculptural Travertine & Frosted Glass Table Lamp',
    slug: 'sculptural-travertine-glass-lamp',
    type: 'physical',
    description: 'Carved from a solid monolith of natural Italian Roman travertine stone paired with a hand-blown triplex opal glass orb. Warm 2700K integrated dimmable LED with knurled solid brass rotary dial.',
    shortDescription: 'Carved Roman travertine and opal glass luminaire with brass rotary dimmer.',
    price: 380,
    compareAtPrice: 450,
    costPrice: 120,
    rating: 4.7,
    reviewCount: 19,
    sku: 'SHT-DEC-006',
    stock: 11,
    category: 'living-decor',
    subcategory: 'Lighting',
    tags: ['Natural Stone', 'Hand-Blown Glass', 'Dimmable', 'Sculptural'],
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isTrending: false,
    isNewArrival: true,
    colors: [
      { name: 'Warm Cream Travertine', hex: '#E6DEC9', inStock: true },
      { name: 'Nero Marquina Marble', hex: '#1F2937', inStock: true }
    ],
    sizes: ['Standard (32cm Height)'],
    specifications: {
      'Base Material': 'Solid Honed Roman Travertine',
      'Diffuser': 'Hand-Blown Triplex Opal Matte Glass',
      'Light Source': 'Warm LED 2700K CRI 95+ (50,000 hr rating)',
      'Control': 'Stepless Solid Brass Dimmer',
      'Cord': '2.5m Braided Linen Cable'
    },
    physicalDetails: {
      weight: '4.2 kg (9.2 lbs)',
      dimensions: '32cm Height x 20cm Diameter',
      shippingClass: 'Reinforced Fragile Courier Shipping'
    },
    createdAt: '2026-02-18T16:00:00Z'
  },
  {
    id: 'sht-007',
    title: 'Shattaan Minimalist Bifold Wallet with RFID Shield',
    slug: 'shattaan-minimalist-bifold-wallet',
    type: 'physical',
    description: 'Slimline profile holding up to 10 cards and flat currency without unnecessary bulk. Crafted from vegetable-tanned Buttero leather from Tuscany, hand-stitched with waxed French linen thread.',
    shortDescription: 'Ultra-slim vegetable-tanned Buttero leather bifold with RFID protection.',
    price: 135,
    compareAtPrice: 160,
    costPrice: 40,
    rating: 4.9,
    reviewCount: 88,
    sku: 'SHT-LEA-007',
    stock: 45,
    category: 'leather-goods',
    subcategory: 'Small Leather Goods',
    tags: ['Everyday Carry', 'RFID Protected', 'Slim Profile'],
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isTrending: true,
    isNewArrival: false,
    colors: [
      { name: 'Tobacco Tan', hex: '#A0522D', inStock: true },
      { name: 'Jet Black', hex: '#111827', inStock: true },
      { name: 'Forest Olive', hex: '#2F4F4F', inStock: true }
    ],
    sizes: ['One Size (10.5cm x 7.8cm)'],
    specifications: {
      'Leather': 'Italian Buttero Box Calf',
      'Capacity': '8-10 Cards + Full Currency Billfold',
      'Protection': 'Military-grade RFID blocking woven interior',
      'Thickness': 'Just 8mm unpopulated'
    },
    physicalDetails: {
      weight: '65 grams',
      dimensions: '10.5cm x 7.8cm x 0.8cm',
      shippingClass: 'Complimentary Global Express'
    },
    createdAt: '2026-01-10T11:00:00Z'
  },
  {
    id: 'sht-008',
    title: 'Raw Titanium Ergonomic Mechanical Keyboard',
    slug: 'raw-titanium-mechanical-keyboard',
    type: 'physical',
    description: 'Precision CNC-milled Grade-5 titanium unibody case with gasket mount architecture. Equipped with factory pre-lubricated silent linear switches, dye-sublimated PBT keycaps, and hot-swappable PCB.',
    shortDescription: 'Grade-5 titanium gasket-mounted 75% mechanical wireless keyboard.',
    price: 490,
    compareAtPrice: 550,
    costPrice: 180,
    rating: 5.0,
    reviewCount: 41,
    sku: 'SHT-TEC-008',
    stock: 9,
    category: 'audio-tech',
    subcategory: 'Workstation',
    tags: ['Titanium', 'Mechanical', 'Wireless', 'Hot-Swap'],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isTrending: false,
    isNewArrival: true,
    colors: [
      { name: 'Raw Bead-Blasted Titanium', hex: '#9CA3AF', inStock: true },
      { name: 'Anodized Midnight Blue', hex: '#1E3A8A', inStock: true }
    ],
    sizes: ['75% Compact Layout'],
    specifications: {
      'Chassis': 'Solid CNC-machined Grade-5 Titanium',
      'Plate': 'FR4 & Polycarbonate leaf-spring gasket',
      'Switches': 'Custom Lubed 45g Linear Quartz',
      'Battery': '8,000 mAh (3 months wireless operation)'
    },
    physicalDetails: {
      weight: '1.85 kg',
      dimensions: '32cm x 14cm x 3.5cm',
      shippingClass: 'Complimentary Global Express'
    },
    createdAt: '2026-02-15T10:00:00Z'
  },
  {
    id: 'sht-009',
    title: 'Shattaan Atelier 3D Garment CAD & Pattern Master Suite',
    slug: 'shattaan-atelier-3d-garment-cad-pattern-suite',
    type: 'digital',
    description: 'The master digital archive from the Shattaan Couture Studio. Includes production-ready CLO3D/Marvelous Designer garment project files, textured 4K PBR material maps, raw OBJ/FBX drape geometries, and precision DXF/AAMA grading patterns for bespoke tailoring and virtual fashion pipelines.',
    shortDescription: 'Production-grade 3D garment digital master assets and graded CAD tailoring patterns.',
    price: 190,
    compareAtPrice: 240,
    costPrice: 0,
    rating: 4.9,
    reviewCount: 16,
    sku: 'SHT-DIG-009',
    stock: 999,
    category: 'apparel',
    subcategory: 'Digital Assets',
    tags: ['Digital Download', 'CAD Pattern', '3D Asset', 'Bespoke'],
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: true,
    isTrending: true,
    isNewArrival: true,
    colors: [
      { name: 'Digital Master Edition', hex: '#6366F1', inStock: true }
    ],
    sizes: ['Instant Download (.ZIP 1.4GB)'],
    specifications: {
      'Delivery Format': 'Instant Digital Download (.ZIP archive)',
      'Compatible Software': 'CLO 3D, Marvelous Designer, Blender, Unreal Engine 5, Browzwear',
      'File Formats': '.ZPrj, .DXF, .AAMA, .OBJ, .FBX, 4K PBR Textures',
      'License': 'Commercial & Personal Architectural Production License',
      'Updates': 'Lifetime access to version upgrades'
    },
    digitalDetails: {
      format: 'CLO3D (.ZPrj), 3D Meshes (.OBJ, .FBX), CAD (.DXF/.AAMA), 4K PBR',
      fileSize: '1.42 GB High-Speed Package',
      deliveryMethod: 'Instant Secure Link & Account Dashboard',
      license: 'Bespoke Commercial & Production License'
    },
    createdAt: '2026-02-22T15:00:00Z'
  },
  {
    id: 'sht-010',
    title: 'Acoustic Spatial Audio IR & Mastering Impulse Response Suite',
    slug: 'acoustic-spatial-audio-ir-mastering-suite',
    type: 'digital',
    description: 'Concert-grade 96kHz / 24-bit true stereo impulse response acoustics captured across legendary European symphony halls, anechoic soundstages, and custom analog mastering chains. Includes convolution reverb presets formatted for all industry-standard DAWs and digital audio workstations.',
    shortDescription: 'Concert-hall spatial impulse response profiles and analog mastering chain IR pack.',
    price: 145,
    compareAtPrice: 180,
    costPrice: 0,
    rating: 5.0,
    reviewCount: 22,
    sku: 'SHT-DIG-010',
    stock: 999,
    category: 'audio-tech',
    subcategory: 'Digital Audio',
    tags: ['Digital Download', 'Impulse Response', 'Audiophile', 'Lossless'],
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80'
    ],
    isFeatured: false,
    isTrending: true,
    isNewArrival: true,
    colors: [
      { name: 'Lossless Master Pack', hex: '#0EA5E9', inStock: true }
    ],
    sizes: ['Studio Master 96kHz/24-bit'],
    specifications: {
      'Audio Fidelity': '96kHz / 24-bit Uncompressed Lossless WAV',
      'Compatibility': 'Logic Pro Space Designer, Altiverb, Ableton Convolution, Reaper, Pro Tools',
      'Profiles Included': '48 Premium European Hall & Chamber Impulse Responses',
      'Licensing': '100% Royalty-Free Commercial Music & Cinema License'
    },
    digitalDetails: {
      format: 'Lossless 96kHz / 24-bit WAV & DAW Presets',
      fileSize: '850 MB Lossless Archive',
      deliveryMethod: 'Instant High-Speed Digital Download',
      license: 'Royalty-Free Commercial Studio License'
    },
    createdAt: '2026-02-24T18:00:00Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'sht-001',
    author: 'Alexander Sterling',
    rating: 5,
    title: 'The pinnacle of travel luggage',
    comment: 'I travel internationally twice a month and have owned luxury leather bags at double the price. The Shattaan Obsidian Duffle blows them all out of the water. The leather smell is intoxicating and the hardware feels virtually indestructible.',
    date: '2026-02-12',
    verifiedPurchase: true,
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    productId: 'sht-001',
    author: 'Elena Rostova',
    rating: 5,
    title: 'Flawless craftsmanship & fast delivery',
    comment: 'Ordered for my partner’s milestone birthday. Arrived impeccably boxed with cloth dust bag. The custom monogram detailing and shoe compartment made this a home run.',
    date: '2026-02-20',
    verifiedPurchase: true,
    helpfulCount: 17
  },
  {
    id: 'rev-3',
    productId: 'sht-002',
    author: 'Marcus Vance',
    rating: 5,
    title: 'Daily grail piece',
    comment: 'The 41mm proportion is spot on. Timekeeping has been within +2 seconds per day right out of the box. Outstanding contrast on the dial and anti-reflective crystal.',
    date: '2026-02-18',
    verifiedPurchase: true,
    helpfulCount: 31
  },
  {
    id: 'rev-4',
    productId: 'sht-003',
    author: 'Sophia Chen, Audio Engineer',
    rating: 5,
    title: 'Studio precision without cables',
    comment: 'Planar soundstage is remarkably wide and bass response is textured, not artificially boosted. The wood inlays and memory foam allow 8-hour sessions without ear fatigue.',
    date: '2026-02-05',
    verifiedPurchase: true,
    helpfulCount: 19
  }
];

export const INITIAL_DISCOUNT_CODES: DiscountCode[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    description: '10% off your entire first purchase at shattaan.com'
  },
  {
    code: 'SHATTAAN20',
    type: 'percentage',
    value: 20,
    minPurchase: 300,
    description: '20% off luxury orders over $300'
  },
  {
    code: 'VIP50',
    type: 'fixed',
    value: 50,
    minPurchase: 250,
    description: '$50 instant store credit on orders over $250'
  }
];

export const SAMPLE_CUSTOMER: Customer = {
  id: 'cust-8821',
  name: 'Marcus Sterling',
  email: 'shattaan.1@gmail.com',
  phone: '+1 (555) 234-8900',
  joinedDate: '2025-11-14',
  totalOrders: 4,
  totalSpent: 3420,
  status: 'vip',
  defaultAddress: {
    fullName: 'Marcus Sterling',
    addressLine1: '742 Evergreen Promenade, Penthouse 4B',
    addressLine2: 'Skyline Residences',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
    phone: '+1 (555) 234-8900'
  }
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-10091',
    orderNumber: 'SHT-2026-10091',
    date: '2026-02-27T18:30:00Z',
    customer: {
      id: 'cust-8821',
      name: 'Marcus Sterling',
      email: 'shattaan.1@gmail.com',
      phone: '+1 (555) 234-8900',
      shippingAddress: {
        fullName: 'Marcus Sterling',
        addressLine1: '742 Evergreen Promenade, Penthouse 4B',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States',
        phone: '+1 (555) 234-8900'
      }
    },
    items: [
      {
        productId: 'sht-001',
        title: 'Shattaan Obsidian Weekender Duffle',
        price: 680,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
        selectedColor: 'Obsidian Black',
        selectedSize: '45L Carry-On',
        quantity: 1
      },
      {
        productId: 'sht-007',
        title: 'Shattaan Minimalist Bifold Wallet with RFID Shield',
        price: 135,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
        selectedColor: 'Jet Black',
        quantity: 1
      }
    ],
    subtotal: 815,
    discount: 81.5,
    appliedPromoCode: 'WELCOME10',
    shippingFee: 0,
    tax: 58.68,
    total: 792.18,
    paymentMethod: 'Credit Card (•••• 4242)',
    paymentStatus: 'paid',
    fulfillmentStatus: 'processing',
    trackingNumber: 'DHL-EXP-9948201',
    trackingCarrier: 'DHL Express',
    estimatedDeliveryDate: '2026-03-04',
    notes: 'Please leave with building concierge on delivery.'
  },
  {
    id: 'ord-10084',
    orderNumber: 'SHT-2026-10084',
    date: '2026-02-14T11:15:00Z',
    customer: {
      name: 'Victoria Thorne',
      email: 'v.thorne@luxurygroup.co.uk',
      phone: '+44 20 7946 0912',
      shippingAddress: {
        fullName: 'Victoria Thorne',
        addressLine1: '14 Mayfair Gardens, Suite 3',
        city: 'London',
        state: 'Greater London',
        postalCode: 'W1K 6ZA',
        country: 'United Kingdom',
        phone: '+44 20 7946 0912'
      }
    },
    items: [
      {
        productId: 'sht-002',
        title: 'Monolith Automatic Field Chronograph 41mm',
        price: 1450,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80',
        selectedColor: 'Stealth Black',
        selectedSize: '41mm Case',
        quantity: 1
      }
    ],
    subtotal: 1450,
    discount: 0,
    shippingFee: 0,
    tax: 116.00,
    total: 1566.00,
    paymentMethod: 'Apple Pay',
    paymentStatus: 'paid',
    fulfillmentStatus: 'delivered',
    trackingNumber: 'FDX-773019482',
    trackingCarrier: 'FedEx Priority International',
    estimatedDeliveryDate: '2026-02-18'
  },
  {
    id: 'ord-10076',
    orderNumber: 'SHT-2026-10076',
    date: '2026-01-29T14:40:00Z',
    customer: {
      name: 'Julian Beauchamp',
      email: 'j.beauchamp@paris.fr',
      phone: '+33 1 42 68 55 00',
      shippingAddress: {
        fullName: 'Julian Beauchamp',
        addressLine1: '28 Rue du Faubourg Saint-Honoré',
        city: 'Paris',
        state: 'Île-de-France',
        postalCode: '75008',
        country: 'France',
        phone: '+33 1 42 68 55 00'
      }
    },
    items: [
      {
        productId: 'sht-005',
        title: 'Nocturne Oud & Smoked Vetiver Extrait (100ml)',
        price: 240,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
        selectedColor: 'Amber Smoked Flacon',
        selectedSize: '100ml Flacon',
        quantity: 2
      }
    ],
    subtotal: 480,
    discount: 96,
    appliedPromoCode: 'SHATTAAN20',
    shippingFee: 0,
    tax: 38.40,
    total: 422.40,
    paymentMethod: 'PayPal',
    paymentStatus: 'paid',
    fulfillmentStatus: 'delivered',
    trackingNumber: 'COL-330198244FR',
    trackingCarrier: 'Colissimo International',
    estimatedDeliveryDate: '2026-02-02'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  SAMPLE_CUSTOMER,
  {
    id: 'cust-8822',
    name: 'Victoria Thorne',
    email: 'v.thorne@luxurygroup.co.uk',
    phone: '+44 20 7946 0912',
    joinedDate: '2025-12-03',
    totalOrders: 2,
    totalSpent: 2180,
    status: 'vip',
    defaultAddress: {
      fullName: 'Victoria Thorne',
      addressLine1: '14 Mayfair Gardens, Suite 3',
      city: 'London',
      state: 'Greater London',
      postalCode: 'W1K 6ZA',
      country: 'United Kingdom',
      phone: '+44 20 7946 0912'
    }
  },
  {
    id: 'cust-8823',
    name: 'Julian Beauchamp',
    email: 'j.beauchamp@paris.fr',
    phone: '+33 1 42 68 55 00',
    joinedDate: '2026-01-18',
    totalOrders: 1,
    totalSpent: 422,
    status: 'active',
    defaultAddress: {
      fullName: 'Julian Beauchamp',
      addressLine1: '28 Rue du Faubourg Saint-Honoré',
      city: 'Paris',
      state: 'Île-de-France',
      postalCode: '75008',
      country: 'France',
      phone: '+33 1 42 68 55 00'
    }
  },
  {
    id: 'cust-8824',
    name: 'Daisuke Tanaka',
    email: 'tanaka.d@tokyo-design.jp',
    phone: '+81 3 5555 0143',
    joinedDate: '2026-02-08',
    totalOrders: 1,
    totalSpent: 520,
    status: 'active',
    defaultAddress: {
      fullName: 'Daisuke Tanaka',
      addressLine1: 'Minato-ku, Roppongi 6-10-1',
      city: 'Tokyo',
      state: 'Tokyo',
      postalCode: '106-6108',
      country: 'Japan',
      phone: '+81 3 5555 0143'
    }
  }
];
