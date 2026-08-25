"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "../scroll-reveal";
import { TestimonialSlider } from "../testimonial-slider";
import { utecTestimonials } from "@/lib/testimonials-data";
import { PageLink } from "@/lib/page-context";
import { UtecProductSpotlight } from "../utec-product-spotlight";
import { UtecProductRepeater } from "../utec-product-repeater";
import { UtecServices } from "../utec-services";
import { MediaMultiCol } from "../media-multi-col";
import { storeProductsPageUrl } from "@/lib/store-config";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Support Coverage" },
];

export function UTECPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isModalOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const timer = setTimeout(() => closeBtnRef.current?.focus(), 50);
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const modal = modalRef.current;
      if (!modal) return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", trap);
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", trap);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [isModalOpen]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      e.currentTarget.reset();
    }, 2000);
  };

  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center py-28 sm:py-36 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-background" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-6">
              <Image
                src="/images/utec-logo.png"
                alt="UTEC Solutions"
                width={180}
                height={60}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              ICT &amp; Telecommunications
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
                 <div key={stat.label} className="text-center p-4 rounded-2xl bg-card border border-border">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
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
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-jotofa-accent hover:bg-jotofa-accent-dark text-jotofa-navy font-semibold rounded-full transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Our Products
                <ExternalLink className="w-4 h-4" />
              </a>
              <PageLink
                page="contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-foreground/20 text-foreground hover:bg-foreground/5 rounded-full font-semibold transition-all"
              >
                Talk to Sales <ArrowRight className="w-4 h-4" />
              </PageLink>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why UTEC — media + multi-column content */}
      <MediaMultiCol
        image="/images/subsidiaries/utec.jpg"
        imageAlt="UTEC Solutions team at work"
        heading="Connectivity that keeps your operations running."
        col1={
          <>
            We deploy two-way radio networks, integrated security systems, and IT
            infrastructure built for the Tanzanian operating environment. Designed,
            installed, and maintained by a team that shows up.
          </>
        }
        col2={
          <>
            Commercial, industrial, and institutional clients across every region
            rely on us for communication, safety, and power. Reliable today,
            connected tomorrow.
          </>
        }
        ctaLabel="Learn more about us"
        ctaHref="/about"
      />

      {/* Mission / Vision / Core Values */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            <div className="rounded-2xl border border-border bg-muted/40 dark:bg-white/[0.03] p-6 sm:p-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Mission</h3>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                To continually improve services by setting and achieving objectives in line with customers&apos; requirements
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 dark:bg-white/[0.03] p-6 sm:p-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Vision</h3>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                To lead in customers valuing in the field of wireless communications (RADIO CALL COMMUNICATION), Security and safety systems, Solar system, Generator and General IT &amp; ICT solution
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 dark:bg-white/[0.03] p-6 sm:p-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Core Values</h3>
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                To provide a multi-cultural environment that motivates team work, continuous learning and development and reward of an individual achievement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services (modern bento layout) */}
      <UtecServices />

      {/* Featured Products (curated spotlight, real radios pierce above the box) */}
      <UtecProductSpotlight />

      {/* Full catalog - 3 rows (Repeaters / Mobile / Portables), live from the store */}
      <UtecProductRepeater />

      {/* Testimonials */}
      <TestimonialSlider
        eyebrow="UTEC Client Stories"
        title={<>What UTEC Clients Say</>}
        subtitle="Real outcomes from organizations that transformed their operations with UTEC Solutions."
        testimonials={utecTestimonials}
      />

      {/* UTEC CTA - red band (UTEC's own brand color, kept per request) */}
      <section className="relative py-10 sm:py-12" style={{ backgroundColor: "#d60b0b" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-wide">
                Do you need help with Telecommunication services?
              </h2>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                Whether you're looking for a partnership, a service inquiry, or just want to learn more - we're here to help.
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 text-[#d60b0b] font-semibold rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Request a Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            ref={modalRef}
            className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 relative"
          >
            <button
              ref={closeBtnRef}
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-5 min-w-[44px] min-h-[44px] flex items-center justify-center text-2xl text-gray-400 hover:text-gray-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-navy/30"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Free Quote</h3>
            {isSubmitted ? (
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4" />
                Quote request sent. We'll reply within 1 hour.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
              <label htmlFor="utec-name" className="block mb-1.5 text-sm font-semibold text-gray-700">Full Name</label>
              <input id="utec-name" type="text" placeholder="e.g. John Doe" required autoComplete="name" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-jotofa-accent/40 focus:border-jotofa-accent" />

              <label htmlFor="utec-email" className="block mb-1.5 text-sm font-semibold text-gray-700">Email Address</label>
              <input id="utec-email" type="email" placeholder="john@domain.com" required autoComplete="email" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-jotofa-accent/40 focus:border-jotofa-accent" />

              <label htmlFor="utec-phone" className="block mb-1.5 text-sm font-semibold text-gray-700">Phone Number</label>
              <input id="utec-phone" type="tel" placeholder="+255 700 000 000" required autoComplete="tel" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-jotofa-accent/40 focus:border-jotofa-accent" />

              <label htmlFor="utec-message" className="block mb-1.5 text-sm font-semibold text-gray-700">Message</label>
              <textarea id="utec-message" placeholder="Tell us about your telecom needs..." rows={4} className="w-full mb-5 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-jotofa-accent/40 focus:border-jotofa-accent resize-vertical"></textarea>

              <button type="submit" className="w-full py-3 bg-jotofa-accent hover:bg-jotofa-accent-dark text-jotofa-navy font-semibold rounded transition-colors">
                Send Request
              </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
