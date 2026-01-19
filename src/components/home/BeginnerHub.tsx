import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BeginnerHub() {
  return (
    <section className="py-32 md:py-40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Visual - large editorial image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] bg-gradient-to-br from-muted/50 to-muted rounded-xl overflow-hidden border border-border/50">
              {/* Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[12rem] opacity-40 select-none">🎯</span>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              
              {/* Text overlay at bottom */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-foreground text-xl md:text-2xl font-bold">
                  Start your journey
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2"
          >
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">
              New to Padel?
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-display text-foreground mb-6">
              Begin with
              <br />
              <span className="text-muted-foreground/50">Confidence</span>
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Our beginner-friendly equipment and comprehensive guides 
              make starting your padel journey simple and rewarding.
            </p>
            
            {/* Quick links */}
            <div className="space-y-0 mb-10">
              {[
                { label: "Buying Guide", href: "/guide/buying-guide" },
                { label: "Padel 101", href: "/guide/padel-101" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="group flex items-center justify-between py-5 border-b border-border hover:border-foreground/20 transition-colors"
                >
                  <span className="text-foreground font-medium">{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-2 transition-all" />
                </Link>
              ))}
            </div>
            
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 px-8 h-14 rounded-full">
              <Link to="/guide">
                Explore Guides
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
