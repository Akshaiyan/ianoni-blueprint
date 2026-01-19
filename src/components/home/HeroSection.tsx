import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import heroImage from "@/assets/hero-action.jpg";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-cinema-dark"
    >
      {/* Full-bleed background with parallax */}
      <div className="absolute inset-0">
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Padel player in action"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Dramatic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Primary color accent glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary/20 blur-[150px] rounded-full"
        />
      </div>

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 w-full pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
                Elite Padel Equipment
              </span>
            </motion.div>

            {/* Main headline - bold mixed treatment */}
            <div className="mb-8">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 150 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-white text-hero"
                >
                  DOMINATE
                </motion.h1>
              </div>
              <div className="overflow-hidden -mt-2 md:-mt-4">
                <motion.h1
                  initial={{ y: 150 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-hero"
                >
                  <span className="text-outline text-white">THE</span>{" "}
                  <span className="text-gradient">COURT</span>
                </motion.h1>
              </div>
            </div>

            {/* Subtext with vertical bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex gap-6 mb-12 max-w-lg"
            >
              <div className="w-1 bg-gradient-to-b from-primary to-transparent rounded-full" />
              <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                Carbon fiber precision meets raw power. Engineered for players
                who refuse to settle for second.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="text-base px-10 h-14 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold shadow-lg shadow-primary/30"
              >
                <Link to="/padel">
                  Shop Collection
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-base px-10 h-14 text-white hover:text-white hover:bg-white/10 border border-white/20 rounded-full"
              >
                <Link to="/guide">Beginner's Guide</Link>
              </Button>
            </motion.div>
          </div>

          {/* Floating stats - glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="hidden lg:flex absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 flex-col gap-4"
          >
            <div className="glass-dark rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-white mb-1">4.8</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">★ Rating</p>
            </div>
            <div className="glass-dark rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-1">50K+</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Players</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
