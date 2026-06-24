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
  Mail,
} from "lucide-react";

const businessItems = [
  { id: "utec", label: "UTEC Solutions", description: "ICT & Telecommunications", page: "utec" as PageId, image: "/images/utec.png" },
  { id: "courier", label: "Courier & Logistics", description: "Reliable Delivery Network", page: "courier" as PageId, image: "/images/courier.png" },
  { id: "cleaning", label: "Cleaning & Maids", description: "Professional Cleaning Services", page: "cleaning" as PageId, image: "/images/cleaning.png" },
  { id: "security", label: "Security", description: "Comprehensive Security Solutions", page: "security" as PageId, image: "/images/security.png" },
  { id: "staffing", label: "Staffing & Labour", description: "Workforce Solutions Partner", page: "staffing" as PageId, image: "/images/staffing.png" },
];

const aboutItems = [
  { id: "about", label: "Overview", description: "Who we are and what drives us", page: "about" as PageId, icon: Building2 },
  { id: "strategy", label: "Leadership & Strategy", description: "Our vision, mission and leadership", page: "strategy" as PageId, icon: BarChart3 },
  { id: "csr", label: "CSR & Sustainability", description: "Our social impact programs", page: "csr" as PageId, icon: Heart },
];

const resourceItems = [
  { id: "strategy-investor", label: "Investor Relations", description: "Financial performance & reports", page: "strategy" as PageId, icon: BarChart3 },
  { id: "contact", label: "Contact Us", description: "Get in touch with our team", page: "contact" as PageId, icon: Mail },
];

const PHONE_NUMBER = "0794 974 996";
const PHONE_TEL = "+255794974996";

interface NavItem { id: PageId; label: string; hasDropdown?: "businesses" | "about" | "resources"; }

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "businesses", label: "Our Businesses", hasDropdown: "businesses" },
  { id: "about", label: "About Us", hasDropdown: "about" },
  { id: "news", label: "News & Insights" },
  { id: "contact", label: "Resources", hasDropdown: "resources" },
  { id: "careers", label: "Careers" },
];

