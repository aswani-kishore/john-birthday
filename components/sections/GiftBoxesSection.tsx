"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { birthdayConfig } from "@/lib/config/birthday";
import { burstConfetti } from "@/components/effects/Confetti";

export function GiftBoxesSection() {
  const [opened, setOpened] = useState<Set<string>>(new Set());
  const [animating, setAnimating] = useState<string | null>(null);

  const openGift = (id: string) => {
    if (opened.has(id)) return;
    setAnimating(id);
    setTimeout(() => {
      setOpened((prev) => new Set(prev).add(id));
      setAnimating(null);
      burstConfetti({ particleCount: 50, spread: 60 });
    }, 600);
  };

  return (
    <Section
      id="gifts"
      badge="Presents"
      title="Virtual Gift Boxes"
      subtitle="Pick a box — each one holds a little promise"
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {birthdayConfig.giftBoxes.map((gift, i) => {
          const isOpen = opened.has(gift.id);
          const isAnimating = animating === gift.id;

          return (
            <Reveal key={gift.id} delay={i * 100}>
              <button
                type="button"
                onClick={() => openGift(gift.id)}
                disabled={isOpen}
                className="w-full text-center"
              >
                <div
                  className={`glass rounded-3xl p-8 transition-all duration-500 ${
                    isAnimating ? "scale-110 rotate-3" : isOpen ? "bg-rose/5" : "hover:-translate-y-2"
                  }`}
                >
                  <div
                    className={`text-6xl transition-all duration-500 ${
                      isAnimating ? "animate-[heartbeat_0.3s_ease-in-out_3]" : ""
                    }`}
                  >
                    {isOpen ? "🎁✨" : "🎁"}
                  </div>
                  <h3 className="mt-4 font-semibold">{gift.label}</h3>
                  {isOpen ? (
                    <p className="mt-3 text-sm text-rose animate-[float_0.5s_ease-out]">
                      {gift.surprise}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-foreground/50">Click to unwrap</p>
                  )}
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
