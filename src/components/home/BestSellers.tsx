import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { getBestSellers } from "@/data/products";

export function BestSellers() {
  const bestSellers = getBestSellers();

  return (
    <section className="py-32 md:py-40">
      <div className="container mx-auto px-4">
        {/* Asymmetrical header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              The Collection
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-display text-foreground">
              Best Sellers
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 lg:col-start-9 flex items-end"
          >
            <Link 
              to="/padel" 
              className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-sm uppercase tracking-[0.2em] underline-reveal">
                View All
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>

        {/* Product grid - varied layout for visual interest */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bestSellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
