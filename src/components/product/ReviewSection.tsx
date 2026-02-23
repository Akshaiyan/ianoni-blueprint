import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

const reviewSchema = z.object({
  reviewer_name: z.string().trim().min(1, "Name is required").max(100),
  reviewer_email: z.string().trim().email("Valid email required").max(255),
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().trim().max(200).optional(),
  body: z.string().trim().min(10, "Review must be at least 10 characters").max(2000),
});

function StarRating({ value, onChange, readOnly = false, size = "md" }: {
  value: number;
  onChange?: (v: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md";
}) {
  const [hover, setHover] = useState(0);
  const s = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={readOnly ? "cursor-default" : "cursor-pointer"}
        >
          <Star
            className={`${s} ${
              star <= (hover || value)
                ? "fill-primary text-primary"
                : "text-border"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

interface ReviewSectionProps {
  productHandle: string;
}

export function ReviewSection({ productHandle }: ReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reviewer_name: "",
    reviewer_email: "",
    rating: 0,
    title: "",
    body: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const DISPLAY_LIMIT = 6;

  const { data: reviewData, refetch } = useQuery({
    queryKey: ["reviews", productHandle],
    queryFn: async () => {
      // Fetch all approved reviews to compute stats, but we'll only display recent ones
      const { data, error, count } = await supabase
        .from("reviews")
        .select("*", { count: "exact" })
        .eq("product_handle", productHandle)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { reviews: data ?? [], totalCount: count ?? 0 };
    },
  });

  const allReviews = reviewData?.reviews ?? [];
  const totalCount = reviewData?.totalCount ?? 0;
  const reviews = allReviews.slice(0, showAll ? allReviews.length : DISPLAY_LIMIT);

  const avgRating = allReviews.length > 0
    ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = reviewSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("reviews").insert([{
        product_handle: productHandle,
        reviewer_name: result.data.reviewer_name,
        reviewer_email: result.data.reviewer_email,
        rating: result.data.rating,
        body: result.data.body,
        title: result.data.title || null,
      }]);

      if (error) throw error;

      toast.success("Review submitted!", {
        description: "Your review will appear once approved. Thank you!",
      });
      setFormData({ reviewer_name: "", reviewer_email: "", rating: 0, title: "", body: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Review submit error:", err);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 border-t">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Recent Reviews</h2>
          {totalCount > 0 && (
            <div className="flex items-center gap-3 mt-2">
              <StarRating value={Math.round(avgRating)} readOnly size="sm" />
              <span className="text-sm text-muted-foreground">
                {avgRating.toFixed(1)} out of 5 · Based on {totalCount} review{totalCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
        <Button
          variant={showForm ? "outline" : "default"}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Write a Review"}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="bg-muted/30 rounded-2xl p-6 mb-8 space-y-4 border border-border">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name *</label>
                  <Input
                    value={formData.reviewer_name}
                    onChange={(e) => setFormData(p => ({ ...p, reviewer_name: e.target.value }))}
                    placeholder="Your name"
                  />
                  {errors.reviewer_name && <p className="text-xs text-destructive mt-1">{errors.reviewer_name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email *</label>
                  <Input
                    type="email"
                    value={formData.reviewer_email}
                    onChange={(e) => setFormData(p => ({ ...p, reviewer_email: e.target.value }))}
                    placeholder="your@email.com"
                  />
                  {errors.reviewer_email && <p className="text-xs text-destructive mt-1">{errors.reviewer_email}</p>}
                  <p className="text-[10px] text-muted-foreground mt-1">Not displayed publicly</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Rating *</label>
                <StarRating value={formData.rating} onChange={(v) => setFormData(p => ({ ...p, rating: v }))} />
                {errors.rating && <p className="text-xs text-destructive mt-1">{errors.rating}</p>}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                  placeholder="Summarize your review"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Review *</label>
                <Textarea
                  value={formData.body}
                  onChange={(e) => setFormData(p => ({ ...p, body: e.target.value }))}
                  placeholder="Share your experience with this product..."
                  rows={4}
                />
                {errors.body && <p className="text-xs text-destructive mt-1">{errors.body}</p>}
              </div>

              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Submit Review
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {reviews.length === 0 && !showForm ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg mb-2">No reviews yet</p>
          <p className="text-sm">Be the first to share your experience!</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <StarRating value={review.rating} readOnly size="sm" />
                    {review.title && (
                      <span className="font-semibold text-sm">{review.title}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-foreground mb-2">{review.body}</p>
                <p className="text-xs text-muted-foreground">{review.reviewer_name}</p>
              </div>
            ))}
          </div>
          {!showAll && allReviews.length > DISPLAY_LIMIT && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => setShowAll(true)}>
                Show All {totalCount} Reviews
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
