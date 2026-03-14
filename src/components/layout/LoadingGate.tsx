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
      {!isReady && <LoadingScreen onComplete={() => setIsReady(true)} />}
      {isReady ? children : null}
    </>
  );
}