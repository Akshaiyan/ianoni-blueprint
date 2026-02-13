import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductByHandle, type ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(query?: string) {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['shopify-products', query],
    queryFn: () => fetchProducts(50, query),
    staleTime: 1000 * 60 * 5,
  });
}

export function useShopifyProduct(handle: string | undefined) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: () => fetchProductByHandle(handle!),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

// Helper to get price from a Shopify product
export function getProductPrice(product: ShopifyProduct): number {
  return parseFloat(product.node.priceRange.minVariantPrice.amount);
}

// Helper to get primary image
export function getProductImage(product: ShopifyProduct): string {
  return product.node.images.edges[0]?.node.url || '/placeholder.svg';
}

// Helper to get all gallery images
export function getProductGallery(product: ShopifyProduct): string[] {
  return product.node.images.edges.map(e => e.node.url);
}

// Helper to get currency symbol
export function getCurrencySymbol(currencyCode: string): string {
  const symbols: Record<string, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
  };
  return symbols[currencyCode] || currencyCode;
}
