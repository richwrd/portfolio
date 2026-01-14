'use client';

import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on client side and non-touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Position cursor off-screen initially
    cursor.style.transform = 'translate(-100px, -100px)';

    const moveCursor = (e: MouseEvent) => {
      // Direct DOM manipulation for maximum responsiveness
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });

    // Initial listener capability
    const addListeners = () => {
      const clickables = document.querySelectorAll('a, button, input, [role="button"], .cursor-hover');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    addListeners();

    // Observe DOM changes to add listeners to new elements
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      const clickables = document.querySelectorAll('a, button, input, [role="button"], .cursor-hover');
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none hidden md:block"
        style={{
          width: isHovering ? '48px' : '24px',
          height: isHovering ? '48px' : '24px',
          marginLeft: isHovering ? '-24px' : '-12px',
          marginTop: isHovering ? '-24px' : '-12px',
          border: '2px solid var(--primary)',
          borderRadius: '50%',
          backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
          boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
          transition: 'width 0.15s ease-out, height 0.15s ease-out, margin 0.15s ease-out, background-color 0.15s ease-out',
          willChange: 'transform',
          zIndex: 999999
        }}
      />
    </>
  );
};

export default CustomCursor;
