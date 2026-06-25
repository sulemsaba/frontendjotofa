"use client";

import {
  Monitor,
  Wifi,
  Shield,
  Cloud,
  Code,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../scroll-reveal";
import { Testimonials } from "../testimonials";
import { utecTestimonials } from "@/lib/testimonials-data";
import { usePage } from "@/lib/page-context";

const services = [
  { icon: Wifi, title: "Network Infrastructure", description: "Fiber optic, wireless, and structured cabling solutions for enterprises and governments." },
  { icon: Cloud, title: "Cloud Solutions", description: "Scalable cloud hosting, migration, and management services tailored for the East African market." },
  { icon: Shield, title: "Cybersecurity", description: "Comprehensive threat protection, vulnerability assessment, and compliance solutions." },
  { icon: Code, title: "Software Development", description: "Custom applications, mobile solutions, and digital platforms built for local needs." },
  { icon: PhoneCall, title: "Telecom Services", description: "VoIP, unified communications, and PBX solutions connecting businesses across the region." },
  { icon: Monitor, title: "IT Consulting", description: "Strategic technology advisory helping organizations navigate digital transformation." },
];

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Support Coverage" },
];

export function UTECPage() {
  const { setActivePage } = usePage();

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-utec-cyan/5 rounded-full blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-utec-cyan/20 bg-utec-cyan/5 mb-6">
              <Monitor className="w-4 h-4 text-utec-cyan" />
              <span className="text-utec-cyan text-sm font-medium">UTEC Solutions</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              ICT &{" "}
              <span className="text-gold-gradient">Telecommunications</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Delivering cutting-edge ICT infrastructure, telecommunications solutions,
              and digital transformation services that connect businesses and communities across Tanzania.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border">
                  <div className="text-2xl sm:text-3xl font-bold text-utec-cyan">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-utec-cyan/15 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Our <span className="text-utec-cyan">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive ICT and telecom solutions designed for the modern enterprise.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-utec-cyan/25 transition-all duration-300 hover:bg-secondary">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-utec-cyan/10 mb-5">
                    <service.icon className="w-6 h-6 text-utec-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials
        eyebrow="UTEC Client Stories"
        title={<>What UTEC <span className="text-gold-gradient">Clients Say</span></>}
        subtitle="Real outcomes from organizations that transformed their operations with UTEC Solutions."
        accent="text-utec-cyan"
        accentBg="bg-utec-cyan/10"
        accentBorder="border-utec-cyan/20"
        testimonials={utecTestimonials}
      />

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-background" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="p-10 rounded-2xl border border-utec-cyan/15 bg-utec-cyan/[0.03]">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Ready to <span className="text-utec-cyan">Transform</span> Your Business?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let UTEC Solutions design and deploy the technology infrastructure your business needs to thrive.
              </p>
              <button
                onClick={() => setActivePage("contact")}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-utec-cyan hover:bg-utec-cyan/90 text-white font-semibold rounded-full transition-all"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
