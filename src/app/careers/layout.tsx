import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join JOTOFA GROUP — explore career opportunities across ICT, logistics, cleaning, security, and staffing. Build your future with Tanzania's leading diversified holding company.",
  openGraph: {
    title: "JOTOFA GROUP — Careers & Job Opportunities",
    description:
      "Join a dynamic team driving progress across Tanzania. Explore open positions at JOTOFA GROUP and its subsidiaries.",
  },
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
