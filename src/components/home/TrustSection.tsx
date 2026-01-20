import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Shield, Truck, RotateCcw, Quote } from "lucide-react";

const stats = [
  { value: "4.6", suffix: "★", label: "Amazon Rating", sublabel: "2,400+ reviews" },
  { value: "50K", suffix: "+", label: "Happy Players", sublabel: "Worldwide" },
  { value: "30", suffix: "+", label: "Countries", sublabel: "Global reach" },
];

const badges = [
  { icon: Shield, label: "Secure Checkout", sublabel: "SSL Encrypted" },
  { icon: Truck, label: "Fast Shipping", sublabel: "2-5 days" },
  { icon: RotateCcw, label: "Easy Returns", sublabel: "30-day guarantee" },
];

const testimonials = [
  {
    quote: "The control is incredible. Best padel racket I've ever owned. Worth every penny invested.",
    author: "Marco R.",
    location: "Barcelona, Spain",
    rating: 5,
    verified: true,
    highlight: "control",
  },
  {
    quote: "Perfect for building confidence. Very forgiving for beginners like me. Highly recommended!",
    author: "Sarah L.",
    location: "San Diego, CA",
    rating: 5,
    verified: true,
    highlight: "confidence",
  },
  {
    quote: "Excellent quality and outstanding customer service. My whole club now plays with IANONI.",
    author: "James T.",
    location: "London, UK",
    rating: 5,
    verified: true,
    highlight: "quality",
  },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const statScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden bg-background">
      {/* Subtle court markings background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] border border-foreground/[0.02] rounded-lg opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 mb-20"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
            By The Numbers
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        {/* Stats - Editorial treatment */}
        <motion.div
          style={{ scale: statScale }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-32"
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
              {/* Giant number - editorial style */}
              <div className="relative inline-block">
                <span className="text-6xl md:text-8xl lg:text-[140px] font-black text-hero text-foreground leading-none">
                  {stat.value}
                </span>
                <span className="absolute -top-2 -right-4 md:-right-8 text-3xl md:text-5xl font-bold text-primary">
                  {stat.suffix}
                </span>
              </div>

              {/* Labels */}
              <div className="mt-4">
                <p className="text-sm md:text-base font-medium text-foreground">
                  {stat.label}
                </p>
                <p className="text-[10px] md:text-xs tracking-widest uppercase text-muted-foreground mt-1">
                  {stat.sublabel}
                </p>
              </div>

              {/* Subtle divider for non-last items */}
              {index < stats.length - 1 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-border hidden md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges - minimal glass style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-32"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex items-center gap-4 px-6 py-4 rounded-full bg-muted/30 border border-border hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <badge.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{badge.label}</p>
                <p className="text-[10px] tracking-wider uppercase text-muted-foreground">
                  {badge.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials - Magazine layout */}
        <div className="relative">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center">
                <Quote className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-primary">
                Player Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-hero text-foreground leading-[0.9]">
              Trusted by
              <br />
              <span className="text-primary">Champions</span>
            </h2>
          </motion.div>

          {/* Testimonial cards - asymmetric grid */}
          <div className="grid md:grid-cols-12 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`relative group ${
                  index === 0 ? "md:col-span-5" : "md:col-span-3 lg:col-span-4"
                } ${index === 2 ? "md:col-start-9 lg:col-start-9" : ""}`}
              >
                <div className="relative p-8 h-full rounded-2xl bg-muted/20 border border-border group-hover:border-primary/20 transition-all duration-500">
                  {/* Quote number */}
                  <span className="absolute top-4 right-4 text-6xl font-black text-foreground/[0.03]">
                    0{index + 1}
                  </span>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  {/* Quote with highlight */}
                  <blockquote className="text-foreground leading-relaxed mb-8 relative z-10">
                    "{testimonial.quote.split(testimonial.highlight).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="text-primary font-medium">{testimonial.highlight}</span>
                        )}
                      </span>
                    ))}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                    {testimonial.verified && (
                      <span className="text-[9px] tracking-widest uppercase text-primary px-3 py-1 rounded-full border border-primary/20">
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
