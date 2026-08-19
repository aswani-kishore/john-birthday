"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { birthdayConfig } from "@/lib/config/birthday";
import { getFinaleSlideIndex, getJourneySlides } from "@/lib/journey/sections";

interface AppContextValue {
  hasEntered: boolean;
  setHasEntered: (value: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  musicPlaying: boolean;
  toggleMusic: () => void;
  startMusic: () => void;
  foundEasterEggs: Set<string>;
  collectEasterEgg: (id: string) => void;
  showCompliment: () => void;
  compliment: string | null;
  progress: number;
  currentSlide: number;
  totalSlides: number;
  slideLabel: string;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  skipToFinale: () => void;
  isFinaleSlide: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const slides = useMemo(() => getJourneySlides(), []);
  const totalSlides = slides.length;
  const finaleIndex = useMemo(() => getFinaleSlideIndex(slides), [slides]);

  const [hasEntered, setHasEntered] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [foundEasterEggs, setFoundEasterEggs] = useState<Set<string>>(new Set());
  const [compliment, setCompliment] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const progress = totalSlides > 0 ? ((currentSlide + 1) / totalSlides) * 100 : 0;
  const slideLabel = slides[currentSlide]?.label ?? "";
  const isFinaleSlide = currentSlide === finaleIndex;

  const toggleSound = useCallback(() => setSoundEnabled((s) => !s), []);
  const toggleMusic = useCallback(() => setMusicPlaying((m) => !m), []);
  const startMusic = useCallback(() => setMusicPlaying(true), []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const skipToFinale = useCallback(() => {
    if (finaleIndex >= 0) setCurrentSlide(finaleIndex);
  }, [finaleIndex]);

  const collectEasterEgg = useCallback((id: string) => {
    setFoundEasterEggs((prev) => new Set(prev).add(id));
  }, []);

  const showCompliment = useCallback(() => {
    const list = birthdayConfig.randomCompliments;
    const pick = list[Math.floor(Math.random() * list.length)];
    setCompliment(pick);
    setTimeout(() => setCompliment(null), 3500);
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.92) showCompliment();
    }, 12000);
    return () => clearInterval(interval);
  }, [hasEntered, showCompliment]);

  useEffect(() => {
    if (hasEntered) {
      document.documentElement.classList.add("journey-active");
      return () => document.documentElement.classList.remove("journey-active");
    }
  }, [hasEntered]);

  return (
    <AppContext.Provider
      value={{
        hasEntered,
        setHasEntered,
        soundEnabled,
        toggleSound,
        musicPlaying,
        toggleMusic,
        startMusic,
        foundEasterEggs,
        collectEasterEgg,
        showCompliment,
        compliment,
        progress,
        currentSlide,
        totalSlides,
        slideLabel,
        nextSlide,
        prevSlide,
        goToSlide,
        skipToFinale,
        isFinaleSlide,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
