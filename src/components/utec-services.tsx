"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Wifi,
  Cloud,
  Shield,
  Code,
  PhoneCall,
  Monitor,
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
    id: "network",
    icon: Wifi,
    title: "Network Infrastructure",
    description:
      "Fiber optic, wireless, and structured cabling solutions for enterprises and governments — designed, deployed, and maintained end-to-end.",
    image: "/images/utec-services/network.jpg",
    span: "lg:col-span-2 lg:row-span-2",
    featured: true,
    highlights: [
      "Fiber & wireless backhaul",
      "Structured cabling (Cat6A / fiber)",
      "Active monitoring & SLAs",
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Scalable cloud hosting, migration, and management tailored for the East African market.",
    image: "/images/utec-services/cloud.jpg",
    span: "lg:col-span-2",
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Threat protection, vulnerability assessment, and compliance.",
    image: "/images/utec-services/cyber.jpg",
    span: "lg:col-span-1",
  },
  {
    id: "software",
    icon: Code,
    title: "Software Development",
    description:
      "Custom apps, mobile solutions, and digital platforms built for local needs.",
    image: "/images/utec-services/software.jpg",
    span: "lg:col-span-1",
  },
  {
    id: "telecom",
    icon: PhoneCall,
    title: "Telecom Services",
    description:
      "VoIP, unified communications, and PBX connecting businesses across the region.",
    image: "/images/utec-services/telecom.jpg",
    span: "lg:col-span-2",
  },
  {
    id: "consulting",
    icon: Monitor,
    title: "IT Consulting",
    description:
      "Strategic technology advisory helping organizations navigate digital transformation.",
    image: "/images/utec-services/consulting.jpg",
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
            ? "min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] border-utec-cyan/30 hover:border-utec-cyan/60 hover:shadow-[0_28px_70px_-22px_rgba(0,169,183,0.45)]"
            : "min-h-[260px] sm:min-h-[300px] border-border/60 hover:border-utec-cyan/45 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
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
        {/* Subtle teal tint that strengthens on hover — ties to UTEC brand */}
        <div
          aria-hidden
          className="absolute inset-0 bg-utec-cyan/0 group-hover:bg-utec-cyan/15 transition-colors duration-500"
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
              <Icon className={`${featured ? "w-7 h-7" : "w-5 h-5"} text-jotofa-accent-light`} />
            </span>
            <span className="text-[11px] font-mono font-semibold text-white/60 tracking-widest">
              {num}
            </span>
          </div>

          {/* Bottom-anchored content */}
          <div className="mt-auto">
            {featured && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-utec-cyan/25 border border-utec-cyan/40 backdrop-blur-sm mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-utec-cyan animate-pulse" />
                <span className="text-[11px] font-semibold text-cyan-100 uppercase tracking-wide">
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
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-utec-cyan/30 ring-1 ring-utec-cyan/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-200" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <span
              className={`inline-flex items-center gap-1.5 font-semibold text-cyan-200 transition-all duration-300 ${
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
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-utec-cyan/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-utec-cyan/20 bg-utec-cyan/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-utec-cyan" />
              <span className="text-utec-cyan text-xs font-semibold tracking-wide uppercase">
                What we do
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3">
              Our <span className="text-utec-cyan">Services</span>
            </h2>
            <p className="text-muted-foreground">
              Comprehensive ICT and telecom solutions designed for the modern
              enterprise — engineered, deployed, and supported locally.
            </p>
          </div>
          <p className="text-sm text-muted-foreground/80 sm:text-right max-w-xs">
            Six interconnected practices, one accountable delivery team.
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
