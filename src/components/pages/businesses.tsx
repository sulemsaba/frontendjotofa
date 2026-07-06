"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView, animate } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Building2,
  Users,
  Globe2,
  Award,
  Monitor,
  Truck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/scroll-reveal";
import { PageId } from "@/lib/page-context";
import { storeProductsPageUrl } from "@/lib/store-config";

/* ──────────────────────────────────────────────────────────────────────────
   "Our Businesses" — premium holding-company directory page.

   Layout (top → bottom):
     1. Hero banner  — bold headline "Diversified Expertise. Shared Values."
     2. Directory    — 5 IDENTICAL, equal-sized container cards. Each card:
                         • company logo (real logo for UTEC, monogram mark
                           for the rest) on a soft branded zone
                         • sector badge tags (ICT / Telecom / Cloud, etc.)
                         • concise TWO-sentence value proposition
                         • high-contrast primary outbound button labelled
                           "Visit Website" (UTEC store) or "Explore Entity"
     3. Group impact — massive aggregate data counters band (5+ Subsidiaries,
                       12,000+ Employees, 50+ Global Offices, 25+ Years) with
                       scroll-triggered count-up animation
     4. Footer       — already global; CTA band at top captures investor /
                       partner / job-seeker inquiries

   Brand palette ONLY: JOTOFA navy + teal. Theme-aware (light + dark).
   ────────────────────────────────────────────────────────────────────────── */

interface Business {
  id: PageId;
  name: string;
  sectors: string[];
  /** Concise two-sentence value proposition */
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Real logo (UTEC) — if absent, falls back to a styled monogram mark */
  logoSrc?: string;
  /** 2-letter monogram used when no real logo asset exists */
  logoMark: string;
  /** Outbound link (UTEC store). If absent, card button routes internally */
  website?: { label: string; url: string };
}