const businessesPages: PageId[] = ["businesses", "utec", "courier", "cleaning", "security", "staffing"];
const aboutPages: PageId[] = ["about", "strategy", "csr"];
const resourcesPages: PageId[] = ["contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"businesses" | "about" | "resources" | null>(null);
  const [hoveredBizIndex, setHoveredBizIndex] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<"businesses" | "about" | "resources" | null>(null);
  const dropdownHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const { activePage, setActivePage } = usePage();
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
  const isDropdownActive = (t: "businesses" | "about" | "resources") => { if (t === "businesses") return businessesPages.includes(activePage); if (t === "about") return aboutPages.includes(activePage); if (t === "resources") return resourcesPages.includes(activePage); return false; };
  const handleDropdownEnter = (type: "businesses" | "about" | "resources") => { if (dropdownHoverTimeoutRef.current) clearTimeout(dropdownHoverTimeoutRef.current); setOpenDropdown(type); };
  const handleDropdownLeave = () => { dropdownHoverTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150); };

  const currentBiz = businessItems[hoveredBizIndex];

  const pillBg = scrolled
    ? "bg-white/85 dark:bg-[#001826]/90 shadow-md shadow-black/5 backdrop-blur-xl border border-jotofa-navy/8 dark:border-white/8"
    : "bg-white/75 dark:bg-[#001826]/80 backdrop-blur-md border border-jotofa-navy/6 dark:border-white/6";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-5 px-3 sm:px-6"
      >
        <div className="mx-auto max-w-[1400px] flex items-center gap-4 justify-between">
          {/* LOGO - OUTSIDE PILL */}
          <div className="flex items-center shrink-0">
            <button onClick={() => handleNavClick("home")} className="flex items-center group">
              <Image
                src="/images/jotofa-logo.png"
                alt="JOTOFA Group Logo"
                width={222}
                height={73}
                priority
                className="h-9 sm:h-10 md:h-11 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300 group-hover:opacity-80 cursor-pointer"
              />
            </button>
          </div>

          {/* PILL CONTAINER */}
          <div className={`flex-1 flex items-center justify-between rounded-full transition-all duration-500 ${pillBg} px-5 sm:px-6 md:px-7 py-2.5 sm:py-3`}>

          {/* NAV LINKS (desktop) */}
          <div ref={dropdownContainerRef} className="hidden lg:flex items-center justify-center">
            <div className="flex items-center gap-0">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => { if (item.hasDropdown) handleDropdownEnter(item.hasDropdown); }}
                    onMouseLeave={handleDropdownLeave}
                    onFocus={() => { if (item.hasDropdown) handleDropdownEnter(item.hasDropdown); }}
                    onBlur={(e) => {
                      // Only close if focus is leaving to something outside this dropdown group
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                        handleDropdownLeave();
                      }
                    }}
                    aria-expanded={item.hasDropdown ? openDropdown === item.hasDropdown : undefined}
                    aria-haspopup={item.hasDropdown ? "true" : undefined}
                    className={`relative px-4 py-2 text-[0.9rem] font-medium transition-all duration-200 whitespace-nowrap tracking-[0.01em] rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      activePage === item.id || (item.hasDropdown && isDropdownActive(item.hasDropdown))
                        ? "text-jotofa-navy dark:text-white font-semibold bg-jotofa-navy/[0.06] dark:bg-white/[0.08]"
                        : "text-jotofa-navy/65 dark:text-white/65 hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="relative flex items-center gap-1">
                      {item.label}
                      {item.hasDropdown && (<ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-200 ${openDropdown === item.hasDropdown ? "rotate-180" : ""}`} />)}
                    </span>
                  </button>

                  {/* Our Businesses Mega Dropdown */}
                  {item.hasDropdown === "businesses" && openDropdown === "businesses" && (
                    <AnimatePresence>
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                        onMouseEnter={() => handleDropdownEnter("businesses")} onMouseLeave={handleDropdownLeave}>
                        <div className="w-[640px] bg-white dark:bg-[#0a1e30] backdrop-blur-[20px] border border-jotofa-navy/8 dark:border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                          <div className="grid grid-cols-[45%_55%] min-h-[260px]">
                            <div className="border-r border-jotofa-navy/6 dark:border-white/6 p-2">
                              <div className="px-3 py-1.5 mb-1"><span className="text-[10px] font-semibold uppercase tracking-widest text-jotofa-navy/40 dark:text-white/30">Subsidiaries</span></div>
                              {businessItems.map((biz, idx) => (
                                <button key={biz.id} onMouseEnter={() => setHoveredBizIndex(idx)} onFocus={() => setHoveredBizIndex(idx)} onClick={() => handleNavClick(biz.page)}
                                  className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-all duration-200 group/biz cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent ${hoveredBizIndex === idx ? "bg-jotofa-navy/[0.04] dark:bg-white/[0.06]" : "hover:bg-jotofa-navy/[0.02] dark:hover:bg-white/[0.03]"}`}>
                                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-jotofa-navy/[0.03] dark:bg-white/[0.04]">
                                    <span className={`text-sm font-bold ${hoveredBizIndex === idx ? "text-jotofa-navy dark:text-white" : "text-jotofa-navy/25 dark:text-white/25"}`}>{biz.label.charAt(0)}</span>
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

                  {/* About Us Dropdown */}
                  {item.hasDropdown === "about" && openDropdown === "about" && (
                    <AnimatePresence>
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                        onMouseEnter={() => handleDropdownEnter("about")} onMouseLeave={handleDropdownLeave}>
                        <div className="w-[230px] bg-white dark:bg-[#0a1e30] backdrop-blur-[20px] border border-jotofa-navy/8 dark:border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] p-2">
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

                  {/* Resources Dropdown */}
                  {item.hasDropdown === "resources" && openDropdown === "resources" && (
                    <AnimatePresence>
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                        onMouseEnter={() => handleDropdownEnter("resources")} onMouseLeave={handleDropdownLeave}>
                        <div className="w-[250px] bg-white dark:bg-[#0a1e30] backdrop-blur-[20px] border border-jotofa-navy/8 dark:border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] p-2">
                          {resourceItems.map((subItem) => (
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

            {/* RIGHT: Action buttons (desktop) */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <a href={`tel:${PHONE_TEL}`} className="group flex items-center gap-2 px-4 py-2 rounded-full border border-jotofa-navy/12 dark:border-white/12 text-jotofa-navy/70 dark:text-white/70 hover:border-jotofa-navy/25 dark:hover:border-white/25 hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04] transition-all duration-200 text-[0.85rem] font-medium whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <Phone className="w-4 h-4 text-jotofa-navy/60 dark:text-white/50 group-hover:text-jotofa-accent transition-colors" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <button onClick={toggleTheme} className="p-2 rounded-full text-jotofa-navy/40 dark:text-white/40 hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label="Toggle theme">
                <Sun className="w-3.5 h-3.5 hidden dark:block" /><Moon className="w-3.5 h-3.5 block dark:hidden" />
              </button>
            </div>
          </div>

          {/* MOBILE: right-side controls */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-jotofa-navy/12 dark:border-white/12 text-jotofa-navy/60 dark:text-white/60 text-[13px] font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label={`Call ${PHONE_NUMBER}`}>
              <Phone className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">Call</span>
            </a>
            <button onClick={toggleTheme} className="p-2 rounded-full text-jotofa-navy/40 dark:text-white/40 hover:text-jotofa-navy dark:hover:text-white transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label="Toggle theme">
              <Sun className="w-3.5 h-3.5 hidden dark:block" /><Moon className="w-3.5 h-3.5 block dark:hidden" />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5 text-jotofa-navy dark:text-white hover:text-jotofa-navy/70 dark:hover:text-white/70 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md" aria-label="Toggle menu" aria-expanded={mobileOpen}>
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
              className="absolute right-0 top-0 bottom-0 w-[300px] bg-white dark:bg-[#0a1e30] backdrop-blur-xl border-l border-jotofa-navy/8 dark:border-white/8">
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
                      className={`flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent ${activePage === item.id || (item.hasDropdown && isDropdownActive(item.hasDropdown)) ? "bg-[#002040]/8 dark:bg-white/8 text-jotofa-navy dark:text-white font-semibold" : "text-jotofa-navy/60 dark:text-white/60 hover:text-jotofa-navy dark:hover:text-white hover:bg-jotofa-navy/[0.03] dark:hover:bg-white/[0.04]"}`}>
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
                            <span className="w-1.5 h-1.5 rounded-full bg-jotofa-navy/40 dark:bg-white/40" /><span className="text-sm">{biz.label}</span>
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
                    {item.hasDropdown === "resources" && mobileExpanded === "resources" && (
                      <div className="pl-4 space-y-0.5 pb-1">
                        {resourceItems.map(subItem => (
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
