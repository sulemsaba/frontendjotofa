/**
 * UTEC Solutions — online store configuration.
 *
 * The UTEC subsidiary runs its own eCommerce storefront (laptops, radios,
 * accessories, networking gear, etc.). This module is the SINGLE source of
 * truth for the store's URLs across the whole JOTOFA site, so when the store
 * moves from the staging/test server to its production domain + HTTPS, you
 * only need to change the values here (or set the env vars).
 *
 * Env vars (optional overrides):
 *   NEXT_PUBLIC_UTEC_STORE_FRONTEND_URL  – the storefront base URL (public, used for links)
 *   UTEC_STORE_API_URL                   – the product API base URL (server-only)
 */

// Storefront base URL — public (exposed to the client so we can build links).
export const UTEC_STORE_FRONTEND_URL = (
  process.env.NEXT_PUBLIC_UTEC_STORE_FRONTEND_URL || "http://13.140.149.214:3005"
).replace(/\/$/, "");

// Product API base URL — server-only (never prefix with NEXT_PUBLIC_).
const UTEC_STORE_API_URL = (
  process.env.UTEC_STORE_API_URL || "http://13.140.149.214:8001"
).replace(/\/$/, "");

/** Deep-link to a specific product's detail page on the storefront. */
export function productDetailUrl(productId: string): string {
  return `${UTEC_STORE_FRONTEND_URL}/product/${productId}`;
}

/** Link to the store's "all products" listing page. */
export function storeProductsPageUrl(): string {
  return `${UTEC_STORE_FRONTEND_URL}/products`;
}

/** Link to the store's home page. */
export function storeHomeUrl(): string {
  return UTEC_STORE_FRONTEND_URL;
}

/** Server-only: backend product API base (consumed by the API route). */
export const UTEC_STORE_API_BASE = UTEC_STORE_API_URL;
