"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Star,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { storeProductsPageUrl, productDetailUrl } from "@/lib/store-config";

interface FeaturedProduct {
  id: string;
  name: string;
  code?: string;
  image: string;
  originPrice: number | null;
  discountPrice: number | null;
  currency: string;
  hasDiscount: boolean;
  url: string;
}

/**
 * Level 1 (pre-admin) curated spotlight — REAL products from the UTEC store.
 *
 * "For now" (until the admin/CMS backend ships) these three Motorola MOTOTRBO
 * radios are hardcoded with their REAL images (served locally from /public so
 * they always render — the store's image URLs use a flaky ../shared_utils path
 * with spaces), REAL USD prices, and REAL deep-links to each product page on
 * the store. When the admin backend is ready, replace this constant with a
 * fetch from the managed spotlight table; the component below stays the same.
 */
const SPOTLIGHT_PRODUCTS: FeaturedProduct[] = [
  {
    id: "ea507f03-f2d0-4f73-b7c5-821ef4838e33",
    name: "MOTOTRBO R5 VHF NKP Portable Radio",
    code: "PDA502A",
    image: "/images/utec-products/mototrbo-r5-vhf.png",
    originPrice: 540,
    discountPrice: 527,
    currency: "USD",
    hasDiscount: true,
    url: productDetailUrl("ea507f03-f2d0-4f73-b7c5-821ef4838e33"),
  },
  {
    id: "c97ab2e0-8f47-4409-ade7-2e2219fcb1fb",
    name: "MOTOTRBO R5 UHF1 NKP Portable Radio",
    code: "PDA502C",
    image: "/images/utec-products/mototrbo-r5-uhf.png",
    originPrice: 540,
    discountPrice: 527,
    currency: "USD",
    hasDiscount: true,
    url: productDetailUrl("c97ab2e0-8f47-4409-ade7-2e2219fcb1fb"),
  },
  {
    id: "639afb07-78b3-4db1-817f-e27e1088f36c",
    name: "MOTOTRBO R7Ex ATEX IIA FKP Radio",
    code: "PZA402HEEx",
    image: "/images/utec-products/mototrbo-r7ex.png",
    originPrice: 2312.5,
    discountPrice: 1850,
    currency: "USD",
    hasDiscount: true,
    url: productDetailUrl("639afb07-78b3-4db1-817f-e27e1088f36c"),
  },
];

type AccentKey = "emerald" | "cyan" | "amber";

interface EditorialSlot {
  tag: string;
  icon: typeof Star;
  accent: AccentKey;
  comment: string;
  featured?: boolean;
}

/**
 * Level 1 (pre-admin) editorial framing for the three spotlight slots.
 *
 * These are deliberately written as editorial *lenses* (how we frame a product)
 * rather than claims about specific product specs, so they stay honest no matter
 * which live products land in each slot. When the admin/CMS backend ships, these
 * can be managed per-product and this constant becomes seed data.
 */
const editorialSlots: EditorialSlot[] = [
  {
    tag: "Staff Favorite",
    icon: Award,
    accent: "emerald",
    comment:
      "The dependable workhorse our enterprise clients reach for first - proven in the field, day after day.",
  },
  {
    tag: "Editor's Choice",
    icon: Star,
    accent: "cyan",
    featured: true,
    comment:
      "Our spotlight pick this month. The rare balance of capability, value, and real-world readiness that earns the top spot.",
  },
  {
    tag: "Smart Buy",
    icon: TrendingUp,
    accent: "amber",
    comment:
      "Strong value without compromise - a sensible choice for teams scaling up their fleet.",
  },
];

const accentMap: Record<
  AccentKey,
  {
    text: string;
    bg: string;
    border: string;
    ring: string;
    soft: string;
    dot: string;
    groupHoverRing: string;
  }
> = {
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500",
    border: "border-emerald-500/30",
    ring: "ring-emerald-500/40",
    soft: "bg-emerald-500/10",
    dot: "bg-emerald-500",
    groupHoverRing: "group-hover:ring-emerald-500/50",
  },
  cyan: {
    text: "text-utec-cyan",
    bg: "bg-utec-cyan",
    border: "border-utec-cyan/40",
    ring: "ring-utec-cyan/50",
    soft: "bg-utec-cyan/10",
    dot: "bg-utec-cyan",
    groupHoverRing: "group-hover:ring-utec-cyan/60",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500",
    border: "border-amber-500/30",
    ring: "ring-amber-500/40",
    soft: "bg-amber-500/10",
    dot: "bg-amber-500",
    groupHoverRing: "group-hover:ring-amber-500/50",
  },
};