const businesses: Business[] = [
  {
    id: "utec",
    name: "UTEC Solutions",
    sectors: ["ICT", "Telecom", "Cloud"],
    description:
      "Cutting-edge ICT infrastructure, telecommunications, and digital transformation services for modern enterprises. We connect businesses and communities across Tanzania with reliable, scalable technology.",
    icon: Monitor,
    logoSrc: "/images/utec-logo.png",
    logoMark: "UT",
    website: { label: "Visit Website", url: storeProductsPageUrl() },
  },
  {
    id: "courier",
    name: "Courier & Logistics",
    sectors: ["Logistics", "Freight", "Last-Mile"],
    description:
      "A trusted logistics and courier network ensuring timely, secure delivery of goods and documents. We operate across Tanzania and East Africa with end-to-end tracking and last-mile coverage.",
    icon: Truck,
    logoMark: "JC",
  },
  {
    id: "cleaning",
    name: "Cleaning & Maids",
    sectors: ["Facilities", "Hygiene", "Maintenance"],
    description:
      "Premium cleaning and housekeeping for commercial, residential, and industrial spaces. We deliver hygiene and pristine environments through trained, supervised crews.",
    icon: Sparkles,
    logoMark: "JM",
  },
  {
    id: "security",
    name: "JOTOFA Security",
    sectors: ["Security", "Surveillance", "Risk"],
    description:
      "Robust security services from manned guarding to electronic surveillance. We protect people, assets, and operations with integrity and round-the-clock vigilance.",
    icon: ShieldCheck,
    logoMark: "JS",
  },
  {
    id: "staffing",
    name: "Staffing & Labour",
    sectors: ["Recruitment", "HR", "Workforce"],
    description:
      "Connecting talent with opportunity across skilled and semi-skilled labour supply. We handle recruitment, payroll, and workforce management for industries nationwide.",
    icon: Users,
    logoMark: "JT",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   Counter — scroll-triggered count-up animation.
   Animates from 0 → target the first time it scrolls into view.
   ────────────────────────────────────────────────────────────────────────── */
function Counter({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   1. HERO BANNER
   ────────────────────────────────────────────────────────────────────────── */
function BusinessesHero() {
  return (
    <section className="relative overflow-hidden bg-[#F4FAFC] dark:bg-jotofa-navy-mid py-24 sm:py-32">
      {/* Background layers */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-white via-[#F4FAFC] to-[#E6F4F6] dark:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-jotofa-navy-mid via-jotofa-navy to-jotofa-navy-deep hidden dark:block"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-25"
      />
      {/* Teal glow — top right */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A9B7]/15 dark:bg-jotofa-accent/10 rounded-full blur-[140px] pointer-events-none"
      />
      {/* Navy glow — bottom left (light mode) */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#003B64]/8 dark:hidden rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-4xl mx-auto">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-jotofa-accent/30 bg-jotofa-accent/10 backdrop-blur-sm mb-6">
            <Building2 className="w-3.5 h-3.5 text-jotofa-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-jotofa-accent">
              Our Businesses
            </span>
          </div>

          {/* Bold headline — "Diversified Expertise. Shared Values." */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-jotofa-navy dark:text-white leading-[1.05] mb-6">
            Diversified Expertise.
            <br />
            <span className="text-gold-gradient">Shared Values.</span>
          </h1>

          {/* Mission subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#5E6A75] dark:text-white/75 leading-relaxed mb-10">
            JOTOFA Group unites five specialized subsidiaries under one
            corporate umbrella — each an independent leader in its sector, all
            bound by the same commitment to quality, integrity, and lasting
            impact across Tanzania and East Africa.
          </p>

          {/* Mini stats bar */}
          <div className="inline-flex items-center gap-3 sm:gap-6 px-5 py-3 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur border border-jotofa-navy/10 dark:border-white/10 text-sm">
            <span className="font-semibold text-jotofa-navy dark:text-white">
              5 Subsidiaries
            </span>
            <span className="text-jotofa-accent">·</span>
            <span className="font-semibold text-jotofa-navy dark:text-white">
              5 Sectors
            </span>
            <span className="text-jotofa-accent">·</span>
            <span className="font-semibold text-jotofa-navy dark:text-white">
              1 Vision
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Smooth fade into the directory below */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-background pointer-events-none"
      />
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   2. DIRECTORY GRID — equal-sized cards
   ────────────────────────────────────────────────────────────────────────── */
function BusinessCard({ business }: { business: Business }) {
  const router = useRouter();
  const Icon = business.icon;

  return (
    <motion.div className="group relative flex flex-col h-full rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-jotofa-accent/50 hover:shadow-[0_24px_60px_-24px_rgba(0,59,100,0.25)] dark:hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
      {/* ─── Logo zone ─── */}
      <div className="relative px-6 pt-6 pb-5 border-b border-border bg-gradient-to-br from-jotofa-navy/[0.04] to-transparent dark:from-white/[0.04] dark:to-transparent">
        <div className="flex items-start justify-between gap-3">
          {/* Logo / monogram mark */}
          <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white dark:bg-white/[0.06] border border-jotofa-navy/10 dark:border-white/10 shadow-sm flex-shrink-0 overflow-hidden">
            {business.logoSrc ? (
              <Image
                src={business.logoSrc}
                alt={`${business.name} logo`}
                width={56}
                height={56}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-lg font-black tracking-tight text-jotofa-navy dark:text-white">
                {business.logoMark}
              </span>
            )}
          </div>

          {/* Icon chip */}
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-jotofa-accent/10 text-jotofa-accent flex-shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="flex flex-col flex-1 px-6 py-5">
        {/* Sector badge tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {business.sectors.map((sector) => (
            <span
              key={sector}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-jotofa-navy/[0.06] dark:bg-white/[0.08] text-jotofa-navy/70 dark:text-white/70 border border-jotofa-navy/5 dark:border-white/5"
            >
              {sector}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
          {business.name}
        </h3>

        {/* Two-sentence value proposition */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {business.description}
        </p>

        {/* High-contrast primary outbound button — full-width, pushed to bottom */}
        <div className="mt-auto pt-2">
          {business.website ? (
            <a
              href={business.website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-jotofa-navy dark:bg-jotofa-accent text-white text-sm font-semibold transition-all hover:bg-jotofa-navy-deep dark:hover:bg-jotofa-accent-dark shadow-[0_6px_18px_-8px_rgba(0,59,100,0.4)] dark:shadow-[0_6px_18px_-8px_rgba(0,169,183,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {business.website.label}
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={() => router.push(`/${business.id}`)}
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-jotofa-navy dark:bg-jotofa-accent text-white text-sm font-semibold transition-all hover:bg-jotofa-navy-deep dark:hover:bg-jotofa-accent-dark shadow-[0_6px_18px_-8px_rgba(0,59,100,0.4)] dark:shadow-[0_6px_18px_-8px_rgba(0,169,183,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore Entity
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DirectoryGrid() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Our Subsidiaries
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Five independent entities. Five areas of expertise. One shared
            standard of excellence.
          </p>
        </ScrollReveal>

        {/* Equal-sized cards grid.
            On lg+, uses a 6-col grid with each card spanning 2 cols, and the
            4th card offset to col-start-2 so the 2nd row (cards 4 + 5) is
            centered under the first row of 3 — a polished "magazine" layout
            that keeps every card IDENTICAL in size and corporate weight. */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6"
          staggerDelay={0.08}
        >
          {businesses.map((b, i) => (
            <StaggerItem
              key={b.id}
              className={`sm:col-span-1 lg:col-span-2 ${
                i === 3 ? "lg:col-start-2" : ""
              }`}
            >
              <BusinessCard business={b} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. GROUP IMPACT — massive aggregate data counters band
   ────────────────────────────────────────────────────────────────────────── */
interface ImpactStat {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  descriptor: string;
}

const impactStats: ImpactStat[] = [
  {
    icon: Building2,
    value: 5,
    suffix: "+",
    label: "Subsidiaries",
    descriptor: "Across five specialized sectors",
  },
  {
    icon: Users,
    value: 12000,
    suffix: "+",
    label: "Employees",
    descriptor: "Skilled professionals nationwide",
  },
  {
    icon: Globe2,
    value: 50,
    suffix: "+",
    label: "Global Offices",
    descriptor: "Across Tanzania and East Africa",
  },
  {
    icon: Award,
    value: 25,
    suffix: "+",
    label: "Years of Impact",
    descriptor: "Trusted since 2001",
  },
];

function GroupImpact() {
  return (
    <section className="relative overflow-hidden bg-jotofa-navy dark:bg-jotofa-navy-deep py-20 sm:py-28">
      {/* Background decoration */}
      <div aria-hidden className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-jotofa-accent/10 rounded-full blur-[160px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-jotofa-accent/5 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-jotofa-accent/30 bg-jotofa-accent/10 mb-6">
            <Award className="w-3.5 h-3.5 text-jotofa-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-jotofa-accent">
              Group Impact
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            The Scale of{" "}
            <span className="text-gold-gradient">JOTOFA Group</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/70 text-lg">
            Five subsidiaries working as one — the aggregate reach of our
            combined operations across Tanzania and East Africa.
          </p>
        </ScrollReveal>

        {/* Stats grid */}
        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {impactStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={stat.label}>
                <div className="relative h-full text-center px-4 py-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] hover:border-jotofa-accent/30 transition-all duration-300">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-jotofa-accent/15 text-jotofa-accent mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  {/* Big number — count-up animation */}
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2 tabular-nums">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  {/* Label */}
                  <div className="text-base font-semibold text-white mb-1">
                    {stat.label}
                  </div>
                  {/* Descriptor */}
                  <div className="text-xs text-white/55 leading-relaxed">
                    {stat.descriptor}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Page — composes Hero + Directory + Group Impact.
   (Footer is rendered globally by the page shell.)
   ────────────────────────────────────────────────────────────────────────── */
export function BusinessesPage() {
  return (
    <>
      <BusinessesHero />
      <DirectoryGrid />
      <GroupImpact />
    </>
  );
}
