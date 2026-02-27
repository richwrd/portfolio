"use client";

import { useBackground } from "@/context/BackgroundContext";
import { gsap } from "gsap";
import { useEffect, useRef, useState, useCallback } from "react";

// ============================================
// ICOSIDODECAEDRO GEOMETRY
// 30 vértices, 60 arestas
// ============================================

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  from: number;
  to: number;
}

interface EdgeGlow {
  edgeIndex: number;
  progress: number;
  duration: number;
  active: boolean;
}

function getIcosidodecahedronData(): { nodes: Point3D[]; edges: Edge[] } {
  const phi = (1 + Math.sqrt(5)) / 2;

  const icosaVertices: Point3D[] = [
    { x: 0, y: 1, z: phi }, { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: -phi }, { x: 0, y: -1, z: -phi },
    { x: 1, y: phi, z: 0 }, { x: -1, y: phi, z: 0 }, { x: 1, y: -phi, z: 0 }, { x: -1, y: -phi, z: 0 },
    { x: phi, y: 0, z: 1 }, { x: -phi, y: 0, z: 1 }, { x: phi, y: 0, z: -1 }, { x: -phi, y: 0, z: -1 },
  ];

  const midPoints: Point3D[] = [];
  const pointSet = new Set<string>();

  for (let i = 0; i < icosaVertices.length; i++) {
    for (let j = i + 1; j < icosaVertices.length; j++) {
      const p1 = icosaVertices[i];
      const p2 = icosaVertices[j];
      const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2);

      if (Math.abs(dist - 2) < 0.1) {
        const mid: Point3D = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
          z: (p1.z + p2.z) / 2,
        };

        const len = Math.sqrt(mid.x * mid.x + mid.y * mid.y + mid.z * mid.z);
        const normalized = { x: mid.x / len, y: mid.y / len, z: mid.z / len };

        const key = `${normalized.x.toFixed(4)},${normalized.y.toFixed(4)},${normalized.z.toFixed(4)}`;
        if (!pointSet.has(key)) {
          pointSet.add(key);
          midPoints.push(normalized);
        }
      }
    }
  }

  const edges: Edge[] = [];
  let minDistance = Infinity;

  for (let i = 0; i < midPoints.length; i++) {
    for (let j = i + 1; j < midPoints.length; j++) {
      const d = Math.sqrt(
        (midPoints[i].x - midPoints[j].x) ** 2 +
        (midPoints[i].y - midPoints[j].y) ** 2 +
        (midPoints[i].z - midPoints[j].z) ** 2
      );
      if (d < minDistance) minDistance = d;
    }
  }

  for (let i = 0; i < midPoints.length; i++) {
    for (let j = i + 1; j < midPoints.length; j++) {
      const d = Math.sqrt(
        (midPoints[i].x - midPoints[j].x) ** 2 +
        (midPoints[i].y - midPoints[j].y) ** 2 +
        (midPoints[i].z - midPoints[j].z) ** 2
      );
      if (Math.abs(d - minDistance) < 0.05) {
        edges.push({ from: i, to: j });
      }
    }
  }

  return { nodes: midPoints, edges };
}

function project3D(
  node: Point3D,
  rotationY: number,
  rotationX: number,
  radius: number,
  centerX: number,
  centerY: number
): { x: number; y: number; depth: number } {
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const x = node.x * cosY - node.z * sinY;
  const z = node.x * sinY + node.z * cosY;
  const y = node.y;

  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const y2 = y * cosX - z * sinX;
  const z2 = y * sinX + z * cosX;

  const perspective = 4;
  const factor = perspective / (perspective + z2);

  return {
    x: centerX + x * radius * factor,
    y: centerY + y2 * radius * factor,
    depth: z2,
  };
}

const GEOMETRY = getIcosidodecahedronData();
const FPS = 30;
const FRAME_INTERVAL = 1000 / FPS;
const INITIAL_ROTATION = { y: 0, x: 0.5 };

