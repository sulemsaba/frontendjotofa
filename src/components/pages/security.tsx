"use client";

import {
  ShieldCheck,
  Eye,
  Camera,
  AlertTriangle,
  Shield,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../scroll-reveal";
import { usePage } from "@/lib/page-context";

const services = [
  { icon: UserCheck, title: "Manned Guarding", description: "Professional, vetted security personnel for corporate, residential, and industrial sites." },
  { icon: Camera, title: "Electronic Surveillance", description: "CCTV installation, monitoring, and alarm systems with 24/7 control room coverage." },
  { icon: Shield, title: "Event Security", description: "Comprehensive security planning and personnel for conferences, concerts, and public events." },
  { icon: AlertTriangle, title: "Risk Assessment", description: "Thorough security audits identifying vulnerabilities and recommending mitigation strategies." },
  { icon: Eye, title: "Security Consulting", description: "Expert advisory on security policy, compliance, and infrastructure design." },
  { icon: ShieldCheck, title: "VIP Protection", description: "Discreet, professional close protection services for executives and dignitaries." },
];

const stats = [
  { value: "100+", label: "Sites Protected" },
  { value: "400+", label: "Security Officers" },
  { value: "0", label: "Major Incidents" },
  { value: "24/7", label: "Monitoring" },
];

export function SecurityPage() {
  const { setActivePage } = usePage();

  return (
    <div className="bg-background">
      <section className="relative min-h-[70vh] flex items-center py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-security-red/5 rounded-full blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-security-red/20 bg-security-red/5 mb-6">
              <ShieldCheck className="w-4 h-4 text-security-red" />
              <span className="text-security-red text-sm font-medium">JOTOFA Security</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Comprehensive{" "}
              <span className="text-gold-gradient">Security Solutions</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Providing robust security services from manned guarding to electronic surveillance —
              protecting people, assets, and operations with integrity and vigilance.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border">
                  <div className="text-2xl sm:text-3xl font-bold text-security-red">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-security-red/15 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Our <span className="text-security-red">Services</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-security-red/25 transition-all duration-300 hover:bg-secondary">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-security-red/10 mb-5">
                    <service.icon className="w-6 h-6 text-security-red" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative py-20">
        <div className="absolute inset-0 bg-background" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="p-10 rounded-2xl border border-security-red/15 bg-security-red/[0.03]">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Need <span className="text-security-red">Protection</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let JOTOFA Security safeguard your people, assets, and operations with proven expertise.
              </p>
              <button
                onClick={() => setActivePage("contact")}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-security-red hover:bg-security-red/90 text-white font-semibold rounded-full transition-all"
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
