import { useParams, Link } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Check, ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw, ZoomIn, Package, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ui/ProductCard";
import { ImageLightbox } from "@/components/product/ImageLightbox";
import { useShopifyProduct, useShopifyProducts, getCurrencySymbol } from "@/hooks/useShopifyProducts";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/stores/cartStore";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useShopifyProduct(slug);
  const { data: allProducts } = useShopifyProducts();
  const { toast } = useToast();
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setSelectedImage(0);
  }, [slug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const galleryImages = product.images.edges.map(e => e.node.url);
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = getCurrencySymbol(product.priceRange.minVariantPrice.currencyCode);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const originalPrice = compareAtPrice && compareAtPrice > price ? compareAtPrice : Math.ceil(price * 1.25) - 0.01;
  const selectedVariant = product.variants.edges[0]?.node;
  const isStarterKit = product.productType === 'Starter Kit';
  const isRacket = product.productType === 'Racket';
  const categoryPath = isStarterKit ? 'accessories' : 'padel';

  // Parse description for features (from body_html or description)
  const description = product.description;

  const relatedProducts = (allProducts || [])
    .filter(p => p.node.productType === product.productType && p.node.handle !== product.handle)
    .slice(0, 4);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleExpressCheckout = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    const checkoutUrl = useCartStore.getState().getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: description,
          url: window.location.href,
        });
      } catch {
        // cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link has been copied to clipboard.",
      });
    }
  };

  return (
    <Layout>
      <div className="pt-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/${categoryPath}`} className="hover:text-primary capitalize">
              {product.productType || 'Products'}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div
                className="aspect-square rounded-3xl bg-white flex items-center justify-center relative overflow-hidden p-8 cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  src={galleryImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-4 right-4 p-2 rounded-full bg-foreground/10 backdrop-blur-sm text-foreground/60">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
              
              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl bg-white flex items-center justify-center cursor-pointer transition-all overflow-hidden p-1.5 ${
                        selectedImage === i ? "ring-2 ring-primary" : "hover:ring-2 ring-primary/50"
                      }`}
                    >
                      <img src={img} alt={`${product.title} view ${i + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">{currency}{price.toFixed(2)}</span>
                <span className="text-xl text-muted-foreground line-through">{currency}{originalPrice.toFixed(2)}</span>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {description}
              </p>

              <Separator />

              {/* What's Included */}
              {(isRacket || isStarterKit) && (
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    What's Included
                  </h3>
                  <div className="bg-primary/5 rounded-xl p-4 space-y-2">
                    {isStarterKit ? (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span>Padel racket</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span>3 premium IANONI balls</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span>IANONI carry bag</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span>1× {product.title} padel racket</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0" />
                          <span>IANONI carry bag</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={cartLoading || !selectedVariant}>
                    {cartLoading ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <ShoppingBag className="mr-2 h-5 w-5" />
                    )}
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="relative flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">or express checkout</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleExpressCheckout}
                    disabled={cartLoading || !selectedVariant}
                    className="flex items-center justify-center gap-2 h-14 rounded-full border border-border bg-background hover:bg-muted transition-colors disabled:opacity-50 px-6"
                  >
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="font-semibold text-lg">Pay</span>
                  </button>
                  <button
                    onClick={handleExpressCheckout}
                    disabled={cartLoading || !selectedVariant}
                    className="flex items-center justify-center h-14 rounded-full border border-border bg-background hover:bg-muted transition-colors disabled:opacity-50 px-6"
                  >
                    <svg viewBox="8 6 58 18" className="h-5 w-auto" fill="none">
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

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">1 Year Warranty</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">30-Day Returns</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="py-12 border-t">
              <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <ImageLightbox
        images={galleryImages}
        initialIndex={selectedImage}
        productName={product.title}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </Layout>
  );
}
