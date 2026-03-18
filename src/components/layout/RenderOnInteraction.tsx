"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useAssetLoading } from "@/context/AssetLoadingContext";

const DEFAULT_EVENTS: Array<keyof WindowEventMap> = [
  "pointerdown",
  "pointermove",
  "touchstart",
  "keydown",
  "scroll",
];

interface RenderOnInteractionProps {
  children: ReactNode;
  events?: Array<keyof WindowEventMap>;
  preload?: boolean;
}

export default function RenderOnInteraction({
  children,
  events = DEFAULT_EVENTS,
  preload = false,
}: RenderOnInteractionProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { isEverythingLoaded } = useAssetLoading();

  useEffect(() => {
    if (preload) {
        setIsEnabled(true);
        return;
    }
    
    if (isEnabled) return;

    const activate = () => {
      setIsEnabled(true);
    };

    events.forEach((eventName) => {
      window.addEventListener(eventName, activate, {
        passive: true,
        once: true,
      });
    });

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, activate);
      });
    };
  }, [events, isEnabled, preload]);

  if (!isEnabled) return null;

  return <>{children}</>;
}