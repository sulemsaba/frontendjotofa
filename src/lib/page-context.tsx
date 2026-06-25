"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

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
}

const PageContext = createContext<PageContextType>({
  activePage: "home",
  setActivePage: () => {},
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
  const [activePage, setActivePageState] = useState<PageId>(() => pathnameToPageId(pathname));

  // Sync activePage with URL on mount and whenever the pathname changes.
  // This ensures direct navigation (URL paste, refresh, browser back/forward)
  // keeps the navbar's active-state indicator accurate (NN/g #5).
  useEffect(() => {
    setActivePageState(pathnameToPageId(pathname));
  }, [pathname]);

  const setActivePage = useCallback((page: PageId) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <PageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}
