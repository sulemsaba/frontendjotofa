"use client";

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
    span: "lg:col-span-2",
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Threat protection, vulnerability assessment, and compliance.",
    span: "lg:col-span-1",
  },
  {
    id: "software",
    icon: Code,
    title: "Software Development",
    description:
      "Custom apps, mobile solutions, and digital platforms built for local needs.",
    span: "lg:col-span-1",
  },
  {
    id: "telecom",
    icon: PhoneCall,
    title: "Telecom Services",
    description:
      "VoIP, unified communications, and PBX connecting businesses across the region.",
    span: "lg:col-span-2",
  },
  {
    id: "consulting",
    icon: Monitor,
    title: "IT Consulting",
    description:
      "Strategic technology advisory helping organizations navigate digital transformation.",
    span: "lg:col-span-2",
  },
];

function ServiceCell({ service, index }: { service: Service; index: number }) {
  const { setActivePage } = usePage();
  const Icon = service.icon;
  const num = String(index + 1).padStart(2, "0");

  if (service.featured) {
    return (
      <StaggerItem key={service.id} className={service.span}>
        <motion.button
          type="button"
          onClick={() => setActivePage("contact")}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * index, duration: 0.5, ease: "easeOut" }}
          className="group relative w-full h-full text-left overflow-hidden rounded-3xl border border-utec-cyan/25 bg-utec-cyan/[0.04] p-7 sm:p-8 transition-all duration-300 hover:border-utec-cyan/45 hover:shadow-[0_24px_60px_-20px_rgba(0,169,183,0.35)]"
        >
          {/* Decorative grid + glow (the "visual" of the featured cell) */}
          <div
            aria-hidden
            className="absolute inset-0 bg-grid-pattern opacity-[0.35] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -top-16 -right-12 w-64 h-64 bg-utec-cyan/20 rounded-full blur-[90px] pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
          />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-utec-cyan/15 ring-1 ring-utec-cyan/30">
                <Icon className="w-7 h-7 text-utec-cyan" />
              </span>
              <span className="text-xs font-mono font-semibold text-utec-cyan/70 tracking-widest">
                {num}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-utec-cyan/10 border border-utec-cyan/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-utec-cyan animate-pulse" />
              <span className="text-[11px] font-semibold text-utec-cyan uppercase tracking-wide">
                Core Capability
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {service.title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-md">
              {service.description}
            </p>

            {service.highlights && (
              <ul className="space-y-2 mb-6">
                {service.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2.5 text-sm text-foreground/80"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-utec-cyan/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-utec-cyan" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-utec-cyan">
              Talk to our team
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </motion.button>
      </StaggerItem>
    );
  }

  return (
    <StaggerItem key={service.id} className={service.span}>
      <motion.button
        type="button"
        onClick={() => setActivePage("contact")}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 * index, duration: 0.5, ease: "easeOut" }}
        className="group relative w-full h-full text-left overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-utec-cyan/35 hover:bg-secondary/40 hover:-translate-y-0.5"
      >
        {/* Hover glow */}
        <div
          aria-hidden
          className="absolute -top-10 -right-10 w-32 h-32 bg-utec-cyan/0 rounded-full blur-[60px] pointer-events-none transition-all duration-500 group-hover:bg-utec-cyan/20"
        />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-5">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-utec-cyan/10 transition-colors duration-300 group-hover:bg-utec-cyan/20">
              <Icon className="w-5 h-5 text-utec-cyan" />
            </span>
            <span className="text-[11px] font-mono font-semibold text-muted-foreground/60 tracking-widest">
              {num}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5">
            {service.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-utec-cyan opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Learn more
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
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

        {/* Bento grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:auto-rows-[minmax(180px,auto)]"
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
