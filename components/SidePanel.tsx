"use client";

import React, { useState, useRef, useId } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  X,
  TrendingDown,
  TrendingUp,
  Satellite,
  Compass,
  Thermometer,
  ArrowDownUp,
  Download,
  Share2,
  Activity,
  Layers,
  Scale,
  ChevronDown,
  CheckCircle2,
  FileText,
  Calendar,
  Flame,
  Snowflake,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { CityHotspot } from "@/types/hotspot";

export interface SidePanelProps {
  /** Controls off-canvas panel visibility */
  isOpen: boolean;
  /** Currently active/selected city object */
  selectedCity: CityHotspot | null;
  /** Optional comparison city object */
  compareCity?: CityHotspot | null;
  /** List of all available cities from MERRA-2 dataset */
  allCities: CityHotspot[];
  /** Callback fired when user selects a different primary city */
  onSelectCity: (city: CityHotspot) => void;
  /** Callback fired when user changes comparison city */
  onSelectCompareCity?: (city: CityHotspot | null) => void;
  /** Callback fired when user requests to close the panel */
  onClose: () => void;
  /** Optional custom CSS classes */
  className?: string;
}

// Comprehensive NASA Challenge Investigation Dossiers for Pakistani cities
export const PAKISTAN_DOSSIERS: Record<
  string,
  {
    trendDirection: string;
    rootCauses: string[];
    impactAgriculture: string;
    impactWater: string;
    impactPopulation: string;
  }
> = {
  multan: {
    trendDirection: "Moderate Cooling / Thermal Corridor",
    rootCauses: [
      "Extensive canal irrigation networks and dense agriculture surrounding the urban core elevating evapotranspiration cooling.",
      "Shifting regional atmospheric dust and aerosol loads moderating peak summer solar radiation.",
      "Land cover transformations and soil moisture retention across the Southern Punjab agricultural belt.",
    ],
    impactAgriculture:
      "Canal irrigation provides localized microclimatic buffering for rabi wheat and cotton cropping cycles.",
    impactWater:
      "High evapotranspiration demands sustained canal withdrawals and shallow aquifer tube-well pumping.",
    impactPopulation:
      "Extreme heat dome episodes persist during pre-monsoon peaks despite decadal reanalysis baseline trends.",
  },
  karachi: {
    trendDirection: "Stable / Minor Cooling (Coastal Maritime)",
    rootCauses: [
      "Northern Arabian Sea maritime breezes modulating seasonal surface thermal swings.",
      "Marine boundary layer atmospheric moisture stabilizing localized land skin temperatures.",
      "Urban coastal expansion contrasting with adjoining arid deltaic terrain.",
    ],
    impactAgriculture:
      "Peri-urban vegetable farming dependent on seasonal Indus delta water releases.",
    impactWater:
      "Groundwater salinization from sea water intrusion and high municipal water supply deficits.",
    impactPopulation:
      "High relative humidity exacerbates summer wet-bulb temperatures and urban heat island effects.",
  },
  lahore: {
    trendDirection: "Moderate Cooling Trend (Aerosol Attenuation)",
    rootCauses: [
      "Elevated seasonal aerosol optical depth (AOD) and transboundary particulate plumes scattering incoming solar radiation.",
      "Shallow winter atmospheric thermal inversions trapping ground haze across the Ravi basin.",
      "Intense irrigation across the surrounding Punjab plains boosting localized latent heat flux.",
    ],
    impactAgriculture:
      "Sunlight attenuation from persistent winter particulate haze slightly reducing wheat photosynthetic rates.",
    impactWater:
      "Atmospheric deposition of particulate sulfates and heavy residues into surface water channels.",
    impactPopulation:
      "Critical public health challenges from seasonal smog and high fine particulate matter concentrations.",
  },
  islamabad: {
    trendDirection: "Moderate Cooling Trend (Margalla Foothills)",
    rootCauses: [
      "Proximity to Margalla Hills National Park and higher base elevation (540m ASL).",
      "Localized precipitation regimes and vegetation canopy cover moderating sensible heat fluxes.",
      "Urban green corridors and planned residential sector tree cover mitigating thermal extremes.",
    ],
    impactAgriculture:
      "Rainfed Potohar plateau terrace orchards sensitive to shifting monsoon timing.",
    impactWater:
      "Rawal Dam and Simly Lake municipal storage dependent on Margalla catchment runoff.",
    impactPopulation:
      "Lower baseline surface temperatures compared to central and southern Punjab plains.",
  },
};

