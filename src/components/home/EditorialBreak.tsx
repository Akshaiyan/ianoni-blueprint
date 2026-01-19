import { motion } from "framer-motion";

interface EditorialBreakProps {
  text: string;
  subtext?: string;
}

export function EditorialBreak({ text, subtext }: EditorialBreakProps) {
  return (
    <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-muted/30">
      {/* Subtle warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      {/* Atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/[0.03] blur-[100px] rounded-full" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-editorial text-foreground max-w-4xl mx-auto"
        >
          {text}
        </motion.p>
        
        {subtext && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-muted-foreground text-sm tracking-[0.3em] uppercase mt-8"
          >
            {subtext}
          </motion.p>
        )}
      </div>
    </section>
  );
}
