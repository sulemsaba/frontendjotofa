import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSR & Sustainability",
  description:
    "JOTOFA GROUP's corporate social responsibility initiatives: education scholarships, community health programs, environmental conservation, and 2,000+ trees planted across Tanzania.",
  openGraph: {
    title: "JOTOFA GROUP   CSR & Sustainability Initiatives",
    description:
      "We believe true success is measured not just in profits, but in the positive impact we create for our communities and environment.",
  },
  alternates: {
    canonical: "/csr",
  },
};

export default function CSRLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
