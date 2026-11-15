"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";
import {
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Activity,
  Loader2,
  Globe as GlobeIcon,
} from "lucide-react";
import type { CityHotspot } from "@/types/hotspot";
import defaultHotspotsJson from "@/data/hotspotsData.json";

// Default cities loaded from MERRA-2 dataset
export const MERRA2_CITIES: CityHotspot[] = Object.values(
  defaultHotspotsJson as Record<string, CityHotspot>
);

export interface EarthGlobeProps {
  /** Array of Pakistani city hotspot objects */
  hotspots?: CityHotspot[];
  /** Currently selected city ID */
  selectedCityId?: string;
  /** City to focus camera on when updated */
  focusedCity?: CityHotspot | null;
  /** Callback fired when a hotspot pin is clicked */
  onHotspotClick?: (city: CityHotspot) => void;
  /** Custom CSS classes for container */
  className?: string;
  /** Whether the globe should auto-rotate */
  autoRotate?: boolean;
  /** Speed of auto-rotation (defaults to 0.4) */
  autoRotateSpeed?: number;
  /** Initial altitude of camera (defaults to 1.8) */
  initialAltitude?: number;
  /** Initial center coordinates (defaults to Pakistan / Multan { lat: 30.1575, lng: 71.5249 }) */
  initialCoordinates?: { lat: number; lng: number };
  /** Toggle visibility of HUD telemetry controls */
  showControls?: boolean;
}

// Sleek cyber skeleton loader shown while Three.js/WebGL initializes
function GlobeSkeletonLoader() {
  return (
    <div
      suppressHydrationWarning
      className="relative w-full h-full min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-slate-950/80 select-none"
    >
      <div
        aria-hidden="true"
        className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full border border-cyan-500/20 animate-pulse pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-teal-500/15 pointer-events-none"
      />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.25)]">
          <GlobeIcon className="w-7 h-7 text-cyan-400 animate-spin [animation-duration:12s]" />
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 tracking-wider uppercase">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          <span>Synchronizing 3D Orbital Surface Telemetry...</span>
        </div>
      </div>
    </div>
  );
}

// Dynamically import GlobeInner to guarantee client-only WebGL rendering
const Globe = dynamic(() => import("./GlobeInner"), {
  ssr: false,
  loading: () => <GlobeSkeletonLoader />,
});

