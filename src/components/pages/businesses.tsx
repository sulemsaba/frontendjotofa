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
  Check,
} from "lucide-react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/scroll-reveal";
import { PageId, usePage } from "@/lib/page-context";
import { storeProductsPageUrl } from "@/lib/store-config";

/* ──────────────────────────────────────────────────────────────────────────
   Accent color tokens   each subsidiary has its own brand accent used for
   sector badges, service check icons, and hover/border states.
   Static class strings so Tailwind can statically extract them.
   ────────────────────────────────────────────────────────────────────────── */
const accentClasses: Record<
  "utec-cyan" | "cleaning-green" | "staffing-purple",
  { bg: string; text: string; border: string; hoverBorder: string; hoverBg: string }
> = {
  "utec-cyan": {
    bg: "bg-utec-cyan/10",
    text: "text-utec-cyan",
    border: "border-utec-cyan/20",
    hoverBorder: "hover:border-utec-cyan/40",
    hoverBg: "hover:bg-utec-cyan/[0.06]",
  },
  "cleaning-green": {
    bg: "bg-cleaning-green/10",
    text: "text-cleaning-green",
    border: "border-cleaning-green/20",
    hoverBorder: "hover:border-cleaning-green/40",
    hoverBg: "hover:bg-cleaning-green/[0.06]",
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
   "Our Businesses"   premium holding-company directory page.

   Layout (top → bottom):
     1. Hero banner      bold headline "Diversified Expertise. Shared Values."
     2. Split sections   5 full-width split-screen sections, one per subsidiary.
                         Each section alternates image left / right and contains:
                         • full-bleed photograph with navy brand overlay
                         • giant watermark index number (01–05)
                         • company logo tile
                         • tagline pill + sector badges
                         • concise two-sentence value proposition
                         • 2-column services grid
                         • high-contrast primary CTA   "Visit Website"
                           (UTEC store) or "Explore Entity" (internal route)
     3. Group impact     massive aggregate data counters band (5+ Subsidiaries,
                         12,000+ Employees, 50+ Global Offices, 25+ Years) with
                         scroll-triggered count-up animation
     4. Footer           already global; CTA band at top captures investor /
                         partner / job-seeker inquiries

   Brand palette ONLY: JOTOFA navy + teal. Theme-aware (light + dark).
   ────────────────────────────────────────────────────────────────────────── */

interface Business {
  id: PageId;
  /** "01" – "05"   used as the big watermark number */
  index: string;
  name: string;
  /** Short sector tagline, e.g. "ICT & Telecommunications" */
  tagline: string;
  /** Small UI sector badges */
  sectors: string[];
  /** Service line-items shown in the 2-col grid */
  services: string[];
  /** Concise two-sentence value proposition */
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Full-bleed photograph for the split-section image side */
  image: string;
  /** Real logo   if absent, falls back to a styled monogram mark */
  logoSrc?: string;
  /** 2-letter monogram used when no real logo asset exists */
  logoMark: string;
  /** Outbound link (UTEC store). If absent, only the internal CTA shows */
  website?: { label: string; url: string };
  /** Per-subsidiary accent color used for badges, checks, and hover states */
  accent: "utec-cyan" | "cleaning-green" | "staffing-purple";
}

const businesses: Business[] = [
  {
    id: "utec",
    index: "01",
    name: "UTEC Solutions",
    tagline: "ICT & Telecommunications",
    sectors: ["ICT", "Telecom", "Cloud"],
    services: [
      "Network Infrastructure",
      "Cloud Solutions",
      "Cybersecurity",
      "Software Development",
      "Telecom Services",
    ],
    description:
      "Cutting-edge ICT infrastructure, telecommunications, and digital transformation services connecting businesses and communities across Tanzania.",
    icon: Monitor,
    image: "/images/subsidiaries/utec.jpg",
    logoSrc: "/images/utec-logo.png",
    logoMark: "UT",
    website: { label: "Visit Website", url: storeProductsPageUrl() },
    accent: "utec-cyan",
  },
  {
    id: "cleaning",
    index: "02",
    name: "Cleaning & Maids",
    tagline: "Professional Cleaning",
    sectors: ["Facilities", "Hygiene", "Maintenance"],
    services: [
      "Commercial Cleaning",
      "Residential Services",
      "Industrial Cleaning",
      "Specialized Sanitization",
      "Staffed Housekeeping",
    ],
    description:
      "Premium cleaning and housekeeping for commercial, residential, and industrial spaces. We deliver hygiene and pristine environments through trained, supervised crews.",
    icon: Sparkles,
    image: "/images/subsidiaries/cleaning.jpg",
    logoSrc: "/images/cleaning-logo.png",
    logoMark: "JM",
    accent: "cleaning-green",
  },
  {
    id: "staffing",
    index: "03",
    name: "Staffing & Labour",
    tagline: "Workforce Solutions",
    sectors: ["Recruitment", "HR", "Workforce"],
    services: [
      "Recruitment Services",
      "Labour Outsourcing",
      "Payroll Management",
      "Training & Development",
      "HR Consulting",
    ],
    description:
      "Connecting talent with opportunity   skilled and semi-skilled labour supply, recruitment, and workforce management for industries across Tanzania.",
    icon: Users,
    image: "/images/subsidiaries/staffing.jpg",
    logoSrc: "/images/staffing-logo.png",
    logoMark: "JT",
    accent: "staffing-purple",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   Counter   scroll-triggered count-up animation.
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
    <section className="relative overflow-hidden bg-background dark:bg-jotofa-navy-mid py-24 sm:py-32">
      {/* Decorative top accent bar */}
      <div aria-hidden className="absolute top-0 left-0 right-0 z-[1] h-[3px] bg-gradient-to-r from-transparent via-jotofa-accent/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-4xl mx-auto">
          {/* Bold headline   "Diversified Expertise. Shared Values." */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-jotofa-navy dark:text-white leading-[1.05] mb-6">
            Diversified Expertise.
            <br />
            <span className="text-jotofa-accent">Shared Values.</span>
          </h1>

          {/* Mission subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-jotofa-text-secondary dark:text-white/75 leading-relaxed mb-10">
            JOTOFA Group unites four specialized subsidiaries under one
            corporate umbrella   each an independent leader in its sector, all
            bound by the same commitment to quality, integrity, and lasting
            impact across Tanzania and East Africa.
          </p>

          {/* Mini stats bar */}
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-muted/80 dark:bg-white/5 backdrop-blur border border-border text-sm">
            <span className="font-semibold text-foreground dark:text-white">
              4 Subsidiaries
            </span>
            <span className="text-jotofa-accent" aria-hidden>·</span>
            <span className="font-semibold text-foreground dark:text-white">
              4 Sectors
            </span>
            <span className="text-jotofa-accent" aria-hidden>·</span>
            <span className="font-semibold text-foreground dark:text-white">
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
   2. SPLIT-SCREEN STACKED SECTIONS   one full-width section per subsidiary.
      Each section alternates image left / right (even = image left, odd = right)
      and gives every subsidiary its own immersive "moment" with a full-bleed
      photograph, giant watermark index, logo tile, services grid, and CTA.
   ────────────────────────────────────────────────────────────────────────── */
function SplitSection({
  business,
  index,
}: {
  business: Business;
  index: number;
}) {
  const router = useRouter();
  const Icon = business.icon;
  const reversed = index % 2 === 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col lg:flex-row min-h-[60vh] lg:min-h-[78vh] border-b border-border"
    >
      {/* ─── Image / Visual Side ─── */}
      <div
        className={`group/img relative flex-1 min-h-[42vh] lg:min-h-full overflow-hidden ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={business.image}
          alt={business.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover/img:scale-105"
        />
        {/* Navy brand overlay   keeps every section on-palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-jotofa-navy-deep/92 via-jotofa-navy/80 to-jotofa-navy/65" />
        {/* Teal glow accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-jotofa-accent/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Giant watermark index number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[160px] sm:text-[220px] lg:text-[260px] font-black text-white/[0.09] leading-none select-none">
            {business.index}
          </span>
        </div>

        {/* Logo tile   top-left */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
          <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white border border-white/20 shadow-lg overflow-hidden">
            {business.logoSrc ? (
              <Image
                src={business.logoSrc}
                alt={`${business.name} logo`}
                width={48}
                height={48}
                className="h-9 w-9 object-contain"
              />
            ) : (
              <span className="text-lg font-black text-jotofa-navy">
                {business.logoMark}
              </span>
            )}
          </div>
        </div>

        {/* Tagline pill   bottom-left */}
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <Icon className="w-3.5 h-3.5 text-jotofa-accent-light" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/95">
              {business.tagline}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Content Side ─── */}
      <div
        className={`relative flex-1 flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20 xl:px-20 bg-background ${
          reversed ? "lg:order-1" : ""
        }`}
      >
        {/* Faint watermark number   top right */}
        <span
          aria-hidden
          className="absolute top-4 right-6 sm:top-6 sm:right-10 text-[100px] sm:text-[140px] lg:text-[160px] font-black text-jotofa-navy/[0.04] dark:text-white/[0.04] leading-none select-none pointer-events-none"
        >
          {business.index}
        </span>

        <div className="relative z-10 max-w-xl mx-auto lg:mx-0 w-full">
          {/* Sector badges   each pill uses the subsidiary's accent color */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {business.sectors.map((sector) => {
              const a = accentClasses[business.accent];
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
            {business.name}
          </h2>

          {/* Value proposition */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
            {business.description}
          </p>

          {/* Services grid   2 columns with accent-colored check icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-9">
            {business.services.map((service) => {
              const a = accentClasses[business.accent];
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

          {/* CTA row   primary "Explore Entity" + optional secondary "Visit Website" link */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => router.push(`/${business.id}`)}
              className="group/btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-jotofa-navy dark:bg-jotofa-accent text-white text-sm font-semibold transition-all hover:bg-jotofa-navy-deep dark:hover:bg-jotofa-accent-dark shadow-[0_6px_18px_-8px_rgba(0,59,100,0.4)] dark:shadow-[0_6px_18px_-8px_rgba(0,169,183,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore Entity
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </button>
            {business.website && (
              <a
                href={business.website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-jotofa-navy dark:text-white/85 hover:text-jotofa-accent dark:hover:text-jotofa-accent-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {business.website.label}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SplitSections() {
  return (
    <section className="relative">
      {/* Section header */}
      <ScrollReveal className="text-center py-20 sm:py-24">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          Our Subsidiaries
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
          Four independent entities. Four areas of expertise. One shared
          standard of excellence.
        </p>
      </ScrollReveal>

      {/* Split-screen stacked sections   each subsidiary gets a full-width
          immersive split section. */}
      <div className="border-t border-border">
        {businesses.map((business, index) => (
          <SplitSection
            key={business.id}
            business={business}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   3. GROUP IMPACT   massive aggregate data counters band
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
    value: 4,
    suffix: "+",
    label: "Subsidiaries",
    descriptor: "Across four specialized sectors",
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
      <div aria-hidden className="absolute inset-0  opacity-20" />
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            The Scale of{" "}
            <span className="text-jotofa-accent">JOTOFA Group</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/70 text-lg">
            Four subsidiaries working as one   the aggregate reach of our
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
                  {/* Big number   count-up animation */}
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
   4. CONTACT CTA   closing call-to-action band that routes visitors to the
      contact page. Reinforces the group's cross-sector value proposition.
   ────────────────────────────────────────────────────────────────────────── */
function ContactCTA() {
  const { setActivePage } = usePage();
  return (
    <section className="section-py border-t border-border">
      <div className="container text-center">
        <div className="eyebrow mb-4">Ready to Partner?</div>
        <h2 className="h2 text-foreground mb-4 max-w-2xl mx-auto">
          Interested in our services?{" "}
          <span className="text-jotofa-accent">Let&rsquo;s talk.</span>
        </h2>
        <p className="lead mb-8 max-w-xl mx-auto">
          From ICT to security and cleaning   JOTOFA Group delivers
          excellence under one trusted roof.
        </p>
        <button
          onClick={() => setActivePage("contact")}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-jotofa-accent text-white font-semibold text-sm hover:bg-jotofa-accent-dark transition-all shadow-[0_8px_24px_-8px_rgba(0,169,183,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2"
        >
          Contact JOTOFA Group
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Page   composes Hero + Split Sections + Group Impact + Contact CTA.
   (Footer is rendered globally by the page shell.)
   ────────────────────────────────────────────────────────────────────────── */
export function BusinessesPage() {
  return (
    <>
      <BusinessesHero />
      <SplitSections />
      <GroupImpact />
      <ContactCTA />
    </>
  );
}
