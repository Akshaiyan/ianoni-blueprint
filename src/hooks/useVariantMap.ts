import { useMemo } from 'react';
import { useShopifyProducts } from './useShopifyProducts';

export interface ResolvedVariant {
  variantId: string;
  price: { amount: string; currencyCode: string };
}

/**
 * Fetches all Shopify products and builds a handle → first-variant map.
 * Components look up variants by local product slug (which matches Shopify handle).
 */
export function useVariantMap() {
  const { data: products, isLoading, error } = useShopifyProducts();

  const variantMap = useMemo(() => {
    const map = new Map<string, ResolvedVariant>();
    if (!products) return map;

    for (const p of products) {
      const handle = p.node.handle;
      const firstVariant = p.node.variants.edges[0]?.node;
      if (handle && firstVariant) {
        map.set(handle, {
          variantId: firstVariant.id,
          price: firstVariant.price,
        });
      }
    }
    return map;
  }, [products]);

  const getVariant = (slug: string): ResolvedVariant | null => {
    return variantMap.get(slug) ?? null;
  };

  const hasVariant = (slug: string): boolean => {
    return variantMap.has(slug);
  };

  return { variantMap, getVariant, hasVariant, isLoading, error };
}
