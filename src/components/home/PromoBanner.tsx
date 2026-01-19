import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="py-5 bg-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <Link 
          to="/padel" 
          className="group flex items-center justify-center gap-6 text-background"
        >
          <span className="text-xs tracking-[0.2em] uppercase opacity-70">
            New Customer
          </span>
          <span className="text-sm">
            10% OFF with code <span className="font-mono font-bold">WELCOME10</span>
          </span>
          <span className="flex items-center gap-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity">
            Shop Now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
