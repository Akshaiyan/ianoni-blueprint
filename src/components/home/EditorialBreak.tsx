import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface EditorialBreakProps {
  text: string;
  subtext?: string;
  variant?: "light" | "dark";
}

export function EditorialBreak({ text, subtext, variant = "dark" }: EditorialBreakProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isDark = variant === "dark";

  return (
    <section
      ref={containerRef}
      className={`relative py-32 md:py-48 overflow-hidden ${
        isDark ? "bg-cinema" : "bg-background"
      }`}
    >
      {/* Background accent */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] ${
            isDark ? "bg-primary/10" : "bg-primary/5"
          }`}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div style={{ x, opacity }} className="text-center">
          <h2
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-display ${
              isDark ? "text-white" : "text-foreground"
            }`}
          >
            {text}
          </h2>
          {subtext && (
            <p
              className={`mt-6 text-lg md:text-xl ${
                isDark ? "text-white/50" : "text-muted-foreground"
              }`}
            >
              {subtext}
            </p>
          )}
        </motion.div>
      </div>

      {/* Decorative lines */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className={`absolute top-1/2 left-0 right-0 h-px origin-left ${
          isDark ? "bg-white/10" : "bg-border"
        }`}
      />
    </section>
  );
}
