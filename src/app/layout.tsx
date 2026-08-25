import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { PageProvider } from "@/lib/page-context";
import { RouteProgress } from "@/components/route-progress";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Non-critical chrome: only matters after a scroll (floating actions) or when a
// toast fires. Code-split so their JS is deferred off the critical path.
const FloatingActions = dynamic(() =>
  import("@/components/floating-actions").then((m) => m.FloatingActions)
);
const Toaster = dynamic(() =>
  import("@/components/ui/sonner").then((m) => m.Toaster)
);

// Inter carries body, subheadings, labels, and navigation.
const inter = localFont({
  src: "../../public/fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "300 800",
});

// Inter Tight is the display voice: headlines only, tight tracking.
const interTight = localFont({
  src: "../../public/fonts/InterTight-Variable.woff2",
  variable: "--font-inter-tight",
  display: "swap",
  weight: "500 800",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jotofagroup.co.tz"),
  title: "JOTOFA GROUP | Delivering Excellence Across Industries",
  description:
    "JOTOFA GROUP is a diversified Tanzanian holding company delivering excellence across industries through ICT, logistics, cleaning, and staffing solutions.",
  authors: [{ name: "JOTOFA GROUP" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JOTOFA GROUP | Delivering Excellence Across Industries",
    description:
      "A diversified Tanzanian holding company delivering excellence across industries through ICT, logistics, cleaning, and staffing solutions.",
    type: "website",
    siteName: "JOTOFA GROUP",
    url: "https://jotofagroup.co.tz",
    images: [
      {
        url: "https://jotofagroup.co.tz/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JOTOFA GROUP - Delivering Excellence Across Industries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JOTOFA GROUP | Delivering Excellence Across Industries",
    description:
      "A diversified Tanzanian holding company delivering excellence across industries through ICT, logistics, cleaning, and staffing solutions.",
    images: [
      "https://jotofagroup.co.tz/images/og-image.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${interTight.variable} antialiased bg-background text-foreground`}
      >
        {/* Skip-to-content link - first focusable element for keyboard users (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-jotofa-accent focus:text-jotofa-navy focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageProvider>
            <RouteProgress />
            {/* JSON-LD structured data   Organization, WebSite, BreadcrumbList */}
            <JsonLd />
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
            <FloatingActions />
          </PageProvider>
        </ThemeProvider>

        {/* Noscript fallback for users with JS disabled */}
        <noscript>
          <div className="p-8 text-center text-jotofa-navy" style={{ fontFamily: "system-ui, sans-serif" }}>
            <h1 className="text-2xl mb-2 font-bold">
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
