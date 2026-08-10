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
import { usePage, PageId } from "@/lib/page-context";
import { storeProductsPageUrl } from "@/lib/store-config";

/* ──────────────────────────────────────────────────────────────────────────
   Accent color tokens   each subsidiary has its own brand accent used for
   sector badges, service check icons, and hover/border states.
   Static class strings so Tailwind can statically extract them.
   ────────────────────────────────────────────────────────────────────────── */
const accentClasses: Record<
  "utec-cyan" | "cleaning-green" | "security-red" | "staffing-purple",
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
   "Five Arms, One Vision"   Home page subsidiaries section.

   Redesigned as SPLIT-SCREEN STACKED CARDS to match the businesses page:
   • Full-width alternating split sections   one image LEFT, next image RIGHT
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
  /** "01" – "05"   used as the big watermark number */
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
  accent: "utec-cyan" | "cleaning-green" | "security-red" | "staffing-purple";
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
    id: "cleaning",
    index: "02",
    name: "Cleaning & Maids",
    tagline: "Professional Cleaning",
    sectors: ["Facilities", "Hygiene", "Maintenance"],
    description:
      "Premium cleaning and housekeeping for commercial, residential, and industrial spaces   ensuring hygiene and pristine environments every time.",
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
    index: "03",
    name: "JOTOFA Security",
    tagline: "Comprehensive Security",
    sectors: ["Security", "Surveillance", "Risk"],
    description:
      "Robust security services from manned guarding to electronic surveillance   protecting people, assets, and operations with integrity and vigilance.",
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
    index: "04",
    name: "Staffing & Labour",
    tagline: "Workforce Solutions",
    sectors: ["Recruitment", "HR", "Workforce"],
    description:
      "Connecting talent with opportunity   skilled and semi-skilled labour supply, recruitment, and workforce management for industries across Tanzania.",
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
   UtecShowcase   image carousel + tabbed content card for UTEC.
   ────────────────────────────────────────────────────────────────────────── */

