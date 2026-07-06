"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const pathLabels: Record<string, string> = {
  about: "About Us",
  businesses: "Our Businesses",
  strategy: "Leadership & Strategy",
  csr: "CSR & Sustainability",
  news: "News & Insights",
  careers: "Careers",
  contact: "Contact Us",
  utec: "UTEC Solutions",
  courier: "Courier & Logistics",
  cleaning: "Cleaning & Maids",
  security: "Security Services",
  staffing: "Staffing & Labour",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = pathLabels[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return { href, label, isLast: index === segments.length - 1 };
  });

  // Skip for news article slugs (dynamic routes) — breadcrumbs shown in news detail
  if (segments.length > 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full py-3">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            {crumb.isLast ? (
              <span className="text-foreground font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
