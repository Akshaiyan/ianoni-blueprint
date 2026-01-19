import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { getProductsByCategory, products as allProducts } from "@/data/products";

const categoryInfo: Record<string, { title: string; description: string; emoji: string }> = {
  padel: {
    title: "Padel Rackets",
    description: "Premium carbon fiber padel rackets designed for players of all skill levels",
    emoji: "🎾",
  },
  pickleball: {
    title: "Pickleball Paddles",
    description: "Precision-engineered paddles for optimal control and power",
    emoji: "🏓",
  },
  accessories: {
    title: "Accessories & Bags",
    description: "Complete your setup with premium bags, grips, and accessories",
    emoji: "🎒",
  },
};

export default function CollectionPage() {
  const { category } = useParams<{ category: string }>();
  const info = category ? categoryInfo[category] : null;
  const products = category ? getProductsByCategory(category) : allProducts;

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
      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-surface to-background">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
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

      {/* Filters & Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{products.length}</span> products
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}