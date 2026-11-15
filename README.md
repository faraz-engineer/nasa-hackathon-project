# 🌍 3D Earth Climate Trend Dashboard (NASA MERRA-2 Analytics)

An interactive, cyber-neon 3D geospatial web application that visualizes **21 years (2005–2025)** of NASA satellite Land Surface Temperature (LST) reanalysis data across major Pakistani urban hotspots (**Multan, Lahore, Islamabad, and Karachi**). Built for open-science accessibility, climate trend analysis, and rapid urban environmental comparison.

---

## 🎯 Project Purpose & Problem Statement

Raw satellite climate datasets—such as NASA Giovanni MERRA-2 time-series files—are typically stored in multi-header scientific formats (NetCDF/CSV) and Kelvin units, making them difficult for students, urban planners, policymakers, and the general public to interpret quickly.

**This platform bridges the gap between raw space-agency telemetry and actionable climate insights by:**
1. **Transforming Raw NASA Telemetry:** Cleaning, aggregating, and modeling 21 years of monthly satellite observations into intuitive annual averages and linear regression trendlines.
2. **Spatial 3D Visualization:** Mapping regional thermal hotspots onto an interactive WebGL 3D globe so users can explore geographical climate variations intuitively.
3. **Comparative & Anomaly Intelligence:** Allowing instant city-to-city temperature comparisons (e.g., coastal Karachi vs. northern Islamabad) while automatically detecting historical climate anomalies (such as the notable 2020 global cooling dip).

---

## ✨ Key Features

- **🌐 Interactive 3D WebGL Globe (`react-globe.gl`):** Smooth camera fly-to animations (`pointOfView`) with glowing geospatial markers for Multan, Lahore, Islamabad, and Karachi.
- **📊 Dual-Line Regression Charts (`Recharts`):** Plots actual annual Land Surface Temperature alongside Ordinary Least Squares (OLS) linear regression trendlines (`2005–2025`).
- **⚖️ City-to-City Comparison Mode:** Side-by-side multi-line comparative analytics to evaluate thermal differences, 20-year means, and annual warming/cooling rates between any two cities.
- **🔍 Automated Climate Insights & Anomaly Detection:** Dynamically highlights peak heat years (e.g., 2016/2018) and minimum temperature anomalies (e.g., the 2020 dip) directly from the dataset.
- **🌡️ Dynamic Unit Switching (`°C` / `K`):** Instant toggle between scientific Kelvin (`K`) and user-friendly Celsius (`°C`) across all KPI cards, tooltips, and chart axes.
- **📥 Open-Data CSV Export:** One-click browser export of cleaned, structured city datasets (`{city}_nasa_merra2_2005_2025.csv`) to support open science.

---

## 🛰️ Data Pipeline & Scientific Methodology

All climate metrics on this platform are derived from **NASA Giovanni MERRA-2 Reanalysis (`M2TMNXLND v5.12.4` — Surface Temperature `TSURF`)** spanning **January 2005 – December 2025**:

1. **Data Ingestion & Cleaning (Python / Pandas):**
   - Parsed raw NASA Giovanni area-averaged time-series CSV exports (stripping 8-row metadata headers and handling missing/corrupt timestamps).
   - Aggregated monthly observations into 21 annual mean data points (`2005–2025`) per region and converted Kelvin ($K$) values to Celsius ($^\circ C = K - 273.15$).
2. **Statistical & Trend Modeling (NumPy / Scikit-Learn):**
   - Computed descriptive statistics (20-year Mean, Min, Max, Median, and Standard Deviation).
   - Fitted a Linear Regression model ($Y = mX + c$) to calculate the annual rate of temperature change (slope in $K/\text{yr}$).
3. **Structured JSON Delivery:**
   - Consolidated geospatial coordinates, statistical KPIs, and time-series arrays into a low-latency JSON datastore (`src/data/hotspotsData.json`) for instant frontend rendering.

### Regional Summary (2005–2025)

| City | Coordinates | 20-Yr Mean (°C / K) | Min / Max (°C) | Annual Slope | Observed Trend |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Karachi** | `24.86°N, 67.00°E` | `27.70 °C` / `300.85 K` | `26.46°C` – `28.53°C` | `-0.0096 K/yr` | Stable / Minor Cooling |
| **Multan** | `30.16°N, 71.52°E` | `27.13 °C` / `300.28 K` | `24.91°C` – `28.20°C` | `-0.0325 K/yr` | Moderate Cooling Trend |
| **Lahore** | `31.52°N, 74.36°E` | `25.40 °C` / `298.55 K` | `23.84°C` – `26.65°C` | `-0.0683 K/yr` | Moderate Cooling Trend |
| **Islamabad** | `33.68°N, 73.05°E` | `21.62 °C` / `294.77 K` | `19.32°C` – `22.76°C` | `-0.0579 K/yr` | Moderate Cooling Trend |

---

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js (App Router), React, TypeScript / JavaScript
- **Styling & UI:** Tailwind CSS, Glassmorphic Cyber-Neon Design System, Lucide Icons
- **3D Geospatial Engine:** `react-globe.gl` & `three.js` (client-side dynamic rendering)
- **Data Visualization:** `Recharts` (responsive multi-line charts & custom tooltips)
- **Data Science & ETL:** Python, Pandas, NumPy, Scikit-Learn (Google Colab)

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/earth-climate-trend-dashboard.git
cd earth-climate-trend-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the 3D globe and climate analytics panel.

---

## 📂 Project Structure

```text
├── src/
│   ├── app/                 # Next.js App Router pages & global styles
│   ├── components/          # 3D Globe wrapper, Analytics Drawer, Recharts graphs
│   └── data/
│       └── hotspotsData.json # Processed NASA MERRA-2 2005–2025 dataset
├── public/                  # Static assets & textures
└── README.md                # Project documentation
```

---

## 🔮 Future Roadmap

- **Expanded Regional Coverage:** Add northern glacier zones (Gilgit-Baltistan) and agricultural belts across South Asia.
- **Multi-Variable NASA Layers:** Integrate precipitation, aerosol optical depth (AOD), and soil moisture datasets from NASA Giovanni.
- **Citizen Climate Observations:** Connect Supabase PostgreSQL backend to allow local researchers and citizens to submit ground-truth weather reports.

---

## 📜 Data Attribution

- **Satellite Dataset:** NASA Goddard Earth Sciences Data and Information Services Center (GES DISC) — *MERRA-2 tavgM_2d_lnd_Nx: 2d, Monthly mean, Time-Averaged, Single-Level, Assimilation, Land Surface Diagnostics V5.12.4 (`TSURF`)*.