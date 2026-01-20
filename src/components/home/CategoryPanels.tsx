import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import pr8100Hero from "@/assets/products/pr8100-hero.jpg";
import pr8100RedBlack from "@/assets/products/pr8100-red-black.jpg";
import pr8100BluePink from "@/assets/products/pr8100-blue-pink.jpg";
import pr8100Grip from "@/assets/products/pr8100-grip.jpg";

const categories = [
  {
    id: "padel",
    title: "Padel",
    subtitle: "Rackets",
    description: "Carbon fiber precision",
    image: pr8100Hero,
    href: "/padel",
    stat: "12",
    statLabel: "models",
  },
  {
    id: "pickleball",
    title: "Pickleball",
    subtitle: "Rackets",
    description: "Power meets control",
    image: pr8100RedBlack,
    href: "/pickleball",
    stat: "8",
    statLabel: "models",
  },
  {
    id: "accessories",
    title: "Accessories",
    subtitle: "& Gear",
    description: "Bags, grips & more",
    image: pr8100Grip,
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
    href: "/guide",
    stat: "3",
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

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
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
        {/* Editorial section intro */}
        <div className="mb-20">
          {/* Floating micro label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-16 bg-primary" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-medium">
              Collection Index
            </span>
            <span className="text-[10px] text-muted-foreground">—</span>
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
              04 Categories
            </span>
          </motion.div>

          {/* Oversized typography with grid break */}
          <div className="grid lg:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <h2 className="text-6xl md:text-8xl lg:text-[120px] font-black text-hero leading-[0.85] text-foreground">
                Shop
                <br />
                <span className="text-outline text-foreground">by</span>{" "}
                <span className="text-primary">Category</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 flex flex-col justify-end"
            >
              <p className="text-muted-foreground leading-relaxed mb-4">
                Curated equipment for every level. From competition-grade rackets to essential accessories.
              </p>
              {/* HUD-style element */}
              <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase text-muted-foreground/60">
                <span className="w-2 h-2 border border-primary rounded-full" />
                <span>Scroll to explore</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large hero tile - dramatic crop */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-12 lg:col-span-7 row-span-2"
          >
            <Link
              to={categories[0].href}
              className="group block relative h-[500px] md:h-[600px] overflow-hidden"
            >
              {/* Image with zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={categories[0].image}
                  alt={categories[0].title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ objectPosition: "50% 30%" }}
                />
              </div>

              {/* Cinematic overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

              {/* Tech overlay elements */}
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-medium">
                  Featured
                </span>
              </div>

              {/* Alignment guides - HUD style */}
              <div className="absolute top-6 right-6 text-[9px] font-mono text-white/20">
                01
              </div>
              <div className="absolute top-6 right-6 w-8 h-8 border border-white/10" />

              {/* Content - asymmetric placement */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                {/* Stat badge - glass */}
                <div className="inline-flex items-baseline gap-1 mb-6 glass-dark px-4 py-2 rounded-full">
                  <span className="text-2xl font-bold text-white">{categories[0].stat}</span>
                  <span className="text-[10px] tracking-widest uppercase text-white/60">
                    {categories[0].statLabel}
                  </span>
                </div>

                {/* Typography stack */}
                <div className="mb-4">
                  <h3 className="text-5xl md:text-7xl font-black text-white text-hero leading-[0.9]">
                    {categories[0].title}
                  </h3>
                  <span className="text-3xl md:text-4xl font-light text-white/40 -mt-1 block">
                    {categories[0].subtitle}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white/50 text-sm max-w-[200px]">
                    {categories[0].description}
                  </p>
                  <div className="flex items-center gap-3 text-white group-hover:text-primary transition-colors duration-300">
                    <span className="text-[10px] tracking-[0.3em] uppercase font-medium">
                      Explore
                    </span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
            </Link>
          </motion.div>

          {/* Right column - stacked tiles with asymmetric sizing */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
            {categories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
                className={index === 0 ? "col-span-2 lg:col-span-1" : "col-span-1"}
              >
                <Link
                  to={category.href}
                  className="group block relative h-[180px] lg:h-[180px] overflow-hidden"
                >
                  {/* Diagonal crop effect via skew container */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ objectPosition: index === 0 ? "center" : "center 40%" }}
                    />
                  </div>

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

                  {/* HUD corner */}
                  <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20">
                    0{index + 2}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex items-end p-5">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {category.title}
                        </h3>
                        <span className="text-sm font-light text-white/40">
                          {category.subtitle}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs hidden sm:block">
                        {category.description}
                      </p>
                    </div>

                    {/* Stat pill */}
                    <div className="flex items-baseline gap-1 text-white/60">
                      <span className="text-lg font-bold text-primary">{category.stat}</span>
                      <span className="text-[9px] tracking-wider uppercase">{category.statLabel}</span>
                    </div>
                  </div>

                  {/* Hover line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
