"use client";

import { useState, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { birthdayConfig } from "@/lib/config/birthday";
import { burstConfetti } from "@/components/effects/Confetti";

const SEGMENTS = birthdayConfig.wheelPrizes.length;
const DEG_PER = 360 / SEGMENTS;

export function SpinWheelSection() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const winIndex = Math.floor(Math.random() * SEGMENTS);
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const targetAngle = extraSpins * 360 + (360 - winIndex * DEG_PER - DEG_PER / 2);

    setRotation((r) => r + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setResult(birthdayConfig.wheelPrizes[winIndex]);
      burstConfetti({ particleCount: 60 });
    }, 4000);
  };

  const colors = ["#ffb4c4", "#e8d5f2", "#ffd6ba", "#c4b5fd", "#fde68a", "#93c5fd", "#fca5a5", "#a7f3d0"];

  return (
    <Section
      id="wheel"
      badge="Spin to win"
      title="Wheel of Love"
      subtitle="Every spin wins something sweet — because you're worth it"
    >
      <Reveal>
        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-2xl">▼</div>
            <div
              ref={wheelRef}
              className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-white shadow-[var(--shadow-glow)] md:h-80 md:w-80"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
              }}
            >
              {birthdayConfig.wheelPrizes.map((prize, i) => (
                <div
                  key={i}
                  className="absolute inset-0 origin-center"
                  style={{
                    transform: `rotate(${i * DEG_PER}deg)`,
                    clipPath: "polygon(50% 50%, 50% 0%, 100% 0%)",
                  }}
                >
                  <div
                    className="flex h-full w-full items-start justify-center pt-8"
                    style={{
                      background: colors[i % colors.length],
                      transform: `rotate(${DEG_PER / 2}deg)`,
                    }}
                  >
                    <span className="max-w-[80px] text-center text-[10px] font-semibold text-foreground/80 md:text-xs">
                      {prize.split(" ")[0]}...
                    </span>
                  </div>
                </div>
              ))}
              <div className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-lg">
                💕
              </div>
            </div>
          </div>

          <Button size="lg" onClick={spin} disabled={spinning}>
            {spinning ? "Spinning..." : "Spin the Wheel! 🎡"}
          </Button>

          {result && (
            <GlassCard className="max-w-md text-center animate-[float_0.5s_ease-out]">
              <p className="text-sm text-foreground/60">You won:</p>
              <p className="mt-2 text-lg font-semibold text-rose">{result}</p>
            </GlassCard>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
