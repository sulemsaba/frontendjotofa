"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export type PageId =
  | "home"
  | "about"
  | "businesses"
  | "strategy"
  | "csr"
  | "news"
  | "careers"
  | "contact"
  | "utec"
  | "cleaning"
  | "security"
  | "staffing"
  | "faq";

interface PageContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  /** Prefetch a route's data so the next click is instant. Call on hover/focus. */
  prefetchPage: (page: PageId) => void;
  /** True while a client-side navigation is in flight (for the top progress bar). */
  navigating: boolean;
}

const PageContext = createContext<PageContextType>({
  activePage: "home",
  setActivePage: () => {},
  prefetchPage: () => {},
  navigating: false,
});

/**
 * Map a URL pathname to its corresponding PageId.
 * Falls back to "home" for unknown / empty paths.
 */
function pathnameToPageId(pathname: string | null): PageId {
  if (!pathname) return "home";
  // Strip trailing slash and leading slash, take the first segment
  const segment = pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/")[0].toLowerCase();
  if (!segment) return "home";

  const validPages: PageId[] = [
    "home",
    "about",
    "businesses",
    "strategy",
    "csr",
    "news",
    "careers",
    "contact",
    "utec",
    "cleaning",
    "security",
    "staffing",
    "faq",
  ];

  // Treat news detail pages (e.g. /news/some-article) as the news page
  if (segment === "news" && pathname.split("/").filter(Boolean).length > 1) {
    return "news";
  }

  return (validPages as string[]).includes(segment) ? (segment as PageId) : "home";
}

export function PageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // activePage is DERIVED from the pathname — always in sync with the URL,
  // no state/effect needed (works for nav clicks, back/forward, deep links).
  const activePage = pathnameToPageId(pathname);
  const [navigating, setNavigating] = useState(false);

  // Clear the "navigating" flag once the new route lands. This is the only
  // way to detect route completion in the App Router (router.push has no
  // completion callback), so the setState-in-effect here is intentional.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNavigating(false);
  }, [pathname]);

  // Real URL-based navigation: set the progress flag BEFORE router.push so the
  // top bar appears instantly on click, then push the URL. The effect above
  // clears the flag once the new route renders. Next.js App Router handles
  // scroll-to-top automatically on navigation (and respects
  // data-scroll-behavior on <html> to disable smooth scroll during the jump).
  const setActivePage = useCallback((page: PageId) => {
    setNavigating(true);
    const url = page === "home" ? "/" : `/${page}`;
    router.push(url);
  }, [router]);

  // Prefetch a route on hover/focus so the actual click is near-instant.
  // Next.js App Router caches the prefetched RSC payload + assets.
  const prefetchPage = useCallback((page: PageId) => {
    const url = page === "home" ? "/" : `/${page}`;
    router.prefetch(url);
  }, [router]);

  // ─── Idle-time prefetching of ALL routes ───────────────────────────
  // On first load, once the browser is idle, prefetch every route so that
  // the FIRST click to any nav item is instant (no 700–1700ms dev compile
  // wait). Uses requestIdleCallback with a fallback to setTimeout. Runs
  // only once per page mount. In production these are already pre-built,
  // so this is mostly a dev-mode win — but it also warms the RSC cache.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const allPages: PageId[] = [
      "about", "businesses", "strategy", "csr", "news",
      "careers", "contact", "utec", "cleaning",
      "security", "staffing", "faq",
    ];
    const schedule = (cb: () => void) =>
      "requestIdleCallback" in window
        ? window.requestIdleCallback(cb, { timeout: 3000 })
        : setTimeout(cb, 1200);
    schedule(() => {
      allPages.forEach((p) => {
        const url = p === "home" ? "/" : `/${p}`;
        router.prefetch(url);
      });
    });
  }, [router]);

  return (
    <PageContext.Provider value={{ activePage, setActivePage, prefetchPage, navigating }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
