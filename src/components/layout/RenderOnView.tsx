"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface RenderOnViewProps {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
  minHeightClassName?: string;
  anchorId?: string;
}

export default function RenderOnView({
  children,
  rootMargin = "300px 0px",
  threshold = 0.01,
  minHeightClassName,
  anchorId,
}: RenderOnViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

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
  }, [isVisible, rootMargin, threshold]);

  if (isVisible) {
    return <>{children}</>;
  }

  return (
    <div id={anchorId} className={minHeightClassName} aria-hidden="true">
      <div ref={sentinelRef} className="h-px w-full" />
    </div>
  );
}