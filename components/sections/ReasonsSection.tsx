"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { birthdayConfig } from "@/lib/config/birthday";

export function ReasonsSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section
      id="reasons"
      badge="Why you"
      title="Reasons I Love You"
      subtitle="Tap each card — there's a little love note inside"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {birthdayConfig.reasons.map((reason, i) => (
          <Reveal key={reason.title} delay={i * 80}>
            <button
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              className="w-full text-left"
              aria-expanded={active === i}
            >
              <GlassCard
                className={`relative overflow-hidden transition-all duration-500 ${
                  active === i ? "ring-2 ring-rose/40 bg-white/70" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{reason.emoji}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold md:text-2xl">
                      {reason.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm text-foreground/70 transition-all duration-500 md:text-base ${
                        active === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      {reason.text}
                    </p>
                  </div>
                </div>
                <span className="absolute right-4 top-4 text-xs text-foreground/30">
                  {active === i ? "💗" : "tap"}
                </span>
              </GlassCard>
            </button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
