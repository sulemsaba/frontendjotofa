"use client";

import Image from "next/image";
import {
  ArrowUp,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { usePage, PageId } from "@/lib/page-context";

const footerLinks = {
  Group: [
    { label: "About Us", page: "about" as PageId },
    { label: "Our Strategy", page: "strategy" as PageId },
    { label: "CSR Initiatives", page: "csr" as PageId },
    { label: "News & Insights", page: "news" as PageId },
    { label: "Contact", page: "contact" as PageId },
  ],
  Businesses: [
    { label: "UTEC Solutions", page: "utec" as PageId },
    { label: "Courier & Logistics", page: "courier" as PageId },
    { label: "Cleaning & Maids", page: "cleaning" as PageId },
    { label: "Security", page: "security" as PageId },
    { label: "Staffing & Labour", page: "staffing" as PageId },
  ],
  Careers: [
    { label: "Open Positions", page: "careers" as PageId },
    { label: "Why Join Us", page: "careers" as PageId },
    { label: "Send Your CV", page: "contact" as PageId },
  ],
  Resources: [
    { label: "Investor Relations", page: "strategy" as PageId },
    { label: "Privacy Policy", page: "home" as PageId },
    { label: "Terms of Service", page: "home" as PageId },
  ],
};

/* Social media links — horizontal row, same icons as blog share section */
const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/jotofagroup",
    hoverBg: "hover:bg-[#E4405F]",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "https://twitter.com/jotofagroup",
    hoverBg: "hover:bg-[#1DA1F2]",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/jotofagroup",
    hoverBg: "hover:bg-[#0A66C2]",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:procurement@jotofagroup.co.tz",
    hoverBg: "hover:bg-[#D97706]",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    href: "https://wa.me/255794974996",
    hoverBg: "hover:bg-[#25D366]",
  },
];

export function Footer() {
  const { setActivePage } = usePage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border">
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-10 sm:py-14 grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand column — spans 2 cols */}
          <div className="col-span-2">
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
            <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              <p>Ubungo Simu 2000, HT House 2nd Floor</p>
              <p>
                <a href="tel:+255794974996" className="hover:text-foreground transition-colors">0794 974 996</a>
                {" · "}
                <a href="mailto:procurement@jotofagroup.co.tz" className="hover:text-foreground transition-colors">procurement@jotofagroup.co.tz</a>
              </p>
              <p>Mon – Fri, 8:00am – 6:00pm</p>
            </div>
          </div>

          {/* Link columns — one unified text-muted-foreground color */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => setActivePage(link.page)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social media row — horizontal, full width */}
        <div className="py-5 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social icons — horizontal row */}
            <div className="flex items-center gap-3">
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

            {/* Copyright + links */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()} JOTOFA GROUP</span>
              <span className="hidden sm:inline">·</span>
              <button className="hidden sm:inline hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <span className="hidden sm:inline">·</span>
              <button className="hidden sm:inline hover:text-foreground transition-colors">
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
