// Product images
import pr8100RedBlack from "@/assets/products/pr8100-red-black.jpg";
import pr8100BluePink from "@/assets/products/pr8100-blue-pink.jpg";
import pr8100Angle from "@/assets/products/pr8100-red-black-angle.jpg";
import pr8100Hero from "@/assets/products/pr8100-hero.jpg";
import pr8100Specs from "@/assets/products/pr8100-specs.jpg";
import pr8100Detail from "@/assets/products/pr8100-detail.jpg";
import pr8100Grip from "@/assets/products/pr8100-grip.jpg";

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
    image: pr8100RedBlack,
    gallery: [pr8100RedBlack, pr8100Angle, pr8100Hero, pr8100Detail, pr8100Grip, pr8100Specs],
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
    image: pr8100BluePink,
    gallery: [pr8100BluePink, pr8100Detail, pr8100Grip, pr8100Specs],
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
    isNew: true,
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
    image: pr8100Hero,
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
    image: pr8100Angle, // placeholder until PR8200 images provided
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
    isNew: true,
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
    image: pr8100Hero, // Shows balls in image
    description: "Official IANONI padel balls for optimal play and consistent bounce.",
    features: [
      "Tournament quality",
      "Consistent bounce",
      "High visibility",
      "Pack of 3",
    ],
    specs: {},
    isBestSeller: true,
  },
  {
    id: "acc-2",
    name: "Premium Racket Bag",
    slug: "premium-racket-bag",
    category: "accessories",
    price: 79.99,
    rating: 4.8,
    reviewCount: 92,
    image: pr8100RedBlack,
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

export const getBestSellers = () => products.filter((p) => p.isBestSeller);
export const getNewProducts = () => products.filter((p) => p.isNew);
export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);
export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
