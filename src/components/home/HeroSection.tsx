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
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Ambient glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-primary/15 blur-[180px] rounded-full"
        />
      </div>

      {/* HUD frame elements */}
      <div className="absolute inset-6 md:inset-10 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-white/10" />
        <div className="absolute top-0 right-0 w-12 h-12 border-r border-t border-white/10" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-l border-b border-white/10" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-white/10" />
      </div>

      {/* Content - Right-aligned editorial layout */}
      <motion.div style={{ y: textY }} className="relative z-10 w-full">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left side - Stats & CTAs */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="space-y-8"
              >
                {/* Trust stats */}
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-4xl md:text-5xl font-black text-white">4.6</span>
                    <span className="text-xl text-primary ml-1">★</span>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1">
                      Amazon Rating
                    </p>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div>
                    <span className="text-4xl md:text-5xl font-black text-primary">50K+</span>
                    <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mt-1">
                      Players
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/padel"
                    className="group flex items-center justify-center gap-3 px-6 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-full transition-all duration-300"
                  >
                    <span className="text-sm font-semibold">Shop Padel</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/pickleball"
                    className="group flex items-center justify-center gap-3 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300"
                  >
                    <span className="text-sm font-semibold">Shop Pickleball</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Tech hints */}
                <div className="flex items-center gap-4 text-[9px] tracking-widest uppercase text-white/25">
                  <span>Carbon Fiber</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>Pro Engineered</span>
                </div>
              </motion.div>
            </div>

            {/* Right side - Main headline */}
            <div className="lg:col-span-8 order-1 lg:order-2 lg:text-right">
              {/* Micro label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-3 mb-6 lg:justify-end"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-medium">
                  Padel & Pickleball
                </span>
              </motion.div>

              {/* Main headline - stacked right */}
              <div className="space-y-1 md:space-y-2">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.95] tracking-[-0.03em]"
                  >
                    INNOVATIVE
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 150 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-primary leading-[0.95] tracking-[-0.03em]"
                  >
                    RACKETS
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 md:gap-4 lg:justify-end pt-2"
                  >
                    <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-white/30 hidden sm:block" />
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/50 tracking-wide">
                      for
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      Every Player
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[8px] tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-white/40 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
