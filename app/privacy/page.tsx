"use client";

import React from "react";
import Link from "next/link";
import { Shield, Lock, Eye, Database, FileText, CheckCircle2, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <Shield className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-600 dark:text-cyan-400 block">
              LEGAL COMPLIANCE & TRANSPARENCY
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">
          Effective Date: NASA Space Apps Challenge 2026 • Platform: Earth Trend Detective • Team: TECH MAVERICKS
        </p>
      </div>

      {/* Core Privacy Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-teal-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase">
            <Eye className="w-4 h-4" />
            100% Open Data
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            All Earth observation telemetry visualized on this platform is derived strictly from public, open-access NASA GES DISC and ESA catalogues.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-teal-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase">
            <Lock className="w-4 h-4" />
            Zero Data Monetization
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            We never sell, rent, monetize, or broker personal user records or telemetry interactions to third-party ad networks or data brokers.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-teal-600 dark:text-cyan-400 font-mono font-bold text-xs uppercase">
            <Database className="w-4 h-4" />
            Client-Side State
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
            Dashboard filter preferences, units (°C/K), and dark/light modes are stored exclusively in your browser&apos;s local storage.
          </p>
        </div>
      </div>

      {/* Policy Details Sections */}
      <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
        {/* Section 1 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            1. Nature of the Service & Open Scientific Mission
          </h2>
          <p>
            The Earth Trend Detective platform is an interactive, educational, and research-oriented web dashboard developed by <strong>Team TECH MAVERICKS</strong> for the NASA Space Apps Challenge (&quot;Be an Earth Trend Detective&quot;). Its exclusive objective is to process and communicate planetary observation data, including decadal Land Surface Temperature (LST) and orbital telemetry, for public benefit and open-science discovery.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            2. Public Data Sources & Attribution
          </h2>
          <p>
            The telemetry, coordinates, and decadal values displayed on this application are sourced from authorized open-access scientific repositories:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 font-mono text-xs text-slate-600 dark:text-slate-300">
            <li><strong>NASA Giovanni:</strong> Goddard Earth Sciences Data and Information Services Center (GES DISC) MERRA-2 (M2TMNXFLX v5.12.4).</li>
            <li><strong>NASA / USGS AppEEARS:</strong> Application for Extracting and Exploring Analysis Ready Samples.</li>
            <li><strong>Space-Track.org & ESA DISCOS:</strong> Public two-line element (TLE) orbital ephemerides for orbital risk scoring.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            3. Information We Collect (and What We Do NOT Collect)
          </h2>
          <p>
            We adhere to strict data minimization principles:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold">
              ✕ NO Personal Identifiable Information (PII) required or collected.
            </div>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold">
              ✕ NO user passwords, biometric information, or payment credentials.
            </div>
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold">
              ✓ Anonymous telemetry logs may be generated by edge hosting infrastructure (Vercel) solely for denial-of-service mitigation and uptime monitoring.
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            4. Local Browser Storage & Cookies
          </h2>
          <p>
            This website does not deploy persistent third-party tracking cookies or advertising pixels. We utilize standard browser <code>localStorage</code> purely to remember your UI display settings between sessions:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs font-mono text-slate-600 dark:text-slate-300">
            <li>Selected color mode theme (<code>&apos;light&apos;</code> or <code>&apos;dark&apos;</code>).</li>
            <li>Temperature unit display toggle (<code>&apos;C&apos;</code> for Celsius or <code>&apos;K&apos;</code> for Kelvin).</li>
            <li>Client-side session caching for 3D globe coordinates.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            5. Contact Team TECH MAVERICKS
          </h2>
          <p>
            For scientific inquiries, data provenance verification, or privacy inquiries regarding Earth Trend Detective, please review our official publications on the <Link href="/docs" className="text-teal-600 dark:text-cyan-400 font-mono underline">Documentation Page</Link> or connect with our lead developer Faraz via the official NASA Space Apps project submission portal.
          </p>
        </div>
      </div>
    </div>
  );
}