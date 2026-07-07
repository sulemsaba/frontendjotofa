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
  BarChart3,
  Heart,
} from "lucide-react";

const businessItems = [
  { id: "utec", label: "UTEC Solutions", description: "ICT & Telecommunications", page: "utec" as PageId, image: "/images/utec.png", logo: "/images/utec-logo.png" },
  { id: "courier", label: "Courier & Logistics", description: "Reliable Delivery Network", page: "courier" as PageId, image: "/images/courier.png", logo: "/images/courier-logo.png" },
  { id: "cleaning", label: "Cleaning & Maids", description: "Professional Cleaning Services", page: "cleaning" as PageId, image: "/images/cleaning.png", logo: "/images/cleaning-logo.png" },
  { id: "security", label: "Security", description: "Comprehensive Security Solutions", page: "security" as PageId, image: "/images/security.png", logo: "/images/security-logo.png" },
  { id: "staffing", label: "Staffing & Labour", description: "Workforce Solutions Partner", page: "staffing" as PageId, image: "/images/staffing.png", logo: "/images/staffing-logo.png" },
];

const aboutItems = [
  { id: "about", label: "Overview", description: "Who we are and what drives us", page: "about" as PageId, icon: Building2 },
  { id: "strategy", label: "Leadership & Strategy", description: "Our vision, mission and leadership", page: "strategy" as PageId, icon: BarChart3 },
  { id: "csr", label: "CSR & Sustainability", description: "Our social impact programs", page: "csr" as PageId, icon: Heart },
  { id: "strategy", label: "Investor Relations", description: "Financial performance & reports", page: "strategy" as PageId, icon: BarChart3 },
];

const PHONE_NUMBER = "0773 383 800";
const PHONE_TEL = "+255773383800";

interface NavItem { id: PageId; label: string; hasDropdown?: "businesses" | "about"; }

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "businesses", label: "Our Businesses", hasDropdown: "businesses" },
  { id: "about", label: "About Us", hasDropdown: "about" },
  { id: "news", label: "News & Insights" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact Us" },
];

