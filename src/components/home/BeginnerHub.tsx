import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, HelpCircle, PlayCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    icon: BookOpen,
    title: "Padel 101",
    description: "Learn the basics of padel, from rules to technique",
    href: "/guide/padel-101",
  },
  {
    icon: PlayCircle,
    title: "Buying Guide",
    description: "Find the perfect racket for your playing style",
    href: "/guide/buying-guide",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Answers to common questions about our products",
    href: "/faq",
  },
];

export function BeginnerHub() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-primary font-semibold mb-4">
              New to Padel?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Journey with Confidence
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Whether you're picking up a racket for the first time or looking to 
              improve your game, our comprehensive guides and beginner-friendly 
              equipment will help you succeed.
            </p>

            <div className="space-y-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={resource.href}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-card hover:bg-card/80 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <resource.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-3" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <Button asChild size="lg" className="mt-8">
              <Link to="/guide">
                Explore Beginner's Guide
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🎯</div>
                  <p className="text-xl font-semibold mb-2">Ready to Play?</p>
                  <p className="text-muted-foreground">
                    Discover our beginner-friendly collection
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}