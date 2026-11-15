"use client";

import React from "react";
import Link from "next/link";
import { Scale, FileCheck, AlertTriangle, ShieldCheck, ArrowLeft, Globe } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div
      suppressHydrationWarning
      className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12"
    >
      {/* Header */}
      <div className="space-y-4 pt-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-600 dark:text-cyan-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Earth Trend Detective Dashboard</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
            <Scale className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-600 dark:text-cyan-400 block">
              TERMS OF USE & SCIENTIFIC CITATION
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white">
              Terms of Service
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
          Last Updated: NASA Space Apps Challenge 2026 • Platform: Earth Trend Detective • Team: TECH MAVERICKS
        </p>
      </div>

      {/* Core Terms Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-teal-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase">
            <Globe className="w-4 h-4" />
            Open-Access Research
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            Permitted for academic inquiry, classroom demonstration, climate literacy, and non-commercial public research.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-teal-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase">
            <FileCheck className="w-4 h-4" />
            Citation Mandate
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            Must cite NASA Giovanni MERRA-2 and Team TECH MAVERICKS when reproducing visualizations or decadal trend values.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs uppercase">
            <AlertTriangle className="w-4 h-4" />
            Scientific Scope
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            Presents historical decadal linear trends; not intended for real-time tactical meteorology or emergency response.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
        {/* Section 1 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            1. Acceptance of Terms & Educational Purpose
          </h2>
          <p>
            By accessing or interacting with the <strong>Earth Trend Detective</strong> system, you acknowledge and agree to abide by these Terms of Service. This web platform was created by <strong>Team TECH MAVERICKS</strong> as an official submission for the NASA Space Apps Challenge (&quot;Be an Earth Trend Detective&quot;). All features are provided strictly for educational, scientific evaluation, and research demonstration purposes.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            2. Scientific Disclaimers & Meteorological Projections
          </h2>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-mono space-y-2">
            <div className="font-bold uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              IMPORTANT SCIENTIFIC NOTICE REGARDING REGRESSION MODELS
            </div>
            <p className="font-sans leading-relaxed">
              The regression slopes, rate-of-change metrics, and decadal curves rendered on this platform represent retrospective statistical models (Ordinary Least Squares regression over 2005–2025 satellite reanalysis records). They do NOT constitute operational weather forecasts, numerical weather predictions (NWP), or real-time life-safety meteorological advisories. Official meteorological alerts must always be verified through national meteorological organizations.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            3. Data Attribution & Citation Guidelines
          </h2>
          <p>
            When utilizing images, exported CSV files, or analytics generated by Earth Trend Detective in academic papers, slide decks, or public articles, you agree to include proper attribution:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
            <code>
              &quot;Earth Trend Detective: Decadal Earth Observation Telemetry by Team TECH MAVERICKS. Data source: NASA Goddard Earth Sciences (GES DISC) MERRA-2 (M2TMNXFLX v5.12.4). Created for NASA Space Apps Challenge.&quot;
            </code>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            4. Intellectual Property & Open-Source Rights
          </h2>
          <p>
            The custom frontend architecture, 3D WebGL presentation algorithms, interactive Recharts integrations, and visual assets developed specifically for Earth Trend Detective remain the intellectual property of <strong>Team TECH MAVERICKS</strong>. The project is distributed under open-access permissive licensing for educational evaluation by NASA judges and the broader scientific community.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            5. Modifications & Continuous Improvement
          </h2>
          <p>
            Team TECH MAVERICKS reserves the right to calibrate, update, or expand datasets, city coordinates, or regression algorithms as new NASA satellite reanalysis epochs become available through GES DISC and AppEEARS portals.
          </p>
        </div>
      </div>
    </div>
  );
}