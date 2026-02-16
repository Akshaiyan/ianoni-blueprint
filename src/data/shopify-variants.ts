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
  "pr8100-red-black": { variantId: "gid://shopify/ProductVariant/53330880758087" },
  "pr8100-blue-pink": { variantId: "gid://shopify/ProductVariant/53330883150151" },
  "pr8100-blue-orange": { variantId: "gid://shopify/ProductVariant/53330884559175" },

  // PR8200 Rackets
  "pr8200-blue-stripe": { variantId: "gid://shopify/ProductVariant/53330884723015" },
  "pr8200-grey-stripe": { variantId: "gid://shopify/ProductVariant/53330884788551" },
  "super-power-pink": { variantId: "gid://shopify/ProductVariant/53330884821319" },

  // Starter Kits
  "starter-kit-blue-orange": { variantId: "gid://shopify/ProductVariant/53330885050695" },
  "starter-kit-blue-pink": { variantId: "gid://shopify/ProductVariant/53330885116231" },
  "starter-kit-black-sky": { variantId: "gid://shopify/ProductVariant/53330885148999" },
  "starter-kit-red-black": { variantId: "gid://shopify/ProductVariant/53330885214535" },
  "starter-kit-red-black-doubles": { variantId: "gid://shopify/ProductVariant/53330885443911" },

  // Balls
  "ianoni-pro-padel-balls": { variantId: "gid://shopify/ProductVariant/53330885738823" },
  "ianoni-pro-s-padel-balls": { variantId: "gid://shopify/ProductVariant/53330885771591" },
  "ianoni-pro-padel-balls-3pack": { variantId: "gid://shopify/ProductVariant/53330885804359" },
  "ianoni-pro-s-padel-balls-3pack": { variantId: "gid://shopify/ProductVariant/53330892915015" },
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
