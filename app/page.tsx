"use client";

import { useEffect, useState } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { PageLoader } from "@/components/layout/PageLoader";
import { WelcomeScreen } from "@/components/sections/WelcomeScreen";
import { FloatingHearts } from "@/components/effects/FloatingHearts";
import { FloatingControls } from "@/components/layout/FloatingControls";
import { ComplimentToast } from "@/components/layout/ComplimentToast";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { ProgressNav } from "@/components/layout/ProgressNav";
import { SlideDeck } from "@/components/layout/SlideDeck";
import { SlideControls } from "@/components/layout/SlideControls";

function ProgressBar() {
  const { progress } = useApp();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-rose via-purple-400 to-orange-300 transition-all duration-500"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

function BirthdayExperience() {
  const { hasEntered, startMusic } = useApp();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) startMusic();
  }, [loaded, startMusic]);

  return (
    <>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      {loaded && <MusicPlayer active={loaded} />}
      {loaded && !hasEntered && <WelcomeScreen />}
      {loaded && hasEntered && (
        <main className="relative cursor-heart h-dvh overflow-hidden">
          <ProgressBar />
          <FloatingHearts />
          <ProgressNav />
          <FloatingControls />
          <ComplimentToast />
          <SlideDeck />
          <SlideControls />
        </main>
      )}
    </>
  );
}

export default function BirthdayPage() {
  return (
    <AppProvider>
      <BirthdayExperience />
    </AppProvider>
  );
}
