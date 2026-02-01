import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getBestSellers } from "@/data/products";
import { Button } from "@/components/ui/button";

export function BestSellers() {
  const [currentPage, setCurrentPage] = useState(0);
  const bestSellers = getBestSellers();
  
  // Show 3 products per page
  const productsPerPage = 3;
  const totalPages = Math.ceil(bestSellers.length / productsPerPage);
  const currentProducts = bestSellers.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] tracking-[0.3em] uppercase font-semibold">
                ★ Top Rated
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[0.9]">
              Best Sellers
            </h2>
            <p className="text-muted-foreground text-sm mt-3 max-w-md">
              Our most-loved rackets, backed by thousands of 5-star reviews.
            </p>
          </motion.div>

          {/* Navigation arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-sm text-muted-foreground font-medium min-w-[60px] text-center">
              {currentPage + 1} / {totalPages}
            </div>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Next products"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* Product Grid - 3 equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/product/${product.slug}`}
                className="group block relative overflow-hidden"
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl h-[400px] md:h-[450px]">
                  {/* Image */}
                  <div className="absolute inset-0 overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={`${product.name} ${product.colorVariant}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-semibold shadow-lg">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary text-sm">★</span>
                      <span className="text-white/70 text-xs font-medium">{product.rating}</span>
                      <span className="text-white/40 text-xs">({product.reviewCount} reviews)</span>
                    </div>

                    {/* Product name & variant */}
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    {product.colorVariant && (
                      <p className="text-white/60 text-sm mt-1">{product.colorVariant}</p>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mt-3">
                      <span className="text-xl font-bold text-white">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-white/40 line-through text-sm">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentPage 
                  ? "bg-primary w-6" 
                  : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>

        {/* View All Button - Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="h-14 px-10 text-base font-semibold rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            <Link to="/padel" className="flex items-center gap-3">
              View All Rackets
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        {/* Urgency indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-border" />
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Selling Fast — Limited Stock
            </span>
          </div>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-border" />
        </motion.div>
      </div>
    </section>
  );
}