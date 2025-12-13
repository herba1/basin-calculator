// Provided to use by profressor Marc Herdman, tranlsated using Claude
import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";
import type { FeatureCollection, Polygon } from "geojson";

interface Soil {
  symbol: string;
  desc: string;
  acres: number;
  hydrologicGroup?: string;
  infiltrationRate?: number;
}

// Mapping soil texture keywords to infiltration rate (ft/day) based on your table
function getInfiltrationRate(description: string): {
  soilType: string;
  group: string;
  infiltrationRate: number;
} {
  const desc = description.toLowerCase();

  // Check for specific texture patterns (order matters - check more specific first)
  if (desc.includes("sand")) {
    if (desc.includes("fine") || desc.includes("layer")) {
      return {
        soilType: "Sandy with some fine layering",
        group: "A'",
        infiltrationRate: 0.7,
      };
    }
    return { soilType: "Sand", group: "A", infiltrationRate: 1.0 };
  }

  if (desc.includes("loam")) {
    if (desc.includes("silt") || desc.includes("clay")) {
      if (desc.includes("fine") || desc.includes("layer")) {
        return {
          soilType: "Silt or clay loam with some fine layering",
          group: "C'",
          infiltrationRate: 0.3,
        };
      }
      return {
        soilType: "Silt or clay loam",
        group: "C",
        infiltrationRate: 0.4,
      };
    }
    if (desc.includes("fine") || desc.includes("layer")) {
      return {
        soilType: "Loam with some fine layering",
        group: "B'",
        infiltrationRate: 0.5,
      };
    }
    return { soilType: "Loam", group: "B", infiltrationRate: 0.6 };
  }

  if (desc.includes("clay")) {
    if (desc.includes("restrict")) {
      return {
        soilType: "Clay soil with restrictive layers",
        group: "D",
        infiltrationRate: 0.05,
      };
    }
    // Clay without "loam" in the name
    if (!desc.includes("loam")) {
      return {
        soilType: "Clay soil with restrictive layers",
        group: "D",
        infiltrationRate: 0.05,
      };
    }
  }

  if (desc.includes("silt")) {
    if (desc.includes("fine") || desc.includes("layer")) {
      return {
        soilType: "Silt or clay loam with some fine layering",
        group: "C'",
        infiltrationRate: 0.3,
      };
    }
    return { soilType: "Silt or clay loam", group: "C", infiltrationRate: 0.4 };
  }

  // Default to middle value if no match
  return { soilType: "Loam (default)", group: "B", infiltrationRate: 0.6 };
}

function parseAndSortSoils(reportJSON: any): Soil[] | null {
  try {
    const tbody = reportJSON?.section?.table?.[0]?.tbody?.[0];
    if (!tbody?.tr?.length) return null;

    const rows = tbody.tr;
    const soils: Soil[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.$?.class === "mapunit") {
        const cell = row.td?.[0];
        const text = cell?.para?.[0]?._ || "";
        const symbol = text.split("--")[0]?.trim();
        const desc = text.split("--")[1]?.trim() || "";

        const acresText = row.td?.[1]?.para?.[0]?._ || "";
        const acres = parseFloat(acresText.replace(/,/g, "")) || 0;

        // Get infiltration rate from description
        const infiltrationData = getInfiltrationRate(desc);

        soils.push({
          symbol,
          desc,
          acres,
          hydrologicGroup: infiltrationData.group,
          infiltrationRate: infiltrationData.infiltrationRate,
        });
      }
    }

    if (!soils.length) return null;

    soils.sort((a, b) => b.acres - a.acres);
    return soils;
  } catch (err) {
    console.warn("Failed to parse soils:", err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const geojson: FeatureCollection<Polygon> = body.geojson;

    if (!geojson) {
      return NextResponse.json(
        { error: "geojson is required" },
        { status: 400 },
      );
    }

    const url = "https://sdmdataaccess.sc.egov.usda.gov/Tabular/post.rest";

    // Step 1: Create AOI
    const aoiResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        SERVICE: "aoi",
        REQUEST: "create",
        AOICOORDS: JSON.stringify(geojson),
      }),
    });

    const aoiData = await aoiResp.json();
    const AOIID = aoiData?.id;

    if (!AOIID) {
      return NextResponse.json(
        { error: "AOI creation failed", raw: aoiData },
        { status: 502 },
      );
    }

    // Step 2: Get catalog
    const catalogResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        SERVICE: "report",
        REQUEST: "getcatalog",
        AOIID,
      }),
    });

    const catalogData = await catalogResp.json();
    const folders = catalogData?.tables?.[0]?.folders;

    if (!folders) {
      return NextResponse.json(
        { error: "Invalid catalog format", raw: catalogData },
        { status: 502 },
      );
    }

    // Step 3: Find Component Legend report
    let selected = null;
    for (const folder of folders) {
      const found = folder.reports.find((r: any) =>
        r.reportname.toLowerCase().includes("component legend"),
      );
      if (found) {
        selected = found;
        break;
      }
    }

    if (!selected) selected = folders[0].reports[0];
    const REPORTID = selected.reportid;

    // Step 4: Get report metadata
    const reportDataResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        SERVICE: "report",
        REQUEST: "getreportdata",
        REPORTID,
        AOIID,
        FORMAT: "short",
      }),
    });

    const REPORTDATA = await reportDataResp.json();

    if (!REPORTDATA) {
      return NextResponse.json(
        { error: "Failed to fetch report data", raw: REPORTDATA },
        { status: 502 },
      );
    }

    // Step 5: Run the report
    const reportResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        SERVICE: "report",
        REQUEST: "getreport",
        SHORTFORMDATA: JSON.stringify(REPORTDATA),
      }),
    });

    const REPORTXML = await reportResp.text();

    if (!REPORTXML) {
      return NextResponse.json(
        { error: "Failed to fetch report" },
        { status: 502 },
      );
    }

    // Step 6: Parse XML to JSON
    const REPORTJSON = await parseStringPromise(REPORTXML);

    if (!REPORTJSON) {
      return NextResponse.json(
        { error: "Failed to convert report to JSON" },
        { status: 502 },
      );
    }

    // Step 7: Parse and sort soils
    const soils = parseAndSortSoils(REPORTJSON);

    if (!soils || soils.length === 0) {
      return NextResponse.json(
        { error: "No soil data found" },
        { status: 404 },
      );
    }

    const dominantSoil = soils[0];
    const infiltrationData = getInfiltrationRate(dominantSoil.desc);


    // Return just the soil type and infiltration rate
    return NextResponse.json({
      soilType: infiltrationData.soilType,
      infiltrationRate: infiltrationData.infiltrationRate,
    });
  } catch (err: any) {
    console.error("SDA ERROR:", err.message);
    return NextResponse.json(
      { error: "Failed", details: err.message },
      { status: 500 },
    );
  }
}
