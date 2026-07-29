"use client";

import { useEffect, useState } from "react";
import { birthdayConfig } from "@/lib/config/birthday";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(onComplete, 600);
          return 100;
        }
        return p + Math.random() * 18 + 8;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gradient-hero transition-opacity duration-700 ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Loading birthday surprise"
    >
      <div className="animate-heartbeat mb-8 text-6xl">💝</div>
      <p className="font-[family-name:var(--font-cormorant)] text-2xl text-foreground/80 md:text-3xl">
        Preparing something special...
      </p>
      <p className="mt-2 text-sm text-foreground/50">
        For {birthdayConfig.recipient.name}
      </p>
      <div className="mt-10 h-1.5 w-56 overflow-hidden rounded-full bg-white/40 md:w-72">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose via-purple-400 to-orange-300 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <span className="mt-3 text-xs text-foreground/40">
        {Math.min(Math.round(progress), 100)}%
      </span>
    </div>
  );
}