// Recharts Custom Tooltip for Single City
interface SingleTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    dataKey: string;
  }>;
  label?: string | number;
  unit: "C" | "K";
}

function CustomRechartsTooltip({ active, payload, label, unit }: SingleTooltipProps) {
  if (active && payload && payload.length) {
    const tempPayload = payload.find(
      (p) => p.dataKey === "temp_c" || p.dataKey === "temp_k"
    );
    const trendPayload = payload.find(
      (p) => p.dataKey === "trend_c" || p.dataKey === "trend_k"
    );

    const tempVal = tempPayload?.value;
    const trendVal = trendPayload?.value;
    const delta =
      tempVal !== undefined && trendVal !== undefined ? tempVal - trendVal : null;

    return (
      <div className="rounded-xl bg-slate-900/95 dark:bg-slate-950/95 border border-slate-700/80 dark:border-teal-500/40 p-3 shadow-xl backdrop-blur-md text-xs font-mono text-slate-200 min-w-[210px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60 dark:border-teal-500/20">
          <span className="text-slate-400 font-bold flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-teal-400" />
            YEAR:
          </span>
          <span className="text-sm font-black text-white bg-teal-500/20 px-2 py-0.5 rounded border border-teal-500/30">
            {label}
          </span>
        </div>
        <div className="space-y-1.5">
          {tempVal !== undefined && (
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-teal-300">
                <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_6px_#14b8a6]" />
                Observed LST:
              </span>
              <span className="font-bold text-white">
                {tempVal.toFixed(2)} {unit === "C" ? "°C" : "K"}
              </span>
            </div>
          )}
          {trendVal !== undefined && (
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-0.5 border-b-2 border-dashed border-amber-400" />
                Regression Trend:
              </span>
              <span className="font-bold text-amber-200">
                {trendVal.toFixed(2)} {unit === "C" ? "°C" : "K"}
              </span>
            </div>
          )}
          {delta !== null && (
            <div className="pt-1.5 mt-1 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Anomaly Delta:</span>
              <span
                className={`font-bold ${
                  delta >= 0 ? "text-rose-400" : "text-teal-400"
                }`}
              >
                {delta >= 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2)}{" "}
                {unit === "C" ? "°C" : "K"}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

// Recharts Custom Tooltip for Comparative Mode
interface CompareTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    dataKey: string;
  }>;
  label?: string | number;
  unit: "C" | "K";
  cityAName: string;
  cityBName: string;
}

function CustomCompareTooltip({
  active,
  payload,
  label,
  unit,
  cityAName,
  cityBName,
}: CompareTooltipProps) {
  if (active && payload && payload.length) {
    const valA = payload[0]?.value;
    const valB = payload[1]?.value;
    const delta = valA !== undefined && valB !== undefined ? valA - valB : null;

    return (
      <div className="rounded-xl bg-slate-900/95 dark:bg-slate-950/95 border border-slate-700/80 p-3 shadow-xl backdrop-blur-md text-xs font-mono text-slate-200 min-w-[220px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60">
          <span className="text-slate-400 font-bold flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-teal-400" />
            YEAR:
          </span>
          <span className="text-sm font-black text-white bg-teal-500/20 px-2 py-0.5 rounded border border-teal-500/30">
            {label}
          </span>
        </div>
        <div className="space-y-1.5">
          {valA !== undefined && (
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
                {cityAName}:
              </span>
              <span className="font-bold text-white">
                {valA.toFixed(2)} {unit === "C" ? "°C" : "K"}
              </span>
            </div>
          )}
          {valB !== undefined && (
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-pink-300">
                <span className="w-2 h-2 rounded-full bg-[#ff4d94] shadow-[0_0_6px_#ff4d94]" />
                {cityBName}:
              </span>
              <span className="font-bold text-white">
                {valB.toFixed(2)} {unit === "C" ? "°C" : "K"}
              </span>
            </div>
          )}
          {delta !== null && (
            <div className="pt-1.5 mt-1 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Delta (A - B):</span>
              <span
                className={`font-bold ${
                  delta >= 0 ? "text-amber-400" : "text-teal-400"
                }`}
              >
                {delta >= 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2)}{" "}
                {unit === "C" ? "°C" : "K"}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

export default function SidePanel({
  isOpen,
  selectedCity,
  compareCity: externalCompareCity,
  allCities,
  onSelectCity,
  onSelectCompareCity,
  onClose,
  className = "",
}: SidePanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const chartId = useId();

  const [unit, setUnit] = useState<"C" | "K">("C");
  const [shouldRender, setShouldRender] = useState<boolean>(isOpen);

  // Comparison state
  const [internalCompareCity, setInternalCompareCity] = useState<CityHotspot | null>(null);
  const [isCompareDropdownOpen, setIsCompareDropdownOpen] = useState<boolean>(false);
  const [compareViewMode, setCompareViewMode] = useState<"delta" | "split">("delta");

  const compareCity = externalCompareCity !== undefined ? externalCompareCity : internalCompareCity;
  const isComparing = Boolean(compareCity);

  // GSAP animation for smooth slide in / slide out
  useGSAP(
    () => {
      if (isOpen) {
        setShouldRender(true);
        if (panelRef.current) {
          gsap.fromTo(
            panelRef.current,
            { x: "100%", opacity: 0 },
            {
              x: "0%",
              opacity: 1,
              duration: 0.4,
              ease: "power3.out",
            }
          );
        }
        if (backdropRef.current) {
          gsap.fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        }
      } else {
        if (panelRef.current) {
          gsap.to(panelRef.current, {
            x: "100%",
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              setShouldRender(false);
            },
          });
        }
        if (backdropRef.current) {
          gsap.to(backdropRef.current, {
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
          });
        }
      }
    },
    { dependencies: [isOpen], scope: panelRef }
  );

  if (!shouldRender && !isOpen) {
    return null;
  }

  // Active primary city fallback
  const city = selectedCity || allCities[0];
  if (!city) return null;

  const stats = city.stats;
  const isCooling = stats.slope_val < 0;
  const dossier = PAKISTAN_DOSSIERS[city.id] || PAKISTAN_DOSSIERS.multan;

  // Available comparison candidates (excluding active city)
  const availableCompareCities = allCities.filter((c) => c.id !== city.id);

  // Auto-computed NASA insights from yearly data array
  const peakEntry =
    city.data.length > 0
      ? city.data.reduce(
          (max, d) => (d.temp_c > max.temp_c ? d : max),
          city.data[0]
        )
      : null;
  const coolestEntry =
    city.data.length > 0
      ? city.data.reduce(
          (min, d) => (d.temp_c < min.temp_c ? d : min),
          city.data[0]
        )
      : null;

  // CSV export for selected city's NASA MERRA-2 dataset
  const handleCsvExport = () => {
    const header = "year,temp_c,temp_k,trend_c,trend_k";
    const meta = [
      `# Source: NASA Giovanni MERRA-2 Reanalysis (2005-2025)`,
      `# City: ${city.name} | Lat: ${city.lat.toFixed(4)} | Lng: ${city.lng.toFixed(4)}`,
      `# 20-Yr Mean: ${city.stats.mean_c} °C (${city.stats.mean_k} K) | Slope: ${city.stats.slope} | Status: ${city.stats.status}`,
    ].join("\n");
    const rows = city.data
      .map(
        (d) =>
          `${d.year},${d.temp_c},${d.temp_k},${d.trend_c},${d.trend_k}`
      )
      .join("\n");
    const csv = `${meta}\n${header}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${city.id}_nasa_merra2_2005_2025.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSelectCompare = (c: CityHotspot) => {
    setIsCompareDropdownOpen(false);
    if (onSelectCompareCity) {
      onSelectCompareCity(c);
    } else {
      setInternalCompareCity(c);
    }
  };

  const handleExitCompare = () => {
    if (onSelectCompareCity) {
      onSelectCompareCity(null);
    } else {
      setInternalCompareCity(null);
    }
  };

  // Merged dataset for comparative chart
  const comparativeChartData = compareCity
    ? city.data.map((item, idx) => {
        const itemB = compareCity.data[idx];
        return {
          year: item.year,
          temp_c_a: item.temp_c,
          temp_k_a: item.temp_k,
          temp_c_b: itemB?.temp_c,
          temp_k_b: itemB?.temp_k,
        };
      })
    : [];

  return (
    <>
      {/* Dark Blurred Backdrop Overlay (click to dismiss) */}
      <div
        ref={backdropRef}
        onClick={onClose}
        aria-hidden="true"
        suppressHydrationWarning
        className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:bg-transparent lg:pointer-events-none transition-opacity cursor-pointer"
      />

      {/* Off-Canvas Sliding Side Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Satellite Telemetry Side Panel"
        suppressHydrationWarning
        style={{ willChange: "transform" }}
        className={`fixed top-0 right-0 bottom-0 z-50 h-full flex flex-col justify-between ${
          isComparing ? "w-[min(100vw,880px)]" : "w-[min(100vw,580px)]"
        } bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800/80 shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden transition-[width] duration-300 ${className}`}
      >
        {/* Top Header Section */}
        <div
          suppressHydrationWarning
          className="p-5 sm:p-6 pb-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shrink-0"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <Satellite className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">
                  NASA EARTH SYSTEM TREND DETECTIVE
                </span>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <span>
                    {isComparing
                      ? `Comparative: ${city.name} vs ${compareCity?.name}`
                      : city.name}
                  </span>
                  {!isComparing && (
                    <span className="text-xs font-mono font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700/60">
                      {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
                    </span>
                  )}
                </h2>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close side panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick-Switch City Pills */}
          <div className="mt-3.5 flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Quick Mission Target
            </span>
            <div className="grid grid-cols-4 gap-2">
              {allCities.map((c) => {
                const isSelected = c.id === city.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCity(c);
                      if (compareCity?.id === c.id) {
                        handleExitCompare();
                      }
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex flex-col items-center justify-center border ${
                      isSelected
                        ? "bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-300 shadow-xs"
                        : "bg-slate-100/70 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400">
                      {unit === "C" ? `${c.stats.mean_c}°C` : `${c.stats.mean_k}K`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compare Toolbar & Unit Toggle Row */}
          <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between gap-2 flex-wrap">
            {!isComparing ? (
              <div className="relative">
                <button
                  onClick={() => setIsCompareDropdownOpen(!isCompareDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 transition-all cursor-pointer active:scale-95"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare with another city</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                </button>

                {/* Dropdown Menu */}
                {isCompareDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                      Select City for Delta Comparison
                    </div>
                    {availableCompareCities.map((targetCity) => (
                      <button
                        key={targetCity.id}
                        onClick={() => handleSelectCompare(targetCity)}
                        className="w-full px-3.5 py-2.5 text-left text-xs font-medium hover:bg-teal-50 dark:hover:bg-teal-950/40 flex items-center justify-between text-slate-800 dark:text-slate-200 transition-colors cursor-pointer group"
                      >
                        <span className="group-hover:text-teal-600 dark:group-hover:text-teal-400 font-semibold">
                          {targetCity.name}
                        </span>
                        <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold">
                          {targetCity.stats.mean_c}°C
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between w-full gap-2">
                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setCompareViewMode("delta")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      compareViewMode === "delta"
                        ? "bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    Delta Matrix
                  </button>
                  <button
                    onClick={() => setCompareViewMode("split")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      compareViewMode === "split"
                        ? "bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    Split Dossier
                  </button>
                </div>

                <button
                  onClick={handleExitCompare}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-rose-500/10 text-slate-600 hover:text-rose-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Exit Compare</span>
                </button>
              </div>
            )}

            {/* Metric Unit Toggle (°C / K) */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setUnit("C")}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  unit === "C"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit("K")}
                className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  unit === "K"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                K
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div
          suppressHydrationWarning
          className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6"
        >
          {isComparing && compareCity ? (
            /* COMPARISON MODE */
            <div className="flex flex-col gap-6">
              {compareViewMode === "delta" ? (
                /* Delta Matrix Card */
                <div className="rounded-2xl p-5 bg-gradient-to-br from-teal-500/5 via-cyan-500/5 to-transparent border border-teal-500/20 flex flex-col gap-4 shadow-sm">
                  <div className="flex items-center justify-between pb-2.5 border-b border-teal-500/20">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                        Decadal Delta Comparison: {city.name} vs {compareCity.name}
                      </h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                      2005–2025 Delta
                    </span>
                  </div>

                  {/* 3 Metrics Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                        20-Yr Mean Temp
                      </span>
                      <div className="text-xs font-mono font-bold flex items-center justify-between">
                        <span className="text-teal-600 dark:text-teal-400">
                          {city.name}:{" "}
                          {unit === "C"
                            ? `${city.stats.mean_c}°C`
                            : `${city.stats.mean_k}K`}
                        </span>
                        <span className="text-pink-500 dark:text-pink-400">
                          {compareCity.name}:{" "}
                          {unit === "C"
                            ? `${compareCity.stats.mean_c}°C`
                            : `${compareCity.stats.mean_k}K`}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                        Δ{" "}
                        {unit === "C"
                          ? `${Math.abs(
                              city.stats.mean_c - compareCity.stats.mean_c
                            ).toFixed(2)} °C variance`
                          : `${Math.abs(
                              city.stats.mean_k - compareCity.stats.mean_k
                            ).toFixed(2)} K variance`}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                        Annual Trend Slope
                      </span>
                      <div className="text-xs font-mono font-bold flex items-center justify-between">
                        <span className="text-teal-600 dark:text-teal-400">
                          {city.name}: {city.stats.slope}
                        </span>
                        <span className="text-pink-500 dark:text-pink-400">
                          {compareCity.name}: {compareCity.stats.slope}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800 truncate">
                        {city.stats.status}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">
                        Min / Max Range
                      </span>
                      <div className="text-xs font-mono font-bold flex items-center justify-between">
                        <span className="text-teal-600 dark:text-teal-400">
                          {unit === "C"
                            ? `${city.stats.min_c}°–${city.stats.max_c}°`
                            : `${city.stats.min_k}–${city.stats.max_k}K`}
                        </span>
                        <span className="text-pink-500 dark:text-pink-400">
                          {unit === "C"
                            ? `${compareCity.stats.min_c}°–${compareCity.stats.max_c}°`
                            : `${compareCity.stats.min_k}–${compareCity.stats.max_k}K`}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                        Decadal Extremes
                      </span>
                    </div>
                  </div>

                  {/* Superimposed Comparative Chart */}
                  <div className="mt-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        Superimposed LST Trajectory (2005–2025)
                      </span>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
                          {city.name}
                        </span>
                        <span className="flex items-center gap-1 text-pink-500 dark:text-pink-400 font-semibold">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d94] shadow-[0_0_6px_#ff4d94]" />
                          {compareCity.name}
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-[250px] select-none mt-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={comparativeChartData}
                          margin={{ top: 12, right: 10, left: -20, bottom: 4 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            opacity={0.15}
                            vertical={false}
                            stroke="#64748b"
                          />
                          <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                            fontSize={11}
                            stroke="#64748b"
                            dy={6}
                            fontFamily="monospace"
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            fontSize={11}
                            stroke="#64748b"
                            dx={-4}
                            fontFamily="monospace"
                            domain={["auto", "auto"]}
                          />
                          <Tooltip
                            content={
                              <CustomCompareTooltip
                                unit={unit}
                                cityAName={city.name}
                                cityBName={compareCity.name}
                              />
                            }
                          />
                          <Line
                            type="linear"
                            dataKey={unit === "C" ? "temp_c_a" : "temp_k_a"}
                            name={city.name}
                            stroke="#00f0ff"
                            strokeWidth={2.5}
                            dot={{ r: 3.5, fill: "#00f0ff" }}
                            activeDot={{
                              r: 5,
                              fill: "#ffffff",
                              stroke: "#00f0ff",
                              strokeWidth: 2,
                            }}
                          />
                          <Line
                            type="linear"
                            dataKey={unit === "C" ? "temp_c_b" : "temp_k_b"}
                            name={compareCity.name}
                            stroke="#ff4d94"
                            strokeWidth={2.5}
                            dot={{ r: 3.5, fill: "#ff4d94" }}
                            activeDot={{
                              r: 5,
                              fill: "#ffffff",
                              stroke: "#ff4d94",
                              strokeWidth: 2,
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] font-mono text-teal-700 dark:text-teal-400 font-semibold">
                      Source: NASA Giovanni MERRA-2 Reanalysis (2005–2025)
                    </div>
                  </div>
                </div>
              ) : (
                /* Split Dossier Mode */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City A Card */}
                  <div className="rounded-2xl p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                      <span className="font-bold font-mono text-sm text-teal-600 dark:text-teal-400">
                        {city.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px]">MEAN</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {unit === "C"
                            ? `${city.stats.mean_c}°C`
                            : `${city.stats.mean_k}K`}
                        </span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px]">SLOPE</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {city.stats.slope}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-teal-700 dark:text-teal-300">
                      {city.stats.status}
                    </span>
                  </div>

                  {/* City B Card */}
                  <div className="rounded-2xl p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                      <span className="font-bold font-mono text-sm text-pink-500 dark:text-pink-400">
                        {compareCity.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {compareCity.lat.toFixed(2)}°N,{" "}
                        {compareCity.lng.toFixed(2)}°E
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px]">MEAN</span>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {unit === "C"
                            ? `${compareCity.stats.mean_c}°C`
                            : `${compareCity.stats.mean_k}K`}
                        </span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px]">SLOPE</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {compareCity.stats.slope}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-pink-500 dark:text-pink-300">
                      {compareCity.stats.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* SINGLE CITY VIEW */
            <>
              {/* 3 Compact KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Card 1: 20-Year Mean Temperature */}
                <div className="rounded-2xl p-4 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between gap-2 hover:border-teal-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      20-Yr Mean Temp
                    </span>
                    <Thermometer className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="text-2xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                    {unit === "C"
                      ? `${stats.mean_c.toFixed(2)} °C`
                      : `${stats.mean_k.toFixed(2)} K`}
                  </div>
                  <span className="text-[10px] font-mono text-teal-700 dark:text-teal-400">
                    LST Decadal Baseline
                  </span>
                </div>

                {/* Card 2: Min / Max Range */}
                <div className="rounded-2xl p-4 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between gap-2 hover:border-teal-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Min / Max Range
                    </span>
                    <ArrowDownUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="text-sm font-black font-mono text-slate-900 dark:text-white leading-tight">
                    {unit === "C"
                      ? `${stats.min_c.toFixed(1)}° – ${stats.max_c.toFixed(1)}°C`
                      : `${stats.min_k.toFixed(1)} – ${stats.max_k.toFixed(1)} K`}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    Δ{" "}
                    {unit === "C"
                      ? `${(stats.max_c - stats.min_c).toFixed(2)} °C spread`
                      : `${(stats.max_k - stats.min_k).toFixed(2)} K spread`}
                  </span>
                </div>

                {/* Card 3: Annual Trend Slope & Status */}
                <div className="rounded-2xl p-4 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between gap-2 hover:border-teal-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Annual Slope
                    </span>
                    {isCooling ? (
                      <TrendingDown className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div className="text-xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
                    {stats.slope}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-teal-800 dark:text-teal-300 bg-teal-500/10 px-1.5 py-0.5 rounded border border-teal-500/20 truncate">
                    {stats.status}
                  </span>
                </div>
              </div>

              {/* NASA Data Insights Callout Card */}
              {peakEntry && coolestEntry && (
                <div
                  suppressHydrationWarning
                  className="rounded-2xl p-4 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent border border-teal-500/25 dark:border-teal-400/20 shadow-xs"
                >
                  <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-teal-500/20 dark:border-teal-400/15">
                    <Satellite className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                      NASA Data Insights
                    </span>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                      MERRA-2 AUTO-ANALYSIS
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                        <Flame className="w-3 h-3" />
                        Peak Heat Year
                      </div>
                      <span className="text-2xl font-black font-mono text-rose-700 dark:text-rose-300 leading-none">
                        {peakEntry.year}
                      </span>
                      <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                        {unit === "C"
                          ? `${peakEntry.temp_c.toFixed(2)} °C`
                          : `${peakEntry.temp_k.toFixed(2)} K`}
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        Hottest recorded LST surface temperature in the 20-year dataset.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                        <Snowflake className="w-3 h-3" />
                        Coolest Anomaly Year
                      </div>
                      <span className="text-2xl font-black font-mono text-cyan-700 dark:text-cyan-300 leading-none">
                        {coolestEntry.year}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                        {unit === "C"
                          ? `${coolestEntry.temp_c.toFixed(2)} °C`
                          : `${coolestEntry.temp_k.toFixed(2)} K`}
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        Notable 2020 cooling anomaly observed across all MERRA-2 city profiles.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Dual-Line Chart (recharts) */}
              <div className="rounded-2xl p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 shadow-inner flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                      Decadal Satellite Telemetry (2005–2025)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Unit: {unit === "C" ? "°C" : "K"}
                  </span>
                </div>

                <div className="w-full h-[240px] select-none mt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={city.data}
                      margin={{ top: 12, right: 14, left: -20, bottom: 4 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        opacity={0.15}
                        vertical={false}
                        stroke="#64748b"
                      />

                      <XAxis
                        dataKey="year"
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        stroke="#64748b"
                        dy={6}
                        fontFamily="monospace"
                      />

                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        fontSize={11}
                        stroke="#64748b"
                        dx={-4}
                        fontFamily="monospace"
                        domain={["auto", "auto"]}
                        tickFormatter={(val: number) =>
                          unit === "C" ? `${val}°` : `${val}`
                        }
                      />

                      <Tooltip content={<CustomRechartsTooltip unit={unit} />} />

                      <Legend
                        verticalAlign="top"
                        align="right"
                        height={28}
                        wrapperStyle={{
                          fontSize: "10px",
                          fontFamily: "monospace",
                          paddingBottom: "4px",
                        }}
                      />

                      {/* 1. Actual Observed LST: Solid Glowing Line with Dots */}
                      <Line
                        type="linear"
                        dataKey={unit === "C" ? "temp_c" : "temp_k"}
                        name={
                          unit === "C"
                            ? "Observed LST (°C)"
                            : "Observed LST (K)"
                        }
                        stroke="#0ea5e9"
                        strokeWidth={2.4}
                        dot={{
                          r: 3.5,
                          fill: "#0ea5e9",
                          stroke: "#38bdf8",
                          strokeWidth: 1.5,
                        }}
                        activeDot={{
                          r: 5.5,
                          strokeWidth: 2,
                          fill: "#ffffff",
                          stroke: "#0ea5e9",
                        }}
                        isAnimationActive={true}
                      />

                      {/* 2. Linear Regression Trendline: Dashed Amber Line */}
                      <Line
                        type="linear"
                        dataKey={unit === "C" ? "trend_c" : "trend_k"}
                        name={
                          unit === "C"
                            ? "Regression Trend (°C)"
                            : "Regression Trend (K)"
                        }
                        stroke="#f59e0b"
                        strokeWidth={2.2}
                        strokeDasharray="5 5"
                        dot={false}
                        activeDot={{
                          r: 4.5,
                          strokeWidth: 1.5,
                          fill: "#f59e0b",
                          stroke: "#fbbf24",
                        }}
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Footer Note */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                  <span className="text-teal-700 dark:text-teal-400 font-semibold">
                    Source: NASA Giovanni MERRA-2 Reanalysis (2005–2025)
                  </span>
                  <span className="text-[10px]">M2TMNXFLX v5.12.4</span>
                </div>
              </div>

              {/* Scientific Investigation Dossier */}
              <div className="rounded-2xl p-5 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-4 shadow-xs">
                <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/60 dark:border-slate-800/60">
                  <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Investigation Dossier (NASA Challenge Criteria)
                  </h4>
                </div>

                {/* 1. Trend Direction & Baseline */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      1. Trend Direction & Rate of Change
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
                      {isCooling ? (
                        <TrendingDown className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingUp className="w-3.5 h-3.5" />
                      )}
                      {dossier.trendDirection}
                    </span>
                  </div>

                  <div className="text-lg font-black font-mono text-slate-900 dark:text-slate-100">
                    Annual Slope: {stats.slope}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    MERRA-2 reanalysis verifies a 20-year mean Land Surface
                    Temperature of{" "}
                    <strong className="text-teal-700 dark:text-teal-400 font-mono">
                      {unit === "C" ? `${stats.mean_c}°C` : `${stats.mean_k} K`}
                    </strong>{" "}
                    with recorded decadal spread between{" "}
                    <strong className="font-mono text-slate-800 dark:text-slate-200">
                      {unit === "C" ? `${stats.min_c}°C` : `${stats.min_k} K`}
                    </strong>{" "}
                    and{" "}
                    <strong className="font-mono text-slate-800 dark:text-slate-200">
                      {unit === "C" ? `${stats.max_c}°C` : `${stats.max_k} K`}
                    </strong>
                    .
                  </p>
                </div>

                {/* 2. Root Cause Analysis */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    2. Root Cause Analysis (Why & How)
                  </span>
                  <ul className="flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {dossier.rootCauses.map((cause, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Real-World Impacts */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 flex flex-col gap-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    3. Tangible Real-World Impacts
                  </span>
                  <div className="flex flex-col gap-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-xs">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
                        🌾 Agriculture & Food Security
                      </span>
                      <p className="text-slate-600 dark:text-slate-300">
                        {dossier.impactAgriculture}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-xs">
                      <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
                        💧 Water Resources & Aquifers
                      </span>
                      <p className="text-slate-600 dark:text-slate-300">
                        {dossier.impactWater}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-xs">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block mb-0.5">
                        👥 Population & Public Health
                      </span>
                      <p className="text-slate-600 dark:text-slate-300">
                        {dossier.impactPopulation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div
          suppressHydrationWarning
          className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center justify-between gap-3 shrink-0"
        >
          <button
            onClick={handleCsvExport}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 dark:bg-teal-500/10 dark:hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 font-semibold text-xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Export NASA CSV</span>
          </button>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex items-center justify-center p-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 transition-colors cursor-pointer"
            title="Share Dashboard Link"
            aria-label="Share Dashboard Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
