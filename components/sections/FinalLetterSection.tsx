"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { birthdayConfig } from "@/lib/config/birthday";
import { fireworkBurst } from "@/components/effects/Confetti";
import { FireworksCanvas } from "@/components/effects/FireworksCanvas";

export function FinalLetterSection() {
  const [showFireworks, setShowFireworks] = useState(false);
  const { greeting, paragraphs, closing, signature } = birthdayConfig.finalLetter;

  const celebrate = () => {
    setShowFireworks(true);
    fireworkBurst();
    setTimeout(() => setShowFireworks(false), 5000);
  };

  useEffect(() => {
    const timer = setTimeout(celebrate, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <FireworksCanvas active={showFireworks} />
      <Section
        id="finale"
        badge="The grand finale"
        title="Your Birthday Letter"
        subtitle="The most important words, saved for last"
        className="pb-32"
      >
        <Reveal>
          <GlassCard className="mx-auto max-w-3xl">
            <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-rose md:text-3xl">
              {greeting}
            </p>
            <div className="mt-6 space-y-4">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-foreground/85 md:text-xl md:leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 text-right">
              <p className="text-foreground/70">{closing}</p>
              <p className="mt-2 font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-rose">
                {signature}
              </p>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <Button size="lg" onClick={celebrate}>
              Celebrate Again! 🎆
            </Button>
            <p className="mt-6 text-sm text-foreground/40">
              Made with love by {birthdayConfig.sender.name} · Happy Birthday,{" "}
              {birthdayConfig.recipient.name}! 🎂
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
