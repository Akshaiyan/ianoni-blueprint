import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Package, Star, ShoppingBag } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getProductsByCategory } from "@/data/products";

const starterKits = [
  {
    id: "kit-beginner",
    name: "Beginner Starter Kit",
    description: "Everything you need to get started with padel. Includes a beginner-friendly racket, 3 premium balls, and a carry bag.",
    price: 129.99,
    originalPrice: 179.99,
    badge: "Most Popular",
    includes: ["1× PR8100 Racket", "3× IANONI Padel Balls", "1× Carry Bag", "1× Overgrip Pack"],
  },
  {
    id: "kit-intermediate",
    name: "Performance Kit",
    description: "Level up your game with a performance racket and pro accessories for competitive play.",
    price: 199.99,
    originalPrice: 259.99,
    badge: "Best Value",
    includes: ["1× PR8200 Racket", "6× IANONI Padel Balls", "1× Premium Bag", "2× Overgrip Packs", "1× Wristband Set"],
  },
  {
    id: "kit-doubles",
    name: "Doubles Starter Kit",
    description: "Grab a friend and hit the court. Two rackets, balls, and accessories — everything for your first doubles match.",
    price: 249.99,
    originalPrice: 349.99,
    badge: "Save $100",
    includes: ["2× PR8100 Rackets", "6× IANONI Padel Balls", "2× Carry Bags", "2× Overgrip Packs"],
  },
  {
    id: "kit-pro",
    name: "Pro Bundle",
    description: "The ultimate setup for serious players. Top-tier racket, tournament balls, premium bag, and all the extras.",
    price: 299.99,
    originalPrice: 399.99,
    badge: "Premium",
    includes: ["1× PR8200 Pro Racket", "12× Tournament Balls", "1× Pro Bag", "3× Pro Overgrips", "1× Dampener Set", "1× Wristband Set"],
  },
];

export default function StarterKitsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  const { addItem } = useCart();

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-surface to-background">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Starter Kits</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center gap-6"
          >
            <div className="text-6xl"><Package className="h-14 w-14 text-primary" /></div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Starter Kits</h1>
              <p className="text-muted-foreground text-lg">
                Curated bundles to get you on the court — save more when you buy together.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kits Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {starterKits.map((kit, index) => (
              <motion.div
                key={kit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-500"
              >
                {kit.badge && (
                  <Badge className="absolute top-6 right-6">{kit.badge}</Badge>
                )}

                <h3 className="text-2xl font-bold mb-2">{kit.name}</h3>
                <p className="text-muted-foreground mb-6">{kit.description}</p>

                {/* What's included */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-foreground mb-3">What's Included:</p>
                  <ul className="space-y-2">
                    {kit.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold">${kit.price.toFixed(2)}</span>
                    {kit.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${kit.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() =>
                      toast({
                        title: "Coming Soon",
                        description: `${kit.name} will be available shortly.`,
                      })
                    }
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
