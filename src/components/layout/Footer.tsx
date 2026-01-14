"use client";

import { useBackground } from "@/context/BackgroundContext";
import { gsap } from "gsap";
import {
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "../ui/Logo";
import { useLanguage } from "@/context/LanguageContext";

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

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const { cycleTheme } = useBackground();
  const { t } = useLanguage();

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const promptModalOverlayRef = useRef<HTMLDivElement>(null);
  const promptModalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen && modalOverlayRef.current && modalContentRef.current) {
      gsap.fromTo(
        modalOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (
      isPromptModalOpen &&
      promptModalOverlayRef.current &&
      promptModalContentRef.current
    ) {
      gsap.fromTo(
        promptModalOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        promptModalContentRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isPromptModalOpen]);

  const closeModal = () => {
    if (modalOverlayRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.2,
      });
      gsap.to(modalOverlayRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => setIsModalOpen(false),
      });
    }
  };

  const closePromptModal = () => {
    if (promptModalOverlayRef.current && promptModalContentRef.current) {
      gsap.to(promptModalContentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.2,
      });
      gsap.to(promptModalOverlayRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => setIsPromptModalOpen(false),
      });
    }
  };

  return (
    <footer className="pt-12 pb-20 sm:py-16 md:py-[22px] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-2 md:col-span-2">
            <Link
              href="/"
              aria-label="Go to home"
              className="mb-4 sm:mb-6 block w-32 sm:w-44 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Logo className="w-full h-auto" onIconClick={cycleTheme} />
            </Link>
            <p className="text-sm sm:text-base text-gray-400 max-w-sm mb-4 sm:mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary cursor-pointer transition-colors transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary cursor-pointer transition-colors transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_SOCIAL_DEVTO || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary cursor-pointer transition-colors transform hover:scale-110"
                aria-label="Dev.to"
              >
                <DevToIcon />
              </a>
              <a
                href="#contact"
                className="text-gray-400 hover:text-primary cursor-pointer transition-colors transform hover:scale-110"
                aria-label="Contact"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-black mb-4 sm:mb-6 text-white text-sm sm:text-base">
              {t("footer.explore")}
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-400">
              <li>
                <Link
                  href="#about"
                  className="relative group hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  {t("nav.myStory")}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="#process"
                  className="relative group hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  {t("nav.howIWork")}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="relative group hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  {t("nav.expertise")}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href="#posts"
                  className="relative group hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  {t("nav.posts")}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <a
                  href={`https://www.iubenda.com/privacy-policy/${process.env.NEXT_PUBLIC_IUBENDA_POLICY_ID || ""
                    }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  {t("footer.privacyPolicy")}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-black mb-4 sm:mb-6 text-white text-sm sm:text-base">
              {t("footer.connect")}
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-400">
              <li>
                <Link
                  href="#contact"
                  className="relative group hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  {t("nav.letsTalk")}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "#"}
                  target="_blank"
                  className="relative group hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  GitHub
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "#"}
                  target="_blank"
                  className="relative group hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  LinkedIn
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link
                  href={process.env.NEXT_PUBLIC_SOCIAL_DEVTO || "#"}
                  target="_blank"
                  className="relative group hover:text-primary transition-colors cursor-pointer inline-block"
                >
                  Dev.to
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-white/10 text-xs sm:text-sm text-gray-300 gap-6">
          <p
            className="text-center md:text-left w-full"
            suppressHydrationWarning
          >
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4 w-full">
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">

              <button
                onClick={() => setIsPromptModalOpen(true)}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-secondary/30 hover:border-secondary/50 transition-all hover:scale-105 cursor-pointer group"
              >
                <span className="text-gray-400">100%</span>
                <span className="gradient-animated-text font-black">
                  Prompt Engineered
                </span>
                <Sparkles className="w-3 h-3 text-pink-500 animate-pulse group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPromptModalOpen && (
        <div
          ref={promptModalOverlayRef}
          onClick={closePromptModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
        >
          <div
            ref={promptModalContentRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] bg-[#0D1117] border border-secondary/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div
              className="relative z-10 p-6 sm:p-8 md:p-12 overflow-y-auto flex-1 custom-scrollbar"
              data-lenis-prevent
            >
              <div className="flex items-start justify-between mb-8 space-x-2">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black mb-2 gradient-animated-text">
                    Prompt Engineered
                  </h2>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {t("footer.promptEngineered.subtitle")}
                  </p>
                </div>
                <button
                  onClick={closePromptModal}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-secondary/50 transition-all cursor-pointer group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-secondary transition-colors" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 border border-secondary/20 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="md:flex hidden w-12 h-12 rounded-xl bg-black/30 items-center justify-center border border-secondary/30 flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-white mb-3">
                        {t("footer.promptEngineered.title")}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {t("footer.promptEngineered.p1")}
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {t("footer.promptEngineered.p2")}
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {t("footer.promptEngineered.p3")
                          .split(/<highlight>|<\/highlight>/)
                          .map((part, i) =>
                            i === 1 ? (
                              <span key={i} className="text-secondary font-semibold">
                                {part}
                              </span>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )}
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {t("footer.promptEngineered.p4")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10">
                  <p className="text-sm text-gray-400 text-center">
                    {t("footer.promptEngineered.badge")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
