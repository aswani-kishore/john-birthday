"use client";

import { createContext, useContext } from "react";

const SlideActiveContext = createContext<boolean | undefined>(undefined);

export function SlideActiveProvider({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <SlideActiveContext.Provider value={active}>{children}</SlideActiveContext.Provider>
  );
}

export function useSlideActive(): boolean | undefined {
  return useContext(SlideActiveContext);
}
