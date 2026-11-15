"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Sun,
  Moon,
  Satellite,
  Compass,
  Activity,
  ShieldCheck,
} from "lucide-react";

// Ensure GSAP plugins are registered safely on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export interface HeroSectionProps {
  /** Optional callback fired when the user clicks 'Start Investigation' */
  onStartInvestigation?: () => void;
  /** Anchor ID to scroll smoothly to if no callback is supplied (defaults to 'investigate') */
  targetSectionId?: string;
  /** Optional additional CSS class for the section wrapper */
  className?: string;
  /** Toggle visibility of the floating top telemetry bar with dark/light mode switcher */
  showThemeToggle?: boolean;
}

export default function HeroSection({
  onStartInvestigation,
  targetSectionId = "investigate",
  className = "",
  showThemeToggle = true,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const telemetryStatsRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleCtaClick = () => {
    if (onStartInvestigation) {
      onStartInvestigation();
      return;
    }
    const targetElement = document.getElementById(targetSectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      // Master entrance animation timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. Initial background reveals
      tl.from(".hero-bg-elem", {
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
      })
        .from(
          ".hero-ambient-orb",
          {
            opacity: 0,
            scale: 0.75,
            duration: 1.6,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=1.1"
        )
        // 2. Text elements staggered slide-up and fade-in (y: 50, opacity: 0 to y: 0, opacity: 1)
        .from(
          [badgeRef.current, headingRef.current, subHeadingRef.current],
          {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.18,
            ease: "power3.out",
          },
          "-=1.0"
        )
        // 3. CTA button fades in smoothly AFTER the text finishes animating
        .from(
          ctaContainerRef.current,
          {
            y: 30,
            opacity: 0,
            scale: 0.94,
            duration: 0.85,
            ease: "back.out(1.6)",
          },
          "+=0.1" // Sequenced strictly after the text elements finish
        )
        // 4. Subtle telemetry chips entrance
        .from(
          telemetryStatsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Continuous ambient float for blurred glowing orbs
      gsap.to(".hero-orb-1", {
        x: "+=35",
        y: "-=25",
        scale: 1.06,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orb-2", {
        x: "-=30",
        y: "+=30",
        scale: 0.95,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Ambient radar orbit breath
      gsap.to(".hero-radar-ring", {
        scale: 1.03,
        opacity: 0.5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      suppressHydrationWarning
      className={`relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300 select-none ${className}`}
    >
      {/* =========================================================================
          BACKGROUND ELEMENTS: Subtle Grid, Glowing Orbs, and Orbital Rings
          ========================================================================= */}

      {/* Layer 1: Ambient Grid with Radial Vignette */}
      <div
        suppressHydrationWarning
        className="hero-bg-elem absolute inset-0 pointer-events-none opacity-50 dark:opacity-30 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)]"
      >
        <div
          suppressHydrationWarning
          className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a12_1px,transparent_1px),linear-gradient(to_bottom,#0f172a12_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#38bdf818_1px,transparent_1px),linear-gradient(to_bottom,#38bdf818_1px,transparent_1px)] bg-[size:44px_44px]"
        />
      </div>

      {/* Layer 2: Primary Glowing Orb (Teal / Emerald Satellite Atmosphere) */}
      <div
        aria-hidden="true"
        suppressHydrationWarning
        className="hero-ambient-orb hero-orb-1 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] h-[340px] sm:h-[580px] rounded-full bg-gradient-to-tr from-teal-400/25 via-emerald-400/20 to-cyan-500/20 dark:from-teal-500/20 dark:via-emerald-500/20 dark:to-cyan-400/15 blur-[110px] pointer-events-none"
      />

      {/* Layer 3: Secondary Glowing Orb (Deep Oceanic / Atmospheric Blue) */}
      <div
        aria-hidden="true"
        suppressHydrationWarning
        className="hero-ambient-orb hero-orb-2 absolute bottom-1/4 right-1/6 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full bg-gradient-to-bl from-cyan-400/20 via-blue-500/15 to-transparent dark:from-cyan-600/15 dark:via-blue-600/10 dark:to-transparent blur-[100px] pointer-events-none"
      />

      {/* Layer 4: Orbital Radar Rings (Subtle NASA Geometry) */}
      <div
        aria-hidden="true"
        suppressHydrationWarning
        className="hero-bg-elem hero-radar-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full border border-teal-500/10 dark:border-teal-400/10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        suppressHydrationWarning
        className="hero-bg-elem hero-radar-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] sm:w-[1250px] h-[900px] sm:h-[1250px] rounded-full border border-cyan-500/5 dark:border-cyan-400/5 pointer-events-none"
      />

      {/* Optional Top Telemetry Bar with Theme Toggle */}
      {showThemeToggle && (
        <header
          suppressHydrationWarning
          className="absolute top-6 left-0 right-0 z-20 px-6 sm:px-10 flex items-center justify-between pointer-events-auto"
        >
          <div
            suppressHydrationWarning
            className="flex items-center gap-2.5 text-xs font-mono tracking-widest text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-xs"
          >
            <Satellite className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              TERRAMETRICS
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline">SYS.VER.2026.4</span>
          </div>

          <button
            suppressHydrationWarning
            onClick={() => setTheme(resolvedTheme === "dark" || (!resolvedTheme && theme === "dark") ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 backdrop-blur-md shadow-xs hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
            aria-label="Toggle Dark/Light Mode"
            title="Toggle Dark/Light Mode"
          >
            <Sun className="w-4 h-4 text-amber-400 hidden dark:block" />
            <Moon className="w-4 h-4 text-slate-700 dark:hidden block" />
          </button>
        </header>
      )}

      {/* =========================================================================
          HERO CONTENT: Badge, Massive Heading, Sub-heading, and Glowing CTA
          ========================================================================= */}
      <div
        suppressHydrationWarning
        className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center justify-center"
      >
        {/* 1. Subtle Overhead Badge */}
        <div ref={badgeRef} suppressHydrationWarning className="will-change-transform mb-6">
          <div
            suppressHydrationWarning
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide border border-teal-500/30 dark:border-teal-400/30 bg-teal-50/70 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 backdrop-blur-md shadow-xs shadow-teal-500/10"
          >
            <span className="relative flex h-2 w-2" suppressHydrationWarning>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
              NASA Space Apps Challenge 2026
            </span>
          </div>
        </div>

        {/* 2. Massive, Bold Gradient-Colored Main Heading */}
        <h1
          ref={headingRef}
          suppressHydrationWarning
          className="will-change-transform text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-balance max-w-4xl"
        >
          <span className="bg-gradient-to-b from-slate-950 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            Investigate Earth&apos;s{" "}
          </span>
          <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-500 dark:from-teal-300 dark:via-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Climate Anomalies.
          </span>
        </h1>

        {/* 3. Sleek, Readable Sub-Heading (max-w-2xl) */}
        <p
          ref={subHeadingRef}
          suppressHydrationWarning
          className="will-change-transform mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed text-balance"
        >
          Analyze 20 years of satellite data. Compare global environmental
          shifts, track deforestation, and decode regional heatwaves with
          mathematical precision.
        </p>

        {/* 4. Glowing, Modern Primary Call to Action Button */}
        <div
          ref={ctaContainerRef}
          suppressHydrationWarning
          className="will-change-transform mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            suppressHydrationWarning
            onClick={handleCtaClick}
            className="group relative inline-flex items-center justify-center cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            aria-label="Start Investigation"
          >
            {/* Outer Radiant Glow Aura */}
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 opacity-70 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-2xl dark:opacity-45 dark:group-hover:opacity-85"
            />

            {/* Core Glowing Button Surface */}
            <span className="relative flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base sm:text-lg text-white bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 dark:from-teal-500 dark:via-emerald-500 dark:to-cyan-500 shadow-lg shadow-teal-500/25 dark:shadow-teal-950/60 transition-all duration-300 ease-out hover:scale-105 active:scale-95 border border-white/20">
              <span>Start Investigation</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </span>
          </button>
        </div>

        {/* 5. Sleek Telemetry Badges / Indicator Strip */}
        <div
          ref={telemetryStatsRef}
          suppressHydrationWarning
          className="will-change-transform mt-14 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
        >
          <div
            suppressHydrationWarning
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xs"
          >
            <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>20+ Yrs MODIS / Landsat</span>
          </div>

          <div
            suppressHydrationWarning
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xs"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Global Coverage</span>
          </div>

          <div
            suppressHydrationWarning
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Mathematical Rigor</span>
          </div>
        </div>
      </div>

      {/* Decorative Bottom HUD Coordinate Corner Markers */}
      <div
        aria-hidden="true"
        suppressHydrationWarning
        className="absolute bottom-6 left-6 hidden lg:flex items-center gap-2 font-mono text-[10px] text-slate-400 dark:text-slate-600 pointer-events-none"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500/50" />
        <span>ORBIT: 705 KM | INC: 98.2° SUN-SYNCHRONOUS</span>
      </div>

      <div
        aria-hidden="true"
        suppressHydrationWarning
        className="absolute bottom-6 right-6 hidden lg:flex items-center gap-2 font-mono text-[10px] text-slate-400 dark:text-slate-600 pointer-events-none"
      >
        <span>LAT 00°00&apos;00&quot;N / LON 00°00&apos;00&quot;E</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
      </div>
    </section>
  );
}
