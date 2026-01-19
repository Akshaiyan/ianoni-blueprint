import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Carbon Fiber Core",
    description: "3K carbon weave delivers explosive power transfer while maintaining precise control at impact.",
  },
  {
    number: "02",
    title: "Engineered Balance",
    description: "Optimized weight distribution creates a naturally intuitive swing for players at every level.",
  },
  {
    number: "03",
    title: "Expanded Sweet Spot",
    description: "Forgiving hitting zone builds confidence, letting you focus on your game, not your gear.",
  },
];

export function WhyIanoni() {
  return (
    <section className="py-32 md:py-40 bg-cinema relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Asymmetrical grid layout */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Left column - Editorial heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-6">
              The Technology
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-display text-white mb-6">
              Why
              <br />
              <span className="text-outline text-white/80">IANONI</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Every detail engineered for the decisive moments that define your game.
            </p>
          </motion.div>

          {/* Right column - Feature list */}
          <div className="lg:col-span-6 lg:col-start-7 space-y-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group"
              >
                {/* Feature number */}
                <span className="text-primary/60 text-sm font-mono tracking-wider">
                  {feature.number}
                </span>
                
                {/* Divider line */}
                <div className="w-full h-px bg-white/10 my-6 relative overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.15 }}
                    className="absolute inset-0 bg-primary/40 origin-left"
                  />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/50 leading-relaxed max-w-md">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
