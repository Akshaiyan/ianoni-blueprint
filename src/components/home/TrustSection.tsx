import { motion } from "framer-motion";
import { Star, Users, Globe, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: Star,
    value: "4.6★",
    label: "Amazon Rating",
    sublabel: "Based on 2,000+ reviews",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Happy Players",
    sublabel: "Worldwide community",
  },
  {
    icon: Globe,
    value: "30+",
    label: "Countries",
    sublabel: "Global shipping",
  },
  {
    icon: ShieldCheck,
    value: "1 Year",
    label: "Warranty",
    sublabel: "Quality guarantee",
  },
];

const reviews = [
  {
    name: "Marco R.",
    location: "Spain",
    rating: 5,
    text: "Best padel racket I've ever owned. The control is incredible and the sweet spot is huge!",
    product: "IANONI Pro Carbon",
  },
  {
    name: "Sarah L.",
    location: "USA",
    rating: 5,
    text: "Perfect for beginners like me. Very forgiving and helps build confidence on the court.",
    product: "IANONI Starter Series",
  },
  {
    name: "Thomas K.",
    location: "Germany",
    rating: 5,
    text: "Excellent build quality and fast shipping. Highly recommend IANONI for any skill level.",
    product: "IANONI Elite",
  },
];

export function TrustSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="font-medium text-foreground mb-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Players Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our community has to say about IANONI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-foreground mb-4 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {review.location}
                  </p>
                </div>
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                  {review.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}