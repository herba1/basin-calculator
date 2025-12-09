"use client";

import { useState } from "react";
import cn from "../utils/cn";
import Button from "./Button";
import Map from "./Map";
import { useCalculatorStore } from "../store/calculator";
import { ArrowLeft } from "lucide-react";

const SOIL_OPTIONS = [
  { type: "Sand", group: "A", infiltrationRate: 1.0 },
  { type: "Sandy with some fine layering", group: "A'", infiltrationRate: 0.7 },
  { type: "Loam", group: "B", infiltrationRate: 0.6 },
  { type: "Loam with some fine layering", group: "B'", infiltrationRate: 0.5 },
  { type: "Silt or clay loam", group: "C", infiltrationRate: 0.4 },
  {
    type: "Silt or clay loam with some fine layering",
    group: "C'",
    infiltrationRate: 0.3,
  },
  {
    type: "Clay soil with restrictive layers",
    group: "D",
    infiltrationRate: 0.05,
  },
];

export default function SoilSelector() {
  const { soilData, setSoilData } = useCalculatorStore();
  const [showMap, setShowMap] = useState(false);
  const [manualRate, setManualRate] = useState("");

  const handleSelectOption = (option: (typeof SOIL_OPTIONS)[0]) => {
    setSoilData({
      type: option.type,
      infiltrationRate: option.infiltrationRate,
    });
  };

  const handleManualInput = (value: string) => {
    setManualRate(value);
    const rate = parseFloat(value);
    if (!isNaN(rate) && rate > 0) {
      setSoilData({ type: "Manual", infiltrationRate: rate });
    }
  };

  return (
    <div className="w-full">
      {showMap ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowMap(false)}
              className="flex w-fit hover:underline active:underline items-center py-2"
            >
              <ArrowLeft></ArrowLeft>
              Back to Options
            </button>
            <h3 className="tracking-body text-lg font-semibold">
              Select Location on Map
            </h3>
            <p className="text-sm text-black/60">
              Draw dots on the map and connect the last two around a certain
              area to get your infiltration rate
            </p>
          </div>
          <div className="h-[80vh] min-h-50 overflow-clip rounded-md">
            <Map />
          </div>
          {soilData && (
            <div className="rounded-md border-1 border-neutral-200 bg-white p-4 shadow-sm">
              <p className="tracking-body mb-1 text-base font-semibold">
                Currently Selected
              </p>
              <p className="tracking-body text-sm text-black/80">
                <span className="font-medium">Soil Type:</span> {soilData.type}
              </p>
              <p className="tracking-body text-sm text-black/80">
                <span className="font-medium">Infiltration Rate:</span>{" "}
                {soilData.infiltrationRate} ft/day
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="tracking-body font-semibold mb-2 text-lg">
              Determine Soil Type & Infiltration Rate
            </h3>
            <p className="tracking-body text-sm text-black/60">
              Choose one of the methods below to set your soil infiltration
              rate.
            </p>
          </div>

          {/* Option 1: Map Selection */}
          <div className="space-y-2">
            <h4 className="tracking-body text-sm font-medium">
              Option 1: Map Selection
            </h4>
            <Button
              onClick={() => setShowMap(true)}
              className="w-full py-3 font-semibold"
            >
              Select Location on Map
            </Button>
          </div>

          {/* Option 2: Dropdown */}
          <div className="space-y-2">
            <h4 className="tracking-body text-sm font-medium">
              Option 2: Select Soil Type
            </h4>
            <select
              onChange={(e) => {
                const option = SOIL_OPTIONS[parseInt(e.target.value)];
                if (option) handleSelectOption(option);
              }}
              className="w-full rounded-md border-1 border-neutral-200 p-4 shadow-md outline-none focus:outline-1 focus:outline-neutral-600"
              defaultValue=""
            >
              <option value="" disabled>
                Select a soil type
              </option>
              {SOIL_OPTIONS.map((option, index) => (
                <option key={option.type} value={index}>
                  {option.type} (Group {option.group}) -{" "}
                  {option.infiltrationRate} ft/day
                </option>
              ))}
            </select>
          </div>

          {/* Option 3: Manual Input */}
          <div className="space-y-2">
            <h4 className="tracking-body text-sm font-medium">
              Option 3: Manual Infiltration Rate
            </h4>
            <div className="flex items-center rounded-md border-1 border-neutral-200 shadow-md outline-neutral-600 focus-within:outline-1">
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter rate"
                value={manualRate}
                onChange={(e) => handleManualInput(e.target.value)}
                className="w-full p-4 outline-none"
              />
              <span className="tracking-body z-10 p-4 text-nowrap text-black/60">
                ft/day
              </span>
            </div>
          </div>

          {/* Selected Value Display */}
          {soilData && (
            <div className="rounded-md bg-neutral-100 p-4">
              <p className="tracking-body text-sm">
                <span className="font-medium">Selected:</span> {soilData.type} -{" "}
                {soilData.infiltrationRate} ft/day
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
