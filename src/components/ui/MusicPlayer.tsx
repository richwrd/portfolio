"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Volume, VolumeX } from "lucide-react";
import GlassSurface from "@/components/effects/GlassSurface";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const startAudio = useCallback(() => {
    if (audioRef.current && !hasStartedRef.current) {
      hasStartedRef.current = true;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Silently fail - user will click the button
          hasStartedRef.current = false;
        });
    }
  }, []);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/song.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Show button after a short delay
    const timer = setTimeout(() => setShowButton(true), 500);

    // Listen for any user interaction to start audio
    const events = ["click", "scroll", "keydown", "touchstart", "mousemove"];

    const handleInteraction = () => {
      startAudio();
      // Remove all listeners after first successful interaction
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };

    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { passive: true });
    });

    return () => {
      clearTimeout(timer);
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [startAudio]);

  const toggleMute = () => {
    if (!audioRef.current) return;

    // Start playing if not already
    if (!isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
      return;
    }

    if (isMuted) {
      audioRef.current.muted = false;
    } else {
      audioRef.current.muted = true;
    }
    setIsMuted(!isMuted);
  };

  if (!showButton) return null;

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 group cursor-pointer"
      aria-label={isMuted ? "Ativar música" : "Desativar música"}
      title={isMuted ? "Ativar música" : "Desativar música"}
    >
      <GlassSurface
        width={48}
        height={48}
        distortionScale={-200}
        brightness={20}
        className="hover:scale-105 transition-transform duration-300"
      >
        <div className="relative">
          {isMuted || !isPlaying ? (
            <VolumeX className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          ) : (
            <>
              {/* Container with flex to align icon and bars, with margin compensation for centering */}
              <div className="flex items-center ">
                <Volume className="w-5 h-5 text-primary transition-colors" />
                {/* Sound wave animation - bars that bounce like equalizer */}
                <span className="flex items-center gap-[2px] -ml-[8px]">
                  <span
                    className="w-[2px] bg-primary rounded-full"
                    style={{
                      animation: 'soundwave1 0.4s ease-in-out infinite',
                    }}
                  />
                  <span
                    className="w-[2px] bg-primary rounded-full"
                    style={{
                      animation: 'soundwave2 0.5s ease-in-out infinite',
                    }}
                  />
                  <span
                    className="w-[2px] bg-primary rounded-full"
                    style={{
                      animation: 'soundwave3 0.35s ease-in-out infinite',
                    }}
                  />
                </span>
              </div>
              {/* Keyframes for equalizer animation */}
              <style>{`
              @keyframes soundwave1 {
                0%, 100% { height: 4px; }
                50% { height: 12px; }
              }
              @keyframes soundwave2 {
                0%, 100% { height: 8px; }
                50% { height: 16px; }
              }
              @keyframes soundwave3 {
                0%, 100% { height: 6px; }
                50% { height: 10px; }
              }
            `}</style>
            </>
          )}
        </div>

        {/* Tooltip */}
        <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {!isPlaying ? "🎵 Clique para tocar" : isMuted ? "🔇 Som desativado" : "🔊 Som ativado"}
        </span>
      </GlassSurface>
    </button>
  );
}
