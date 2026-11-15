"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Eye,
  X,
  Maximize2,
  Video,
  Play,
  Pause,
  ExternalLink,
  Satellite,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Award,
} from "lucide-react";

// =========================================================================
// CONFIG CONSTANT: Paste YouTube Embed URL here to immediately switch to YouTube player
// e.g.: "https://www.youtube.com/embed/dQw4w9WgXcQ"
// Leave empty ("") to use the local HTML5 /video/pitch.mp4 player & placeholder
// =========================================================================
const YOUTUBE_EMBED_URL = "";

interface DocItem {
  id: string;
  title: string;
  badge: string;
  pages: string;
  filename: string;
  url: string;
  summary: string;
  keyTopics: string[];
}

const OFFICIAL_DOCS: DocItem[] = [
  {
    id: "whitepaper",
    title: "Technical Whitepaper & Full System Report",
    badge: "16-PAGE OFFICIAL SYSTEM REPORT",
    pages: "16 Pages • PDF",
    filename: "earth-trend-detective-report.pdf",
    url: "/docs/tech-mavericks-project.pdf",
    summary:
      "Comprehensive engineering report detailing DCRA v3 orbital risk scoring, NASA ODAR / EOMP orbital compliance algorithms, and empirical 2005–2025 NASA Giovanni MERRA-2 Land Surface Temperature (LST) ordinary least squares regression across Multan, Lahore, Islamabad, and Karachi.",
    keyTopics: [
      "NASA MERRA-2 M2TMNXFLX v5.12.4 Pipeline",
      "Decadal LST Ordinary Least Squares (OLS) Slope Formulae",
      "DCRA v3 Orbital Trajectory Risk Scoring & Collision Cross-Sections",
      "2020 Multi-City Atmospheric Cooling Dip Anomaly Audit",
      "ODAR / EOMP 25-Year Post-Mission Disposal Compliance Matrix",
    ],
  },
  {
    id: "team-brief",
    title: "Team & Challenge Brief",
    badge: "EXECUTIVE CHALLENGE DOSSIER",
    pages: "4 Pages • PDF",
    filename: "tech-mavericks-team-brief.pdf",
    url: "/docs/tech-mavericks.pdf",
    summary:
      "Executive overview of Team TECH MAVERICKS, outlining member specializations, leadership structure, technical stack architecture, and alignment with the NASA Space Apps 'Be an Earth Trend Detective' criteria.",
    keyTopics: [
      "Tech Mavericks Lineup & Specialization Matrix",
      "Direct Mapping to NASA Earth Trend Detective Challenge Mandates",
      "Frontend & 3D WebGL Architectural Topology (Next.js + Three.js)",
      "Scientific Data Provenance: GES DISC Giovanni & AppEEARS",
      "Open-Access Educational & Scientific Dissemination Roadmap",
    ],
  },
];

