"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { usePage } from "@/lib/page-context";

interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  highlights: string[];
}

const services: Service[] = [
  {
    id: "radio-calls",
    title: "Radio Calls Solutions",
    shortTitle: "Radio Communications",
    description:
      "Two-way radio networks for mission-critical communication. Coverage planning, deployment, and support across Tanzania.",
    image: "/images/utec-services/network.jpg",
    highlights: [
      "Two-way radio networks",
      "Coverage planning & optimization",
      "Field-ready deployment",
    ],
  },
  {
    id: "security-systems",
    title: "Security System Installations",
    shortTitle: "Security Systems",
    description:
      "CCTV, access control, intrusion detection, and integrated security systems for commercial and industrial sites.",
    image: "/images/utec-services/cyber.jpg",
    highlights: [
      "HD/UHD CCTV with mobile viewing",
      "Biometric access control & gates",
      "Intruder alarms & fire detection",
    ],
  },
  {
    id: "safety-security-sales",
    title: "Safety and Security Systems Sales",
    shortTitle: "Safety & Security",
    description:
      "Trusted security and safety equipment for commercial, industrial, and institutional clients. Certified, standards-compliant.",
    image: "/images/utec-services/software.jpg",
    highlights: [
      "Safety boots, helmets & hi-vis gear",
      "Metal detectors & screening mirrors",
      "ICOM portable radios & power backup",
    ],
  },
  {
    id: "general-ict",
    title: "General ICT & IT",
    shortTitle: "ICT & IT",
    description:
      "IT infrastructure, hardware, software, and support for modern enterprises. Networking, cabling, and cloud solutions.",
    image: "/images/utec-services/consulting.jpg",
    highlights: [
      "Enterprise laptops, desktops & peripherals",
      "Networking, switches & structured cabling",
      "Video conferencing & cloud storage",
    ],
  },
  {
    id: "solar",
    title: "Solar Solutions",
    shortTitle: "Solar",
    description:
      "High-efficiency solar systems that cut electricity bills by up to 70%. Lighting, water heaters, and street lighting.",
    image: "/images/utec-services/cloud.jpg",
    highlights: [
      "Home & office solar lighting",
      "Solar water heaters",
      "Solar street lights & water pumping",
    ],
  },
];

function ServiceBand({
  service,
  reversed,
}: {
  service: Service;
  reversed: boolean;
}) {
  const { setActivePage } = usePage();

  return (
    <div className="relative w-full py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Text */}
          <ScrollReveal
            direction={reversed ? "left" : "right"}
            className={reversed ? "lg:order-2" : ""}
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-4 leading-tight">
              {service.title}
            </h3>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
              {service.description}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 max-w-lg">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 shrink-0" />
                  <span className="text-sm text-foreground/80">{h}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setActivePage("contact")}
              className="inline-flex items-center px-6 py-3 rounded-xl border border-foreground/15 text-foreground hover:bg-foreground/5 hover:border-foreground/30 text-sm font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Talk to our team
            </button>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal
            direction={reversed ? "right" : "left"}
            className={reversed ? "lg:order-1" : ""}
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_rgba(0,20,40,0.12)]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <span className="text-sm font-semibold text-white drop-shadow-md">
                  {service.shortTitle}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

export function UtecServices() {
  return (
    <section className="relative w-full bg-background" aria-label="Our services">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      {/* Section header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-4">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block w-8 h-px bg-foreground/30" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Our Services
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-foreground">
              Five core expertise areas
            </h2>
            <p className="text-muted-foreground max-w-md text-base">
              Comprehensive ICT and telecom solutions designed for the modern enterprise - engineered, deployed, and supported locally.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Full-width service bands, one bg color throughout, alternating image side */}
      <div className="divide-y divide-border">
        {services.map((s, i) => (
          <ServiceBand
            key={s.id}
            service={s}
            reversed={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
