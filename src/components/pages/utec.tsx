"use client";

import {
  Monitor,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { ScrollReveal } from "../scroll-reveal";
import { Testimonials } from "../testimonials";
import { utecTestimonials } from "@/lib/testimonials-data";
import { usePage } from "@/lib/page-context";
import { UtecProductSpotlight } from "../utec-product-spotlight";
import { UtecProductRepeater } from "../utec-product-repeater";
import { UtecServices } from "../utec-services";
import { storeProductsPageUrl } from "@/lib/store-config";

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

          <ScrollReveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={storeProductsPageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-utec-cyan hover:bg-utec-cyan/90 text-white font-semibold rounded-full transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Our Products
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setActivePage("contact")}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-utec-cyan/30 text-foreground hover:bg-utec-cyan/10 rounded-full font-semibold transition-all"
              >
                Talk to Sales <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services (modern bento layout) */}
      <UtecServices />

      {/* Featured Products (curated spotlight, real radios pierce above the box) */}
      <UtecProductSpotlight />

      {/* Full catalog — 3 rows (Repeaters / Mobile / Portables), live from the store */}
      <UtecProductRepeater />

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
                Let UTEC Solutions design and deploy the technology infrastructure your business needs to thrive — or browse our online store for ready-to-ship equipment.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setActivePage("contact")}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-utec-cyan hover:bg-utec-cyan/90 text-white font-semibold rounded-full transition-all"
                >
                  Contact Us <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={storeProductsPageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border border-utec-cyan/30 text-foreground hover:bg-utec-cyan/10 rounded-full font-semibold transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Visit Online Store <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