export default function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const coreGlowRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const orbitingDotRef = useRef<HTMLDivElement>(null);
  const orbitingContainerRef = useRef<HTMLDivElement>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);
  const nodesRef = useRef<(SVGCircleElement | null)[]>([]);
  const glowDotsRef = useRef<(SVGCircleElement | null)[]>([]);

  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hasAnimatedEntry, setHasAnimatedEntry] = useState(false);

  const [edgeGlows, setEdgeGlows] = useState<EdgeGlow[]>([]);
  const glowAnimationsRef = useRef<gsap.core.Tween[]>([]);

  const { cycleTheme, currentTheme } = useBackground();
  const mousePos = useRef({ x: 0, y: 0 });


  // Mount check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize edge glows
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      // Initialize edge glows - particles traveling along edges
      const glowCount = 6;
      const newGlows = Array.from({ length: glowCount }).map((_, i) => ({
        edgeIndex: Math.floor(Math.random() * GEOMETRY.edges.length),
        progress: Math.random(), // Start at random progress
        duration: Math.random() * 1.5 + 1,
        active: true,
      }));
      setEdgeGlows(newGlows);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Icosidodecahedron rotation animation
  useEffect(() => {
    if (!isMounted) return;

    let frameId: number;
    let lastTime = 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;

      if (delta >= FRAME_INTERVAL) {
        lastTime = time - (delta % FRAME_INTERVAL);
        const elapsed = (time - startTime) / 1000;

        setRotation({
          y: elapsed * 0.15,
          x: 0.5 + Math.sin(elapsed * 0.12) * 0.25,
        });
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isMounted]);

  // Mouse parallax & base animations
  useEffect(() => {
    if (!orbRef.current || !isMounted) return;

    const ctx = gsap.context(() => {
      let rafId: number;
      let lastUpdate = 0;
      const throttleMs = 16;

      const handleMouseMove = (e: MouseEvent) => {
        const now = performance.now();
        if (now - lastUpdate < throttleMs) return;
        lastUpdate = now;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const rect = containerRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          mousePos.current = {
            x: e.clientX - centerX,
            y: e.clientY - centerY,
          };

          const distance = Math.sqrt(
            mousePos.current.x * mousePos.current.x +
            mousePos.current.y * mousePos.current.y
          );
          const maxDistance = 500;
          const intensity = maxDistance / (maxDistance + distance);

          if (orbRef.current) {
            gsap.to(orbRef.current, {
              rotateX: (mousePos.current.y / 1000) * -50 * intensity,
              rotateY: (mousePos.current.x / 1000) * 50 * intensity,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          if (logoContainerRef.current) {
            gsap.to(logoContainerRef.current, {
              x: (mousePos.current.x / 1000) * -200 * intensity,
              y: (mousePos.current.y / 1000) * -200 * intensity,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          if (coreGlowRef.current) {
            gsap.to(coreGlowRef.current, {
              x: (mousePos.current.x / 1000) * -25 * intensity,
              y: (mousePos.current.y / 1000) * -25 * intensity,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          if (ring1Ref.current) {
            gsap.to(ring1Ref.current, {
              x: (mousePos.current.x / 1000) * -80 * intensity,
              y: (mousePos.current.y / 1000) * -80 * intensity,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          if (ring2Ref.current) {
            gsap.to(ring2Ref.current, {
              x: (mousePos.current.x / 1000) * -60 * intensity,
              y: (mousePos.current.y / 1000) * -60 * intensity,
              duration: 0.5,
              ease: "power2.out",
            });
          }

          if (orbitingContainerRef.current) {
            gsap.to(orbitingContainerRef.current, {
              x: (mousePos.current.x / 1000) * -40 * intensity,
              y: (mousePos.current.y / 1000) * -40 * intensity,
              duration: 0.5,
              ease: "power2.out",
            });
          }


        });
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // Core glow pulse
      if (coreGlowRef.current) {
        gsap.to(coreGlowRef.current, {
          scale: 1.2,
          opacity: 0.5,
          yoyo: true,
          repeat: -1,
          duration: 2,
          ease: "sine.inOut",
        });
      }

      // Ring rotations
      if (ring1Ref.current) {
        gsap.to(ring1Ref.current, {
          rotateZ: -360,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      if (ring2Ref.current) {
        gsap.to(ring2Ref.current, {
          rotateZ: 360,
          duration: 15,
          repeat: -1,
          ease: "none",
        });
      }

      // Orbiting dot
      if (orbitingContainerRef.current) {
        gsap.to(orbitingContainerRef.current, {
          rotate: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Entry animation - nodes pop in first, then edges connect
  useEffect(() => {
    if (!isMounted || !svgRef.current || hasAnimatedEntry) return;

    const ctx = gsap.context(() => {
      const validLines = linesRef.current.filter(Boolean);
      const validNodes = nodesRef.current.filter(Boolean);

      // Initial state (hidden)
      gsap.set(validLines, { strokeDasharray: 100, strokeDashoffset: 100, opacity: 0 });
      gsap.set(validNodes, { scale: 0, opacity: 0, transformOrigin: "center center" });

      // 1. Nodes appear ("pop")
      gsap.to(validNodes, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        delay: 0.3,
        ease: "back.out(1.7)",
      });

      // 2. Edges connect
      gsap.to(validLines, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.01,
        delay: 0.7,
        ease: "power2.inOut",
        onComplete: () => {
          // Remove dasharray after animation completes for cleaner look
          gsap.set(validLines, { strokeDasharray: "none" });
          setHasAnimatedEntry(true);
        },
      });
    }, svgRef);

    return () => ctx.revert();
  }, [isMounted, hasAnimatedEntry]);

  // Edge glow animation - update progress state for each glow dot
  useEffect(() => {
    if (!isMounted || edgeGlows.length === 0) return;

    // Kill previous animations
    glowAnimationsRef.current.forEach(anim => anim?.kill());
    glowAnimationsRef.current = [];

    edgeGlows.forEach((glow, i) => {
      const progressObj = { value: glow.progress };

      const animateGlowCycle = () => {
        // Reset progress and pick a new random edge
        progressObj.value = 0;
        const newEdgeIndex = Math.floor(Math.random() * GEOMETRY.edges.length);

        // Update edge index in state
        setEdgeGlows(prev => prev.map((g, idx) =>
          idx === i ? { ...g, edgeIndex: newEdgeIndex, progress: 0 } : g
        ));

        // Animate progress from 0 to 1
        const tween = gsap.to(progressObj, {
          value: 1,
          duration: glow.duration,
          ease: "power1.inOut",
          onUpdate: () => {
            setEdgeGlows(prev => prev.map((g, idx) =>
              idx === i ? { ...g, progress: progressObj.value } : g
            ));
          },
          onComplete: () => {
            // Small delay then start next cycle
            gsap.delayedCall(Math.random() * 0.3 + 0.1, animateGlowCycle);
          },
        });

        glowAnimationsRef.current[i] = tween;
      };

      // Start with initial delay based on index
      gsap.delayedCall(i * 0.4, animateGlowCycle);
    });

    return () => {
      glowAnimationsRef.current.forEach(anim => anim?.kill());
    };
  }, [isMounted, edgeGlows.length]);



  // Ring scale on hover
  useEffect(() => {
    if (isHovered && ring1Ref.current && ring2Ref.current) {
      gsap.to(ring1Ref.current, { scale: 1.1, duration: 0.3 });
      gsap.to(ring1Ref.current, {
        rotateZ: -360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring2Ref.current, { scale: 0.9, duration: 0.3 });
    } else if (ring1Ref.current && ring2Ref.current) {
      gsap.to(ring1Ref.current, { scale: 1, duration: 0.3 });
      gsap.to(ring1Ref.current, {
        rotateZ: -360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring2Ref.current, { scale: 1, duration: 0.3 });
    }
  }, [isHovered]);

  // Press scale effect
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current, {
        scale: isPressed ? 0.92 : 1,
        duration: 0.15,
        ease: "power2.out",
        transformOrigin: "center",
      });
    }
  }, [isPressed]);

  // Node pulse on hover
  useEffect(() => {
    if (!isMounted) return;

    const validNodes = nodesRef.current.filter(Boolean);
    if (isHovered) {
      validNodes.forEach((node, i) => {
        gsap.to(node, {
          r: parseFloat(node?.getAttribute("r") || "3") * 1.5,
          duration: 0.3,
          delay: i * 0.02,
          ease: "power2.out",
        });
      });
    } else {
      validNodes.forEach((node) => {
        gsap.to(node, {
          r: parseFloat(node?.getAttribute("data-original-r") || "3"),
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }
  }, [isHovered, isMounted]);

  const handlePressStart = useCallback(() => setIsPressed(true), []);
  const handlePressEnd = useCallback(() => {
    setTimeout(() => setIsPressed(false), 150);
  }, []);

  // Projection
  const currentRotation = isMounted ? rotation : INITIAL_ROTATION;
  const projectedNodes = GEOMETRY.nodes.map((node) =>
    project3D(node, currentRotation.y, currentRotation.x, 90, 200, 150)
  );

  // Sort by depth
  const sortedEdges = [...GEOMETRY.edges]
    .map((edge, index) => ({
      ...edge,
      index,
      avgDepth: (projectedNodes[edge.from].depth + projectedNodes[edge.to].depth) / 2,
    }))
    .sort((a, b) => a.avgDepth - b.avgDepth);

  const sortedNodes = projectedNodes
    .map((node, index) => ({ ...node, index }))
    .sort((a, b) => a.depth - b.depth);

  if (!isMounted) {
    return (
      <div ref={containerRef} className="pointer-events-auto">
        <div className="relative w-[400px] h-[400px]" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="pointer-events-auto">
      <div
        ref={orbRef}
        className="relative w-[400px] h-[400px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Core glow */}
        <div
          ref={coreGlowRef}
          className="absolute inset-0 rounded-full blur-[80px]"
          style={{
            backgroundColor: currentTheme.primary + "10",
            transform: "translateZ(-100px)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Ring 1 */}
        <div
          ref={ring1Ref}
          className="absolute inset-10 border-2 border-dashed rounded-full opacity-50"
          style={{
            borderColor: currentTheme.primary + "33",
            transform: "translateZ(80px)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Ring 2 */}
        <div
          ref={ring2Ref}
          className="absolute inset-20 border border-dotted rounded-full"
          style={{
            borderColor: currentTheme.secondary + "4D",
            transform: "translateZ(100px)",
            transformStyle: "preserve-3d",
          }}
        />



        {/* Icosidodecahedron Logo */}
        <div
          ref={logoContainerRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: "translateZ(150px)",
            transformStyle: "preserve-3d",
          }}
        >
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="80 30 240 240"
            className="w-72 h-72 cursor-pointer pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsPressed(false);
            }}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onClick={cycleTheme}
            style={{
              filter: isHovered
                ? `drop-shadow(0 0 15px ${currentTheme.primary}99) drop-shadow(0 0 30px ${currentTheme.primary}66)`
                : `drop-shadow(0 0 10px ${currentTheme.primary}44)`,
              transition: "filter 0.3s ease",
            }}
          >
            <defs>
              {/* Node gradient */}
              <radialGradient id="animated-node-grad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor={currentTheme.secondary} />
                <stop offset="50%" stopColor={currentTheme.primary} />
                <stop offset="100%" stopColor={currentTheme.primary} />
              </radialGradient>

              {/* Edge gradient */}
              <linearGradient id="animated-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentTheme.primary} />
                <stop offset="50%" stopColor={currentTheme.secondary} />
                <stop offset="100%" stopColor={currentTheme.primary} />
              </linearGradient>

              {/* Traveling glow gradient */}
              <radialGradient id="glow-dot-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%" stopColor={currentTheme.primary} stopOpacity="0.9" />
                <stop offset="100%" stopColor={currentTheme.primary} stopOpacity="0" />
              </radialGradient>

              {/* Glow filter */}
              <filter id="animated-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Strong glow for traveling dots */}
              <filter id="traveling-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background glow circle */}
            <circle
              cx="200"
              cy="150"
              r="95"
              fill={`${currentTheme.primary}08`}
              style={{ transition: "fill 0.3s ease" }}
            />

            <g
              ref={groupRef}
              style={{
                transformOrigin: "200px 150px",
                transition: "transform 0.15s ease",
              }}
            >
              {/* Edges */}
              <g filter="url(#animated-glow)">
                {sortedEdges.map(({ from, to, index, avgDepth }) => {
                  const fromNode = projectedNodes[from];
                  const toNode = projectedNodes[to];
                  const depthFactor = (avgDepth + 1) / 2;
                  const baseOpacity = 0.3 + depthFactor * 0.7;
                  const strokeWidth = 1 + depthFactor * 1.5;

                  return (
                    <line
                      key={`edge-${index}`}
                      ref={(el) => { linesRef.current[index] = el; }}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="url(#animated-line-grad)"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      opacity={baseOpacity}
                      style={{ transition: "stroke 0.3s ease" }}
                    />
                  );
                })}
              </g>

              {/* Traveling glow dots along edges */}
              <g filter="url(#traveling-glow)">
                {edgeGlows.map((glow, i) => {
                  // Calculate current position based on edge and progress from state
                  const edge = GEOMETRY.edges[glow.edgeIndex % GEOMETRY.edges.length];
                  const fromNode = projectedNodes[edge.from];
                  const toNode = projectedNodes[edge.to];

                  // Use progress from state (0 to 1)
                  const x = fromNode.x + (toNode.x - fromNode.x) * glow.progress;
                  const y = fromNode.y + (toNode.y - fromNode.y) * glow.progress;

                  // Opacity based on progress (fade in at start, fade out at end)
                  const fadeIn = Math.min(glow.progress * 4, 1);
                  const fadeOut = Math.min((1 - glow.progress) * 4, 1);
                  const opacity = fadeIn * fadeOut * 0.95;

                  return (
                    <circle
                      key={`glow-${i}`}
                      ref={(el) => { glowDotsRef.current[i] = el; }}
                      cx={x}
                      cy={y}
                      r={3 + glow.progress * 1}
                      fill="url(#glow-dot-grad)"
                      opacity={opacity}
                    />
                  );
                })}
              </g>

              {/* Nodes */}
              <g filter="url(#animated-glow)">
                {sortedNodes.map(({ x, y, depth, index }) => {
                  const depthFactor = (depth + 1) / 2;
                  const scale = 0.6 + depthFactor * 0.5;
                  const radius = 4 * scale;
                  const baseOpacity = 0.5 + depthFactor * 0.5;

                  return (
                    <circle
                      key={`node-${index}`}
                      ref={(el) => { nodesRef.current[index] = el; }}
                      cx={x}
                      cy={y}
                      r={radius}
                      data-original-r={radius}
                      fill="url(#animated-node-grad)"
                      stroke="rgba(255, 255, 255, 0.9)"
                      strokeWidth={0.5 * scale}
                      opacity={baseOpacity}
                      style={{ transition: "fill 0.3s ease" }}
                    />
                  );
                })}
              </g>
            </g>
          </svg>
        </div>

        {/* Orbiting dot */}
        <div
          ref={orbitingContainerRef}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            ref={orbitingDotRef}
            className="absolute top-0 left-1/2 w-4 h-4 rounded-full"
            style={{
              backgroundColor: currentTheme.primary,
              boxShadow: `0 0 20px ${currentTheme.primary}`,
              transform: "translateX(-50%) translateY(-50%) translateZ(200px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
