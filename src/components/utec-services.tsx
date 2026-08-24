"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Radio,
  ShieldCheck,
  Sun,
  Monitor,
  PhoneCall,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { usePage } from "@/lib/page-context";

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Local image path (under /public). */
  image: string;
  /** Tailwind col-span classes for the bento layout (lg breakpoint). */
  span: string;
  /** Whether this is the large featured cell. */
  featured?: boolean;
  /** Quick highlights shown only on the featured cell. */
  highlights?: string[];
}

const services: Service[] = [
  {
    id: "radio-calls",
    icon: Radio,
    title: "Radio Calls Solutions",
    description:
      "Professional two-way radio communication systems for reliable, instant connectivity across operations.",
    image: "/images/utec-services/network.jpg",
    span: "lg:col-span-2 lg:row-span-2",
    featured: true,
    highlights: [
      "Two-way radio networks",
      "Coverage planning & optimization",
      "Field-ready deployment",
    ],
  },
  {
    id: "security-systems",
    icon: ShieldCheck,
    title: "Security System Installations",
    description:
      "End-to-end installation of CCTV, access control, intrusion detection, and integrated security systems.",
    image: "/images/utec-services/cyber.jpg",
    span: "lg:col-span-1",
  },
  {
    id: "safety-security-sales",
    icon: ShieldCheck,
    title: "Safety and Security Systems Sales",
    description:
      "Supply of trusted security and safety equipment for commercial, industrial, and institutional clients.",
    image: "/images/utec-services/software.jpg",
    span: "lg:col-span-1",
  },
  {
    id: "general-ict",
    icon: Monitor,
    title: "General ICT & IT",
    description:
      "Comprehensive IT infrastructure, hardware, software, and support services for modern enterprises.",
    image: "/images/utec-services/consulting.jpg",
    span: "lg:col-span-2",
  },
  {
    id: "solar",
    icon: Sun,
    title: "Solar Solutions",
    description:
      "Reliable solar power systems designed to reduce energy costs and ensure uninterrupted operations.",
    image: "/images/utec-services/cloud.jpg",
    span: "lg:col-span-2",
  },
];

function ServiceCell({ service, index }: { service: Service; index: number }) {
  const { setActivePage } = usePage();
  const Icon = service.icon;
  const num = String(index + 1).padStart(2, "0");
  const featured = !!service.featured;

  return (
    <StaggerItem key={service.id} className={service.span}>
      <motion.button
        type="button"
        onClick={() => setActivePage("contact")}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 * index, duration: 0.5, ease: "easeOut" }}
        className={`group relative w-full h-full text-left overflow-hidden rounded-3xl border transition-all duration-300 ${
          featured
            ? "min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] border-jotofa-accent/40 hover:border-jotofa-accent/70 hover:shadow-[0_28px_70px_-22px_rgba(214,11,11,0.45)]"
            : "min-h-[260px] sm:min-h-[300px] border-white/10 hover:border-jotofa-accent/40 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
        }`}
      >
        {/* ── Background image (fills the card, zooms on hover) ── */}
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
          priority={featured}
        />

        {/* ── Dark gradient overlay (bottom-up) for text readability ── */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15"
        />
         {/* Subtle red tint that strengthens on hover - ties to UTEC brand */}
        <div
          aria-hidden
          className="absolute inset-0 bg-jotofa-accent/0 group-hover:bg-jotofa-accent/15 transition-colors duration-500"
        />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col h-full p-6 sm:p-7">
          {/* Top row: icon chip + number */}
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/25 ${
                featured ? "w-14 h-14" : "w-11 h-11"
              }`}
            >
              <Icon className={`${featured ? "w-7 h-7" : "w-5 h-5"} text-jotofa-accent`} />
            </span>
            <span className="text-[11px] font-mono font-semibold text-white/60 tracking-widest">
              {num}
            </span>
          </div>

          {/* Bottom-anchored content */}
          <div className="mt-auto">
            {featured && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-jotofa-accent/25 border border-jotofa-accent/40 backdrop-blur-sm mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-jotofa-accent animate-pulse" />
                <span className="text-[11px] font-semibold text-red-100 uppercase tracking-wide">
                  Core Capability
                </span>
              </div>
            )}

            <h3
              className={`font-bold text-white leading-tight mb-2 ${
                featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
              }`}
            >
              {service.title}
            </h3>
            <p
              className={`text-white/80 leading-relaxed mb-4 ${
                featured ? "text-sm sm:text-base max-w-md" : "text-[13px] sm:text-sm"
              }`}
            >
              {service.description}
            </p>

            {featured && service.highlights && (
              <ul className="space-y-1.5 mb-5">
                {service.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2.5 text-sm text-white/90"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-jotofa-accent/30 ring-1 ring-jotofa-accent/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-200" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <span
              className={`inline-flex items-center gap-1.5 font-semibold text-white transition-all duration-300 ${
                featured
                  ? "text-sm"
                  : "text-xs opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
              }`}
            >
              {featured ? "Talk to our team" : "Learn more"}
              <ArrowUpRight className={featured ? "w-4 h-4" : "w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"} />
            </span>
          </div>
        </div>
      </motion.button>
    </StaggerItem>
  );
}

export function UtecServices() {
  return (
    <section className="relative py-20 sm:py-28 bg-jotofa-navy-deep">
      <div className="absolute inset-0 bg-jotofa-navy-deep" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-accent/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              Our Services
            </h2>
            <p className="text-white/70">
              Comprehensive ICT and telecom solutions designed for the modern
              enterprise - engineered, deployed, and supported locally.
            </p>
          </div>
           <p className="text-sm text-white/80 sm:text-right max-w-xs">
            Five core expertise areas, one accountable delivery team.
          </p>
        </ScrollReveal>

        {/* Image-led bento grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          staggerDelay={0.08}
        >
          {services.map((s, i) => (
            <ServiceCell key={s.id} service={s} index={i} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
