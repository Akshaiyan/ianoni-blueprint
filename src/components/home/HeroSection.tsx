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
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center overflow-hidden"
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
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        {/* Ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-primary/20 blur-[200px] rounded-full"
        />
      </div>

      {/* HUD frame elements */}
      <div className="absolute inset-8 pointer-events-none hidden lg:block">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-white/10" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-white/10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-white/10" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-white/10" />
        
        {/* Alignment guides */}
        <div className="absolute top-1/2 left-0 w-8 h-px bg-white/10" />
        <div className="absolute top-1/2 right-0 w-8 h-px bg-white/10" />
      </div>

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 w-full">
        <div className="container mx-auto px-4 md:px-8">
          {/* Micro label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-white/50 font-medium">
              Padel & Pickleball
            </span>
          </motion.div>

          {/* Main headline - massive, minimal */}
          <div className="max-w-5xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black text-white leading-[0.85] tracking-[-0.04em]"
              >
                PLAY
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-[2vw]">
              <motion.h1
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-[-0.04em]"
              >
                <span className="text-outline text-white">WITH</span>{" "}
                <span className="text-primary">INTENT</span>
              </motion.h1>
            </div>
          </div>

          {/* Dual CTAs - clean, minimal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-12"
          >
            <Link
              to="/padel"
              className="group flex items-center gap-4 px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full transition-all duration-300"
            >
              <span className="text-sm font-semibold tracking-wide">Shop Padel</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/pickleball"
              className="group flex items-center gap-4 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300"
            >
              <span className="text-sm font-semibold tracking-wide">Shop Pickleball</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side floating stat */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="text-right">
          <span className="text-7xl font-black text-white">4.6</span>
          <span className="text-3xl text-primary ml-1">★</span>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mt-2">
            Amazon Rating
          </p>
          <div className="w-full h-px bg-white/10 my-4" />
          <span className="text-4xl font-bold text-primary">50K+</span>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mt-1">
            Players
          </p>
        </div>
      </motion.div>

      {/* Bottom info bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-8 left-0 right-0"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Scroll hint */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
              >
                <div className="w-1 h-1.5 bg-white/40 rounded-full" />
              </motion.div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/30 hidden sm:block">
                Scroll
              </span>
            </div>

            {/* Tech specs hint */}
            <div className="flex items-center gap-6 text-[9px] tracking-widest uppercase text-white/20">
              <span>Carbon Fiber</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Pro Engineered</span>
              <span className="w-1 h-1 bg-white/20 rounded-full hidden sm:block" />
              <span className="hidden sm:block">Premium Quality</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
