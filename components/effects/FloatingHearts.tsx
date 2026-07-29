"use client";

import { useEffect, useRef } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
}

export function FloatingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const heartsRef = useRef<Heart[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    heartsRef.current = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 8 + Math.random() * 14,
      opacity: 0.15 + Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.5,
    }));

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let frame: number;
    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#e87396";
      ctx.beginPath();
      const s = size / 20;
      ctx.moveTo(x, y + 2 * s);
      ctx.bezierCurveTo(x, y, x - 5 * s, y, x - 5 * s, y + 3.5 * s);
      ctx.bezierCurveTo(x - 5 * s, y + 7 * s, x, y + 10 * s, x, y + 12 * s);
      ctx.bezierCurveTo(x, y + 10 * s, x + 5 * s, y + 7 * s, x + 5 * s, y + 3.5 * s);
      ctx.bezierCurveTo(x + 5 * s, y, x, y, x, y + 2 * s);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      heartsRef.current.forEach((h) => {
        const dx = mx - h.x;
        const dy = my - h.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          h.vx -= dx * 0.0003;
          h.vy -= dy * 0.0003;
        }

        h.x += h.vx;
        h.y += h.vy;
        h.vx *= 0.99;
        h.vy = h.vy * 0.99 - 0.01;

        if (h.y < -20) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
        }
        if (h.x < -20) h.x = canvas.width + 20;
        if (h.x > canvas.width + 20) h.x = -20;

        drawHeart(h.x, h.y, h.size, h.opacity);
      });

      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
      aria-hidden
    />
  );
}