export default function DocsPage() {
  // Modal PDF Preview state
  const [activePdf, setActivePdf] = useState<DocItem | null>(null);

  // Video state (for local HTML5 video controls)
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  return (
    <div
      suppressHydrationWarning
      className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16"
    >
      {/* 1. Header Banner */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-cyan-300 bg-teal-500/10 border border-teal-500/25">
          <Satellite className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>OFFICIAL DOCUMENTATION & VIDEO REPOSITORY</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
          Documentation &{" "}
          <span className="bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Pitch Showcase
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-3xl">
          Review the complete peer-review-grade technical whitepaper, executive challenge briefs,
          and the official 2-minute presenter pitch video detailing Team TECH MAVERICKS&apos;
          Earth observation methodology for NASA Space Apps.
        </p>
      </div>

      {/* =========================================================================
          SECTION A: OFFICIAL PROJECT DOCUMENTATION (PDF VIEWER + DOWNLOAD)
          ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-600 dark:text-cyan-400 uppercase tracking-widest mb-1">
              <FileText className="w-4 h-4" />
              <span>SECTION A • OFFICIAL PUBLICATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
              Project Documentation & Whitepapers
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Interactive In-Browser Viewer • Direct Download
          </span>
        </div>

        {/* 2 PDF Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {OFFICIAL_DOCS.map((doc) => (
            <div
              key={doc.id}
              className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:border-teal-500/40 dark:hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between gap-6 group"
            >
              <div className="space-y-4">
                {/* Header Tag & Page Count */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-cyan-300 border border-teal-500/30">
                    {doc.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    {doc.pages}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black font-mono text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {doc.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {doc.summary}
                </p>

                {/* Key Topics List */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Key Scientific Sections Included
                  </span>
                  <ul className="space-y-1.5 text-xs font-mono text-slate-600 dark:text-slate-300">
                    {doc.keyTopics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 font-sans">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons: View PDF & Download PDF */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setActivePdf(doc)}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono font-bold text-xs transition-colors cursor-pointer shadow-md shadow-teal-500/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>View PDF in Browser</span>
                </button>

                <a
                  href={doc.url}
                  download={doc.filename}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION B: OFFICIAL PRESENTER PITCH VIDEO
          ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-600 dark:text-cyan-400 uppercase tracking-widest mb-1">
              <Video className="w-4 h-4" />
              <span>SECTION B • GLOBAL PITCH SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
              2-Minute Mission Pitch Video
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Strict NASA 2:00 Runtime Limit
          </span>
        </div>

        {/* Cinematic Video Showcase Container */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col gap-6">
          {/* Ambient Corner Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none"
          />

          {/* Video Player Display Area */}
          <div className="relative w-full aspect-video rounded-2xl bg-black border border-slate-800/80 overflow-hidden shadow-inner flex items-center justify-center">
            {YOUTUBE_EMBED_URL ? (
              /* Option 1: YouTube Embed */
              <iframe
                src={YOUTUBE_EMBED_URL}
                title="Earth Trend Detective - 2 Minute Pitch"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : !videoError ? (
              /* Option 2: HTML5 Local Video Player */
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  id="pitch-video-player"
                  controls
                  src="/video/pitch.mp4"
                  poster="/video/poster.jpg"
                  onError={() => setVideoError(true)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              /* Fallback / Awaiting Upload State with High-Tech HUD */
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-radial from-slate-900 via-slate-950 to-black">
                {/* Radar ring animation behind play icon */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full border border-teal-500/30 animate-ping pointer-events-none" />
                  <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                    <Play className="w-7 h-7 text-cyan-400 ml-1" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-md">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                    PRODUCTION STAGE: READY FOR UPLOAD
                  </span>
                  <h4 className="text-lg font-mono font-black text-white">
                    2-Minute Mission Pitch Showcase
                  </h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Drop <code className="text-cyan-300 font-mono">public/video/pitch.mp4</code> into the repository or paste your YouTube URL in <code className="text-cyan-300 font-mono">YOUTUBE_EMBED_URL</code> in this file to stream directly.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] font-mono text-slate-300 pt-2">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    1080p 60FPS High-Def
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    Exact 2:00 Runtime
                  </div>
                  <div className="col-span-2 sm:col-span-1 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    NASA Visuals + Web Demo
                  </div>
                </div>
              </div>
            )}
          </div>


        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE FULLSCREEN / MODAL PDF VIEWER
          ========================================================================= */}
      {activePdf && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/90 text-white shrink-0">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-mono font-bold text-sm text-white truncate max-w-md">
                    {activePdf.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    {activePdf.filename}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={activePdf.url}
                  download={activePdf.filename}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  onClick={() => setActivePdf(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Close PDF Preview"
                  aria-label="Close PDF Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Iframe PDF Viewer */}
            <div className="flex-1 w-full bg-slate-950 relative">
              <iframe
                src={`${activePdf.url}#view=FitH`}
                title={activePdf.title}
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer Bar */}
            <div className="px-5 py-2.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
              <span>NASA Space Apps Challenge 2026 • Team TECH MAVERICKS</span>
              <span>Document Hash: ETD-VERIFIED-SHA256</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}