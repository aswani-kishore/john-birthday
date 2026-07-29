"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { birthdayConfig } from "@/lib/config/birthday";

interface AppContextValue {
  hasEntered: boolean;
  setHasEntered: (value: boolean) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  musicPlaying: boolean;
  toggleMusic: () => void;
  foundEasterEggs: Set<string>;
  collectEasterEgg: (id: string) => void;
  showCompliment: () => void;
  compliment: string | null;
  progress: number;
  setProgress: (value: number) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [foundEasterEggs, setFoundEasterEggs] = useState<Set<string>>(new Set());
  const [compliment, setCompliment] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const toggleSound = useCallback(() => setSoundEnabled((s) => !s), []);
  const toggleMusic = useCallback(() => setMusicPlaying((m) => !m), []);

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

  return (
    <AppContext.Provider
      value={{
        hasEntered,
        setHasEntered,
        soundEnabled,
        toggleSound,
        musicPlaying,
        toggleMusic,
        foundEasterEggs,
        collectEasterEgg,
        showCompliment,
        compliment,
        progress,
        setProgress,
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
