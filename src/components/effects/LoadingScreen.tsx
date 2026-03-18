"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState, useMemo } from "react";
import IcosidodecahedronLogo from "@/components/ui/Logo";
import { useAssetLoading } from "@/context/AssetLoadingContext";
import AssetPreloader from "./AssetPreloader";

/**
 * TIMINGS DA ANIMAÇÃO DO LOGO (de Logo.tsx):
 * - delay: 0.3s (passado como prop)
 * - Nós aparecem: 0.5s + stagger (0.02 * 30 nós = 0.6s) = ~1.1s total desde delay
 * - Arestas: delay + 0.4s + 1.2s + stagger = ~2s total desde delay
 * 
 * Total da animação do logo: ~2.5s desde o início
 */

interface LoadingScreenProps {
  /** Callback quando o loading terminar */
  onComplete?: () => void;
}

export default function LoadingScreen({
  onComplete,
}: LoadingScreenProps) {
  const { progress, isEverythingLoaded, totalAssets, loadedAssets } = useAssetLoading();
  const [canExit, setCanExit] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStartedExit, setHasStartedExit] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Delay para a animação do logo (em segundos)
  const logoDelay = 0.3;

  // Tempo que a animação do logo leva para completar (nós + arestas) + tempo para apreciar
  const minLogoAnimationDuration = 2.7;

  // 1. Initial Intro Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setCanExit(true);
        },
      });

      // 1. Container do logo aparece suavemente
      tl.fromTo(
        logoContainerRef.current,
        { scale: 0.8, opacity: 0, filter: "blur(8px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
      );

      // 2. Texto de loading aparece
      tl.fromTo(
        [textRef.current, progressRef.current],
        { opacity: 0, y: 10 },
        { opacity: 0.8, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 },
        "-=0.4"
      );

      // Wait for min duration
      tl.to({}, { duration: minLogoAnimationDuration });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Monitoring readiness & Triggering Exit
  useEffect(() => {
    // We only exit if:
    // 1. The intro/min duration is done (canExit is true)
    // 2. Everything is loaded (isEverythingLoaded is true) OR a timeout has reached
    if (canExit && isEverythingLoaded && !hasStartedExit) {
      setHasStartedExit(true);
      startExitAnimation();
    }
    
    // Fallback: don't stay here forever
    const timer = setTimeout(() => {
       if (!hasStartedExit && canExit) {
           setHasStartedExit(true);
           startExitAnimation();
       }
    }, 8000); 
    
    return () => clearTimeout(timer);
  }, [canExit, isEverythingLoaded, hasStartedExit]);

  const startExitAnimation = () => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          onComplete?.();
        },
      });

      // 1. Pulse de brilho intenso antes de sair
      tl.to(
        logoContainerRef.current,
        {
          filter: "drop-shadow(0 0 50px var(--primary)) drop-shadow(0 0 100px var(--primary))",
          scale: 1.05,
          duration: 0.4,
          ease: "back.in(1.7)",
        }
      );

      // 2. Logo e texto somem para cima
      tl.to(
        [logoContainerRef.current, textRef.current, progressRef.current],
        {
          y: -80,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.5,
          ease: "power2.in",
          stagger: 0.1,
        }
      );

      // 3. Overlay desliza para cima revelando o conteúdo
      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.3"
      );

      // 4. Container some completamente
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });
    }, containerRef);
  };

  // Memoize percentage text for performance
  const progressPercent = useMemo(() => {
      return `${progress}%`;
  }, [progress]);

  // Se completou, não renderiza nada
  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="loading-screen"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100dvw",
        height: "100dvh",
        zIndex: 9999,
        pointerEvents: "auto",
        backgroundColor: "var(--background)",
      }}
    >
      <AssetPreloader />
      
      {/* Overlay escuro */}
      <div
        ref={overlayRef}
        className="loading-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, var(--background) 0%, rgba(0,0,0,0.98) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {/* Container da Logo */}
        <div
          ref={logoContainerRef}
          style={{
            width: "clamp(120px, 25vw, 200px)",
            height: "clamp(120px, 25vw, 200px)",
            filter: "drop-shadow(0 0 20px var(--primary))",
            opacity: 0,
          }}
        >
          <IcosidodecahedronLogo
            className="w-full h-full"
            delay={logoDelay}
            animateEntry={true}
          />
        </div>

        {/* Texto de loading */}
        <div
          ref={textRef}
          className="loading-text"
          style={{
            marginTop: "32px",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--primary)",
            opacity: 0,
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          {totalAssets > 0 ? "Initializing systems..." : "Preparing..."}
        </div>

        {/* Progress Display */}
        <div
          ref={progressRef}
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            opacity: 0
          }}
        >
            <div className="text-[10px] font-mono mb-2 text-white/40 tracking-[0.2em]">
                {progressPercent}
            </div>
            {/* Progress Bar */}
            <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
                <div 
                    className="h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: progressPercent }}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary blur-md" />
                </div>
            </div>
            
            <div className="mt-4 text-[8px] font-mono text-white/20 uppercase tracking-[0.1em]">
                {loadedAssets} of {totalAssets} resources verified
            </div>
        </div>
      </div>

      {/* Animação do texto pulse */}
      <style jsx>{`
        .loading-text {
          animation: textPulse 2s ease-in-out infinite;
        }

        @keyframes textPulse {
          0%, 100% {
            opacity: 0.6;
            filter: blur(0px);
          }
          50% {
            opacity: 0.3;
            filter: blur(1px);
          }
        }
      `}</style>
    </div>
  );
}
