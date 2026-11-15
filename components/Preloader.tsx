"use client";

import React, { useEffect, useState } from "react";
import { Satellite, Globe } from "lucide-react";

const STATUS_LINES = [
  "Synchronizing MERRA-2 Satellite Telemetry Streams...",
  "Calibrating Land Surface Temperature Arrays...",
  "Initializing Earth Observation Console...",
];

const TICK_DEGS = [0, 45, 90, 135, 180, 225, 270, 315];

const CORNER_STYLES: React.CSSProperties[] = [
  { top: 16, left: 16, borderTop: "2px solid rgba(20,184,166,.45)", borderLeft: "2px solid rgba(20,184,166,.45)", borderTopLeftRadius: 4 },
  { top: 16, right: 16, borderTop: "2px solid rgba(20,184,166,.45)", borderRight: "2px solid rgba(20,184,166,.45)", borderTopRightRadius: 4 },
  { bottom: 16, left: 16, borderBottom: "2px solid rgba(20,184,166,.45)", borderLeft: "2px solid rgba(20,184,166,.45)", borderBottomLeftRadius: 4 },
  { bottom: 16, right: 16, borderBottom: "2px solid rgba(20,184,166,.45)", borderRight: "2px solid rgba(20,184,166,.45)", borderBottomRightRadius: 4 },
];

