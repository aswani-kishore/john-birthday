"use client";

import { useState } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import { PageLoader } from "@/components/layout/PageLoader";
import { WelcomeScreen } from "@/components/sections/WelcomeScreen";
import { FloatingHearts } from "@/components/effects/FloatingHearts";
import { FloatingControls } from "@/components/layout/FloatingControls";
import { ComplimentToast } from "@/components/layout/ComplimentToast";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { ProgressNav } from "@/components/layout/ProgressNav";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeMessageSection } from "@/components/sections/WelcomeMessageSection";
import { ReasonsSection } from "@/components/sections/ReasonsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { InsideJokesSection } from "@/components/sections/InsideJokesSection";
import { HiddenMessagesSection } from "@/components/sections/HiddenMessagesSection";
import { LoveLettersSection } from "@/components/sections/LoveLettersSection";
import { GiftBoxesSection } from "@/components/sections/GiftBoxesSection";
import { QuizSection } from "@/components/sections/QuizSection";
import { SpinWheelSection } from "@/components/sections/SpinWheelSection";
import { ScratchCardsSection } from "@/components/sections/ScratchCardsSection";
import { FlipCardsSection } from "@/components/sections/FlipCardsSection";
import { PuzzleSection } from "@/components/sections/PuzzleSection";
import { WishesSection } from "@/components/sections/WishesSection";
import { FinalLetterSection } from "@/components/sections/FinalLetterSection";
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
  const { hasEntered } = useApp();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      {loaded && !hasEntered && <WelcomeScreen />}
      {loaded && hasEntered && (
        <main className="relative cursor-heart">
          <ProgressBar />
          <FloatingHearts />
          <ProgressNav />
          <FloatingControls />
          <ComplimentToast />
          <MusicPlayer />

          <CountdownSection />
          <HeroSection />
          <WelcomeMessageSection />
          <ReasonsSection />
          <TimelineSection />
          <GallerySection />
          <InsideJokesSection />
          <HiddenMessagesSection />
          <LoveLettersSection />
          <GiftBoxesSection />
          <QuizSection />
          <SpinWheelSection />
          <ScratchCardsSection />
          <FlipCardsSection />
          <PuzzleSection />
          <WishesSection />
          <FinalLetterSection />
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
