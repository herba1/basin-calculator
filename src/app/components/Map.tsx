import { useRef, useState, useEffect } from "react";
import cn from "../utils/cn";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Button from "./Button";
import type { Feature, Polygon, FeatureCollection } from "geojson";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const drawRef = useRef<any>(null);
  const [polygons, setPolygons] = useState<Feature<Polygon>[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      center: [-98.5795, 39.8283], // Centered on USA
      zoom: 3,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
    });

    // Initialize Mapbox Draw
    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });

    mapRef.current.addControl(drawRef.current);

    // Listen for polygon creation and updates
    mapRef.current.on("draw.create", updatePolygons);
    mapRef.current.on("draw.update", updatePolygons);
    mapRef.current.on("draw.delete", updatePolygons);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  const updatePolygons = () => {
    const data = drawRef.current.getAll();
    const features = data.features.filter(
      (f: any) => f.geometry.type === "Polygon"
    );
    setPolygons(features);
  };

  const handleReset = () => {
    drawRef.current.deleteAll();
    setPolygons([]);
  };

  const handleSubmit = async () => {
    if (polygons.length === 0) {
      alert("Please draw a polygon first");
      return;
    }

    setIsSubmitting(true);

    try {
      const geojson: FeatureCollection<Polygon> = {
        type: "FeatureCollection",
        features: polygons,
      };

      const response = await fetch("/api/soil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ geojson }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch soil data");
      }

      const data = await response.json();
      console.log("Soil data:", data);
      alert(`Dominant soil type: ${data.symbol}`);
    } catch (error) {
      console.error("Error fetching soil data:", error);
      alert("Failed to fetch soil data");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        ref={mapContainerRef}
        id="map-container"
        className={cn("h-svh mx-auto w-full")}
      ></div>
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          onClick={handleReset}
          disabled={polygons.length === 0}
          className="bg-white text-black shadow-lg"
        >
          Reset
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={polygons.length === 0 || isSubmitting}
          className="bg-white text-black shadow-lg"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
