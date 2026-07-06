import { NextResponse } from "next/server";
import { UTEC_STORE_API_BASE, productDetailUrl } from "@/lib/store-config";

/**
 * GET /api/utec-store/products
 *
 * Server-side proxy to the UTEC Solutions eCommerce product API.
 * - Keeps the raw store API URL out of the client bundle.
 * - Avoids any browser CORS issues (server → server fetch).
 * - Caches the result for 10 minutes (Next.js segment cache).
 * - Returns a clean, minimal shape the frontend can render directly.
 */

export const revalidate = 600; // seconds — cache for 10 min

// ── Raw shapes from the upstream store API ──
interface StorePrice {
  origin_price?: number | null;
  discount_price?: number | null;
  currency?: { code?: string } | null;
}
interface StoreProduct {
  id: string;
  name: string;
  code?: string;
  description?: string;
  product_price?: StorePrice[];
  product_image?: { image_url?: string } | null;
}
interface StoreResponse {
  items?: StoreProduct[];
  total?: number;
  page?: number;
  size?: number;
  pages?: number;
}

// ── Clean shape returned to the client ──
export interface FeaturedProduct {
  id: string;
  name: string;
  code?: string;
  image: string | null;
  originPrice: number | null;
  discountPrice: number | null;
  currency: string;
  hasDiscount: boolean;
  /** Absolute URL to this product's detail page on the storefront. */
  url: string;
}

export async function GET() {
  const limit = 8;

  try {
    const res = await fetch(
      `${UTEC_STORE_API_BASE}/products?page=1&size=${limit}`,
      { next: { revalidate } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Store unavailable", products: [] },
        { status: 502 }
      );
    }

    const data: StoreResponse = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];

    const products: FeaturedProduct[] = items.map((p) => {
      const price = p.product_price?.[0];
      const origin =
        typeof price?.origin_price === "number" ? price.origin_price : null;
      const discount =
        typeof price?.discount_price === "number" ? price.discount_price : null;
      const hasDiscount =
        discount != null &&
        discount > 0 &&
        origin != null &&
        discount < origin;

      return {
        id: p.id,
        name: p.name,
        code: p.code,
        image: p.product_image?.image_url ?? null,
        originPrice: origin,
        discountPrice: hasDiscount ? discount : null,
        currency: price?.currency?.code || "USD",
        hasDiscount,
        url: productDetailUrl(p.id),
      };
    });

    return NextResponse.json(
      { products, total: data.total ?? products.length },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Store unreachable", products: [] },
      { status: 502 }
    );
  }
}
