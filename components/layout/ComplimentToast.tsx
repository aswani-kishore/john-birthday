"use client";

import { useApp } from "@/context/AppContext";

export function ComplimentToast() {
  const { compliment } = useApp();
  if (!compliment) return null;

  return (
    <div
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2 animate-[float_0.5s_ease-out]"
      role="status"
    >
      <div className="glass rounded-2xl px-6 py-3 text-sm font-medium text-rose shadow-[var(--shadow-glow)] md:text-base">
        ✨ {compliment}
      </div>
    </div>
  );
}
