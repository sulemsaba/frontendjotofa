import type { Metadata } from "next";
import { UTECPage } from "@/components/pages/utec";

export const metadata: Metadata = {
  title: "UTEC Solutions - ICT Services",
  description:
    "UTEC Solutions, a JOTOFA GROUP subsidiary, delivers cutting-edge ICT services in Tanzania - including network infrastructure, smart city solutions, 5G deployment, and digital transformation for businesses.",
  openGraph: {
    title: "UTEC Solutions - ICT Services | JOTOFA GROUP",
    description:
      "Delivering cutting-edge ICT services including network infrastructure, smart city solutions, and digital transformation in Tanzania.",
    images: [{ url: "/images/utec.webp", width: 1200, height: 630, alt: "UTEC Solutions - ICT Services" }],
  },
};

export default function UTECPageRoute() {
  return (
    <main className="flex-1 pt-14 sm:pt-16">
      <UTECPage />
    </main>
  );
}
