import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Truck } from "lucide-react";
import { useEffect, useState } from "react";

export function PromoBanner() {
  // Countdown timer - ends in 24 hours from now (simulated)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-4 bg-gradient-to-r from-primary via-primary to-orange-500">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4"
      >
        <Link 
          to="/padel" 
          className="group flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white"
        >
          {/* Free Shipping */}
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
            <Truck className="h-4 w-4" />
            <span className="text-sm font-bold tracking-wide uppercase">Free UK Shipping</span>
          </div>

          {/* Divider */}
          <span className="hidden md:block w-px h-5 bg-white/30" />

          {/* Urgency indicator */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase">Limited Time</span>
          </div>

          {/* Offer */}
          <div className="flex items-center gap-3">
            <span className="text-sm md:text-base font-semibold">
              First Order: <span className="text-lg md:text-xl font-bold">10% OFF</span>
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-mono font-bold">
              WELCOME10
            </span>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-1.5">
            <span className="text-xs opacity-80">Ends in:</span>
            <span className="font-mono font-bold text-sm">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          {/* CTA */}
          <span className="flex items-center gap-2 text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
            Shop Now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
