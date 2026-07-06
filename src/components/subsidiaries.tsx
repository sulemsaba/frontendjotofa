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
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { usePage, PageId } from "@/lib/page-context";
import { storeProductsPageUrl } from "@/lib/store-config";

/* ──────────────────────────────────────────────────────────────────────────
   "Five Arms, One Vision" — Option C: numbered magazine cards.

   Each subsidiary is a tall portrait card with:
     • a full-bleed REAL photograph (object-cover, hover zoom)
     • a big faded index number (01–05) in the division's accent colour
     • an accent icon chip + tagline + name overlaid on the photo
     • a content panel below: description, service tags, and an
       "Explore →" CTA that navigates to the subsidiary page
     • UTEC also shows a "Visit Online Store" external link

   Layout: 1-col (mobile) → 2-col (sm) → 3-col (lg) → 5-col (xl, the
   literal "five arms in a row" statement on wide screens).
   ────────────────────────────────────────────────────────────────────────── */

interface Subsidiary {
  id: PageId;
  index: string;
  name: string;
  tagline: string;
  description: string;
  services: string[];
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentRing: string;
  accentDot: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  storeUrl?: string;
  storeLabel?: string;
}

const subsidiaries: Subsidiary[] = [
  {
    id: "utec",
    index: "01",
    name: "UTEC Solutions",
    tagline: "ICT & Telecommunications",
    description:
      "Cutting-edge ICT infrastructure, telecommunications, and digital transformation services connecting businesses and communities across Tanzania.",
    services: [
      "Network Infrastructure",
      "Cloud Solutions",
      "Cybersecurity",
      "Software Development",
      "Telecom Services",
    ],
    accentText: "text-utec-cyan",
    accentBg: "bg-utec-cyan/10",
    accentBorder: "border-utec-cyan/30",
    accentRing: "group-hover:ring-utec-cyan/40",
    accentDot: "bg-utec-cyan",
    icon: Monitor,
    image: "/images/subsidiaries/utec.jpg",
    storeUrl: storeProductsPageUrl(),
    storeLabel: "Visit Online Store",
  },
  {
    id: "courier",
    index: "02",
    name: "Courier & Logistics",
    tagline: "Reliable Delivery Network",
    description:
      "A trusted logistics and courier network ensuring timely, secure delivery of goods and documents across Tanzania and East Africa.",
    services: [
      "Express Delivery",
      "Freight & Cargo",
      "Warehousing",
      "Last-Mile Solutions",
      "Cross-Border Logistics",
    ],
    accentText: "text-courier-orange",
    accentBg: "bg-courier-orange/10",
    accentBorder: "border-courier-orange/30",
    accentRing: "group-hover:ring-courier-orange/40",
    accentDot: "bg-courier-orange",
    icon: Truck,
    image: "/images/subsidiaries/courier.jpg",
  },
  {
    id: "cleaning",
    index: "03",
    name: "Cleaning & Maids",
    tagline: "Professional Cleaning",
    description:
      "Premium cleaning and housekeeping for commercial, residential, and industrial spaces — ensuring hygiene and pristine environments every time.",
    services: [
      "Commercial Cleaning",
      "Residential Services",
      "Industrial Cleaning",
      "Specialized Sanitization",
      "Staffed Housekeeping",
    ],
    accentText: "text-cleaning-green",
    accentBg: "bg-cleaning-green/10",
    accentBorder: "border-cleaning-green/30",
    accentRing: "group-hover:ring-cleaning-green/40",
    accentDot: "bg-cleaning-green",
    icon: Sparkles,
    image: "/images/subsidiaries/cleaning.jpg",
  },
  {
    id: "security",
    index: "04",
    name: "JOTOFA Security",
    tagline: "Comprehensive Security",
    description:
      "Robust security services from manned guarding to electronic surveillance — protecting people, assets, and operations with integrity and vigilance.",
    services: [
      "Manned Guarding",
      "Electronic Surveillance",
      "Event Security",
      "Risk Assessment",
      "Security Consulting",
    ],
    accentText: "text-security-red",
    accentBg: "bg-security-red/10",
    accentBorder: "border-security-red/30",
    accentRing: "group-hover:ring-security-red/40",
    accentDot: "bg-security-red",
    icon: ShieldCheck,
    image: "/images/subsidiaries/security.jpg",
  },
  {
    id: "staffing",
    index: "05",
    name: "Staffing & Labour",
    tagline: "Workforce Solutions",
    description:
      "Connecting talent with opportunity — skilled and semi-skilled labour supply, recruitment, and workforce management for industries across Tanzania.",
    services: [
      "Recruitment Services",
      "Labour Outsourcing",
      "Payroll Management",
      "Training & Development",
      "HR Consulting",
    ],
    accentText: "text-staffing-purple",
    accentBg: "bg-staffing-purple/10",
    accentBorder: "border-staffing-purple/30",
    accentRing: "group-hover:ring-staffing-purple/40",
    accentDot: "bg-staffing-purple",
    icon: Users,
    image: "/images/subsidiaries/staffing.jpg",
  },
];

