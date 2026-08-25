"use client";

import {
  Sparkles,
  Building2,
  Home,
  Factory,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../scroll-reveal";
import { TestimonialSlider } from "../testimonial-slider";
import { cleaningTestimonials } from "@/lib/testimonials-data";
import { PageLink } from "@/lib/page-context";

const services = [
  { icon: Building2, title: "Commercial Cleaning", description: "Office buildings, retail spaces, and corporate facilities maintained to the highest standards." },
  { icon: Home, title: "Residential Services", description: "Home cleaning, deep cleaning, and regular housekeeping tailored to your schedule." },
  { icon: Factory, title: "Industrial Cleaning", description: "Factory floors, warehouses, and industrial facilities requiring specialized equipment." },
  { icon: ShieldCheck, title: "Specialized Sanitization", description: "Hospital-grade sanitization and disinfection for healthcare and food-service environments." },
  { icon: Users, title: "Staffed Housekeeping", description: "Dedicated, trained housekeeping staff for hotels, lodges, and residential complexes." },
  { icon: Sparkles, title: "Post-Construction Cleanup", description: "Thorough cleanup after construction and renovation projects, ready for occupancy." },
];

const stats = [
  { value: "200+", label: "Clients Served" },
  { value: "300+", label: "Staff Members" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Availability" },
];

export function CleaningPage() {

  return (
    <div className="bg-background">
      <section className="relative min-h-[70vh] flex items-center py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0  opacity-30" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-jotofa-accent/5 rounded-full blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Professional{" "}
              Cleaning Services
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Premium cleaning and housekeeping services for commercial, residential, and industrial spaces -
              ensuring hygiene, health, and pristine environments every time.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl bg-card border border-border">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-jotofa-accent/15 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Our Services
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-jotofa-accent/25 transition-all duration-300 hover:bg-secondary">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-jotofa-accent/10 mb-5">
                    <service.icon className="w-6 h-6 text-jotofa-accent" />
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
      <TestimonialSlider
        eyebrow="Cleaning Client Stories"
        title={<>What Our Cleaning Clients Say</>}
        subtitle="From office towers to lodges - why organizations across Tanzania choose JOTOFA Cleaning & Maids."
        testimonials={cleaningTestimonials}
      />

      <section className="relative py-20">
        <div className="absolute inset-0 bg-background" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="p-10 rounded-2xl border border-jotofa-accent/15 bg-jotofa-accent/[0.03]">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Need a Spotless Space?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let JOTOFA Cleaning & Maids deliver pristine environments for your business or home.
              </p>
              <PageLink
                page="contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-jotofa-accent hover:bg-jotofa-accent/90 text-jotofa-navy font-semibold rounded-full transition-all"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </PageLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
