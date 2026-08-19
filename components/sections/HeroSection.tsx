"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { birthdayConfig } from "@/lib/config/birthday";
import { PopBalloons } from "@/components/effects/PopBalloons";

export function HeroSection() {
  const { name, nickname } = birthdayConfig.recipient;
  const { tagline, subtitle } = birthdayConfig.hero;

  return (
    <Section id="hero" className="gradient-hero journey-section-center flex min-h-0 flex-1 items-center">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-rose">
            {nickname}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-[family-name:var(--font-cormorant)] text-6xl font-bold leading-none md:text-8xl lg:text-9xl">
            <span className="text-gradient">{name}</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-xl text-xl font-medium text-foreground/80 md:text-2xl">
            {tagline}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-4 max-w-lg text-foreground/60">{subtitle}</p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-12">
            <PopBalloons />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