function SubsidiaryCard({ subsidiary }: { subsidiary: Subsidiary }) {
  const { setActivePage } = usePage();
  const Icon = subsidiary.icon;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => setActivePage(subsidiary.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActivePage(subsidiary.id);
        }
      }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border ring-1 ring-transparent ${subsidiary.accentRing} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
    >
      {/* ── Image (with overlays) ── */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={subsidiary.image}
          alt={subsidiary.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Readability gradient — dark in both themes (over a photo) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        {/* Accent tint on hover */}
        <div
          aria-hidden
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${subsidiary.accentBg} mix-blend-multiply`}
        />

        {/* Big faded index number — top right */}
        <span
          className={`absolute top-3 right-4 text-6xl sm:text-7xl font-black leading-none ${subsidiary.accentText} opacity-70 select-none`}
          style={{ WebkitTextStroke: "1px currentColor" }}
          aria-hidden
        >
          {subsidiary.index}
        </span>

        {/* Icon chip — top left */}
        <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/25`}>
          <Icon className={`w-5 h-5 text-white`} />
        </div>

        {/* Tagline + Name — bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className={`inline-flex items-center gap-1.5 mb-2`}>
            <span className={`w-1.5 h-1.5 rounded-full ${subsidiary.accentDot}`} />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
              {subsidiary.tagline}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white leading-tight">
            {subsidiary.name}
          </h3>
        </div>
      </div>

      {/* ── Content panel ── */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {subsidiary.description}
        </p>

        {/* Service tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {subsidiary.services.slice(0, 4).map((service) => (
            <span
              key={service}
              className={`text-[11px] px-2 py-1 rounded-md ${subsidiary.accentBg} ${subsidiary.accentText} font-medium`}
            >
              {service}
            </span>
          ))}
          {subsidiary.services.length > 4 && (
            <span className="text-[11px] px-2 py-1 rounded-md bg-secondary text-muted-foreground font-medium">
              +{subsidiary.services.length - 4}
            </span>
          )}
        </div>

        {/* CTA row — pushed to bottom */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-border">
          <span
            className={`inline-flex items-center gap-1.5 text-sm font-semibold ${subsidiary.accentText} group-hover:gap-2.5 transition-all`}
          >
            Explore
            <ArrowRight className="w-4 h-4" />
          </span>

          {subsidiary.storeUrl && (
            <a
              href={subsidiary.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1 text-xs font-medium ${subsidiary.accentText} hover:opacity-70 transition-opacity`}
            >
              {subsidiary.storeLabel ?? "Store"}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Subsidiaries() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Section background */}
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-jotofa-accent/20 bg-jotofa-accent/5 mb-6">
            <span className="text-jotofa-gold text-sm font-medium">
              Our Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            Five Arms,{" "}
            <span className="text-gold-gradient">One Vision</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Each subsidiary is a pillar of our group — specialized, yet united
            by a commitment to quality, innovation, and impact.
          </p>
        </ScrollReveal>

        {/* Numbered magazine cards */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6"
          staggerDelay={0.08}
        >
          {subsidiaries.map((s) => (
            <StaggerItem key={s.id}>
              <SubsidiaryCard subsidiary={s} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
