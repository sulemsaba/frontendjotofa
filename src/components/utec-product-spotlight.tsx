"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
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
 * Level 1 (pre-admin) curated spotlight - REAL products from the UTEC store.
 *
 * "For now" (until the admin/CMS backend ships) these three Motorola MOTOTRBO
 * radios are hardcoded with their REAL images (served locally from /public so
 * they always render - the store's image URLs use a flaky ../shared_utils path
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
  const featured = index === 1;
  const origin = formatPrice(product.originPrice, product.currency);
  const discount = formatPrice(product.discountPrice, product.currency);

  return (
    <StaggerItem key={product.id}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 * index, duration: 0.5, ease: "easeOut" }}
        className={`group relative flex flex-col h-full md:pt-[240px] ${featured ? "md:z-10" : ""}`}
      >
        {/* Product image - pierces above the box on desktop; the middle card sits higher */}
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${product.name} on the UTEC store`}
          className={`relative block rounded-2xl overflow-hidden bg-secondary/40 border border-border transition-transform duration-300 group-hover:-translate-y-1 md:absolute md:left-0 md:right-0 ${
            featured ? "md:-top-[170px] md:scale-[1.03]" : "md:-top-[120px]"
          }`}
        >
          <div className="relative h-[260px] sm:h-[300px] md:h-[300px] lg:h-[340px] w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-[1.03]"
              priority={index === 1}
            />
          </div>

          {/* Discount badge */}
          {product.hasDiscount && product.originPrice && product.discountPrice && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-background/85 backdrop-blur text-foreground border border-border">
              -{Math.round((1 - product.discountPrice / product.originPrice) * 100)}%
            </span>
          )}
        </a>

        {/* Info */}
        <div className="flex flex-col flex-1 mt-5 md:mt-0">
          <h3
            className="text-base sm:text-lg font-semibold text-foreground leading-snug line-clamp-2 mb-2 min-h-[2.75rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap mb-5">
            {product.hasDiscount ? (
              <>
                <span className="text-xl font-bold text-foreground">{discount}</span>
                <span className="text-sm text-muted-foreground line-through">{origin}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-foreground">{origin ?? " "}</span>
            )}
          </div>

          {/* Deep-link CTA */}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-secondary text-foreground hover:bg-jotofa-navy hover:text-white transition-colors duration-300"
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-16 md:mb-36">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
            Product Spotlight
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A hand-picked selection from the UTEC Solutions online store. Click
            any item to view full details and purchase on the store.
          </p>
        </ScrollReveal>

        {/* The box - product images pierce above its top edge on desktop */}
        <div className="relative rounded-[2rem] border border-border bg-card px-5 sm:px-6 md:px-8 pt-6 md:pt-12 pb-6 md:pb-8">
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8"
            staggerDelay={0.1}
          >
            {products.map((p, i) => (
              <SpotlightCard key={p.id} product={p} index={i} />
            ))}
          </StaggerContainer>
        </div>

        {/* Browse-all CTA */}
        <div className="mt-12 text-center">
          <a
            href={storeProductsPageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-jotofa-navy hover:bg-jotofa-navy-deep text-white font-semibold rounded-full transition-colors"
          >
            Browse All Products <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
