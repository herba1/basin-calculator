import {create } from "zustand";
import { Polygon, Feature } from "geojson";

type SoilData = {
  symbol: string;
  value: number;
};

type CalculatorStore = {
    polygons: Feature<Polygon>[];
    setPolygons: (polygons: Feature<Polygon>[]) => void;
    soilData: SoilData | null;
    setSoilData: (data: SoilData | null) => void;
}

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  polygons: [],
  soilData: { symbol: "sand", value: 1 },

  setPolygons: (polygons) => set({ polygons }),
  setSoilData: (soilData) => set({ soilData }),
}))