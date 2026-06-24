import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning & Maids — Professional Cleaning Services",
  description:
    "JOTOFA Cleaning & Maids offers premium commercial, residential, and industrial cleaning, specialized sanitization, and staffed housekeeping across Tanzania.",
  openGraph: {
    title: "JOTOFA Cleaning & Maids — Professional Cleaning Services",
    description:
      "Premium cleaning and housekeeping services for commercial, residential, and industrial spaces — ensuring hygiene, health, and pristine environments every time.",
  },
  alternates: {
    canonical: "/cleaning",
  },
};

export default function CleaningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
