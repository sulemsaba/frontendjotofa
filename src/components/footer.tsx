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
  },
  { label: "Courier & Logistics", page: "courier" },
  { label: "Cleaning & Maids", page: "cleaning" },
  { label: "Security", page: "security" },
  { label: "Staffing & Labour", page: "staffing" },
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
              {link.iconSrc && (
                <Image
                  src={link.iconSrc}
                  alt={link.iconAlt ?? ""}
                  width={28}
                  height={14}
                  className="h-3.5 w-auto object-contain inline-block align-middle"
                />
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
      <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-left">
        Careers
      </h4>
      {/* Desktop: vertical list */}
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
      {/* Mobile: horizontal pipe-separated row */}
      <ul className="sm:hidden flex flex-row flex-wrap items-center justify-start gap-x-1.5 gap-y-1">
        {careerLinks.map((link, i) => (
          <li
            key={link.label}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => setActivePage(link.page)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            >
              {link.label}
            </button>
            {i < careerLinks.length - 1 && (
              <span
                aria-hidden
                className="mx-1 text-muted-foreground/40 select-none"
              >
                |
              </span>
            )}
          </li>
        ))}
      </ul>
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
        {/* ─── Top banner: logo + holding statement (full-width strip) ─── */}
        <div className="py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border">
          <Image
            src="/images/jotofa-logo.png"
            alt="JOTOFA Group Logo"
            width={222}
            height={73}
            className="h-9 w-auto object-contain dark:brightness-0 dark:invert"
          />
          <p className="text-sm text-muted-foreground leading-relaxed sm:max-w-md sm:text-right">
            A diversified Tanzanian holding company delivering excellence across
            industries through ICT, logistics, professional services, security,
            and staffing.
          </p>
        </div>

        {/* ─── 4-column link grid — all in one row on desktop ─── */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Col 1: Quick Links */}
          <LinkColumn title="Quick Links" links={quickLinks} />

          {/* Col 2: Our Businesses */}
          <LinkColumn title="Our Businesses" links={businessLinks} />

          {/* Col 3: Careers */}
          <CareersColumn />

          {/* Col 4: Contact Us + Follow Us (merged) */}
          <div>
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
              <button className="hover:text-foreground transition-colors cursor-pointer">
                Privacy Policy
              </button>
              <span className="text-muted-foreground/40">·</span>
              <button className="hover:text-foreground transition-colors cursor-pointer">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
