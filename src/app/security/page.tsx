import type { Metadata } from "next";
import { SecurityPage } from "@/components/pages/security";

export const metadata: Metadata = {
  title: "Security Services",
  description:
    "JOTOFA Security provides professional security services in Tanzania including manned guarding, CCTV surveillance, access control systems, and integrated security solutions for businesses.",
  openGraph: {
    title: "Security Services | JOTOFA GROUP",
    description:
      "Professional security services including manned guarding, CCTV surveillance, access control, and integrated security solutions for businesses in Tanzania.",
    images: [{ url: "/images/security.webp", width: 1200, height: 630, alt: "JOTOFA Security Services" }],
  },
};

export default function SecurityPageRoute() {
  return (
    <main id="main-content" className="flex-1 pt-14 sm:pt-16">
      <SecurityPage />
    </main>
  );
}
