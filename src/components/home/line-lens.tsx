"use client";

import { useEffect, useRef } from "react";

interface LineLensProps {
  lineCount?: number;
  baseHeight?: number;
  maxHeight?: number;
  radius?: number;
  lineWidth?: number;
  gap?: number;
  stiffness?: number;
  damping?: number;
}

// Ported from the Framer code component of the same name — a row of vertical
// lines whose heights spring toward the cursor like a magnifying lens.
// Defaults match the instance placed on the Framer home page, not the
// component's own defaults.
export function LineLens({
  lineCount = 200,
  baseHeight = 43,
  maxHeight = 73,
  radius = 200,
  lineWidth = 1,
  gap = 6,
  stiffness = 0.01,
  damping = 0.6,
}: LineLensProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null }>({ x: null });
  const springRef = useRef({ x: 0, vx: 0, intensity: 0, vi: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(resize);
      ro.observe(canvas);
    }
    resize();

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      const cy = H / 2;
      const sp = springRef.current;
      const cursorX = mouseRef.current.x;

      if (cursorX !== null) {
        if (sp.intensity < 0.01) sp.x = cursorX;
        sp.vx = sp.vx * damping + (cursorX - sp.x) * stiffness;
        sp.x += sp.vx;
        sp.vi = sp.vi * damping + (1 - sp.intensity) * (stiffness * 1.2);
        sp.intensity = Math.min(1, sp.intensity + sp.vi);
      } else {
        sp.vx *= damping;
        sp.x += sp.vx;
        sp.vi = sp.vi * damping + (0 - sp.intensity) * (stiffness * 2);
        sp.intensity = Math.max(0, sp.intensity + sp.vi);
      }

      ctx.clearRect(0, 0, W, H);

      let lr = 128, lg = 128, lb = 128;
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--fg-1").trim();
      const hexMatch = raw.match(/^#([0-9a-f]{6})$/i);
      if (hexMatch) {
        const n = parseInt(hexMatch[1], 16);
        lr = (n >> 16) & 255;
        lg = (n >> 8) & 255;
        lb = n & 255;
      }

      const { x: lensX, intensity } = sp;
      const step = lineWidth + gap;
      // Never leave empty space at the edges: draw at least enough lines to
      // span the full container, centred so the overflow clips evenly.
      const count = Math.max(lineCount, Math.ceil(W / step) + 2);
      const totalWidth = count * step - gap;
      const startX = (W - totalWidth) / 2;

      for (let i = 0; i < count; i++) {
        const lineX = startX + i * step;
        const dist = Math.abs(lineX - lensX);
        const normalized = Math.max(0, 1 - dist / radius);
        const factor = normalized * normalized * (3 - 2 * normalized) * intensity;

        const h = baseHeight + (maxHeight - baseHeight) * factor;
        const alpha = 0.3 + factor * 0.7;
        ctx.fillStyle = `rgba(${lr},${lg},${lb},${alpha})`;
        ctx.fillRect(lineX, cy - h / 2, lineWidth, h);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      if (ro) ro.disconnect();
    };
  }, [lineCount, baseHeight, maxHeight, radius, lineWidth, gap, stiffness, damping]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={(e) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
      }}
      onMouseLeave={() => {
        mouseRef.current.x = null;
      }}
      style={{ width: "100%", height: "100%", display: "block", cursor: "none", background: "transparent" }}
    />
  );
}
