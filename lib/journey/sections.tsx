import type { ComponentType } from "react";
import { birthdayConfig } from "@/lib/config/birthday";
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

export interface JourneySlide {
  id: string;
  label: string;
  component: ComponentType;
}

const ALL_SLIDES: JourneySlide[] = [
  { id: "countdown", label: "Countdown", component: CountdownSection },
  { id: "hero", label: "Start", component: HeroSection },
  { id: "welcome-message", label: "Note", component: WelcomeMessageSection },
  { id: "reasons", label: "Love", component: ReasonsSection },
  { id: "timeline", label: "Story", component: TimelineSection },
  { id: "gallery", label: "Photos", component: GallerySection },
  { id: "jokes", label: "Jokes", component: InsideJokesSection },
  { id: "hidden", label: "Secrets", component: HiddenMessagesSection },
  { id: "letters", label: "Letters", component: LoveLettersSection },
  { id: "gifts", label: "Gifts", component: GiftBoxesSection },
  { id: "quiz", label: "Quiz", component: QuizSection },
  { id: "wheel", label: "Wheel", component: SpinWheelSection },
  { id: "scratch", label: "Scratch", component: ScratchCardsSection },
  { id: "flip-cards", label: "Cards", component: FlipCardsSection },
  { id: "puzzle", label: "Game", component: PuzzleSection },
  { id: "wishes", label: "Wishes", component: WishesSection },
  { id: "finale", label: "Finale", component: FinalLetterSection },
];

function isBirthdayPast(): boolean {
  return Date.now() >= new Date(birthdayConfig.birthdayDate).getTime();
}

export function getJourneySlides(): JourneySlide[] {
  if (isBirthdayPast()) {
    return ALL_SLIDES.filter((slide) => slide.id !== "countdown");
  }
  return ALL_SLIDES;
}

export function getFinaleSlideIndex(slides: JourneySlide[]): number {
  return slides.findIndex((slide) => slide.id === "finale");
}
