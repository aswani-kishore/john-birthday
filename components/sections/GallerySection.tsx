"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { birthdayConfig } from "@/lib/config/birthday";

export function GallerySection() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedPhoto = birthdayConfig.gallery.find((p) => p.id === selected);

  return (
    <Section
      id="gallery"
      badge="Memories"
      title="Our Photo Gallery"
      subtitle="Moments that make my heart skip a beat"
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {birthdayConfig.gallery.map((photo, i) => (
          <Reveal key={photo.id} delay={i * 60}>
            <button
              type="button"
              onClick={() => setSelected(selected === photo.id ? null : photo.id)}
              className="group relative aspect-square w-full overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 transition-opacity ${
                  selected === photo.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
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

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal
          aria-label={selectedPhoto.caption}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-center">
              <p className="text-lg font-medium text-white">{selectedPhoto.caption}</p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-3 text-sm text-white/80 hover:text-white hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