function formatPrice(value: number | null, currency: string): string | null {
  if (value == null) return null;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value}`;
  }
}

function SpotlightCard({
  product,
  index,
}: {
  product: FeaturedProduct;
  index: number;
}) {
  const slot = editorialSlots[index] ?? editorialSlots[0];
  const accent = accentMap[slot.accent];
  const featured = !!slot.featured;
  const origin = formatPrice(product.originPrice, product.currency);
  const discount = formatPrice(product.discountPrice, product.currency);
  const TagIcon = slot.icon;

  return (
    <StaggerItem key={product.id}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 * index, duration: 0.5, ease: "easeOut" }}
        className={`group relative flex flex-col h-full md:pt-[240px] ${
          featured ? "md:z-10" : ""
        }`}
      >
        {/* ───────── UPPER PART — product image, pierces ABOVE the box on desktop ─────────
            On mobile the image is in normal flow (no pierce). On md+ it is absolutely
            positioned with a negative top so it breaks out above the box's top border
            (the "outside the box" upper part). The featured (middle) card pierces higher.
            The article's md:pt-[150px] reserves the vertical space the absolute image
            occupies so the LOWER-part info below stays aligned across all three columns. */}
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${product.name} on the UTEC store`}
          className={`relative block rounded-2xl overflow-hidden bg-gradient-to-b from-secondary/50 to-secondary/20 ring-1 transition-all duration-300 md:absolute md:left-0 md:right-0 ${
            featured
              ? `md:-top-[170px] ring-utec-cyan/50 shadow-[0_20px_50px_-12px_rgba(0,169,183,0.35)] md:shadow-[0_30px_60px_-15px_rgba(0,169,183,0.45)] md:scale-[1.03]`
              : `md:-top-[120px] ring-border ${accent.groupHoverRing} group-hover:shadow-xl`
          } group-hover:-translate-y-1`}
        >
          {/* Image area — fixed height so the pierce math is predictable */}
          <div className="relative h-[260px] sm:h-[300px] md:h-[300px] lg:h-[340px] w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-105"
              priority={index === 1}
            />
          </div>

          {/* Editorial tag badge (top-left) */}
          <span
            className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-sm ${accent.bg}`}
          >
            <TagIcon className="w-3 h-3" />
            {slot.tag}
          </span>

          {/* Discount badge (top-right) */}
          {product.hasDiscount && product.originPrice && product.discountPrice && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-background/85 backdrop-blur text-foreground border border-border shadow-sm">
              -{Math.round((1 - product.discountPrice / product.originPrice) * 100)}%
            </span>
          )}

          {/* External-link affordance */}
          <span
            className={`absolute bottom-3 right-3 w-8 h-8 rounded-full ${accent.soft} backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          >
            <ExternalLink className={`w-4 h-4 ${accent.text}`} />
          </span>
        </a>

        {/* ───────── LOWER PART — info + editorial comment, INSIDE the box ───────── */}
        <div className="flex flex-col flex-1 mt-5 md:mt-0">
          <h3
            className="text-base sm:text-lg font-semibold text-foreground leading-snug line-clamp-2 mb-2 min-h-[2.75rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap mb-4">
            {product.hasDiscount ? (
              <>
                <span className={`text-xl font-bold ${accent.text}`}>{discount}</span>
                <span className="text-sm text-muted-foreground line-through">{origin}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-foreground">{origin ?? "—"}</span>
            )}
          </div>

          {/* Editorial comment — plain text, no quote styling */}
          <div className={`relative rounded-xl ${accent.soft} ${accent.border} border p-3.5 mb-4`}>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {slot.comment}
            </p>
          </div>

          {/* Deep-link CTA */}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              featured
                ? "bg-utec-cyan text-white hover:bg-utec-cyan/90 hover:shadow-lg hover:shadow-utec-cyan/25"
                : "bg-secondary text-foreground hover:bg-secondary/70"
            }`}
          >
            View Product
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export function UtecProductSpotlight() {
  const products = SPOTLIGHT_PRODUCTS;

  return (
    <section className="relative py-20 sm:py-24">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-utec-cyan/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16 md:mb-36">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-utec-cyan/20 bg-utec-cyan/5 mb-5">
            <Sparkles className="w-4 h-4 text-utec-cyan" />
            <span className="text-utec-cyan text-sm font-medium">Curated by UTEC</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
            Product <span className="text-utec-cyan">Spotlight</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A hand-picked selection from the UTEC Solutions online store — each
            product framed with an editorial take from our team. Click any item to
            view full details and purchase on the store.
          </p>
        </ScrollReveal>

        {/* ───────── THE BOX ─────────
            Product IMAGES (upper part) pierce ABOVE the box's top border on desktop
            ("outside the box"); the LOWER part of the box holds every product's info
            (name, price, editorial comment, deep-link CTA). The middle card is the
            featured "Editor's Choice" — it breaks out higher, with an accent ring,
            shadow, and slight scale. */}
        <div className="relative">
          {/* Soft glow behind the featured (middle) card */}
          <div
            aria-hidden
            className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[420px] h-[420px] bg-utec-cyan/10 rounded-full blur-[120px] pointer-events-none"
          />
          <div className="relative rounded-[2rem] border border-border bg-card overflow-visible px-5 sm:px-6 md:px-8 pt-6 md:pt-12 pb-6 md:pb-8 shadow-sm">
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8"
              staggerDelay={0.1}
            >
              {products.map((p, i) => (
                <SpotlightCard key={p.id} product={p} index={i} />
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Browse-all CTA */}
        <div className="mt-12 text-center">
          <a
            href={storeProductsPageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-utec-cyan hover:bg-utec-cyan/90 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-utec-cyan/25"
          >
            Browse All Products <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
