"use client";

import React, { useState } from "react";
import HeroSection from "@/components/HeroSection";
import EarthGlobe from "@/components/EarthGlobe";
import SidePanel from "@/components/SidePanel";
import {
  Flame,
  TreePine,
  Snowflake,
  Wind,
  Layers,
  Compass,
  Satellite,
  Droplets,
} from "lucide-react";
import type { CityHotspot } from "@/types/hotspot";
import rawHotspotsData from "@/data/hotspotsData.json";

// Typed 4 Pakistani cities from MERRA-2 JSON
const HOTSPOTS_DATA: CityHotspot[] = Object.values(
  rawHotspotsData as Record<string, CityHotspot>
);

export default function Home() {
  // Multan selected by default so the dashboard is immediately active on load
  const [selectedHotspots, setSelectedHotspots] = useState<CityHotspot[]>([
    HOTSPOTS_DATA.find((h) => h.id === "multan") || HOTSPOTS_DATA[0],
  ]);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [focusedCity, setFocusedCity] = useState<CityHotspot | null>(
    HOTSPOTS_DATA.find((h) => h.id === "multan") || HOTSPOTS_DATA[0]
  );

  const filteredHotspots =
    activeFilter === "all"
      ? HOTSPOTS_DATA
      : HOTSPOTS_DATA.filter((h) => {
          if (activeFilter === "warming") return h.id === "multan";
          if (activeFilter === "emission") return h.id === "lahore";
          if (activeFilter === "deforestation") return h.id === "islamabad";
          if (activeFilter === "drought") return h.id === "karachi";
          return true;
        });

  /**
   * Handle hotspot selection: single click selects, or adds to compare if already 1 selected
   */
  const handleHotspotClick = (hotspot: CityHotspot) => {
    setFocusedCity(hotspot);

    const alreadyIndex = selectedHotspots.findIndex((h) => h.id === hotspot.id);
    if (alreadyIndex !== -1) {
      // If already selected, deselect if in comparison mode, or keep selected
      if (selectedHotspots.length > 1) {
        const next = selectedHotspots.filter((h) => h.id !== hotspot.id);
        setSelectedHotspots(next);
      } else {
        setIsPanelOpen(true);
      }
      return;
    }

    if (selectedHotspots.length === 1) {
      // 2 cities selected -> enters compare mode
      setSelectedHotspots([selectedHotspots[0], hotspot]);
      setIsPanelOpen(true);
    } else {
      // Single view
      setSelectedHotspots([hotspot]);
      setIsPanelOpen(true);
    }
  };

  const handleSelectPrimary = (hotspot: CityHotspot) => {
    setSelectedHotspots([hotspot]);
    setFocusedCity(hotspot);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedHotspots([HOTSPOTS_DATA[0]]);
    setFocusedCity(HOTSPOTS_DATA[0]);
  };

  const handleScrollToInvestigation = () => {
    const el = document.getElementById("investigate");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const primaryCity = selectedHotspots[0] || HOTSPOTS_DATA[0];
  const compareCity = selectedHotspots[1] || null;

  return (
    <div
      suppressHydrationWarning
      className="flex flex-col min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300 overflow-x-hidden"
    >
      {/* ================================================
          1. Full-Screen Interactive Hero Section
          ================================================ */}
      <HeroSection onStartInvestigation={handleScrollToInvestigation} />

      {/* ================================================
          2. Main 3D Satellite Globe Investigation Console
          ================================================ */}
      <section
        id="investigate"
        suppressHydrationWarning
        className="relative w-full py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex flex-col gap-10"
      >
        {/* Section Header */}
        <div
          suppressHydrationWarning
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div suppressHydrationWarning>
            <div
              suppressHydrationWarning
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-teal-700 dark:text-teal-300 bg-teal-500/10 border border-teal-500/20 mb-3"
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>EARTH OBSERVATION ORBITAL CONSOLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              Interactive Anomaly Globe
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Rotate, drag, and zoom the 3D Earth model. Click any pulsing radar
              pin to investigate decadal satellite trends. Select two to compare
              side-by-side.
            </p>
          </div>

          {/* Anomaly Category Filter Tabs */}
          <div
            suppressHydrationWarning
            className="flex flex-wrap items-center gap-2"
          >
            {[
              { id: "all", label: "All Anomalies", icon: Layers },
              { id: "warming", label: "Thermal", icon: Flame },
              { id: "deforestation", label: "Canopy", icon: TreePine },
              { id: "ice_melt", label: "Cryosphere", icon: Snowflake },
              { id: "emission", label: "Emissions", icon: Wind },
              { id: "drought", label: "Drought", icon: Droplets },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === id
                    ? "bg-teal-600 text-white shadow-md shadow-teal-500/25"
                    : "bg-slate-200/70 dark:bg-slate-900/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================================================
            3D WebGL Globe Container (Full Width)
            ================================================ */}
        <div
          suppressHydrationWarning
          className="w-full h-[620px] sm:h-[700px] rounded-3xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden flex items-center justify-center"
        >
          {/* Ambient background glow */}
          <div
            suppressHydrationWarning
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[90px] pointer-events-none"
          />

          <EarthGlobe
            hotspots={filteredHotspots}
            selectedCityId={primaryCity.id}
            focusedCity={focusedCity}
            onHotspotClick={handleHotspotClick}
            autoRotate={true}
            autoRotateSpeed={0.5}
            showControls={true}
          />
        </div>

        {/* ================================================
            Off-Canvas Sliding Side Panel (Overlay)
            ================================================ */}
        <SidePanel
          isOpen={isPanelOpen}
          selectedCity={primaryCity}
          compareCity={compareCity}
          allCities={HOTSPOTS_DATA}
          onSelectCity={handleSelectPrimary}
          onSelectCompareCity={(cityB) => {
            if (cityB) {
              setSelectedHotspots([primaryCity, cityB]);
            } else {
              setSelectedHotspots([primaryCity]);
            }
          }}
          onClose={handleClosePanel}
        />

        {/* ================================================
            Quick Hotspot Fly-To Selector Cards
            ================================================ */}
        <div suppressHydrationWarning className="relative z-30 flex flex-col gap-3 mt-4">
          <div
            suppressHydrationWarning
            className="flex items-center justify-between"
          >
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-teal-500" />
              Quick Mission Targets
            </span>
            <span className="text-xs font-mono text-slate-400">
              Click to inspect · Select 2 to compare · Click again to deselect
            </span>
          </div>

          <div
            suppressHydrationWarning
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
          >
            {HOTSPOTS_DATA.map((hotspot) => {
              const isSelected = selectedHotspots.some((h) => h.id === hotspot.id);
              const selectionIndex = selectedHotspots.findIndex((h) => h.id === hotspot.id);

              return (
                <div
                  key={hotspot.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleHotspotClick(hotspot)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleHotspotClick(hotspot);
                    }
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative backdrop-blur-md select-none ${
                    isSelected
                      ? "bg-teal-500/10 border-teal-500 text-teal-800 dark:text-teal-200 shadow-md shadow-teal-500/10 ring-1 ring-teal-500"
                      : "bg-white/70 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {/* Selection badge */}
                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {selectionIndex + 1}
                    </span>
                  )}

                  <span className="flex flex-col gap-1 pr-6">
                    <span className="font-semibold text-sm truncate block text-slate-900 dark:text-white">
                      {hotspot.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {hotspot.lat.toFixed(2)}°N, {hotspot.lng.toFixed(2)}°E
                    </span>
                  </span>

                  <span className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      {hotspot.stats.mean_c}°C
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {hotspot.stats.slope}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selection status bar */}
          {selectedHotspots.length > 0 && (
            <div
              suppressHydrationWarning
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-teal-500/5 border border-teal-500/20 text-xs font-mono"
            >
              <span className="text-teal-700 dark:text-teal-300">
                {selectedHotspots.length === 1
                  ? `📍 Investigating: ${selectedHotspots[0].name} (2005–2025 LST)`
                  : `⚡ Comparing: ${selectedHotspots[0].name} vs ${selectedHotspots[1].name}`}
              </span>
              {selectedHotspots.length > 1 && (
                <button
                  onClick={handleClearSelection}
                  className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Clear Comparison ×
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================================================
          Footer
          ================================================ */}
      <footer className="mt-auto py-10 px-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400 font-mono">
        <p>TerraMetrics: Earth System Trend Detective</p>
        <p className="mt-1 text-[11px] text-slate-400">
          Powered by NASA Earth Science Telemetry (MERRA-2, MODIS, Landsat, GRACE-FO, Sentinel).
        </p>
      </footer>
    </div>
  );
}
