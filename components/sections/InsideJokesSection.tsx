"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { birthdayConfig } from "@/lib/config/birthday";

export function InsideJokesSection() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [popup, setPopup] = useState<string | null>(null);

  const reveal = (index: number, punchline: string) => {
    setRevealed((prev) => new Set(prev).add(index));
    setPopup(punchline);
    setTimeout(() => setPopup(null), 3000);
  };

  return (
    <Section
      id="jokes"
      badge="Just us"
      title="Inside Jokes"
      subtitle="If you know, you know 😏"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {birthdayConfig.insideJokes.map((joke, i) => (
          <Reveal key={i} delay={i * 80}>
            <GlassCard>
              <p className="font-medium">{joke.setup}</p>
              {revealed.has(i) ? (
                <p className="mt-3 text-rose font-semibold animate-[float_0.5s_ease-out]">
                  {joke.punchline}
                </p>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={() => reveal(i, joke.punchline)}
                >
                  Reveal punchline 🎭
                </Button>
              )}
            </GlassCard>
          </Reveal>
        ))}
      </div>

      {popup && (
        <div className="fixed top-1/3 left-1/2 z-50 -translate-x-1/2 animate-[float_0.4s_ease-out]">
          <div className="glass rounded-2xl px-8 py-4 text-center shadow-[var(--shadow-glow)]">
            <p className="text-lg font-semibold text-rose">{popup}</p>
          </div>
        </div>
      )}
    </Section>
  );
}
