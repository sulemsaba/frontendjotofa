"use client";

import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { usePage, PageId } from "@/lib/page-context";

/* ──────────────────────────────────────────────────────────────────────────
   JOTOFA Group Footer — simplified 4-column architecture
   (per user spec, no background pattern, all 4 columns in one row on desktop)

   Top banner: logo + trimmed holding statement (full-width strip)

   4 columns (one row on desktop, stacked on mobile):
     • Col 1 — Quick Links:        About Us, Our Strategy, Investor Relations,
                                    CSR Initiatives, News & Insights
     • Col 2 — Our Businesses:     UTEC, Courier, Cleaning, Security, Staffing
     • Col 3 — Careers:            Open Positions | Why Join Us | Send Your CV
                                    (horizontal pipe-separated on mobile)
     • Col 4 — Contact Us + Follow Us (merged):
                                    Address, Phone, Email, Hours
                                    + Social icons (LinkedIn, Twitter, Facebook)
                                    + WhatsApp CTA

   Bottom bar: © 2026 JOTOFA GROUP LIMITED · Privacy Policy · Terms of Service

   NO background pattern — clean, plain background only.
   ────────────────────────────────────────────────────────────────────────── */

interface FooterLink {
  label: string;
  page: PageId;
  iconSrc?: string;
  iconAlt?: string;
  /** "wordmark" = wide horizontal logo (e.g. UTEC). "icon" = square logo mark. */
  iconType?: "wordmark" | "icon";
}

const quickLinks: FooterLink[] = [
  { label: "About Us", page: "about" },
  { label: "Our Strategy", page: "strategy" },
  { label: "Investor Relations", page: "strategy" },
  { label: "CSR Initiatives", page: "csr" },
  { label: "News & Insights", page: "news" },
];

const careerLinks: FooterLink[] = [
  { label: "Open Positions", page: "careers" },
  { label: "Why Join Us", page: "careers" },
  { label: "Send Your CV", page: "contact" },
];

const businessLinks: FooterLink[] = [
  {
    label: "UTEC Solutions",
    page: "utec",
    iconSrc: "/images/utec-logo.png",
    iconAlt: "UTEC logo",
    iconType: "wordmark",
  },
  { label: "Courier & Logistics", page: "courier", iconSrc: "/images/courier-logo.png", iconAlt: "Courier & Logistics logo", iconType: "icon" },
  { label: "Cleaning & Maids", page: "cleaning", iconSrc: "/images/cleaning-logo.png", iconAlt: "Cleaning & Maids logo", iconType: "icon" },
  { label: "Security", page: "security", iconSrc: "/images/security-logo.png", iconAlt: "Security logo", iconType: "icon" },
  { label: "Staffing & Labour", page: "staffing", iconSrc: "/images/staffing-logo.png", iconAlt: "Staffing & Labour logo", iconType: "icon" },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/jotofagroup",
    hoverBg: "hover:bg-[#0A66C2]",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "https://twitter.com/jotofagroup",
    hoverBg: "hover:bg-[#1DA1F2]",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/jotofagroup",
    hoverBg: "hover:bg-[#1877F2]",
  },
];

const CORPORATE_PHONE = "0773 383 800";
const CORPORATE_PHONE_TEL = "+255773383800";
const CORPORATE_EMAIL = "info@jotofagroup.co.tz";
const CORPORATE_ADDRESS =
  "HT House, 2nd Floor, Ubungo, Simu 2000 Road, P.O. Box 75075, Dar es Salaam";
const CORPORATE_HOURS = "Mon – Fri, 8:00am – 6:00pm";
const WHATSAPP_URL = "https://wa.me/255794974996";

