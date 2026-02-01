// Product images - PR8100 Red/Black
import pr8100RbMain from "@/assets/products/pr8100-rb-main.jpg";
import pr8100RbAngle from "@/assets/products/pr8100-rb-angle.jpg";
import pr8100RbBall from "@/assets/products/pr8100-rb-ball.jpg";
import pr8100RbAction from "@/assets/products/pr8100-rb-action.jpg";
import pr8100RbBalls from "@/assets/products/pr8100-rb-balls.jpg";
import pr8100RbDetail from "@/assets/products/pr8100-rb-detail.jpg";
import pr8100RbDetail2 from "@/assets/products/pr8100-rb-detail2.jpg";
import pr8100RbPair from "@/assets/products/pr8100-rb-pair.jpg";
import pr8100RbSpecs from "@/assets/products/pr8100-rb-specs.jpg";
import pr8100RbCourt1 from "@/assets/products/pr8100-rb-court1.jpg";
import pr8100RbCourt2 from "@/assets/products/pr8100-rb-court2.jpg";
import pr8100RbLifestyle1 from "@/assets/products/pr8100-rb-lifestyle1.jpg";
import pr8100RbLifestyle2 from "@/assets/products/pr8100-rb-lifestyle2.jpg";
import pr8100RbPlayer from "@/assets/products/pr8100-rb-player.jpg";
import pr8100RbPlayers from "@/assets/products/pr8100-rb-players.jpg";
import pr8100RbGrip1 from "@/assets/products/pr8100-rb-grip1.jpg";
import pr8100RbGrip2 from "@/assets/products/pr8100-rb-grip2.jpg";

// PR8100 Blue/Pink
import pr8100BpMain from "@/assets/products/pr8100-bp-main.jpg";
import pr8100BpAngle from "@/assets/products/pr8100-bp-angle.jpg";
import pr8100BpBall from "@/assets/products/pr8100-bp-ball.jpg";
import pr8100BpAction from "@/assets/products/pr8100-bp-action.jpg";
import pr8100BpBalls from "@/assets/products/pr8100-bp-balls.jpg";
import pr8100BpDetail from "@/assets/products/pr8100-bp-detail.jpg";
import pr8100BpDetail2 from "@/assets/products/pr8100-bp-detail2.jpg";
import pr8100BpPair from "@/assets/products/pr8100-bp-pair.jpg";
import pr8100BpPair2 from "@/assets/products/pr8100-bp-pair2.jpg";
import pr8100BpSpecs from "@/assets/products/pr8100-bp-specs.jpg";
import pr8100BpSpecs2 from "@/assets/products/pr8100-bp-specs2.jpg";
import pr8100BpPlayer1 from "@/assets/products/pr8100-bp-player1.jpg";
import pr8100BpPlayer2 from "@/assets/products/pr8100-bp-player2.jpg";
import pr8100BpGrip1 from "@/assets/products/pr8100-bp-grip1.jpg";
import pr8100BpGrip2 from "@/assets/products/pr8100-bp-grip2.jpg";
import pr8100BpCourt1 from "@/assets/products/pr8100-bp-court1.jpg";
import pr8100BpCourt2 from "@/assets/products/pr8100-bp-court2.jpg";
import pr8100BpLifestyle1 from "@/assets/products/pr8100-bp-lifestyle1.jpg";
import pr8100BpLifestyle2 from "@/assets/products/pr8100-bp-lifestyle2.jpg";

// PR8200 Blue Stripe
import pr8200BsMain from "@/assets/products/pr8200-bs-main.jpg";
import pr8200BsAngle from "@/assets/products/pr8200-bs-angle.jpg";
import pr8200BsBall from "@/assets/products/pr8200-bs-ball.jpg";
import pr8200BsAction from "@/assets/products/pr8200-bs-action.jpg";
import pr8200BsCourt from "@/assets/products/pr8200-bs-court.jpg";
import pr8200BsDetail from "@/assets/products/pr8200-bs-detail.jpg";
import pr8200BsGrip from "@/assets/products/pr8200-bs-grip.jpg";
import pr8200BsPlayer from "@/assets/products/pr8200-bs-player.jpg";
import pr8200BsPair from "@/assets/products/pr8200-bs-pair.jpg";

// Legacy imports (for other products until images provided)
import pr8100Hero from "@/assets/products/pr8100-hero.jpg";
import pr8100Specs from "@/assets/products/pr8100-specs.jpg";
import pr8100Detail from "@/assets/products/pr8100-detail.jpg";
import pr8100Grip from "@/assets/products/pr8100-grip.jpg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "padel" | "accessories";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  badge?: string;
  description: string;
  features: string[];
  specs: {
    weight?: string;
    shape?: string;
    material?: string;
    balance?: string;
    level?: string;
    dimensions?: string;
  };
  isBestSeller?: boolean;
  isNew?: boolean;
  colorVariant?: string;
  bestSellerOrder?: number; // For carousel display order
}

