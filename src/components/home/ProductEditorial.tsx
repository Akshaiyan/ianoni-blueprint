import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import pr8100NoBg from "@/assets/products/pr8100-nobg.png";
import pr8100WithBall from "@/assets/products/pr8100-nobg-with-ball.png";

export function ProductEditorial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const floatY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.9]);
  const textX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const secondaryY = useTransform(scrollYProgress, [0, 1], [120, -60]);
  const secondaryRotate = useTransform(scrollYProgress, [0, 1], [15, -10]);
  const secondaryScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.9, 0.75]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden bg-cinema"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />
        
        {/* Dynamic ambient glows */}
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-primary/40 rounded-full blur-[200px]" 
        />
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[180px]" 
        />
        
        {/* Subtle radial pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Large scrolling background text */}
      <motion.div
        style={{ x: textX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
      >
        <span className="text-[25vw] font-black text-white/[0.015] tracking-[-0.05em]">
          PRECISION POWER
        </span>
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-center min-h-[70vh]">
          {/* Left content */}
          <div className="lg:col-span-5 lg:pr-8 relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Micro label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-primary/30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>
                <div className="w-12 h-px bg-primary/50" />
                <span className="text-[10px] tracking-[0.5em] uppercase text-primary font-medium">
                  PR8100 Series
                </span>
              </div>

              {/* Editorial headline */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6">
                Engineered
                <br />
                <span className="text-outline text-white">for</span>{" "}
                <span className="text-primary">Impact</span>
              </h2>

              <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-md">
                3-layer carbon fiber construction meets aerospace precision. 
                Every swing, amplified. Every shot, intentional.
              </p>

              {/* Tech specs - HUD style */}
              <div className="space-y-3 mb-12">
                {[
                  { label: "Weight", value: "355g", detail: "Precision balanced" },
                  { label: "Sweet Spot", value: "+15%", detail: "Expanded zone" },
                  { label: "Power", value: "98%", detail: "Transfer efficiency" },
                ].map((spec, i) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="group flex items-center gap-4 py-3 border-b border-white/5 hover:border-primary/20 transition-colors"
                  >
                    <span className="text-[9px] tracking-[0.3em] uppercase text-white/20 w-20">
                      {spec.label}
                    </span>
                    <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors">
                      {spec.value}
                    </span>
                    <span className="text-[9px] tracking-widest uppercase text-white/15 ml-auto">
                      {spec.detail}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/product/pr8100-red-black"
                className="group inline-flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-full border border-white/10 group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all duration-500">
                  <ArrowRight className="h-5 w-5 text-white/50 group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5" />
                </div>
                <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors tracking-wide">
                  Explore the PR8100
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right - Floating product showcase with no-bg images */}
          <div className="lg:col-span-7 relative h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Secondary floating racket - behind */}
            <motion.div
              style={{ 
                y: secondaryY,
                rotate: secondaryRotate,
                scale: secondaryScale,
              }}
              className="absolute top-10 right-0 lg:right-10 w-[200px] md:w-[280px] lg:w-[320px] z-10"
            >
              <img
                src={pr8100WithBall}
                alt="PR8100 with ball"
                className="w-full h-auto object-contain opacity-50"
                style={{
                  filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.6)) drop-shadow(0 0 60px rgba(24,160,139,0.15))",
                }}
              />
            </motion.div>

            {/* Main floating racket */}
            <motion.div
              style={{ y: floatY, rotate: rotateZ, scale }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="relative">
                {/* Intense glow behind product */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/25 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-primary/40 rounded-full blur-[80px]" />
                
                {/* Main product image */}
                <div className="relative w-[280px] md:w-[380px] lg:w-[450px]">
                  <img
                    src={pr8100NoBg}
                    alt="PR8100 Padel Racket"
                    className="w-full h-auto object-contain"
                    style={{
                      filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.6)) drop-shadow(0 0 80px rgba(24,160,139,0.2))",
                    }}
                  />
                </div>

                {/* Tech annotation - Carbon Face */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute -left-24 top-[30%] hidden lg:flex items-center gap-3"
                >
                  <div className="text-right">
                    <span className="text-[8px] tracking-[0.3em] uppercase text-white/30 block">
                      Carbon Face
                    </span>
                    <span className="text-xs font-mono text-primary font-medium">3K Weave</span>
                  </div>
                  <div className="w-10 h-px bg-gradient-to-r from-transparent to-primary/60" />
                  <div className="w-2 h-2 rounded-full border border-primary/60 bg-primary/20 animate-pulse" />
                </motion.div>

                {/* Tech annotation - Impact Zone */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="absolute -right-28 top-[45%] hidden lg:flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full border border-primary/60 bg-primary/20 animate-pulse" />
                  <div className="w-10 h-px bg-gradient-to-l from-transparent to-primary/60" />
                  <div className="text-left">
                    <span className="text-[8px] tracking-[0.3em] uppercase text-white/30 block">
                      Impact Zone
                    </span>
                    <span className="text-xs font-mono text-primary font-medium">35° Optimized</span>
                  </div>
                </motion.div>

                {/* Tech annotation - Grip */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="absolute -left-16 bottom-[15%] hidden lg:flex items-center gap-3"
                >
                  <div className="text-right">
                    <span className="text-[8px] tracking-[0.3em] uppercase text-white/30 block">
                      Grip Tech
                    </span>
                    <span className="text-xs font-mono text-primary font-medium">Anti-Slip</span>
                  </div>
                  <div className="w-10 h-px bg-gradient-to-r from-transparent to-primary/60" />
                  <div className="w-2 h-2 rounded-full border border-primary/60 bg-primary/20 animate-pulse" />
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative orbit circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-white/[0.03] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-dashed border-white/[0.02] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom editorial line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-16 left-0 right-0 origin-center"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-[8px] tracking-[0.6em] uppercase text-white/15 font-medium">
              Carbon Fiber Technology
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
