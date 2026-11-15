"use client";

import React from "react";
import Link from "next/link";
import { Globe, Satellite, ExternalLink, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      suppressHydrationWarning
      className="mt-auto w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                <Globe className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
              </div>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white tracking-wider">
                EARTH TREND DETECTIVE
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/25">
                TECH MAVERICKS
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Empirical Earth system directional change detection platform engineered for the
              NASA Space Apps Challenge. Decoding 20-year satellite land surface temperature shifts
              and orbital sustainability with mathematical rigor.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-teal-700 dark:text-teal-400">
              <Satellite className="w-3.5 h-3.5 text-cyan-400" />
              <span>NASA Giovanni MERRA-2 (M2TMNXFLX v5.12.4)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Platform Navigation
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <Link
                  href="/"
                  className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
                >
                  3D Satellite Console
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
                >
                  About Team Tech Mavericks
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
                >
                  Technical Docs & Pitch
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Science */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Legal & Open Science
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://giovanni.gsfc.nasa.gov/giovanni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
                >
                  <span>NASA Giovanni Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Integrity Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>
              Engineered by <strong className="text-slate-800 dark:text-slate-200">Team TECH MAVERICKS</strong> for NASA Space Apps Challenge
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Open-Access Research & Educational License © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}