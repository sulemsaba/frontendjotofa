"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { usePage, PageId } from "@/lib/page-context";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  Sun,
  Moon,
  Building2,
  Briefcase,
  Leaf,
} from "lucide-react";

const businessItems = [
  { id: "utec", label: "UTEC Solutions", description: "ICT & Telecommunications", page: "utec" as PageId, image: "/images/utec.png", logo: "/images/utec-logo.png" },
  { id: "cleaning", label: "Cleaning & Maids", description: "Professional Cleaning Services", page: "cleaning" as PageId, image: "/images/cleaning.png", logo: "/images/cleaning-logo.png" },
  { id: "security", label: "Security", description: "Comprehensive Security Solutions", page: "security" as PageId, image: "/images/security.png", logo: "/images/security-logo.png" },
  { id: "staffing", label: "Staffing & Labour", description: "Workforce Solutions Partner", page: "staffing" as PageId, image: "/images/staffing.png", logo: "/images/staffing-logo.png" },
];

const PHONE_NUMBER = "0794 974 996";
const PHONE_TEL = "+255794974996";

interface NavItem { id: PageId; label: string; hasDropdown?: "subsidiaries"; }

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "businesses", label: "Subsidiaries", hasDropdown: "subsidiaries" },
  { id: "news", label: "News & Insights" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
];

