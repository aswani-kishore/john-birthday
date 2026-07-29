"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { birthdayConfig } from "@/lib/config/birthday";

export function MusicPlayer() {
  const { musicPlaying } = useApp();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !birthdayConfig.music.src) return;

    if (musicPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [musicPlaying]);

  if (!birthdayConfig.music.src) return null;

  return (
    <audio ref={audioRef} src={birthdayConfig.music.src} loop preload="none">
      <track kind="captions" />
    </audio>
  );
}
