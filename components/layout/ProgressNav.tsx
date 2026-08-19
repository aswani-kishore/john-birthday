"use client";

import { getJourneySlides } from "@/lib/journey/sections";
import { useApp } from "@/context/AppContext";

export function ProgressNav() {
  const { currentSlide, goToSlide } = useApp();
  const slides = getJourneySlides();

  return (
    <nav
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
      aria-label="Journey progress"
    >
      {slides.map(({ id, label }, index) => (
        <button
          key={id}
          type="button"
          onClick={() => goToSlide(index)}
          className={`group flex items-center gap-2 transition-all ${
            currentSlide === index ? "opacity-100" : "opacity-40 hover:opacity-70"
          }`}
          aria-label={`Go to ${label}`}
          aria-current={currentSlide === index ? "step" : undefined}
        >
          <span
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index ? "scale-150 bg-rose" : "bg-foreground/30"
            }`}
          />
          <span className="text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
