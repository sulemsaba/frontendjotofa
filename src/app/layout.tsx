import type { Metadata, Viewport } from "next";
import { Open_Sans, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PageProvider } from "@/lib/page-context";
import { RouteProgress } from "@/components/route-progress";
import { JsonLd } from "@/components/json-ld";

// Per JOTOFA Visual Identity Guidelines p.16: Open Sans for web/digital.
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jotofagroup.co.tz"),
  title: "JOTOFA GROUP — Delivering Excellence Across Industries",
  description:
    "JOTOFA GROUP is a diversified Tanzanian holding company delivering excellence across industries through ICT, logistics, cleaning, security, and staffing solutions.",
  keywords: [
    "JOTOFA",
    "holding company",
    "Tanzania",
    "ICT",
    "logistics",
    "security",
    "cleaning",
    "staffing",
    "East Africa",
  ],
  authors: [{ name: "JOTOFA GROUP" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "JOTOFA GROUP — Delivering Excellence Across Industries",
    description:
      "A diversified Tanzanian holding company delivering excellence across industries through ICT, logistics, cleaning, security, and staffing solutions.",
    type: "website",
    siteName: "JOTOFA GROUP",
  },
  twitter: {
    card: "summary_large_image",
    title: "JOTOFA GROUP — Delivering Excellence Across Industries",
    description:
      "A diversified Tanzanian holding company delivering excellence across industries through ICT, logistics, cleaning, security, and staffing solutions.",
  },
};

// iPhone notch / safe-area support + theme color for browser chrome
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#003B64" },
    { media: "(prefers-color-scheme: dark)", color: "#00253F" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${openSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Skip-to-content link — first focusable element for keyboard users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-jotofa-accent focus:text-white focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PageProvider>
            <RouteProgress />
            {/* JSON-LD structured data — Organization, WebSite, BreadcrumbList */}
            <JsonLd />
            {children}
            <Toaster />
          </PageProvider>
        </ThemeProvider>

        {/* Noscript fallback for users with JS disabled */}
        <noscript>
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              fontFamily: "system-ui, sans-serif",
              color: "#003B64",
            }}
          >
            <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              JOTOFA GROUP
            </h1>
            <p>
              This website requires JavaScript to run. Please enable JavaScript
              or contact us at{" "}
              <a href="mailto:info@jotofagroup.co.tz">info@jotofagroup.co.tz</a>{" "}
              or call <a href="tel:+255773383800">0773 383 800</a>.
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
