import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "light" | "dark";
}

export function ProductCard({ product, index = 0, variant = "light" }: ProductCardProps) {
  const isDark = variant === "dark";

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
          {/* Product Image Container */}
          <div 
            className={`relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 ${
              isDark 
                ? "bg-gradient-to-b from-white/10 to-white/5 border border-white/10" 
                : "bg-gradient-to-b from-muted to-muted/50 border border-border"
            }`}
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/15 blur-3xl rounded-full" />
            </div>
            
            {/* Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
              />
            </div>
            
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-full shadow-lg">
                {product.badge}
              </div>
            )}
            
            {/* Hover overlay */}
            <div 
              className={`absolute inset-0 transition-colors duration-500 ${
                isDark 
                  ? "bg-white/0 group-hover:bg-white/5" 
                  : "bg-foreground/0 group-hover:bg-foreground/[0.02]"
              }`} 
            />
            
            {/* CTA on hover */}
            <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-white" : "text-foreground"}`}>
                <span className="font-medium">View Details</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            {/* Rating */}
            <div className={`flex items-center gap-2 text-xs ${isDark ? "text-white/50" : "text-muted-foreground"}`}>
              <span className="text-primary font-medium">{product.rating}★</span>
              <span className={isDark ? "text-white/30" : "text-border"}>•</span>
              <span>{product.reviewCount} reviews</span>
            </div>

            {/* Name & Variant */}
            <h3 className={`font-semibold group-hover:text-primary transition-colors duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              {product.name}
              {product.colorVariant && (
                <span className={`block text-sm font-normal mt-0.5 ${isDark ? "text-white/50" : "text-muted-foreground"}`}>
                  {product.colorVariant}
                </span>
              )}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className={`text-lg font-bold ${isDark ? "text-white" : "text-foreground"}`}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className={`text-sm line-through ${isDark ? "text-white/40" : "text-muted-foreground"}`}>
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
