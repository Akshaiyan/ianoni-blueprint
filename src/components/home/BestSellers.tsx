import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useShopifyProducts, getCurrencySymbol } from "@/hooks/useShopifyProducts";
import type { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export function BestSellers() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: allProducts, isLoading } = useShopifyProducts("product_type:Racket");
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);

  const bestSellers = useMemo(() => allProducts || [], [allProducts]);

  const handleAddToCart = async (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.node.title} added to cart`);
  };
  
  const productsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(bestSellers.length / productsPerPage));
  const currentProducts = bestSellers.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const goToNext = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const goToPrev = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  if (isLoading) {
    return (
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-muted/30">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] tracking-[0.3em] uppercase font-semibold">
                ★ Top Rated
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[0.9]">
              Best Sellers
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-md">
              Our most-loved rackets, backed by thousands of 5-star reviews.
            </p>
          </motion.div>

          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Previous products"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-sm text-muted-foreground font-medium min-w-[60px] text-center">
                {currentPage + 1} / {totalPages}
              </div>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Next products"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentProducts.map((product, index) => {
            const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
            const currency = getCurrencySymbol(product.node.priceRange.minVariantPrice.currencyCode);
            const image = product.node.images.edges[0]?.node.url;

            return (
              <motion.div
                key={product.node.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/product/${product.node.handle}`}
                  className="group block relative overflow-hidden"
                >
                  <div className="relative overflow-hidden rounded-2xl h-[400px] md:h-[450px]">
                    <div className="absolute inset-0 overflow-hidden bg-muted">
                      {image && (
                        <img
                          src={image}
                          alt={product.node.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {product.node.title}
                      </h3>
                      <div className="flex items-baseline gap-3 mt-3">
                        <span className="text-xl font-bold text-white">
                          {currency}{price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 z-10 transition-all duration-400">
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={cartLoading}
                        className="flex items-center gap-0 group-hover:gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold h-10 w-10 group-hover:w-auto group-hover:px-5 rounded-full shadow-lg transition-all duration-400 justify-center overflow-hidden disabled:opacity-50"
                      >
                        <ShoppingBag className="h-4 w-4 shrink-0" />
                        <span className="max-w-0 group-hover:max-w-[6rem] overflow-hidden whitespace-nowrap transition-all duration-400 opacity-0 group-hover:opacity-100">
                          Add to Cart
                        </span>
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentPage 
                    ? "bg-primary w-6" 
                    : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="h-14 px-10 text-base font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            <Link to="/padel" className="flex items-center gap-3">
              View All Rackets
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-border" />
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Selling Fast — Limited Stock
            </span>
          </div>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-border" />
        </motion.div>
      </div>
    </section>
  );
}
