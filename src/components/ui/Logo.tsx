"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState, useCallback } from "react";

// ============================================
// ICOSIDODECAEDRO 
// 30 vértices, 60 arestas
// Formado por Triângulos e Pentágonos
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

function getIcosidodecahedronData(): { nodes: Point3D[]; edges: Edge[] } {
  const phi = (1 + Math.sqrt(5)) / 2;

  // 1. Gerar vértices do Icosaedro base
  const icosaVertices: Point3D[] = [
    { x: 0, y: 1, z: phi }, { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: -phi }, { x: 0, y: -1, z: -phi },
    { x: 1, y: phi, z: 0 }, { x: -1, y: phi, z: 0 }, { x: 1, y: -phi, z: 0 }, { x: -1, y: -phi, z: 0 },
    { x: phi, y: 0, z: 1 }, { x: -phi, y: 0, z: 1 }, { x: phi, y: 0, z: -1 }, { x: -phi, y: 0, z: -1 },
  ];

  // 2. O Icosidodecaedro é formado pelos PONTOS MÉDIOS das arestas do Icosaedro
  const midPoints: Point3D[] = [];
  const pointSet = new Set<string>();

  for (let i = 0; i < icosaVertices.length; i++) {
    for (let j = i + 1; j < icosaVertices.length; j++) {
      const p1 = icosaVertices[i];
      const p2 = icosaVertices[j];
      const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2);

      // No icosaedro regular com essas coordenadas, arestas têm comprimento 2
      if (Math.abs(dist - 2) < 0.1) {
        const mid: Point3D = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
          z: (p1.z + p2.z) / 2,
        };

        // Normaliza para raio 1
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

  // 3. Conectar os 30 vértices
  const edges: Edge[] = [];
  let minDistance = Infinity;

  // Encontrar distância mínima
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

  // Criar arestas
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

// Projeção 3D para 2D
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

// Dados estáticos pré-calculados
const GEOMETRY = getIcosidodecahedronData();

// Constantes
const FPS = 30;
const FRAME_INTERVAL = 1000 / FPS;
const INITIAL_ROTATION = { y: 0, x: 0.5 };

export default function IcosidodecahedronLogo({
  className = "w-full h-auto",
  delay = 0,
  animateEntry = false,
  onIconClick,
}: {
  className?: string; // Aceita classes para tamanho (ex: w-10 h-10 ou w-full)
  delay?: number;
  /** Se true, anima a entrada desenhando nós e depois arestas. Se false, aparece já completo. */
  animateEntry?: boolean;
  onIconClick?: (e: React.MouseEvent) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const [isPressed, setIsPressed] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);
  const nodesRef = useRef<(SVGCircleElement | null)[]>([]);

  // Marcar como montado no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePressStart = useCallback(() => setIsPressed(true), []);
  const handlePressEnd = useCallback(() => setIsPressed(false), []);

  // Loop de animação
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
          y: elapsed * 0.2,
          x: 0.5 + Math.sin(elapsed * 0.15) * 0.2,
        });
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isMounted]);

  // Projeção
  const currentRotation = isMounted ? rotation : INITIAL_ROTATION;
  const projectedNodes = GEOMETRY.nodes.map((node) =>
    project3D(node, currentRotation.y, currentRotation.x, 85, 200, 150)
  );

  // Ordenação por profundidade
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

  // Animação GSAP: Nós -> Arestas (apenas quando animateEntry=true)
  useEffect(() => {
    if (!isMounted || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const validLines = linesRef.current.filter(Boolean);
      const validNodes = nodesRef.current.filter(Boolean);

      if (animateEntry) {
        // MODO ANIMADO: Nós aparecem primeiro, depois arestas
        // Configuração inicial (escondido)
        gsap.set(validLines, { strokeDasharray: 100, strokeDashoffset: 100, opacity: 0 });
        gsap.set(validNodes, { scale: 0, opacity: 0, transformOrigin: "center center" });

        // 1. Nós aparecem ("pop")
        gsap.to(validNodes, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.02,
          delay: delay,
          ease: "back.out(1.7)",
        });

        // 2. Arestas conectam
        gsap.to(validLines, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.01,
          delay: delay + 0.4,
          ease: "power2.inOut",
        });
      } else {
        // MODO ESTÁTICO: Aparece imediatamente completo (sem animação de entrada)
        gsap.set(validLines, { strokeDasharray: "none", strokeDashoffset: 0, opacity: 1 });
        gsap.set(validNodes, { scale: 1, opacity: 1 });
      }

      // Pulsar brilho (sempre ativo)
      gsap.to(groupRef.current, {
        filter: "drop-shadow(0px 0px 10px var(--primary))",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: animateEntry ? delay + 1 : 0.5,
      });
    }, svgRef);

    return () => ctx.revert();
  }, [isMounted, delay, animateEntry]);

  // Clique (escala)
  useEffect(() => {
    if (!isMounted || !groupRef.current) return;
    gsap.to(groupRef.current, {
      scale: isPressed ? 0.95 : 1,
      duration: 0.15,
      ease: "power2.out",
      transformOrigin: "center",
    });
  }, [isPressed, isMounted]);

  // RENDERIZAÇÃO
  // Usamos uma div wrapper com suppressHydrationWarning para permitir
  // que o servidor renderize o placeholder e o cliente renderize o logo animado
  // sem causar erros de hidratação.
  return (
    <div className={className} suppressHydrationWarning>
      {!isMounted ? (
        // PLACEHOLDER SSR
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="100 50 200 200"
          className="w-full h-full"
          aria-label="Geometric Network Sphere Logo"
          role="img"
        >
          <circle
            cx="200"
            cy="150"
            r="70"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      ) : (
        // LOGO ANIMADO CLIENTE
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="100 50 200 200"
          className="w-full h-full"
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onClick={onIconClick}
          aria-label="Geometric Network Sphere Logo"
          role="img"
          style={{ transition: "filter 0.3s ease" }}
        >
          <defs>
            <radialGradient id="node-grad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="50%" stopColor="var(--primary-light)" />
              <stop offset="100%" stopColor="var(--primary-dark)" />
            </radialGradient>

            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--secondary)" />
              <stop offset="50%" stopColor="var(--secondary-light)" />
              <stop offset="100%" stopColor="var(--secondary-dark)" />
            </linearGradient>

            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g
            ref={groupRef}
            className="cursor-pointer"
            style={{
              filter: "drop-shadow(0px 0px 5px var(--primary))",
              transition: "filter 0.3s ease"
            }}
          >
            <circle cx="200" cy="150" r="75" fill="rgba(var(--primary-rgb), 0.08)" />

            <g filter="url(#glow)">
              {sortedEdges.map(({ from, to, index, avgDepth }) => {
                const fromNode = projectedNodes[from];
                const toNode = projectedNodes[to];
                const depthFactor = (avgDepth + 1) / 2;
                const baseOpacity = 0.25 + depthFactor * 0.75;
                const strokeWidth = 0.8 + depthFactor * 1.2;

                return (
                  <line
                    key={`edge-${index}`}
                    ref={(el) => { linesRef.current[index] = el; }}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="url(#line-grad)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    opacity={animateEntry ? 0 : baseOpacity}
                    strokeDasharray={animateEntry ? 100 : undefined}
                    strokeDashoffset={animateEntry ? 100 : undefined}
                    style={{ transition: "stroke 0.3s ease" }}
                  />
                );
              })}
            </g>

            <g filter="url(#glow)">
              {sortedNodes.map(({ x, y, depth, index }) => {
                const depthFactor = (depth + 1) / 2;
                const scale = 0.5 + depthFactor * 0.5;
                const radius = 3.5 * scale;
                const baseOpacity = 0.4 + depthFactor * 0.6;

                return (
                  <circle
                    key={`node-${index}`}
                    ref={(el) => { nodesRef.current[index] = el; }}
                    cx={x}
                    cy={y}
                    r={radius}
                    fill="url(#node-grad)"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth={0.4 * scale}
                    opacity={animateEntry ? 0 : baseOpacity}
                    style={{ transition: "fill 0.3s ease" }}
                  />
                );
              })}
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}