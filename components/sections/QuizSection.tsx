"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { birthdayConfig } from "@/lib/config/birthday";
import { burstConfetti } from "@/components/effects/Confetti";

export function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = birthdayConfig.quiz[current];

  const answer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === question.correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (current < birthdayConfig.quiz.length - 1) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
        burstConfetti();
      }
    }, 1200);
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  return (
    <Section
      id="quiz"
      badge="Quiz time"
      title="How Well Do You Remember Us?"
      subtitle="No cheating — your heart knows the answers"
    >
      <Reveal>
        <GlassCard className="mx-auto max-w-xl">
          {finished ? (
            <div className="text-center">
              <p className="text-4xl">🏆</p>
              <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-2xl font-semibold">
                You scored {score}/{birthdayConfig.quiz.length}!
              </h3>
              <p className="mt-2 text-foreground/70">
                {score === birthdayConfig.quiz.length
                  ? "Perfect! We really are soulmates."
                  : score >= birthdayConfig.quiz.length / 2
                    ? "Not bad — but we need more pizza dates to study."
                    : "Looks like we need more memory-making adventures!"}
              </p>
              <Button className="mt-6" onClick={reset}>
                Play Again
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between text-xs text-foreground/50">
                <span>
                  Question {current + 1}/{birthdayConfig.quiz.length}
                </span>
                <span>Score: {score}</span>
              </div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold md:text-2xl">
                {question.question}
              </h3>
              <div className="mt-6 grid gap-2">
                {question.options.map((opt, i) => {
                  let style = "border-transparent hover:bg-rose/5";
                  if (selected !== null) {
                    if (i === question.correct) style = "border-green-400 bg-green-50/50";
                    else if (i === selected) style = "border-red-300 bg-red-50/50";
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => answer(i)}
                      disabled={selected !== null}
                      className={`rounded-xl border-2 px-4 py-3 text-left text-sm transition-all md:text-base ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </GlassCard>
      </Reveal>
    </Section>
  );
}
