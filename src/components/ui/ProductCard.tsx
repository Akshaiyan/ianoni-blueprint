import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useVariantMap } from "@/hooks/useVariantMap";
import { useProductRatings } from "@/hooks/useProductRatings";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "light" | "dark";
}

export function ProductCard({ product, index = 0, variant = "light" }: ProductCardProps) {
  const isDark = variant === "dark";
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { getVariant, hasVariant } = useVariantMap();
  const { getRating } = useProductRatings();
  const canAddToCart = hasVariant(product.slug);
  const resolved = getVariant(product.slug);
  const rating = getRating(product.slug);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canAddToCart || !resolved) return;
    await addItem({
      display: {
        title: product.name + (product.colorVariant ? ` ${product.colorVariant}` : ''),
        handle: product.slug,
        imageUrl: product.image,
      },
      variantId: resolved.variantId,
      variantTitle: product.colorVariant || "Default Title",
      price: resolved.price || { amount: product.price.toFixed(2), currencyCode: "GBP" },
      quantity: 1,
      selectedOptions: product.colorVariant ? [{ name: "Color", value: product.colorVariant }] : [],
    });
    toast.success(`${product.name} added to cart`);
  };

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
          <div 
            className={`relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 ${
              isDark 
                ? "bg-gradient-to-b from-white/10 to-white/5 border border-white/10" 
                : "bg-white/80 border border-border/50"
            }`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/15 blur-3xl rounded-full" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center p-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
              />
            </div>
            
            {product.badge && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-full shadow-lg">
                {product.badge}
              </div>
            )}
            
            <div 
              className={`absolute inset-0 transition-colors duration-500 ${
                isDark 
                  ? "bg-white/0 group-hover:bg-white/5" 
                  : "bg-foreground/0 group-hover:bg-foreground/[0.02]"
              }`} 
            />
            
            <div className="absolute bottom-4 right-4 transition-all duration-400">
              <button
                onClick={handleAddToCart}
                disabled={isLoading || !canAddToCart}
                className="flex items-center gap-0 group-hover:gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold h-10 w-10 group-hover:w-auto group-hover:px-5 rounded-full shadow-lg transition-all duration-400 justify-center overflow-hidden disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span className="max-w-0 group-hover:max-w-[6rem] overflow-hidden whitespace-nowrap transition-all duration-400 opacity-0 group-hover:opacity-100">
                  Add to Cart
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className={`font-semibold group-hover:text-primary transition-colors duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              {product.name}{product.colorVariant ? ` — ${product.colorVariant}` : ''}
            </h3>

            {rating && (
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= Math.round(rating.avgRating)
                          ? "fill-primary text-primary"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
                  {rating.avgRating} ({rating.displayCount})
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-2">
              <span className={`text-lg font-bold ${isDark ? "text-white" : "text-foreground"}`}>
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className={`text-sm line-through ${isDark ? "text-white/50" : "text-muted-foreground"}`}>
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
