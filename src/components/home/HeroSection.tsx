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
      className="relative h-screen flex items-center justify-center overflow-hidden"
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

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

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
      <motion.div style={{ y: textY }} className="relative z-10 text-center px-4">
        {/* Micro label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-8 bg-white/20" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-white/50 font-medium">
            Padel & Pickleball
          </span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="h-px w-8 bg-white/20" />
        </motion.div>

        {/* Main headline - centered stack */}
        <div className="mb-10">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] md:text-[10vw] lg:text-[8vw] font-black text-white leading-[0.9] tracking-[-0.04em]"
            >
              INNOVATIVE
            </motion.h1>
          </div>
          <div className="overflow-hidden -mt-1 md:-mt-2">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] md:text-[10vw] lg:text-[8vw] font-black text-primary leading-[0.9] tracking-[-0.04em]"
            >
              RACKETS
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-2 md:mt-4">
            <motion.p
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/80 font-light tracking-wide"
            >
              for <span className="font-semibold text-white">Every Player</span>
            </motion.p>
          </div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            to="/padel"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full transition-all duration-300"
          >
            <span className="text-sm font-semibold">Shop Padel</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/pickleball"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300"
          >
            <span className="text-sm font-semibold">Shop Pickleball</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
