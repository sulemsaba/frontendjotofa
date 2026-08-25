"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const suppressClickRef = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Sizing is derived from the viewport so the centre card always fits and the
  // neighbours peek by a fixed amount that is CLIPPED (never overflows the page).
  const [dims, setDims] = useState({ cardW: 300, cardH: 168, gap: 16, viewport: 360 });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      let cardW: number, gap: number, viewport: number;
      if (vw >= 1024) {
        // Desktop: three cards across the full width - neighbours fully visible.
        gap = 28;
        const available = Math.min(vw - 64, 1320);
        cardW = Math.max(320, Math.min(440, (available - 2 * gap) / 3));
        viewport = Math.round(cardW * 3 + gap * 2);
      } else if (vw >= 768) {
        // Tablet: centre card with partial neighbours peeking.
        gap = 22;
        const peek = 72;
        const available = Math.min(vw - 48, 920);
        cardW = Math.max(300, Math.min(440, available - 2 * gap - 2 * peek));
        viewport = Math.min(available, cardW + 2 * gap + 2 * peek);
      } else {
        // Mobile: centre card with clearly visible peek of the neighbours on
        // both sides (like the subsidiary offering carousel).
        gap = 12;
        const peek = 46;
        const available = vw - 32;
        cardW = Math.max(224, Math.min(348, available - 2 * gap - 2 * peek));
        viewport = Math.min(available, cardW + 2 * gap + 2 * peek);
      }
      const cardH = Math.round(cardW * 0.56);
      setDims({ cardW, cardH, gap, viewport });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent((index + testimonials.length) % testimonials.length);
    setDragX(0);
  }, [testimonials.length]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  const handleStart = useCallback((x: number) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    startXRef.current = x;
    currentXRef.current = x;
    setDragX(0);
    suppressClickRef.current = false;
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
    suppressClickRef.current = true;
    setTimeout(() => { suppressClickRef.current = false; }, 0);

    const threshold = dims.cardW * 0.15;
    if (dragX > threshold) {
      goPrev();
    } else if (dragX < -threshold) {
      goNext();
    } else {
      setDragX(0);
    }
  }, [isDragging, dragX, goNext, goPrev, dims.cardW]);

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

  // Mouse-wheel / touchpad: horizontal-intent scrolling navigates the carousel
  // (vertical scroll is left to the page). One gesture = one step.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lock = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (lock) return;
      lock = true;
      setIsAutoPlaying(false);
      if (e.deltaX > 0) goNext();
      else goPrev();
      window.setTimeout(() => { lock = false; }, 450);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;
    autoplayRef.current = setInterval(() => {
      goNext();
    }, 7000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isAutoPlaying, testimonials.length, goNext]);

  const handleMouseEnter = useCallback(() => setIsAutoPlaying(false), []);
  const handleMouseLeave = useCallback(() => setIsAutoPlaying(true), []);

  const cardWidthWithGap = dims.cardW + dims.gap;

  // Circular offset per card so both neighbours always peek (looping carousel).
  const offsets = useMemo(() => {
    const n = testimonials.length;
    return testimonials.map((_, i) => {
      let o = i - current;
      if (n > 1) {
        if (o > n / 2) o -= n;
        else if (o < -n / 2) o += n;
      }
      return o;
    });
  }, [current, testimonials]);

  // Remember each card's previous offset. On a loop, exactly one card jumps to
  // the opposite side (offset change > 1); that card should TELEPORT there, not
  // slide across the whole width - which was the weird auto-scroll animation.
  const prevOffsetsRef = useRef<number[]>([]);
  useEffect(() => {
    prevOffsetsRef.current = offsets;
  }, [offsets]);

  const cardStyles = useMemo(() => {
    const styles: Record<number, React.CSSProperties> = {};
    const prev = prevOffsetsRef.current;
    testimonials.forEach((_, i) => {
      const offset = offsets[i];
      const absOffset = Math.abs(offset);
      const isCenter = offset === 0;
      const prevOffset = prev[i] ?? offset;
      const isWrapping = Math.abs(offset - prevOffset) > 1;
      const baseX = offset * cardWidthWithGap;
      const dragAdjustment = isDragging ? dragX : 0;
      const scale = isCenter ? 1 : 0.92;
      const translateX = baseX + dragAdjustment;
      const zIndex = isCenter ? 100 : 90 - absOffset;
      const opacity = isDragging
        ? absOffset === 0 ? 1 : absOffset === 1 ? 0.7 : 0
        : isCenter ? 1 : absOffset === 1 ? 0.65 : 0;
      const pointerEvents = isDragging ? "none" : isCenter ? "auto" : "none";
      const willChange = absOffset <= 1 ? "transform, opacity" : "auto";

      styles[i] = {
        width: dims.cardW,
        height: dims.cardH,
        transform: `translate(calc(-50% + ${translateX}px), -50%) scale(${scale})`,
        zIndex,
        opacity,
        pointerEvents,
        transition:
          isDragging || isWrapping
            ? "none"
            : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease, z-index 0s",
        willChange,
        cursor: isDragging ? "grabbing" : "pointer",
      };
    });
    return styles;
  }, [offsets, dragX, isDragging, dims.cardW, dims.cardH, cardWidthWithGap, testimonials]);

  const containerMaxWidth = dims.viewport;

  const imageSizes = useMemo(() => {
    return `(max-width: 768px) 368px, (max-width: 1024px) 420px, 480px`;
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="relative py-12 sm:py-16" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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

        <div
          ref={containerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ maxWidth: containerMaxWidth, margin: "0 auto", touchAction: "pan-y pinch-zoom" }}
        >
          <div className="relative flex justify-center items-center overflow-hidden" style={{ height: dims.cardH + 32 }}>
            <div
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >
              {testimonials[current]?.company && `Testimonial ${current + 1} of ${testimonials.length}: ${testimonials[current].company}`}
            </div>

            {testimonials.map((t, i) => {
              const offset = offsets[i];
              const isCenter = offset === 0;
              const style = cardStyles[i];

              return (
                <div
                  key={`${t.name}-${t.company}-${i}`}
                  className="absolute left-1/2 top-1/2 rounded-[20px] overflow-hidden"
                  style={style}
                  onClick={() => !suppressClickRef.current && goTo(i)}
                  role="tab"
                  aria-selected={isCenter}
                  aria-label={`${t.name}, ${t.company}`}
                  tabIndex={isCenter ? 0 : -1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") goTo(i);
                  }}
                >
                  <div className="absolute inset-0 bg-jotofa-navy-deep">
                    <Image
                      src={`/images/showcase/${t.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}.jpg`}
                      alt=""
                      fill
                      sizes={imageSizes}
                      className="object-cover opacity-80"
                      priority={isCenter}
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-jotofa-navy via-jotofa-navy-deep to-jotofa-navy opacity-100" />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))",
                    }}
                  />

                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="text-white text-base sm:text-lg font-medium leading-snug line-clamp-3">
                      &ldquo;{t.quote}&rdquo;
                    </div>

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

        <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((t, i) => (
            <button
              key={`${t.name}-${t.company}-dot-${i}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}: ${t.name}`}
              aria-selected={i === current}
              role="tab"
              className="group/dot"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 h-3 bg-jotofa-navy dark:bg-white"
                    : "w-3 h-3 bg-jotofa-navy/25 dark:bg-white/25 group-hover/dot:bg-jotofa-navy/50 dark:group-hover/dot:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}