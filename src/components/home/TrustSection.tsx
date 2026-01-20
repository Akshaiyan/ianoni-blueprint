import { motion } from "framer-motion";
import { Star, Shield, Truck, RotateCcw } from "lucide-react";

const stats = [
  { value: "4.6", suffix: "★", label: "Amazon Rating", sublabel: "2,400+ reviews" },
  { value: "50K", suffix: "+", label: "Happy Players", sublabel: "Worldwide" },
  { value: "30", suffix: "+", label: "Countries", sublabel: "Shipping globally" },
];

const badges = [
  { icon: Shield, label: "Secure Checkout", sublabel: "SSL Encrypted" },
  { icon: Truck, label: "Fast Shipping", sublabel: "2-5 days delivery" },
  { icon: RotateCcw, label: "Easy Returns", sublabel: "30-day guarantee" },
];

const testimonials = [
  {
    quote: "The control is incredible. Best padel racket I've ever owned. Worth every penny!",
    author: "Marco R.",
    location: "Spain",
    rating: 5,
    verified: true,
  },
  {
    quote: "Perfect for building confidence. Very forgiving for beginners like me.",
    author: "Sarah L.",
    location: "California",
    rating: 5,
    verified: true,
  },
  {
    quote: "Excellent quality and the customer service is outstanding. Highly recommend!",
    author: "James T.",
    location: "UK",
    rating: 5,
    verified: true,
  },
];

export function TrustSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-foreground font-medium">{stat.label}</p>
              <p className="text-muted-foreground text-sm">{stat.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20 pb-20 border-b border-border"
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{badge.label}</p>
                <p className="text-sm text-muted-foreground">{badge.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
              Social Proof
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-display text-foreground mb-4">
              Trusted by <span className="text-primary">Champions</span>
            </h2>
            <p className="text-muted-foreground">
              Join thousands of players who've elevated their game with IANONI.
            </p>
          </motion.div>
          
          <div className="lg:col-span-8 grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative p-6 rounded-2xl bg-muted/50 border border-border"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <blockquote className="text-foreground leading-relaxed mb-4">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">{testimonial.author}</p>
                    <p className="text-muted-foreground text-xs">{testimonial.location}</p>
                  </div>
                  {testimonial.verified && (
                    <span className="text-xs text-primary font-medium">✓ Verified</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
