import { motion } from "framer-motion";
import { Zap, Target, Award, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Carbon Fiber Tech",
    description: "3K carbon weave delivers explosive power transfer with precise control at every impact.",
  },
  {
    icon: Target,
    title: "Beginner-Friendly",
    description: "Expanded sweet spot and forgiving design helps new players build confidence fast.",
  },
  {
    icon: Award,
    title: "Pro-Engineered",
    description: "Developed with professional player input for tournament-level quality and performance.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "1-year warranty and 30-day money-back guarantee on every racket we sell.",
  },
];

export function WhyIanoni() {
  return (
    <section className="py-24 md:py-32 bg-cinema relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            The IANONI Difference
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-display text-white mb-6">
            Why Choose <span className="text-gradient">IANONI</span>?
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Innovative rackets engineered with pro input for high quality performance at every level.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/10 blur-2xl rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