const businessesPages: PageId[] = ["businesses", "utec", "courier", "cleaning", "security", "staffing"];
const aboutPages: PageId[] = ["about", "strategy", "csr"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"businesses" | "about" | null>(null);
  const [hoveredBizIndex, setHoveredBizIndex] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<"businesses" | "about" | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const { activePage, setActivePage } = usePage();
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

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
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenDropdown(null); };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleNavClick = (pageId: PageId) => { setActivePage(pageId); setMobileOpen(false); setOpenDropdown(null); setMobileExpanded(null); };
  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  const isDropdownActive = (t: "businesses" | "about") => { if (t === "businesses") return businessesPages.includes(activePage); if (t === "about") return aboutPages.includes(activePage); return false; };

  // Hover-activated dropdowns (desktop). A short close delay bridges the gap
  // between the parent button and the floating dropdown so the menu doesn't
  // flicker when the cursor travels between them. Outside click / Esc also close.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMenu = (type: "businesses" | "about") => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setOpenDropdown(type);
  };
  const scheduleCloseMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 160);
  };

  const currentBiz = businessItems[hoveredBizIndex];

  // NN/g #3 — Always solid/opaque navbar background for reliable contrast over any hero image.
  // No transparency-dependent "scrolled vs not-scrolled" alpha — keep it consistently readable on all pages.
  const navBg = "bg-white dark:bg-jotofa-navy-mid shadow-md shadow-black/5 backdrop-blur-xl border border-jotofa-navy/10 dark:border-white/10";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-jotofa-navy-mid border-b border-jotofa-navy/10 dark:border-white/10"
      >
        {/* 3-COLUMN GRID on desktop (lg+) — geometric symmetry so center links never budge.
            On mobile/tablet (<lg), use 2-column grid: logo left, actions right (no empty middle). */}
        <div className="mx-auto max-w-[1400px] h-16 sm:h-[68px] px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-3 items-stretch">

          {/* ───────── LEFT: Logo Block ───────── */}
          <div className="flex justify-start items-center">
            <button onClick={() => handleNavClick("home")} className="flex items-center group" aria-label="JOTOFA Group home">
              <Image
                src="/images/jotofa-logo.png"
                alt="JOTOFA Group Logo"
                width={222}
                height={73}
                priority
                className="h-8 sm:h-9 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300 group-hover:opacity-80 cursor-pointer"
              />
            </button>
          </div>

          {/* ───────── CENTER: Navigation Links ─────────
              Only rendered on lg+ (desktop). On mobile/tablet, the 2-col grid has no center column,
              so this block is `hidden` and the grid effectively becomes left+right only. */}
          <div ref={dropdownContainerRef} className="hidden lg:flex justify-center items-stretch">
            <div className="flex items-stretch gap-1">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative flex items-stretch"
                  onMouseEnter={item.hasDropdown ? () => openMenu(item.hasDropdown) : undefined}
                  onMouseLeave={item.hasDropdown ? scheduleCloseMenu : undefined}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    aria-expanded={item.hasDropdown ? openDropdown === item.hasDropdown : undefined}
                    aria-haspopup={item.hasDropdown ? "true" : undefined}
                    className={`group/nav relative flex items-center px-4 rounded-lg text-sm tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent ${
                      activePage === item.id || (item.hasDropdown && isDropdownActive(item.hasDropdown))
                        ? "text-jotofa-navy dark:text-white font-semibold bg-jotofa-navy/[0.04] dark:bg-white/[0.05]"
                        : "text-jotofa-navy/70 dark:text-white/70 font-medium hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.05] dark:hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="relative flex items-center gap-1">
                      {item.label}
                      {item.hasDropdown && (<ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${openDropdown === item.hasDropdown ? "rotate-180" : "group-hover/nav:opacity-100"}`} />)}
                    </span>
                    {/* NN/g #5 — Active indicator: razor-thin 2px teal line flush against the navbar bottom border.
                        Non-active items show a muted teal underline that scales in on hover for affordance. */}
                    {(() => {
                      const isActive = activePage === item.id || (item.hasDropdown && isDropdownActive(item.hasDropdown));
                      return (
                        <span
                          aria-hidden
                          className={`absolute left-3 right-3 bottom-0 h-[2px] bg-jotofa-accent origin-center transition-transform duration-200 ${
                            isActive
                              ? "scale-x-100"
                              : "scale-x-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-50"
                          }`}
                        />
                      );
                    })()}
                  </button>

                  {/* Our Businesses Mega Dropdown — opens from button's left edge */}
                  {item.hasDropdown === "businesses" && openDropdown === "businesses" && (
                    <AnimatePresence>
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 pt-2"
                        onMouseEnter={() => openMenu("businesses")}
                        onMouseLeave={scheduleCloseMenu}>
                        <div className="w-[640px] bg-white dark:bg-jotofa-navy-card backdrop-blur-[20px] border border-jotofa-navy/8 dark:border-white/10 rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                          <div className="grid grid-cols-[45%_55%] min-h-[260px]">
                            <div className="border-r border-jotofa-navy/6 dark:border-white/6 p-2">
                              <div className="px-3 py-1.5 mb-1"><span className="text-[10px] font-semibold uppercase tracking-widest text-jotofa-navy/40 dark:text-white/30">Subsidiaries</span></div>
                              {businessItems.map((biz, idx) => (
                                <button key={biz.id} onMouseEnter={() => setHoveredBizIndex(idx)} onFocus={() => setHoveredBizIndex(idx)} onClick={() => handleNavClick(biz.page)}
                                  className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-all duration-200 group/biz cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent ${hoveredBizIndex === idx ? "bg-jotofa-navy/[0.04] dark:bg-white/[0.06]" : "hover:bg-jotofa-navy/[0.02] dark:hover:bg-white/[0.03]"}`}>
                                  <div className="flex-shrink-0 w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-black/5 dark:border-white/10 shadow-sm">
                                    <Image
                                      src={biz.logo}
                                      alt={`${biz.label} logo`}
                                      width={28}
                                      height={28}
                                      className="w-7 h-7 object-contain"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className={`text-xs font-medium ${hoveredBizIndex === idx ? "text-jotofa-navy dark:text-white font-semibold" : "text-jotofa-navy/55 dark:text-white/55 group-hover/biz:text-jotofa-navy dark:group-hover/biz:text-white/80"}`}>{biz.label}</div>
                                    <div className="text-[10px] text-jotofa-navy/25 dark:text-white/25 truncate mt-0.5">{biz.description}</div>
                                  </div>
                                  <ArrowRight className={`w-3 h-3 flex-shrink-0 ml-2 transition-all duration-200 text-jotofa-navy dark:text-white ${hoveredBizIndex === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"}`} />
                                </button>
                              ))}
                            </div>
                            {/* Right panel — single clean business image, no peek cards.
                                Uses Next.js Image for proper optimization. */}
                            <div className="relative min-h-[340px] overflow-hidden">
                              <AnimatePresence mode="wait">
                                <motion.div key={currentBiz.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                                  <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url('${currentBiz.image}')` }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-jotofa-navy via-jotofa-navy/40 to-transparent" />
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
                              View All Businesses <ArrowRight className="w-3 h-3 group-hover/viewall:translate-x-0.5 transition-transform" />
                            </button>
                            <div className="text-[11px] text-jotofa-navy/25 dark:text-white/25">5 subsidiaries across Tanzania</div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* About Us Dropdown — opens from button's left edge */}
                  {item.hasDropdown === "about" && openDropdown === "about" && (
                    <AnimatePresence>
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 pt-2"
                        onMouseEnter={() => openMenu("about")}
                        onMouseLeave={scheduleCloseMenu}>
                        <div className="w-[230px] bg-white dark:bg-jotofa-navy-card backdrop-blur-[20px] border border-jotofa-navy/8 dark:border-white/10 rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] p-2">
                          {aboutItems.map((subItem) => (
                            <button key={subItem.id} onClick={() => handleNavClick(subItem.page)}
                              className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl hover:bg-jotofa-navy/[0.04] dark:hover:bg-white/[0.06] transition-colors duration-150 group/sub cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent">
                              <subItem.icon className="w-4 h-4 text-jotofa-navy/50 dark:text-white/40 group-hover/sub:text-jotofa-navy dark:group-hover/sub:text-white transition-opacity" />
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-jotofa-navy/70 dark:text-white/70 group-hover/sub:text-jotofa-navy dark:group-hover/sub:text-white transition-colors whitespace-nowrap">{subItem.label}</div>
                                <div className="text-[10px] text-jotofa-navy/30 dark:text-white/25 mt-0.5">{subItem.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}


                </div>
              ))}
            </div>
          </div>

          {/* ───────── RIGHT: Theme toggle + Mobile menu ───────── */}
          <div className="flex justify-end items-center gap-2 sm:gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-sm text-jotofa-navy/60 dark:text-white/60 hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.05] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Toggle theme"
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 block dark:hidden" />
            </button>
            {/* Mobile hamburger (reveals on <lg per spec — JOTOFA has 6 nav items, needs lg breakpoint) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-jotofa-navy dark:text-white hover:text-jotofa-navy/70 dark:hover:text-white/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-0 bottom-0 w-[300px] bg-white dark:bg-jotofa-navy-card backdrop-blur-xl border-l border-jotofa-navy/8 dark:border-white/8">
              <div className="flex items-center justify-between p-4 border-b border-jotofa-navy/6 dark:border-white/6">
                <Image
                  src="/images/jotofa-logo.png"
                  alt="JOTOFA Group Logo"
                  width={222}
                  height={73}
                  className="h-7 w-auto object-contain dark:brightness-0 dark:invert"
                />
                <button onClick={() => setMobileOpen(false)} className="p-2 text-jotofa-navy/50 dark:text-white/50 hover:text-jotofa-navy dark:hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent rounded-md" aria-label="Close menu"><X size={20} /></button>
              </div>
              <div className="py-3 px-2 space-y-0.5 max-h-[calc(100vh-120px)] overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button onClick={() => { if (item.hasDropdown && mobileExpanded !== item.hasDropdown) setMobileExpanded(item.hasDropdown); else if (item.hasDropdown && mobileExpanded === item.hasDropdown) handleNavClick(item.id); else handleNavClick(item.id); }}
                      aria-expanded={item.hasDropdown ? mobileExpanded === item.hasDropdown : undefined}
                      className={`flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent ${activePage === item.id || (item.hasDropdown && isDropdownActive(item.hasDropdown)) ? "bg-[#003B64]/8 dark:bg-white/8 text-jotofa-navy dark:text-white font-semibold" : "text-jotofa-navy/60 dark:text-white/60 hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.05] dark:hover:bg-white/[0.06]"}`}>
                      <span className="text-sm">{item.label}</span>
                      {item.hasDropdown && <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === item.hasDropdown ? "rotate-180" : ""}`} />}
                    </button>
                    {item.hasDropdown === "businesses" && mobileExpanded === "businesses" && (
                      <div className="pl-4 space-y-0.5 pb-1">
                        <button onClick={() => handleNavClick("businesses")} className="flex items-center gap-3 w-full text-left px-4 py-2 text-jotofa-navy dark:text-white font-medium hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04] rounded-lg">
                          <Building2 className="w-3.5 h-3.5" /><span className="text-sm">View All Businesses</span>
                        </button>
                        {businessItems.map(biz => (
                          <button key={biz.id} onClick={() => handleNavClick(biz.page)} className="flex items-center gap-3 w-full text-left px-4 py-2 text-jotofa-navy/50 dark:text-white/50 hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04] rounded-lg">
                            <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center bg-white border border-black/5 dark:border-white/10 flex-shrink-0">
                              <Image src={biz.logo} alt={`${biz.label} logo`} width={20} height={20} className="w-5 h-5 object-contain" />
                            </div>
                            <span className="text-sm">{biz.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {item.hasDropdown === "about" && mobileExpanded === "about" && (
                      <div className="pl-4 space-y-0.5 pb-1">
                        {aboutItems.map(subItem => (
                          <button key={subItem.id} onClick={() => handleNavClick(subItem.page)} className="flex items-center gap-3 w-full text-left px-4 py-2 text-jotofa-navy/50 dark:text-white/50 hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04] rounded-lg">
                            <subItem.icon className="w-3.5 h-3.5 text-jotofa-navy/40 dark:text-white/30" /><span className="text-sm">{subItem.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                ))}
                <div className="pt-4 mt-2 border-t border-jotofa-navy/6 dark:border-white/6">
                  <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-jotofa-navy/60 dark:text-white/60 text-sm hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent rounded-xl"><Phone className="w-4 h-4" /><span>{PHONE_NUMBER}</span></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
