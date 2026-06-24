"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type PageId = "home" | "about" | "businesses" | "strategy" | "csr" | "news" | "careers" | "contact" | "utec" | "courier" | "cleaning" | "security" | "staffing";

interface PageContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
}

const PageContext = createContext<PageContextType>({
  activePage: "home",
  setActivePage: () => {},
});

export function PageProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePageState] = useState<PageId>("home");

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
