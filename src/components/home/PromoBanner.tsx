import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="py-4 bg-primary">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">New Customer Special</span>
          </div>
          <span className="hidden sm:block">•</span>
          <span className="text-center sm:text-left">
            Get <strong>10% OFF</strong> your first order with code{" "}
            <code className="bg-primary-foreground/20 px-2 py-0.5 rounded font-mono font-bold">
              WELCOME10
            </code>
          </span>
          <Button
            variant="secondary"
            size="sm"
            className="shrink-0 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Shop Now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}