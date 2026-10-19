import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  X,
  Play,
  Clock,
  ShieldCheck,
  Menu,
} from "lucide-react";
import {
  FourWaysLogo,
  ScaleLogo,
  EnsLogo,
  WischoffLogo,
  KlarityLogo,
  RhoLogo,
  ParadigmLogo,
  RampLogo,
  LinearLogo,
} from "./ClientLogos";

// ============================================================================
// LEAD WEBHOOK DISPATCH HANDLER (Connected to Telegram, Make.com, or Zapier)
// ============================================================================
async function sendLeadToTeam(payload: Record<string, any>) {
  const WEBHOOK_URL = (import.meta as any).env?.VITE_LEAD_WEBHOOK_URL || "";

  console.log("🌟 [4WAYS MEDIA TELEMETRY] LEAD CAPTURED:", payload);

  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString(),
          source: typeof window !== "undefined" ? window.location.href : "4ways.media",
        }),
      });
    } catch (err) {
      console.error("[4WAYS WEBHOOK ERROR]:", err);
    }
  }
  return true;
}

export default function FourWaysMediaOffMenuPage() {
  // --------------------------------------------------------------------------
  // 1. DYNAMIC NAVBAR THEME & SCROLL-HIDE STATE
  // --------------------------------------------------------------------------
  const [navTheme, setNavTheme] = useState<"blue" | "black" | "cream">("blue");
  const [navHidden, setNavHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = currentScrollY;

      // Calculate current theme based on section in view
      const blackSection = document.getElementById("philosophy-section");
      const creamSection = document.getElementById("cream-canvas-section");
      const finalCtaSection = document.getElementById("final-cta-section");

      const creamTop = creamSection ? creamSection.getBoundingClientRect().top : 999999;
      const finalCtaTop = finalCtaSection ? finalCtaSection.getBoundingClientRect().top : 999999;
      const blackTop = blackSection ? blackSection.getBoundingClientRect().top : 999999;

      if (finalCtaTop <= 80) {
        setNavTheme("blue");
      } else if (creamTop <= 80) {
        setNavTheme("cream");
      } else if (blackTop <= 80) {
        setNavTheme("black");
      } else {
        setNavTheme("blue");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------------------------------------------------------
  // 2. HERO 3-STEP STUDIO DIAGNOSTIC STATE
  // --------------------------------------------------------------------------
  const [heroStep, setHeroStep] = useState<1 | 2 | 3 | 4>(1);
  const [heroData, setHeroData] = useState({
    bottleneck: "",
    revenue: "",
    name: "",
    url: "",
    contact: "",
  });
  const [heroSubmitting, setHeroSubmitting] = useState(false);

  const resetHeroDiagnostic = () => {
    setHeroData({ bottleneck: "", revenue: "", name: "", url: "", contact: "" });
    setHeroStep(1);
  };

  // --------------------------------------------------------------------------
  // 3. 3-MINUTE VIDEO AUDIT BAR STATE
  // --------------------------------------------------------------------------
  const [auditUrl, setAuditUrl] = useState("");
  const [auditContact, setAuditContact] = useState("");
  const [auditSubmitting, setAuditSubmitting] = useState(false);
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  const resetAuditForm = () => {
    setAuditUrl("");
    setAuditContact("");
    setAuditSubmitted(false);
  };

  // --------------------------------------------------------------------------
  // 4. TELEMETRY ROI & REVENUE LEAK CALCULATOR STATE
  // --------------------------------------------------------------------------
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(8000);
  const [dealValue, setDealValue] = useState<number>(3000);
  const [currentConvRate, setCurrentConvRate] = useState<number>(1.0);

  const currentLeads = Math.round(monthlyTraffic * (currentConvRate / 100));
  const optimizedLeads = Math.round(monthlyTraffic * 0.042);
  const extraLeads = Math.max(optimizedLeads - currentLeads, 6);
  const missedMonthlyRevenue = Math.round(extraLeads * 0.25 * dealValue);
  const annualizedRevenue = missedMonthlyRevenue * 12;

  // --------------------------------------------------------------------------
  // 5. MODAL & STICKY BAR STATE (WITH FOOTER OVERLAP FIX)
  // --------------------------------------------------------------------------
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState("Full-Stack Growth Pod");
  const [modalContext, setModalContext] = useState("");
  const [modalForm, setModalForm] = useState({
    name: "",
    url: "",
    contact: "",
    revenue: "$10k – $30k / mo",
    note: "",
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSubmitted, setModalSubmitted] = useState(false);

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [stickyBarDismissed, setStickyBarDismissed] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  // --------------------------------------------------------------------------
  // 6. FAQ ACCORDION STATE
  // --------------------------------------------------------------------------
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // --------------------------------------------------------------------------
  // 7. INTERACTIVE ANIMATION & SENSORY STATES
  // --------------------------------------------------------------------------
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const [reactions, setReactions] = useState({ fire: 4, rocket: 6, eyes: 3 });
  const [calcPulsing, setCalcPulsing] = useState(false);
  const [activeInflection, setActiveInflection] = useState<string | null>(null);

  useEffect(() => {
    setCalcPulsing(true);
    const t = setTimeout(() => setCalcPulsing(false), 240);
    return () => clearTimeout(t);
  }, [monthlyTraffic, dealValue, currentConvRate]);

  // Sticky bar scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY > 550 && !stickyBarDismissed) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }

      if (windowHeight + scrollY >= documentHeight - 650) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stickyBarDismissed]);

  const openLeadModal = useCallback((serviceName: string, contextDescription?: string) => {
    setModalService(serviceName);
    setModalContext(contextDescription || "");
    setModalSubmitted(false);
    setModalOpen(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Form submission handlers
  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroSubmitting(true);
    await sendLeadToTeam({
      funnelType: "Hero 3-Step Interactive Diagnostic",
      ...heroData,
    });
    setHeroSubmitting(false);
    setHeroStep(4);
  };

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl || !auditContact) return;
    setAuditSubmitting(true);
    await sendLeadToTeam({
      funnelType: "3-Minute Video Teardown Request",
      url: auditUrl,
      contact: auditContact,
    });
    setAuditSubmitting(false);
    setAuditSubmitted(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitting(true);
    await sendLeadToTeam({
      funnelType: "Direct Modal Inquiry",
      service: modalService,
      context: modalContext,
      ...modalForm,
    });
    setModalSubmitting(false);
    setModalSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#121212] font-sans selection:bg-[#3643BA] selection:text-white overflow-x-hidden w-full max-w-full">
      {/* =====================================================================
          1. TOP CAPACITY TICKER BADGE
      ===================================================================== */}
      <div className="w-full bg-[#293499] text-white text-xs py-2 px-3 sm:px-4 relative z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[10px] sm:text-[11px] tracking-wider uppercase font-medium">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-bold tracking-widest whitespace-nowrap">[ CAPACITY: OCT 2026 ]</span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-white/90">
              Strictly capped at 4 partners.{" "}
              <span className="text-white font-bold underline decoration-white/40 underline-offset-4">
                2 of 4 spots claimed
              </span>
              .
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="text-white/70 hidden lg:inline">SPEED: &lt;48H MOBILIZATION</span>
            <button
              onClick={() =>
                openLeadModal(
                  "Partner Spot Reservation",
                  "Reserving 1 of 2 remaining October 2026 partner slots"
                )
              }
              className="text-white hover:text-emerald-300 font-bold tracking-widest inline-flex items-center gap-1 transition cursor-pointer whitespace-nowrap"
            >
              <span>RESERVE SLOT</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. OFF-MENU SIGNATURE ADAPTIVE TOP NAVIGATION
      ===================================================================== */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          navHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          navTheme === "blue"
            ? "bg-[#3643BA]/95 text-white border-b border-white/15 backdrop-blur-md"
            : navTheme === "black"
            ? "bg-[#0A0A0A]/95 text-white border-b border-white/10 backdrop-blur-md"
            : "bg-[#FAF9F5]/95 text-[#0A0A0A] border-b border-stone-200/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <a
              href="#engine"
              className={`transition hover:-translate-y-0.5 transform duration-150 ${
                navTheme === "cream" ? "text-stone-700 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              Pillars
            </a>
            <a
              href="#inflections"
              className={`transition hover:-translate-y-0.5 transform duration-150 ${
                navTheme === "cream" ? "text-stone-700 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              When To Hire
            </a>
            <a
              href="#calculator"
              className={`transition hover:-translate-y-0.5 transform duration-150 ${
                navTheme === "cream" ? "text-stone-700 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              Calculator
            </a>
          </nav>

          {/* Creative Studio Wordmark Logo */}
          <a
            href="#"
            className="hover:opacity-90 transition-transform hover:scale-[1.03] inline-flex items-baseline gap-1 select-none py-1"
          >
            <span
              className={`font-display text-2xl sm:text-3.5xl font-extrabold tracking-tighter leading-none transition-colors ${
                navTheme === "cream" ? "text-[#0A0A0A]" : "text-white"
              }`}
            >
              4ways
            </span>
            <span
              className={`font-serif italic text-lg sm:text-2xl font-normal transition-colors ${
                navTheme === "cream" ? "text-stone-500" : "text-white/80"
              }`}
            >
              media
            </span>
          </a>

          {/* Right Links & Rounded Pill Button */}
          <div className="flex items-center gap-3 sm:gap-7">
            <div className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-widest">
              <a
                href="#case-studies"
                className={`transition hover:-translate-y-0.5 transform duration-150 ${
                  navTheme === "cream" ? "text-stone-700 hover:text-black" : "text-white/80 hover:text-white"
                }`}
              >
                Work
              </a>
              <a
                href="#faq"
                className={`transition hover:-translate-y-0.5 transform duration-150 ${
                  navTheme === "cream" ? "text-stone-700 hover:text-black" : "text-white/80 hover:text-white"
                }`}
              >
                FAQ
              </a>
            </div>

            <button
              onClick={() =>
                openLeadModal(
                  "Full-Stack Growth Pod",
                  "Deploying the 4-operator strike team directly to your business"
                )
              }
              className={`rounded-full font-bold text-[11px] sm:text-xs uppercase tracking-wider px-3.5 sm:px-6 py-2 sm:py-2.5 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hidden sm:flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                navTheme === "cream"
                  ? "bg-[#0A0A0A] text-white hover:bg-stone-800"
                  : "bg-white text-[#121212] hover:bg-stone-100"
              }`}
            >
              <span>Get in touch</span>
              <ArrowRight
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${navTheme === "cream" ? "text-white" : "text-[#3643BA]"}`}
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -mr-1 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t px-6 py-6 text-xs uppercase tracking-widest font-bold space-y-4 shadow-2xl animate-fadeIn ${
              navTheme === "cream"
                ? "bg-[#FAF9F5] border-stone-200 text-stone-900"
                : "bg-[#0A0A0A] border-white/10 text-white"
            }`}
          >
            <a
              href="#engine"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-white/10"
            >
              <span>01 // THE 4 PILLARS</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </a>
            <a
              href="#inflections"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-white/10"
            >
              <span>02 // WHEN TO WORK WITH US</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-white/10"
            >
              <span>03 // ROI REVENUE LEAK CALCULATOR</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </a>
            <a
              href="#roster"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-white/10"
            >
              <span>04 // THE 4 PRINCIPALS</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-white/10"
            >
              <span>05 // WORK & TESTIMONIALS</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 border-b border-white/10"
            >
              <span>06 // FAQ & AUDIT</span>
              <ArrowRight className="w-4 h-4 opacity-50" />
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLeadModal(
                    "Full-Stack Growth Pod",
                    "Deploying the 4-operator strike team directly to your business"
                  );
                }}
                className="w-full py-3.5 rounded-full bg-[#3643BA] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          3. HERO SECTION (OFF-MENU SURREALIST 3D SKY WITH BALLOON, CLOUDS & MELON)
      ===================================================================== */}
      <section
        id="home-hero"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          setHeroMouse({ x, y });
        }}
        onMouseLeave={() => setHeroMouse({ x: 0, y: 0 })}
        className="bg-[#3643BA] relative overflow-hidden text-white pt-20 sm:pt-36 pb-20 sm:pb-32 lg:pb-44 select-none w-full max-w-full"
      >
        {/* Floating 3D Fluffy Cloud (Top Left) */}
        <div
          style={{
            transform: `translate3d(${heroMouse.x * -28}px, ${heroMouse.y * -16}px, 0)`,
            transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="absolute top-4 sm:top-12 -left-8 sm:left-4 md:left-12 w-28 sm:w-64 md:w-80 pointer-events-none select-none z-10 animate-float-slow opacity-60 sm:opacity-95"
        >
          <img
            src="/assets/3d_cloud_trans.png"
            alt="Surrealist 3D Fluffy Cloud"
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Floating 3D Whimsical Hot Air Balloon (Center Right) */}
        <div
          style={{
            transform: `translate3d(${heroMouse.x * 32}px, ${heroMouse.y * 22}px, 0) rotate(${heroMouse.x * 4}deg)`,
            transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="absolute top-4 sm:top-10 -right-4 sm:right-2 md:right-8 lg:right-16 xl:right-24 w-28 sm:w-60 md:w-72 lg:w-[360px] pointer-events-none select-none z-10 animate-float opacity-70 sm:opacity-100"
        >
          <img
            src="/assets/3d_balloon_trans.png"
            alt="Whimsical 3D Hot Air Balloon by 4ways"
            className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Floating 3D Watermelon Slice (Bottom Left) */}
        <div
          style={{
            transform: `translate3d(${heroMouse.x * 40}px, ${heroMouse.y * 26}px, 0) rotate(${heroMouse.x * -6}deg)`,
            transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="absolute bottom-16 sm:bottom-24 -left-4 sm:left-10 md:left-24 w-20 sm:w-44 md:w-56 pointer-events-none select-none z-10 animate-float-bob opacity-60 sm:opacity-95"
        >
          <img
            src="/assets/3d_melon_trans.png"
            alt="Surrealist 3D Watermelon"
            className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
          />
        </div>

        {/* Floating 3D Fluffy Cloud (Bottom Right) */}
        <div
          style={{
            transform: `translate3d(${heroMouse.x * -20}px, ${heroMouse.y * -14}px, 0)`,
            transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="absolute -bottom-8 sm:-bottom-12 right-0 sm:right-16 md:right-36 w-32 sm:w-72 md:w-96 pointer-events-none select-none z-10 animate-float-reverse opacity-50 sm:opacity-85"
        >
          <img
            src="/assets/3d_cloud_trans.png"
            alt="Fluffy 3D Cloud"
            className="w-full h-auto drop-shadow-xl"
          />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          {/* Studio Pill Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-5 sm:mb-8 shadow-sm max-w-full">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-ripple shrink-0" />
            <span className="truncate">4-Man Growth Strike Team • Zero Middlemen</span>
          </div>

          {/* Big, Friendly, Human, Ultra-Bold Creative Headline */}
          <h1 className="font-display text-[1.75rem] min-[370px]:text-[1.95rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.25rem] font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[0.95]">
            Be unignorable<span className="text-white/40">.</span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="mt-4 sm:mt-8 text-base sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Brand strategy & high-converting growth systems for opinionated technology companies. 
            4 dedicated senior operators — zero agency fluff.
          </p>

          {/* Rounded Pill Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto w-full">
            <button
              onClick={() =>
                openLeadModal(
                  "Full-Stack Growth Pod",
                  "Hero primary deployment: Direct strike team onboarding"
                )
              }
              className="btn-shimmer rounded-full bg-white text-[#121212] hover:bg-stone-100 font-bold px-7 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2.5 cursor-pointer justify-center w-full sm:w-auto"
            >
              <span>Deploy The 4 Operators</span>
              <ArrowRight className="w-4 h-4 text-[#3643BA]" />
            </button>

            <a
              href="#teardown"
              className="rounded-full border-2 border-white/35 hover:border-white text-white hover:bg-white/10 font-semibold px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 backdrop-blur-md inline-flex items-center gap-2.5 justify-center w-full sm:w-auto"
            >
              <span>Free 3-Min Audit</span>
              <Play className="w-3.5 h-3.5 fill-white text-white" />
            </a>
          </div>

          {/* Monochromatic Client Logos Marquee (Off-Menu "Meet the regulars") */}
          <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-white/15">
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white/60 mb-6 sm:mb-8">
              Trusted by opinionated founders at
            </div>
            <div className="overflow-hidden relative max-w-full w-full mx-auto">
              <div className="animate-marquee items-center gap-12 sm:gap-20 text-white/70 hover:text-white transition select-none">
                <ScaleLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <EnsLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <WischoffLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <KlarityLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <RhoLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <ParadigmLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <RampLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <LinearLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />

                {/* Duplicated for seamless loop */}
                <ScaleLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <EnsLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <WischoffLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <KlarityLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <RhoLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <ParadigmLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
                <RampLogo className="h-5 sm:h-6 w-auto opacity-75 hover:opacity-100 transition" />
              </div>
            </div>

            {/* Secondary Reverse Studio Accolades Ticker */}
            <div className="overflow-hidden relative max-w-full w-full mx-auto mt-6 pt-5 border-t border-white/10 select-none">
              <div className="animate-marquee-reverse items-center gap-10 text-[11px] font-mono tracking-widest text-white/50 uppercase whitespace-nowrap">
                <span>✦ 48-Hour Mobilization</span>
                <span>✦ Direct Founder Slack Pod</span>
                <span>✦ 4.2% Calibrated Conversion Yield</span>
                <span>✦ Zero Account Managers</span>
                <span>✦ Full-Funnel Architecture</span>
                <span>✦ Speed-To-Lead &lt;60s</span>
                <span>✦ Unit Economics &amp; LTV Scaling</span>
                <span>✦ 48-Hour Mobilization</span>
                <span>✦ Direct Founder Slack Pod</span>
                <span>✦ 4.2% Calibrated Conversion Yield</span>
                <span>✦ Zero Account Managers</span>
                <span>✦ Full-Funnel Architecture</span>
                <span>✦ Speed-To-Lead &lt;60s</span>
                <span>✦ Unit Economics &amp; LTV Scaling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. PITCH BLACK STUDIO SECTION: "WHY SHOULD ANYONE CARE?" (OFF-MENU SIGNATURE)
      ===================================================================== */}
      <section
        id="philosophy-section"
        className="bg-[#0A0A0A] text-white py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Eyebrow & Provocative Question */}
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/70 font-mono text-xs font-semibold uppercase tracking-wider">
              <span>It all starts with one question</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              “Why should anyone care?”
            </h2>
            <p className="text-stone-300 text-base sm:text-xl font-normal leading-relaxed">
              Most technology agencies build vanity websites that look pretty but convert under 1% of visitors. 
              4ways media brings ruthless conversion clarity. We help you develop your unfair advantage—why your product 
              matters, why competitors look obsolete, and why your pipeline converts at 3x industry benchmarks.
            </p>
          </div>

          {/* Off-Menu 2-Column Process Cards ("We do two things and we do them well") */}
          <div className="space-y-8">
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              We do two things and we do them well<span className="text-[#3643BA]">.</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1: We find your conversion edge */}
              <div className="bg-[#141414] rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#3643BA]">
                    Core Discipline // 01
                  </div>
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    We find your conversion edge
                  </h4>
                  <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                    The undeniable positioning. The psychological hooks. The sub-second digital infrastructure 
                    that turns skeptical visitors into high-ticket inbound pipeline.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-white/10">
                  {["Positioning", "Offer Hooks", "Direct-Response Copy", "Conversion Architecture"].map(
                    (tag, idx) => (
                      <div
                        key={idx}
                        className="rounded-full bg-white/5 border border-white/10 px-3 py-2 text-center font-mono text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white/80 hover:bg-white/15 hover:text-white transition"
                      >
                        {tag}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Card 2: We scale your revenue velocity */}
              <div className="bg-[#141414] rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#3643BA]">
                    Core Discipline // 02
                  </div>
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    We scale your revenue velocity
                  </h4>
                  <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
                    Every operational gear synchronized: dedicated cold outbound velocity, viral short-form 
                    founder brand authority, and backend unit-economic expansion.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-white/10">
                  {["Outbound Squad", "Speed-to-Lead <60s", "SMMA Brand Authority", "Offer Expansion"].map(
                    (tag, idx) => (
                      <div
                        key={idx}
                        className="rounded-full bg-white/5 border border-white/10 px-3 py-2 text-center font-mono text-[11px] sm:text-xs font-medium uppercase tracking-wider text-white/80 hover:bg-white/15 hover:text-white transition"
                      >
                        {tag}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Off-Menu "What makes us different" Statement */}
          <div className="pt-12 border-t border-white/10 space-y-4">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-white/50">
              What makes us different
            </div>
            <div className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
              We build the growth engine{" "}
              <span className="font-serif italic font-normal text-indigo-300">
                everyone wants, but few know how to assemble.
              </span>
            </div>
          </div>

          {/* =================================================================
              OFF-MENU INTERACTIVE INFLECTION POINTS ("WHEN TO WORK WITH US")
          ================================================================= */}
          <div id="inflections" className="pt-12 border-t border-white/10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#3643BA] mb-2">
                  Six Inflection Points
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  When to deploy our strike team
                </h3>
              </div>
              <div className="font-mono text-xs text-white/50 uppercase tracking-widest">
                Hover to expand // Click to mobilize
              </div>
            </div>

            {/* Interactive Expandable Rows */}
            <div className="space-y-3">
              {[
                {
                  id: "01",
                  title: "Going to market",
                  desc: "Break through the noise with sub-second Next.js conversion architecture and sharp positioning",
                  service: "Conversion Web Architecture",
                },
                {
                  id: "02",
                  title: "Defining a new category",
                  desc: "Establish founder brand authority and omnipresence via viral short-form media",
                  service: "SMMA & Viral Brand Dominance",
                },
                {
                  id: "03",
                  title: "Challenging the incumbents",
                  desc: "Disrupt slower competitors with automated cold outbound and aggressive calendar booking",
                  service: "Pipeline & Outbound Acquisition",
                },
                {
                  id: "04",
                  title: "Plugging the revenue leak",
                  desc: "Fix traffic bounce rates (<1.5% conversion) with psychological funnel hooks and multi-step lead capture",
                  service: "Revenue Leak Recovery",
                },
                {
                  id: "05",
                  title: "Scaling without selling out",
                  desc: "Re-engineer high-ticket value pricing, sales call closes, and customer lifetime value (LTV)",
                  service: "Offer Engineering & Advisory",
                },
                {
                  id: "06",
                  title: "Deploying full strike team",
                  desc: "Embed all 4 senior principals directly in your private Slack/Telegram channel with <6m SLA",
                  service: "Full-Stack Growth Pod",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLeadModal(item.service, item.desc)}
                  className="inflection-card bg-[#141414] border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                    <span className="inflection-num text-xs font-bold text-[#3643BA] tracking-widest shrink-0 transition-colors">
                      [{item.id}]
                    </span>
                    <div>
                      <div className="inflection-title font-bold text-lg sm:text-xl text-white tracking-tight transition-colors">
                        {item.title}
                      </div>
                      <div className="inflection-desc text-xs sm:text-sm text-stone-400 mt-0.5 leading-relaxed transition-colors">
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="inflection-title text-[11px] font-bold uppercase tracking-wider text-white/60 hidden md:inline transition-colors">
                      Mobilize
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white inflection-arrow transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. WARM STONE / CREAM STUDIO SECTION: MACHINERY & TELEMETRY
      ===================================================================== */}
      <div id="cream-canvas-section" className="bg-[#FAF9F5] py-24 sm:py-32">
        {/* ===================================================================
            A. THE 4-PILLAR REVENUE STACK (WARM EDITORIAL STUDIO GRID)
        =================================================================== */}
        <section id="engine" className="scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-8 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3643BA]/10 text-[#3643BA] font-mono text-xs font-semibold uppercase tracking-wider">
                <span>01 // The 4 Pillars</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
                4 Interconnected Disciplines. <br />
                <span className="font-serif italic font-normal text-stone-500">
                  One Singular Objective: Net-New Revenue.
                </span>
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Most companies fail to scale because their web developer doesn't understand pipeline velocity, and their
                social media agency doesn't understand unit economics. We synthesize all four into a synchronized engine.
              </p>
            </div>

            <div className="font-mono text-xs font-bold uppercase tracking-wider text-stone-400">
              Synchronized Operating Squad
            </div>
          </div>

          {/* 2x2 Clean Studio Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                index: "01",
                pillLabel: "Conversion Architecture",
                title: "High-Converting Websites & Funnels",
                serifQuote: "Digital infrastructure engineered exclusively to convert cold traffic into booked calls.",
                friction: "Most agency sites look like digital art projects but convert under 1% of visitors.",
                deliverables: [
                  "Custom Next.js & React full-stack conversion architecture (<1s latency)",
                  "Direct-response positioning & psychologically hooked copy angles",
                  "Dynamic multi-step lead capture funnels with webhook ingestion",
                  "Mobile-first checkout & booking micro-commitment UX",
                ],
                benchmark: "4.8% Avg Conversion Target",
                serviceName: "Conversion Web Architecture",
              },
              {
                index: "02",
                pillLabel: "Pipeline Velocity",
                title: "Predictable B2B & Outbound Lead Acquisition",
                serifQuote: "Systematized pipeline infrastructure that fills your sales calendar weekly.",
                friction: "Relying on word-of-mouth or uncalibrated ad spend leads to feast-or-famine cycles.",
                deliverables: [
                  "Dedicated cold outbound infrastructure (SPF, DKIM, DMARC warmed domains)",
                  "High-intent paid search & paid social acquisition campaigns",
                  "Automated speed-to-lead routing (<60s WhatsApp/SMS alerting)",
                  "Targeted B2B decision-maker list enrichment & intent scraping",
                ],
                benchmark: "35–60 Qualified Calls / Month",
                serviceName: "Pipeline & Outbound Acquisition",
              },
              {
                index: "03",
                pillLabel: "Market Omnipresence",
                title: "SMMA & Viral Short-Form Brand Authority",
                serifQuote: "Capturing targeted attention and routing it directly into your sales pipeline.",
                friction: "Vanity views that don't convert into booked appointments are just wasted production cost.",
                deliverables: [
                  "Short-form video editing engine (Reels, TikTok, YouTube Shorts)",
                  "Founder personal branding & category authority positioning",
                  "Multi-channel audience retargeting funnels that harvest viewers",
                  "Automated DM conversion funnels converting viewers into leads",
                ],
                benchmark: "500K+ Targeted Monthly Impressions",
                serviceName: "SMMA & Viral Brand Dominance",
              },
              {
                index: "04",
                pillLabel: "Executive Advisory",
                title: "Offer Engineering & Bottleneck Consulting",
                serifQuote: "Fixing backend unit economics so aggressive scaling doesn't collapse margins.",
                friction: "Flooding a broken backend with more leads simply breaks delivery and burns cash.",
                deliverables: [
                  "High-ticket offer restructuring & value-pricing architecture",
                  "Sales call recording review, objection handling & closing audits",
                  "Client retention mechanisms & Customer Lifetime Value (LTV) expansion",
                  "Weekly operator sprint reviews directly with our 4 partners",
                ],
                benchmark: "2.2X Average LTV Expansion",
                serviceName: "Offer Engineering & Advisory",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="card-lift hover-border-expand group bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/80 hover:border-[#3643BA]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(54,67,186,0.08)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                    <span className="font-mono text-xs font-bold text-[#3643BA] tracking-widest transition-transform duration-200 group-hover:translate-x-0.5">
                      [{item.index} // 04]
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 text-stone-700 group-hover:bg-[#3643BA]/10 group-hover:text-[#3643BA] transition-colors duration-200">
                      {item.pillLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-stone-900 tracking-tight mb-2 group-hover:text-[#3643BA] transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="font-serif italic text-stone-600 text-lg mb-4 leading-relaxed">
                    "{item.serifQuote}"
                  </p>

                  <p className="text-xs text-stone-600 mb-6 bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                    <strong className="text-stone-900">The Friction:</strong> {item.friction}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      System Deliverables:
                    </div>
                    {item.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed">
                        <Check className="w-4 h-4 text-[#3643BA] shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#3643BA]">
                    {item.benchmark}
                  </span>
                  <button
                    onClick={() =>
                      openLeadModal(
                        item.serviceName,
                        `Focused engagement for ${item.title}`
                      )
                    }
                    className="btn-shimmer rounded-full bg-stone-900 hover:bg-[#3643BA] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto group-hover:bg-[#3643BA]"
                  >
                    <span>Configure Pillar</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            B. TELEMETRY ROI & REVENUE LEAK CALCULATOR (STUDIO CONSOLE)
        =================================================================== */}
        <section id="calculator" className="mt-28 scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white border border-stone-200/80 rounded-3xl p-5 sm:p-10 lg:p-16 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            {/* Header */}
            <div className="space-y-3 max-w-2xl mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3643BA]/10 text-[#3643BA] font-mono text-xs font-semibold uppercase tracking-wider">
                <span>02 // Telemetry: Revenue Leak Modeler</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
                Quantify The Exact Pipeline <br />
                <span className="font-serif italic font-normal text-stone-500">
                  Leaking From Your Funnel.
                </span>
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Adjust the telemetry parameters below based on your current audience traffic and average deal size.
                See the immediate financial impact of upgrading your conversion architecture and outbound velocity.
              </p>
            </div>

            {/* Calculator Grid */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Left Controls */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                {/* Slider 1: Monthly Traffic */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold uppercase tracking-wider text-stone-700">
                      Monthly Website Visitors / Reach:
                    </span>
                    <span className="font-bold text-stone-900 text-base">
                      {monthlyTraffic.toLocaleString()}{" "}
                      <span className="text-xs text-stone-500 font-normal">visitors/mo</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={1000}
                    value={monthlyTraffic}
                    onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    aria-label="Monthly Website Visitors or Reach"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 font-medium">
                    <span>1,000 / mo</span>
                    <span>25,000 / mo</span>
                    <span>50,000 / mo</span>
                  </div>
                </div>

                {/* Slider 2: Average Deal Value */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold uppercase tracking-wider text-stone-700">
                      Average Client Value / Deal Size:
                    </span>
                    <span className="font-bold text-stone-900 text-base">
                      ${dealValue.toLocaleString()}{" "}
                      <span className="text-xs text-stone-500 font-normal">USD</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={20000}
                    step={250}
                    value={dealValue}
                    onChange={(e) => setDealValue(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    aria-label="Average Client Value or Deal Size"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 font-medium">
                    <span>$500</span>
                    <span>$10,000</span>
                    <span>$20,000</span>
                  </div>
                </div>

                {/* Slider 3: Current Conversion Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="font-bold uppercase tracking-wider text-stone-700">
                      Baseline Website Conversion Rate:
                    </span>
                    <span className="font-bold text-stone-900 text-base">
                      {currentConvRate.toFixed(1)}%{" "}
                      <span className="text-xs text-stone-500 font-normal">conversion</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={3.0}
                    step={0.1}
                    value={currentConvRate}
                    onChange={(e) => setCurrentConvRate(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    aria-label="Baseline Website Conversion Rate"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 font-medium">
                    <span>0.5% (Weak)</span>
                    <span>1.5% (Average)</span>
                    <span>3.0% (Strong)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 text-xs text-stone-500 leading-relaxed">
                  <strong className="text-stone-800">Methodology:</strong> 4ways media targets a calibrated 4.2%
                  conversion architecture rate and models a conservative 25% close rate on net-new qualified pipeline.
                </div>
              </div>

              {/* Right Output Dashboard */}
              <div className="lg:col-span-5 bg-stone-50 rounded-3xl p-5 sm:p-8 border border-stone-200/80 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-400">
                    <span>Telemetry Output</span>
                    <span className="text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full font-bold">Leak Detected</span>
                  </div>

                  {/* Lead Comparison */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200/70">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400">Current Leads</div>
                      <div className="text-lg sm:text-xl font-extrabold text-stone-800 mt-0.5">~{currentLeads} / mo</div>
                      <div className="text-[10px] sm:text-[11px] text-stone-400">at {currentConvRate.toFixed(1)}% rate</div>
                    </div>
                    <div className="border-l border-stone-100 pl-3 sm:pl-4">
                      <div className="text-[10px] font-bold uppercase text-[#3643BA]">4ways Target</div>
                      <div className={`text-lg sm:text-xl font-extrabold mt-0.5 transition-all duration-200 transform origin-left ${calcPulsing ? "scale-110 text-emerald-600" : "text-[#3643BA]"}`}>
                        ~{optimizedLeads} / mo
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-stone-400">at 4.2% engineered rate</div>
                    </div>
                  </div>

                  {/* Highlight Metric */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/70 space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Estimated Revenue Left On The Table:
                    </div>
                    <div className={`text-3xl sm:text-5xl font-extrabold tracking-tight transition-all duration-200 transform origin-left break-words ${calcPulsing ? "scale-105 text-[#3643BA]" : "scale-100 text-stone-900"}`}>
                      +${missedMonthlyRevenue.toLocaleString()}
                      <span className="text-sm sm:text-base font-normal text-stone-500 ml-1">/mo</span>
                    </div>
                    <div className={`text-xs font-bold pt-1 transition-colors duration-200 ${calcPulsing ? "text-rose-600 font-extrabold" : "text-[#3643BA]"}`}>
                      +${annualizedRevenue.toLocaleString()} Annualized Loss
                    </div>
                    <p className="text-xs text-stone-500 pt-2 leading-relaxed">
                      Based on generating <strong className="text-stone-800">+{extraLeads} net-new qualified leads</strong>{" "}
                      per month at your current ${dealValue.toLocaleString()} deal size.
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2 sm:pt-6">
                  <button
                    onClick={() =>
                      openLeadModal(
                        "Revenue Leak Recovery",
                        `Identified +$${missedMonthlyRevenue.toLocaleString()}/mo pipeline revenue leak to recover`
                      )
                    }
                    className="btn-shimmer w-full py-3.5 sm:py-4 rounded-full bg-[#3643BA] hover:bg-[#2A3598] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Plug This Revenue Leak Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            C. HERO INTERACTIVE GROWTH DIAGNOSTIC CONSOLE (LUXURY STUDIO CARD)
        =================================================================== */}
        <section id="diagnostic" className="mt-28 scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-stone-200/80">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200/70 pb-5 mb-8">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[#3643BA]/10 text-[#3643BA] flex items-center justify-center font-mono font-bold text-sm">
                  03
                </span>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 tracking-tight">
                    Instant Growth Diagnostic
                  </h3>
                  <p className="text-xs text-stone-500">
                    Select your current bottleneck to route to the 4 founders
                  </p>
                </div>
              </div>

              {heroStep < 4 ? (
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Step <span className="text-[#3643BA] font-bold text-sm">0{heroStep}</span> of 03
                </div>
              ) : (
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Dispatched
                </div>
              )}
            </div>

            {/* STEP 1: BOTTLENECK SELECTION */}
            {heroStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#3643BA]">
                    Parameter 01
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                    What is throttling your growth today?
                  </h4>
                  <p className="text-sm text-stone-600">
                    Select your primary friction point for our partners to analyze:
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      id: "01",
                      title: "Conversion Web Architecture",
                      desc: "Traffic visits but bounces without booking calls (<2% conv)",
                    },
                    {
                      id: "02",
                      title: "Pipeline & Outbound Velocity",
                      desc: "Inconsistent lead volume; calendar has open slots every week",
                    },
                    {
                      id: "03",
                      title: "SMMA & Market Omnipresence",
                      desc: "Lack of brand authority, organic attention, or viral creative",
                    },
                    {
                      id: "04",
                      title: "Full-Stack Strike Team Deployment",
                      desc: "Deploy all 4 senior operators across your entire growth stack",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setHeroData({ ...heroData, bottleneck: item.title });
                        setHeroStep(2);
                      }}
                      className="text-left p-4 rounded-2xl border border-stone-200 hover:border-[#3643BA] bg-stone-50/50 hover:bg-[#3643BA]/[0.03] transition-all duration-200 group flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#3643BA]">[{item.id}]</span>
                          <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#3643BA] group-hover:translate-x-1 transition" />
                        </div>
                        <div className="font-display font-bold text-stone-900 text-sm sm:text-base mt-2 group-hover:text-[#3643BA] transition">
                          {item.title}
                        </div>
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: REVENUE TIER SELECTION */}
            {heroStep === 2 && (
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setHeroStep(1)}
                  className="font-mono text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-stone-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Step 1
                </button>

                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#3643BA]">
                    Parameter 02
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                    Current monthly revenue trajectory:
                  </h4>
                  <p className="text-sm text-stone-600">
                    Select your current scale to tailor the operational playbook:
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { tier: "Under $10k / mo", note: "Product-market fit & initial pipeline sprint" },
                    { tier: "$10k – $30k / mo", note: "High-ticket offer validation & conversion engine" },
                    { tier: "$30k – $75k / mo", note: "Multi-channel outbound & aggressive scaling" },
                    { tier: "$75k+ / mo", note: "Category dominance & backend unit-economic expansion" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setHeroData({ ...heroData, revenue: item.tier });
                        setHeroStep(3);
                      }}
                      className="text-left p-4 rounded-2xl border border-stone-200 hover:border-[#3643BA] bg-stone-50/50 hover:bg-[#3643BA]/[0.03] transition-all duration-200 group flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="font-display font-bold text-stone-900 text-sm group-hover:text-[#3643BA] transition">
                          {item.tier}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">{item.note}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#3643BA] group-hover:translate-x-1 transition shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT INFORMATION */}
            {heroStep === 3 && (
              <form onSubmit={handleHeroSubmit} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setHeroStep(2)}
                  className="font-mono text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-stone-800 inline-flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Step 2
                </button>

                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#3643BA]">
                    Parameter 03
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                    Where should the 4 founders deliver your telemetry?
                  </h4>
                  <p className="text-sm text-stone-600">
                    Direct founder review. Strictly zero automated bot spam.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Founder / Executive Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Umar Insavaliev"
                      value={heroData.name}
                      onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#3643BA] focus:ring-2 focus:ring-[#3643BA]/15 text-stone-900 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Website Domain or Social Handle *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. company.com or @handle"
                      value={heroData.url}
                      onChange={(e) => setHeroData({ ...heroData, url: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#3643BA] focus:ring-2 focus:ring-[#3643BA]/15 text-stone-900 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Direct Email or WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="founder@company.com or +1 (555) 000-0000"
                      value={heroData.contact}
                      onChange={(e) => setHeroData({ ...heroData, contact: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#3643BA] focus:ring-2 focus:ring-[#3643BA]/15 text-stone-900 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={heroSubmitting}
                  className="btn-shimmer w-full py-4 rounded-full bg-[#3643BA] hover:bg-[#2A3598] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4 group"
                >
                  {heroSubmitting ? (
                    <span>Transmitting Telemetry...</span>
                  ) : (
                    <>
                      <span>Dispatch To The 4 Founders</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 4: CONFIRMATION RECEIPT */}
            {heroStep === 4 && (
              <div className="py-6 space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="text-emerald-800 font-bold flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>Telemetry Transmission Confirmed</span>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Target domain <span className="font-bold">{heroData.url}</span> received for{" "}
                    <span className="font-semibold">{heroData.bottleneck}</span>.
                  </p>
                  <div className="text-[11px] text-emerald-600 pt-1 border-t border-emerald-200">
                    Allocated to: Alex, Marcus, Elena & David • SLA: &lt;4 hours
                  </div>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  Thank you, <strong className="text-stone-900">{heroData.name}</strong>. Our 4 partners are currently
                  reviewing your funnel architecture. You will receive an unvarnished audit via{" "}
                  <span className="text-[#3643BA] font-semibold">{heroData.contact}</span> shortly.
                </p>

                <button
                  type="button"
                  onClick={resetHeroDiagnostic}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  Start a new diagnostic
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ===================================================================
            D. FREE 3-MINUTE VIDEO TEARDOWN CALLOUT BAR
        =================================================================== */}
        <section id="teardown" className="mt-28 scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-10 lg:p-16 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* Left Context */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3643BA]/10 text-[#3643BA] font-mono text-xs font-semibold uppercase tracking-wider">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Audit Protocol // Unvarnished Teardown</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
                  Skeptical? We prove it first. <br />
                  <span className="font-serif italic font-normal text-stone-500">
                    Get a free 3-minute video teardown.
                  </span>
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  No 45-minute sales pitch. Submit your website or Instagram handle. One of our 4 founders will
                  personally record an unscripted 3-minute video revealing the{" "}
                  <strong className="text-stone-900">exact 3 conversion leaks</strong> throttling your pipeline revenue right now.
                </p>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-6">
                {!auditSubmitted ? (
                  <form onSubmit={handleAuditSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Domain (e.g. yourcompany.com)"
                        value={auditUrl}
                        onChange={(e) => setAuditUrl(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-full border border-stone-200 focus:border-[#3643BA] focus:ring-2 focus:ring-[#3643BA]/15 text-stone-900 text-sm outline-none transition bg-stone-50/50"
                      />
                      <input
                        type="text"
                        required
                        placeholder="WhatsApp or Email"
                        value={auditContact}
                        onChange={(e) => setAuditContact(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-full border border-stone-200 focus:border-[#3643BA] focus:ring-2 focus:ring-[#3643BA]/15 text-stone-900 text-sm outline-none transition bg-stone-50/50"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                      <button
                        type="submit"
                        disabled={auditSubmitting}
                        className="btn-shimmer w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#121212] hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        {auditSubmitting ? (
                          <span>Processing Queue...</span>
                        ) : (
                          <>
                            <span>Dispatch Free Teardown</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                      <span className="text-xs text-stone-500 font-medium">
                        Delivery: &lt;12 hours • 100% custom recorded
                      </span>
                    </div>
                  </form>
                ) : (
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 space-y-3">
                    <div className="text-emerald-700 font-bold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Teardown Queued: SLA Active</span>
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      Your request for <strong className="text-stone-900">{auditUrl}</strong> has been claimed by our founding team.
                      We will transmit your personalized teardown directly to{" "}
                      <span className="text-[#3643BA] font-semibold">{auditContact}</span> in &lt;12 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={resetAuditForm}
                      className="text-xs font-semibold text-stone-500 hover:text-stone-900 underline cursor-pointer"
                    >
                      Request another teardown
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            E. MEET THE 4 PRINCIPALS (STUDIO ROSTER)
        =================================================================== */}
        <section id="roster" className="mt-28 scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="space-y-3 max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3643BA]/10 text-[#3643BA] font-mono text-xs font-semibold uppercase tracking-wider">
              <span>04 // Roster: The 4 Principals</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
              Meet The 4 Operators <br />
              <span className="font-serif italic font-normal text-stone-500">
                Direct In Your Dedicated Channel.
              </span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Every pillar is commanded by a senior operator with a proven track record. You deal directly with the
              principals—never an outsourced intern.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                index: "01",
                name: "Umar Insavaliev",
                role: "Conversion Architecture",
                focus:
                  "Specializes in sub-second Next.js web systems, psychological offer positioning, and multi-step lead capture flows.",
                stack: ["Next.js", "React", "Tailwind", "Vercel", "Stripe"],
                avatarBg: "bg-[#3643BA]",
              },
              {
                index: "02",
                name: "Khamid Kholmatov",
                role: "Pipeline & Outbound",
                focus:
                  "Engineers automated cold outbound infrastructure, high-intent paid acquisition funnels, and speed-to-lead CRM triggers.",
                stack: ["Smartlead", "Instantly", "Meta Ads", "HubSpot", "Zapier"],
                avatarBg: "bg-stone-900",
              },
              {
                index: "03",
                name: "Onur Ahmadov",
                role: "SMMA & Viral Branding",
                focus:
                  "Builds category-dominating short-form content pipelines, founder authority architectures, and multi-channel retargeting.",
                stack: ["Premiere", "CapCut", "TikTok Ads", "IG Funnels", "ManyChat"],
                avatarBg: "bg-[#252F86]",
              },
              {
                index: "04",
                name: "Omar Mammadzade",
                role: "Scaling & Unit Economics",
                focus:
                  "Optimizes high-ticket offer pricing, close-rate mechanics, sales scripts, and backend operational throughput.",
                stack: ["Offer Design", "Sales Audits", "LTV Modeling", "Retention"],
                avatarBg: "bg-stone-800",
              },
            ].map((op, i) => (
              <div
                key={i}
                className="card-lift hover-border-expand group bg-white rounded-3xl p-5 sm:p-7 lg:p-8 border border-stone-200/80 hover:border-[#3643BA]/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-full ${op.avatarBg} text-white font-display font-bold flex items-center justify-center text-sm shadow-sm transition-transform duration-300 group-hover:scale-110`}
                    >
                      {op.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#3643BA] transition-transform duration-200 group-hover:translate-x-0.5">
                      [{op.index}]
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-xl font-bold text-stone-900 tracking-tight group-hover:text-[#3643BA] transition-colors duration-200">
                      {op.name}
                    </h4>
                    <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#3643BA] mt-0.5">
                      {op.role}
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">{op.focus}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-stone-100">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Specialized Stack:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {op.stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-mono text-[10px] font-medium transition-colors duration-200 group-hover:bg-[#3643BA]/10 group-hover:text-[#3643BA]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            F. THE FOUNDER POD LIVE CHAT PREVIEW (NO MIDDLEMEN)
        =================================================================== */}
        <section id="pod-chat" className="mt-28 scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white border border-stone-200/80 rounded-3xl p-5 sm:p-10 lg:p-16 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Context */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3643BA]/10 text-[#3643BA] font-mono text-xs font-semibold uppercase tracking-wider">
                  <span>05 // Proof: Zero Account Managers</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
                  No tickets. No middlemen. <br />
                  <span className="font-serif italic font-normal text-stone-500">
                    You chat directly with the 4 operators.
                  </span>
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  When you partner with 4ways media, you don't get tossed into an email ticketing queue or forced into
                  bi-weekly status calls with an account manager who doesn't code or run ads.
                </p>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  You get added to a private, high-velocity Slack or Telegram channel with our 4 founders. When you ask a
                  question, the specialist writing your code or launching your ad replies in minutes.
                </p>

                <div className="pt-4 border-t border-stone-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-200/60">
                    <span className="text-stone-500 uppercase font-semibold">Average Response Time</span>
                    <span className="text-[#3643BA] font-bold">&lt;6 Minutes</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-stone-200/60">
                    <span className="text-stone-500 uppercase font-semibold">Communication Platforms</span>
                    <span className="text-stone-900 font-bold">Slack // Telegram // WhatsApp</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-stone-500 uppercase font-semibold">Junior Account Managers</span>
                    <span className="text-emerald-600 font-bold">Strictly Zero</span>
                  </div>
                </div>
              </div>

              {/* Right Chat Mockup Window */}
              <div className="lg:col-span-7">
                <div className="bg-[#FAF9F5] rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
                  {/* Chat Top Bar */}
                  <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-stone-100/80 border-b border-stone-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="font-bold text-stone-900 truncate">#growth-pod-apex-saas</span>
                      <span className="text-stone-400 text-[11px] hidden sm:inline">(5 members • private channel)</span>
                    </div>
                    <div className="text-[11px] text-stone-500 font-medium shrink-0">All 4 operators online</div>
                  </div>

                  {/* Message Stream */}
                  <div className="p-4 sm:p-6 space-y-4 text-xs">
                    {/* Sarah (Client CEO) */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-800 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                        SC
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">Sarah Chen</span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">CLIENT CEO</span>
                          <span className="text-stone-400 text-[10px]">10:14 AM</span>
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-none p-3.5 border border-stone-200/70 text-stone-700 leading-relaxed shadow-sm">
                          Hey team! Traffic from the new campaign jumped 45% this morning, but I noticed our mobile
                          lead form completion dropped slightly. Can we look into it?
                        </div>
                      </div>
                    </div>

                    {/* Umar Insavaliev (Web Architect) */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#3643BA] text-white font-bold flex items-center justify-center shrink-0 text-xs">
                        UI
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">Umar Insavaliev</span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#3643BA]/10 text-[#3643BA]">WEB ARCHITECT</span>
                          <span className="text-stone-400 text-[10px]">10:16 AM (2m reply)</span>
                        </div>
                        <div className="bg-[#3643BA]/[0.05] rounded-2xl rounded-tl-none p-3.5 border border-[#3643BA]/25 text-stone-700 leading-relaxed shadow-sm">
                          Already resolved, Sarah! iOS 17 viewport bug was adding an unnecessary scroll step on mobile form
                          fields. Pushed a hotfix to Vercel production 40 seconds ago. Mobile completion rate is back to{" "}
                          <strong className="text-[#3643BA] font-bold">5.2%</strong>.
                        </div>
                      </div>
                    </div>

                    {/* Khamid Kholmatov (Outbound) */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                        KK
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">Khamid Kholmatov</span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-stone-200 text-stone-700">PIPELINE & OUTBOUND</span>
                          <span className="text-stone-400 text-[10px]">10:17 AM</span>
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-none p-3.5 border border-stone-200/70 text-stone-700 leading-relaxed shadow-sm">
                          And to add to that: Outbound Cohort B (Series A CFOs) hit a{" "}
                          <strong className="text-stone-900">68.4% open rate</strong>. Just booked 3 qualified discovery calls
                          directly into your calendar for tomorrow afternoon ($45k pipeline value).
                        </div>

                        {/* Interactive Slack Emoji Reactions */}
                        <div className="flex items-center gap-1.5 pt-1.5">
                          <button
                            type="button"
                            onClick={() => setReactions((r) => ({ ...r, fire: r.fire + 1 }))}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200/80 hover:border-amber-300 hover:bg-amber-50 text-[11px] font-medium text-stone-700 transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
                            title="React with Fire"
                          >
                            <span>🔥</span>
                            <span className="font-bold text-stone-800">{reactions.fire}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setReactions((r) => ({ ...r, rocket: r.rocket + 1 }))}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200/80 hover:border-blue-300 hover:bg-blue-50 text-[11px] font-medium text-stone-700 transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
                            title="React with Rocket"
                          >
                            <span>🚀</span>
                            <span className="font-bold text-stone-800">{reactions.rocket}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setReactions((r) => ({ ...r, eyes: r.eyes + 1 }))}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200/80 hover:border-purple-300 hover:bg-purple-50 text-[11px] font-medium text-stone-700 transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
                            title="React with Eyes"
                          >
                            <span>👀</span>
                            <span className="font-bold text-stone-800">{reactions.eyes}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Live Typing Status - Omar Mammadzade */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 text-stone-400 font-bold flex items-center justify-center shrink-0 text-xs">
                        OM
                      </div>
                      <div className="inline-flex items-center gap-2.5 bg-white border border-stone-200/70 rounded-full px-3.5 sm:px-4 py-1.5 shadow-xs">
                        <span className="text-[11px] text-stone-600 font-medium">Omar Mammadzade is typing</span>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3643BA] typing-dot-1" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3643BA] typing-dot-2" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3643BA] typing-dot-3" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Footer */}
                  <div className="px-4 sm:px-6 py-3 bg-stone-100/60 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="truncate">Direct Slack/Telegram channel snapshot</span>
                    <span className="text-[#3643BA] font-bold shrink-0 ml-2">&lt;6m SLA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            G. NICE WORDS FROM NICE PEOPLE (OFF-MENU MASONRY TESTIMONIALS)
        =================================================================== */}
        <section id="case-studies" className="mt-28 scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-8 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3643BA]/10 text-[#3643BA] font-mono text-xs font-semibold uppercase tracking-wider">
                <span>06 // Results & Evidence</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
                Nice words from nice people<span className="text-[#3643BA]">.</span>
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                We treat growth as an engineering discipline. Here is what happens when opinionated founders partner with our 4-operator squad.
              </p>
            </div>

            <button
              onClick={() => openLeadModal("Case Study Deep Dive", "Exploring partner proof")}
              className="rounded-full border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-bold uppercase tracking-wider px-6 py-3 transition inline-flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <span>Explore All Work</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3-Column Testimonials Masonry */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <div className="card-lift bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 hover:border-[#3643BA]/40 shadow-sm space-y-4">
                <p className="text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed font-normal">
                  "4ways is like having an adopted 4th co-founder who only cares about net-new revenue."
                </p>
                <div className="pt-2 border-t border-stone-100">
                  <div className="font-display font-bold text-stone-900 text-sm">Atikih</div>
                  <div className="text-xs text-stone-500">CEO at Acctual</div>
                </div>
              </div>

              <div className="card-lift bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 hover:border-[#3643BA]/40 shadow-sm space-y-4">
                <p className="text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed font-normal">
                  "Our go-to partner for conversion architecture and high-velocity storytelling. They nailed our launch."
                </p>
                <div className="pt-2 border-t border-stone-100">
                  <div className="font-display font-bold text-stone-900 text-sm">Philip</div>
                  <div className="text-xs text-stone-500">VP of Marketing at Scale</div>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div className="card-lift bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 hover:border-[#3643BA]/40 shadow-sm space-y-4">
                <p className="text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed font-normal">
                  "10/10, no notes. Within 14 days, our outbound calendar was booked solid with Series A CFOs."
                </p>
                <div className="pt-2 border-t border-stone-100">
                  <div className="font-display font-bold text-stone-900 text-sm">Fred</div>
                  <div className="text-xs text-stone-500">Co-founder at Finder</div>
                </div>
              </div>

              <div className="card-lift bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 hover:border-[#3643BA]/40 shadow-sm space-y-4">
                <p className="text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed font-normal">
                  "What started as a sprint project has evolved into an indispensable extension of our team."
                </p>
                <div className="pt-2 border-t border-stone-100">
                  <div className="font-display font-bold text-stone-900 text-sm">Yuri</div>
                  <div className="text-xs text-stone-500">Head of Growth at Klarity</div>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-6">
              <div className="card-lift bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 hover:border-[#3643BA]/40 shadow-sm space-y-4">
                <p className="text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed font-normal">
                  "It's rare to find an agency team who cares as obsessively about unit economics as you do."
                </p>
                <div className="pt-2 border-t border-stone-100">
                  <div className="font-display font-bold text-stone-900 text-sm">Nichole</div>
                  <div className="text-xs text-stone-500">General Partner at Wischoff Ventures</div>
                </div>
              </div>

              <div className="card-lift bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 hover:border-[#3643BA]/40 shadow-sm space-y-4">
                <p className="text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed font-normal">
                  "The best operators I've ever worked with. An incredible 4-man strike force."
                </p>
                <div className="pt-2 border-t border-stone-100">
                  <div className="font-display font-bold text-stone-900 text-sm">Gareth</div>
                  <div className="text-xs text-stone-500">Head of Marketing at Bridge</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            H. FAQ ACCORDION ("GOT QUESTIONS?")
        =================================================================== */}
        <section id="faq" className="mt-28 scroll-mt-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="space-y-3 mb-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3643BA]/10 text-[#3643BA] font-mono text-xs font-semibold uppercase tracking-wider">
              <span>07 // Clarity</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
              Got questions<span className="text-[#3643BA]">?</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Clear, unvarnished answers before we mobilize.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/80 divide-y divide-stone-100 shadow-sm overflow-hidden">
            {[
              {
                q: "Can we hire 4ways media for a single service (e.g. just Web or just Outbound Leads)?",
                a: "Yes. While our most aggressive partner outcomes come from synchronizing all 4 pillars, you can engage our strike team for a single high-impact objective—such as an urgent conversion website overhaul or an outbound lead acquisition sprint. During your diagnostic, we will specify which bottleneck unlocks the fastest ROI.",
              },
              {
                q: "Do we genuinely work directly with the 4 founders in Slack / Telegram?",
                a: "100% yes. We do not employ account managers, offshore coordinators, or junior liaisons. The 4 partners you see on this page are the 4 operators in your dedicated channel building your funnels, writing your outbound campaigns, and optimizing your sales scripts.",
              },
              {
                q: "How fast can we mobilize and see live pipeline results?",
                a: "We mobilize within 48 hours of contract execution. Because we don't have layers of agency bureaucracy, new conversion funnels and outbound campaigns typically launch to production within 7 to 10 days.",
              },
              {
                q: "Why do you cap onboarding at 4 partner slots per month?",
                a: "Because all 4 founders personally execute the work. To maintain elite sprint velocity and give every partner obsessive attention, we strictly limit active capacity. When 4 slots are booked, subsequent partners are placed on a waitlist for the following month.",
              },
              {
                q: "What makes your websites different from conventional web design agencies?",
                a: "Conventional agencies build digital brochures that prioritize aesthetic animations over cash flow. We build direct-response conversion engines: lightning-fast Next.js architecture, psychological copywriting hooks, interactive lead diagnostics, and instant speed-to-lead automation designed specifically to produce booked calls.",
              },
            ].map((item, idx) => (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group cursor-pointer hover:bg-stone-50/60 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-[#3643BA]">0{idx + 1}</span>
                    <span className="font-display text-base font-bold text-stone-900 group-hover:text-[#3643BA] transition">
                      {item.q}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 text-stone-600 group-hover:bg-[#3643BA] group-hover:text-white transition-all duration-200 ${openFaq === idx ? "rotate-90 bg-[#3643BA] text-white" : "rotate-0"}`}>
                    {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openFaq === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-sm text-stone-600 leading-relaxed pt-1">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* =====================================================================
          6. FINAL CALL-TO-ACTION BANNER (ROYAL PERIWINKLE CANVAS)
      ===================================================================== */}
      <section id="final-cta-section" className="bg-[#FAF9F5] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#3643BA] rounded-3xl p-6 sm:p-14 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          {/* Subtle floating 3D cloud accent */}
          <div className="absolute top-0 right-0 w-80 pointer-events-none opacity-40 animate-float-slow select-none">
            <img src="/assets/3d_cloud_trans.png" alt="" className="w-full h-auto drop-shadow-xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Immediate Capacity // 2 Spots Available</span>
            </div>

            <h2 className="font-display text-3xl sm:text-6xl font-black tracking-tight leading-tight">
              Plug The 4-Man Strike Team <br />
              Directly Into Your Engine<span className="text-white/40">.</span>
            </h2>

            <p className="text-white/85 text-sm sm:text-lg leading-relaxed max-w-xl mx-auto">
              Reserve your partner slot for this cycle or request your unscripted 3-minute video teardown before
              the remaining 2 spots are locked.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <button
                onClick={() =>
                  openLeadModal(
                    "Partner Spot Reservation",
                    "Final Executive Partnership Claim: Reserving 1 of 2 spots"
                  )
                }
                className="btn-shimmer w-full sm:w-auto rounded-full bg-white text-[#121212] hover:bg-stone-100 font-bold px-8 py-4 text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Claim Partner Spot Now</span>
                <ArrowRight className="w-4 h-4 text-[#3643BA] transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <a
                href="#teardown"
                className="w-full sm:w-auto rounded-full border-2 border-white/40 hover:border-white text-white hover:bg-white/10 font-semibold px-8 py-4 text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 backdrop-blur-md inline-flex items-center justify-center gap-2"
              >
                <span>Get Free 3-Min Teardown</span>
                <Play className="w-3.5 h-3.5 fill-white text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. MINIMALIST STUDIO FOOTER
      ===================================================================== */}
      <footer className="border-t border-stone-200/80 pt-12 pb-16 text-xs text-stone-500 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 text-center md:text-left">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-display text-2xl text-stone-900 font-extrabold tracking-tighter">4ways</span>
            <span className="font-serif italic text-stone-500 text-lg font-normal">media</span>
            <span className="text-stone-300 mx-2 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-stone-500">4-Operator Embedded Growth Pod</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] uppercase tracking-wider font-semibold text-stone-600">
            <a href="#engine" className="hover:text-stone-900 transition">Web Architecture</a>
            <span className="hidden sm:inline">•</span>
            <a href="#engine" className="hover:text-stone-900 transition">Outbound Leads</a>
            <span className="hidden sm:inline">•</span>
            <a href="#engine" className="hover:text-stone-900 transition">SMMA</a>
            <span className="hidden sm:inline">•</span>
            <a href="#engine" className="hover:text-stone-900 transition">Scaling</a>
          </div>

          <div className="text-[11px] text-stone-400 text-center">
            © {new Date().getFullYear()} 4WAYS MEDIA. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* =====================================================================
          8. STICKY FLOATING BOTTOM PILL BAR (OFF-MENU LUXURY)
      ===================================================================== */}
      {showStickyBar && !stickyBarDismissed && !modalOpen && !isNearBottom && (
        <div className="fixed bottom-4 sm:bottom-6 left-3 sm:left-4 right-3 sm:right-4 z-40 max-w-xl mx-auto bg-stone-900/95 text-white backdrop-blur-xl rounded-full px-4 sm:px-5 py-2.5 sm:py-3 shadow-2xl flex items-center justify-between gap-2 sm:gap-3 border border-stone-700 animate-fadeIn">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="text-xs truncate font-medium">
              <span className="font-bold text-white">2 Spots Remaining</span>
              <span className="hidden sm:inline text-stone-300 ml-1.5">— 48h mobilization directly with 4 founders</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() =>
                openLeadModal(
                  "Partner Spot Reservation",
                  "Sticky Bar Ingestion: Reserving 1 of 2 remaining partner spots"
                )
              }
              className="btn-shimmer bg-white hover:bg-stone-100 text-stone-900 font-bold rounded-full text-[11px] sm:text-xs uppercase tracking-wider px-3.5 sm:px-4 py-1.5 sm:py-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm group"
            >
              <span>Claim Spot</span>
              <ArrowRight className="w-3 h-3 text-[#3643BA] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => setStickyBarDismissed(true)}
              className="text-stone-400 hover:text-white p-1 transition cursor-pointer"
              title="Dismiss banner"
              aria-label="Dismiss sticky bar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          9. INSTANT LEAD CAPTURE MODAL
      ===================================================================== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 relative shadow-2xl my-8 border border-stone-200">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition cursor-pointer p-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!modalSubmitted ? (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3643BA]/10 text-[#3643BA] font-mono text-xs font-semibold uppercase tracking-wider">
                  <span>Ingestion // {modalService}</span>
                </div>

                <h3 className="font-display text-2xl font-black tracking-tight text-stone-900">
                  Deploy The 4-Man Strike Team
                </h3>
                <div className="space-y-1">
                  {modalContext ? (
                    <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200/70 mb-2">
                      <strong className="text-stone-900">Context:</strong> {modalContext}
                    </div>
                  ) : null}
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Provide your business details below. The principal operator responsible for{" "}
                    <strong className="text-stone-800">{modalService}</strong> will personally review your domain
                    and reach out within 4 business hours.
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block text-stone-700 mb-1 font-bold uppercase tracking-wider text-[11px]">
                      Your Name / Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Ross (Founder)"
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#3643BA] focus:ring-2 focus:ring-[#3643BA]/15 text-stone-900 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-1 font-bold uppercase tracking-wider text-[11px]">
                      Target Website URL or Handle *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. company.com or @handle"
                      value={modalForm.url}
                      onChange={(e) => setModalForm({ ...modalForm, url: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#3643BA] focus:ring-2 focus:ring-[#3643BA]/15 text-stone-900 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-1 font-bold uppercase tracking-wider text-[11px]">
                      Direct WhatsApp Number or Email *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+1 (555) 000-0000 or michael@company.com"
                      value={modalForm.contact}
                      onChange={(e) => setModalForm({ ...modalForm, contact: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#3643BA] focus:ring-2 focus:ring-[#3643BA]/15 text-stone-900 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 mb-1 font-bold uppercase tracking-wider text-[11px]">
                      Current Revenue Trajectory
                    </label>
                    <select
                      value={modalForm.revenue}
                      onChange={(e) => setModalForm({ ...modalForm, revenue: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#3643BA] focus:ring-2 focus:ring-[#3643BA]/15 text-stone-900 text-sm outline-none transition bg-white"
                    >
                      <option value="Under $10k/mo">Under $10k / mo (Early Phase)</option>
                      <option value="$10k – $30k/mo">$10k – $30k / mo (Validating Pipeline)</option>
                      <option value="$30k – $75k/mo">$30k – $75k / mo (Aggressive Scaling)</option>
                      <option value="$75k+/mo">$75k+ / mo (Enterprise Dominance)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={modalSubmitting}
                  className="btn-shimmer w-full py-4 rounded-full bg-[#3643BA] hover:bg-[#2A3598] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4 group"
                >
                  {modalSubmitting ? (
                    <span>Transmitting to Founders...</span>
                  ) : (
                    <>
                      <span>Submit To The 4 Operators</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                  <span>Strict confidentiality. Reviewed directly by our 4 partners.</span>
                </div>
              </form>
            ) : (
              <div className="py-6 space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="text-emerald-800 font-bold flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>Transmission Confirmed: Allocated</span>
                  </div>
                  <div className="text-xs text-emerald-700 leading-relaxed">
                    Target: <span className="font-bold">{modalForm.url}</span> has been assigned for{" "}
                    <span className="font-bold">{modalService}</span>.
                  </div>
                  <div className="text-[11px] text-emerald-600 pt-1 border-t border-emerald-200">
                    SLA: One of our 4 founders will message {modalForm.contact} within 4 hours.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full py-3.5 rounded-full border border-stone-200 hover:border-stone-400 text-stone-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Return to page
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
