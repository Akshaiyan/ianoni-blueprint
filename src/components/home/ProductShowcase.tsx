import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import pr8100RedBlack from "@/assets/products/pr8100-red-black.jpg";
import pr8100BluePink from "@/assets/products/pr8100-blue-pink.jpg";

const showcaseProducts = [
  {
    id: "pr8100-red-black",
    name: "PR8100",
    tagline: "Power Redefined",
    color: "Red/Black",
    image: pr8100RedBlack,
    feature: "3-Layer Carbon Fiber",
    price: "$159.99",
  },
  {
    id: "pr8100-blue-pink",
    name: "PR8100",
    tagline: "Style Meets Precision",
    color: "Blue/Pink",
    image: pr8100BluePink,
    feature: "Energy Transfer System",
    price: "$159.99",
  },
];

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative bg-cinema py-24 md:py-32 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(14_84%_53%/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(14_84%_53%/0.1),transparent_50%)]" />
      </div>

      {/* Section header */}
      <div className="container mx-auto px-4 md:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            The Collection
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white text-display mb-6">
            Engineered for{" "}
            <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-white/60 text-lg">
            Each racket is a testament to precision engineering. Scroll to explore.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll showcase */}
      <div className="relative">
        <div className="flex gap-8 px-4 md:px-8 overflow-x-auto scroll-snap-x pb-8 scrollbar-hide">
          {showcaseProducts.map((product, index) => (
            <ProductShowcaseCard
              key={product.id}
              product={product}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
          
          {/* View all card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0 w-[350px] md:w-[500px] h-[600px] md:h-[700px] rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center scroll-snap-center"
          >
            <Link to="/padel" className="text-center group">
              <div className="w-20 h-20 rounded-full border-2 border-white/20 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500 flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="h-8 w-8 text-white/60 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-white text-xl font-medium mb-2">View All</p>
              <p className="text-white/40 text-sm">Explore the full collection</p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ProductShowcaseCardProps {
  product: typeof showcaseProducts[0];
  index: number;
  scrollProgress: any;
}

function ProductShowcaseCard({ product, index }: ProductShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [15, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="flex-shrink-0 w-[350px] md:w-[500px] scroll-snap-center"
    >
      <Link to={`/product/${product.id}`} className="block group">
        <motion.div
          style={{ rotateY }}
          className="relative h-[600px] md:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-white/5 border border-white/10"
        >
          {/* Product image - large and prominent */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          </div>

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <p className="text-primary text-sm font-medium tracking-wider uppercase mb-2">
                {product.feature}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                {product.name}
              </h3>
              <p className="text-white/60 text-lg mb-4">{product.color}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold text-white">{product.price}</span>
                <div className="flex items-center gap-2 text-white/60 group-hover:text-primary transition-colors">
                  <span className="text-sm">Explore</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
