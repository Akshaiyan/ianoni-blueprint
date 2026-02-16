import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2, Package, Dumbbell, Loader2, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, isLoading, isSyncing, getCheckoutUrl } = useCartStore();
  const itemCount = useCartStore(state => state.itemCount)();
  const total = useCartStore(state => state.total)();

  const currencyCode = items[0]?.price.currencyCode || 'GBP';
  const currency = currencyCode === 'GBP' ? '£' : currencyCode === 'USD' ? '$' : currencyCode === 'EUR' ? '€' : currencyCode;

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="pt-24 min-h-screen">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Looks like you haven't added anything to your cart yet. Browse our collection and find the perfect racket for your game.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/padel">
                    <Dumbbell className="mr-2 h-5 w-5" />
                    Shop Padel Rackets
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/accessories">
                    <Package className="mr-2 h-5 w-5" />
                    Shop Starter Kits & Accessories
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              Your Cart <span className="text-muted-foreground text-xl font-normal">({itemCount} items)</span>
            </h1>
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">
              Clear all
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-1">
              <AnimatePresence mode="popLayout">
                {items.map((item) => {
                  const itemPrice = parseFloat(item.price.amount);
                  return (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 md:gap-6 py-6 border-b border-border"
                    >
                      <Link to={`/product/${item.display.handle}`} className="shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-muted flex items-center justify-center p-2 overflow-hidden">
                          {item.display.imageUrl && (
                            <img
                              src={item.display.imageUrl}
                              alt={item.display.title}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.display.handle}`} className="hover:text-primary transition-colors">
                          <h3 className="font-semibold text-base md:text-lg truncate">{item.display.title}</h3>
                        </Link>
                        {item.variantTitle !== 'Default Title' && (
                          <p className="text-sm text-muted-foreground">{item.variantTitle}</p>
                        )}
                        <p className="text-lg font-bold mt-2">{currency}{itemPrice.toFixed(2)}</p>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              disabled={isLoading}
                              className="p-2 hover:bg-muted transition-colors rounded-l-lg disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 text-sm font-medium min-w-[2.5rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              disabled={isLoading}
                              className="p-2 hover:bg-muted transition-colors rounded-r-lg disabled:opacity-50"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            disabled={isLoading}
                            className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-bold">{currency}{(itemPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-muted/50 rounded-2xl p-6 sticky top-28">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6" 
                  size="lg" 
                  onClick={handleCheckout}
                  disabled={isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <ExternalLink className="mr-2 h-5 w-5" />
                  )}
                  Checkout
                </Button>
                <Button variant="ghost" className="w-full mt-2" asChild>
                  <Link to="/padel">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
