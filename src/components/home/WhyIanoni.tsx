import { motion } from "framer-motion";
import { Shield, Zap, Award, Heart } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Carbon Fiber Technology",
    description:
      "Our 3K carbon fiber construction delivers the perfect balance of power and control for explosive gameplay.",
  },
  {
    icon: Heart,
    title: "Beginner-Friendly Design",
    description:
      "Larger sweet spots and optimized weight distribution make our rackets perfect for players learning the game.",
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description:
      "Every racket undergoes rigorous quality testing to ensure durability and consistent performance.",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description:
      "Recognized by players worldwide with over 50,000 happy customers and a 4.6-star average rating.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function WhyIanoni() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">IANONI</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to helping players of all levels discover the joy of padel 
            with innovative, high-quality equipment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}