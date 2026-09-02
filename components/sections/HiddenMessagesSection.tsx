"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { birthdayConfig } from "@/lib/config/birthday";
import { useApp } from "@/context/AppContext";
import { burstConfetti } from "@/components/effects/Confetti";

export function HiddenMessagesSection() {
  const { collectEasterEgg } = useApp();
  const [found, setFound] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);
  const messages = birthdayConfig.hiddenMessages;
  const foundCount = found.size;
  const allFound = foundCount === messages.length;

  const discover = (index: number) => {
    const isNew = !found.has(index);
    if (isNew) {
      setFound((prev) => new Set(prev).add(index));
      collectEasterEgg(`hidden-${index}`);
      burstConfetti({ particleCount: 30, spread: 40 });
    }
    setActive(index);
  };

  return (
    <Section
      id="hidden"
      badge="Secret"
      title="Hidden Surprises"
      subtitle="Tap each sparkle to uncover a secret message"
      className="pb-8"
    >
      <Reveal>
        <div
          className="mx-auto max-w-2xl"
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <div className="mb-5 flex items-center justify-center gap-2 text-sm text-foreground/60">
            <span className="rounded-full bg-rose/10 px-3 py-1 font-medium text-rose">
              {foundCount} / {messages.length} found
            </span>
            {allFound && <span className="text-rose">All secrets unlocked 💌</span>}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {messages.map((_, i) => {
              const isFound = found.has(i);
              const isActive = active === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => discover(i)}
                  className={`flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-2xl border transition-all duration-300 ${
                    isFound
                      ? "border-rose/30 bg-rose/10"
                      : "glass border-transparent hover:-translate-y-0.5 hover:border-rose/20"
                  } ${isActive ? "ring-2 ring-rose/40" : ""}`}
                  aria-label={isFound ? `Secret ${i + 1} unlocked` : `Reveal secret ${i + 1}`}
                  aria-pressed={isFound}
                >
                  <span className={`text-3xl ${isFound ? "" : "animate-pulse-soft"}`}>
                    {isFound ? "💌" : "✨"}
                  </span>
                  <span className="text-xs font-medium text-foreground/60">
                    {isFound ? "Opened" : `Secret ${i + 1}`}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 min-h-[140px]">
            {active === null ? (
              <GlassCard hover={false} className="text-center">
                <p className="text-sm text-foreground/55 md:text-base">
                  Pick a sparkle above to read a hidden note.
                </p>
              </GlassCard>
            ) : (
              <GlassCard hover={false} className="animate-[float_0.4s_ease-out]">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-rose">
                  Secret {active + 1}
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-base leading-relaxed text-foreground/90 md:text-xl md:leading-relaxed">
                  {messages[active]}
                </p>
              </GlassCard>
            )}
          </div>

          {foundCount > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-center text-xs font-medium uppercase tracking-widest text-foreground/40">
                Unlocked notes
              </p>
              <div className="max-h-40 space-y-2 overflow-y-auto pr-1">
                {messages.map(
                  (msg, i) =>
                    found.has(i) && (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActive(i)}
                        className={`w-full rounded-xl px-3 py-2.5 text-left text-xs leading-relaxed transition-colors md:text-sm ${
                          active === i
                            ? "bg-rose/15 text-rose"
                            : "bg-white/40 text-foreground/70 hover:bg-rose/10"
                        }`}
                      >
                        {msg.length > 90 ? `${msg.slice(0, 90)}…` : msg}
                      </button>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
