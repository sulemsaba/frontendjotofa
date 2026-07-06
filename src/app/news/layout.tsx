import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Insights",
  description:
    "Stay informed about JOTOFA GROUP's latest developments, subsidiary updates, CSR milestones, and industry insights from across Tanzania and East Africa.",
  openGraph: {
    title: "JOTOFA GROUP — News & Insights",
    description:
      "Latest updates from JOTOFA GROUP and its subsidiaries — group announcements, project milestones, and community impact stories.",
  },
  alternates: {
    canonical: "/news",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
