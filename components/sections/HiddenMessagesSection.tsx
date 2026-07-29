"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { birthdayConfig } from "@/lib/config/birthday";
import { useApp } from "@/context/AppContext";
import { burstConfetti } from "@/components/effects/Confetti";

export function HiddenMessagesSection() {
  const { collectEasterEgg, foundEasterEggs } = useApp();
  const [found, setFound] = useState<Set<number>>(new Set());

  const discover = (index: number) => {
    if (found.has(index)) return;
    setFound((prev) => new Set(prev).add(index));
    collectEasterEgg(`hidden-${index}`);
    burstConfetti({ particleCount: 30, spread: 40 });
  };

  const positions = [
    { top: "20%", left: "15%" },
    { top: "60%", left: "75%" },
    { top: "40%", left: "45%" },
    { top: "75%", left: "25%" },
  ];

  return (
    <Section
      id="hidden"
      badge="Secret"
      title="Hidden Surprises"
      subtitle="Tap the sparkling spots to uncover secret messages"
    >
      <Reveal>
        <div className="relative mx-auto h-64 max-w-3xl overflow-hidden rounded-3xl glass md:h-80">
          {birthdayConfig.hiddenMessages.map((msg, i) => (
            <button
              key={i}
              type="button"
              onClick={() => discover(i)}
              className={`absolute transition-all duration-500 ${
                found.has(i) ? "scale-150" : "animate-pulse-soft hover:scale-125"
              }`}
              style={positions[i]}
              aria-label="Discover hidden message"
            >
              {found.has(i) ? "💌" : "✨"}
            </button>
          ))}

          <div className="absolute inset-x-0 bottom-0 p-6">
            {found.size === 0 && (
              <p className="text-center text-sm text-foreground/50">
                Can you find all {birthdayConfig.hiddenMessages.length} secrets?
              </p>
            )}
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {birthdayConfig.hiddenMessages.map(
                (msg, i) =>
                  found.has(i) && (
                    <span
                      key={i}
                      className="rounded-full bg-rose/10 px-4 py-2 text-xs font-medium text-rose md:text-sm"
                    >
                      {msg}
                    </span>
                  )
              )}
            </div>
          </div>
        </div>
        {foundEasterEggs.size > 0 && (
          <p className="mt-4 text-center text-xs text-foreground/40">
            Easter eggs found: {foundEasterEggs.size} 🥚
          </p>
        )}
      </Reveal>
    </Section>
  );
}
