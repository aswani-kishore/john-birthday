"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { birthdayConfig } from "@/lib/config/birthday";
import { cn } from "@/lib/utils/cn";

export function GallerySection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Section
      id="gallery"
      badge="Memories"
      title="Our Photo Gallery"
      subtitle="Replace gradient placeholders with your photos in lib/config/birthday.ts"
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {birthdayConfig.gallery.map((photo, i) => (
          <Reveal key={photo.id} delay={i * 60}>
            <button
              type="button"
              onClick={() => setSelected(selected === photo.id ? null : photo.id)}
              className="group relative aspect-square w-full overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
                  photo.gradient
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 transition-opacity",
                  selected === photo.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
              >
                <span className="text-left text-sm font-medium text-white">{photo.caption}</span>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-rose opacity-0 transition-opacity group-hover:opacity-100">
                📷
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal
        >
          <div className="glass max-w-lg rounded-3xl p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-lg font-medium">
              {birthdayConfig.gallery.find((p) => p.id === selected)?.caption}
            </p>
            <p className="mt-2 text-sm text-foreground/60">
              Add your photo path in the config to display real images here.
            </p>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-4 text-sm text-rose hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
