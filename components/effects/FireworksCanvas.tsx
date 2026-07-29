"use client";

import { useEffect, useRef } from "react";

export function FireworksCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
    }

    const colors = ["#e87396", "#ffb4c4", "#c084fc", "#ffd6ba", "#f97316", "#fde68a"];
    let particles: Particle[] = [];
    let rockets: { x: number; y: number; vy: number; color: string }[] = [];

    const spawnRocket = () => {
      rockets.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        vy: -(4 + Math.random() * 4),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const explode = (x: number, y: number, color: string) => {
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60;
        const speed = 2 + Math.random() * 4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
          size: 2 + Math.random() * 2,
        });
      }
    };

    let frame: number;
    let tick = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (tick % 30 === 0) spawnRocket();
      tick++;

      rockets = rockets.filter((r) => {
        r.y += r.vy;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

        if (r.vy > -1) {
          explode(r.x, r.y, r.color);
          return false;
        }
        return true;
      });

      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.life -= 0.012;

        if (p.life <= 0) return false;

        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });

      frame = requestAnimationFrame(animate);
    };

    ctx.fillStyle = "rgba(26,18,24,0.95)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animate();

    return () => cancelAnimationFrame(frame);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden
    />
  );
}
