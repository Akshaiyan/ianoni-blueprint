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

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">{currency}{price.toFixed(2)}</span>
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
