import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface RatingData {
  avgRating: number;
  totalCount: number;
  displayCount: number;
}

// Deterministic pseudo-random base count per handle (100-350 range)
function getBaseCount(handle: string): number {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) {
    hash = ((hash << 5) - hash) + handle.charCodeAt(i);
    hash |= 0;
  }
  return 100 + Math.abs(hash % 251);
}

export function useProductRatings() {
  const { data: ratingsMap = {} } = useQuery({
    queryKey: ["product-ratings"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("product_handle, rating")
        .eq("status", "approved");

      if (error) throw error;

      const map: Record<string, RatingData> = {};
      for (const row of data ?? []) {
        if (!map[row.product_handle]) {
          map[row.product_handle] = { avgRating: 0, totalCount: 0, displayCount: 0 };
        }
        map[row.product_handle].totalCount++;
        map[row.product_handle].avgRating += row.rating;
      }
      // Convert sums to averages and add display counts
      for (const key in map) {
        map[key].avgRating = Math.round((map[key].avgRating / map[key].totalCount) * 10) / 10;
        map[key].displayCount = map[key].totalCount + getBaseCount(key);
      }
      return map;
    },
  });

  const getRating = (handle: string): RatingData | null => ratingsMap[handle] ?? null;

  return { ratingsMap, getRating };
}
