"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { birthdayConfig } from "@/lib/config/birthday";

export function WishesSection() {
  const wishes = birthdayConfig.wishes;
  if (!wishes.length) return null;

  return (
    <Section
      id="wishes"
      badge="From loved ones"
      title="Birthday Wishes"
      subtitle="Messages from people who adore you"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {birthdayConfig.wishes.map((wish, i) => (
          <Reveal key={wish.from} delay={i * 80}>
            <GlassCard>
              <p className="text-sm text-foreground/80">&ldquo;{wish.message}&rdquo;</p>
              <p className="mt-4 text-sm font-semibold text-rose">— {wish.from}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
