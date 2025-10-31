export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  image: string;
};

export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    name: 'HydraBoost Daily Cleanser',
    category: 'Cleanser',
    description:
      "A gentle, hydrating cleanser that removes impurities without stripping the skin's natural moisture barrier.",
    benefits: [
      'Deeply cleanses pores',
      'Maintains skin hydration',
      'Soothes and calms irritated skin',
    ],
    ingredients: [
      'Hyaluronic Acid',
      'Ceramides',
      'Glycerin',
      'Green Tea Extract',
    ],
    usage:
      'Use twice daily. Apply a small amount to damp skin, massage gently, and rinse thoroughly.',
    image: 'https://picsum.photos/seed/cleanser/400/400',
  },
  {
    id: 'prod_002',
    name: 'Clarity+ Acne Treatment Serum',
    category: 'Serum',
    description:
      'A powerful serum formulated with salicylic acid to target acne, reduce inflammation, and prevent future breakouts.',
    benefits: [
      'Fights active acne',
      'Unclogs pores',
      'Reduces redness and inflammation',
      'Prevents new breakouts',
    ],
    ingredients: ['2% Salicylic Acid', 'Niacinamide', 'Zinc PCA', 'Tea Tree Oil'],
    usage:
      'Apply a thin layer to affected areas once daily after cleansing, preferably in the evening. Follow with a moisturizer.',
    image: 'https://picsum.photos/seed/serum/400/400',
  },
  {
    id: 'prod_003',
    name: 'AgeDefy Retinol Night Cream',
    category: 'Moisturizer',
    description:
      'A rich night cream with encapsulated retinol to reduce the appearance of fine lines, wrinkles, and uneven skin tone.',
    benefits: [
      'Diminishes fine lines and wrinkles',
      'Improves skin texture',
      'Fades dark spots',
      'Boosts collagen production',
    ],
    ingredients: ['0.5% Retinol', 'Peptides', 'Squalane', 'Vitamin E'],
    usage:
      'Apply a pea-sized amount to clean, dry skin at night. Start with 2-3 times a week and gradually increase to nightly use.',
    image: 'https://picsum.photos/seed/cream/400/400',
  },
  {
    id: 'prod_004',
    name: 'SunGuard Sheer SPF 50',
    category: 'Sunscreen',
    description:
      'A lightweight, non-greasy sunscreen that provides broad-spectrum protection against UVA/UVB rays.',
    benefits: [
      'Protects against sun damage',
      'Prevents premature aging',
      'Lightweight, no white-cast formula',
    ],
    ingredients: ['Zinc Oxide', 'Octinoxate', 'Niacinamide', 'Vitamin C'],
    usage:
      'Apply generously and evenly as the last step in your skincare routine, 15 minutes before sun exposure. Reapply at least every 2 hours.',
    image: 'https://picsum.photos/seed/sunscreen/400/400',
  },
];
