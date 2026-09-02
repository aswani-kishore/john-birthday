"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { birthdayConfig } from "@/lib/config/birthday";
import { burstConfetti } from "@/components/effects/Confetti";

const PRIZES = birthdayConfig.wheelPrizes;
const SEGMENTS = PRIZES.length;
const DEG_PER = 360 / SEGMENTS;

const COLORS = [
  "#ffb4c4",
  "#e8d5f2",
  "#ffd6ba",
  "#c4b5fd",
  "#fde68a",
  "#93c5fd",
  "#fca5a5",
  "#a7f3d0",
];

export function SpinWheelSection() {
  const [spinning, setSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResultIndex(null);

    const winIndex = Math.floor(Math.random() * SEGMENTS);
    const extraSpins = 4 + Math.floor(Math.random() * 3);
    // Pointer is at top (0deg). Rotate so winning segment center lands under the pointer.
    const segmentCenter = winIndex * DEG_PER + DEG_PER / 2;
    const targetAngle = extraSpins * 360 + (360 - segmentCenter);

    setRotation((r) => r + targetAngle);

    window.setTimeout(() => {
      setSpinning(false);
      setResultIndex(winIndex);
      burstConfetti({ particleCount: 60 });
    }, 4200);
  };

  const conicStops = PRIZES.map((_, i) => {
    const start = i * DEG_PER;
    const end = (i + 1) * DEG_PER;
    return `${COLORS[i % COLORS.length]} ${start}deg ${end}deg`;
  }).join(", ");

  return (
    <Section
      id="wheel"
      badge="Spin to win"
      title="Wheel of Love"
      subtitle="Every spin wins a little promise from me — because you're worth it"
      className="pb-8"
    >
      <Reveal>
        <div
          className="mx-auto flex max-w-md flex-col items-center gap-5"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <div className="relative flex items-center justify-center">
            {/* Pointer */}
            <div
              className="absolute -top-1 z-20 text-rose drop-shadow-md"
              aria-hidden
            >
              <svg width="28" height="24" viewBox="0 0 28 24" fill="currentColor">
                <path d="M14 24 L0 0 L28 0 Z" />
              </svg>
            </div>

            {/* Wheel */}
            <div
              className="relative h-64 w-64 rounded-full border-[6px] border-white shadow-[var(--shadow-glow)] md:h-72 md:w-72"
              style={{
                background: `conic-gradient(from 0deg, ${conicStops})`,
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? "transform 4.2s cubic-bezier(0.15, 0.85, 0.25, 1)"
                  : "none",
              }}
              role="img"
              aria-label="Wheel of love prizes"
            >
              {PRIZES.map((prize, i) => {
                const angle = i * DEG_PER + DEG_PER / 2;
                return (
                  <div
                    key={prize.short}
                    className="absolute inset-0 flex items-start justify-center"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <span
                      className="mt-5 max-w-[72px] text-center text-[10px] font-bold leading-tight text-foreground/85 md:mt-6 md:max-w-[84px] md:text-[11px]"
                      style={{ transform: "translateY(0)" }}
                    >
                      {prize.short}
                    </span>
                  </div>
                );
              })}

              <div className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl shadow-md ring-2 ring-rose/20 md:h-16 md:w-16 md:text-2xl">
                💕
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={spin}
            disabled={spinning}
            className="min-w-[180px]"
            aria-busy={spinning}
          >
            {spinning ? "Spinning..." : "Spin the Wheel! 🎡"}
          </Button>

          <div className="min-h-[110px] w-full">
            {resultIndex !== null ? (
              <GlassCard hover={false} className="animate-[float_0.4s_ease-out] text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-rose">
                  You won
                </p>
                <p className="mt-2 font-[family-name:var(--font-cormorant)] text-lg font-semibold text-foreground md:text-xl">
                  {PRIZES[resultIndex].full}
                </p>
              </GlassCard>
            ) : (
              <p className="px-4 text-center text-sm text-foreground/50">
                Tap spin for a sweet little reward from me.
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
