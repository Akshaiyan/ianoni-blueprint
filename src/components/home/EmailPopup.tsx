import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email address").max(255);
const POPUP_STORAGE_KEY = "ianoni_email_popup_dismissed";
const DISCOUNT_CODE = "WELCOME10";

export function EmailPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dismissed = localStorage.getItem(POPUP_STORAGE_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setOpen(false);
    localStorage.setItem(POPUP_STORAGE_KEY, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase
        .from("email_signups")
        .insert({ email: result.data });

      if (dbError) {
        // Unique constraint means already signed up — treat as success
        if (dbError.code === "23505") {
          setSuccess(true);
          localStorage.setItem(POPUP_STORAGE_KEY, "true");
          return;
        }
        throw dbError;
      }

      setSuccess(true);
      localStorage.setItem(POPUP_STORAGE_KEY, "true");
    } catch (err) {
      console.error("Email signup error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleDismiss()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-card rounded-2xl overflow-hidden shadow-xl"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>

            {/* Top accent bar */}
            <div className="h-1 bg-primary w-full" />

            <div className="p-8 text-center">
              {!success ? (
                <>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Gift className="h-7 w-7 text-primary" />
                  </div>

                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Get 10% Off
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Join the IANONI community and receive 10% off your first order.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      className="text-center"
                      autoFocus
                    />
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Claim My Discount
                    </Button>
                  </form>

                  <button
                    onClick={handleDismiss}
                    className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    No thanks
                  </button>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Gift className="h-7 w-7 text-primary" />
                  </div>

                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Welcome! 🎉
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    Your discount code is:
                  </p>

                  <div className="bg-muted rounded-xl px-6 py-4 mb-4">
                    <span className="text-2xl font-mono font-bold tracking-widest text-primary">
                      {DISCOUNT_CODE}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-6">
                    Use this code at checkout for 10% off your first order.
                  </p>

                  <Button onClick={handleDismiss} className="w-full">
                    Start Shopping
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
