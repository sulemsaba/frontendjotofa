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
   JOTOFA Group Footer — Expert UX 4-column architecture
   (per NN/g + Baymard Institute principles)

   Column 1: Brand Anchor
     • JOTOFA logo
     • Holding statement (trimmed — no full contact block here)

   Column 2: Corporate + Careers (grouped to consolidate internal links)
     • CORPORATE: About Us, Our Strategy, Investor Relations, CSR, News
     • CAREERS: Open Positions, Why Join Us, Send Your CV
       (on mobile, Careers is a horizontal pipe-separated row)

   Column 3: Our Businesses
     • UTEC Solutions (with small UTEC logo icon)
     • Courier & Logistics, Cleaning & Maids, Security, Staffing & Labour

   Column 4: Contact Us + Follow Us
     • Address, Phone, Email, Hours
     • Social icons (LinkedIn, Twitter, Instagram)
     • WhatsApp CTA pill

   Bottom bar (legal "junk drawer"):
     • Left: © 2026 JOTOFA GROUP LIMITED
     • Right: Privacy Policy · Terms of Service
     (No back-to-top here — that's a floating FAB elsewhere)

   Background: subtle JOTOFA "G" monogram pattern at low opacity.
   ────────────────────────────────────────────────────────────────────────── */

interface FooterLink {
  label: string;
  page: PageId;
  /** Optional small icon rendered before the label (e.g. UTEC logo) */
  iconSrc?: string;
  iconAlt?: string;
}

const corporateLinks: FooterLink[] = [
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

/* JOTOFA corporate contact (per Visual Identity Guidelines p.32) */
const CORPORATE_PHONE = "0773 383 800";
const CORPORATE_PHONE_TEL = "+255773383800";
const CORPORATE_EMAIL = "info@jotofagroup.co.tz";
const CORPORATE_ADDRESS =
  "HT House, 2nd Floor, Ubungo, Simu 2000 Road, P.O. Box 75075, Dar es Salaam";
const CORPORATE_HOURS = "Mon – Fri, 8:00am – 6:00pm";
const WHATSAPP_URL = "https://wa.me/255794974996";

/* ──────────────────────────────────────────────────────────────────────────
   FooterPattern — decorative JOTOFA "G" monogram background.
   Uses the official /images/jotofa-g-pattern.png (579×337 seamlessly
   tileable) as a CSS background-image with repeat. Opacity tuned to be
   decorative-not-distractive: 6% in light mode, 4% in dark mode
   (per Baymard "signal-to-noise" guidance).
   ────────────────────────────────────────────────────────────────────────── */

function FooterPattern() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 bg-repeat opacity-[0.06] dark:opacity-[0.04]"
      style={{
        backgroundImage: "url('/images/jotofa-g-pattern.png')",
        backgroundSize: "220px auto",
      }}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   LinkColumn — heading + vertical list of footer links.
   On desktop: vertical list. On mobile: 2-col grid (compact).
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
      <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-center sm:text-left">
        {title}
      </h4>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-1 sm:gap-y-2 sm:space-y-2">
        {links.map((link) => (
          <li
            key={link.label}
            className="flex items-center justify-center sm:justify-start"
          >
            <button
              onClick={() => setActivePage(link.page)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
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
   CorporateAndCareersColumn — Column 2.
   Contains two stacked sub-sections: CORPORATE links (vertical list) and
   CAREERS links. On mobile, Careers switches to a horizontal pipe-separated
   row to save vertical space (per user spec).
   ────────────────────────────────────────────────────────────────────────── */

function CorporateAndCareersColumn() {
  const { setActivePage } = usePage();

  return (
    <div>
      {/* CORPORATE sub-section */}
      <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-center sm:text-left">
        Corporate
      </h4>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-1 sm:gap-y-2 sm:space-y-2 mb-6">
        {corporateLinks.map((link) => (
          <li
            key={link.label}
            className="flex items-center justify-center sm:justify-start"
          >
            <button
              onClick={() => setActivePage(link.page)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* CAREERS sub-section — horizontal pipe row on mobile */}
      <h4 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider text-center sm:text-left">
        Careers
      </h4>
      <ul className="flex flex-row flex-wrap justify-center sm:block sm:space-y-2 gap-x-2 gap-y-1">
        {careerLinks.map((link, i) => (
          <li
            key={link.label}
            className="flex items-center justify-center sm:justify-start"
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
                className="mx-1 text-muted-foreground/40 select-none inline sm:hidden"
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
    <footer className="relative border-t border-border overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-background z-0" />

      {/* Decorative G-pattern overlay */}
      <FooterPattern />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ───────── Desktop / tablet 4-column grid ─────────
            Brand (2 cols) | Corporate+Careers | Our Businesses | Contact+Follow */}
        <div className="py-10 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {/* ─── Column 1: Brand Anchor ─── */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/jotofa-logo.png"
                alt="JOTOFA Group Logo"
                width={222}
                height={73}
                className="h-9 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
              A diversified Tanzanian holding company delivering excellence
              across industries through ICT, logistics, professional services,
              security, and staffing.
            </p>
          </div>

          {/* ─── Column 2: Corporate + Careers ─── */}
          <CorporateAndCareersColumn />

          {/* ─── Column 3: Our Businesses ─── */}
          <LinkColumn title="Our Businesses" links={businessLinks} />

          {/* ─── Column 4: Contact Us + Follow Us ─── */}
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-center sm:text-left">
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

            {/* Follow Us sub-section */}
            <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-center sm:text-left">
              Follow Us
            </h4>
            <div className="flex items-center gap-3 justify-center sm:justify-start mb-4">
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

        {/* Bottom bar — legal */}
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
