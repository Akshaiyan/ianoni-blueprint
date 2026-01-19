import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full-bleed background with cinematic overlay */}
      <div className="absolute inset-0">
        {/* Placeholder for hero image - full bleed */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-background">
          {/* Atmospheric placeholder */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-[20rem] select-none">🎾</span>
          </div>
        </div>
        
        {/* Cinematic overlay */}
        <div className="absolute inset-0 overlay-cinematic" />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 vignette" />
        
        {/* Subtle atmospheric glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full"
        />
      </div>

      {/* Content - Asymmetrical positioning */}
      <div className="relative z-10 w-full pb-24 pt-48">
        <div className="container mx-auto px-4">
          {/* Left-weighted layout with asymmetry */}
          <div className="max-w-4xl">
            {/* Small descriptor - editorial typography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8"
            >
              Premium Padel Equipment
            </motion.p>

            {/* Massive editorial headline - staggered animation */}
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-display text-foreground"
              >
                Precision
              </motion.h1>
            </div>
            
            <div className="overflow-hidden mb-12">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-display text-muted-foreground"
              >
                Engineered.
              </motion.h1>
            </div>

            {/* Smoked glass text block - asymmetrical */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass-dark rounded-lg p-6 md:p-8 max-w-xl mb-12"
            >
              <p className="text-foreground/80 text-lg md:text-xl leading-relaxed">
                Carbon fiber technology meets intuitive design. 
                Crafted for players who demand excellence at every touch.
              </p>
            </motion.div>

            {/* CTAs - minimal and confident */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Button asChild size="lg" className="text-base px-10 h-14 bg-foreground text-background hover:bg-foreground/90">
                <Link to="/padel">
                  Explore Collection
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="ghost" 
                size="lg" 
                className="text-base px-10 h-14 text-foreground hover:text-foreground hover:bg-foreground/5 underline-reveal"
              >
                <Link to="/guide">
                  Beginner's Guide
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Floating stat - positioned asymmetrically */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="hidden lg:block absolute right-8 xl:right-16 bottom-32"
          >
            <div className="glass-subtle rounded-lg p-6 text-right">
              <p className="text-4xl font-bold text-foreground mb-1">4.6★</p>
              <p className="text-sm text-muted-foreground">Amazon Rating</p>
              <p className="text-xs text-muted-foreground/60 mt-1">50,000+ players</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
