"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

interface AnimatedNameProps {
  name: string;
  subtitle?: string;
  delay?: number;
  className?: string;
}

export default function AnimatedName({
  name,
  subtitle,
  delay = 0,
  className = "",
}: AnimatedNameProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Animação de entrada minimalista
  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const validLetters = letterRefs.current.filter(Boolean);

      // Configuração inicial
      gsap.set(validLetters, {
        opacity: 0,
        y: 8,
      });

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, {
          opacity: 0,
          y: 5,
        });
      }

      // Letras aparecem com fade suave
      gsap.to(validLetters, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.025,
        delay: delay,
        ease: "power2.out",
      });

      // Subtítulo aparece
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: delay + 0.3,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted, delay]);

  // Dividir o nome em caracteres preservando espaços
  const characters = name.split("");

  return (
    <div
      ref={containerRef}
      className={`flex flex-col justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      suppressHydrationWarning
    >
      {/* Nome com letras animadas */}
      <div className="relative flex flex-wrap items-baseline">
        {characters.map((char, index) => (
          <span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            className={`
              inline-block font-bold leading-none tracking-tight
              text-lg sm:text-xl
              transition-all duration-300
              ${char === " " ? "w-[0.25em]" : ""}
            `}
            style={{
              color: isHovered ? "transparent" : "white",
              backgroundImage: isHovered
                ? "linear-gradient(90deg, var(--primary) 0%, var(--secondary-light) 100%)"
                : "none",
              backgroundClip: isHovered ? "text" : "unset",
              WebkitBackgroundClip: isHovered ? "text" : "unset",
              willChange: "color",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      {/* Subtítulo */}
      {subtitle && (
        <span
          ref={subtitleRef}
          className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-[0.2em] uppercase mt-1 transition-colors duration-300"
          style={{
            opacity: 0,
            color: isHovered ? "var(--gray-300, #d1d5db)" : undefined,
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
}
