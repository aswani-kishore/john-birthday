"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { birthdayConfig } from "@/lib/config/birthday";
import { useCountdown } from "@/lib/hooks/useCountdown";

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <GlassCard hover={false} className="min-w-[72px] text-center md:min-w-[100px]">
      <div className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-rose md:text-5xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-foreground/50 md:text-sm">
        {label}
      </div>
    </GlassCard>
  );
}

export function CountdownSection() {
  const countdown = useCountdown(birthdayConfig.birthdayDate);

  if (countdown.isPast) return null;

  return (
    <Section
      id="countdown"
      badge="Almost there"
      title="Counting down to your day"
      subtitle="Every second brings us closer to celebrating you"
    >
      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
          <TimeBlock value={countdown.days} label="Days" />
          <TimeBlock value={countdown.hours} label="Hours" />
          <TimeBlock value={countdown.minutes} label="Minutes" />
          <TimeBlock value={countdown.seconds} label="Seconds" />
        </div>
      </Reveal>
    </Section>
  );
}
