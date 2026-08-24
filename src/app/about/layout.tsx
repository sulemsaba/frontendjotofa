import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About JOTOFA GROUP",
  description:
    "Learn about JOTOFA GROUP - a diversified Tanzanian holding company with 10+ years of impact across ICT, logistics, cleaning, and staffing. Meet our leadership, mission, and vision.",
  openGraph: {
    title: "About JOTOFA GROUP - Our Story, Mission & Leadership",
    description:
      "Discover the story behind JOTOFA GROUP: our mission, vision, leadership team, and 10-year journey powering progress across Tanzania.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
