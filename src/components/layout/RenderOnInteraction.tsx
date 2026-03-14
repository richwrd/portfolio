"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

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
}

export default function RenderOnInteraction({
  children,
  events = DEFAULT_EVENTS,
}: RenderOnInteractionProps) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
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
  }, [events, isEnabled]);

  if (!isEnabled) return null;

  return <>{children}</>;
}