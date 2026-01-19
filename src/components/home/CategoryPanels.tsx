import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import pr8100Hero from "@/assets/products/pr8100-hero.jpg";
import pr8100RedBlack from "@/assets/products/pr8100-red-black.jpg";

const categories = [
  {
    id: "padel",
    title: "Padel",
    subtitle: "Rackets",
    description: "Carbon fiber precision engineered for dominance",
    image: pr8100Hero,
    href: "/padel",
  },
  {
    id: "accessories",
    title: "Complete",
    subtitle: "Your Game",
    description: "Bags, grips, balls & everything you need",
    image: pr8100RedBlack,
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
            <Link to={category.href} className="group block relative h-[70vh] md:h-[85vh] overflow-hidden">
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover img-zoom"
                />
                
                {/* Dramatic dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
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
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-display text-white mb-1">
                    {category.title}
                  </h2>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-display text-white/40 mb-4">
                    {category.subtitle}
                  </h3>
                  
                  {/* Subtle description */}
                  <p className="text-white/60 text-sm tracking-wide mb-6 max-w-xs">
                    {category.description}
                  </p>
                  
                  {/* CTA */}
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-sm uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                      Explore
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:text-primary" />
                  </div>
                </motion.div>
              </div>
              
              {/* Hover accent glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/0 group-hover:from-primary/10 transition-all duration-700" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
