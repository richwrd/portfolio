"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import LoadingScreen from "@/components/effects/LoadingScreen";

interface LoadingGateProps {
  children: ReactNode;
}

export default function LoadingGate({ children }: LoadingGateProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <div 
        style={{ 
          opacity: isReady ? 1 : 0, 
          visibility: isReady ? "visible" : "hidden",
          transition: "opacity 0.5s ease"
        }}
      >
        {children}
      </div>
      {!isReady && <LoadingScreen onComplete={() => setIsReady(true)} />}
    </>
  );
}