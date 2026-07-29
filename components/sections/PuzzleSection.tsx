"use client";

import { useState, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { burstConfetti } from "@/components/effects/Confetti";

const EMOJIS = ["💕", "🎂", "✨", "💖", "🌸", "🎈", "💝", "🦋"];
const PAIRS = 8;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createBoard() {
  const cards = shuffle([...EMOJIS.slice(0, PAIRS), ...EMOJIS.slice(0, PAIRS)]);
  return cards.map((emoji, id) => ({ id, emoji, matched: false }));
}

export function PuzzleSection() {
  const [cards, setCards] = useState(createBoard);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const flip = useCallback(
    (index: number) => {
      if (won || flipped.includes(index) || cards[index].matched) return;
      if (flipped.length === 2) return;

      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = newFlipped;
        if (cards[a].emoji === cards[b].emoji) {
          setTimeout(() => {
            setCards((prev) => {
              const updated = prev.map((c, i) =>
                i === a || i === b ? { ...c, matched: true } : c
              );
              if (updated.every((c) => c.matched)) {
                setWon(true);
                burstConfetti({ particleCount: 100 });
              }
              return updated;
            });
            setFlipped([]);
          }, 400);
        } else {
          setTimeout(() => setFlipped([]), 800);
        }
      }
    },
    [cards, flipped, won]
  );

  const reset = () => {
    setCards(createBoard());
    setFlipped([]);
    setMoves(0);
    setWon(false);
  };

  return (
    <Section
      id="puzzle"
      badge="Mini game"
      title="Memory Match"
      subtitle="Find all the matching pairs — just like us, meant to be together"
    >
      <Reveal>
        <GlassCard className="mx-auto max-w-lg">
          <div className="mb-4 flex items-center justify-between text-sm text-foreground/60">
            <span>Moves: {moves}</span>
            {won && <span className="font-semibold text-rose">You did it! 🎉</span>}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {cards.map((card, i) => {
              const isFaceUp = card.matched || flipped.includes(i);
              return (
                <button
                  key={card.id + i}
                  type="button"
                  onClick={() => flip(i)}
                  className={`aspect-square rounded-xl text-2xl transition-all duration-300 md:text-3xl ${
                    isFaceUp
                      ? "bg-rose/10 scale-100"
                      : "bg-gradient-to-br from-rose/30 to-purple-300/30 hover:scale-105"
                  } ${card.matched ? "opacity-50" : ""}`}
                  aria-label={isFaceUp ? card.emoji : "Hidden card"}
                >
                  {isFaceUp ? card.emoji : "?"}
                </button>
              );
            })}
          </div>
          {(won || moves > 0) && (
            <Button variant="secondary" className="mt-6 w-full" onClick={reset}>
              Play Again
            </Button>
          )}
        </GlassCard>
      </Reveal>
    </Section>
  );
}
