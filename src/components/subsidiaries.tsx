"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Truck,
  Sparkles,
  ShieldCheck,
  Users,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { usePage } from "@/lib/page-context";

interface Subsidiary {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  services: string[];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

const subsidiaries: Subsidiary[] = [
  {
    id: "utec",
    name: "UTEC Solutions",
    shortName: "UTEC",
    tagline: "ICT & Telecommunications",
    description:
      "Delivering cutting-edge ICT infrastructure, telecommunications solutions, and digital transformation services that connect businesses and communities across Tanzania.",
    services: [
      "Network Infrastructure",
      "Cloud Solutions",
      "Cybersecurity",
      "Software Development",
      "Telecom Services",
    ],
    accentColor: "text-utec-cyan",
    accentBg: "bg-utec-cyan/10",
    accentBorder: "border-utec-cyan/30",
    icon: Monitor,
    image: "/images/utec.png",
  },
  {
    id: "courier",
    name: "JOTOFA Courier & Logistics",
    shortName: "Courier",
    tagline: "Reliable Delivery Network",
    description:
      "A trusted logistics and courier network ensuring timely, secure delivery of goods and documents across Tanzania and East Africa — powered by technology and driven by reliability.",
    services: [
      "Express Delivery",
      "Freight & Cargo",
      "Warehousing",
      "Last-Mile Solutions",
      "Cross-Border Logistics",
    ],
    accentColor: "text-courier-orange",
    accentBg: "bg-courier-orange/10",
    accentBorder: "border-courier-orange/30",
    icon: Truck,
    image: "/images/courier.png",
  },
  {
    id: "cleaning",
    name: "JOTOFA Cleaning & Maids",
    shortName: "Cleaning",
    tagline: "Professional Cleaning Services",
    description:
      "Premium cleaning and housekeeping services for commercial, residential, and industrial spaces — ensuring hygiene, health, and pristine environments every time.",
    services: [
      "Commercial Cleaning",
      "Residential Services",
      "Industrial Cleaning",
      "Specialized Sanitization",
      "Staffed Housekeeping",
    ],
    accentColor: "text-cleaning-green",
    accentBg: "bg-cleaning-green/10",
    accentBorder: "border-cleaning-green/30",
    icon: Sparkles,
    image: "/images/cleaning.png",
  },
  {
    id: "security",
    name: "JOTOFA Security",
    shortName: "Security",
    tagline: "Comprehensive Security Solutions",
    description:
      "Providing robust security services from manned guarding to electronic surveillance — protecting people, assets, and operations with integrity and vigilance.",
    services: [
      "Manned Guarding",
      "Electronic Surveillance",
      "Event Security",
      "Risk Assessment",
      "Security Consulting",
    ],
    accentColor: "text-security-red",
    accentBg: "bg-security-red/10",
    accentBorder: "border-security-red/30",
    icon: ShieldCheck,
    image: "/images/security.png",
  },
  {
    id: "staffing",
    name: "Staffing & Labour Supply",
    shortName: "Staffing",
    tagline: "Workforce Solutions Partner",
    description:
      "Connecting talent with opportunity — providing skilled and semi-skilled labour supply, recruitment, and workforce management solutions for industries across Tanzania.",
    services: [
      "Recruitment Services",
      "Labour Outsourcing",
      "Payroll Management",
      "Training & Development",
      "HR Consulting",
    ],
    accentColor: "text-staffing-purple",
    accentBg: "bg-staffing-purple/10",
    accentBorder: "border-staffing-purple/30",
    icon: Users,
    image: "/images/staffing.png",
  },
];

function SubsidiaryCard({
  subsidiary,
  isSelected,
  onClick,
}: {
  subsidiary: Subsidiary;
  isSelected: boolean;
  onClick: () => void;
}) {
  const Icon = subsidiary.icon;

  return (
    <motion.button
      onClick={onClick}
      className={`relative w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
        isSelected
          ? `${subsidiary.accentBg} ${subsidiary.accentBorder} shadow-lg`
          : "bg-card border-border hover:bg-secondary hover:border-jotofa-accent/20"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
            isSelected ? subsidiary.accentBg : "bg-secondary"
          }`}
        >
          <Icon className={`w-6 h-6 ${subsidiary.accentColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-sm sm:text-base mb-1 ${
              isSelected ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {subsidiary.shortName}
          </h3>
          <p className="text-xs text-muted-foreground/70 truncate">
            {subsidiary.tagline}
          </p>
        </div>
        <ChevronRight
          className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform ${
            isSelected
              ? `rotate-90 ${subsidiary.accentColor}`
              : "text-muted-foreground/40"
          }`}
        />
      </div>
    </motion.button>
  );
}

function SubsidiaryDetail({ subsidiary }: { subsidiary: Subsidiary }) {
  const Icon = subsidiary.icon;
  const { setActivePage } = usePage();

  return (
    <motion.div
      key={subsidiary.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="grid lg:grid-cols-2 gap-8 lg:gap-12"
    >
      {/* Image side */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${subsidiary.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${subsidiary.accentBg} ${subsidiary.accentBorder} border mb-3`}
          >
            <Icon className={`w-4 h-4 ${subsidiary.accentColor}`} />
            <span className={`text-xs font-medium ${subsidiary.accentColor}`}>
              {subsidiary.tagline}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            {subsidiary.name}
          </h3>
        </div>
      </div>

      {/* Info side */}
      <div className="flex flex-col justify-center">
        <p className="text-muted-foreground leading-relaxed mb-8 text-base">
          {subsidiary.description}
        </p>

        <div>
          <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-4">
            Core Services
          </h4>
          <div className="space-y-3">
            {subsidiary.services.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.3 }}
                className="flex items-center gap-3 group"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${subsidiary.accentColor.replace("text-", "bg-")}`}
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {service}
                </span>
                <ArrowUpRight className="w-3 h-3 text-muted-foreground/30 group-hover:text-foreground/50 ml-auto transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setActivePage("contact")}
            className="px-6 py-2.5 bg-jotofa-accent/10 border border-jotofa-accent/25 text-jotofa-gold hover:bg-jotofa-accent/20 rounded-full text-sm font-medium transition-all"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Subsidiaries() {
  const [selectedId, setSelectedId] = useState("utec");
  const selected = subsidiaries.find((s) => s.id === selectedId)!;

  return (
    <section className="relative py-24 sm:py-32 min-h-screen">
      {/* Section background */}
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
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

        {/* Layout: sidebar cards + detail panel */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
          {/* Subsidiary selector sidebar */}
          <StaggerContainer
            className="space-y-3"
            staggerDelay={0.08}
          >
            {subsidiaries.map((s) => (
              <StaggerItem key={s.id}>
                <SubsidiaryCard
                  subsidiary={s}
                  isSelected={selectedId === s.id}
                  onClick={() => setSelectedId(s.id)}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Detail panel */}
          <div className="min-h-[400px] p-6 sm:p-8 rounded-2xl bg-card border border-border">
            <AnimatePresence mode="wait">
              <SubsidiaryDetail subsidiary={selected} />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: horizontal scroll cards for small screens */}
        <div className="lg:hidden mt-8">
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
            {subsidiaries.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  className={`flex-shrink-0 snap-start flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
                    selectedId === s.id
                      ? `${s.accentBg} ${s.accentBorder}`
                      : "bg-card border-border"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${s.accentColor}`} />
                  <span
                    className={`text-sm font-medium whitespace-nowrap ${
                      selectedId === s.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
