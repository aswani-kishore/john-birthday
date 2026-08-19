"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { birthdayConfig } from "@/lib/config/birthday";

export function MusicPlayer({ active }: { active: boolean }) {
  const { musicPlaying } = useApp();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !birthdayConfig.music.src || !active) return;

    const tryPlay = () => {
      if (musicPlaying) {
        audio.play().catch(() => {});
      }
    };

    if (musicPlaying) {
      tryPlay();
      window.addEventListener("pointerdown", tryPlay, { once: true });
      return () => window.removeEventListener("pointerdown", tryPlay);
    }

    audio.pause();
  }, [musicPlaying, active]);

  if (!birthdayConfig.music.src) return null;

  return (
    <audio ref={audioRef} src={birthdayConfig.music.src} loop preload="auto">
      <track kind="captions" />
    </audio>
  );
}
