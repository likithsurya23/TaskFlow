"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PulseWaveLoader({ 
  isSplash = false, 
  minDuration = 3000 
}) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // The loading animation should only play when a user opens the application link (root '/')
  const isAppRoot = pathname === "/";

  useEffect(() => {
    if (!isAppRoot || !isSplash) return;

    let removeTimer;
    const timer = setTimeout(() => {
      setIsFading(true);
      removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, minDuration);

    return () => {
      clearTimeout(timer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, [isSplash, minDuration, isAppRoot]);

  // Do not render if not on the main application link (root '/')
  if (!isAppRoot) return null;
  if (isSplash && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#130522_0%,#08020e_60%,#000000_100%)] text-purple-400 overflow-hidden select-none transition-opacity duration-500 ease-out ${
        isSplash && isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading TaskFlow"
    >
      {/* Central 220px x 220px Animation Container */}
      <div className="relative w-[220px] h-[220px] flex items-center justify-center">
        
        {/* Ambient Background Rings (Blackish Purple glow) */}
        <div
          className="absolute inset-0 m-auto w-[220px] h-[220px] rounded-full border border-purple-800/25 shadow-[0_0_35px_rgba(147,51,234,0.12)] pointer-events-none animate-[bgPulse_4s_ease-in-out_infinite_both] motion-reduce:animate-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 m-auto w-[176px] h-[176px] rounded-full border border-purple-900/20 shadow-[0_0_25px_rgba(126,34,206,0.08)] pointer-events-none animate-[bgPulse_4s_ease-in-out_infinite_reverse_both] motion-reduce:animate-none"
          aria-hidden="true"
        />

        {/* 5 Concentric Pulse Rings (Blackish Purple palette, dead-centered with inset-0 m-auto) */}
        {/* Ring 1: 180px | Royal Purple (#9333ea) | 2.2s | 0s delay */}
        <div
          className="absolute inset-0 m-auto rounded-full pointer-events-none box-border will-change-[transform,opacity] w-[180px] h-[180px] border border-purple-500/50 shadow-[0_0_18px_rgba(147,51,234,0.35),inset_0_0_10px_rgba(147,51,234,0.2)] animate-[pulseRipple1_2.2s_cubic-bezier(0.215,0.61,0.355,1)_0s_infinite_both] motion-reduce:hidden"
          aria-hidden="true"
        />

        {/* Ring 2: 145px | Amethyst Violet (#a855f7) | 2.8s | 0.5s delay */}
        <div
          className="absolute inset-0 m-auto rounded-full pointer-events-none box-border will-change-[transform,opacity] w-[145px] h-[145px] border border-purple-400/45 shadow-[0_0_16px_rgba(168,85,247,0.35),inset_0_0_8px_rgba(168,85,247,0.2)] animate-[pulseRipple2_2.8s_cubic-bezier(0.215,0.61,0.355,1)_0.5s_infinite_both] motion-reduce:hidden"
          aria-hidden="true"
        />

        {/* Ring 3: 210px | Electric Violet (#8b5cf6) | 3.5s | 1.0s delay */}
        <div
          className="absolute inset-0 m-auto rounded-full pointer-events-none box-border will-change-[transform,opacity] w-[210px] h-[210px] border border-violet-500/40 shadow-[0_0_22px_rgba(139,92,246,0.3),inset_0_0_10px_rgba(139,92,246,0.15)] animate-[pulseRipple3_3.5s_cubic-bezier(0.215,0.61,0.355,1)_1.0s_infinite_both] motion-reduce:hidden"
          aria-hidden="true"
        />

        {/* Ring 4: 110px | Midnight Purple (#7e22ce) | 2.0s | 0.3s delay */}
        <div
          className="absolute inset-0 m-auto rounded-full pointer-events-none box-border will-change-[transform,opacity] w-[110px] h-[110px] border border-purple-600/50 shadow-[0_0_16px_rgba(126,34,206,0.4),inset_0_0_8px_rgba(126,34,206,0.2)] animate-[pulseRipple4_2.0s_cubic-bezier(0.215,0.61,0.355,1)_0.3s_infinite_both] motion-reduce:hidden"
          aria-hidden="true"
        />

        {/* Ring 5: 240px | Deep Purple Aura (#6b21a8) | 4.0s | 0.8s delay */}
        <div
          className="absolute inset-0 m-auto rounded-full pointer-events-none box-border will-change-[transform,opacity] w-[240px] h-[240px] border border-purple-700/25 shadow-[0_0_20px_rgba(107,33,168,0.25)] animate-[pulseRipple5_4.0s_cubic-bezier(0.215,0.61,0.355,1)_0.8s_infinite_both] motion-reduce:hidden"
          aria-hidden="true"
        />

        {/* Center Hub: "TF" Monogram with Futuristic Alphabet Styling */}
        <div className="relative z-10 flex items-center justify-center w-[84px] h-[84px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#1c0830_0%,#05010a_100%)] border border-purple-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.95),0_0_24px_rgba(147,51,234,0.25)] animate-[hubPulse_2.5s_ease-in-out_infinite_alternate] motion-reduce:animate-none">
          <span className="font-orbitron text-3xl font-black tracking-widest pl-1 leading-none bg-gradient-to-br from-[#e9d5ff] via-[#c084fc] to-[#7e22ce] bg-[length:300%_300%] bg-clip-text text-transparent animate-[liquidGradient_3.8s_ease_infinite,textGlow_2.5s_ease-in-out_infinite_alternate] motion-reduce:animate-none">
            TF
          </span>
        </div>
      </div>

      {/* Brand Status Caption with Orbitron Alphabet Styling */}
      <div className="mt-8 flex flex-col items-center gap-2 z-10">
        <span className="font-orbitron text-[12px] font-bold tracking-[0.32em] uppercase text-purple-300 opacity-95 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
          TaskFlow
        </span>
      </div>
    </div>
  );
}
