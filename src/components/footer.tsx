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
   JOTOFA Group Footer — Coca-Cola-inspired visual treatment
   (same content, restyled spacing / typography / decorative blobs)

   Content preserved:
   • Brand: logo + tagline
   • Quick Links, Our Businesses, Careers, Contact Us + Follow Us
   • Bottom bar: copyright, language pill, legal links
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
  { label: "FAQ", page: "faq" },
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
  { label: "Cleaning & Maids", page: "cleaning", iconSrc: "/images/cleaning-logo.png", iconAlt: "Cleaning & Maids logo", iconType: "icon" },
  { label: "Security", page: "security", iconSrc: "/images/security-logo.png", iconAlt: "Security logo", iconType: "icon" },
  { label: "Staffing & Labour", page: "staffing", iconSrc: "/images/staffing-logo.png", iconAlt: "Staffing & Labour logo", iconType: "icon" },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/jotofagroup",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "https://twitter.com/jotofagroup",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/jotofagroup",
  },
];

const CORPORATE_PHONE = "0773 383 800";
const CORPORATE_PHONE_TEL = "+255773383800";
const CORPORATE_EMAIL = "info@jotofagroup.co.tz";
const CORPORATE_ADDRESS =
  "HT House, 2nd Floor, Ubungo, Simu 2000 Road, P.O. Box 75075, Dar es Salaam";
const CORPORATE_HOURS = "Mon – Fri, 8:00am – 6:00pm";

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
      <h4 className="text-sm font-normal text-muted-foreground uppercase tracking-widest mb-5 text-left">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label} className="flex items-center justify-start">
            <button
              onClick={() => setActivePage(link.page)}
              className="text-[15px] font-semibold text-foreground hover:text-jotofa-accent transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background text-left"
            >
              {link.iconSrc && link.iconType === "wordmark" && (
                <Image
                  src={link.iconSrc}
                  alt={link.iconAlt ?? ""}
                  width={80}
                  height={32}
                  className="h-6 w-auto object-contain inline-block align-middle mr-2 dark:brightness-0 dark:invert"
                />
              )}
              {link.iconSrc && link.iconType === "icon" && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm bg-white border border-black/5 dark:bg-white/90 dark:border-white/20 flex-shrink-0 overflow-hidden align-middle mr-1.5">
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
      <h4 className="text-sm font-normal text-muted-foreground uppercase tracking-widest mb-5 text-center sm:text-left">
        Careers
      </h4>
      <ul className="hidden sm:block space-y-3">
        {careerLinks.map((link) => (
          <li key={link.label} className="flex items-center justify-start">
            <button
              onClick={() => setActivePage(link.page)}
              className="text-[15px] font-semibold text-foreground hover:text-jotofa-accent transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background text-left"
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
      <ul className="sm:hidden flex flex-row flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {careerLinks.map((link, i) => (
          <li key={link.label} className="flex items-center justify-center">
            <button
              onClick={() => setActivePage(link.page)}
              className="text-[15px] font-semibold text-foreground hover:text-jotofa-accent transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            >
              {link.label}
            </button>
            {i < careerLinks.length - 1 && (
              <span aria-hidden className="mx-1.5 text-muted-foreground/40 select-none">|</span>
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
    <footer className="relative overflow-hidden bg-background pt-24 pb-14">
      {/* Decorative blobs — bottom, animated, fade at top edge */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[320px] pointer-events-none overflow-hidden [mask-image:linear-gradient(to_top,black,transparent)]">
        <div className="absolute -bottom-32 left-8 h-[420px] w-[420px] rounded-full bg-jotofa-accent/25 blur-[100px] animate-float-blob" style={{ animationDuration: "12s", animationDelay: "0s" }} />
        <div className="absolute -bottom-28 left-[35%] h-[360px] w-[360px] rounded-full bg-jotofa-navy/25 dark:bg-white/10 blur-[100px] animate-float-blob" style={{ animationDuration: "14s", animationDelay: "-3s" }} />
        <div className="absolute -bottom-24 right-8 h-[400px] w-[400px] rounded-full bg-jotofa-accent/20 blur-[100px] animate-float-blob" style={{ animationDuration: "13s", animationDelay: "-6s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-10">
        {/* Brand */}
        <div className="flex flex-col items-center mb-16">
            <Image
              src="/images/jotofa-logo.png"
              alt="JOTOFA Group Logo"
              width={222}
              height={73}
              className="h-16 w-auto object-contain dark:hidden"
            />
            <Image
              src="/images/jotofa-logo-dark.png"
              alt="JOTOFA Group Logo"
              width={222}
              height={73}
              className="h-16 w-auto object-contain hidden dark:block"
            />
          <p className="text-[15px] font-semibold text-foreground text-center">
            Diverse Expertise, Unified Excellence.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
          <LinkColumn title="Quick Links" links={quickLinks} />

          <LinkColumn title="Our Businesses" links={businessLinks} />

          <div className="col-span-2 md:col-span-1">
            <CareersColumn />
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-normal text-muted-foreground uppercase tracking-widest mb-5 text-left">
              Contact Us
            </h4>
            <div className="space-y-3 text-[15px] text-foreground mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-jotofa-accent flex-shrink-0" />
                <span>{CORPORATE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-jotofa-accent flex-shrink-0" />
                <a
                  href={`tel:${CORPORATE_PHONE_TEL}`}
                  className="font-semibold hover:text-jotofa-accent transition-colors"
                >
                  {CORPORATE_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-jotofa-accent flex-shrink-0" />
                <a
                  href={`mailto:${CORPORATE_EMAIL}`}
                  className="font-semibold hover:text-jotofa-accent transition-colors break-all"
                >
                  {CORPORATE_EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-jotofa-accent flex-shrink-0" />
                <span>{CORPORATE_HOURS}</span>
              </div>
            </div>

            <h4 className="text-sm font-normal text-muted-foreground uppercase tracking-widest mb-4 text-left">
              Follow Us
            </h4>
            <div className="flex items-center gap-3 justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-foreground text-background flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
             </div>
           </div>
         </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[13px] font-semibold text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} JOTOFA GROUP LIMITED
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] font-semibold text-foreground transition-colors hover:border-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>English (Tanzania)</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 ml-0.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div className="flex items-center gap-5 text-[13px] font-semibold text-muted-foreground">
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
    </footer>
  );
}
