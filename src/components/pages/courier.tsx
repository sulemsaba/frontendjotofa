"use client";

import {
  Truck,
  Package,
  Warehouse,
  Globe,
  Clock,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../scroll-reveal";
import { Testimonials } from "../testimonials";
import { courierTestimonials } from "@/lib/testimonials-data";
import { usePage } from "@/lib/page-context";

const services = [
  { icon: Package, title: "Express Delivery", description: "Same-day and next-day delivery services for documents and parcels across Tanzania." },
  { icon: Truck, title: "Freight & Cargo", description: "Full truckload and less-than-truckload freight solutions for businesses of all sizes." },
  { icon: Warehouse, title: "Warehousing", description: "Secure, climate-controlled storage facilities with real-time inventory management." },
  { icon: Globe, title: "Cross-Border Logistics", description: "Seamless customs clearance and transportation across East African borders." },
  { icon: Clock, title: "Last-Mile Solutions", description: "Reliable last-mile delivery connecting businesses with their customers nationwide." },
  { icon: Truck, title: "Fleet Management", description: "GPS-tracked fleet operations ensuring transparency and on-time delivery." },
];

const stats = [
  { value: "50+", label: "Regions Served" },
  { value: "10K+", label: "Deliveries Monthly" },
  { value: "98%", label: "On-Time Rate" },
  { value: "3", label: "Countries Covered" },
];

export function CourierPage() {
  const { setActivePage } = usePage();

  return (
    <div className="bg-background">
      <section className="relative min-h-[70vh] flex items-center py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-courier-orange/5 rounded-full blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-courier-orange/20 bg-courier-orange/5 mb-6">
              <Truck className="w-4 h-4 text-courier-orange" />
              <span className="text-courier-orange text-sm font-medium">Courier & Logistics</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Reliable{" "}
              <span className="text-gold-gradient">Delivery Network</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              A trusted logistics and courier network ensuring timely, secure delivery of goods and documents
              across Tanzania and East Africa — powered by technology and driven by reliability.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border">
                  <div className="text-2xl sm:text-3xl font-bold text-courier-orange">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-courier-orange/15 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Our <span className="text-courier-orange">Services</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-courier-orange/25 transition-all duration-300 hover:bg-secondary">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-courier-orange/10 mb-5">
                    <service.icon className="w-6 h-6 text-courier-orange" />
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
        eyebrow="Courier Client Stories"
        title={<>What Our <span className="text-gold-gradient">Logistics Clients Say</span></>}
        subtitle="Why businesses across Tanzania and East Africa trust JOTOFA Courier & Logistics with their deliveries."
        accent="text-courier-orange"
        accentBg="bg-courier-orange/10"
        accentBorder="border-courier-orange/20"
        testimonials={courierTestimonials}
      />

      <section className="relative py-20">
        <div className="absolute inset-0 bg-background" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="p-10 rounded-2xl border border-courier-orange/15 bg-courier-orange/[0.03]">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Need a <span className="text-courier-orange">Delivery Partner</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let JOTOFA Courier & Logistics handle your supply chain with speed, reliability, and transparency.
              </p>
              <button
                onClick={() => setActivePage("contact")}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-courier-orange hover:bg-courier-orange/90 text-white font-semibold rounded-full transition-all"
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
