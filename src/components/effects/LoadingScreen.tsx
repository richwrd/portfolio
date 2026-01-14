"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import IcosidodecahedronLogo from "@/components/ui/Logo";

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
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Delay para a animação do logo (em segundos)
  const logoDelay = 0.3;

  // Tempo que a animação do logo leva para completar (nós + arestas)
  // Nós: 0.5s + stagger 0.02*30 ≈ 1.1s
  // Arestas: começam em delay+0.4s, duram 1.2s + stagger ≈ 2s total
  const logoAnimationDuration = 2.2;

  // Tempo extra para apreciar o logo completo antes de sair
  const holdDuration = 0.5;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          onComplete?.();
        },
      });

      // 1. Container do logo aparece suavemente (permite que a animação interna do logo comece)
      tl.fromTo(
        logoContainerRef.current,
        {
          scale: 0.8,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out",
        }
      );

      // 2. Texto "Loading..." aparece
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 0.6, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );

      // 3. ESPERAR a animação do logo terminar + tempo para apreciar
      // A animação do logo começou com logoDelay, então esperamos:
      tl.to({}, { duration: logoAnimationDuration + holdDuration }, `+=${logoDelay}`);

      // 4. Pulse de brilho intenso antes de sair
      tl.to(
        logoContainerRef.current,
        {
          filter: "drop-shadow(0 0 50px var(--primary)) drop-shadow(0 0 100px var(--primary))",
          scale: 1.05,
          duration: 0.3,
          ease: "power2.in",
        }
      );

      // 5. Logo e texto somem para cima
      tl.to(
        [logoContainerRef.current, textRef.current],
        {
          y: -80,
          opacity: 0,
          filter: "blur(5px)",
          duration: 0.5,
          ease: "power2.in",
          stagger: 0.05,
        }
      );

      // 6. Overlay desliza para cima revelando o conteúdo
      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.inOut",
        },
        "-=0.3"
      );

      // 7. Container some completamente
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.05,
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

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
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
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
            width: "clamp(140px, 30vw, 220px)",
            height: "clamp(140px, 30vw, 220px)",
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
          Loading...
        </div>
      </div>

      {/* Animação do texto */}
      <style jsx>{`
        .loading-text {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
