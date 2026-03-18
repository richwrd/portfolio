"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { useAssetLoading } from "@/context/AssetLoadingContext";

interface RenderOnViewProps {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
  minHeightClassName?: string;
  anchorId?: string;
  preload?: boolean;
}

export default function RenderOnView({
  children,
  rootMargin = "300px 0px",
  threshold = 0.01,
  minHeightClassName,
  anchorId,
  preload = false,
}: RenderOnViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { isEverythingLoaded } = useAssetLoading();

  useEffect(() => {
    if (isVisible) return;

    const checkHash = () => {
      if (anchorId && window.location.hash === `#${anchorId}`) {
        setIsVisible(true);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, [anchorId, isVisible]);

  useEffect(() => {
    // If preload is true or we are still in the global loading phase (before isReady but rendering children), 
    // we might want to render.
    // However, if we want to "download everything in loading screen", we should set isVisible to true 
    // IF we are currently in the loading screen and want to preload.
    
    if (preload) {
      setIsVisible(true);
      return;
    }

    if (isVisible || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVisible, rootMargin, threshold, preload]);

  if (isVisible) {
    return <>{children}</>;
  }

  return (
    <div id={anchorId} className={minHeightClassName} aria-hidden="true">
      <div ref={sentinelRef} className="h-px w-full" />
    </div>
  );
}