"use client";

import React from "react";
import Link from "next/link";
import {
  Satellite,
  Compass,
  Users,
  Code2,
  Database,
  PenTool,
  Video,
  ShieldCheck,
  TrendingUp,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Award,
} from "lucide-react";

interface TeamMember {
  name: string;
  country: string;
  flag: string;
  callsign: string;
  role: string;
  specialties: string[];
  bio: string;
  icon: React.ElementType;
  gradient: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Faraz",
    country: "Pakistan",
    flag: "🇵🇰",
    callsign: "The Captain",
    role: "Lead Developer & Project Manager & UI/UX Designer",
    specialties: [
      "Next.js App Router",
      "Supabase Architecture",
      "3D WebGL / Globe Visualizations",
      "GSAP Kinetic Animations",
      "Statistical Integrity Audits",
    ],
    bio: "Steers the overall technical architecture, sprint velocity, and full-stack implementation. Spearheads responsive 3D satellite visualization pipelines, client-side linear regression calculations, and strict data validation to guarantee precision in Earth trend observation.",
    icon: Code2,
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
  },
  {
    name: "Ali Hassan & Sheraz Manzoor",
    country: "Pakistan",
    flag: "🇵🇰",
    callsign: "The Data Engine",
    role: "Data Scientists & Reanalysis Analysts",
    specialties: [
      "NASA Giovanni Extraction",
      "AppEEARS Satellite Pipeline",
      "Decadal LST Modeling",
      "Ordinary Least Squares Regression",
      "Anomaly Signal Filtration",
    ],
    bio: "Serves as the analytical backbone of the detective platform. Systematically harvested, cleaned, and cross-calibrated 20 continuous years (2005–2025) of MERRA-2 Land Surface Temperature records, deriving empirical slopes and evaluating variance metrics across high-vulnerability urban biomes.",
    icon: Database,
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    name: "Musadiq Hussain",
    country: "Pakistan",
    flag: "🇵🇰",
    callsign: "The Voice",
    role: "Storyteller & Technical Writer",
    specialties: [
      "NASA Investigative Case Files",
      "Climate Risk Narrative",
      "GitHub Architecture & Docs",
      "Scientific Translation",
      "Policy Context Synthesis",
    ],
    bio: "Transforms dense statistical arrays into compelling, human-centered narratives. Authored the investigative Case Files translating fractional decadal temperature deltas into tangible public health, agricultural, and urban heat island impacts for judges and policymakers alike.",
    icon: PenTool,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    name: "Momin Shabir & Muhammad Aitzaz",
    country: "Pakistan",
    flag: "🇵🇰",
    callsign: "The Pitch Crew",
    role: "Video Production & Presentation Specialists",
    specialties: [
      "2-Minute Mission Pitch",
      "NASA Visual Editing & Motion",
      "Executive Scriptwriting",
      "Live Software Demonstration",
      "High-Fidelity Audio Mastering",
    ],
    bio: "Drives the global pitch by distilling the team's months of satellite inquiry into a cinematic 2-minute showcase. Engineered punchy visual rhythm, authoritative on-camera delivery, and seamless integration between live web console footage and authentic NASA Earth imagery.",
    icon: Video,
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
  },
];