export default function Preloader() {
  const [statusIdx, setStatusIdx] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    const t0 = setTimeout(() => setStatusIdx(1), 850);
    const t1 = setTimeout(() => setStatusIdx(2), 1700);
    const t2 = setTimeout(() => setPhase("exiting"), 2700);
    const t3 = setTimeout(() => setPhase("done"), 3450);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      {/* Keyframe animations scoped to preloader */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tm-cw{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes tm-ccw{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes tm-radar{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes tm-core-pulse{
          0%,100%{box-shadow:0 0 25px rgba(20,184,166,.5),0 0 60px rgba(20,184,166,.25),inset 0 0 25px rgba(20,184,166,.15)}
          50%{box-shadow:0 0 55px rgba(20,184,166,.9),0 0 110px rgba(6,182,212,.45),inset 0 0 40px rgba(20,184,166,.28)}
        }
        @keyframes tm-dot{0%,80%,100%{opacity:.15;transform:scale(.65)}40%{opacity:1;transform:scale(1)}}
        @keyframes tm-scanline{0%{top:-30%}100%{top:130%}}
        .tm-cw-20{animation:tm-cw 20s linear infinite}
        .tm-cw-12{animation:tm-cw 12s linear infinite}
        .tm-ccw-16{animation:tm-ccw 16s linear infinite}
        .tm-ccw-10{animation:tm-ccw 10s linear infinite}
        .tm-radar-sw{animation:tm-radar 3s linear infinite}
        .tm-core-gl{animation:tm-core-pulse 2.5s ease-in-out infinite}
        .tm-scanline-m{animation:tm-scanline 4s linear infinite}
        .tm-ld1{animation:tm-dot 1.4s ease-in-out 0.00s infinite}
        .tm-ld2{animation:tm-dot 1.4s ease-in-out 0.20s infinite}
        .tm-ld3{animation:tm-dot 1.4s ease-in-out 0.40s infinite}
        .tm-ld4{animation:tm-dot 1.4s ease-in-out 0.60s infinite}
      ` }} />

      <div
        suppressHydrationWarning
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden select-none"
        style={{
          opacity: phase === "exiting" ? 0 : 1,
          transition: "opacity 0.75s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: phase === "exiting" ? "none" : "auto",
        }}
      >
        {/* Background grid */}
        <div
          suppressHydrationWarning
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(20,184,166,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(20,184,166,.06) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Scanline sweep */}
        <div
          suppressHydrationWarning
          className="tm-scanline-m absolute left-0 right-0 h-36 pointer-events-none"
          style={{ background: "linear-gradient(to bottom,transparent,rgba(20,184,166,.05),transparent)" }}
        />

        {/* Ambient glow */}
        <div
          suppressHydrationWarning
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] pointer-events-none"
          style={{ width: 640, height: 640, background: "radial-gradient(circle,rgba(20,184,166,.14),rgba(6,182,212,.08),transparent 68%)" }}
        />
        <div
          suppressHydrationWarning
          className="absolute bottom-1/4 right-1/4 rounded-full blur-[90px] pointer-events-none"
          style={{ width: 320, height: 320, background: "rgba(6,182,212,.05)" }}
        />

        {/* ════════════ Orbital System ════════════ */}
        <div suppressHydrationWarning className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>

          {/* Ring 1 — outermost, slow CW, dashed teal */}
          <div
            suppressHydrationWarning
            className="tm-cw-20 absolute rounded-full"
            style={{ inset: 0, border: "1px dashed rgba(20,184,166,.35)" }}
          >
            {/* Satellite A */}
            <div
              suppressHydrationWarning
              className="absolute rounded-full"
              style={{
                width: 10, height: 10, background: "#14b8a6",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%) translateX(150px)",
                boxShadow: "0 0 10px #14b8a6,0 0 22px rgba(20,184,166,.55)",
              }}
            />
          </div>

          {/* Ring 2 — medium CCW, solid cyan */}
          <div
            suppressHydrationWarning
            className="tm-ccw-16 absolute rounded-full"
            style={{ inset: 32, border: "1px solid rgba(6,182,212,.45)" }}
          >
            {/* Satellite B */}
            <div
              suppressHydrationWarning
              className="absolute rounded-full"
              style={{
                width: 8, height: 8, background: "#06b6d4",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%) translateX(118px)",
                boxShadow: "0 0 8px #06b6d4,0 0 18px rgba(6,182,212,.55)",
              }}
            />
          </div>

          {/* Ring 3 — fast CW, solid emerald */}
          <div
            suppressHydrationWarning
            className="tm-cw-12 absolute rounded-full"
            style={{ inset: 64, border: "1.5px solid rgba(16,185,129,.5)" }}
          >
            {/* Satellite C */}
            <div
              suppressHydrationWarning
              className="absolute rounded-full"
              style={{
                width: 6, height: 6, background: "#10b981",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%) translateX(86px)",
                boxShadow: "0 0 6px #10b981,0 0 14px rgba(16,185,129,.55)",
              }}
            />
          </div>

          {/* Ring 4 — slow CCW, innermost */}
          <div
            suppressHydrationWarning
            className="tm-ccw-10 absolute rounded-full"
            style={{ inset: 94, border: "1px solid rgba(20,184,166,.22)" }}
          />

          {/* Radar sweep — conic gradient rotating */}
          <div
            suppressHydrationWarning
            className="tm-radar-sw absolute rounded-full pointer-events-none"
            style={{
              inset: 0,
              background: "conic-gradient(from 0deg,transparent 0deg,rgba(20,184,166,.18) 45deg,rgba(20,184,166,.06) 65deg,transparent 66deg)",
            }}
          />

          {/* Degree tick marks on outer ring */}
          {TICK_DEGS.map((deg) => (
            <div
              suppressHydrationWarning
              key={deg}
              className="absolute rounded-full"
              style={{
                width: deg % 90 === 0 ? 2 : 1,
                height: deg % 90 === 0 ? 12 : 7,
                top: "50%", left: "50%",
                transformOrigin: "0 0",
                transform: `rotate(${deg}deg) translateX(148px) translateY(-50%)`,
                background: deg % 90 === 0 ? "rgba(20,184,166,.85)" : "rgba(20,184,166,.3)",
                boxShadow: deg % 90 === 0 ? "0 0 6px rgba(20,184,166,.65)" : "none",
              }}
            />
          ))}

          {/* Central glowing core */}
          <div
            suppressHydrationWarning
            className="tm-core-gl relative flex items-center justify-center rounded-full border z-10"
            style={{
              width: 92, height: 92,
              background: "radial-gradient(circle at 38% 35%,rgba(20,184,166,.32),rgba(2,20,30,.95) 72%)",
              borderColor: "rgba(20,184,166,.65)",
            }}
          >
            <Satellite
              style={{
                width: 34, height: 34,
                color: "#5eead4",
                filter: "drop-shadow(0 0 10px #14b8a6) drop-shadow(0 0 22px rgba(20,184,166,.5))",
              }}
            />
          </div>
        </div>

        {/* ════════════ Text Block ════════════ */}
        <div suppressHydrationWarning className="mt-10 flex flex-col items-center gap-3 text-center px-6">

          {/* Brand name */}
          <div suppressHydrationWarning className="flex items-center gap-3">
            <div
              suppressHydrationWarning
              className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0"
              style={{ borderColor: "rgba(20,184,166,.5)", background: "rgba(20,184,166,.12)" }}
            >
              <Globe style={{ width: 13, height: 13, color: "#5eead4" }} />
            </div>
            <span
              suppressHydrationWarning
              className="text-xl font-black font-mono tracking-[0.3em] uppercase"
              style={{
                background: "linear-gradient(135deg,#14b8a6 0%,#06b6d4 50%,#34d399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 12px rgba(20,184,166,.5))",
              }}
            >
              TERRAMETRICS
            </span>
          </div>

          {/* System badge */}
          <div
            suppressHydrationWarning
            className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase"
            style={{
              border: "1px solid rgba(20,184,166,.3)",
              background: "rgba(20,184,166,.08)",
              color: "#5eead4",
            }}
          >
            <div
              suppressHydrationWarning
              className="w-1.5 h-1.5 rounded-full tm-ld1"
              style={{ background: "#14b8a6", boxShadow: "0 0 6px #14b8a6" }}
            />
            Earth Observation System · NASA MERRA-2
          </div>

          {/* Cycling status text */}
          <p
            suppressHydrationWarning
            className="text-xs font-mono tracking-wide"
            style={{ color: "#94a3b8", minHeight: "1.5em", transition: "opacity 0.3s ease" }}
          >
            {STATUS_LINES[statusIdx]}
          </p>

          {/* Loading dots */}
          <div suppressHydrationWarning className="flex items-center gap-2 mt-1">
            {(["tm-ld1", "tm-ld2", "tm-ld3", "tm-ld4"] as const).map((cls, i) => (
              <div
                suppressHydrationWarning
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${cls}`}
                style={{ background: "#14b8a6", boxShadow: "0 0 5px #14b8a6" }}
              />
            ))}
          </div>
        </div>

        {/* ════════════ Bottom HUD bar ════════════ */}
        <div
          suppressHydrationWarning
          className="absolute bottom-5 left-0 right-0 flex items-center justify-between px-8 font-mono"
          style={{ fontSize: 10, color: "#334155" }}
        >
          <span>SYS.VER 2026.1 · ORBITAL CONSOLE</span>
          <span suppressHydrationWarning className="flex items-center gap-1.5">
            <span
              suppressHydrationWarning
              className="inline-block w-1.5 h-1.5 rounded-full tm-ld2"
              style={{ background: "#14b8a6", boxShadow: "0 0 4px #14b8a6" }}
            />
            M2TMNXFLX v5.12.4 · ONLINE
          </span>
          <span>MERRA-2 · 2005–2025</span>
        </div>

        {/* Corner HUD marks */}
        {CORNER_STYLES.map((style, i) => (
          <div key={i} suppressHydrationWarning className="absolute w-5 h-5" style={style} />
        ))}
      </div>
    </>
  );
}
