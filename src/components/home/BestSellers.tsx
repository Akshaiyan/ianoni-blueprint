import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export function BestSellers() {
  // Get first 4 products as best sellers
  const bestSellers = products.slice(0, 4);

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
              Top Rated on Amazon
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-display text-foreground">
              Best Sellers
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link 
              to="/padel" 
              className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            >
              <span className="text-sm font-medium uppercase tracking-[0.15em]">
                View All Products
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* "Selling fast" urgency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Best sellers are selling fast — don't miss out!
          </span>
        </motion.div>
      </div>
    </section>
  );
}
