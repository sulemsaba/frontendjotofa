"use client";

import { usePathname } from "next/navigation";

const siteUrl = "https://jotofagroup.co.tz";

export function JsonLd() {
  const pathname = usePathname();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JOTOFA GROUP",
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    description:
      "A diversified Tanzanian holding company driving innovation through ICT, logistics, cleaning, security, and staffing solutions across East Africa.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ubungo Simu 2000, HT House 2nd Floor",
      addressLocality: "Dar es Salaam",
      addressCountry: "TZ",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+255-794-974-996",
        contactType: "customer service",
        email: "procurement@jotofagroup.co.tz",
        availableLanguage: ["English", "Swahili"],
      },
    ],
    sameAs: [
      "https://instagram.com/jotofagroup",
      "https://twitter.com/jotofagroup",
      "https://linkedin.com/company/jotofagroup",
    ],
    knowsAbout: [
      "Information and Communications Technology",
      "Logistics and Courier Services",
      "Cleaning and Facility Management",
      "Security Services",
      "Staffing and Labour Solutions",
    ],
    foundingDate: "2014",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 500 },
    areaServed: ["Tanzania", "Kenya", "Uganda", "East Africa"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JOTOFA GROUP",
    url: siteUrl,
    description:
      "Powering progress across Tanzania through diversified excellence in ICT, logistics, professional services, security, and staffing.",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    name: pathname === "/" ? "Home" : `Breadcrumb - ${pathname}`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      ...(pathname !== "/"
        ? [
            {
              "@type": "ListItem" as const,
              position: 2,
              name: pathname
                .split("/")
                .filter(Boolean)
                .pop()
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()) || "Page",
              item: `${siteUrl}${pathname}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
        key="jsonld-organization"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
        key="jsonld-website"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
        key="jsonld-breadcrumb"
      />
    </>
  );
}
