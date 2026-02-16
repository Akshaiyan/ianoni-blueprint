/**
 * Maps local product slugs to Shopify variant IDs.
 * 
 * After creating minimal products in Shopify Admin, paste each product's
 * variant ID here. The variant ID format is: gid://shopify/ProductVariant/XXXXXXXXXX
 * 
 * You can find variant IDs in Shopify Admin → Products → [Product] → Variants,
 * or by inspecting the URL when editing a variant.
 */

export interface VariantMapping {
  variantId: string;
  // Price from Shopify (in case it differs from local data)
  price?: { amount: string; currencyCode: string };
}

// TODO: Replace these placeholder IDs with real Shopify variant IDs
// after creating the products in your Shopify Admin.
const variantMap: Record<string, VariantMapping> = {
  // PR8100 Rackets
  "pr8100-red-black": { variantId: "" },
  "pr8100-blue-pink": { variantId: "" },
  "pr8100-blue-orange": { variantId: "" },

  // PR8200 Rackets
  "pr8200-blue-stripe": { variantId: "" },
  "pr8200-grey-stripe": { variantId: "" },
  "super-power-pink": { variantId: "" },

  // Starter Kits
  "starter-kit-blue-orange": { variantId: "" },
  "starter-kit-blue-pink": { variantId: "" },
  "starter-kit-black-sky": { variantId: "" },
  "starter-kit-red-black": { variantId: "" },
  "starter-kit-red-black-doubles": { variantId: "" },

  // Balls
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
