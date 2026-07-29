"use client";

import { useCallback, useState } from "react";
import { burstConfetti } from "./Confetti";
import { useApp } from "@/context/AppContext";

const COLORS = ["#ffb4c4", "#e87396", "#c084fc", "#ffd6ba", "#93c5fd", "#fde68a"];

interface Balloon {
  id: number;
  color: string;
  left: number;
  delay: number;
  popped: boolean;
}

export function PopBalloons() {
  const { soundEnabled } = useApp();
  const [balloons, setBalloons] = useState<Balloon[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      left: 8 + i * 11,
      delay: i * 0.4,
      popped: false,
    }))
  );

  const pop = useCallback(
    (id: number) => {
      setBalloons((prev) =>
        prev.map((b) => (b.id === id && !b.popped ? { ...b, popped: true } : b))
      );
      burstConfetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      if (soundEnabled) {
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 400 + Math.random() * 200;
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        } catch {
          /* audio optional */
        }
      }
    },
    [soundEnabled]
  );

  return (
    <div className="relative h-48 w-full overflow-hidden rounded-3xl glass md:h-56">
      <p className="absolute top-4 left-0 right-0 z-10 text-center text-sm text-foreground/60">
        Tap the balloons to pop them! 🎈
      </p>
      {balloons.map((b) =>
        b.popped ? (
          <span
            key={b.id}
            className="absolute bottom-4 text-2xl transition-all"
            style={{ left: `${b.left}%` }}
          >
            💥
          </span>
        ) : (
          <button
            key={b.id}
            type="button"
            onClick={() => pop(b.id)}
            className="absolute bottom-0 animate-float cursor-pointer transition-transform hover:scale-110 active:scale-90"
            style={{
              left: `${b.left}%`,
              animationDelay: `${b.delay}s`,
              filter: `drop-shadow(0 4px 8px ${b.color}66)`,
            }}
            aria-label="Pop balloon"
          >
            <svg width="48" height="64" viewBox="0 0 48 64" aria-hidden>
              <ellipse cx="24" cy="22" rx="20" ry="24" fill={b.color} />
              <path d="M24 46 Q26 52 24 58 Q22 52 24 46" stroke={b.color} strokeWidth="2" fill="none" />
              <ellipse cx="18" cy="16" rx="6" ry="8" fill="white" opacity="0.35" />
            </svg>
          </button>
        )
      )}
    </div>
  );
}
