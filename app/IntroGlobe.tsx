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
    canvas.width = 560 * dpr;
    canvas.height = 560 * dpr;
    ctx.scale(2 * dpr, 2 * dpr);
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
      glow.addColorStop(0, "rgba(121,156,184,.12)");
      glow.addColorStop(1, "rgba(69,183,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);
      const ocean = ctx.createRadialGradient(110, 102, 8, 140, 140, 102);
      ocean.addColorStop(0, "rgba(65,86,108,.42)");
      ocean.addColorStop(.75, "rgba(37,57,79,.30)");
      ocean.addColorStop(1, "rgba(26,44,66,.15)");
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
        line(Array.from({length: 181}, (_, i) => [i * 2 - 180, lat]), "rgba(148,170,191,.16)", .65);
      for (let lon = -180; lon < 180; lon += 30)
        line(Array.from({length: 91}, (_, i) => [lon, i * 2 - 90]), "rgba(148,170,191,.16)", .65);
      for (const ring of land) line(ring, "rgba(161,184,204,.42)", .8);
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(140, 140, 100, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(161,184,204,.28)";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Bright signals stay separate from the subdued globe palette.
      const beacon = (x: number, y: number, pulse: number) => {
        const halo = ctx.createRadialGradient(x, y, 0, x, y, 9);
        halo.addColorStop(0, `rgba(69,184,255,${.8 * pulse})`);
        halo.addColorStop(1, "rgba(40,151,255,0)");
        ctx.fillStyle = halo;
        ctx.fillRect(x - 9, y - 9, 18, 18);
        ctx.beginPath();
        ctx.arc(x, y, 1.5 + pulse * .5, 0, Math.PI * 2);
        ctx.fillStyle = "#bceeff";
        ctx.shadowColor = "#239dff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      };
      [[0, 51], [31, 30], [-74, 41], [103, 1], [18, -34], [-43, -23]].forEach(([lon, lat], i) => {
        const [x, y, z] = project(lon, lat);
        if (z > .08) beacon(x, y, reduced ? .8 : .65 + .35 * Math.sin((now - start) / 420 + i));
      });
      ctx.save();
      ctx.translate(140, 140);
      ctx.rotate(-.22);
      ctx.beginPath();
      ctx.ellipse(0, 0, 128, 38, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(148,170,191,.2)";
      ctx.stroke();
      const orbit = turn * 4;
      beacon(Math.cos(orbit) * 128, Math.sin(orbit) * 38, 1);
      ctx.restore();
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <div className="intro-globe" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
