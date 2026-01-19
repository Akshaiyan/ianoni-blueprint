export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "padel" | "pickleball" | "accessories";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
  features: string[];
  specs: {
    weight?: string;
    shape?: string;
    material?: string;
    balance?: string;
    level?: string;
  };
  isBestSeller?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  // Padel Rackets
  {
    id: "padel-1",
    name: "IANONI Pro Carbon",
    slug: "ianoni-pro-carbon",
    category: "padel",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 342,
    image: "🎾",
    badge: "Best Seller",
    description: "Our flagship padel racket featuring 3K carbon fiber construction for maximum power and control.",
    features: [
      "3K Carbon fiber face",
      "EVA soft foam core",
      "Diamond shape for power",
      "Anti-vibration system",
    ],
    specs: {
      weight: "355-365g",
      shape: "Diamond",
      material: "3K Carbon Fiber",
      balance: "High",
      level: "Intermediate-Advanced",
    },
    isBestSeller: true,
  },
  {
    id: "padel-2",
    name: "IANONI Starter Series",
    slug: "ianoni-starter-series",
    category: "padel",
    price: 89.99,
    rating: 4.6,
    reviewCount: 528,
    image: "🎾",
    badge: "Beginner Pick",
    description: "Perfect for beginners with a forgiving sweet spot and lightweight design.",
    features: [
      "Fiberglass face",
      "Soft EVA core",
      "Round shape for control",
      "Comfort grip",
    ],
    specs: {
      weight: "340-350g",
      shape: "Round",
      material: "Fiberglass",
      balance: "Low",
      level: "Beginner",
    },
    isBestSeller: true,
  },
  {
    id: "padel-3",
    name: "IANONI Elite Control",
    slug: "ianoni-elite-control",
    category: "padel",
    price: 179.99,
    rating: 4.7,
    reviewCount: 186,
    image: "🎾",
    badge: "New",
    description: "Precision-engineered for players who prioritize touch and placement.",
    features: [
      "12K Carbon fiber face",
      "Memory foam core",
      "Teardrop shape",
      "Textured surface",
    ],
    specs: {
      weight: "350-360g",
      shape: "Teardrop",
      material: "12K Carbon Fiber",
      balance: "Medium",
      level: "Advanced",
    },
    isNew: true,
  },
  {
    id: "padel-4",
    name: "IANONI Power Plus",
    slug: "ianoni-power-plus",
    category: "padel",
    price: 149.99,
    rating: 4.5,
    reviewCount: 234,
    image: "🎾",
    description: "Maximum power for aggressive players who love to attack.",
    features: [
      "Carbon fiber face",
      "Hard EVA core",
      "Diamond shape",
      "Reinforced frame",
    ],
    specs: {
      weight: "365-375g",
      shape: "Diamond",
      material: "Carbon Fiber",
      balance: "High",
      level: "Intermediate-Advanced",
    },
  },
  // Pickleball Paddles
  {
    id: "pickle-1",
    name: "IANONI Precision Pro",
    slug: "ianoni-precision-pro",
    category: "pickleball",
    price: 129.99,
    rating: 4.7,
    reviewCount: 156,
    image: "🏓",
    badge: "Top Rated",
    description: "Tournament-ready paddle with exceptional control and spin.",
    features: [
      "Carbon fiber face",
      "Polymer honeycomb core",
      "Edge guard protection",
      "Cushioned grip",
    ],
    specs: {
      weight: "7.8-8.2 oz",
      shape: "Wide Body",
      material: "Carbon Fiber",
      balance: "Medium",
      level: "All Levels",
    },
    isBestSeller: true,
  },
  {
    id: "pickle-2",
    name: "IANONI Starter Paddle",
    slug: "ianoni-starter-paddle",
    category: "pickleball",
    price: 59.99,
    rating: 4.5,
    reviewCount: 289,
    image: "🏓",
    description: "Great entry-level paddle for new pickleball players.",
    features: [
      "Fiberglass face",
      "Polymer core",
      "Comfortable grip",
      "Lightweight design",
    ],
    specs: {
      weight: "7.5-7.8 oz",
      shape: "Standard",
      material: "Fiberglass",
      balance: "Medium-Low",
      level: "Beginner",
    },
  },
  // Accessories
  {
    id: "acc-1",
    name: "Premium Racket Bag",
    slug: "premium-racket-bag",
    category: "accessories",
    price: 79.99,
    rating: 4.8,
    reviewCount: 92,
    image: "🎒",
    description: "Spacious bag with dedicated compartments for rackets and gear.",
    features: [
      "Holds 3+ rackets",
      "Padded straps",
      "Ventilated shoe pocket",
      "Accessory pockets",
    ],
    specs: {
      material: "Water-resistant nylon",
    },
    isBestSeller: true,
  },
  {
    id: "acc-2",
    name: "Overgrip Pack (3pcs)",
    slug: "overgrip-pack",
    category: "accessories",
    price: 12.99,
    rating: 4.6,
    reviewCount: 445,
    image: "🎾",
    description: "High-tack overgrips for improved comfort and control.",
    features: [
      "Superior absorption",
      "Tacky feel",
      "Easy application",
      "Multiple colors",
    ],
    specs: {},
  },
  {
    id: "acc-3",
    name: "Padel Ball Set (3pcs)",
    slug: "padel-ball-set",
    category: "accessories",
    price: 9.99,
    rating: 4.4,
    reviewCount: 678,
    image: "🎾",
    description: "Official specification padel balls for optimal play.",
    features: [
      "Tournament quality",
      "Consistent bounce",
      "Pressurized can",
      "High visibility",
    ],
    specs: {},
  },
];

export const getBestSellers = () => products.filter((p) => p.isBestSeller);
export const getNewProducts = () => products.filter((p) => p.isNew);
export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);
export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);