"use client";

import { useState, useRef, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { PageLink, PageId } from "@/lib/page-context";
import { storeProductsPageUrl } from "@/lib/store-config";

/* ──────────────────────────────────────────────────────────────────────────
    Home page subsidiaries section. Uses one shared JOTOFA accent system
    for all cards; subsidiary-specific colors were removed so the parent
    site no longer signals per-business branding.
    ────────────────────────────────────────────────────────────────────────── */
const accentClasses: Record<string, { bg: string; text: string; border: string; hoverBorder: string; hoverBg: string }> = {
  jotofa: {
    bg: "bg-jotofa-accent/10",
    text: "text-foreground",
    border: "border-jotofa-accent/20",
    hoverBorder: "hover:border-jotofa-accent/40",
    hoverBg: "hover:bg-jotofa-accent/[0.06]",
  },
};

/* ──────────────────────────────────────────────────────────────────────────
   "Five Arms, One Vision" - Home page subsidiaries section.

   Redesigned as SPLIT-SCREEN STACKED CARDS to match the businesses page:
   • Full-width alternating split sections - one image LEFT, next image RIGHT
     ("one image look right, the other look left"), repeating down the page.
   • Image side: full-bleed photograph with navy brand overlay, giant
     watermark index number (01-05), logo tile, tagline pill.
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
  /** "01" - "05"   used as the big watermark number */
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
  /** Real logo   if absent, falls back to a styled monogram mark */
  logoSrc?: string;
  /** 2-letter monogram used when no real logo asset exists */
  logoMark: string;
  /** Optional outbound store link (UTEC) */
  storeUrl?: string;
  storeLabel?: string;
  /** Per-subsidiary accent color used for badges, checks, and hover states */
  accent: "jotofa";
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
    accent: "jotofa",
  },
  {
    id: "cleaning",
    index: "02",
    name: "Cleaning & Maids",
    tagline: "Professional Cleaning",
    sectors: ["Facilities", "Hygiene", "Maintenance"],
    description:
      "Premium cleaning and housekeeping for commercial, residential, and industrial spaces - ensuring hygiene and pristine environments every time.",
    services: [
      "Commercial Cleaning",
      "Residential Services",
      "Industrial Cleaning",
      "Specialized Sanitization",
      "Staffed Housekeeping",
    ],
    icon: Sparkles,
    image: "/images/subsidiaries/cleaning.jpg",
    logoMark: "JM",
    accent: "jotofa",
  },
  {
    id: "staffing",
    index: "03",
    name: "Staffing & Labour",
    tagline: "Workforce Solutions",
    sectors: ["Recruitment", "HR", "Workforce"],
    description:
      "Connecting talent with opportunity - skilled and semi-skilled labour supply, recruitment, and workforce management for industries across Tanzania.",
    services: [
      "Recruitment Services",
      "Labour Outsourcing",
      "Payroll Management",
      "Training & Development",
      "HR Consulting",
    ],
    icon: Users,
    image: "/images/subsidiaries/staffing.jpg",
    logoMark: "JT",
    accent: "jotofa",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   UtecShowcase - image carousel + tabbed content card for UTEC.
   ────────────────────────────────────────────────────────────────────────── */

const utecSlides = [
  {
    src: "/images/showcase/utec-safety.jpg",
    title: "Safety & Security Sales",
    caption: "Reduce workplace incidents with certified protective gear and advanced threat detection technology.",
    tab: "Radio Call Solution",
    heading: "Protect Your Team & Assets",
    description:
      "Don't let outdated safety gear put your people at risk. We supply certified protective equipment and detection systems that meet international standards.",
    benefits: [
      "Reduce workplace injuries with certified safety boots, helmets, and high-visibility uniforms",
      "Secure entry points with walk-through metal detectors and handheld screening mirrors",
      "Stay connected with ICOM portable radios and reliable power backup systems",
    ],
  },
  {
    src: "/images/showcase/utec-installations.jpg",
    title: "Security System Installations",
    caption: "24/7 surveillance and access control tailored to protect your assets and monitor your premises.",
    tab: "Installations",
    heading: "Monitor & Control Your Premises",
    description:
      "Sleep better knowing every corner of your property is watched. We design and install integrated security systems that deter threats and provide evidence when you need it.",
    benefits: [
      "Never miss a thing with HD/UHD CCTV surveillance and remote mobile viewing",
      "Control who enters with biometric access control and automated gate motors",
      "Instant threat alerts from intruder alarms, fire detection, and vehicle screening systems",
    ],
  },
  {
    src: "/images/showcase/utec-it-ict.jpg",
    title: "IT & ICT Solutions",
    caption: "Enterprise-grade hardware and cloud infrastructure that keeps your business connected and competitive.",
    tab: "IT & ICT",
    heading: "Power Your Business with Modern Tech",
    description:
      "Downtime costs money. We build reliable IT infrastructure that keeps your team productive and your data secure - from networking hardware to cloud migration.",
    benefits: [
      "Boost productivity with enterprise laptops, desktops, and peripherals built for heavy workloads",
      "Zero downtime networking with professional design, switches, and structured cabling",
      "Collaborate seamlessly with video conferencing, cloud storage, and custom web solutions",
    ],
  },
  {
    src: "/images/showcase/utec-solar.jpg",
    title: "Renewable Solar Solutions",
    caption: "Cut energy costs by up to 70% with our high-efficiency solar systems for homes and businesses.",
    tab: "Solar",
    heading: "Cut Energy Costs with Solar Power",
    description:
      "Tanzania's sun is your biggest asset. Our solar systems reduce your electricity bills by up to 70% while giving you energy independence from the grid.",
    benefits: [
      "Save up to 70% on electricity with high-efficiency home and office solar lighting",
      "Hot water, zero bills with solar water heaters designed for Tanzanian climates",
      "Light up your street with durable solar street lights and reliable water pumping systems",
    ],
  },
];

const cleaningSlides = [
  {
    src: "/images/showcase/cleaning-commercial.jpg",
    title: "Commercial Cleaning",
    caption: "Professional office and commercial space cleaning that maintains hygiene and impresses clients.",
    tab: "Commercial",
    heading: "Spotless Commercial Spaces",
    description:
      "We deliver consistent, detail-oriented cleaning for offices, retail spaces, and commercial facilities - creating healthy environments your team and customers notice.",
    benefits: [
      "Daily, weekly, or custom schedules tailored to your operations",
      "Trained cleaners using industrial-grade equipment and supplies",
      "Quality audits and feedback loops for continuous improvement",
    ],
  },
  {
    src: "/images/showcase/cleaning-residential.jpg",
    title: "Residential Cleaning",
    caption: "Reliable home cleaning services that give you more time for what matters most.",
    tab: "Residential",
    heading: "Homes That Feel Brand New",
    description:
      "From routine maintenance to deep cleaning, our residential teams treat every home with care - using safe products and proven checklists for consistent results.",
    benefits: [
      "Flexible scheduling including weekends and same-day service",
      "Eco-friendly cleaning products safe for families and pets",
      "Vetted, insured, and background-checked cleaning professionals",
    ],
  },
  {
    src: "/images/showcase/cleaning-industrial.jpg",
    title: "Industrial Cleaning",
    caption: "Specialized industrial and warehouse cleaning that meets safety and compliance standards.",
    tab: "Industrial",
    heading: "Heavy-Duty Industrial Cleaning",
    description:
      "Factories, warehouses, and industrial facilities need more than standard cleaning. We bring specialized equipment and processes to handle tough jobs safely.",
    benefits: [
      "High-reach and machinery-safe cleaning methods",
      "Hazardous material handling and disposal compliance",
      "After-hours and weekend availability to avoid downtime",
    ],
  },
];

const staffingSlides = [
  {
    src: "/images/showcase/staffing-recruitment.jpg",
    title: "Recruitment Services",
    caption: "We find the right talent, fast - so you can focus on running your business.",
    tab: "Recruitment",
    heading: "Talent That Fits Your Team",
    description:
      "We source, screen, and present candidates who match your skills requirements and culture - reducing bad hires and accelerating onboarding.",
    benefits: [
      "Permanent, contract, and temporary placement options",
      "Industry-specific candidate pools and assessment tools",
      "End-to-end onboarding support and follow-up",
    ],
  },
  {
    src: "/images/showcase/staffing-outsourcing.jpg",
    title: "Labour Outsourcing",
    caption: "Flexible workforce solutions that scale up or down with your business needs.",
    tab: "Outsourcing",
    heading: "Workforce Flexibility on Demand",
    description:
      "From seasonal peaks to project-based needs, our labour outsourcing gives you access to trained workers without the overhead of direct employment.",
    benefits: [
      "Skilled and semi-skilled workers across multiple sectors",
      "Payroll, compliance, and HR administration handled for you",
      "Rapid deployment for urgent staffing requirements",
    ],
  },
  {
    src: "/images/showcase/staffing-hr.jpg",
    title: "HR Consulting",
    caption: "Strategic HR support that improves performance, retention, and workplace culture.",
    tab: "HR Consulting",
    heading: "Smarter People Strategy",
    description:
      "We help you build policies, structures, and culture frameworks that attract talent, reduce turnover, and keep your team performing at its best.",
    benefits: [
      "Policy design, org structuring, and role profiling",
      "Performance management and employee engagement frameworks",
      "Training programs tailored to your industry and goals",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   SubsidiaryShowcase - reusable image carousel + tabbed content card
   used for every subsidiary on the home page.
   ────────────────────────────────────────────────────────────────────────── */

export interface Slide {
  src: string;
  title: string;
  caption: string;
  tab: string;
  heading: string;
  description: string;
  benefits: string[];
}

export interface ShowcaseProps {
  logo: string;
  logoAlt: string;
  headerTitle: string;
  headerSubtitle: string;
  slides: Slide[];
  /** Subsidiary page the CTA links to */
  explorePage: PageId;
}

export function SubsidiaryShowcase({
  logo,
  logoAlt,
  headerTitle,
  headerSubtitle,
  slides,
  explorePage,
}: ShowcaseProps) {
  const [current, setCurrent] = useState(0);
  const [autoInterval, setAutoInterval] = useState<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const activate = (index: number) => {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    setCurrent(index);
  };

  const startAuto = () => {
    stopAuto();
    const id = setInterval(() => activate(current + 1), 6000);
    setAutoInterval(id);
  };

  const stopAuto = () => {
    if (autoInterval) clearInterval(autoInterval);
    setAutoInterval(null);
  };

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [current]);

  const slide = slides[current];

  return (
    <section className="py-10 sm:py-12 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className="flex flex-col lg:flex-row w-full bg-card rounded-2xl border border-border overflow-hidden"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          {/* LEFT: Image Slider */}
          <div className="relative w-full lg:w-[52%] min-h-[300px] sm:min-h-[400px] lg:min-h-[560px] bg-jotofa-navy-deep overflow-hidden dark:border-r dark:border-white/10">
            {slides.map((item, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === current ? "opacity-100 z-[2]" : "opacity-0 z-[1]"
                }`}
              >
                 <Image
                   src={item.src}
                   alt={item.title}
                   fill
                   loading={i === 0 ? "eager" : "lazy"}
                   className="object-cover"
                 />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.6) 100%)",
                  }}
                />
                {item.caption && (
                  <div className="absolute inset-0 p-6 sm:p-8 pb-12 sm:pb-14 flex flex-col justify-end z-[3] pointer-events-none">
                    <p className="text-white/95 text-sm sm:text-base max-w-md bg-black/35 backdrop-blur-md border border-white/10 rounded-lg p-3 sm:p-4">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Arrows */}
            <button
              type="button"
              onClick={() => { stopAuto(); activate(current - 1); }}
              className="absolute top-1/2 left-4 z-[4] -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 dark:bg-white/15 dark:hover:bg-white/25 border border-white/15 dark:border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => { stopAuto(); activate(current + 1); }}
              className="absolute top-1/2 right-4 z-[4] -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 dark:bg-white/15 dark:hover:bg-white/25 border border-white/15 dark:border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[4] flex gap-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { stopAuto(); activate(i); }}
                  className="p-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent rounded-full"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span
                    className={`block w-2.5 h-2.5 rounded-full transition-all ${
                      i === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="w-full lg:w-[48%] bg-card p-6 sm:p-8 lg:p-10 flex flex-col">

            {/* Unified header - logo only when the subsidiary has one */}
            <div className="flex items-center gap-4 mb-2">
              {logo && (
                <Image
                  src={logo}
                  alt={logoAlt}
                  width={120}
                  height={48}
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              )}
              <h2 className="text-lg sm:text-xl font-bold text-foreground leading-tight">{headerTitle}</h2>
            </div>
            {headerSubtitle && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{headerSubtitle}</p>
            )}

            {/* Tabs */}
            <div className="flex gap-6 border-b border-border mb-6 overflow-x-auto" role="tablist">
              {slides.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  id={`tab-${i}`}
                  role="tab"
                  aria-selected={i === current}
                  aria-controls={`tabpanel-${i}`}
                  tabIndex={i === current ? 0 : -1}
                  onClick={() => activate(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") activate(current + 1);
                    if (e.key === "ArrowLeft") activate(current - 1);
                  }}
                  className={`px-1 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                    i === current
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.tab}
                  {i === current && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-jotofa-accent rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Panel */}
            <div id={`tabpanel-${current}`} role="tabpanel" aria-labelledby={`tab-${current}`} tabIndex={0}>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{slide.heading}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">{slide.description}</p>
              {slide.benefits.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {slide.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-foreground">
                      <Check className="w-5 h-5 text-jotofa-accent flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* CTA - follows the content instead of hanging at the card bottom */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <PageLink
                page={explorePage}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-jotofa-navy hover:bg-jotofa-navy-deep dark:bg-jotofa-accent dark:hover:bg-jotofa-accent-dark text-white rounded-full font-semibold text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </PageLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SplitSection - one full-width alternating split section per subsidiary.

   Alternation rule: even index (0,2,4) → image LEFT / content RIGHT.
                     odd - index (1,3)   → image RIGHT / content LEFT.
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
  const Icon = subsidiary.icon;
  const reversed = index % 2 === 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col lg:flex-row min-h-[40vh] lg:min-h-[60vh] border-b border-border"
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
        {/* Navy brand overlay - keeps every section on-palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-jotofa-navy-deep/92 via-jotofa-navy/80 to-jotofa-navy/65" />
        {/* Teal glow accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-jotofa-accent/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Giant watermark index number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[150px] sm:text-[210px] lg:text-[250px] font-bold text-white/[0.09] leading-none select-none">
            {subsidiary.index}
          </span>
        </div>

        {/* Logo tile - top-left */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
          <div className="flex items-center justify-center h-24 w-24 rounded-2xl bg-transparent border border-white/20 overflow-hidden">
            {subsidiary.logoSrc ? (
              <Image
                src={subsidiary.logoSrc}
                alt={`${subsidiary.name} logo`}
                width={88}
                height={88}
                className="h-[88px] w-[88px] object-contain"
              />
            ) : (
              <span className="text-lg font-bold text-jotofa-navy">
                {subsidiary.logoMark}
              </span>
            )}
          </div>
        </div>

        {/* Tagline pill - bottom-left */}
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
        {/* Faint watermark number - top right */}
        <span
          aria-hidden
          className="absolute top-4 right-6 sm:top-6 sm:right-10 text-[90px] sm:text-[130px] lg:text-[150px] font-bold text-jotofa-navy/[0.04] dark:text-white/[0.04] leading-none select-none pointer-events-none"
        >
          {subsidiary.index}
        </span>

        <div className="relative z-10 max-w-xl mx-auto lg:mx-0 w-full">
          {/* Sector badges - each pill uses the subsidiary's accent color */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {subsidiary.sectors.map((sector) => {
              const a = accentClasses[subsidiary.accent];
              return (
                <span
                  key={sector}
                   className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${a.bg} ${a.text} ${a.border} border`}
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

          {/* Services grid   2 columns with accent-colored check icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
            {subsidiary.services.map((service) => {
              const a = accentClasses[subsidiary.accent];
              return (
                <div
                  key={service}
                   className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-jotofa-navy/[0.03] dark:bg-white/[0.04] border border-border ${a.hoverBorder} ${a.hoverBg} transition-all duration-200`}
                >
                  <Check className="w-3.5 h-3.5 flex-shrink-0 text-jotofa-accent" />
                  <span className="text-sm font-medium text-foreground/80">
                    {service}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA row - primary "Explore" + optional subtle "Visit Website" text link */}
          <div className="flex flex-wrap items-center gap-3">
            <PageLink
              page={subsidiary.id}
              className="group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-jotofa-navy dark:bg-jotofa-accent text-white text-sm font-semibold transition-all hover:bg-jotofa-navy-deep dark:hover:bg-jotofa-accent-dark cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Explore Entity
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </PageLink>

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

  const cleaningHeaderTitle = "Premium Cleaning & Housekeeping Solutions";
  const cleaningHeaderSubtitle = "From commercial offices to residential homes - we deliver hygiene, consistency, and peace of mind across Tanzania.";

  const staffingHeaderTitle = "Skilled Workforce & HR Solutions";
  const staffingHeaderSubtitle = "Recruitment, labour outsourcing, and HR consulting - connecting the right talent with the right opportunity.";

  const visibleSubsidiaries = subsidiaries.filter((s) => s.id !== "staffing");
  const [activeSubsidiary, setActiveSubsidiary] = useState(visibleSubsidiaries[0]?.id ?? "utec");

  return (
    <section className="relative">
      {/* Section header */}
      <ScrollReveal className="text-center py-20 sm:py-24">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          Four Arms, One Vision
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
          Each subsidiary is a pillar of our group - specialized, yet united
          by a commitment to quality, innovation, and impact.
        </p>
      </ScrollReveal>

      {/* Mobile tab switcher */}
      <div className="lg:hidden px-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto" role="tablist">
          {visibleSubsidiaries.map((subsidiary) => (
            <button
              key={subsidiary.id}
              type="button"
              role="tab"
              aria-selected={activeSubsidiary === subsidiary.id}
              onClick={() => setActiveSubsidiary(subsidiary.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeSubsidiary === subsidiary.id
                  ? "bg-jotofa-navy text-white border-jotofa-navy"
                  : "bg-background text-foreground border-border"
              }`}
            >
              {subsidiary.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile tab switcher */}
      <div className="lg:hidden px-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto" role="tablist">
          {visibleSubsidiaries.map((subsidiary) => (
            <button
              key={subsidiary.id}
              type="button"
              role="tab"
              aria-selected={activeSubsidiary === subsidiary.id}
              onClick={() => setActiveSubsidiary(subsidiary.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeSubsidiary === subsidiary.id
                  ? "bg-jotofa-navy text-white border-jotofa-navy"
                  : "bg-background text-foreground border-border"
              }`}
            >
              {subsidiary.name}
            </button>
          ))}
        </div>
      </div>

      {/* Card showcase for all subsidiaries */}
      <div className="space-y-10 sm:space-y-12">
        {visibleSubsidiaries.map((subsidiary) => {
          const slides =
            subsidiary.id === "utec"
              ? utecSlides
              : cleaningSlides;

          const headerTitle =
            subsidiary.id === "utec"
              ? "Complete Safety, Security & Technology Solutions"
              : cleaningHeaderTitle;

          const headerSubtitle =
            subsidiary.id === "utec"
              ? "From CCTV installations to solar power systems - we protect and power businesses across Tanzania."
              : cleaningHeaderSubtitle;

          return (
            <div key={subsidiary.id} className={activeSubsidiary === subsidiary.id ? "" : "hidden lg:block"}>
              <SubsidiaryShowcase
                logo={subsidiary.logoSrc ?? ""}
                logoAlt={subsidiary.name}
                headerTitle={headerTitle}
                headerSubtitle={headerSubtitle}
                slides={slides}
                explorePage={subsidiary.id}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
