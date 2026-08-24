import { NextResponse } from "next/server";
import { UTEC_STORE_API_BASE, productDetailUrl } from "@/lib/store-config";

/**
 * GET /api/utec-store/catalog
 *
 * Returns the UTEC store catalog grouped into three product families so the
 * UTEC page can render a 3-row "repeater" showcase (Repeaters / Mobile Radios /
 * Portables) - each row pulling REAL products from the live store with REAL
 * prices, images, and deep-links to each product's detail page.
 *
 * - Server-side proxy (keeps the raw store API URL out of the client bundle).
 * - Categorizes by product name keyword (the store API exposes category_id but
 *   not category name; name-based matching is reliable for the MOTOTRBO line).
 * - Normalizes image URLs (encodes spaces) so they load reliably in browsers.
 * - The store API is slow (~5s) and sometimes flaky, so this route is fully
 *   dynamic (revalidate = 0), uses cache: "no-store", and an explicit 12s
 *   timeout so a hung upstream can't wedge the route.
 */

export const revalidate = 0; // always dynamic - the store API is slow/flaky
export const dynamic = "force-dynamic";

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
export interface CatalogProduct {
  id: string;
  name: string;
  code?: string;
  image: string | null;
  originPrice: number | null;
  discountPrice: number | null;
  currency: string;
  hasDiscount: boolean;
  url: string;
}

export interface CatalogRow {
  key: string;
  label: string;
  blurb: string;
  products: CatalogProduct[];
}

/** Encode spaces (and other unsafe chars) in the store's image URLs so they
 *  load reliably in <img src>. The store returns raw paths with literal spaces
 *  like ".../image-removebg-preview (5).png". */
function normalizeImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    // encodeURI keeps http:// and / intact but encodes spaces and parens.
    return encodeURI(url);
  } catch {
    return url;
  }
}

function mapProduct(p: StoreProduct): CatalogProduct {
  const price = p.product_price?.[0];
  const origin =
    typeof price?.origin_price === "number" ? price.origin_price : null;
  const discount =
    typeof price?.discount_price === "number" ? price.discount_price : null;
  const hasDiscount =
    discount != null && discount > 0 && origin != null && discount < origin;

  return {
    id: p.id,
    name: p.name,
    code: p.code,
    image: normalizeImageUrl(p.product_image?.image_url),
    originPrice: origin,
    discountPrice: hasDiscount ? discount : null,
    currency: price?.currency?.code || "USD",
    hasDiscount,
    url: productDetailUrl(p.id),
  };
}

/** Categorize a product by its name. The MOTOTRBO lineup follows predictable
 *  naming: "Repeater", "Mobile Radio", and "Portable" / "Portables". */
function categorize(name: string): "repeaters" | "mobile" | "portables" | null {
  const n = name.toLowerCase();
  if (n.includes("repeater")) return "repeaters";
  if (n.includes("mobile")) return "mobile";
  if (n.includes("portable") || n.includes("portables")) return "portables";
  return null;
}

export async function GET() {
  const perRow = 4;

  try {
    // Fetch a large enough page to fill all three rows after categorization.
    const res = await fetch(
      `${UTEC_STORE_API_BASE}/products?page=1&size=80`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(12000),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Store unavailable", rows: [] },
        { status: 502 }
      );
    }

    const data: StoreResponse = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];

    // Bucket products by family, preserving store order.
    const buckets: Record<
      "repeaters" | "mobile" | "portables",
      CatalogProduct[]
    > = { repeaters: [], mobile: [], portables: [] };

    for (const p of items) {
      const cat = categorize(p.name);
      if (!cat) continue;
      if (buckets[cat].length >= perRow) continue;
      buckets[cat].push(mapProduct(p));
    }

    const rows: CatalogRow[] = [
      {
        key: "repeaters",
        label: "Repeaters",
        blurb:
          "Site infrastructure that extends coverage across campuses, cities, and remote sites.",
        products: buckets.repeaters,
      },
      {
        key: "mobile",
        label: "Mobile Radios",
        blurb:
          "Vehicle-mounted radios built for fleet, logistics, and field operations.",
        products: buckets.mobile,
      },
      {
        key: "portables",
        label: "Portable Radios",
        blurb:
          "Handhelds for teams on the move - rugged, voice-clear, and field-ready.",
        products: buckets.portables,
      },
    ];

    return NextResponse.json({ rows, total: items.length }, { status: 200 });
  } catch (err) {
    // Surface the error reason so failures are diagnosable. The client shows a
    // graceful fallback card when rows come back empty.
    const reason =
      err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    console.error("[utec-store/catalog] fetch failed:", reason);
    return NextResponse.json(
      { error: "Store unreachable", reason, rows: [] },
      { status: 502 }
    );
  }
}
