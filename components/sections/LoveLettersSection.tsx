"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { birthdayConfig } from "@/lib/config/birthday";

export function LoveLettersSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section
      id="letters"
      badge="Letters"
      title="Love Letters"
      subtitle="Click an envelope to read what's inside"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {birthdayConfig.loveLetters.map((letter, i) => {
          const isOpen = openId === letter.id;
          return (
            <Reveal key={letter.id} delay={i * 100}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : letter.id)}
                className="group w-full perspective-[1000px]"
                aria-expanded={isOpen}
              >
                <div
                  className={`relative transition-all duration-700 preserve-3d ${
                    isOpen ? "[transform:rotateX(180deg)]" : ""
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front — envelope */}
                  <div
                    className={`glass rounded-2xl p-6 text-center backface-hidden ${
                      isOpen ? "invisible" : ""
                    }`}
                  >
                    <div className="mx-auto mb-4 text-5xl transition-transform group-hover:scale-110">
                      ✉️
                    </div>
                    <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-semibold">
                      {letter.title}
                    </h3>
                    <p className="mt-2 text-xs text-foreground/50">Tap to open</p>
                  </div>

                  {/* Back — letter content */}
                  <div
                    className="absolute inset-0 glass rounded-2xl p-6 [transform:rotateX(180deg)] backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <p className="font-[family-name:var(--font-cormorant)] text-base leading-relaxed text-foreground/90 md:text-lg">
                      {letter.content}
                    </p>
                    <p className="mt-4 text-xs text-rose">Tap to close</p>
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
