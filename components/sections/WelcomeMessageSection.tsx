"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { birthdayConfig } from "@/lib/config/birthday";
import { useTypewriter } from "@/lib/hooks/useTypewriter";
import { useSlideActive } from "@/lib/journey/SlideActiveContext";

export function WelcomeMessageSection() {
  const slideActive = useSlideActive() ?? false;
  const { displayed, done } = useTypewriter(birthdayConfig.welcomeMessage, 30, slideActive);

  return (
    <Section
      id="welcome-message"
      badge="For you"
      title="A little note from my heart"
    >
      <Reveal>
        <GlassCard className="mx-auto max-w-3xl">
          <p className="font-[family-name:var(--font-cormorant)] text-xl leading-relaxed text-foreground/90 md:text-2xl md:leading-relaxed">
            {displayed}
            {!done && (
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-[typewriter-blink_1s_infinite] bg-rose align-middle" />
            )}
          </p>
          <p className="mt-6 text-right text-sm font-medium text-rose">
            — {birthdayConfig.sender.name} 💕
          </p>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
