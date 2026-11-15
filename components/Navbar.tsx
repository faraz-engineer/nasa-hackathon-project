"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Globe,
  Satellite,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

interface NavLinkItem {
  name: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "Dashboard", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Docs & Pitch", href: "/docs" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent hydration mismatch on theme switcher
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <header
      suppressHydrationWarning
      className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200"
    >
      {/* Top glowing ambient cyan line */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-hidden"
          aria-label="Earth Trend Detective Dashboard"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/30 group-hover:border-cyan-400/60 shadow-[0_0_15px_rgba(20,184,166,0.15)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300">
            <Globe className="w-5 h-5 text-teal-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm tracking-wider text-slate-900 dark:text-white uppercase group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                EARTH TREND DETECTIVE
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/25">
                TECH MAVERICKS
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 tracking-tight hidden md:inline">
              NASA Earth Science Telemetry & Orbital Analytics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-cyan-700 dark:text-cyan-300 bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/30 dark:border-cyan-400/30 shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[11px] left-2 right-2 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Theme Toggle + Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Button */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
              aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          )}

          {/* NASA Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-[10px] font-mono text-teal-700 dark:text-teal-300">
            <Satellite className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>NASA GIOVANNI</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-900 dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div
          suppressHydrationWarning
          className="md:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-4 py-4 space-y-1.5 shadow-2xl transition-all"
        >
          <div className="pb-2 mb-2 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span>TEAM TECH MAVERICKS</span>
            <span className="text-teal-600 dark:text-teal-400 font-bold">
              EARTH TREND DETECTIVE
            </span>
          </div>

          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-300 bg-teal-500/10 border border-teal-500/30 shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}