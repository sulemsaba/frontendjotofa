import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Businesses",
  description:
    "Explore JOTOFA GROUP's diversified subsidiaries: UTEC Solutions (ICT), Courier & Logistics, Cleaning & Maids, Security Services, and Staffing & Labour — powering progress across Tanzania.",
  openGraph: {
    title: "JOTOFA GROUP — Our Businesses & Subsidiaries",
    description:
      "Five specialized subsidiaries spanning ICT, logistics, facilities management, security, and workforce solutions across East Africa.",
  },
  alternates: {
    canonical: "/businesses",
  },
};

export default function BusinessesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
