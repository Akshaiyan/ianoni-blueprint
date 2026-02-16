import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ui/ProductCard";
import { products, getPadelRackets, type Product } from "@/data/products";

const categoryInfo: Record<string, { title: string; description: string; emoji: string; filter: (p: Product) => boolean }> = {
  padel: {
    title: "Padel Rackets",
    description: "Premium carbon fiber padel rackets designed for players of all skill levels",
    emoji: "🎾",
    filter: (p) => p.category === "padel" && !p.isStarterKit,
  },
  accessories: {
    title: "Starter Kits & Accessories",
    description: "Curated bundles, premium balls, and everything you need",
    emoji: "🎾",
    filter: (p) => p.isStarterKit || p.isBallType || false,
  },
};

export default function CollectionPage() {
  const { category: paramCategory } = useParams<{ category: string }>();
  
  const pathname = window.location.pathname;
  const category = paramCategory || (pathname === "/padel" ? "padel" : pathname === "/accessories" ? "accessories" : null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);
  
  const info = category ? categoryInfo[category] : null;

  const displayProducts = useMemo(() => {
    if (!info) return [];
    
    const filtered = products.filter(info.filter);

    if (category === "padel") {
      // Shuffle rackets, then append starter kits
      const rackets = [...filtered];
      for (let i = rackets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rackets[i], rackets[j]] = [rackets[j], rackets[i]];
      }
      const starterKits = products.filter(p => p.isStarterKit);
      return [...rackets, ...starterKits];
    }
    
    if (category === "accessories") {
      // Balls first, then starter kits
      return [...filtered].sort((a, b) => {
        const aIsBall = a.isBallType ? 0 : 1;
        const bIsBall = b.isBallType ? 0 : 1;
        return aIsBall - bIsBall;
      });
    }
    
    return filtered;
  }, [info, category]);

  if (!info) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Category not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-28 pb-12 bg-gradient-to-br from-surface to-background">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{info.title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center gap-6"
          >
            <div className="text-6xl">{info.emoji}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{info.title}</h1>
              <p className="text-muted-foreground text-lg">{info.description}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{displayProducts.length}</span> products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {displayProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {displayProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