export const products: Product[] = [
  // PR8100 Series - Padel Rackets
  {
    id: "pr8100-red-black",
    name: "PR8100",
    slug: "pr8100-red-black",
    category: "padel",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 342,
    image: pr8100RbMain,
    gallery: [pr8100RbMain, pr8100RbAngle, pr8100RbBall, pr8100RbAction, pr8100RbBalls, pr8100RbDetail, pr8100RbDetail2, pr8100RbPair, pr8100RbSpecs, pr8100RbCourt1, pr8100RbCourt2, pr8100RbLifestyle1, pr8100RbLifestyle2, pr8100RbPlayer, pr8100RbPlayers, pr8100RbGrip1, pr8100RbGrip2],
    badge: "Best Seller",
    colorVariant: "Red/Black",
    description: "Our flagship padel racket featuring 3-layer carbon fiber construction with Energy Transfer System for maximum power and control. The equidistant hole arrangement in groups of 3 strengthens the surface and improves durability.",
    features: [
      "3-layer carbon fiber face",
      "Energy Transfer System",
      "Extended impact zone",
      "Power Bower technology",
      "Anti-slip grip design",
    ],
    specs: {
      weight: "12.5 oz (355g)",
      dimensions: "26cm x 34cm x 3.7cm",
      shape: "Round",
      material: "3-Layer Carbon Fiber",
      balance: "Medium",
      level: "Intermediate-Advanced",
    },
    isBestSeller: true,
    bestSellerOrder: 1, // First in carousel
  },
  {
    id: "pr8100-blue-pink",
    name: "PR8100",
    slug: "pr8100-blue-pink",
    category: "padel",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 186,
    image: pr8100BpMain,
    gallery: [pr8100BpMain, pr8100BpAngle, pr8100BpBall, pr8100BpAction, pr8100BpBalls, pr8100BpDetail, pr8100BpDetail2, pr8100BpPair, pr8100BpPair2, pr8100BpSpecs, pr8100BpSpecs2, pr8100BpPlayer1, pr8100BpPlayer2, pr8100BpGrip1, pr8100BpGrip2, pr8100BpCourt1, pr8100BpCourt2, pr8100BpLifestyle1, pr8100BpLifestyle2],
    colorVariant: "Blue/Pink",
    description: "Our flagship padel racket featuring 3-layer carbon fiber construction with Energy Transfer System for maximum power and control. The equidistant hole arrangement in groups of 3 strengthens the surface and improves durability.",
    features: [
      "3-layer carbon fiber face",
      "Energy Transfer System",
      "Extended impact zone",
      "Power Bower technology",
      "Anti-slip grip design",
    ],
    specs: {
      weight: "12.5 oz (355g)",
      dimensions: "26cm x 34cm x 3.7cm",
      shape: "Round",
      material: "3-Layer Carbon Fiber",
      balance: "Medium",
      level: "Intermediate-Advanced",
    },
    isBestSeller: true,
    bestSellerOrder: 3, // Third in carousel
  },
  {
    id: "pr8100-blue-orange",
    name: "PR8100",
    slug: "pr8100-blue-orange",
    category: "padel",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 98,
    image: pr8100Hero, // placeholder until images provided
    gallery: [pr8100Hero, pr8100Detail, pr8100Grip, pr8100Specs],
    colorVariant: "Blue/Orange",
    description: "Our flagship padel racket featuring 3-layer carbon fiber construction with Energy Transfer System for maximum power and control. The equidistant hole arrangement in groups of 3 strengthens the surface and improves durability.",
    features: [
      "3-layer carbon fiber face",
      "Energy Transfer System",
      "Extended impact zone",
      "Power Bower technology",
      "Anti-slip grip design",
    ],
    specs: {
      weight: "12.5 oz (355g)",
      dimensions: "26cm x 34cm x 3.7cm",
      shape: "Round",
      material: "3-Layer Carbon Fiber",
      balance: "Medium",
      level: "Intermediate-Advanced",
    },
    isBestSeller: true,
    bestSellerOrder: 5, // Fifth in carousel (second page)
  },
  // PR8200 Series
  {
    id: "pr8200-blue-stripe",
    name: "PR8200",
    slug: "pr8200-blue-stripe",
    category: "padel",
    price: 179.99,
    rating: 4.9,
    reviewCount: 64,
    image: pr8200BsMain,
    gallery: [pr8200BsMain, pr8200BsAngle, pr8200BsBall, pr8200BsAction, pr8200BsCourt, pr8200BsDetail, pr8200BsGrip, pr8200BsPlayer, pr8200BsPair],
    badge: "New",
    colorVariant: "Blue Stripe",
    description: "The next evolution in padel performance. PR8200 features advanced materials and refined balance for professional-level play.",
    features: [
      "Advanced carbon composite",
      "Enhanced sweet spot",
      "Precision balance system",
      "Pro-grade grip",
      "Tournament approved",
    ],
    specs: {
      weight: "12.3 oz (350g)",
      shape: "Teardrop",
      material: "Carbon Composite",
      balance: "Medium-High",
      level: "Advanced-Pro",
    },
    isBestSeller: true,
    bestSellerOrder: 2, // Second in carousel
  },
  {
    id: "pr8200-grey-stripe",
    name: "PR8200",
    slug: "pr8200-grey-stripe",
    category: "padel",
    price: 179.99,
    rating: 4.8,
    reviewCount: 42,
    image: pr8100Detail, // placeholder until PR8200 images provided
    colorVariant: "Grey Stripe",
    description: "The next evolution in padel performance. PR8200 features advanced materials and refined balance for professional-level play.",
    features: [
      "Advanced carbon composite",
      "Enhanced sweet spot",
      "Precision balance system",
      "Pro-grade grip",
      "Tournament approved",
    ],
    specs: {
      weight: "12.3 oz (350g)",
      shape: "Teardrop",
      material: "Carbon Composite",
      balance: "Medium-High",
      level: "Advanced-Pro",
    },
    isBestSeller: true,
    bestSellerOrder: 4, // Fourth in carousel (second page)
  },
  {
    id: "pr8200-super-power-pink",
    name: "PR8200",
    slug: "pr8200-super-power-pink",
    category: "padel",
    price: 179.99,
    rating: 4.7,
    reviewCount: 28,
    image: pr8100Specs, // placeholder until images provided
    badge: "New",
    colorVariant: "Super Power Pink",
    description: "The next evolution in padel performance. PR8200 features advanced materials and refined balance for professional-level play.",
    features: [
      "Advanced carbon composite",
      "Enhanced sweet spot",
      "Precision balance system",
      "Pro-grade grip",
      "Tournament approved",
    ],
    specs: {
      weight: "12.3 oz (350g)",
      shape: "Teardrop",
      material: "Carbon Composite",
      balance: "Medium-High",
      level: "Advanced-Pro",
    },
    isBestSeller: true,
    bestSellerOrder: 6, // Sixth in carousel (second page)
    isNew: true,
  },
  // Accessories
  {
    id: "acc-1",
    name: "IANONI Padel Balls",
    slug: "ianoni-padel-balls",
    category: "accessories",
    price: 12.99,
    rating: 4.6,
    reviewCount: 445,
    image: pr8100Hero,
    description: "Official IANONI padel balls for optimal play and consistent bounce.",
    features: [
      "Tournament quality",
      "Consistent bounce",
      "High visibility",
      "Pack of 3",
    ],
    specs: {},
  },
  {
    id: "acc-2",
    name: "Premium Racket Bag",
    slug: "premium-racket-bag",
    category: "accessories",
    price: 79.99,
    rating: 4.8,
    reviewCount: 92,
    image: pr8100RbMain,
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
  },
  {
    id: "acc-3",
    name: "Overgrip Pack (3pcs)",
    slug: "overgrip-pack",
    category: "accessories",
    price: 14.99,
    rating: 4.7,
    reviewCount: 312,
    image: pr8100Grip,
    description: "High-tack overgrips for improved comfort and control.",
    features: [
      "Superior absorption",
      "Tacky feel",
      "Easy application",
      "Multiple colors",
    ],
    specs: {},
  },
];

// Get best sellers sorted by their display order
export const getBestSellers = () => 
  products
    .filter((p) => p.isBestSeller && p.bestSellerOrder)
    .sort((a, b) => (a.bestSellerOrder || 0) - (b.bestSellerOrder || 0));

// Get all padel rackets (the 6 main products)
export const getPadelRackets = () => 
  products.filter((p) => p.category === "padel" && p.name.startsWith("PR"));

// Get padel rackets in random order
export const getPadelRacketsRandomized = () => {
  const rackets = getPadelRackets();
  // Fisher-Yates shuffle
  for (let i = rackets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rackets[i], rackets[j]] = [rackets[j], rackets[i]];
  }
  return rackets;
};

export const getNewProducts = () => products.filter((p) => p.isNew);
export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);
export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
