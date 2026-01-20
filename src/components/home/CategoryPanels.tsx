import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import pr8100Hero from "@/assets/products/pr8100-hero.jpg";
import pr8100RedBlack from "@/assets/products/pr8100-red-black.jpg";
import pr8100BluePink from "@/assets/products/pr8100-blue-pink.jpg";
import pr8100Grip from "@/assets/products/pr8100-grip.jpg";

const categories = [
  {
    id: "padel",
    title: "Padel Rackets",
    description: "Carbon fiber precision",
    image: pr8100Hero,
    href: "/padel",
    size: "large",
  },
  {
    id: "pickleball",
    title: "Pickleball Rackets",
    description: "Power meets control",
    image: pr8100RedBlack,
    href: "/pickleball",
    size: "medium",
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Bags, grips & more",
    image: pr8100Grip,
    href: "/accessories",
    size: "medium",
  },
  {
    id: "beginner",
    title: "Beginner Kits",
    description: "Everything to start",
    image: pr8100BluePink,
    href: "/guide",
    size: "medium",
  },
];

export function CategoryPanels() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Shop by Category</h2>
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Large featured tile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 row-span-2"
          >
            <Link to={categories[0].href} className="group block relative h-full min-h-[400px] md:min-h-[500px] rounded-3xl overflow-hidden">
              <img
                src={categories[0].image}
                alt={categories[0].title}
                className="absolute inset-0 w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                <span className="text-primary text-sm font-medium tracking-wider uppercase mb-2">Featured</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{categories[0].title}</h3>
                <p className="text-white/60 mb-4">{categories[0].description}</p>
                <div className="flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                  <span className="text-sm font-medium uppercase tracking-wider">Shop Now</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/0 group-hover:from-primary/20 transition-all duration-700" />
            </Link>
          </motion.div>

          {/* Smaller tiles */}
          {categories.slice(1).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              className="col-span-1"
            >
              <Link to={category.href} className="group block relative h-[200px] md:h-[240px] rounded-2xl overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">{category.title}</h3>
                  <p className="text-white/60 text-sm hidden md:block">{category.description}</p>
                  <div className="flex items-center gap-2 text-white/70 group-hover:text-primary transition-colors mt-2">
                    <span className="text-xs font-medium uppercase tracking-wider">Shop</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
