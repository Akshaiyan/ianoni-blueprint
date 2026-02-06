import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Shield, Truck, RotateCcw } from "lucide-react";

const stats = [
  { value: "4.8", suffix: "★", label: "Amazon Rating", sublabel: "2,400+ reviews" },
  { value: "50K", suffix: "+", label: "Happy Players", sublabel: "Worldwide" },
  { value: "30", suffix: "+", label: "Countries", sublabel: "Global reach" },
];

const badges = [
  { icon: Shield, label: "Secure Checkout", sublabel: "SSL Encrypted" },
  { icon: Truck, label: "Next Day Shipping", sublabel: "Fast delivery" },
  { icon: RotateCcw, label: "30-Day Returns", sublabel: "Hassle-free" },
];

const testimonials = [
  {
    quote: "The control is incredible. Best padel racket I've ever owned.",
    author: "Marco R.",
    location: "Barcelona",
    rating: 5,
  },
  {
    quote: "Perfect for building confidence. Very forgiving for beginners.",
    author: "Sarah L.",
    location: "San Diego",
    rating: 5,
  },
  {
    quote: "Excellent quality. My whole club now plays with IANONI.",
    author: "James T.",
    location: "London",
    rating: 5,
  },
];

// Featured quote - larger, more impactful
const featuredQuote = {
  quote: "This racket changed my game completely. The power transfer is unlike anything I've experienced.",
  author: "Carlos M.",
  title: "Semi-Pro Player",
  location: "Madrid, Spain",
};

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const statScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const quoteX = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-12"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
            By The Numbers
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        {/* Stats - Editorial treatment */}
        <motion.div
          style={{ scale: statScale }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="relative text-center group"
            >
              <div className="relative inline-block">
                <span className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] font-black text-hero text-foreground leading-none">
                  {stat.value}
                </span>
                <span className="absolute -top-1 -right-3 md:-right-6 text-2xl md:text-4xl font-bold text-primary">
                  {stat.suffix}
                </span>
              </div>
              <div className="mt-3 md:mt-4">
                <p className="text-xs md:text-sm font-medium text-foreground">
                  {stat.label}
                </p>
                <p className="text-[9px] md:text-xs tracking-widest uppercase text-muted-foreground mt-1">
                  {stat.sublabel}
                </p>
              </div>
              {index < stats.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 md:h-24 bg-border hidden md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-muted/30 border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-foreground">{badge.label}</p>
                <p className="text-[9px] tracking-wider uppercase text-muted-foreground">
                  {badge.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials - Creative editorial layout */}
        <div className="relative">
          {/* Large pull quote - magazine style */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative mb-16"
          >
            {/* Giant quotation mark */}
            <motion.span 
              style={{ x: quoteX }}
              className="absolute -top-8 md:-top-12 -left-2 md:left-0 text-[150px] md:text-[250px] font-serif text-primary/10 leading-none select-none pointer-events-none"
            >
              "
            </motion.span>
            
            <div className="relative grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <motion.blockquote
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight"
                >
                  {featuredQuote.quote}
                </motion.blockquote>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-4"
              >
                <div className="flex items-center gap-4 lg:justify-end">
                  <div className="w-px h-12 bg-primary hidden lg:block" />
                  <div className="lg:text-right">
                    <p className="font-semibold text-foreground">{featuredQuote.author}</p>
                    <p className="text-sm text-primary">{featuredQuote.title}</p>
                    <p className="text-xs text-muted-foreground">{featuredQuote.location}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Horizontal scrolling testimonials strip */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                More Reviews
              </span>
              <div className="h-px flex-1 bg-border" />
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                ))}
              </div>
            </motion.div>

            {/* Testimonial cards - horizontal strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative p-6 h-full border-l-2 border-border group-hover:border-primary transition-colors duration-300 bg-gradient-to-r from-muted/20 to-transparent">
                    {/* Index number */}
                    <span className="absolute top-0 right-0 text-4xl font-black text-foreground/[0.03]">
                      0{index + 1}
                    </span>

                    {/* Stars inline */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-foreground text-sm leading-relaxed mb-4">
                      "{testimonial.quote}"
                    </p>

                    {/* Author - compact */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground text-sm">{testimonial.author}</span>
                        <span className="text-muted-foreground text-xs">·</span>
                        <span className="text-muted-foreground text-xs">{testimonial.location}</span>
                      </div>
                      <span className="text-[8px] tracking-widest uppercase text-primary">
                        Verified
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
