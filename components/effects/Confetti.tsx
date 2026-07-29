"use client";

import confetti from "canvas-confetti";

export function burstConfetti(options?: confetti.Options) {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.65 },
    colors: ["#e87396", "#ffb4c4", "#c084fc", "#ffd6ba", "#f97316"],
    ...options,
  });
}

export function fireworkBurst() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ["#e87396", "#ffb4c4", "#c084fc"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ["#ffd6ba", "#f97316", "#e8d5f2"],
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();

  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#e87396", "#ffb4c4", "#c084fc", "#ffd6ba"],
    });
  }, 500);
}
