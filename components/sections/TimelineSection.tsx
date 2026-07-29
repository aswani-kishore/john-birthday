"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { birthdayConfig } from "@/lib/config/birthday";

export function TimelineSection() {
  return (
    <Section
      id="timeline"
      badge="Our story"
      title="Timeline of Us"
      subtitle="Every chapter with you is my favorite"
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-rose/40 via-purple-300/40 to-transparent md:left-1/2 md:-translate-x-px" />

        {birthdayConfig.timeline.map((item, i) => (
          <Reveal key={item.title} delay={i * 100}>
            <div
              className={`relative mb-10 flex flex-col md:mb-14 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden flex-1 md:block" />
              <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-rose text-sm text-white shadow-[var(--shadow-glow)] md:left-1/2">
                {i + 1}
              </div>
              <div className="ml-12 flex-1 md:ml-0">
                <div className="glass rounded-2xl p-5 md:p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-rose">
                    {item.date}
                  </span>
                  <h3 className="mt-1 font-[family-name:var(--font-cormorant)] text-xl font-semibold md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/70 md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
