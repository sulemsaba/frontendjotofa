import type { Metadata } from "next";
import { CleaningPage } from "@/components/pages/cleaning";

export const metadata: Metadata = {
  title: "Cleaning & Facility Management",
  description:
    "JOTOFA Cleaning delivers professional cleaning, janitorial, and facility management services for commercial and residential clients across Tanzania. Reliable, eco-friendly, and certified.",
  openGraph: {
    title: "Cleaning & Facility Management | JOTOFA GROUP",
    description:
      "Professional cleaning, janitorial, and facility management services for commercial and residential clients across Tanzania.",
    images: [{ url: "/images/cleaning.webp", width: 1200, height: 630, alt: "JOTOFA Cleaning   Facility Management" }],
  },
};

export default function CleaningPageRoute() {
  return (
    <main className="flex-1 pt-14 sm:pt-16">
      <CleaningPage />
    </main>
  );
}
