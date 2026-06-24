import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Services — Comprehensive Security Solutions",
  description:
    "JOTOFA Security provides manned guarding, electronic surveillance, event security, risk assessment, security consulting, and VIP protection across Tanzania.",
  openGraph: {
    title: "JOTOFA Security — Comprehensive Security Solutions",
    description:
      "Providing robust security services from manned guarding to electronic surveillance — protecting people, assets, and operations with integrity and vigilance.",
  },
  alternates: {
    canonical: "/security",
  },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
