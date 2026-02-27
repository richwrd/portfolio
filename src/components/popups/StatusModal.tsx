"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Activity,
  Clock,
  Globe,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import GlassSurface from "../effects/GlassSurface";

type StatusType = "online" | "offline" | "holidays";

interface StatusConfig {
  label: string;
  headline: string;
  message: string;
  color: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
  glow: string;
  responseTime: string;
}

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: StatusType;
  config: StatusConfig;
  time: string;
  triggerRef?: React.RefObject<HTMLElement>;
}

// Memoized stat card component for better performance
const StatCard = memo(function StatCard({
  icon: Icon,
  label,
  value,
  valueClassName = "text-white",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-xs uppercase tracking-wider font-semibold">
          {label}
        </span>
      </div>
      <div className={`text-sm font-medium ${valueClassName}`}>{value}</div>
    </div>
  );
});

function StatusModal({ isOpen, onClose, status, config, time, triggerRef }: StatusModalProps) {
  const { t } = useLanguage();
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  // Memoized close handler with animation
  const handleClose = useCallback(() => {
    if (isClosingRef.current || !modalRef.current || !contentRef.current) return;

    isClosingRef.current = true;

    // Get trigger position for exit animation
    const triggerParams: gsap.TweenVars = {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      ease: "power2.in",
    };

    if (triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const x = rect.left + rect.width / 2 - windowWidth / 2;
      const y = rect.top + rect.height / 2 - windowHeight / 2;

      triggerParams.x = x;
      triggerParams.y = y;
      triggerParams.scale = 0;
    } else {
      triggerParams.y = 20;
      triggerParams.scale = 0.95;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isClosingRef.current = false;
        onClose();
        // Reset transform to avoid issues when reopening
        if (contentRef.current) gsap.set(contentRef.current, { clearProps: "all" });
      },
    });

    tl.to(contentRef.current, triggerParams)
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.2");
  }, [onClose, triggerRef]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  // Opening animation
  useEffect(() => {
    if (!isOpen || !modalRef.current || !contentRef.current) return;

    isClosingRef.current = false;

    // Default starting state
    let startParams: gsap.TweenVars = {
      opacity: 0,
      scale: 0.95,
      y: 20,
      x: 0 // Ensure x is initialized
    };

    // If trigger exists, calculation start position relative to center
    if (triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // Calculate the center of the viewport
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate translation to position the modal center over the button center
      // Since the modal is fixed centered (flex items-center justify-center), 
      // its natural position is at window center (0,0 translation).
      // We want to translate IT to the button.
      const x = rect.left + rect.width / 2 - windowWidth / 2;
      const y = rect.top + rect.height / 2 - windowHeight / 2;

      startParams = {
        opacity: 0,
        scale: 0,
        x: x,
        y: y,
      };
    }

    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(contentRef.current, startParams);

    const tl = gsap.timeline();

    tl.to(backdropRef.current, {
      opacity: 1,
      duration: 0.3,
    })
      .to(
        contentRef.current,
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.1"
      );

    return () => {
      tl.kill();
    };
  }, [isOpen, triggerRef]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={backdropRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/10 backdrop-blur-md z-[99998] opacity-0 transition-opacity"
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="status-modal-title"
      >
        <div
          ref={contentRef}
          onClick={(e) => e.stopPropagation()}
          className="max-w-md w-full relative shadow-2xl opacity-0 pointer-events-auto"
        >
          <GlassSurface
            width="100%"
            height="100%"
            borderRadius={40}
            backgroundOpacity={0.5}
          >
            <div className=" p-6 sm:p-8 w-full h-full relative">

              {/* Close Button */}
              <div className="absolute top-0 right-0 p-5 z-50">
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-white transition-colors cursor-pointer p-1 hover:bg-white/5 rounded-lg"
                  aria-label={t("common.close") || "Close"}
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
                      <h3
                        id="status-modal-title"
                        className="text-xl font-black text-white tracking-tight"
                      >
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

              {/* Stats Grid - Using memoized components */}
              <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
                <StatCard
                  icon={MapPin}
                  label={t("status.locationLabel")}
                  value={t("common.location")}
                />
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
                <StatCard
                  icon={MessageSquare}
                  label={t("status.response")}
                  value={config.responseTime}
                  valueClassName={config.textColor}
                />
                <StatCard
                  icon={Wifi}
                  label={t("status.connection")}
                  value={t("status.stable")}
                />
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
          </GlassSurface>
        </div>
      </div>
    </>
  );
}

// Export memoized component for better performance
export default memo(StatusModal);
