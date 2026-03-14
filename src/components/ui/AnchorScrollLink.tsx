"use client";

import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";

type LenisLike = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
    }
  ) => void;
};

interface AnchorScrollLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  durationMs?: number;
  offsetPx?: number;
  waitForTargetMs?: number;
  closeDelayMs?: number;
  onBeforeScroll?: () => void;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const getLenis = (): LenisLike | null => {
  if (typeof window === "undefined") return null;
  return (window as Window & { __lenis?: LenisLike }).__lenis ?? null;
};

const performScroll = (
  target: number | HTMLElement,
  durationMs: number,
  offsetPx: number
) => {
  const lenis = getLenis();
  const durationSec = Math.max(0.1, durationMs / 1000);

  if (lenis) {
    if (typeof target === "number") {
      lenis.scrollTo(target, { duration: durationSec, immediate: false });
      return;
    }

    lenis.scrollTo(target, {
      offset: -offsetPx,
      duration: durationSec,
      immediate: false,
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function AnchorScrollLink({
  href,
  children,
  className,
  durationMs = 900,
  offsetPx = 96,
  waitForTargetMs = 1200,
  closeDelayMs = 0,
  onBeforeScroll,
  onClick,
}: AnchorScrollLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();

    onBeforeScroll?.();

    const runScroll = () => {
      if (href === "#home") {
        performScroll(0, durationMs, offsetPx);
        return;
      }

      const id = href.slice(1);
      const startedAt = performance.now();

      const tryFindAndScroll = () => {
        const target = document.getElementById(id);

        if (target) {
          history.replaceState(null, "", href);
          performScroll(target, durationMs, offsetPx);
          return;
        }

        if (performance.now() - startedAt < waitForTargetMs) {
          window.setTimeout(tryFindAndScroll, 60);
        }
      };

      tryFindAndScroll();
    };

    if (closeDelayMs > 0) {
      window.setTimeout(runScroll, closeDelayMs);
      return;
    }

    runScroll();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}