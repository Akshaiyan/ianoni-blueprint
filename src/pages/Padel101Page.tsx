import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Target, Zap, Users, Trophy, TrendingUp, Heart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const whyGrowing = [
  { icon: Zap, text: "Easy to learn: beginners can rally quickly and enjoy the game from the first session." },
  { icon: Users, text: "Social by nature: doubles is the default, making it ideal for groups and communities." },
  { icon: Heart, text: "Easier on the body: smaller court and generally slower ball speed than tennis." },
  { icon: Target, text: "Fast and strategic: the walls add variety and keep points alive." },
  { icon: TrendingUp, text: "Progress feels quick: improvements are noticeable session by session." },
];

const beginnerTips = [
  "Control beats power — prioritise placement and consistency.",
  "Use the walls — don't rush to volley everything; let the ball bounce and read the rebound.",
  "Stay connected with your partner — move as a pair and communicate.",
  "Be patient — build points and wait for the right ball.",
  "Use the lob — it buys time, resets the point, and helps you take the net.",
  "Serve with intention — a consistent serve sets the tone and helps you move forward.",
];

export default function Padel101Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/guide" className="hover:text-primary">Guide</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Padel 101</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-primary font-medium mb-4">
              Beginner's Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Padel <span className="text-primary">101</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              A beginner-friendly guide to the rules, equipment, and essentials of padel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                It's no secret that padel is taking the world by storm. It blends the best elements of tennis and squash into a game that's easy to learn, highly social, and genuinely addictive once you get into rallies. While padel has been around since the late 1960s, its most explosive growth has happened in recent years — meaning many players are still new to the sport. At IANONI, we're here for that journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Padel */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">What is Padel?</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Padel is a racket sport played almost exclusively as doubles on an enclosed court that's around 25% smaller than a tennis court. The twist is that the walls are part of the point. Instead of stopping play, they create extra options, more strategy, and longer rallies. Padel uses the same scoring system as tennis, but the emphasis is typically on technique, teamwork, positioning, and smart shot selection rather than raw power.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Growing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Why is Padel Growing So Quickly?</h2>
              <div className="space-y-4">
                {whyGrowing.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Padel Basics */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Padel Basics</h2>

              {/* Scoring */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Scoring System
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Padel follows traditional tennis scoring: 15, 30, 40, game. Most matches are best of three sets. Many formats use a golden point at deuce (the next point wins). At 6–6 you normally play a tiebreak. Some leagues use a 10-point match tiebreak instead of a full third set — your club may vary slightly.
                </p>
              </div>

              {/* Gameplay */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Gameplay Essentials</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-card border">
                    <span className="font-semibold text-primary">Serving:</span>
                    <span className="text-muted-foreground ml-2">Underarm only. Let the ball bounce once, then strike at or below waist height. Serve diagonally, as in tennis.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card border">
                    <span className="font-semibold text-primary">Ball in play:</span>
                    <span className="text-muted-foreground ml-2">The ball must land in the opponent's court before it can hit the wall. After the bounce, players can return shots off the wall.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card border">
                    <span className="font-semibold text-primary">Winning a point:</span>
                    <span className="text-muted-foreground ml-2">You win when opponents fail to return before a second bounce, hit out, or make an error (for example, the ball hits their wall before bouncing).</span>
                  </div>
                </div>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Equipment</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-card border">
                    <span className="font-semibold">Padel racket:</span>
                    <span className="text-muted-foreground ml-2">Solid (no strings), with a foam core (often EVA), perforated face, and a fibreglass or carbon surface.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card border">
                    <span className="font-semibold">Padel balls:</span>
                    <span className="text-muted-foreground ml-2">Similar to tennis balls but typically with slightly less pressure to encourage longer rallies.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card border">
                    <span className="font-semibold">Shoes:</span>
                    <span className="text-muted-foreground ml-2">Padel or clay-style tennis shoes are recommended for grip and safe directional changes.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beginner Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Key Tips for Beginners</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {beginnerTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="flex items-start gap-3 p-5 rounded-xl bg-card border"
                  >
                    <span className="text-primary font-bold text-lg shrink-0">{index + 1}.</span>
                    <p className="text-muted-foreground leading-relaxed text-sm">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-3xl font-bold mb-4">Ready to Try Padel?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Padel is fast, social, and one of the easiest sports to fall in love with. Whether you're transitioning from another racket sport or starting from scratch, padel welcomes everyone. Grab a racket, step on court, and enjoy the rally.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link to="/padel">
                Explore Our Rackets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}