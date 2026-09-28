"use client";

import { useEffect, useRef } from "react";
import land from "./earth-land.json";

// Geographic outlines: Natural Earth, 1:110m land (public domain).
// Orthographic projection keeps the far hemisphere hidden as Earth rotates.
export default function IntroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const size = 280;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const start = performance.now();
    const draw = (now: number) => {
      const turn = reduced ? 0 : (now - start) / 9000;
      const project = (lon: number, lat: number) => {
        const a = lon * Math.PI / 180 + turn;
        const b = lat * Math.PI / 180;
        const x = Math.cos(b) * Math.sin(a);
        const y = Math.sin(b);
        const z = Math.cos(b) * Math.cos(a);
        const tilt = .25;
        return [140 + x * 99, 140 - (y * Math.cos(tilt) - z * Math.sin(tilt)) * 99,
          y * Math.sin(tilt) + z * Math.cos(tilt)];
      };
      ctx.clearRect(0, 0, size, size);
      const glow = ctx.createRadialGradient(140, 140, 87, 140, 140, 132);
      glow.addColorStop(0, "rgba(69,183,255,.24)");
      glow.addColorStop(1, "rgba(69,183,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);
      const ocean = ctx.createRadialGradient(110, 102, 8, 140, 140, 102);
      ocean.addColorStop(0, "#174871");
      ocean.addColorStop(.75, "#0b2849");
      ocean.addColorStop(1, "#06162e");
      ctx.beginPath();
      ctx.arc(140, 140, 99, 0, Math.PI * 2);
      ctx.fillStyle = ocean;
      ctx.fill();
      const line = (points: number[][], color: string, width: number) => {
        ctx.beginPath();
        let visible = false;
        for (const [lon, lat] of points) {
          const [x, y, z] = project(lon, lat);
          if (z > 0) {
            if (visible) ctx.lineTo(x, y); else ctx.moveTo(x, y);
          }
          visible = z > 0;
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
      };
      for (let lat = -60; lat <= 60; lat += 30)
        line(Array.from({length: 181}, (_, i) => [i * 2 - 180, lat]), "rgba(102,199,255,.25)", .65);
      for (let lon = -180; lon < 180; lon += 30)
        line(Array.from({length: 91}, (_, i) => [lon, i * 2 - 90]), "rgba(102,199,255,.25)", .65);
      ctx.shadowColor = "#63d8ff";
      ctx.shadowBlur = 4;
      for (const ring of land) line(ring, "#88dcff", 1.05);
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(140, 140, 100, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(144,222,255,.8)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.save();
      ctx.translate(140, 140);
      ctx.rotate(-.22);
      ctx.beginPath();
      ctx.ellipse(0, 0, 128, 38, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(104,196,255,.38)";
      ctx.stroke();
      const orbit = turn * 4;
      ctx.beginPath();
      ctx.arc(Math.cos(orbit) * 128, Math.sin(orbit) * 38, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#b6efff";
      ctx.fill();
      ctx.restore();
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <div className="intro-globe" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
