"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────
   MediaMultiCol — large image left, heading + two-column body + CTA right.

   Minimal layout inspired by the Integrated Biosciences reference:
     • Image fills the left column
     • Heading animates word-by-word on scroll into view
     • Body is a two-column paragraph block
     • Rectangular CTA with rounded corners (no pill, no icon)

   Props:
     image        – src for the left image
     imageAlt     – alt text
     heading      – the big heading (word-by-word reveal)
     col1         – first paragraph (ReactNode)
     col2         – second paragraph (ReactNode)
     ctaLabel     – button text
     ctaHref      – button link
     ctaOnClick   – or click handler (optional, overrides href)
     reversed     – image on right instead of left
   ────────────────────────────────────────────────────────────────────────── */

interface MediaMultiColProps {
  image: string;
  imageAlt: string;
  heading: string;
  col1: ReactNode;
  col2: ReactNode;
  ctaLabel: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  reversed?: boolean;
}

function RevealHeading({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <h2
      className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-foreground"
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export function MediaMultiCol({
  image,
  imageAlt,
  heading,
  col1,
  col2,
  ctaLabel,
  ctaHref,
  ctaOnClick,
  reversed = false,
}: MediaMultiColProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-60px" });

  return (
    <section className="relative w-full bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`relative ${reversed ? "lg:order-2" : "lg:order-1"}`}
          >
            <div className="relative aspect-[5/4] w-full rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_rgba(0,20,40,0.12)]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <div
            ref={contentRef}
            className={`flex flex-col gap-6 sm:gap-7 ${reversed ? "lg:order-1" : "lg:order-2"}`}
          >
            <RevealHeading text={heading} />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7"
            >
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {col1}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {col2}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {ctaOnClick ? (
                <button
                  type="button"
                  onClick={ctaOnClick}
                  className="inline-flex items-center px-6 py-3 rounded-xl border border-foreground/15 text-foreground hover:bg-foreground/5 hover:border-foreground/30 text-sm font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {ctaLabel}
                </button>
              ) : (
                <a
                  href={ctaHref ?? "#"}
                  className="inline-flex items-center px-6 py-3 rounded-xl border border-foreground/15 text-foreground hover:bg-foreground/5 hover:border-foreground/30 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {ctaLabel}
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
