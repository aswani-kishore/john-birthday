"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { birthdayConfig } from "@/lib/config/birthday";

export function FlipCardsSection() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <Section
      id="flip-cards"
      badge="Memories"
      title="Flip Cards"
      subtitle="Click to flip — each card holds a cherished moment"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {birthdayConfig.flipCards.map((card, i) => {
          const isFlipped = flipped.has(i);
          return (
            <Reveal key={i} delay={i * 60}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="group h-44 w-full perspective-[800px] md:h-52"
                aria-pressed={isFlipped}
              >
                <div
                  className="relative h-full w-full transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl glass p-4 text-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <p className="font-[family-name:var(--font-cormorant)] text-lg font-semibold md:text-xl">
                      {card.front}
                    </p>
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-rose/20 to-purple-200/30 p-4 text-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <p className="text-sm text-foreground/80 md:text-base">{card.back}</p>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
