import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import pr8100Detail from "@/assets/products/pr8100-detail.jpg";

const features = [
  {
    number: "01",
    title: "Carbon Fiber",
    subtitle: "3K Weave Technology",
    description: "Aerospace-grade carbon delivers explosive power transfer with surgical precision at every impact point.",
    stat: "40%",
    statLabel: "lighter",
  },
  {
    number: "02",
    title: "Sweet Spot",
    subtitle: "Expanded Zone",
    description: "Engineered forgiveness for developing players. Build confidence with every swing.",
    stat: "15%",
    statLabel: "larger",
  },
  {
    number: "03",
    title: "Pro Input",
    subtitle: "Tournament Tested",
    description: "Developed with professional player feedback for competition-level performance.",
    stat: "50+",
    statLabel: "pros consulted",
  },
  {
    number: "04",
    title: "Guarantee",
    subtitle: "Quality Promise",
    description: "1-year warranty and 30-day money-back guarantee. We stand behind every racket.",
    stat: "100%",
    statLabel: "satisfaction",
  },
];

export function WhyIanoni() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-cinema overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Carbon fiber texture at 3% */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              currentColor 2px,
              currentColor 4px
            )`,
          }}
        />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
        {/* Stadium light effect */}
        <div className="absolute top-0 right-1/4 w-[300px] h-[600px] bg-white/[0.02] blur-[100px] rotate-12" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Editorial intro bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center gap-6 mb-16 origin-left"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-primary font-medium">
            The Difference
          </span>
          <div className="h-px w-24 bg-white/10" />
        </motion.div>

        {/* Main content - asymmetric grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left - Typography heavy */}
          <div className="lg:col-span-5">
            <motion.div style={{ y: textY }}>
              {/* Vertical label */}
              <div className="hidden lg:flex items-center gap-4 mb-12 -rotate-90 origin-left translate-x-4">
                <span className="text-[9px] tracking-[0.5em] uppercase text-white/20">
                  Engineering
                </span>
              </div>

              {/* Headline - massive, grid-breaking */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-hero text-white leading-[0.9] mb-4">
                  Why Choose
                </h2>
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-primary">
                  IANONI
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white/50 text-lg leading-relaxed mb-12 max-w-md"
              >
                Every racket is a culmination of aerospace engineering and athletic intuition. 
                We don't just make equipment — we craft extensions of your intent.
              </motion.p>

              {/* Featured image - dramatic crop */}
              <motion.div
                style={{ y: imageY }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-[4/5] w-4/5 overflow-hidden">
                  <img
                    src={pr8100Detail}
                    alt="Racket detail"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                  {/* Film grain overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-transparent to-transparent" />
                </div>

                {/* HUD overlay */}
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-right">
                  <span className="text-[9px] tracking-widest uppercase text-white/20 block mb-1">
                    Impact Zone
                  </span>
                  <span className="text-xs font-mono text-primary">35° angle</span>
                </div>

                {/* Corner bracket */}
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/40" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Features as editorial cards */}
          <div className="lg:col-span-7">
            <div className="space-y-1">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Card with subtle glass */}
                  <div className="relative p-6 md:p-8 border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-500">
                    {/* Number - large, faded */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-8 text-[80px] md:text-[100px] font-black text-white/[0.03] pointer-events-none">
                      {feature.number}
                    </div>

                    <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
                      {/* Number badge */}
                      <div className="md:col-span-1">
                        <span className="text-xs font-mono text-primary">{feature.number}</span>
                      </div>

                      {/* Title + subtitle */}
                      <div className="md:col-span-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <span className="text-xs tracking-widest uppercase text-white/30">
                          {feature.subtitle}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-5">
                        <p className="text-white/40 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Stat */}
                      <div className="md:col-span-2 text-right">
                        <span className="text-2xl md:text-3xl font-bold text-gradient block">
                          {feature.stat}
                        </span>
                        <span className="text-[9px] tracking-widest uppercase text-white/30">
                          {feature.statLabel}
                        </span>
                      </div>
                    </div>

                    {/* Hover accent */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-12 transition-all duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom flourish */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block">
                  Continuous Innovation
                </span>
                <span className="text-xs text-primary">Since 2019</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
