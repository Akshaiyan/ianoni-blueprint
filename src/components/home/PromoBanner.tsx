import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-4 bg-primary">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-4"
      >
        <Link 
          to="/padel" 
          className="group flex items-center justify-center gap-6 text-white"
        >
          <span className="text-xs tracking-[0.2em] uppercase opacity-80">
            Limited Offer
          </span>
          <span className="text-sm font-medium">
            10% OFF with code <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">WELCOME10</span>
          </span>
          <span className="flex items-center gap-2 text-sm opacity-80 group-hover:opacity-100 transition-opacity">
            Shop Now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
