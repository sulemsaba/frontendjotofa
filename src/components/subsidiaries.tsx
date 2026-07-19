"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Monitor,
  Truck,
  Sparkles,
  ShieldCheck,
  Users,
  ArrowRight,
  ExternalLink,
  Check,
} from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { usePage, PageId } from "@/lib/page-context";
import { storeProductsPageUrl } from "@/lib/store-config";

/* ──────────────────────────────────────────────────────────────────────────
   Accent color tokens — each subsidiary has its own brand accent used for
   sector badges, service check icons, and hover/border states.
   Static class strings so Tailwind can statically extract them.
   ────────────────────────────────────────────────────────────────────────── */
const accentClasses: Record<
  "utec-cyan" | "courier-orange" | "cleaning-green" | "security-red" | "staffing-purple",
  { bg: string; text: string; border: string; hoverBorder: string; hoverBg: string }
> = {
  "utec-cyan": {
    bg: "bg-utec-cyan/10",
    text: "text-utec-cyan",
    border: "border-utec-cyan/20",
    hoverBorder: "hover:border-utec-cyan/40",
    hoverBg: "hover:bg-utec-cyan/[0.06]",
  },
  "courier-orange": {
    bg: "bg-courier-orange/10",
    text: "text-courier-orange",
    border: "border-courier-orange/20",
    hoverBorder: "hover:border-courier-orange/40",
    hoverBg: "hover:bg-courier-orange/[0.06]",
  },
  "cleaning-green": {
    bg: "bg-cleaning-green/10",
    text: "text-cleaning-green",
    border: "border-cleaning-green/20",
    hoverBorder: "hover:border-cleaning-green/40",
    hoverBg: "hover:bg-cleaning-green/[0.06]",
  },
  "security-red": {
    bg: "bg-security-red/10",
    text: "text-security-red",
    border: "border-security-red/20",
    hoverBorder: "hover:border-security-red/40",
    hoverBg: "hover:bg-security-red/[0.06]",
  },
  "staffing-purple": {
    bg: "bg-staffing-purple/10",
    text: "text-staffing-purple",
    border: "border-staffing-purple/20",
    hoverBorder: "hover:border-staffing-purple/40",
    hoverBg: "hover:bg-staffing-purple/[0.06]",
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   "Five Arms, One Vision" — Home page subsidiaries section.

   Redesigned as SPLIT-SCREEN STACKED CARDS to match the businesses page:
   • Full-width alternating split sections — one image LEFT, next image RIGHT
     ("one image look right, the other look left"), repeating down the page.
   • Image side: full-bleed photograph with navy brand overlay, giant
     watermark index number (01–05), logo tile, tagline pill.
   • Content side: sector badges, company name (h2), value proposition,
     2-column services grid, "Explore" CTA (navigates to the subsidiary
     detail page) + optional UTEC store link.
   • Scroll-triggered fade-in (framer-motion whileInView).
   • BRAND COLOURS ONLY: JOTOFA navy + teal. Theme-aware (light + dark).
   • Slightly more compact than the businesses page so the home page
     stays scannable after the hero.
   ────────────────────────────────────────────────────────────────────────── */

interface Subsidiary {
  id: PageId;
  /** "01" – "05" — used as the big watermark number */
  index: string;
  name: string;
  /** Short sector tagline, e.g. "ICT & Telecommunications" */
  tagline: string;
  /** Small UI sector badges */
  sectors: string[];
  /** Service line-items shown in the 2-col grid */
  services: string[];
  /** Concise value proposition */
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Full-bleed photograph for the split-section image side */
  image: string;
  /** Real logo — if absent, falls back to a styled monogram mark */
  logoSrc?: string;
  /** 2-letter monogram used when no real logo asset exists */
  logoMark: string;
  /** Optional outbound store link (UTEC) */
  storeUrl?: string;
  storeLabel?: string;
  /** Per-subsidiary accent color used for badges, checks, and hover states */
  accent: "utec-cyan" | "courier-orange" | "cleaning-green" | "security-red" | "staffing-purple";
}

const subsidiaries: Subsidiary[] = [
  {
    id: "utec",
    index: "01",
    name: "UTEC Solutions",
    tagline: "ICT & Telecommunications",
    sectors: ["ICT", "Telecom", "Cloud"],
    description:
      "Cutting-edge ICT infrastructure, telecommunications, and digital transformation services connecting businesses and communities across Tanzania.",
    services: [
      "Network Infrastructure",
      "Cloud Solutions",
      "Cybersecurity",
      "Software Development",
      "Telecom Services",
    ],
    icon: Monitor,
    image: "/images/subsidiaries/utec.jpg",
    logoSrc: "/images/utec-logo.png",
    logoMark: "UT",
    storeUrl: storeProductsPageUrl(),
    storeLabel: "Visit Website",
    accent: "utec-cyan",
  },
  {
    id: "courier",
    index: "02",
    name: "Courier & Logistics",
    tagline: "Reliable Delivery Network",
    sectors: ["Logistics", "Freight", "Last-Mile"],
    description:
      "A trusted logistics and courier network ensuring timely, secure delivery of goods and documents across Tanzania and East Africa.",
    services: [
      "Express Delivery",
      "Freight & Cargo",
      "Warehousing",
      "Last-Mile Solutions",
      "Cross-Border Logistics",
    ],
    icon: Truck,
    image: "/images/subsidiaries/courier.jpg",
    logoSrc: "/images/courier-logo.png",
    logoMark: "JC",
    accent: "courier-orange",
  },
  {
    id: "cleaning",
    index: "03",
    name: "Cleaning & Maids",
    tagline: "Professional Cleaning",
    sectors: ["Facilities", "Hygiene", "Maintenance"],
    description:
      "Premium cleaning and housekeeping for commercial, residential, and industrial spaces — ensuring hygiene and pristine environments every time.",
    services: [
      "Commercial Cleaning",
      "Residential Services",
      "Industrial Cleaning",
      "Specialized Sanitization",
      "Staffed Housekeeping",
    ],
    icon: Sparkles,
    image: "/images/subsidiaries/cleaning.jpg",
    logoSrc: "/images/cleaning-logo.png",
    logoMark: "JM",
    accent: "cleaning-green",
  },
  {
    id: "security",
    index: "04",
    name: "JOTOFA Security",
    tagline: "Comprehensive Security",
    sectors: ["Security", "Surveillance", "Risk"],
    description:
      "Robust security services from manned guarding to electronic surveillance — protecting people, assets, and operations with integrity and vigilance.",
    services: [
      "Manned Guarding",
      "Electronic Surveillance",
      "Event Security",
      "Risk Assessment",
      "Security Consulting",
    ],
    icon: ShieldCheck,
    image: "/images/subsidiaries/security.jpg",
    logoSrc: "/images/security-logo.png",
    logoMark: "JS",
    accent: "security-red",
  },
  {
    id: "staffing",
    index: "05",
    name: "Staffing & Labour",
    tagline: "Workforce Solutions",
    sectors: ["Recruitment", "HR", "Workforce"],
    description:
      "Connecting talent with opportunity — skilled and semi-skilled labour supply, recruitment, and workforce management for industries across Tanzania.",
    services: [
      "Recruitment Services",
      "Labour Outsourcing",
      "Payroll Management",
      "Training & Development",
      "HR Consulting",
    ],
    icon: Users,
    image: "/images/subsidiaries/staffing.jpg",
    logoSrc: "/images/staffing-logo.png",
    logoMark: "JT",
    accent: "staffing-purple",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   SplitSection — one full-width alternating split section per subsidiary.

   Alternation rule: even index (0,2,4) → image LEFT / content RIGHT.
                     odd  index (1,3)   → image RIGHT / content LEFT.
   This produces the "one image look right, the other look left" rhythm
   the user asked for.
   ────────────────────────────────────────────────────────────────────────── */
function SplitSection({
  subsidiary,
  index,
}: {
  subsidiary: Subsidiary;
  index: number;
}) {
  const { setActivePage } = usePage();
  const Icon = subsidiary.icon;
  const reversed = index % 2 === 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col lg:flex-row min-h-[52vh] lg:min-h-[68vh] border-b border-border"
    >
      {/* ─── Image / Visual Side ─── */}
      <div
        className={`group/img relative flex-1 min-h-[38vh] lg:min-h-full overflow-hidden ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={subsidiary.image}
          alt={subsidiary.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover/img:scale-105"
        />
        {/* Navy brand overlay — keeps every section on-palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-jotofa-navy-deep/92 via-jotofa-navy/80 to-jotofa-navy/65" />
        {/* Teal glow accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-jotofa-accent/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Giant watermark index number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[150px] sm:text-[210px] lg:text-[250px] font-black text-white/[0.09] leading-none select-none">
            {subsidiary.index}
          </span>
        </div>

        {/* Logo tile — top-left */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
          <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white border border-white/20 shadow-lg overflow-hidden">
            {subsidiary.logoSrc ? (
              <Image
                src={subsidiary.logoSrc}
                alt={`${subsidiary.name} logo`}
                width={48}
                height={48}
                className="h-9 w-9 object-contain"
              />
            ) : (
              <span className="text-lg font-black text-jotofa-navy">
                {subsidiary.logoMark}
              </span>
            )}
          </div>
        </div>

        {/* Tagline pill — bottom-left */}
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <Icon className="w-3.5 h-3.5 text-jotofa-accent-light" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/95">
              {subsidiary.tagline}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Content Side ─── */}
      <div
        className={`relative flex-1 flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-16 bg-background ${
          reversed ? "lg:order-1" : ""
        }`}
      >
        {/* Faint watermark number — top right */}
        <span
          aria-hidden
          className="absolute top-4 right-6 sm:top-6 sm:right-10 text-[90px] sm:text-[130px] lg:text-[150px] font-black text-jotofa-navy/[0.04] dark:text-white/[0.04] leading-none select-none pointer-events-none"
        >
          {subsidiary.index}
        </span>

        <div className="relative z-10 max-w-xl mx-auto lg:mx-0 w-full">
          {/* Sector badges — each pill uses the subsidiary's accent color */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {subsidiary.sectors.map((sector) => {
              const a = accentClasses[subsidiary.accent];
              return (
                <span
                  key={sector}
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide ${a.bg} ${a.text} ${a.border} border`}
                >
                  {sector}
                </span>
              );
            })}
          </div>

          {/* Name */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 leading-[1.1]">
            {subsidiary.name}
          </h3>

          {/* Value proposition */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-7">
            {subsidiary.description}
          </p>

          {/* Services grid — 2 columns with accent-colored check icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
            {subsidiary.services.map((service) => {
              const a = accentClasses[subsidiary.accent];
              return (
                <div
                  key={service}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-jotofa-navy/[0.03] dark:bg-white/[0.04] border border-border ${a.hoverBorder} ${a.hoverBg} transition-all duration-200`}
                >
                  <Check className={`w-3.5 h-3.5 flex-shrink-0 ${a.text}`} />
                  <span className="text-sm font-medium text-foreground/80">
                    {service}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA row — primary "Explore" + optional subtle "Visit Website" text link */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage(subsidiary.id)}
              className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-jotofa-navy dark:bg-jotofa-accent text-white text-sm font-semibold transition-all hover:bg-jotofa-navy-deep dark:hover:bg-jotofa-accent-dark shadow-[0_6px_18px_-8px_rgba(0,59,100,0.4)] dark:shadow-[0_6px_18px_-8px_rgba(0,169,183,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore Entity
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </button>

            {subsidiary.storeUrl && (
              <a
                href={subsidiary.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-jotofa-navy dark:text-white/85 hover:text-jotofa-accent dark:hover:text-jotofa-accent-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {subsidiary.storeLabel ?? "Visit Website"}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function Subsidiaries() {
  return (
    <section className="relative">
      {/* Section header */}
      <ScrollReveal className="text-center py-20 sm:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-jotofa-accent/20 bg-jotofa-accent/5 mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-jotofa-accent">
            Our Portfolio
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          Five Arms, <span className="text-gold-gradient">One Vision</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
          Each subsidiary is a pillar of our group — specialized, yet united
          by a commitment to quality, innovation, and impact.
        </p>
      </ScrollReveal>

      {/* Split-screen stacked sections — each subsidiary gets a full-width
          alternating split section (image left ↔ right). */}
      <div className="border-t border-border">
        {subsidiaries.map((subsidiary, index) => (
          <SplitSection
            key={subsidiary.id}
            subsidiary={subsidiary}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
