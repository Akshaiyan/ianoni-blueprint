import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/hero-action.jpg";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Padel in action"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* Cinematic overlays - lighter for better visibility */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

        {/* Ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[200px] rounded-full"
        />
      </div>

      {/* Corner frames */}
      <div className="absolute inset-8 pointer-events-none hidden lg:block">
        <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-white/10" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-white/10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-white/10" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-white/10" />
      </div>

      {/* Center content */}
      <motion.div style={{ y: textY }} className="relative z-10 text-center px-4 py-20">
        {/* Brand name - strong emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-sm tracking-[0.5em] uppercase text-primary font-bold drop-shadow-lg">
            IANONI
          </span>
        </motion.div>

        {/* Main headline - centered stack */}
        <div className="mb-8">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] md:text-[11vw] lg:text-[9vw] font-black text-white leading-[0.9] tracking-[-0.04em]"
            >
              INNOVATIVE
            </motion.h1>
          </div>
          <div className="overflow-hidden -mt-1 md:-mt-2">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] md:text-[11vw] lg:text-[9vw] font-black text-primary leading-[0.9] tracking-[-0.04em]"
            >
              RACKETS
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-3 md:mt-5">
            <motion.p
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-wide drop-shadow-md"
            >
              for <span className="font-semibold text-white">Every Player</span>
            </motion.p>
          </div>
          <div className="overflow-hidden mt-4">
            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-primary font-bold"
            >
              Engineered for Impact
            </motion.p>
          </div>
        </div>

        {/* CTA - single button, more prominent */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center mb-10"
        >
          <Link
            to="/padel"
            className="group flex items-center justify-center gap-3 px-10 py-5 bg-primary hover:bg-primary/90 text-white rounded-full transition-all duration-300"
          >
            <span className="text-base font-semibold">Shop Padel Rackets</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Trust stats - inline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex items-center justify-center gap-6 md:gap-10"
        >
          <div className="text-center">
            <div className="flex items-baseline justify-center">
              <span className="text-3xl md:text-4xl font-black text-white">4.6</span>
              <span className="text-lg text-primary ml-1">★</span>
            </div>
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1">
              Rating
            </p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-black text-primary">50K+</span>
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1">
              Players
            </p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-black text-white">30+</span>
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1">
              Countries
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
