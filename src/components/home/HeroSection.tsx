import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Full-bleed background with parallax */}
      <div className="absolute inset-0">
        <motion.div
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Padel players in action"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* Dramatic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Primary color accent glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary/15 blur-[150px] rounded-full"
        />
      </div>

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 w-full pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
                Premium Padel & Pickleball
              </span>
            </motion.div>

            {/* Value Proposition - matching spec */}
            <div className="mb-6">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 150 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-white text-hero"
                >
                  Innovative Rackets
                </motion.h1>
              </div>
              <div className="overflow-hidden -mt-1 md:-mt-2">
                <motion.h1
                  initial={{ y: 150 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-hero"
                >
                  <span className="text-outline text-white">for</span>{" "}
                  <span className="text-gradient">Every Player</span>
                </motion.h1>
              </div>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Carbon fiber technology meets intuitive design. Engineered with pro input
              for beginners and champions alike.
            </motion.p>

            {/* Dual CTAs - matching spec */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="text-base px-8 h-14 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold shadow-lg shadow-primary/30"
              >
                <Link to="/padel">
                  Shop Padel
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-base px-8 h-14 bg-white hover:bg-white/90 text-foreground rounded-full font-semibold"
              >
                <Link to="/pickleball">
                  Shop Pickleball
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Floating trust badge */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2"
          >
            <div className="glass-dark rounded-2xl p-6 text-center">
              <p className="text-4xl font-bold text-white mb-1">4.6<span className="text-primary">★</span></p>
              <p className="text-xs text-white/60 uppercase tracking-wider mb-2">Amazon Rating</p>
              <div className="w-full h-px bg-white/10 my-3" />
              <p className="text-2xl font-bold text-primary mb-1">50K+</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Happy Players</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
