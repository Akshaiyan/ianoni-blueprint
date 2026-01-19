import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "padel",
    title: "Padel",
    subtitle: "Rackets",
    description: "Carbon fiber precision",
    image: "🎾",
    href: "/padel",
  },
  {
    id: "accessories",
    title: "Accessories",
    subtitle: "& Gear",
    description: "Complete your setup",
    image: "🎒",
    href: "/accessories",
  },
];

export function CategoryPanels() {
  return (
    <section className="py-0">
      {/* Editorial lookbook panels - tall and dramatic */}
      <div className="grid md:grid-cols-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative"
          >
            <Link to={category.href} className="group block relative h-[70vh] md:h-[80vh] overflow-hidden">
              {/* Background - warm light tones */}
              <div className="absolute inset-0 bg-muted">
                {/* Placeholder image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    className="text-[15rem] opacity-30 select-none img-zoom"
                  >
                    {category.image}
                  </motion.span>
                </div>
                
                {/* Gradient overlay at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              </div>
              
              {/* Content - positioned at bottom with breathing room */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {/* Large editorial title */}
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-display text-foreground mb-1">
                    {category.title}
                  </h2>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-display text-muted-foreground/50 mb-4">
                    {category.subtitle}
                  </h3>
                  
                  {/* Subtle description */}
                  <p className="text-muted-foreground text-sm tracking-wide mb-6 max-w-xs">
                    {category.description}
                  </p>
                  
                  {/* Underline CTA */}
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="text-sm uppercase tracking-[0.2em] underline-reveal">
                      Explore
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                  </div>
                </motion.div>
              </div>
              
              {/* Hover state - subtle warm overlay */}
              <div className="absolute inset-0 bg-primary/0 transition-colors duration-700 group-hover:bg-primary/5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