export default function AboutPage() {
  return (
    <div
      suppressHydrationWarning
      className="w-full min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16"
    >
      {/* 1. Header & Mission Hero */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-cyan-300 bg-teal-500/10 border border-teal-500/25">
          <Satellite className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>NASA SPACE APPS CHALLENGE // TEAM TECH MAVERICKS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
          Meet Team{" "}
          <span className="bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            TECH MAVERICKS
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-3xl">
          We are an international multidisciplinary team of software engineers, data scientists,
          storytellers, and creative producers united by a singular mission: converting complex,
          high-volume NASA Earth observation and orbital telemetry streams into actionable,
          intuitive climate and space-sustainability intelligence.
        </p>
      </div>

      {/* 2. The Challenge Dedicated Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent border border-teal-500/30 dark:border-teal-400/20 shadow-xl relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-teal-500/20">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-teal-700 dark:text-cyan-400">
              MISSION BRIEFING
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-teal-600 dark:text-cyan-400" />
              The Challenge: Be an Earth Trend Detective
            </h2>
          </div>

          <div className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/20 text-teal-800 dark:text-cyan-300 border border-teal-500/40">
            DIRECTIONAL EARTH SCIENCE TELEMETRY
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center font-mono font-black text-xs text-teal-600 dark:text-cyan-400">
              01
            </div>
            <h3 className="font-mono font-bold text-sm text-slate-900 dark:text-white">
              What Is Changing?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Detecting directional shifts across Earth system parameters — specifically Land Surface Temperature (LST), canopy cover, and urban heat radiation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-black text-xs text-cyan-600 dark:text-cyan-400">
              02
            </div>
            <h3 className="font-mono font-bold text-sm text-slate-900 dark:text-white">
              Where Is It Changing?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Pinpointing exact geographic focal points with high-resolution coordinates across major South Asian vulnerability centers (Multan, Lahore, Islamabad, Karachi).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-black text-xs text-emerald-600 dark:text-emerald-400">
              03
            </div>
            <h3 className="font-mono font-bold text-sm text-slate-900 dark:text-white">
              By How Much?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Quantifying empirical rates of change using linear regression slopes (annual change in °C/year and Kelvin/year) across two decades of observations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center font-mono font-black text-xs text-purple-600 dark:text-purple-400">
              04
            </div>
            <h3 className="font-mono font-bold text-sm text-slate-900 dark:text-white">
              Is It Significant?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Separating genuine climate drift from short-term anomaly fluctuations (such as the widespread 2020 pandemic dip) through rigorous baseline modeling.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Team Lineup Grid (4 Distinct Cards) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-teal-600 dark:text-cyan-400 uppercase tracking-widest mb-1">
              <Users className="w-4 h-4" />
              <span>ROSTER & SPECIALIZATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
              The Tech Mavericks Lineup
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            4 Core Divisions • 1 Unified Space Mission
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM_MEMBERS.map((member) => {
            const Icon = member.icon;

            return (
              <div
                key={member.callsign}
                className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:border-teal-500/40 dark:hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between gap-6 group relative overflow-hidden"
              >
                {/* Subtle top corner gradient */}
                <div
                  aria-hidden="true"
                  className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${member.gradient} rounded-bl-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}
                />

                <div className="space-y-4">
                  {/* Top Bar: Icon, Callsign & Country Flag */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/10 dark:bg-slate-800 border border-teal-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6 text-teal-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-cyan-400">
                            {member.callsign}
                          </span>
                          <span
                            title={member.country}
                            className="text-base"
                            aria-label={member.country}
                          >
                            {member.flag}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black font-mono text-slate-900 dark:text-white leading-tight">
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                      {member.country}
                    </span>
                  </div>

                  {/* Primary Role */}
                  <div className="text-xs font-mono font-semibold text-teal-800 dark:text-teal-300">
                    {member.role}
                  </div>

                  {/* Bio Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {member.bio}
                  </p>
                </div>

                {/* Specialties Tag Cloud */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                    Core Technical Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Methodology & Data Sources */}
      <div className="rounded-3xl p-6 sm:p-8 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-6">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
          <h2 className="text-xl font-black font-mono text-slate-900 dark:text-white">
            Data Engineering & Scientific Methodology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-teal-600 dark:text-cyan-400 font-bold block uppercase">
              1. NASA Giovanni Pipeline
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Primary sensor feeds extracted from the Goddard Earth Sciences Data and Information
              Services Center (GES DISC). Harvested continuous MERRA-2 monthly Land Surface Temperature
              products across 2005 through 2025.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-teal-600 dark:text-cyan-400 font-bold block uppercase">
              2. Ordinary Least Squares (OLS)
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Computed decadal regression slopes (m = &Delta;T / &Delta;year) with
              Kelvin and Celsius normalization to quantify the real-world trajectory of regional warming,
              neutrality, or cooling trends.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-teal-600 dark:text-cyan-400 font-bold block uppercase">
              3. Interactive 3D WebGL Visualization
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Architected with Next.js 16 App Router, Three.js / React-Globe.gl, and Recharts, providing
              judges with fluid, client-side exploration, multi-city comparative deltas, and automated anomaly callouts.
            </p>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs font-mono text-slate-500">
            Ready to explore the live telemetry and documentation?
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-teal-600 hover:bg-teal-500 text-white transition-colors flex items-center gap-2 shadow-md shadow-teal-500/20"
            >
              <span>Launch 3D Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/docs"
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
            >
              View Whitepaper & Pitch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}