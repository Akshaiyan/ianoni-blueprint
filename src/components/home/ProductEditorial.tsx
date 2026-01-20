import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import pr8100Hero from "@/assets/products/pr8100-hero.jpg";
import pr8100RedBlack from "@/assets/products/pr8100-red-black.jpg";

export function ProductEditorial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const floatY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95]);
  const textX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const secondaryY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const secondaryRotate = useTransform(scrollYProgress, [0, 1], [10, -5]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 lg:py-64 overflow-hidden bg-cinema"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-cinema-dark to-black" />
        
        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
        
        {/* Grid pattern at 2% */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Large background text - editorial style */}
      <motion.div
        style={{ x: textX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
      >
        <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter">
          PRECISION POWER CONTROL
        </span>
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-center min-h-[70vh]">
          {/* Left content */}
          <div className="lg:col-span-5 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {/* Micro label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-primary" />
                <span className="text-[10px] tracking-[0.5em] uppercase text-primary">
                  The PR8100 Series
                </span>
              </div>

              {/* Editorial headline */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6">
                Engineered
                <br />
                <span className="text-outline text-white">for</span>{" "}
                <span className="text-primary">Impact</span>
              </h2>

              <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
                3-layer carbon fiber construction meets aerospace precision. 
                Every swing, amplified.
              </p>

              {/* Tech specs - HUD style */}
              <div className="space-y-4 mb-10">
                {[
                  { label: "Weight", value: "355g", detail: "Balanced" },
                  { label: "Sweet Spot", value: "+15%", detail: "Expanded" },
                  { label: "Power Transfer", value: "98%", detail: "Efficiency" },
                ].map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[9px] tracking-widest uppercase text-white/30 w-24">
                      {spec.label}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {spec.value}
                    </span>
                    <span className="text-[9px] tracking-widest uppercase text-white/20">
                      {spec.detail}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/product/pr8100-red-black"
                className="group inline-flex items-center gap-4"
              >
                <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                  Explore the PR8100
                </span>
                <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="h-5 w-5 text-white group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Center - Floating product showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
              {/* Main floating racket */}
              <motion.div
                style={{ y: floatY, rotate: rotateZ, scale }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  {/* Glow behind product */}
                  <div className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full scale-75" />
                  
                  {/* Main product image with creative treatment */}
                  <div className="relative w-[300px] md:w-[400px] lg:w-[500px] aspect-[3/4]">
                    <img
                      src={pr8100Hero}
                      alt="PR8100 Racket"
                      className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                      style={{
                        filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.5))",
                      }}
                    />
                    
                    {/* Overlay gradient to blend edges */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Floating tech annotations */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute -left-16 top-1/4 hidden lg:block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[9px] tracking-widest uppercase text-white/40 block">
                          Carbon Face
                        </span>
                        <span className="text-xs font-mono text-primary">3K Weave</span>
                      </div>
                      <div className="w-8 h-px bg-primary/50" />
                      <div className="w-2 h-2 rounded-full border border-primary bg-primary/20" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="absolute -right-20 top-1/2 hidden lg:block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full border border-primary bg-primary/20" />
                      <div className="w-8 h-px bg-primary/50" />
                      <div className="text-left">
                        <span className="text-[9px] tracking-widest uppercase text-white/40 block">
                          Impact Zone
                        </span>
                        <span className="text-xs font-mono text-primary">35° Angle</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="absolute -left-8 bottom-1/4 hidden lg:block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[9px] tracking-widest uppercase text-white/40 block">
                          Grip System
                        </span>
                        <span className="text-xs font-mono text-primary">Anti-Slip</span>
                      </div>
                      <div className="w-8 h-px bg-primary/50" />
                      <div className="w-2 h-2 rounded-full border border-primary bg-primary/20" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Second racket - offset, different angle */}
              <motion.div
                style={{ 
                  y: secondaryY,
                  rotate: secondaryRotate,
                }}
                className="absolute top-20 -right-10 lg:right-0 w-[150px] md:w-[200px] opacity-40 blur-[1px] hidden md:block"
              >
                <img
                  src={pr8100RedBlack}
                  alt="PR8100 Red Black"
                  className="w-full object-contain"
                  style={{
                    filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))",
                  }}
                />
              </motion.div>

              {/* Decorative circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.02] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom editorial line */}
      <div className="absolute bottom-12 left-0 right-0">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[9px] tracking-[0.5em] uppercase text-white/20">
              Carbon Fiber Technology
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
