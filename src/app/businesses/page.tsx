import type { Metadata } from "next";
import { BusinessesPage } from "@/components/pages/businesses";

export const metadata: Metadata = {
  title: "Our Businesses",
  description:
    "Explore JOTOFA GROUP's four industry-leading subsidiaries: UTEC Solutions (ICT), JOTOFA Courier, JOTOFA Cleaning, and JOTOFA Staffing.",
  openGraph: {
    title: "Our Businesses   JOTOFA GROUP Subsidiaries",
    description:
      "Explore our four industry-leading subsidiaries spanning ICT, logistics, cleaning, and staffing.",
    images: [{ url: "/images/jotofa-hero-2.webp", width: 1200, height: 630, alt: "JOTOFA GROUP Businesses" }],
  },
};

export default function BusinessesPageRoute() {
  return (
    <main id="main-content" className="flex-1 pt-14 sm:pt-16">
      <BusinessesPage />
    </main>
  );
}
