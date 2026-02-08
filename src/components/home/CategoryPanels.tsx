import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef, useMemo } from "react";
import { getPadelRackets } from "@/data/products";
import balls1Main from "@/assets/products/balls1-main.jpg";
import pr8100BluePink from "@/assets/products/pr8100-blue-pink.jpg";

const categories = [
  {
    id: "accessories",
    title: "Accessories",
    subtitle: "& Gear",
    description: "Bags, grips & more",
    image: balls1Main,
    href: "/accessories",
    stat: "24",
    statLabel: "items",
  },
  {
    id: "beginner",
    title: "Starter",
    subtitle: "Kits",
    description: "Everything to start",
    image: pr8100BluePink,
    href: "/accessories",
    stat: "5",
    statLabel: "bundles",
  },
];

export function CategoryPanels() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Get all 6 racket models
  const rackets = useMemo(() => getPadelRackets(), []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Layered background - court texture at 3% */}
      <div className="absolute inset-0 bg-background">
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 opacity-[0.03]"
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] border border-foreground/50 rounded-lg" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] border-r border-foreground/50" />
        </motion.div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Editorial section intro - tighter */}
        <div className="mb-10 md:mb-14">
          {/* Divider + label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-16 bg-primary" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-medium">
              Shop by Category
            </span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          {/* Heading - more compact */}
          <div className="grid lg:grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-hero leading-[0.9] text-foreground">
                Find Your{" "}
                <span className="text-primary">Gear</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 flex flex-col justify-end"
            >
              <p className="text-muted-foreground leading-relaxed text-sm">
                Curated equipment for every level. From competition-grade rackets to essential accessories.
              </p>
            </motion.div>
          </div>
        </div>

        {/* All 6 Racket Models Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
              Padel Rackets
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              {rackets.length} models
            </span>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {rackets.map((racket, index) => (
              <motion.div
                key={racket.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  to={`/product/${racket.slug}`}
                  className="group block relative aspect-square overflow-hidden rounded-xl bg-gradient-to-b from-muted/50 to-muted"
                >
                  {/* Image - contained to show full racket */}
                  <div className="absolute inset-2 flex items-center justify-center">
                    <img
                      src={racket.image}
                      alt={`${racket.name} ${racket.colorVariant}`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium truncate">{racket.name}</p>
                    <p className="text-white/60 text-[10px] truncate">{racket.colorVariant}</p>
                  </div>
                  
                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Explore All Button - Bigger */}
          <div className="flex justify-center mt-8">
            <Link
              to="/padel"
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
              className="group inline-flex items-center gap-4 px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold text-base transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40"
            >
              Explore All Rackets
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Category tiles - Accessories and Starter Kits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
            >
              <Link
                to={category.href}
                className="group block relative h-[200px] overflow-hidden rounded-xl"
              >
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

                {/* HUD corner */}
                <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20">
                  0{index + 1}
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {category.title}
                      </h3>
                      <span className="text-base font-light text-white/40">
                        {category.subtitle}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm">
                      {category.description}
                    </p>
                  </div>

                  {/* Stat pill */}
                  <div className="flex items-baseline gap-1 text-white/60">
                    <span className="text-xl font-bold text-primary">{category.stat}</span>
                    <span className="text-[10px] tracking-wider uppercase">{category.statLabel}</span>
                  </div>
                </div>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
