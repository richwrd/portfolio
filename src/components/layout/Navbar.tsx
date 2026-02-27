"use client";

import { gsap } from "gsap";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBackground } from "@/context/BackgroundContext";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedName from "../ui/AnimatedName";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import GradualBlur from "../effects/GradualBlur";
import GlassSurface from "../effects/GlassSurface";
import { StatusModal } from "../popups";

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
  const [time, setTime] = useState("");
  const { cycleTheme } = useBackground();
  const { t, language, setLanguage } = useLanguage();

  const navLinks = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.projects"), href: "#projects" },
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
  const statusButtonRef = useRef<HTMLButtonElement>(null);

  // Memoized close handler for StatusModal
  const handleCloseStatusModal = useCallback(() => {
    setShowStatusModal(false);
  }, []);

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
          ? "h-16 sm:h-16"
          : "h-20 sm:h-24"
          }`}
      >
        <GradualBlur
          position="top"
          strength={1.5}
          divCount={8}
          height="100%"
          zIndex={-1}
          exponential={true}
          curve="ease-out"
        />
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
                <GlassSurface
                  width="auto"
                  height="auto"
                  className="hidden md:flex hover:scale-105 transition-transform duration-200"
                >
                  <button
                    ref={statusButtonRef}
                    onClick={() => setShowStatusModal(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 cursor-pointer group text-[10px]"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
                      ></span>
                      <span
                        className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.color}`}
                      ></span>
                    </span>
                    <span className="font-bold text-white leading-none tracking-wide">
                      {config.headline}
                    </span>
                  </button>
                </GlassSurface>
              )}

              {/* Let's Talk Button - Dual Layer Design */}

              <div className="hidden md:flex items-center gap-6 lg:gap-4">

                <GlassSurface
                  width="auto"
                  height="auto"
                  className="relative group hover:scale-105 transition-transform duration-200"
                >
                  <div className="absolute inset-0 rounded-full gradient-animated opacity-25 group-hover:opacity-50 transition-opacity duration-300 blur-[1px] pointer-events-none" />
                  <Button
                    href="#contact"
                    variant="ghost"
                    size="sm"
                    className="!rounded-full !px-3 !py-1.5 !text-[10px] text-white font-black tracking-wide hover:bg-transparent relative z-10"
                  >
                    {t("nav.letsTalk")}
                  </Button>
                </GlassSurface>

              </div>


              {/* Language Toggle */}
              <GlassSurface
                width="auto"
                height="auto"
                className="hover:scale-105 transition-transform duration-200"
              >
                <button
                  onClick={() => setLanguage(language === "en" ? "pt" : "en")}
                  className="flex items-center gap-1 px-2.5 py-1.5 cursor-pointer text-[10px] font-bold text-white"
                >
                  {language === "en" ? "PT" : "EN"}
                </button>
              </GlassSurface>
            </div>
          </div>

          {/* Mobile Status Badge and Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Status Badge - Mobile */}
            {!loading && (
              <GlassSurface
                width="auto"
                height="auto"
                borderRadius={9999}
                blur={8}
                brightness={40}
                opacity={0.9}
                backgroundOpacity={0.05}
                saturation={1.2}
                className="hover:scale-105 transition-transform duration-200"
              >
                <button
                  onClick={() => setShowStatusModal(true)}
                  className="flex items-center gap-1 px-2.5 py-1.5 cursor-pointer group text-[10px]"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.color}`}
                    ></span>
                  </span>
                  <span className="font-bold text-white leading-none tracking-wide">
                    {config.headline}
                  </span>
                </button>
              </GlassSurface>
            )}

            <GlassSurface
              width={48}
              height={48}
              distortionScale={-200}
              brightness={20}
              className="hover:scale-105 transition-transform duration-300 relative z-50"
            >
              <button
                className="text-white w-full h-full flex justify-center items-center cursor-pointer focus:outline-none"
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
            </GlassSurface>
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
      <StatusModal
        isOpen={showStatusModal}
        onClose={handleCloseStatusModal}
        status={status}
        config={config}
        time={time}
        triggerRef={statusButtonRef as any}
      />
    </>
  );
}
