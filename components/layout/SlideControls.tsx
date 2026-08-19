"use client";

import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export function SlideControls() {
  const {
    currentSlide,
    totalSlides,
    slideLabel,
    nextSlide,
    prevSlide,
    skipToFinale,
    isFinaleSlide,
  } = useApp();

  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-5 pt-8 pointer-events-none">
      <div className="pointer-events-auto mx-auto flex max-w-lg flex-col items-center gap-3">
        <p className="text-xs font-medium text-foreground/50">
          {currentSlide + 1} / {totalSlides}
          {slideLabel ? ` · ${slideLabel}` : ""}
        </p>
        <div className="flex w-full items-center justify-center gap-3">
          {!isFirst && (
            <Button variant="secondary" size="sm" onClick={prevSlide} aria-label="Previous section">
              Back
            </Button>
          )}
          {!isLast ? (
            <Button size="md" className="min-w-[140px]" onClick={nextSlide} aria-label="Next section">
              Continue
            </Button>
          ) : (
            <Button size="md" className="min-w-[140px]" disabled aria-label="Final section">
              The End
            </Button>
          )}
          {!isFinaleSlide && !isLast && (
            <Button variant="ghost" size="sm" onClick={skipToFinale} aria-label="Skip to finale">
              Skip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
