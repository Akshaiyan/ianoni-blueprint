import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import { useRef } from "react";
import { products } from "@/data/products";

export function BestSellers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // Get first 4 products as best sellers
  const bestSellers = products.slice(0, 4);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background with depth */}
      <div className="absolute inset-0 bg-muted/30">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                               linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Editorial header - dramatic typography */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            {/* Micro label with accent line */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Flame className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-medium">
                Top Rated on Amazon
              </span>
              <div className="h-px flex-1 bg-border hidden md:block" />
            </div>

            {/* Massive headline */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-hero text-foreground leading-[0.85]">
              Best
              <br />
              <span className="text-outline text-foreground">Sellers</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col justify-end"
          >
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our most-loved rackets, backed by thousands of 5-star reviews. 
              Each one engineered for exceptional performance.
            </p>
            <Link
              to="/padel"
              className="group inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase font-medium">
                View All Products
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>

        {/* Product grid - asymmetric layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`
                ${index === 0 ? "col-span-12 md:col-span-6 lg:col-span-5" : ""}
                ${index === 1 ? "col-span-6 md:col-span-6 lg:col-span-4" : ""}
                ${index === 2 ? "col-span-6 lg:col-span-3" : ""}
                ${index === 3 ? "col-span-12 md:col-span-12 lg:col-span-12" : ""}
              `}
            >
              <Link
                to={`/product/${product.id}`}
                className="group block relative overflow-hidden"
              >
                {/* Card with varying heights */}
                <div className={`
                  relative overflow-hidden rounded-2xl
                  ${index === 0 ? "h-[400px] md:h-[500px]" : ""}
                  ${index === 1 || index === 2 ? "h-[300px] md:h-[400px]" : ""}
                  ${index === 3 ? "h-[200px] md:h-[280px]" : ""}
                `}>
                  {/* Image with zoom */}
                  <div className="absolute inset-0 overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`
                        absolute inset-0 w-full h-full object-cover 
                        transition-transform duration-1000 group-hover:scale-110
                        ${index === 3 ? "object-[center_40%]" : ""}
                      `}
                    />
                  </div>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  {index === 3 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  )}

                  {/* HUD elements */}
                  <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20">
                    0{index + 1}
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="glass-dark px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase text-white">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <div className={`
                    absolute bottom-0 left-0 right-0 p-6 md:p-8
                    ${index === 3 ? "flex items-end justify-between" : ""}
                  `}>
                    <div className={index === 3 ? "flex-1" : ""}>
                      {/* Rating micro element */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-primary text-sm">★</span>
                        <span className="text-white/60 text-xs">{product.rating}</span>
                        <span className="text-white/30 text-xs">({product.reviewCount})</span>
                      </div>

                      {/* Product name */}
                      <h3 className={`
                        font-bold text-white group-hover:text-primary transition-colors duration-300
                        ${index === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}
                        ${index === 3 ? "text-xl md:text-2xl" : ""}
                      `}>
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className={`font-bold text-white ${index === 0 ? "text-2xl" : "text-lg"}`}>
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-white/40 line-through text-sm">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA for horizontal card */}
                    {index === 3 && (
                      <div className="flex items-center gap-3 text-white group-hover:text-primary transition-colors">
                        <span className="text-[10px] tracking-[0.3em] uppercase font-medium hidden md:block">
                          View Details
                        </span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
                      </div>
                    )}
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Urgency indicator - editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-6"
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
