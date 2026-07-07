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
  | "courier"
  | "cleaning"
  | "security"
  | "staffing";

interface PageContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  /** True while a client-side navigation is in flight (for the top progress bar). */
  navigating: boolean;
}

const PageContext = createContext<PageContextType>({
  activePage: "home",
  setActivePage: () => {},
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
    "courier",
    "cleaning",
    "security",
    "staffing",
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
  // clears the flag once the new route renders.
  const setActivePage = useCallback((page: PageId) => {
    setNavigating(true);
    const url = page === "home" ? "/" : `/${page}`;
    router.push(url);
    window.scrollTo({ top: 0 });
  }, [router]);

  return (
    <PageContext.Provider value={{ activePage, setActivePage, navigating }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
