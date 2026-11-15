export interface CityYearData {
  year: number;
  temp_c: number;
  temp_k: number;
  trend_c: number;
  trend_k: number;
}

export interface CityStats {
  mean_c: number;
  mean_k: number;
  min_c: number;
  max_c: number;
  min_k: number;
  max_k: number;
  slope: string;
  slope_val: number;
  status: string;
}

export interface CityHotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  stats: CityStats;
  data: CityYearData[];
  description?: string;
}

export type HotspotsDataset = Record<string, CityHotspot>;
