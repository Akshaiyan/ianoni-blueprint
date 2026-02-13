import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Minus, Plus, Trash2, Package, Dumbbell, Loader2, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cartStore";
import { getCurrencySymbol } from "@/hooks/useShopifyProducts";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, isLoading, isSyncing, getCheckoutUrl } = useCartStore();
  const itemCount = useCartStore(state => state.itemCount)();
  const total = useCartStore(state => state.total)();

  const currencyCode = items[0]?.price.currencyCode || 'GBP';
  const currency = getCurrencySymbol(currencyCode);

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
                  const image = item.product.node.images?.edges?.[0]?.node.url;
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
                      <Link to={`/product/${item.product.node.handle}`} className="shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-muted flex items-center justify-center p-2 overflow-hidden">
                          {image && (
                            <img
                              src={image}
                              alt={item.product.node.title}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.product.node.handle}`} className="hover:text-primary transition-colors">
                          <h3 className="font-semibold text-base md:text-lg truncate">{item.product.node.title}</h3>
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
                {/* Express Checkout */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">Express checkout</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading || isSyncing}
                      className="flex items-center justify-center gap-2 h-12 rounded-full border border-border bg-background hover:bg-muted transition-colors disabled:opacity-50"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                      </svg>
                      <span className="font-medium text-sm">Pay</span>
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading || isSyncing}
                      className="flex items-center justify-center h-12 rounded-full border border-border bg-[#FFC439] hover:bg-[#f0b72e] transition-colors disabled:opacity-50"
                    >
                      <svg viewBox="0 0 101 32" className="h-5" fill="none">
                        <path d="M12.237 9.821h-3.843c-.263 0-.487.191-.528.45l-1.554 9.855a.316.316 0 00.313.366h1.838a.536.536 0 00.529-.45l.44-2.795a.536.536 0 01.529-.45h1.22c2.54 0 4.006-1.229 4.388-3.664.172-1.066.007-1.903-.49-2.49-.546-.645-1.514-.972-2.842-.972zm.445 3.61c-.211 1.384-1.269 1.384-2.291 1.384h-.582l.408-2.585a.32.32 0 01.317-.271h.267c.697 0 1.355 0 1.694.397.203.237.264.59.187 1.074z" fill="#253B80"/>
                        <path d="M26.492 13.388h-1.843a.32.32 0 00-.317.271l-.081.514-.129-.187c-.4-.58-1.291-.774-2.18-.774-2.039 0-3.779 1.544-4.118 3.712-.176 1.082.074 2.117.687 2.837.563.662 1.366.938 2.322.938 1.642 0 2.552-1.055 2.552-1.055l-.082.512a.316.316 0 00.313.366h1.659a.536.536 0 00.529-.45l.995-6.318a.316.316 0 00-.307-.366zm-2.57 3.59c-.178 1.054-1.015 1.762-2.083 1.762-.536 0-.965-.172-1.24-.498-.273-.324-.376-.785-.29-1.298.166-1.046 1.017-1.777 2.069-1.777.525 0 .952.174 1.233.502.283.331.394.795.312 1.31z" fill="#253B80"/>
                        <path d="M38.087 13.388h-1.852a.534.534 0 00-.441.234l-2.547 3.752-1.08-3.607a.536.536 0 00-.513-.379h-1.82a.317.317 0 00-.3.422l2.034 5.972-1.913 2.7a.316.316 0 00.259.5h1.85a.533.533 0 00.438-.23l6.143-8.868a.316.316 0 00-.258-.496z" fill="#253B80"/>
                        <path d="M47.37 9.821h-3.843c-.263 0-.487.191-.528.45l-1.554 9.855a.316.316 0 00.312.366h1.974a.375.375 0 00.37-.315l.441-2.793a.536.536 0 01.529-.45h1.22c2.54 0 4.006-1.229 4.388-3.664.172-1.066.007-1.903-.49-2.49-.547-.645-1.515-.972-2.843-.972zm.446 3.61c-.211 1.384-1.269 1.384-2.292 1.384h-.582l.409-2.585a.32.32 0 01.316-.271h.267c.697 0 1.355 0 1.694.397.203.237.264.59.188 1.074z" fill="#179BD7"/>
                        <path d="M61.624 13.388h-1.842a.32.32 0 00-.317.271l-.081.514-.129-.187c-.4-.58-1.291-.774-2.18-.774-2.04 0-3.779 1.544-4.118 3.712-.176 1.082.074 2.117.686 2.837.564.662 1.367.938 2.323.938 1.642 0 2.552-1.055 2.552-1.055l-.083.512a.316.316 0 00.313.366h1.66a.536.536 0 00.528-.45l.996-6.318a.316.316 0 00-.308-.366zm-2.57 3.59c-.178 1.054-1.015 1.762-2.083 1.762-.536 0-.965-.172-1.24-.498-.273-.324-.376-.785-.29-1.298.166-1.046 1.017-1.777 2.069-1.777.525 0 .952.174 1.233.502.282.331.393.795.311 1.31z" fill="#179BD7"/>
                        <path d="M64.063 10.085l-1.576 10.041a.316.316 0 00.312.366h1.588a.536.536 0 00.529-.45l1.554-9.855a.316.316 0 00-.312-.366h-1.782a.32.32 0 00-.313.264z" fill="#179BD7"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <Separator className="mb-5" />

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
