import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Star, Check, ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProductBySlug, products } from "@/data/products";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : null;

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

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="pt-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/${product.category}`} className="hover:text-primary capitalize">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden p-8">
                {product.badge && (
                  <Badge className="absolute top-6 left-6 text-sm z-10">{product.badge}</Badge>
                )}
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={product.gallery?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Thumbnails from gallery */}
              <div className="grid grid-cols-4 gap-4">
                {(product.gallery || [product.image]).slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-muted flex items-center justify-center cursor-pointer hover:ring-2 ring-primary transition-all overflow-hidden p-2"
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Name */}
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <Badge variant="destructive">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              <Separator />

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specs */}
              {Object.keys(product.specs).length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="bg-muted rounded-lg p-3">
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Actions */}
              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
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
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}