"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { getJourneySlides, type JourneySlide } from "@/lib/journey/sections";
import { SlideActiveProvider } from "@/lib/journey/SlideActiveContext";
import { cn } from "@/lib/utils/cn";

const SWIPE_THRESHOLD = 60;

export function SlideDeck() {
  const slides = getJourneySlides();
  const { currentSlide, nextSlide, prevSlide } = useApp();
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    touchStartY.current = null;

    if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
    if (deltaY > 0) nextSlide();
    else prevSlide();
  };

  return (
    <div
      className="relative h-dvh w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className={cn(
          "flex h-full w-full flex-col",
          !reducedMotion && "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        )}
        style={{ transform: `translateY(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <SlidePanel key={slide.id} slide={slide} isActive={index === currentSlide} />
        ))}
      </div>
    </div>
  );
}

function SlidePanel({
  slide,
  isActive,
}: {
  slide: JourneySlide;
  isActive: boolean;
}) {
  const SlideComponent = slide.component;

  return (
    <div
      id={slide.id}
      className={cn(
        "journey-slide h-dvh w-full shrink-0 pb-28",
        isActive ? "overflow-y-auto pointer-events-auto" : "overflow-hidden pointer-events-none"
      )}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      <SlideActiveProvider active={isActive}>
        <SlideComponent />
      </SlideActiveProvider>
    </div>
  );
}
