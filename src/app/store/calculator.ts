import {create } from "zustand";
import { Polygon, Feature } from "geojson";

type SoilData = {
  type: string;
  infiltrationRate: number;
};

type CalculatorStore = {
    polygons: Feature<Polygon>[];
    setPolygons: (polygons: Feature<Polygon>[]) => void;
    soilData: SoilData | null;
    setSoilData: (data: SoilData | null) => void;
}

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  polygons: [],
  soilData: { type: "Sand", infiltrationRate: 1 },

  setPolygons: (polygons) => set({ polygons }),
  setSoilData: (soilData) => set({ soilData }),
}))