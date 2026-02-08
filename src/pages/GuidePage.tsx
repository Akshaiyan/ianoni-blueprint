import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Lightbulb, HelpCircle, ChevronRight, ArrowRight, Check, Mail } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const guides = [
  {
    icon: BookOpen,
    title: "Padel 101",
    description: "Learn the fundamentals of padel, from basic rules to court etiquette",
    topics: ["Court dimensions", "Scoring system", "Basic shots", "Serving rules"],
    href: "/guide/padel-101",
  },
  {
    icon: Lightbulb,
    title: "Racket Buying Guide",
    description: "Find the perfect racket for your skill level and playing style",
    topics: ["Shape guide", "Weight considerations", "Material comparison", "Brand overview"],
    href: "/guide/buying-guide",
  },
];

const faqs = [
  {
    question: "What's the difference between padel and pickleball?",
    answer: "Padel is typically played on an enclosed court with glass walls and uses a stringless racket with a solid face. Pickleball is played on an open court similar to badminton and uses a solid paddle. Both are great racket sports but offer different gameplay experiences.",
  },
  {
    question: "Which racket shape is best for beginners?",
    answer: "Round-shaped rackets are ideal for beginners as they offer a larger sweet spot and better control. This makes it easier to hit consistent shots while learning proper technique. As you improve, you might transition to teardrop or diamond shapes for more power.",
  },
  {
    question: "How do I know what weight racket to choose?",
    answer: "For beginners, we recommend lighter rackets (340-360g) as they're easier to maneuver and reduce arm fatigue. More experienced players often prefer heavier rackets (365-375g) for added power. Consider your fitness level and playing frequency when choosing.",
  },
  {
    question: "Do IANONI rackets come with a warranty?",
    answer: "Yes! All IANONI rackets come with a 1-year manufacturer warranty covering defects in materials and workmanship. This doesn't cover normal wear and tear or damage from misuse, but we stand behind the quality of our products.",
  },
  {
    question: "What's the return policy?",
    answer: "We offer a 30-day satisfaction guarantee on all purchases. If you're not completely happy with your racket, you can return it for a full refund. The racket must be in its original condition with tags attached.",
  },
];

const comparisonData = [
  { feature: "Best For", beginner: "Learning & Control", intermediate: "Versatility", advanced: "Power & Precision" },
  { feature: "Shape", beginner: "Round", intermediate: "Teardrop", advanced: "Diamond" },
  { feature: "Weight", beginner: "340-350g", intermediate: "350-365g", advanced: "365-375g" },
  { feature: "Sweet Spot", beginner: "Large", intermediate: "Medium", advanced: "Focused" },
  { feature: "Material", beginner: "Fiberglass", intermediate: "Carbon Blend", advanced: "12K Carbon" },
];

export default function GuidePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block text-primary font-semibold mb-4">
              Beginner's Hub
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Guide to Getting Started
            </h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about padel, from choosing your first 
              racket to understanding the basics of the game.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={guide.href} className="group block h-full">
                  <div className="h-full bg-card rounded-2xl p-8 border hover:border-primary hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                      <guide.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">{guide.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {guide.topics.map((topic) => (
                        <li key={topic} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center text-primary font-medium">
                      Read Guide
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Quick Comparison Guide</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not sure which racket is right for you? Use this quick reference to find 
              the perfect match for your skill level.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto overflow-x-auto"
          >
            <table className="w-full bg-card rounded-2xl overflow-hidden">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">
                    <span className="text-primary">Beginner</span>
                  </th>
                  <th className="text-center p-4 font-semibold">Intermediate</th>
                  <th className="text-center p-4 font-semibold">Advanced</th>
                </tr>
              </thead>
              <tbody>
                 {comparisonData.map((row, index) => (
                   <tr key={row.feature} className={`${index !== comparisonData.length - 1 ? "border-b" : ""} bg-primary/5`}>
                     <td className="p-4 font-medium">{row.feature}</td>
                     <td className="text-center p-4">{row.beginner}</td>
                     <td className="text-center p-4">{row.intermediate}</td>
                     <td className="text-center p-4">{row.advanced}</td>
                   </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/padel">
                Shop Beginner Rackets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Got questions? We've got answers.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-card rounded-xl border px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center text-primary-foreground"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Playing?</h2>
            <p className="text-primary-foreground/80 mb-8">
              Browse our collection of beginner-friendly rackets and get everything 
              you need to start your padel journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link to="/padel">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border-primary-foreground border-2 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}