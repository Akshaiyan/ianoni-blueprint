import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { getProductPrice, getProductImage, getCurrencySymbol } from "@/hooks/useShopifyProducts";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
  variant?: "light" | "dark";
}

export function ProductCard({ product, index = 0, variant = "light" }: ProductCardProps) {
  const isDark = variant === "dark";
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const node = product.node;
  const price = getProductPrice(product);
  const image = getProductImage(product);
  const currency = getCurrencySymbol(node.priceRange.minVariantPrice.currencyCode);
  const selectedVariant = node.variants.edges[0]?.node;

  // Extract color variant from title (e.g., "PR8100 Red/Black" → "Red/Black")
  const titleParts = node.title.split(' ');
  const modelName = titleParts[0]; // e.g., "PR8100"
  const colorVariant = titleParts.length > 1 ? titleParts.slice(1).join(' ') : null;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${node.title} added to cart`);
  };

  // Determine badge
  const badge = node.tags.includes('best-value') ? 'Best Value' :
    node.tags.includes('pro') && node.productType === 'Balls' ? 'Pro Choice' :
    node.tags.includes('save') ? `Save ${currency}${(parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || '0') - price).toFixed(0)}` :
    null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Link
        to={`/product/${node.handle}`}
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
                src={image}
                alt={node.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
              />
            </div>
            
            {badge && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-full shadow-lg">
                {badge}
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
                disabled={isLoading || !selectedVariant}
                className="flex items-center gap-0 group-hover:gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold h-10 w-10 group-hover:w-auto group-hover:px-5 rounded-full shadow-lg transition-all duration-400 justify-center overflow-hidden disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span className="max-w-0 group-hover:max-w-[6rem] overflow-hidden whitespace-nowrap transition-all duration-400 opacity-0 group-hover:opacity-100">
                  Add to Cart
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className={`font-semibold group-hover:text-primary transition-colors duration-300 ${isDark ? "text-white" : "text-foreground"}`}>
              {node.title}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className={`text-lg font-bold ${isDark ? "text-white" : "text-foreground"}`}>
                {currency}{price.toFixed(2)}
              </span>
              <span className={`text-sm line-through ${isDark ? "text-white/50" : "text-muted-foreground"}`}>
                {currency}{(node.compareAtPriceRange?.minVariantPrice?.amount && parseFloat(node.compareAtPriceRange.minVariantPrice.amount) > price
                  ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
                  : Math.ceil(price * 1.25) - 0.01
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