/* ──────────────────────────────────────────────────────────────────────────
   LinkColumn — heading + vertical list of footer links.
   Always visible (never expandable). Left-aligned on all viewports.
   ────────────────────────────────────────────────────────────────────────── */

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  const { setActivePage } = usePage();

  return (
    <div>
      <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-left">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label} className="flex items-center justify-start">
            <button
              onClick={() => setActivePage(link.page)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background text-left"
            >
              {link.iconSrc && link.iconType === "wordmark" && (
                <Image
                  src={link.iconSrc}
                  alt={link.iconAlt ?? ""}
                  width={28}
                  height={14}
                  className="h-3.5 w-auto object-contain inline-block align-middle"
                />
              )}
              {link.iconSrc && link.iconType === "icon" && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm bg-white border border-black/5 dark:border-white/10 flex-shrink-0 overflow-hidden align-middle">
                  <Image
                    src={link.iconSrc}
                    alt={link.iconAlt ?? ""}
                    width={16}
                    height={16}
                    className="w-3.5 h-3.5 object-contain"
                  />
                </span>
              )}
              <span>{link.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CareersColumn — Col 3.
   Vertical list on desktop. Horizontal pipe-separated row on mobile
   ("Open Positions | Why Join Us | Send Your CV") to save vertical space.
   ────────────────────────────────────────────────────────────────────────── */

function CareersColumn() {
  const { setActivePage } = usePage();

  return (
    <div>
      {/* Heading: centered on mobile (full-width row), left-aligned on desktop */}
      <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-center sm:text-left">
        Careers
      </h4>
      {/* Desktop: vertical list, left-aligned */}
      <ul className="hidden sm:block space-y-2">
        {careerLinks.map((link) => (
          <li key={link.label} className="flex items-center justify-start">
            <button
              onClick={() => setActivePage(link.page)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background text-left"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
      {/* Mobile: horizontal pipe-separated row, centered (full-width column) */}
      <ul className="sm:hidden flex flex-row flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
        {careerLinks.map((link, i) => (
          <li key={link.label} className="flex items-center justify-center">
            <button
              onClick={() => setActivePage(link.page)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            >
              {link.label}
            </button>
            {i < careerLinks.length - 1 && (
              <span aria-hidden className="mx-1 text-muted-foreground/40 select-none">|</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CtaBand — "Let's Build Together" call-to-action strip.
   Sits at the top of the footer (replaces the old full Contact section
   that used to live on the homepage). Compact: heading + one-line
   subtitle + a single "Get in Touch" button that routes to the contact
   page. Theme-aware.
   ────────────────────────────────────────────────────────────────────────── */

function CtaBand() {
  const { setActivePage } = usePage();

  return (
    <div className="py-10 sm:py-12 border-b border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Let&apos;s{" "}
            <span className="text-gold-gradient">Build Together</span>
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Whether you&apos;re looking for a partnership, a service inquiry,
            or just want to learn more — we&apos;re here to help.
          </p>
        </div>
        <button
          onClick={() => setActivePage("contact")}
          className="group inline-flex items-center gap-2 flex-shrink-0 px-7 py-3.5 rounded-full bg-jotofa-accent text-white font-semibold text-sm transition-all hover:bg-jotofa-accent-dark shadow-[0_8px_24px_-8px_rgba(0,169,183,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(0,169,183,0.6)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Get in Touch
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Footer
   ────────────────────────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── CTA band — replaces the old homepage Contact section ─── */}
        <CtaBand />

        {/* ─── 5-column grid — all in one row on desktop ───
            Col 1 Brand (logo + tagline) | Col 2 Quick Links |
            Col 3 Our Businesses | Col 4 Careers | Col 5 Contact Us + Follow Us

            MOBILE LAYOUT (per user spec):
            • Brand — full width
            • Quick Links + Our Businesses — 2-col row (short lists)
            • Careers — FULL WIDTH so the horizontal pipe-separated
              links (Open Positions | Why Join Us | Send Your CV) display centered
            • Contact Us + Follow Us — FULL WIDTH (too much content for half-width)
         */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Col 1: Brand Anchor — logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/images/jotofa-logo.png"
              alt="JOTOFA Group Logo"
              width={222}
              height={73}
              className="h-9 w-auto object-contain dark:brightness-0 dark:invert mb-4"
            />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              A diversified Tanzanian holding company delivering excellence
              across industries through ICT, logistics, professional services,
              security, and staffing.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <LinkColumn title="Quick Links" links={quickLinks} />

          {/* Col 3: Our Businesses */}
          <LinkColumn title="Our Businesses" links={businessLinks} />

          {/* Col 4: Careers — full-width on mobile so horizontal pipe row centers nicely */}
          <div className="col-span-2 md:col-span-1">
            <CareersColumn />
          </div>

          {/* Col 5: Contact Us + Follow Us (merged) — full-width on mobile (too much content for half-width) */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-left">
              Contact Us
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground mb-5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-jotofa-accent/70 flex-shrink-0" />
                <span>{CORPORATE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-jotofa-accent/70 flex-shrink-0" />
                <a
                  href={`tel:${CORPORATE_PHONE_TEL}`}
                  className="hover:text-foreground transition-colors"
                >
                  {CORPORATE_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-jotofa-accent/70 flex-shrink-0" />
                <a
                  href={`mailto:${CORPORATE_EMAIL}`}
                  className="hover:text-foreground transition-colors break-all"
                >
                  {CORPORATE_EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-jotofa-accent/70 flex-shrink-0" />
                <span>{CORPORATE_HOURS}</span>
              </div>
            </div>

            {/* Follow Us sub-section — merged into Contact column */}
            <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-left">
              Follow Us
            </h4>
            <div className="flex items-center gap-3 justify-start mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all duration-200 hover:text-white hover:border-transparent hover:scale-110 active:scale-95 ${social.hoverBg}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#25D366]/10 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/20 transition-colors"
            >
              <Phone className="w-3 h-3" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* ─── Bottom bar — legal ─── */}
        <div className="py-5 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} JOTOFA GROUP LIMITED
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Privacy Policy — coming soon"
                className="hover:text-foreground transition-colors cursor-not-allowed opacity-60"
              >
                Privacy Policy
              </button>
              <span className="text-muted-foreground/40" aria-hidden>·</span>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Terms of Service — coming soon"
                className="hover:text-foreground transition-colors cursor-not-allowed opacity-60"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
