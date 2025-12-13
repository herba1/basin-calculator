# Basin Calculator

A financial tool for Central California farmers evaluating water recharge basin investments. Built addressing groundwater depletion in the Central Valley.

**Live:** [basin-calculator.vercel.app](https://basin-calculator.vercel.app)

## What It Does

Calculates ROI and financial feasibility for converting farmland into managed aquifer recharge (MAR) basins. Features:
- Homepage talking about the problem 
- Calculator for basin design, costs, and water availability
- Financial report (NPV, ROI, benefit-cost ratio)
- Bilingual support (English/Spanish)

## Tech Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Mapbox GL · Zustand · USDA SDMD API

## Setup

```bash
npm install
```

Create `.env.local`:
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

Get a free Mapbox token at [mapbox.com/account/access-tokens](https://account.mapbox.com/access-tokens/)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
