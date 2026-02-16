/**
 * Maps local product slugs to Shopify variant IDs.
 * These are used for cart/checkout operations via the Storefront API.
 */

export interface VariantMapping {
  variantId: string;
  price?: { amount: string; currencyCode: string };
}

const variantMap: Record<string, VariantMapping> = {
  // PR8100 Rackets
  "pr8100-red-black": { variantId: "gid://shopify/ProductVariant/47900760447275" },
  "pr8100-blue-pink": { variantId: "gid://shopify/ProductVariant/47900760512747" },
  "pr8100-blue-orange": { variantId: "gid://shopify/ProductVariant/47900760545515" },

  // PR8200 Rackets
  "pr8200-blue-stripe": { variantId: "gid://shopify/ProductVariant/47900760479979" },
  "pr8200-grey-stripe": { variantId: "gid://shopify/ProductVariant/47900760578283" },
  "super-power-pink": { variantId: "gid://shopify/ProductVariant/47900760611051" },

  // Starter Kits — not yet in Shopify store
  "starter-kit-blue-orange": { variantId: "" },
  "starter-kit-blue-pink": { variantId: "" },
  "starter-kit-black-sky": { variantId: "" },
  "starter-kit-red-black": { variantId: "" },
  "starter-kit-red-black-doubles": { variantId: "" },

  // Balls — not yet in Shopify store
  "ianoni-pro-padel-balls": { variantId: "" },
  "ianoni-pro-s-padel-balls": { variantId: "" },
  "ianoni-pro-padel-balls-3pack": { variantId: "" },
  "ianoni-pro-s-padel-balls-3pack": { variantId: "" },
};

export function getVariantMapping(slug: string): VariantMapping | null {
  return variantMap[slug] || null;
}

export function hasVariantId(slug: string): boolean {
  const mapping = variantMap[slug];
  return !!mapping?.variantId;
}

export function getAllMappings(): Record<string, VariantMapping> {
  return variantMap;
}