const subsidiariesPages: PageId[] = ["businesses", "utec", "cleaning", "security", "staffing"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"subsidiaries" | "about" | null>(null);
  const [hoveredBizIndex, setHoveredBizIndex] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<"subsidiaries" | "about" | null>(null);
  const [lang, setLang] = useState<"EN" | "SW">("EN");
  const { setTheme, resolvedTheme } = useTheme();
  const { activePage, setActivePage, prefetchPage } = usePage();
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileCloseBtnRef = useRef<HTMLButtonElement>(null);
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        if (mobileOpen) {
          setMobileOpen(false);
          hamburgerBtnRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // ─── Focus trap for mobile drawer (WCAG 2.1.2) ───
  useEffect(() => {
    if (!mobileOpen) return;
    const drawer = mobileDrawerRef.current;
    if (!drawer) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => mobileCloseBtnRef.current?.focus(), 50);
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", trap);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [mobileOpen]);

  const handleNavClick = (pageId: PageId) => { setActivePage(pageId); setMobileOpen(false); setOpenDropdown(null); setMobileExpanded(null); };
  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  const isDropdownActive = (t: "subsidiaries") => {
    if (t === "subsidiaries") return subsidiariesPages.includes(activePage);
    return false;
  };

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = (type: "subsidiaries" | "about") => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpenDropdown(type);
  };
  const scheduleCloseMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 160);
  };

  // ─── Keyboard toggle for the desktop mega-menu (WCAG 2.1.1) ───
  const handleDropdownKeyDown = (e: React.KeyboardEvent, item: NavItem) => {
    if (!item.hasDropdown) return;
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setOpenDropdown((prev) => (prev === item.hasDropdown ? null : item.hasDropdown!));
    }
  };

  const currentBiz = businessItems[hoveredBizIndex];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-jotofa-navy/10 dark:border-white/10 transition-all duration-200 ${
          scrolled
            ? "bg-background dark:bg-jotofa-navy-mid"
            : "bg-background/80 dark:bg-jotofa-navy-mid/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-[1440px] h-14 sm:h-16 px-4 sm:px-6 flex items-center gap-4 lg:gap-8">

           {/* ───────── LEFT: Logo Block ───────── */}
           <div className="flex-shrink-0 flex justify-start items-center">
             <button onClick={() => handleNavClick("home")} className="flex items-center group" aria-label="JOTOFA Group home">
               <div className="relative">
                 <Image
                   src="/images/jotofa-logo-light.png"
                   alt="JOTOFA Group Logo"
                   width={222}
                   height={73}
                   priority
                   className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:opacity-80 cursor-pointer dark:hidden"
                 />
                 <Image
                   src="/images/jotofa-logo-dark.png"
                   alt="JOTOFA Group Logo"
                   width={222}
                   height={73}
                   priority
                   className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:opacity-80 cursor-pointer hidden dark:block"
                 />
               </div>
             </button>
           </div>

          {/* ───────── CENTER: Navigation Links (desktop lg+) ──── */}
          <div ref={dropdownContainerRef} className="hidden lg:flex flex-1 justify-center items-stretch">
            <div className="flex items-stretch gap-1">
              {navItems.map((item) => {
                const isActive = activePage === item.id || (item.hasDropdown && isDropdownActive(item.hasDropdown));
                return (
                <div
                  key={item.id}
                  className="relative flex items-stretch"
                  onMouseEnter={() => { prefetchPage(item.id); if (item.hasDropdown) openMenu(item.hasDropdown); }}
                  onMouseLeave={item.hasDropdown ? scheduleCloseMenu : undefined}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    onKeyDown={(e) => handleDropdownKeyDown(e, item)}
                    aria-expanded={item.hasDropdown ? openDropdown === item.hasDropdown : undefined}
                    aria-haspopup={item.hasDropdown ? "true" : undefined}
                    aria-current={isActive ? "page" : undefined}
                    className={`group/nav relative flex items-center px-4 text-sm tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent ${
                      isActive
                        ? "text-jotofa-navy dark:text-white font-semibold"
                        : "text-jotofa-navy/80 dark:text-white/80 font-medium hover:text-jotofa-navy dark:hover:text-white"
                    }`}
                  >
                    <span className="relative flex items-center gap-1">
                      {item.label}
                      {item.hasDropdown && (<ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${openDropdown === item.hasDropdown ? "rotate-180" : "group-hover/nav:opacity-100"}`} />)}
                    </span>
                    <span
                      aria-hidden
                      className={`absolute left-3 right-3 bottom-0 h-[2px] bg-jotofa-accent origin-center transition-transform duration-200 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-50"
                      }`}
                    />
                  </button>

                  {/* Subsidiaries Mega Dropdown — left-aligned to the "Subsidiaries" label */}
                  {item.hasDropdown === "subsidiaries" && openDropdown === "subsidiaries" && (
                    <AnimatePresence>
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-4 pt-2"
                        onMouseEnter={() => openMenu("subsidiaries")}
                        onMouseLeave={scheduleCloseMenu}>
                        <div className="w-[640px] max-w-[calc(100vw-2rem)] bg-white dark:bg-jotofa-navy-card backdrop-blur-[20px] border border-jotofa-navy/8 dark:border-white/10 rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                           <div className="grid grid-cols-[45%_55%] min-h-[300px]">
                             <div className="border-r border-jotofa-navy/6 dark:border-white/6 p-2">
                               <div className="px-3 py-1.5 mb-1"><span className="text-[10px] font-semibold uppercase tracking-widest text-jotofa-navy/60 dark:text-white/50">Subsidiaries</span></div>
                               {businessItems.map((biz, idx) => (
                                 <button key={biz.id} onMouseEnter={() => { setHoveredBizIndex(idx); prefetchPage(biz.page); }} onClick={() => handleNavClick(biz.page)}
                                   className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-all duration-200 group/biz cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent ${hoveredBizIndex === idx ? "bg-jotofa-navy/[0.04] dark:bg-white/[0.06]" : "hover:bg-jotofa-navy/[0.02] dark:hover:bg-white/[0.03]"}`}>
                                   <div className="flex-shrink-0 w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 border border-black/5 dark:bg-white/10 dark:border-white/20 shadow-sm">
                                     <Image
                                       src={biz.logo}
                                       alt={`${biz.label} logo`}
                                       width={28}
                                       height={28}
                                       className="w-7 h-7 object-contain"
                                     />
                                   </div>
                                   <div className="min-w-0 flex-1">
                                     <div className={`text-xs font-medium ${hoveredBizIndex === idx ? "text-jotofa-navy dark:text-white font-semibold" : "text-jotofa-navy/70 dark:text-white/70 group-hover/biz:text-jotofa-navy dark:group-hover/biz:text-white/90"}`}>{biz.label}</div>
                                     <div className="text-[10px] text-jotofa-navy/50 dark:text-white/50 truncate mt-0.5">{biz.description}</div>
                                   </div>
                                   <ArrowRight className={`w-3 h-3 flex-shrink-0 ml-2 transition-all duration-200 text-jotofa-accent ${hoveredBizIndex === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"}`} />
                                 </button>
                               ))}
                             </div>
                             {/* Right panel — Next.js Image (not CSS background) */}
                             <div className="relative min-h-[300px] overflow-hidden">
                               <AnimatePresence>
                                 <motion.div key={currentBiz.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                                   <Image
                                     src={currentBiz.image}
                                     alt=""
                                     fill
                                     sizes="352px"
                                     className="object-cover"
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-t from-jotofa-navy/90 via-jotofa-navy/40 to-transparent" />
                                   <div className="absolute bottom-0 left-0 right-0 p-5">
                                     <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 mb-2"><span className="text-[11px] font-medium text-white">{currentBiz.description}</span></div>
                                     <div className="text-white text-base font-semibold">{currentBiz.label}</div>
                                   </div>
                                 </motion.div>
                               </AnimatePresence>
                             </div>
                           </div>
                          <div className="border-t border-jotofa-navy/6 dark:border-white/6 px-5 py-2.5 flex items-center justify-between">
                            <button onClick={() => handleNavClick("businesses")} className="text-[12px] text-jotofa-navy dark:text-white/70 hover:text-jotofa-navy/70 dark:hover:text-white transition-colors flex items-center gap-1.5 group/viewall font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm">
                              View All Subsidiaries <ArrowRight className="w-3 h-3 group-hover/viewall:translate-x-0.5 transition-transform" />
                            </button>
                            <div className="text-[11px] text-jotofa-navy/50 dark:text-white/50">5 subsidiaries across Tanzania</div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}

                </div>
              );
              })}
            </div>
          </div>

          {/* ───────── RIGHT: Language + Phone + Theme toggle + Mobile menu ───────── */}
          <div className="ml-auto flex justify-end items-center gap-2 sm:gap-3">
            <button
              onClick={() => setLang(lang === "EN" ? "SW" : "EN")}
              className="flex items-center p-1 rounded-sm hover:bg-jotofa-navy/[0.05] dark:hover:bg-white/[0.08] transition-colors"
              aria-label={`Switch language (current: ${lang})`}
            >
              <span className="relative inline-block h-4 w-6 overflow-hidden rounded-sm">
                <Image
                  src={lang === "EN" ? "/images/flags/gb.png" : "/images/flags/tz.png"}
                  alt={lang === "EN" ? "English" : "Swahili"}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </span>
            </button>
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-jotofa-navy/[0.04] dark:bg-white/[0.06] text-xs font-medium text-jotofa-navy/80 dark:text-white/80 hover:bg-jotofa-navy/[0.08] dark:hover:bg-white/[0.1] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-sm text-jotofa-navy/70 dark:text-white/70 hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.05] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Toggle theme"
              aria-pressed={resolvedTheme === "dark"}
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 block dark:hidden" />
            </button>
            <button
              ref={hamburgerBtnRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-jotofa-navy dark:text-white hover:text-jotofa-navy/70 dark:hover:text-white/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU — focus-trapped dialog (WCAG 2.1.2) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Site navigation menu">
            <div className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div ref={mobileDrawerRef} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-white dark:bg-jotofa-navy-card backdrop-blur-xl border-l border-jotofa-navy/8 dark:border-white/8">
               <div className="flex items-center justify-between p-4 border-b border-jotofa-navy/6 dark:border-white/6">
                 <div className="relative">
                   <Image
                     src="/images/jotofa-logo-light.png"
                     alt="JOTOFA Group Logo"
                     width={222}
                     height={73}
                     className="h-7 w-auto object-contain dark:hidden"
                   />
                   <Image
                     src="/images/jotofa-logo-dark.png"
                     alt="JOTOFA Group Logo"
                     width={222}
                     height={73}
                     className="h-7 w-auto object-contain hidden dark:block"
                   />
                 </div>
                 <button ref={mobileCloseBtnRef} onClick={() => setMobileOpen(false)} className="p-2 text-jotofa-navy/60 dark:text-white/60 hover:text-jotofa-navy dark:hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent rounded-md" aria-label="Close menu"><X size={20} /></button>
               </div>
              <div className="py-3 px-2 space-y-0.5 max-h-[calc(100vh-120px)] overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button onClick={() => { if (item.hasDropdown && mobileExpanded !== item.hasDropdown) setMobileExpanded(item.hasDropdown); else if (item.hasDropdown && mobileExpanded === item.hasDropdown) handleNavClick(item.id); else handleNavClick(item.id); }}
                      aria-expanded={item.hasDropdown ? mobileExpanded === item.hasDropdown : undefined}
                      className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-sm tracking-wide transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent ${activePage === item.id || (item.hasDropdown && isDropdownActive(item.hasDropdown)) ? "text-jotofa-navy dark:text-white font-semibold" : "text-jotofa-navy/70 dark:text-white/70 hover:text-jotofa-navy dark:hover:text-white"}`}>
                      <span className="text-sm">{item.label}</span>
                      {item.hasDropdown && <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.hasDropdown ? "rotate-180" : ""}`} />}
                    </button>
                       {item.hasDropdown === "subsidiaries" && mobileExpanded === "subsidiaries" && (
                      <div className="pl-4 space-y-0.5 pb-1">
                        <button onClick={() => handleNavClick("businesses")} className="flex items-center gap-3 w-full text-left px-4 py-2 text-jotofa-navy dark:text-white font-medium hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04] rounded-lg">
                          <Building2 className="w-3.5 h-3.5" /><span className="text-sm">View All Subsidiaries</span>
                        </button>
                        {businessItems.map(biz => (
                          <button key={biz.id} onClick={() => handleNavClick(biz.page)} className="flex items-center gap-3 w-full text-left px-4 py-2 text-jotofa-navy/70 dark:text-white/70 hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04] rounded-lg">
                            <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center bg-white border border-black/5 dark:border-white/10 flex-shrink-0">
                              <Image src={biz.logo} alt={`${biz.label} logo`} width={20} height={20} className="w-5 h-5 object-contain" />
                            </div>
                            <span className="text-sm">{biz.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                ))}
                <div className="pt-4 mt-2 border-t border-jotofa-navy/6 dark:border-white/6 space-y-1">
                  <button
                    onClick={() => setLang(lang === "EN" ? "SW" : "EN")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-jotofa-navy/70 dark:text-white/70 text-sm hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent"
                    aria-label={`Switch language (current: ${lang})`}
                  >
                    <span className="relative inline-block h-4 w-6 overflow-hidden rounded-sm">
                      <Image
                        src={lang === "EN" ? "/images/flags/gb.png" : "/images/flags/tz.png"}
                        alt={lang === "EN" ? "English" : "Swahili"}
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </span>
                    <span>{lang === "EN" ? "English" : "Swahili"}</span>
                  </button>
                  <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-jotofa-navy/70 dark:text-white/70 text-sm hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent"><Phone className="w-4 h-4" /><span>{PHONE_NUMBER}</span></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