export default function EarthGlobe({
  hotspots = MERRA2_CITIES,
  selectedCityId = "multan",
  focusedCity,
  onHotspotClick,
  className = "",
  autoRotate = true,
  autoRotateSpeed = 0.4,
  initialAltitude = 1.8,
  initialCoordinates = { lat: 30.1575, lng: 71.5249 },
  showControls = true,
}: EarthGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState({ width: 900, height: 650 });
  const [isPlaying, setIsPlaying] = useState<boolean>(autoRotate ?? true);

  const activeHotspots = hotspots && hotspots.length > 0 ? hotspots : MERRA2_CITIES;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Responsive container dimension tracking
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const w = rect.width || containerRef.current.clientWidth || 900;
        const h = rect.height || containerRef.current.clientHeight || 650;
        if (w > 50 && h > 50) {
          setDimensions({ width: Math.floor(w), height: Math.floor(h) });
        }
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  // Controls configuration
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = isPlaying;
      controls.autoRotateSpeed = autoRotateSpeed || 0.4;
      controls.minDistance = 150;
      controls.maxDistance = 450;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.8;
      controls.enableZoom = true;
    }
  }, [isPlaying, autoRotateSpeed]);

  const handleGlobeInstance = useCallback(
    (inst: GlobeMethods) => {
      globeRef.current = inst;
      const controls = inst.controls();
      if (controls) {
        controls.autoRotate = isPlaying;
        controls.autoRotateSpeed = autoRotateSpeed || 0.4;
        controls.minDistance = 150;
        controls.maxDistance = 450;
      }

      // Smoothly fly camera to Pakistan / Multan on load
      inst.pointOfView(
        {
          lat: initialCoordinates.lat,
          lng: initialCoordinates.lng,
          altitude: initialAltitude,
        },
        1200
      );
    },
    [isPlaying, autoRotateSpeed, initialCoordinates.lat, initialCoordinates.lng, initialAltitude]
  );

  // Handle focus changes (e.g. city quick-selector clicked)
  useEffect(() => {
    if (!globeRef.current || !focusedCity) return;
    globeRef.current.pointOfView(
      {
        lat: focusedCity.lat,
        lng: focusedCity.lng,
        altitude: 1.45,
      },
      1200
    );
  }, [focusedCity]);

  // Pin click handler: zooms camera smoothly to city & updates selection
  const handleCitySelect = useCallback(
    (city: CityHotspot) => {
      if (globeRef.current) {
        globeRef.current.pointOfView(
          {
            lat: city.lat,
            lng: city.lng,
            altitude: 1.45,
          },
          1200
        );
      }
      onHotspotClick?.(city);
    },
    [onHotspotClick]
  );

  // Render glowing cyber-neon interactive hotspot point/ring
  const renderCustomPin = useCallback(
    (d: object): HTMLElement => {
      const city = d as CityHotspot;
      const isSelected = selectedCityId === city.id;

      const el = document.createElement("div");
      el.className = "group relative flex items-center justify-center select-none cursor-pointer";
      el.style.pointerEvents = "auto";
      el.style.transform = "translate(-50%, -50%)";

      // 1. Concentric radar wave ping
      const ping = document.createElement("div");
      ping.className = "absolute rounded-full pointer-events-none";
      ping.style.width = isSelected ? "34px" : "24px";
      ping.style.height = isSelected ? "34px" : "24px";
      ping.style.backgroundColor = isSelected ? "rgba(34, 211, 238, 0.45)" : "rgba(6, 182, 212, 0.3)";
      ping.style.border = `1.5px solid ${isSelected ? "#22d3ee" : "#06b6d4"}`;
      ping.style.animation = "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite";

      // 2. Outer glowing aura ring
      const aura = document.createElement("div");
      aura.className = "absolute rounded-full pointer-events-none transition-all duration-300 ease-out group-hover:scale-150";
      aura.style.width = isSelected ? "30px" : "22px";
      aura.style.height = isSelected ? "30px" : "22px";
      aura.style.backgroundColor = isSelected ? "rgba(6, 182, 212, 0.25)" : "rgba(6, 182, 212, 0.1)";
      aura.style.border = `1.5px solid ${isSelected ? "#06b6d4" : "rgba(6, 182, 212, 0.5)"}`;
      aura.style.boxShadow = isSelected
        ? "0 0 20px #06b6d4, 0 0 35px rgba(6, 182, 212, 0.5)"
        : "0 0 12px rgba(6, 182, 212, 0.4)";

      // 3. Central Neon Beacon Core Pin
      const core = document.createElement("div");
      core.className = "relative rounded-full transition-transform duration-300 ease-out group-hover:scale-125";
      core.style.width = isSelected ? "14px" : "11px";
      core.style.height = isSelected ? "14px" : "11px";
      core.style.backgroundColor = isSelected ? "#22d3ee" : "#06b6d4";
      core.style.border = "2px solid #ffffff";
      core.style.boxShadow = isSelected
        ? "0 0 15px #22d3ee, 0 0 30px #06b6d4"
        : "0 0 10px #06b6d4";

      // 4. Hover Cyber Tooltip Badge
      const tooltip = document.createElement("div");
      tooltip.className =
        "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50 whitespace-nowrap";
      tooltip.innerHTML = `
        <div style="background: rgba(10, 15, 30, 0.95); backdrop-filter: blur(12px); border: 1px solid rgba(6, 182, 212, 0.6); padding: 7px 12px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.8), 0 0 15px rgba(6, 182, 212, 0.25); display: flex; flex-direction: column; gap: 3px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="display: inline-block; width: 7px; height: 7px; border-radius: 9999px; background: #22d3ee; box-shadow: 0 0 8px #22d3ee;"></span>
              <span style="color: #ffffff; font-size: 12px; font-weight: 800; font-family: monospace; letter-spacing: 0.05em;">${city.name}</span>
            </div>
            <span style="color: #67e8f9; font-size: 9px; font-family: monospace; background: rgba(6, 182, 212, 0.15); padding: 1px 5px; border-radius: 4px; border: 1px solid rgba(6, 182, 212, 0.3);">MERRA-2 LST</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; font-size: 10px; font-family: monospace; color: #94a3b8; padding-top: 2px;">
            <span>Mean: <strong style="color: #22d3ee;">${city.stats?.mean_c ?? "--"}°C</strong> (${city.stats?.mean_k ?? "--"} K)</span>
            <span>Slope: <strong style="color: #fbbf24;">${city.stats?.slope ?? "--"}</strong></span>
          </div>
          <div style="font-size: 9px; font-family: monospace; color: #64748b;">
            Lat: ${city.lat.toFixed(4)}°N · Lng: ${city.lng.toFixed(4)}°E
          </div>
        </div>
      `;

      el.appendChild(ping);
      el.appendChild(aura);
      el.appendChild(core);
      el.appendChild(tooltip);

      // Handle Pin Click
      el.onclick = (e) => {
        e.stopPropagation();
        handleCitySelect(city);
      };

      return el;
    },
    [selectedCityId, handleCitySelect]
  );

  // Camera Zoom Controls
  const handleZoom = (factor: number) => {
    if (!globeRef.current) return;
    const currentPov = globeRef.current.pointOfView();
    const newAltitude = Math.max(0.4, Math.min(4.0, currentPov.altitude * factor));
    globeRef.current.pointOfView({ altitude: newAltitude }, 400);
  };

  const handleResetView = () => {
    if (!globeRef.current) return;
    globeRef.current.pointOfView(
      {
        lat: initialCoordinates.lat,
        lng: initialCoordinates.lng,
        altitude: initialAltitude,
      },
      1200
    );
  };

  if (!isMounted) {
    return <GlobeSkeletonLoader />;
  }

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className={`relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* 3D WebGL Globe Canvas */}
      <Globe
        onGlobeInstance={handleGlobeInstance}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={true}
        atmosphereColor="#06b6d4"
        atmosphereAltitude={0.18}
        htmlElementsData={activeHotspots}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.015}
        htmlElement={renderCustomPin}
        htmlTransitionDuration={0}
      />

      {/* Cyber HUD Telemetry Controls Overlay */}
      {showControls && (
        <div
          suppressHydrationWarning
          className="absolute bottom-6 right-6 z-20 flex flex-col gap-2 pointer-events-auto"
        >
          {/* Zoom In */}
          <button
            suppressHydrationWarning
            onClick={() => handleZoom(0.75)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/40 transition-all active:scale-95 cursor-pointer hover:border-cyan-400"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            suppressHydrationWarning
            onClick={() => handleZoom(1.3)}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/40 transition-all active:scale-95 cursor-pointer hover:border-cyan-400"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Toggle Auto-Rotate */}
          <button
            suppressHydrationWarning
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center justify-center w-9 h-9 rounded-xl border backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer ${
              isPlaying
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
            title={isPlaying ? "Pause Orbital Rotation" : "Resume Orbital Rotation"}
            aria-label="Toggle Auto-Rotation"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Reset View to Pakistan */}
          <button
            suppressHydrationWarning
            onClick={handleResetView}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/40 transition-all active:scale-95 cursor-pointer hover:border-cyan-400"
            title="Reset View (Focus Pakistan)"
            aria-label="Reset View to Pakistan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Left Hotspots Telemetry Legend */}
      <div
        suppressHydrationWarning
        className="absolute top-6 left-6 z-20 hidden md:flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-xl shadow-2xl pointer-events-none text-xs font-mono text-slate-300"
      >
        <div suppressHydrationWarning className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider uppercase text-[11px] pb-1 border-b border-cyan-500/20">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>NASA MERRA-2 HOTSPOTS ({activeHotspots.length})</span>
        </div>

        {activeHotspots.map((city) => {
          const isSelected = selectedCityId === city.id;
          return (
            <div
              key={city.id}
              suppressHydrationWarning
              className={`flex items-center justify-between gap-4 px-2 py-1 rounded-lg transition-all ${
                isSelected
                  ? "bg-cyan-500/15 text-cyan-200 border border-cyan-400/40"
                  : "text-slate-400"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected
                      ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                      : "bg-cyan-600 shadow-[0_0_4px_#06b6d4]"
                  }`}
                />
                <span className="font-semibold">{city.name}</span>
              </div>
              <span className="text-[10px] text-cyan-400/80">
                {city.stats?.mean_c}°C
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { EarthGlobe as GlobeRenderer };
