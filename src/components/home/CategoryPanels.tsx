import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "padel",
    title: "Padel Rackets",
    description: "Premium carbon fiber rackets for all skill levels",
    image: "🎾",
    href: "/padel",
    color: "from-primary/20 to-primary/5",
  },
  {
    id: "pickleball",
    title: "Pickleball Paddles",
    description: "Precision-engineered paddles for optimal control",
    image: "🏓",
    href: "/pickleball",
    color: "from-sport-teal/20 to-sport-teal/5",
  },
  {
    id: "accessories",
    title: "Accessories & Bags",
    description: "Complete your setup with premium gear",
    image: "🎒",
    href: "/accessories",
    color: "from-muted to-muted/50",
  },
  {
    id: "beginner",
    title: "Beginner Kits",
    description: "Everything you need to start playing",
    image: "⭐",
    href: "/guide",
    color: "from-primary/10 to-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function CategoryPanels() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our range of premium padel equipment designed for players at every level
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link
                to={category.href}
                className="group block h-full"
              >
                <div className={`relative h-full rounded-2xl bg-gradient-to-br ${category.color} p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-background/80 backdrop-blur flex items-center justify-center mb-4 text-3xl shadow-sm">
                      {category.image}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {category.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-primary font-medium text-sm">
                      <span>Shop now</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}