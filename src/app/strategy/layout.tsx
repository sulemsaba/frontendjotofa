import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Strategy",
  description:
    "JOTOFA GROUP's strategic objectives and core values: market leadership, innovation, operational excellence, partnerships, sustainability, and regional expansion across East Africa.",
  openGraph: {
    title: "JOTOFA GROUP - Leadership & Strategy",
    description:
      "Our roadmap for growth, impact, and sustainable value creation - guiding every decision and investment across the group.",
  },
  alternates: {
    canonical: "/strategy",
  },
};

export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
