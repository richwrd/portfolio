"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap } from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import TechStack3D from "../effects/TechStack3D";
import GlassSurface from "../effects/GlassSurface";
import { useLanguage } from "@/context/LanguageContext";
import LaserFlow from "../effects/LaserFlow";

gsap.registerPlugin(ScrollTrigger);

// Mapeia ícones com base na chave da experiência
function getExperienceIcon(key: string) {
  if (key === "education" || key === "academic") return GraduationCap;
  return Briefcase;
}

interface ExperienceCardProps {
  expKey: string;
  index: number;
  spotlightIntensity?: number;
  glowIntensity?: number;
}

function ExperienceCard({
  expKey,
  index,
  spotlightIntensity = 0,
  glowIntensity = 0,
}: ExperienceCardProps) {
  const { t } = useLanguage();
  const Icon = getExperienceIcon(expKey);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const lastUpdate = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, x: 50, rotateY: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=50px",
          toggleActions: "play none none none",
        },
      });

      tl.to(cardRef.current, {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: isMobile ? 0.4 : 0.7,
        delay: isMobile ? index * 0.05 : index * 0.15,
        ease: isMobile ? "power2.out" : "back.out(1.2)",
      });

      if (dotRef.current) {
        // gsap.set(dotRef.current, { scale: 0 });

        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "top bottom-=50px",
          onEnter: () => {
            const dotTl = gsap.timeline({ delay: index * 0.15 + 0.2 });
            dotTl
              .to(
                dotRef.current,
                { borderColor: "var(--primary)", duration: 0, delay: -0.5 },
                0
              );
          },
        });
      }

      if (!isMobile && cardRef.current) {
        cardRef.current.addEventListener("mouseenter", () => {
          gsap.to(cardRef.current, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });

          if (spotlightRef.current) {
            gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
          }
          if (glowRef.current) {
            gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
          }
        });

        cardRef.current.addEventListener("mouseleave", () => {
          gsap.to(cardRef.current, {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 0.3,
            ease: "power2.out",
          });

          if (spotlightRef.current) {
            gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
          }
          if (glowRef.current) {
            gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
          }
        });
      }

      if (iconRef.current) {
        iconRef.current.addEventListener("mouseenter", () => {
          gsap.to(iconRef.current, {
            rotate: 360,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index, isMobile]);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    if (isMobile || !cardRef.current) return;

    const now = performance.now();
    if (now - lastUpdate.current < 32) return;
    lastUpdate.current = now;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;

      const rect = currentTarget.getBoundingClientRect();
      const { left, top, width, height } = rect;
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      mousePos.current = { x, y };

      const rotateX = (y - 0.5) * -16;
      const rotateY = (x - 0.5) * 16;

      gsap.to(cardRef.current, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      if (spotlightRef.current) {
        gsap.set(spotlightRef.current, {
          background: `radial-gradient(650px circle at ${x * 100}% ${y * 100
            }%, rgba(var(--primary-rgb), ${spotlightIntensity}), transparent 80%)`,
        });
      }

      if (glowRef.current) {
        gsap.set(glowRef.current, {
          background: `radial-gradient(400px circle at ${x * 100}% ${y * 100
            }%, rgba(var(--primary-rgb), ${glowIntensity}), transparent 70%)`,
        });
      }

      rafId.current = null;
    });
  }

  function handleMouseLeave() {
    if (isMobile) return;

    mousePos.current = { x: 0.5, y: 0.5 };
  }

  return (
    <div className="relative flex gap-6 sm:gap-10 group">
      <div className="hidden sm:flex flex-col items-center relative">
        <div
          ref={dotRef}
          className="w-4 h-4 rounded-full border-2 border-white/20 bg-[#0D1117] group-hover:border-primary transition-all duration-500 z-10 relative"
        >
          <div className="absolute inset-0 rounded-full bg-primary/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: isMobile ? "flat" : "preserve-3d",
          perspective: isMobile ? "none" : "1000px",
        }}
        className="flex-1 relative rounded-2xl group/card transition-shadow duration-300 transform-none md:transform"
      >
        <GlassSurface width="100%" height="auto" borderRadius={16}>
          {!isMobile && (
            <div
              ref={spotlightRef}
              className="pointer-events-none absolute -inset-px opacity-0 rounded-2xl z-0"
            />
          )}

          {!isMobile && (
            <div
              ref={glowRef}
              className="pointer-events-none absolute -inset-1 opacity-0 rounded-2xl z-0"
              style={{ transform: "translateZ(-10px)" }}
            />
          )}

          <div
            className="relative p-4 z-10 w-full"
            style={{ transform: isMobile ? "none" : "translateZ(20px)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-mono text-primary/80 px-2 py-1 rounded border border-primary/20 bg-primary/5"
                style={{ transform: isMobile ? "none" : "translateZ(10px)" }}
              >
                {t(`about.experiences.${expKey}.year`)}
              </span>
              <div
                ref={iconRef}
                style={{ transform: isMobile ? "none" : "translateZ(10px)" }}
              >
                <Icon className="w-5 h-5 text-gray-500 group-hover/card:text-primary transition-colors" />
              </div>
            </div>
            <h3
              className="text-xl font-black text-white mb-1 group-hover/card:text-primary transition-colors"
              style={{ transform: isMobile ? "none" : "translateZ(15px)" }}
            >
              {t(`about.experiences.${expKey}.title`)}
            </h3>
            <div
              className="text-sm text-gray-400 mb-3 font-medium"
              style={{ transform: isMobile ? "none" : "translateZ(12px)" }}
            >
              {t(`about.experiences.${expKey}.company`)}
            </div>
            <p
              className="text-sm text-gray-500 leading-relaxed group-hover/card:text-gray-400 transition-colors"
              style={{ transform: isMobile ? "none" : "translateZ(8px)" }}
            >
              {t(`about.experiences.${expKey}.description`)}
            </p>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}

export default function About() {
  const { t, tKeys } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineFillRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLSpanElement>(null);
  const glow2Ref = useRef<HTMLSpanElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (!isMobile && storyRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            if (storyRef.current) {
              gsap.set(storyRef.current, {
                rotateX: 15 - progress * 30,
                rotateY: -10 + progress * 20,
                scale:
                  0.95 +
                  (progress < 0.5 ? progress * 0.14 : (1 - progress) * 0.14),
                transformPerspective: 1000,
              });
            }
          },
        });
      }

      if (h2Ref.current) {
        gsap.fromTo(
          h2Ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: h2Ref.current,
              start: "top bottom-=100px",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top bottom-=100px",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top bottom-=100px",
              toggleActions: "play none none none",
            },
          }
        );

        const statElements = statsRef.current.querySelectorAll("[data-stat]");
        statElements.forEach((el) => {
          el.addEventListener("mouseenter", () => {
            gsap.to(el, {
              scale: 1.05,
              y: -5,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          });

          el.addEventListener("mouseleave", () => {
            gsap.to(el, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      if (timelineFillRef.current && containerRef.current) {
        gsap.set(timelineFillRef.current, { height: "0%" });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top+=10% bottom",
          end: "bottom-=20% bottom",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (timelineFillRef.current) {
              gsap.set(timelineFillRef.current, {
                height: `${progress * 100}%`,
              });
            }
          },
        });
      }

      if (orb1Ref.current) {
        gsap.fromTo(
          orb1Ref.current,
          { x: 0, y: 0, scale: 1, opacity: 0.2 },
          {
            keyframes: [
              { x: 100, y: -50, scale: 1.2, opacity: 0.4, duration: 4 },
              { x: 0, y: 0, scale: 1, opacity: 0.2, duration: 4 },
            ],
            repeat: -1,
            ease: "sine.inOut",
          }
        );
      }

      if (orb2Ref.current) {
        gsap.fromTo(
          orb2Ref.current,
          { x: 0, y: 0, scale: 0.4, opacity: 0.2 },
          {
            keyframes: [
              { x: -80, y: 60, scale: 1, opacity: 0.4, duration: 5 },
              { x: 0, y: 0, scale: 0.4, opacity: 0.2, duration: 5 },
            ],
            delay: 1,
            repeat: -1,
            ease: "sine.inOut",
          }
        );
      }

      if (glow1Ref.current) {
        gsap.fromTo(
          glow1Ref.current,
          { opacity: 0.4 },
          {
            opacity: 0.7,
            duration: 1.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }
        );
      }

      if (glow2Ref.current) {
        gsap.fromTo(
          glow2Ref.current,
          { opacity: 0.4 },
          {
            opacity: 0.7,
            duration: 1.5,
            delay: 0.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] hidden md:block" />

      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-primary/30 rounded-full blur-[120px] hidden md:block"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-secondary/30 rounded-full blur-[100px] hidden md:block"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="relative">
            <div
              ref={storyRef}
              className="relative z-10 transform-none md:transform"
              style={{
                transformStyle: isMobile ? "flat" : "preserve-3d",
                perspective: isMobile ? "none" : "1000px",
              }}
            >
              <h2
                ref={h2Ref}
                className="text-4xl sm:text-5xl font-black mb-8 tracking-tight leading-tight"
              >
                {t("about.headline.part1")}{" "}
                <span className="relative inline-block">
                  <span className="gradient-animated-text">{t("about.headline.highlight1")}</span>
                  <span
                    ref={glow1Ref}
                    className="absolute inset-0 gradient-animated-text blur-xl opacity-60"
                  >
                    {t("about.headline.highlight1")}
                  </span>
                </span>{" "}
                {t("about.headline.part2")}{" "}
                <span className="relative inline-block">
                  <span className="gradient-animated-text">{t("about.headline.highlight2")}</span>
                  <span
                    ref={glow2Ref}
                    className="absolute inset-0 gradient-animated-text blur-xl opacity-60"
                  >
                    {t("about.headline.highlight2")}
                  </span>
                </span>
              </h2>

              <div
                ref={textRef}
                className="space-y-6 text-lg text-gray-400 leading-relaxed"
              >
                <p>{t("about.story.paragraph1")}</p>
                <p>{t("about.story.paragraph2")}</p>
                <p>{t("about.story.paragraph3")}</p>
              </div>
            </div>

            <div ref={statsRef} className="mt-8 flex gap-8">
              <TechStack3D />
            </div>
          </div>

          <div className="relative">

            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/5 hidden sm:block" />

            <div
              ref={timelineFillRef}
              className="absolute left-8 top-0 w-px bg-linear-to-b from-primary via-primary-dark to-primary hidden sm:block origin-top"
            />

            <div className="space-y-4 sm:space-y-12">
              {tKeys("about.experiences").map((key, index) => (
                <ExperienceCard key={key} expKey={key} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="absolute inset-0 hidden sm:block pointer-events-none overflow-hidden"
      >
        <LaserFlow
          horizontalBeamOffset={0.0}
          verticalBeamOffset={0.0}
          color="var(--primary)"
          horizontalSizing={0.5}
          verticalSizing={5}
          wispDensity={1}
          wispSpeed={15}
          wispIntensity={5}
          flowSpeed={0.35}
          flowStrength={0.25}
          fogIntensity={0.1}
          fogScale={0.3}
          fogFallSpeed={0.6}
          decay={1.1}
          falloffStart={1.2}
        />
      </div> */}
    </section>

  );
}
