"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { useSlideActive } from "@/lib/journey/SlideActiveContext";
import { cn } from "@/lib/utils/cn";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const slideActive = useSlideActive();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const [slideRevealed, setSlideRevealed] = useState(false);

  useEffect(() => {
    if (slideActive) setSlideRevealed(true);
  }, [slideActive]);

  const visible =
    slideActive !== undefined ? slideRevealed && slideActive : isVisible;

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
