"use client";

import { useEffect, useRef } from "react";

/** A quiet layer of suspended dust. Pauses outside the viewport and in background tabs. */
export default function Ambient() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(max-width: 760px)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let visible = true;
    let previous = 0;
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.4,
      speed: Math.random() * 0.015 + 0.006,
      phase: Math.random() * Math.PI * 2,
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (time: number) => {
      if (!visible || document.hidden || media.matches) {
        frame = 0;
        previous = 0;
        return;
      }
      const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      context.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.speed * delta;
        if (p.y < -0.02) p.y = 1.02;
        context.beginPath();
        context.fillStyle = `rgba(243,222,185,${0.15 + Math.sin(time * 0.0006 + p.phase) * 0.12})`;
        context.arc(
          p.x * width + Math.sin(time * 0.00015 + p.phase) * 20,
          p.y * height,
          p.r,
          0,
          Math.PI * 2,
        );
        context.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    const resume = () => {
      if (!frame && visible && !document.hidden && !media.matches)
        frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", resume);
    media.addEventListener("change", resume);
    resize();
    resume();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", resume);
      media.removeEventListener("change", resume);
    };
  }, []);
  return <canvas ref={ref} className="ambient-canvas" aria-hidden="true" />;
}
