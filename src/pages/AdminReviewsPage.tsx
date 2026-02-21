import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Check, X, Trash2, Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";

export default function AdminReviewsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const queryClient = useQueryClient();

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  const { data: isAdmin } = useQuery({
    queryKey: ["isAdmin", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session!.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    },
  });

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Review updated");
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Review deleted");
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    }
    setLoggingIn(false);
  };

  if (!session) {
    return (
      <Layout>
        <div className="pt-32 pb-20 container mx-auto px-4 max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" className="w-full" disabled={loggingIn}>
              {loggingIn ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <LogIn className="h-4 w-4 mr-2" />}
              Sign In
            </Button>
          </form>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have admin permissions.</p>
        </div>
      </Layout>
    );
  }

  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");
  const rejected = reviews.filter((r) => r.status === "rejected");

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <Layout>
      <div className="pt-28 pb-20 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Review Moderation</h1>
        <p className="text-muted-foreground mb-8">
          {pending.length} pending · {approved.length} approved · {rejected.length} rejected
        </p>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-border rounded-xl p-5 bg-card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor[review.status]}`}>
                        {review.status}
                      </span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-primary text-primary" : "text-border"}`} />
                        ))}
                      </div>
                    </div>
                    {review.title && <p className="font-semibold text-sm">{review.title}</p>}
                    <p className="text-sm text-foreground mt-1">{review.body}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{review.reviewer_name}</span>
                      <span>·</span>
                      <span>{review.reviewer_email}</span>
                      <span>·</span>
                      <span>{new Date(review.created_at).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>Product: {review.product_handle}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {review.status !== "approved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus.mutate({ id: review.id, status: "approved" })}
                        className="text-green-600 hover:bg-green-50"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    {review.status !== "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus.mutate({ id: review.id, status: "rejected" })}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteReview.mutate(review.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
