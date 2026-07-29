"use client";

import { useApp } from "@/context/AppContext";

export function FloatingControls() {
  const { soundEnabled, toggleSound, musicPlaying, toggleMusic, foundEasterEggs } = useApp();

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2 md:right-6 md:bottom-6">
      <button
        type="button"
        onClick={toggleSound}
        className="glass flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-[var(--shadow-soft)] transition-transform hover:scale-110"
        aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
        title="Sound effects"
      >
        {soundEnabled ? "🔊" : "🔇"}
      </button>
      <button
        type="button"
        onClick={toggleMusic}
        className="glass flex h-11 w-11 items-center justify-center rounded-full text-lg shadow-[var(--shadow-soft)] transition-transform hover:scale-110"
        aria-label={musicPlaying ? "Pause music" : "Play music"}
        title="Music"
      >
        {musicPlaying ? "⏸️" : "🎵"}
      </button>
      {foundEasterEggs.size > 0 && (
        <div className="glass rounded-full px-3 py-1.5 text-center text-xs font-medium text-rose">
          🥚 {foundEasterEggs.size}
        </div>
      )}
    </div>
  );
}
