import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block"
      >
        <div className="relative">
          {/* Product Image Container - clean, premium */}
          <div className="relative aspect-[4/5] bg-gradient-to-b from-muted/30 to-muted/60 rounded-xl overflow-hidden mb-6 border border-border/30">
            {/* Subtle glow behind product on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/10 blur-3xl rounded-full" />
            </div>
            
            {/* Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                {product.badge}
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.02] transition-colors duration-500" />
            
            {/* CTA appears on hover */}
            <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-foreground text-sm">
                <span className="underline-reveal">View Details</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Product Info - minimal and clean */}
          <div className="space-y-2">
            {/* Rating - subtle */}
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span className="text-primary">{product.rating}★</span>
              <span className="text-border">•</span>
              <span>{product.reviewCount} reviews</span>
            </div>

            {/* Name & Variant */}
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
              {product.name}
              {product.colorVariant && (
                <span className="block text-sm font-normal text-muted-foreground mt-0.5">
                  {product.colorVariant}
                </span>
              )}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-lg font-semibold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
