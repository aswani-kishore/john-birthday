"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { birthdayConfig } from "@/lib/config/birthday";
import { useApp } from "@/context/AppContext";
import { burstConfetti } from "@/components/effects/Confetti";

export function WelcomeScreen() {
  const { setHasEntered } = useApp();
  const [opening, setOpening] = useState(false);

  const handleEnter = () => {
    setOpening(true);
    burstConfetti({ particleCount: 60, spread: 80 });
    setTimeout(() => setHasEntered(true), 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[90] flex items-center justify-center gradient-hero transition-all duration-700 ${
        opening ? "pointer-events-none scale-110 opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <div className="animate-float mb-6 text-5xl md:text-6xl">🎂</div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-rose">
          A surprise awaits
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-5xl font-semibold leading-tight md:text-7xl">
          <span className="shimmer-text">Happy Birthday</span>
          <br />
          <span className="text-foreground">{birthdayConfig.recipient.name}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base text-foreground/70 md:text-lg">
          {birthdayConfig.sender.name} made you something special. Ready for a journey through
          love, laughter, and a few surprises?
        </p>
        <Button
          size="lg"
          className="mt-10 animate-pulse-soft"
          onClick={handleEnter}
        >
          Open Your Surprise ✨
        </Button>
        <p className="mt-6 text-xs text-foreground/40">
          Turn on sound for extra magic (optional)
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {["💕", "✨", "🎈", "💖", "🌸"].map((emoji, i) => (
          <span
            key={i}
            className="absolute animate-float text-2xl opacity-30 md:text-3xl"
            style={{
              left: `${10 + i * 18}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
