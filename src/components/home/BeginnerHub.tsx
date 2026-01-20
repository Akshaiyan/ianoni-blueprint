import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Play, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const guides = [
  { 
    label: "Buying Guide", 
    description: "Find the perfect racket for your skill level", 
    href: "/guide/buying-guide", 
    icon: BookOpen,
    time: "5 min read"
  },
  { 
    label: "Padel 101", 
    description: "Master the fundamentals with our video tutorials", 
    href: "/guide/padel-101", 
    icon: Play,
    time: "Watch now"
  },
  { 
    label: "FAQ", 
    description: "Common questions answered by our experts", 
    href: "/faq", 
    icon: HelpCircle,
    time: "Quick answers"
  },
];

export function BeginnerHub() {
  return (
    <section className="py-24 md:py-32 bg-cinema relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-6 block">
              New to Padel?
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-display text-white mb-6">
              Start Your Journey <span className="text-gradient">Today</span>
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
              Our beginner-friendly equipment and comprehensive guides make starting 
              your padel journey simple and rewarding.
            </p>
            
            {/* Guide links */}
            <div className="space-y-4 mb-10">
              {guides.map((guide, index) => (
                <motion.div
                  key={guide.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={guide.href}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <guide.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{guide.label}</span>
                        <span className="text-white/40 text-xs">• {guide.time}</span>
                      </div>
                      <span className="text-white/50 text-sm line-clamp-1">{guide.description}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-14 rounded-full font-semibold">
              <Link to="/guide">
                Explore All Guides
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-primary/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 border border-white/10 rounded-full"
              />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎾</div>
                  <p className="text-white text-xl font-bold">Ready to Play?</p>
                  <p className="text-white/50 text-sm">Start your padel journey</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
