"use client";

import Image from "next/image";
import {
  ArrowUp,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { usePage, PageId } from "@/lib/page-context";

/* ──────────────────────────────────────────────────────────────────────────
   Footer link groups.
   All link columns are ALWAYS visible (no accordions, no <details>) per
   Baymard/NNG guidance — desktop and mobile both see every link.
   ────────────────────────────────────────────────────────────────────────── */

interface FooterLink {
  label: string;
  page: PageId;
  /** Optional small icon rendered before the label (e.g. UTEC logo) */
  iconSrc?: string;
  iconAlt?: string;
}

const quickLinks: FooterLink[] = [
  { label: "About Us", page: "about" },
  { label: "Our Strategy", page: "strategy" },
  { label: "CSR Initiatives", page: "csr" },
  { label: "News & Insights", page: "news" },
  { label: "Contact", page: "contact" },
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

const careerLinks: FooterLink[] = [
  { label: "Open Positions", page: "careers" },
  { label: "Why Join Us", page: "careers" },
  { label: "Send Your CV", page: "contact" },
];

/* Social media — kept compact, used in the Contact column under "Follow Us" */
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
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/jotofagroup",
    hoverBg: "hover:bg-[#E4405F]",
  },
];

/* JOTOFA corporate contact (separate from the WhatsApp line used on the
   floating button). The corporate line is the official one from the brand
   guide; WhatsApp remains 0794 974 996 → wa.me/255794974996. */
const CORPORATE_PHONE = "0773 383 800";
const CORPORATE_PHONE_TEL = "+255773383800";
const CORPORATE_EMAIL = "procurement@jotofagroup.co.tz";

/* ──────────────────────────────────────────────────────────────────────────
   FooterPattern — decorative JOTOFA "G" pattern background.
   Uses the official /images/jotofa-g-pattern.png (579×337 seamlessly
   tileable) as a CSS background-image with repeat. Opacity is tuned so the
   G letterform is recognizable as decoration, not loud: 12% in light mode,
   8% in dark mode (per brand-guide visual hierarchy).
   ────────────────────────────────────────────────────────────────────────── */

function FooterPattern() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 bg-repeat opacity-[0.12] dark:opacity-[0.08]"
      style={{
        backgroundImage: "url('/images/jotofa-g-pattern.png')",
        backgroundSize: "220px auto",
      }}
    />
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   LinkList — a single column of links with a heading.
   `horizontalOnMobile` flips the layout on small screens: heading centered
   on top, links in a single horizontal row separated by "|" — used for the
   Careers column where there are only 3 short links.
   ────────────────────────────────────────────────────────────────────────── */

interface LinkListProps {
  title: string;
  links: FooterLink[];
  horizontalOnMobile?: boolean;
  /** 2-col grid on mobile instead of vertical list — used for Quick Links
      and Our Businesses which have 5 links each. */
  twoColOnMobile?: boolean;
}

function LinkList({
  title,
  links,
  horizontalOnMobile = false,
  twoColOnMobile = false,
}: LinkListProps) {
  const { setActivePage } = usePage();

  return (
    <div>
      {/* Heading */}
      <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider text-center sm:text-left">
        {title}
      </h4>

      {/* Vertical list — desktop default */}
      <ul
        className={[
          "space-y-2",
          // On mobile: switch to horizontal row OR 2-col grid
          horizontalOnMobile
            ? "flex flex-row flex-wrap justify-center sm:block sm:space-y-2 gap-x-2 gap-y-1"
            : twoColOnMobile
            ? "grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-1 sm:gap-y-2 sm:space-y-2"
            : "",
        ].join(" ")}
      >
        {links.map((link, i) => (
          <li
            key={link.label}
            className={[
              "flex items-center justify-center sm:justify-start",
              horizontalOnMobile ? "text-center sm:text-left" : "",
            ].join(" ")}
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
            {/* Pipe separator between horizontal items — visible only on
                mobile (where the row layout is), hidden on sm+ vertical list. */}
            {horizontalOnMobile && i < links.length - 1 && (
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-background z-0" />

      {/* Decorative G-pattern overlay */}
      <FooterPattern />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ───────── Desktop / tablet 5-column grid ─────────
            Brand (2 cols) | Quick Links | Our Businesses | Careers | Contact+Follow */}
        <div className="py-10 sm:py-14 grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-6 lg:gap-8">
          {/* Brand column — spans 2 cols on md+, full width first row on mobile */}
          <div className="col-span-2 md:col-span-2">
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
              Powering progress across Tanzania through diversified excellence
              in ICT, logistics, professional services, security, and staffing.
            </p>

            {/* Compact contact block under brand blurb — desktop only here,
                full details in the Contact column on the right. */}
            <div className="mt-5 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-jotofa-gold/70 flex-shrink-0" />
                <span>Ubungo Simu 2000, HT House 2nd Floor, Dar es Salaam</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-jotofa-gold/70 flex-shrink-0" />
                <a
                  href={`tel:${CORPORATE_PHONE_TEL}`}
                  className="hover:text-foreground transition-colors"
                >
                  {CORPORATE_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-jotofa-gold/70 flex-shrink-0" />
                <a
                  href={`mailto:${CORPORATE_EMAIL}`}
                  className="hover:text-foreground transition-colors break-all"
                >
                  {CORPORATE_EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-jotofa-gold/70 flex-shrink-0" />
                <span>Mon – Fri, 8:00am – 6:00pm</span>
              </div>
            </div>
          </div>

          {/* Quick Links — 2-col grid on mobile, vertical list on desktop */}
          <LinkList
            title="Quick Links"
            links={quickLinks}
            twoColOnMobile
          />

          {/* Our Businesses — 2-col grid on mobile, vertical list on desktop.
              UTEC link carries the small UTEC logo icon. */}
          <LinkList
            title="Our Businesses"
            links={businessLinks}
            twoColOnMobile
          />

          {/* Careers — horizontal row on mobile (full-width col-span-2 so the
              three short links fit on one line with pipe separators), vertical
              list on desktop. */}
          <div className="col-span-2 md:col-span-1">
            <LinkList
              title="Careers"
              links={careerLinks}
              horizontalOnMobile
            />
          </div>

          {/* Contact + Follow Us column */}
          <div>
            <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex items-center gap-3 mb-5">
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

            <p className="text-xs text-muted-foreground leading-relaxed">
              Connect with JOTOFA Group on social media for the latest news,
              insights, and career opportunities.
            </p>

            {/* WhatsApp CTA — quick chat shortcut, keeps WhatsApp discoverable
                without putting it in the navbar. */}
            <a
              href="https://wa.me/255794974996"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/20 transition-colors"
            >
              <Phone className="w-3 h-3" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} JOTOFA GROUP LIMITED · All rights reserved
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

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-jotofa-accent/10 hover:border-jotofa-accent/20 transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-muted-foreground group-hover:text-jotofa-gold transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
