import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block"
      >
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 p-6">
            {/* Badge */}
            {product.badge && (
              <Badge
                className={cn(
                  "absolute top-4 left-4 z-10",
                  product.badge === "Best Seller" && "bg-primary",
                  product.badge === "New" && "bg-sport-teal",
                  product.badge === "Beginner Pick" && "bg-sport-green",
                  product.badge === "Top Rated" && "bg-primary"
                )}
              >
                {product.badge}
              </Badge>
            )}

            {/* Sale badge */}
            {product.originalPrice && (
              <Badge
                variant="destructive"
                className="absolute top-4 right-4 z-10"
              >
                Sale
              </Badge>
            )}

            {/* Product Image Placeholder */}
            <div className="h-full flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-7xl"
              >
                {product.image}
              </motion.div>
            </div>

            {/* Quick Add Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button className="w-full" size="sm">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Quick View
              </Button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Name */}
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
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