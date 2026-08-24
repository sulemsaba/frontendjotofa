"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import type { Testimonial } from "@/lib/testimonials-data";

interface TestimonialSliderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function TestimonialSlider({
  eyebrow = "Client Voices",
  title,
  subtitle,
  testimonials,
}: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const [cardSize, setCardSize] = useState({ width: 368, height: 207 });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardSize({ width: 480, height: 280 });
      } else if (width >= 768) {
        setCardSize({ width: 420, height: 235 });
      } else {
        setCardSize({ width: 368, height: 207 });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent((index + testimonials.length) % testimonials.length);
    setDragX(0);
  }, [testimonials.length]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  const handleStart = useCallback((x: number) => {
    setIsDragging(true);
    startXRef.current = x;
    currentXRef.current = x;
    setDragX(0);
  }, []);

  const handleMove = useCallback((x: number) => {
    if (!isDragging) return;
    currentXRef.current = x;
    const delta = x - startXRef.current;
    setDragX(delta);
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    if (dragX > threshold) {
      goPrev();
    } else if (dragX < -threshold) {
      goNext();
    } else {
      setDragX(0);
    }
  }, [isDragging, dragX, goNext, goPrev]);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  }, [handleStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  }, [handleStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  if (!testimonials.length) return null;

  return (
    <section className="relative py-12 sm:py-16">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-accent/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-10 sm:mb-14">
          {eyebrow && (
            <div className="text-xs font-semibold uppercase tracking-widest text-jotofa-accent mb-3">
              {eyebrow}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              {subtitle}
            </p>
          )}
        </ScrollReveal>

        {/* Slider viewport */}
        <div
          ref={containerRef}
          className="relative mx-auto flex justify-center items-center select-none"
          style={{ maxWidth: cardSize.width + 100, touchAction: "pan-y" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          <div className="relative flex justify-center items-center" style={{ height: cardSize.height + 32 }}>
            {testimonials.map((t, i) => {
              const offset = i - current;
              const isCenter = offset === 0;
              const absOffset = Math.abs(offset);

              // During drag, shift all cards by the drag amount
              const dragOffset = isDragging ? dragX : 0;
              const cardOffset = `${cardSize.width}px`;
              const baseTransform = isCenter
                ? "translate(-50%, -50%)"
                : offset < 0
                  ? `translate(-50%, -50%) translateX(calc(-100% - ${cardOffset})) scale(0.92)`
                  : `translate(-50%, -50%) translateX(calc(100% + ${cardOffset})) scale(0.92)`;

              // Append drag offset to the transform
              const transform = isDragging
                ? baseTransform
                    .replace(`calc(-100% - ${cardSize.width}px)`, `calc(-100% - ${cardSize.width}px + ${dragOffset}px)`)
                    .replace(`calc(100% + ${cardSize.width}px)`, `calc(100% + ${cardSize.width}px + ${dragOffset}px)`)
                    .replace("translate(-50%, -50%)", `translate(calc(-50% + ${dragOffset}px), -50%)`)
                : baseTransform;

              const zIndex = isCenter ? 100 : 90;
              const opacity = isDragging ? (absOffset === 0 ? 1 : absOffset === 1 ? 0.6 : 0) : (isCenter ? 1 : absOffset === 1 ? 0.5 : 0);
              const pointerEvents = isDragging ? "none" : (isCenter ? "auto" : "none");

              return (
                <div
                  key={`${t.name}-${t.company}-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-[20px] overflow-hidden"
                  style={{
                    width: cardSize.width,
                    height: cardSize.height,
                    transform,
                    zIndex,
                    opacity,
                    pointerEvents,
                    transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, z-index 0s",
                    willChange: "transform, opacity",
                    cursor: isDragging ? "grabbing" : "pointer",
                  }}
                  onClick={() => !isDragging && goTo(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") goTo(i);
                  }}
                  aria-label={`${t.name}, ${t.company}`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0 bg-jotofa-navy-deep">
                    <Image
                      src={`/images/showcase/${t.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}.jpg`}
                      alt=""
                      fill
                      sizes={`${cardSize.width}px`}
                      className="object-cover opacity-80"
                    />
                  </div>

                  {/* Fallback gradient when image is missing */}
                  <div className="absolute inset-0 bg-gradient-to-br from-jotofa-navy via-jotofa-navy-deep to-jotofa-navy opacity-100 md:hidden" />

                  {/* Gradient overlay - exact from reference */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))",
                    }}
                  />

                  {/* Text content - bottom aligned, max-width 22rem */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    {/* Title at top */}
                    <div className="text-white text-base sm:text-lg font-medium leading-snug line-clamp-2">
                      &ldquo;{t.quote.slice(0, 120)}{t.quote.length > 120 ? "..." : ""}&rdquo;
                    </div>

                    {/* Bottom: company + read case study link */}
                    <div>
                      <div className="text-white font-semibold text-sm mb-1.5">
                        {t.company}
                      </div>
                      <div className="flex items-center gap-2 text-white/90 text-sm font-medium group/link cursor-pointer">
                        <span>Read case study</span>
                        <span className="relative flex items-center">
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((t, i) => (
            <button
              key={`${t.name}-${t.company}-dot-${i}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
              className="group/dot"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-jotofa-navy dark:bg-white"
                    : "w-2 h-2 bg-jotofa-navy/25 dark:bg-white/25 group-hover/dot:bg-jotofa-navy/50 dark:group-hover/dot:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
