"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ShoppingBag, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { storeProductsPageUrl } from "@/lib/store-config";

interface FeaturedProduct {
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

function ProductCard({ product, index }: { product: FeaturedProduct; index: number }) {
  const origin = formatPrice(product.originPrice, product.currency);
  const discount = formatPrice(product.discountPrice, product.currency);

  return (
    <StaggerItem key={product.id}>
      <motion.a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * index, duration: 0.4 }}
        whileHover={{ y: -4 }}
        className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-utec-cyan/40 hover:shadow-lg transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-square bg-secondary/40 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
            </div>
          )}

          {/* Discount badge */}
          {product.hasDiscount && product.originPrice && product.discountPrice && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-utec-cyan text-white shadow">
              -
              {Math.round(
                (1 - product.discountPrice / product.originPrice) * 100
              )}
              %
            </span>
          )}

          {/* External link affordance */}
          <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-4 h-4 text-utec-cyan" />
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-4">
          <h3
            className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-2 min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          <div className="mt-auto flex items-baseline gap-2 flex-wrap">
            {product.hasDiscount ? (
              <>
                <span className="text-base font-bold text-utec-cyan">
                  {discount}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  {origin}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-foreground">
                {origin ?? "—"}
              </span>
            )}
          </div>
        </div>
      </motion.a>
    </StaggerItem>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden">
      <div className="aspect-square bg-secondary/40 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-secondary rounded animate-pulse w-5/6" />
        <div className="h-4 bg-secondary rounded animate-pulse w-3/4" />
        <div className="h-5 bg-secondary/70 rounded animate-pulse w-1/3 mt-3" />
      </div>
    </div>
  );
}

export function UtecFeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/utec-store/products", {
          cache: "no-store",
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.products?.length) {
          setStatus("error");
          return;
        }
        setProducts(data.products);
        setStatus("success");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative py-20 sm:py-24">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-utec-cyan/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-utec-cyan/20 bg-utec-cyan/5 mb-5">
            <ShoppingBag className="w-4 h-4 text-utec-cyan" />
            <span className="text-utec-cyan text-sm font-medium">
              UTEC Online Store
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
            Featured <span className="text-utec-cyan">Products</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of radios, networking gear, and ICT equipment available
            now in the UTEC Solutions online store. Prices update live from the
            store — click any product to view full details and purchase.
          </p>
        </ScrollReveal>

        {/* Grid */}
        {status === "loading" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {status === "success" && (
          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            staggerDelay={0.06}
          >
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </StaggerContainer>
        )}

        {status === "error" && (
          <div className="max-w-xl mx-auto p-8 rounded-2xl border border-border bg-card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-utec-cyan/10 mb-4">
              <AlertCircle className="w-6 h-6 text-utec-cyan" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Store preview unavailable
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              We couldn&apos;t load the live product feed right now. You can
              still browse the full UTEC Solutions store directly.
            </p>
            <a
              href={storeProductsPageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-utec-cyan/10 border border-utec-cyan/25 text-utec-cyan hover:bg-utec-cyan/20 rounded-full text-sm font-medium transition-all"
            >
              Visit Store <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Browse-all CTA */}
        {status !== "error" && (
          <div className="mt-12 text-center">
            <a
              href={storeProductsPageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-utec-cyan hover:bg-utec-cyan/90 text-white font-semibold rounded-full transition-all"
            >
              Browse All Products <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
