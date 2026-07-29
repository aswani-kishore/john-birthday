"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { birthdayConfig } from "@/lib/config/birthday";

function ScratchCard({ message }: { message: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#c084fc");
    gradient.addColorStop(0.5, "#e87396");
    gradient.addColorStop(1, "#ffd6ba");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch me! ✨", rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = (clientX - rect.left) * 2;
    const y = (clientY - rect.top) * 2;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x / 2, y / 2, 20, 0, Math.PI * 2);
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }
    if (cleared / (canvas.width * canvas.height) > 0.35) {
      setRevealed(true);
    }
  };

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl glass">
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-lg font-semibold text-rose md:text-xl">
          {message}
        </p>
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
          onMouseMove={(e) => e.buttons === 1 && scratch(e)}
          onMouseDown={scratch}
          onTouchMove={scratch}
        />
      )}
    </div>
  );
}

export function ScratchCardsSection() {
  return (
    <Section
      id="scratch"
      badge="Scratch & reveal"
      title="Scratch Cards"
      subtitle="Scratch the surface to uncover sweet secrets"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {birthdayConfig.scratchCards.map((card, i) => (
          <Reveal key={i} delay={i * 80}>
            <ScratchCard message={card.message} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
