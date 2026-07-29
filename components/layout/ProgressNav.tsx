"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

const SECTIONS = [
  { id: "hero", label: "Start" },
  { id: "welcome-message", label: "Note" },
  { id: "reasons", label: "Love" },
  { id: "timeline", label: "Story" },
  { id: "gallery", label: "Photos" },
  { id: "jokes", label: "Jokes" },
  { id: "letters", label: "Letters" },
  { id: "gifts", label: "Gifts" },
  { id: "quiz", label: "Quiz" },
  { id: "wheel", label: "Wheel" },
  { id: "finale", label: "Finale" },
];

export function ProgressNav() {
  const { setProgress } = useApp();
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
            const index = SECTIONS.findIndex((s) => s.id === id);
            setProgress(((index + 1) / SECTIONS.length) * 100);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [setProgress]);

  return (
    <nav
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
      aria-label="Journey progress"
    >
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`group flex items-center gap-2 transition-all ${
            active === id ? "opacity-100" : "opacity-40 hover:opacity-70"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full transition-all ${
              active === id ? "scale-150 bg-rose" : "bg-foreground/30"
            }`}
          />
          <span className="text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}
