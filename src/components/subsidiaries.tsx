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
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { usePage, PageId } from "@/lib/page-context";
import { storeProductsPageUrl } from "@/lib/store-config";

/* ──────────────────────────────────────────────────────────────────────────
   "Five Arms, One Vision"

   Five equal, roomy columns on desktop — each subsidiary gets its own
   column (not a cramped 5-up row). BRAND COLOURS ONLY: JOTOFA navy +
   teal. No per-subsidiary accent colours — every card uses the same
   navy/teal palette so the section reads as ONE united group, not five
   differently-coloured tiles.

   Card anatomy (vertical):
     • Real photograph (object-cover, hover zoom)
     • Navy number badge (01–05) overlapping the photo edge
     • Icon + tagline + name
     • Description
     • Service list (teal bullets)
     • "Explore →" CTA (+ "Visit Store" for UTEC)

   Layout: 1-col mobile → 2-col sm → 3-col md → 5-col lg+.
   ────────────────────────────────────────────────────────────────────────── */

interface Subsidiary {
  id: PageId;
  index: string;
  name: string;
  tagline: string;
  description: string;
  services: string[];
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
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:-translate-y-1.5 hover:border-jotofa-accent/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* ── Photograph ── */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={subsidiary.image}
          alt={subsidiary.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Navy readability gradient at bottom of photo → blends into card */}
        <div className="absolute inset-0 bg-gradient-to-t from-jotofa-navy via-jotofa-navy/30 to-transparent" />

        {/* Navy number badge — overlaps photo bottom edge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-jotofa-navy text-white text-sm font-bold border border-white/15">
            {subsidiary.index}
          </span>
          <div className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-white" />
          </div>
        </div>

        {/* Tagline + name — bottom of photo, white on navy gradient */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-jotofa-accent-light">
            {subsidiary.tagline}
          </span>
          <h3 className="text-lg font-bold text-white leading-tight mt-1">
            {subsidiary.name}
          </h3>
        </div>
      </div>

      {/* ── Content panel ── */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {subsidiary.description}
        </p>

        {/* Service list — teal bullets, brand-only palette */}
        <ul className="space-y-2 mb-6">
          {subsidiary.services.map((service) => (
            <li key={service} className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-jotofa-accent flex-shrink-0" />
              <span className="text-[13px] text-foreground/80 leading-tight">
                {service}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA row — pushed to bottom */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-border">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-jotofa-accent group-hover:gap-2.5 transition-all">
            Explore
            <ArrowRight className="w-4 h-4" />
          </span>

          {subsidiary.storeUrl && (
            <a
              href={subsidiary.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-medium text-jotofa-accent hover:opacity-70 transition-opacity"
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

        {/* 5 equal columns on desktop — each subsidiary gets its own column */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6"
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
