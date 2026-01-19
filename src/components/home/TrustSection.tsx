import { motion } from "framer-motion";

const stats = [
  { value: "50K+", label: "Players Worldwide" },
  { value: "4.6", label: "Amazon Rating" },
  { value: "30+", label: "Countries" },
  { value: "1 Year", label: "Warranty" },
];

const testimonials = [
  {
    quote: "The control is incredible. Best padel racket I've ever owned.",
    author: "Marco R.",
    location: "Spain",
  },
  {
    quote: "Perfect for building confidence. Very forgiving for beginners.",
    author: "Sarah L.",
    location: "California",
  },
];

export function TrustSection() {
  return (
    <section className="py-32 md:py-40 bg-surface">
      <div className="container mx-auto px-4">
        {/* Stats - horizontal line layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-between items-center gap-8 mb-32 pb-16 border-b border-border"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center flex-1 min-w-[120px]"
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-display text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials - asymmetrical layout */}
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              What Players Say
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-display text-foreground">
              Trusted by
              <br />
              <span className="text-muted-foreground">Players</span>
            </h2>
          </motion.div>
          
          <div className="lg:col-span-7 lg:col-start-6 space-y-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="border-l-2 border-border pl-8"
              >
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span className="font-medium text-foreground">{testimonial.author}</span>
                  <span>•</span>
                  <span>{testimonial.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
