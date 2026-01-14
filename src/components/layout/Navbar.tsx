"use client";

import { gsap } from "gsap";
import {
  Activity,
  Clock,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useBackground } from "@/context/BackgroundContext";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedName from "../ui/AnimatedName";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

function DevToIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-book-open"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

type StatusType = "online" | "offline" | "holidays";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<StatusType>("offline");
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [time, setTime] = useState("");
  const { cycleTheme } = useBackground();
  const { t, language, setLanguage } = useLanguage();

  const navLinks = [
    { name: t("nav.myStory"), href: "#about" },
    { name: t("nav.howIWork"), href: "#process" },
    { name: t("nav.expertise"), href: "#services" },
    { name: t("nav.posts"), href: "#posts" },
  ];

  const navRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const navActionsRef = useRef<HTMLDivElement>(null);
  const hamburgerLine1Ref = useRef<HTMLSpanElement>(null);
  const hamburgerLine2Ref = useRef<HTMLSpanElement>(null);
  const hamburgerLine3Ref = useRef<HTMLSpanElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuContentRef = useRef<HTMLDivElement>(null);
  const mobileMenuLinksRef = useRef<(HTMLDivElement | null)[]>([]);
  const statusModalRef = useRef<HTMLDivElement>(null);
  const statusModalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    // Navbar background aparece primeiro
    gsap.to(navRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    });

    // Links aparecem depois do logo/nome (delay de 2s para esperar animação)
    if (navLinksRef.current) {
      gsap.set(navLinksRef.current.children, { opacity: 0, y: -15 });
      gsap.to(navLinksRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        delay: 2.0,
        ease: "power2.out",
      });
    }

    // Ações (status, botão, language) aparecem por último
    if (navActionsRef.current) {
      gsap.set(navActionsRef.current.children, { opacity: 0, x: 15 });
      gsap.to(navActionsRef.current.children, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 2.5,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    if (
      !hamburgerLine1Ref.current ||
      !hamburgerLine2Ref.current ||
      !hamburgerLine3Ref.current
    )
      return;

    if (mobileMenuOpen) {
      gsap.to(hamburgerLine1Ref.current, { rotate: 45, y: 6, duration: 0.3 });
      gsap.to(hamburgerLine2Ref.current, { opacity: 0, duration: 0.3 });
      gsap.to(hamburgerLine3Ref.current, {
        rotate: -45,
        y: -10,
        duration: 0.3,
      });
    } else {
      gsap.to(hamburgerLine1Ref.current, { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(hamburgerLine2Ref.current, { opacity: 1, duration: 0.3 });
      gsap.to(hamburgerLine3Ref.current, { rotate: 0, y: 0, duration: 0.3 });
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileMenuContentRef.current) return;

    const links = mobileMenuLinksRef.current.filter(Boolean);

    if (mobileMenuOpen) {
      gsap.set(mobileMenuRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        opacity: 0,
      });
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.set(links, {
        y: 20,
        opacity: 0,
      });
      gsap.to(links, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
      });
    } else {
      gsap.to(links, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.5,
        delay: 0.2,
        ease: "power2.in",
      });
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!statusModalRef.current || !statusModalContentRef.current) return;

    if (showStatusModal && !isClosingModal) {
      gsap.set(statusModalRef.current, { opacity: 0 });
      gsap.set(statusModalContentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
      });

      gsap.to(statusModalRef.current, {
        opacity: 1,
        duration: 0.3,
      });

      gsap.to(statusModalContentRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [showStatusModal, isClosingModal]);

  useEffect(() => {
    if (
      !statusModalRef.current ||
      !statusModalContentRef.current ||
      !isClosingModal
    )
      return;

    gsap.to(statusModalContentRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(statusModalRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  }, [isClosingModal]);

  const handleCloseModal = () => {
    if (isClosingModal) return;
    setIsClosingModal(true);
    setTimeout(() => {
      setShowStatusModal(false);
      setIsClosingModal(false);
    }, 300);
  };

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/status");
        const data = await res.json();
        if (data.status) {
          setStatus(data.status);
        }
      } catch (e) {
        console.error("Failed to fetch status", e);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case "online":
        return {
          label: t("status.online.label"),
          headline: t("status.online.headline"),
          message: t("status.online.message"),
          color: "bg-emerald-500",
          textColor: "text-emerald-400",
          borderColor: "border-emerald-500/30",
          bgColor: "bg-emerald-500/10",
          glow: "shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]",
          responseTime: t("status.online.responseTime"),
        };
      case "holidays":
        return {
          label: t("status.holidays.label"),
          headline: t("status.holidays.headline"),
          message: t("status.holidays.message"),
          color: "bg-amber-500",
          textColor: "text-amber-400",
          borderColor: "border-amber-500/30",
          bgColor: "bg-amber-500/10",
          glow: "shadow-[0_0_30px_-10px_rgba(245,158,11,0.3)]",
          responseTime: t("status.holidays.responseTime"),
        };
      case "offline":
      default:
        return {
          label: t("status.offline.label"),
          headline: t("status.offline.headline"),
          message: t("status.offline.message"),
          color: "bg-zinc-500",
          textColor: "text-zinc-400",
          borderColor: "border-zinc-500/30",
          bgColor: "bg-zinc-500/10",
          glow: "shadow-[0_0_30px_-10px_rgba(113,113,122,0.2)]",
          responseTime: t("status.offline.responseTime"),
        };
    }
  };

  const config = getStatusConfig();

  return (
    <>
      <nav
        style={{
          transform: `translateY(-150px)`,
        }}
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${isScrolled
          ? "bg-black/30 backdrop-blur-md h-20 sm:h-16 shadow-lg"
          : "bg-black/0 backdrop-blur-sm h-20 sm:h-24"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link
            href="/"
            className="h-full flex items-center gap-3 sm:gap-4 transition-all relative z-50 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Home"
          >
            <div
              className={`aspect-square relative flex-shrink-0 transition-all duration-500 ease-in-out ${isScrolled ? "h-[70%] sm:h-[80%]" : "h-[70%] sm:h-[65%]"
                }`}
            >
              <Logo
                className="w-full h-full"
                delay={1.2}
                animateEntry={true}
                onIconClick={cycleTheme}
              />
            </div>

            <AnimatedName
              name={t("common.name")}
              subtitle={t("common.jobTitle")}
              delay={1.5}
            />
          </Link>

          {/* Desktop Menu - Minimal & Modern */}
          <div ref={navLinksRef} className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group cursor-pointer ${isScrolled
                  ? "text-gray-300 hover:text-white"
                  : "text-white/90 hover:text-white"
                  }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <div className="w-px h-6 bg-white/10 mx-2" />
            <div ref={navActionsRef} className="hidden md:flex items-center gap-6 lg:gap-4">
              {/* Status Badge */}
              {!loading && (
                <button
                  onClick={() => setShowStatusModal(true)}
                  className="hidden md:flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group text-xs"
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`}
                    ></span>
                  </span>
                  <span className="font-bold text-white leading-none tracking-wide">
                    {config.headline}
                  </span>
                </button>
              )}

              <Button href="#contact" variant="gradient" size="sm">
                {t("nav.letsTalk")}
              </Button>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === "en" ? "pt" : "en")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-xs font-bold text-white"
              >
                {language === "en" ? "PT" : "EN"}
              </button>
            </div>
          </div>

          {/* Mobile Status Badge and Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Status Badge - Mobile */}
            {!loading && (
              <button
                onClick={() => setShowStatusModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group text-xs"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`}
                  ></span>
                </span>
                <span className="font-bold text-white leading-none tracking-wide">
                  {config.headline}
                </span>
              </button>
            )}

            <button
              className="text-white relative z-50 p-2 cursor-pointer focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <span
                  ref={hamburgerLine1Ref}
                  className="w-full h-0.5 bg-white block origin-center"
                />
                <span
                  ref={hamburgerLine2Ref}
                  className="w-full h-0.5 bg-white block"
                />
                <span
                  ref={hamburgerLine3Ref}
                  className="w-full h-0.5 bg-white block origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[#0D1117]/95 backdrop-blur-xl flex items-center justify-center"
        style={{ display: mobileMenuOpen ? "flex" : "none" }}
      >
        <div
          ref={mobileMenuContentRef}
          className="flex flex-col items-center gap-8 text-center"
        >
          {navLinks.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => {
                mobileMenuLinksRef.current[i] = el;
              }}
            >
              <Link
                href={item.href}
                className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 hover:to-primary transition-all cursor-pointer tracking-tight"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </div>
          ))}

          <div
            ref={(el) => {
              mobileMenuLinksRef.current[navLinks.length] = el;
            }}
            className="flex gap-8 mt-8"
          >
            <a
              href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "#"}
              target="_blank"
              className="text-gray-400 hover:text-white cursor-pointer transition-colors transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "#"}
              target="_blank"
              className="text-gray-400 hover:text-white cursor-pointer transition-colors transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={process.env.NEXT_PUBLIC_SOCIAL_DEVTO || "#"}
              target="_blank"
              className="text-gray-400 hover:text-white cursor-pointer transition-colors transform hover:scale-110"
            >
              <DevToIcon />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors transform hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Status Modal */}
      {(showStatusModal || isClosingModal) && (
        <div
          ref={statusModalRef}
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
        >
          <div
            ref={statusModalContentRef}
            onClick={(e) => e.stopPropagation()}
            className={`bg-[#0D1117] border ${config.borderColor} rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl overflow-hidden`}
          >
            {/* Background Decoration */}
            <div
              className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${config.color.replace(
                "bg-",
                ""
              )} to-transparent opacity-50`}
            />
            <div
              className={`absolute -top-20 -right-20 w-64 h-64 ${config.color} opacity-[0.03] blur-[80px] rounded-full pointer-events-none`}
            />

            <div className="absolute top-0 right-0 p-5 z-50">
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-white transition-colors cursor-pointer p-1 hover:bg-white/5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 mb-8 relative z-10">
              <div className="inline-flex items-center gap-3">
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-xl ${config.bgColor} border border-white/5`}
                >
                  <Activity className={`w-6 h-6 ${config.textColor}`} />
                  {status === "online" && (
                    <span
                      className={`absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 ${config.color} rounded-full border-2 border-[#0D1117]`}
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white tracking-tight">
                      {config.headline}
                    </h3>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded border ${config.borderColor} ${config.textColor} bg-opacity-10 font-mono uppercase tracking-wider`}
                    >
                      {t("status.live")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-medium">
                    {t("status.statusMonitor")}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm border-l-2 border-white/10 pl-4">
                {config.message}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    {t("status.locationLabel")}
                  </span>
                </div>
                <div className="text-sm text-white font-medium">{t("common.location")}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    {t("status.localTime")}
                  </span>
                </div>
                <div
                  className="text-sm text-white font-medium"
                  suppressHydrationWarning
                >
                  {time || "--:--"}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    {t("status.response")}
                  </span>
                </div>
                <div className={`text-sm font-medium ${config.textColor}`}>
                  {config.responseTime}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">
                    {t("status.connection")}
                  </span>
                </div>
                <div className="text-sm text-white font-medium">{t("status.stable")}</div>
              </div>
            </div>

            {/* System Architecture Info */}
            <div className="mb-6 relative z-10 bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-xs uppercase tracking-wider font-semibold text-gray-300">
                  {t("status.howItWorks")}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {t("status.howItWorksDescription")}
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-gray-500 relative z-10">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary/60" />
                <span>{t("status.verifiedPresence")}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>{t("status.liveSync")}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
