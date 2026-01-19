import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, HelpCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const guides = [
  { label: "Buying Guide", description: "Find your perfect racket", href: "/guide/buying-guide", icon: BookOpen },
  { label: "Padel 101", description: "Master the fundamentals", href: "/guide/padel-101", icon: Play },
  { label: "FAQ", description: "Common questions answered", href: "/faq", icon: HelpCircle },
];

export function BeginnerHub() {
  return (
    <section className="py-32 md:py-40 bg-cinema relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Visual - dramatic gradient card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-white/10">
              {/* Abstract visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-64 h-64 border border-white/10 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 border border-primary/30 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl">🎾</span>
                  </div>
                </div>
              </div>
              
              {/* Text overlay at bottom */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-2xl md:text-3xl font-bold mb-2">
                  Start your journey
                </p>
                <p className="text-white/60">
                  From beginner to pro
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
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-6">
              New to Padel?
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-display text-white mb-6">
              Begin with
              <br />
              <span className="text-outline text-white/70">Confidence</span>
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
              Our beginner-friendly equipment and comprehensive guides 
              make starting your padel journey simple and rewarding.
            </p>
            
            {/* Quick links - card style */}
            <div className="space-y-4 mb-10">
              {guides.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <link.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-medium block">{link.label}</span>
                    <span className="text-white/50 text-sm">{link.description}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
            
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-full font-semibold">
              <Link to="/guide">
                Explore All Guides
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