const utecSlides = [
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
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
    src: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
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
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    title: "IT & ICT Solutions",
    caption: "Enterprise-grade hardware and cloud infrastructure that keeps your business connected and competitive.",
    tab: "IT & ICT",
    heading: "Power Your Business with Modern Tech",
    description:
      "Downtime costs money. We build reliable IT infrastructure that keeps your team productive and your data secure   from networking hardware to cloud migration.",
    benefits: [
      "Boost productivity with enterprise laptops, desktops, and peripherals built for heavy workloads",
      "Zero downtime networking with professional design, switches, and structured cabling",
      "Collaborate seamlessly with video conferencing, cloud storage, and custom web solutions",
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
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
    src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    title: "Commercial Cleaning",
    caption: "Professional office and commercial space cleaning that maintains hygiene and impresses clients.",
    tab: "Commercial",
    heading: "Spotless Commercial Spaces",
    description:
      "We deliver consistent, detail-oriented cleaning for offices, retail spaces, and commercial facilities   creating healthy environments your team and customers notice.",
    benefits: [
      "Daily, weekly, or custom schedules tailored to your operations",
      "Trained cleaners using industrial-grade equipment and supplies",
      "Quality audits and feedback loops for continuous improvement",
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1527515545081-5db817c4b62f?auto=format&fit=crop&w=1200&q=80",
    title: "Residential Cleaning",
    caption: "Reliable home cleaning services that give you more time for what matters most.",
    tab: "Residential",
    heading: "Homes That Feel Brand New",
    description:
      "From routine maintenance to deep cleaning, our residential teams treat every home with care   using safe products and proven checklists for consistent results.",
    benefits: [
      "Flexible scheduling including weekends and same-day service",
      "Eco-friendly cleaning products safe for families and pets",
      "Vetted, insured, and background-checked cleaning professionals",
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
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

const securitySlides = [
  {
    src: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
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
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    title: "Manned Guarding",
    caption: "Professional, licensed security officers who protect your people, assets, and reputation.",
    tab: "Guarding",
    heading: "Professional Manned Guarding",
    description:
      "Our security officers are trained, licensed, and deployed with clear protocols   providing visible deterrence and rapid response when it matters most.",
    benefits: [
      "Uniformed officers for corporate, residential, and event sites",
      "Access control, patrols, and incident reporting included",
      "24/7 supervision and backup coverage",
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    title: "Electronic Surveillance",
    caption: "Advanced surveillance and alarm systems designed to detect, deter, and document threats.",
    tab: "Surveillance",
    heading: "Intelligent Surveillance Systems",
    description:
      "From CCTV to smart alarms, we design systems that give you real-time visibility and recorded evidence   fully integrated with your existing infrastructure.",
    benefits: [
      "Remote monitoring via mobile app and desktop dashboards",
      "AI-enhanced analytics for unusual activity detection",
      "Maintenance plans and firmware updates included",
    ],
  },
];

const staffingSlides = [
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    title: "Recruitment Services",
    caption: "We find the right talent, fast   so you can focus on running your business.",
    tab: "Recruitment",
    heading: "Talent That Fits Your Team",
    description:
      "We source, screen, and present candidates who match your skills requirements and culture   reducing bad hires and accelerating onboarding.",
    benefits: [
      "Permanent, contract, and temporary placement options",
      "Industry-specific candidate pools and assessment tools",
      "End-to-end onboarding support and follow-up",
    ],
  },
  {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
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
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
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
   SubsidiaryShowcase   reusable image carousel + tabbed content card
   used for every subsidiary on the home page.
   ────────────────────────────────────────────────────────────────────────── */

interface Slide {
  src: string;
  title: string;
  caption: string;
  tab: string;
  heading: string;
  description: string;
  benefits: string[];
}

interface ShowcaseProps {
  logo: string;
  logoAlt: string;
  headerTitle: string;
  headerSubtitle: string;
  slides: Slide[];
  onExplore: () => void;
}

function SubsidiaryShowcase({
  logo,
  logoAlt,
  headerTitle,
  headerSubtitle,
  slides,
  onExplore,
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
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto w-full max-w-none px-2 sm:px-4 lg:px-6">
        <div
          ref={cardRef}
          className="flex flex-col lg:flex-row w-full bg-white dark:bg-white/[0.03] rounded-2xl border border-border overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.12)] min-h-[720px] lg:min-h-[680px]"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          {/* LEFT: Image Slider */}
          <div className="relative w-full lg:w-[52%] min-h-[340px] sm:min-h-[460px] lg:min-h-[680px] bg-[#1a1a1a] overflow-hidden">
            {slides.map((item, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === current ? "opacity-100 z-[2]" : "opacity-0 z-[1]"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.6) 100%)",
                  }}
                />
                <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end z-[3]">
                  <p className="text-white/95 text-sm sm:text-base max-w-md bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-3 sm:p-4">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}

            {/* Arrows */}
            <button
              type="button"
              onClick={() => { stopAuto(); activate(current - 1); }}
              className="absolute top-1/2 left-4 z-[4] -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center opacity-0 lg:opacity-100 transition-opacity"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => { stopAuto(); activate(current + 1); }}
              className="absolute top-1/2 right-4 z-[4] -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center opacity-0 lg:opacity-100 transition-opacity"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[4] flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { stopAuto(); activate(i); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="w-full lg:w-[48%] bg-[#f4f4f2] dark:bg-white/[0.03] p-6 sm:p-8 lg:p-10 flex flex-col">

            {/* Unified header */}
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={logo}
                alt={logoAlt}
                width={120}
                height={48}
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground leading-tight">{headerTitle}</h2>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-black/10 dark:border-white/10 mb-6 overflow-x-auto" role="tablist">
              {slides.map((item, i) => (
                <button
                  key={item.tab}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  onClick={() => activate(i)}
                  className={`px-1 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                    i === current
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.tab}
                  {i === current && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a1a1a] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">{slide.heading}</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">{slide.description}</p>
              <ul className="space-y-3 mb-8">
                {slide.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="w-5 h-5 text-[#c62828] flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1a1a1a] dark:bg-[#d60b0b] text-white rounded-full font-semibold text-sm transition-all hover:shadow-lg"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SplitSection   one full-width alternating split section per subsidiary.

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
        {/* Navy brand overlay   keeps every section on-palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-jotofa-navy-deep/92 via-jotofa-navy/80 to-jotofa-navy/65" />
        {/* Teal glow accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-jotofa-accent/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Giant watermark index number */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[150px] sm:text-[210px] lg:text-[250px] font-black text-white/[0.09] leading-none select-none">
            {subsidiary.index}
          </span>
        </div>

        {/* Logo tile   top-left */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
          <div className="flex items-center justify-center h-24 w-24 rounded-xl bg-transparent border border-white/20 shadow-lg overflow-hidden">
            {subsidiary.logoSrc ? (
              <Image
                src={subsidiary.logoSrc}
                alt={`${subsidiary.name} logo`}
                width={88}
                height={88}
                className="h-[88px] w-[88px] object-contain"
              />
            ) : (
              <span className="text-lg font-black text-jotofa-navy">
                {subsidiary.logoMark}
              </span>
            )}
          </div>
        </div>

        {/* Tagline pill   bottom-left */}
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
        {/* Faint watermark number   top right */}
        <span
          aria-hidden
          className="absolute top-4 right-6 sm:top-6 sm:right-10 text-[90px] sm:text-[130px] lg:text-[150px] font-black text-jotofa-navy/[0.04] dark:text-white/[0.04] leading-none select-none pointer-events-none"
        >
          {subsidiary.index}
        </span>

        <div className="relative z-10 max-w-xl mx-auto lg:mx-0 w-full">
          {/* Sector badges   each pill uses the subsidiary's accent color */}
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

          {/* Services grid   2 columns with accent-colored check icons */}
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

          {/* CTA row   primary "Explore" + optional subtle "Visit Website" text link */}
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
  const { setActivePage } = usePage();

  const cleaningHeaderTitle = "Premium Cleaning & Housekeeping Solutions";
  const cleaningHeaderSubtitle = "From commercial offices to residential homes   we deliver hygiene, consistency, and peace of mind across Tanzania.";

  const securityHeaderTitle = "Professional Security & Surveillance Solutions";
  const securityHeaderSubtitle = "Protecting people, assets, and operations with manned guarding, CCTV, and integrated security systems.";

  const staffingHeaderTitle = "Skilled Workforce & HR Solutions";
  const staffingHeaderSubtitle = "Recruitment, labour outsourcing, and HR consulting   connecting the right talent with the right opportunity.";

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
          Five Arms, <span className="text-jotofa-accent">One Vision</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
          Each subsidiary is a pillar of our group   specialized, yet united
          by a commitment to quality, innovation, and impact.
        </p>
      </ScrollReveal>

      {/* Card showcase for all subsidiaries */}
      <div className="space-y-10 sm:space-y-12">
        {subsidiaries.map((subsidiary) => {
          if (subsidiary.id === "staffing") return null;

          const slides =
            subsidiary.id === "utec"
              ? utecSlides
              : subsidiary.id === "cleaning"
                ? cleaningSlides
                : securitySlides;

          const headerTitle =
            subsidiary.id === "utec"
              ? "Complete Safety, Security & Technology Solutions"
              : subsidiary.id === "cleaning"
                ? cleaningHeaderTitle
                : subsidiary.id === "security"
                  ? securityHeaderTitle
                  : staffingHeaderTitle;

          const headerSubtitle =
            subsidiary.id === "utec"
              ? "From CCTV installations to solar power systems   we protect and power businesses across Tanzania."
              : subsidiary.id === "cleaning"
                ? cleaningHeaderSubtitle
                : subsidiary.id === "security"
                  ? securityHeaderSubtitle
                  : staffingHeaderSubtitle;

          return (
            <SubsidiaryShowcase
              key={subsidiary.id}
              logo={subsidiary.logoSrc ?? ""}
              logoAlt={subsidiary.name}
              headerTitle={headerTitle}
              headerSubtitle={headerSubtitle}
              slides={slides}
              onExplore={() => setActivePage(subsidiary.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
