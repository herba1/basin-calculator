import { BasinInputs, CalculatorOutputs, CashFlow } from "../types/BasinInputs";

// Layer 1: Basic Geometry Functions

export function calculatePerimeter(longSide: number, shortSide: number): number {
  return 2 * (longSide + shortSide);
}

export function calculateLeveeHeight(freeboard: number, waterDepth: number): number {
  return freeboard + waterDepth;
}

export function calculateBasinAreaAcres(longSide: number, shortSide: number): number {
  return (longSide * shortSide) / 43560;
}

// Layer 2: Earthwork Volume Functions

export function calculateCenterLeveeVolume(
  perimeter: number,
  topOfLevee: number,
  leveeHeight: number
): number {
  return (perimeter * topOfLevee * leveeHeight) / 27;
}

export function calculateInsideLeveeVolume(
  perimeter: number,
  insideSlopes: number,
  leveeHeight: number
): number {
  return (perimeter * 0.5 * (insideSlopes * leveeHeight) * leveeHeight) / 27;
}

export function calculateOutsideLeveeVolume(
  perimeter: number,
  outsideSlopes: number,
  leveeHeight: number
): number {
  return (perimeter * 0.5 * (outsideSlopes * leveeHeight) * leveeHeight) / 27;
}

export function calculateTotalEarthworkVolume(
  centerVolume: number,
  insideVolume: number,
  outsideVolume: number
): number {
  return centerVolume + insideVolume + outsideVolume;
}

// Layer 3: Wetted Area Functions

export function calculateInsideSlopeWidth(insideSlopes: number, leveeHeight: number): number {
  return insideSlopes * leveeHeight;
}

export function calculateLeveeFootprint(topOfLevee: number, insideSlopeWidth: number): number {
  return topOfLevee + insideSlopeWidth;
}

export function calculateNetInsideDimensions(
  longSide: number,
  shortSide: number,
  leveeFootprint: number
): { netLength: number; netWidth: number } {
  return {
    netLength: longSide - 2 * leveeFootprint,
    netWidth: shortSide - 2 * leveeFootprint,
  };
}

export function calculateWettedArea(
  netLength: number,
  netWidth: number,
  insideSlopeWidth: number
): { areaAcres: number; areaSqYds: number } {
  const pondBottomArea = netLength * netWidth;
  const wettedSlopePerimeter = 2 * (netLength + netWidth);
  const wettedSlopeArea = wettedSlopePerimeter * insideSlopeWidth;
  const totalAreaSqFt = pondBottomArea + wettedSlopeArea;
  const totalAreaSqYds = totalAreaSqFt / 9;
  const totalAreaAcres = totalAreaSqFt / 43560;

  return {
    areaAcres: totalAreaAcres,
    areaSqYds: totalAreaSqYds,
  };
}

// Layer 4: Recharge Calculation Functions

export function calculateOperatingDaysPerYear(
  wetYearFrequency: number,
  durationWetYears: number
): number {
  return (wetYearFrequency / 100) * durationWetYears * 30;
}

export function calculateDailyInfiltrationVolume(
  wettedAreaAcres: number,
  infiltrationRate: number
): number {
  return wettedAreaAcres * infiltrationRate;
}

export function calculateGrossAnnualRecharge(
  dailyInfiltrationVolume: number,
  operatingDaysPerYear: number
): number {
  return dailyInfiltrationVolume * operatingDaysPerYear;
}

export function calculateNetAnnualRecharge(
  grossAnnualRecharge: number,
  evaporationLossRate: number
): number {
  return grossAnnualRecharge * (1 - evaporationLossRate / 100);
}

export function calculateRechargeFlowRate(
  wettedAreaAcres: number,
  infiltrationRate: number
): number {
  return (wettedAreaAcres * infiltrationRate * 43560) / (24 * 3600);
}

export function calculateFillRate(
  rechargeFlowRate: number,
  evaporationLossRate: number
): number {
  return rechargeFlowRate / (1 - evaporationLossRate / 100);
}

// Layer 5: Capital Cost Functions

export function calculateLandCost(pondArea: number, landCostPerAcre: number): number {
  return pondArea * landCostPerAcre;
}

export function calculateEarthworkCost(
  totalEarthworkVolume: number,
  earthworkCostPerCuYd: number
): number {
  return totalEarthworkVolume * earthworkCostPerCuYd;
}

export function calculatePipelineCost(pipelineLength: number, pipelineUnitCost: number): number {
  return pipelineLength * pipelineUnitCost;
}

export function calculateInletCost(
  pipelineInletQuantity: number,
  pipelineInletCost: number
): number {
  return pipelineInletQuantity * pipelineInletCost;
}

export function calculateFencingCost(fencingLength: number, fencingCostPerFt: number = 6): number {
  return fencingLength * fencingCostPerFt;
}

export function calculateSubtotalCapitalCost(
  landCost: number,
  earthworkCost: number,
  pipelineCost: number,
  inletCost: number,
  fencingCost: number
): number {
  return landCost + earthworkCost + pipelineCost + inletCost + fencingCost;
}

export function calculateEngineeringContingencyCost(
  subtotalCapitalCost: number,
  engineeringContingency: number
): number {
  return subtotalCapitalCost * (engineeringContingency / 100);
}

export function calculateTotalCapitalCost(
  subtotalCapitalCost: number,
  engineeringContingencyCost: number
): number {
  return subtotalCapitalCost + engineeringContingencyCost;
}

// Layer 6: Annualized Cost Functions

export function calculateAnnualCapitalPayment(
  totalCapitalCost: number,
  interestRate: number,
  loanDuration: number
): number {
  const r = interestRate / 100;
  const n = loanDuration;
  return (totalCapitalCost * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

export function calculateAnnualWaterCost(
  netAnnualRecharge: number,
  rechargeWaterCost: number
): number {
  return netAnnualRecharge * rechargeWaterCost;
}

export function calculateAnnualOMCost(netAnnualRecharge: number, omCostPerAf: number): number {
  return netAnnualRecharge * omCostPerAf;
}

export function calculateTotalAnnualOperatingCost(
  annualWaterCost: number,
  annualOMCost: number
): number {
  return annualWaterCost + annualOMCost;
}

// Layer 7: Per Acre-Foot Metrics

export function calculateAnnualizedCapitalCostPerAf(
  annualCapitalPayment: number,
  netAnnualRecharge: number
): number {
  return annualCapitalPayment / netAnnualRecharge;
}

export function calculateTotalCostPerAf(
  annualCapitalPayment: number,
  annualWaterCost: number,
  annualOMCost: number,
  netAnnualRecharge: number
): number {
  return (annualCapitalPayment + annualWaterCost + annualOMCost) / netAnnualRecharge;
}

export function calculateNetBenefitPerAf(
  storedWaterValue: number,
  totalCostPerAf: number
): number {
  return storedWaterValue - totalCostPerAf;
}

// Layer 8: Annual Benefit Functions

export function calculateAnnualBenefit(
  netAnnualRecharge: number,
  storedWaterValue: number
): number {
  return netAnnualRecharge * storedWaterValue;
}

export function calculateAnnualNetBenefit(
  annualBenefit: number,
  totalAnnualOperatingCost: number
): number {
  return annualBenefit - totalAnnualOperatingCost;
}

// Layer 9: NPV and ROI Functions

export function calculateCashFlows(
  totalCapitalCost: number,
  totalAnnualOperatingCost: number,
  annualBenefit: number,
  loanDuration: number
): CashFlow[] {
  const cashFlows: CashFlow[] = [];

  // Year 0: Initial capital investment
  cashFlows.push({
    year: 0,
    costs: totalCapitalCost,
    benefits: 0,
    netBenefit: -totalCapitalCost,
  });

  // Years 1 to n: Operating costs and benefits
  for (let year = 1; year <= loanDuration; year++) {
    cashFlows.push({
      year,
      costs: totalAnnualOperatingCost,
      benefits: annualBenefit,
      netBenefit: annualBenefit - totalAnnualOperatingCost,
    });
  }

  return cashFlows;
}

export function calculatePresentValueCosts(
  totalCapitalCost: number,
  totalAnnualOperatingCost: number,
  discountRate: number,
  loanDuration: number
): number {
  const r = discountRate / 100;
  let pvCosts = totalCapitalCost;

  for (let year = 1; year <= loanDuration; year++) {
    pvCosts += totalAnnualOperatingCost / Math.pow(1 + r, year);
  }

  return pvCosts;
}

export function calculatePresentValueBenefits(
  annualBenefit: number,
  discountRate: number,
  loanDuration: number
): number {
  const r = discountRate / 100;
  let pvBenefits = 0;

  for (let year = 1; year <= loanDuration; year++) {
    pvBenefits += annualBenefit / Math.pow(1 + r, year);
  }

  return pvBenefits;
}

export function calculateNPV(presentValueBenefits: number, presentValueCosts: number): number {
  return presentValueBenefits - presentValueCosts;
}

export function calculateBenefitCostRatio(
  presentValueBenefits: number,
  presentValueCosts: number
): number {
  return presentValueBenefits / presentValueCosts;
}

export function calculateROI(annualNetBenefit: number, totalCapitalCost: number): number {
  return (annualNetBenefit / totalCapitalCost) * 100;
}

export const handleCalculations = (
  form: HTMLFormElement,
  soilData: { type: string; infiltrationRate: number }
): CalculatorOutputs | null => {
  if (!form) return null;

  const formData = new FormData(form);
  const rawInputs = Object.fromEntries(formData.entries());

  // console.log("Raw Form Inputs:", rawInputs);
  // console.log("Soil Data from Store:", soilData);

  // Parse form data into typed inputs
  const inputs: BasinInputs = {
    // Basin Size and Design
    pondArea: parseFloat(rawInputs["pond-area"] as string) || 160,
    design: "rectangular",
    longSide: parseFloat(rawInputs["long-side"] as string) || 2640,
    shortSide: parseFloat(rawInputs["short-side"] as string) || 2640,
    insideSlopes: parseFloat(rawInputs["inside-slopes"] as string) || 4,
    outsideSlopes: parseFloat(rawInputs["outside-slopes"] as string) || 2,
    topOfLevee: parseFloat(rawInputs["top-of-levee"] as string) || 8,
    slopeAcrossPond: parseFloat(rawInputs["slope-across-pond"] as string) || 0,
    freeboard: parseFloat(rawInputs["freeboard"] as string) || 1,
    waterDepth: parseFloat(rawInputs["water-depth"] as string) || 1,
    soilType: soilData.type,
    infiltrationRate: soilData.infiltrationRate,

    // Water Availability
    wetYearFrequency: parseFloat(rawInputs["wet-year-frequency"] as string) || 30,
    durationWetYears: parseFloat(rawInputs["duration-wet-years"] as string) || 4,

    // Development Costs
    landCostPerAcre: parseFloat(rawInputs["land-cost"] as string) || 6000,
    pipelineLength: parseFloat(rawInputs["pipeline-length"] as string) || 2640,
    earthworkCostPerCuYd: parseFloat(rawInputs["earthwork-cost"] as string) || 12,
    interestRate: parseFloat(rawInputs["interest-rate"] as string) || 5,
    loanDuration: parseFloat(rawInputs["loan-duration"] as string) || 10,

    // Water Costs
    rechargeWaterCost: parseFloat(rawInputs["recharge-water-cost"] as string) || 35,
    storedWaterValue: parseFloat(rawInputs["stored-water-value"] as string) || 200,
    omCostPerAf: parseFloat(rawInputs["om-cost"] as string) || 5,

    // Advanced
    pipelineUnitCost: parseFloat(rawInputs["pipeline-unit-cost"] as string) || 200,
    pipelineInletQuantity: parseFloat(rawInputs["pipeline-inlet-quantity"] as string) || 1,
    pipelineInletCost: parseFloat(rawInputs["pipeline-inlet-cost"] as string) || 20000,
    fencingLength: parseFloat(rawInputs["fencing-length"] as string) || 0,
    fencingCostPerFt: parseFloat(rawInputs["fencing-unit-cost"] as string) || 6,
    engineeringContingency: parseFloat(rawInputs["engineering-contingency"] as string) || 20,
    discountRate: parseFloat(rawInputs["discount-rate"] as string) || 5,
    evaporationLossRate: parseFloat(rawInputs["evaporation-loss-rate"] as string) || 30,
  };

  // console.log("Parsed Inputs:", inputs);

  // Layer 1: Basic Geometry
  const perimeter = calculatePerimeter(inputs.longSide, inputs.shortSide);
  const leveeHeight = calculateLeveeHeight(inputs.freeboard, inputs.waterDepth);
  const basinAreaAcres = calculateBasinAreaAcres(inputs.longSide, inputs.shortSide);

  // Layer 2: Earthwork Volume
  const centerLeveeVolume = calculateCenterLeveeVolume(
    perimeter,
    inputs.topOfLevee,
    leveeHeight
  );
  const insideLeveeVolume = calculateInsideLeveeVolume(
    perimeter,
    inputs.insideSlopes,
    leveeHeight
  );
  const outsideLeveeVolume = calculateOutsideLeveeVolume(
    perimeter,
    inputs.outsideSlopes,
    leveeHeight
  );
  const totalEarthworkVolume = calculateTotalEarthworkVolume(
    centerLeveeVolume,
    insideLeveeVolume,
    outsideLeveeVolume
  );

  // Layer 3: Wetted Area
  const insideSlopeWidth = calculateInsideSlopeWidth(inputs.insideSlopes, leveeHeight);
  const leveeFootprint = calculateLeveeFootprint(inputs.topOfLevee, insideSlopeWidth);
  const { netLength, netWidth } = calculateNetInsideDimensions(
    inputs.longSide,
    inputs.shortSide,
    leveeFootprint
  );
  const wettedArea = calculateWettedArea(netLength, netWidth, insideSlopeWidth);

  // Layer 4: Recharge Calculations
  const operatingDaysPerYear = calculateOperatingDaysPerYear(
    inputs.wetYearFrequency,
    inputs.durationWetYears
  );
  const dailyInfiltrationVolume = calculateDailyInfiltrationVolume(
    wettedArea.areaAcres,
    inputs.infiltrationRate
  );
  const grossAnnualRecharge = calculateGrossAnnualRecharge(
    dailyInfiltrationVolume,
    operatingDaysPerYear
  );
  const netAnnualRecharge = calculateNetAnnualRecharge(
    grossAnnualRecharge,
    inputs.evaporationLossRate
  );
  const rechargeFlowRate = calculateRechargeFlowRate(
    wettedArea.areaAcres,
    inputs.infiltrationRate
  );
  const fillRate = calculateFillRate(rechargeFlowRate, inputs.evaporationLossRate);

  // Required pipe size (simplified formula: diameter in inches based on flow)
  const requiredPipeSize = Math.sqrt((fillRate * 4) / Math.PI) * 12;

  // Layer 5: Capital Costs
  const landCost = calculateLandCost(inputs.pondArea, inputs.landCostPerAcre);
  const earthworkCost = calculateEarthworkCost(
    totalEarthworkVolume,
    inputs.earthworkCostPerCuYd
  );
  const pipelineCost = calculatePipelineCost(inputs.pipelineLength, inputs.pipelineUnitCost);
  const inletCost = calculateInletCost(
    inputs.pipelineInletQuantity,
    inputs.pipelineInletCost
  );
  const fencingCost = calculateFencingCost(inputs.fencingLength, inputs.fencingCostPerFt);
  const subtotalCapitalCost = calculateSubtotalCapitalCost(
    landCost,
    earthworkCost,
    pipelineCost,
    inletCost,
    fencingCost
  );
  const engineeringContingencyCost = calculateEngineeringContingencyCost(
    subtotalCapitalCost,
    inputs.engineeringContingency
  );
  const totalCapitalCost = calculateTotalCapitalCost(
    subtotalCapitalCost,
    engineeringContingencyCost
  );

  // Layer 6: Annualized Costs
  const annualCapitalPayment = calculateAnnualCapitalPayment(
    totalCapitalCost,
    inputs.interestRate,
    inputs.loanDuration
  );
  const annualWaterCost = calculateAnnualWaterCost(
    netAnnualRecharge,
    inputs.rechargeWaterCost
  );
  const annualOMCost = calculateAnnualOMCost(netAnnualRecharge, inputs.omCostPerAf);
  const totalAnnualOperatingCost = calculateTotalAnnualOperatingCost(
    annualWaterCost,
    annualOMCost
  );

  // Layer 7: Per Acre-Foot Metrics
  const annualizedCapitalCostPerAf = calculateAnnualizedCapitalCostPerAf(
    annualCapitalPayment,
    netAnnualRecharge
  );
  const totalCostPerAf = calculateTotalCostPerAf(
    annualCapitalPayment,
    annualWaterCost,
    annualOMCost,
    netAnnualRecharge
  );
  const netBenefitPerAf = calculateNetBenefitPerAf(
    inputs.storedWaterValue,
    totalCostPerAf
  );

  // Layer 8: Annual Benefits
  const annualBenefit = calculateAnnualBenefit(netAnnualRecharge, inputs.storedWaterValue);
  const annualNetBenefit = calculateAnnualNetBenefit(
    annualBenefit,
    totalAnnualOperatingCost
  );

  // Layer 9: NPV and ROI
  const cashFlows = calculateCashFlows(
    totalCapitalCost,
    totalAnnualOperatingCost,
    annualBenefit,
    inputs.loanDuration
  );
  const presentValueCosts = calculatePresentValueCosts(
    totalCapitalCost,
    totalAnnualOperatingCost,
    inputs.discountRate,
    inputs.loanDuration
  );
  const presentValueBenefits = calculatePresentValueBenefits(
    annualBenefit,
    inputs.discountRate,
    inputs.loanDuration
  );
  const npv = calculateNPV(presentValueBenefits, presentValueCosts);
  const benefitCostRatio = calculateBenefitCostRatio(presentValueBenefits, presentValueCosts);
  const roi = calculateROI(annualNetBenefit, totalCapitalCost);

  const outputs: CalculatorOutputs = {
    // Geometry
    perimeter,
    leveeHeight,
    basinAreaAcres,

    // Earthwork
    centerLeveeVolume,
    insideLeveeVolume,
    outsideLeveeVolume,
    totalEarthworkVolume,

    // Wetted Area
    insideSlopeWidth,
    leveeFootprint,
    netInsideLength: netLength,
    netInsideWidth: netWidth,
    wettedAreaAcres: wettedArea.areaAcres,
    wettedAreaSqYds: wettedArea.areaSqYds,

    // Recharge
    operatingDaysPerYear,
    dailyInfiltrationVolume,
    grossAnnualRecharge,
    netAnnualRecharge,
    rechargeFlowRate,
    fillRate,
    requiredPipeSize,

    // Capital Costs
    landCost,
    earthworkCost,
    pipelineCost,
    inletCost,
    fencingCost,
    subtotalCapitalCost,
    engineeringContingencyCost,
    totalCapitalCost,

    // Annual Costs
    annualCapitalPayment,
    annualWaterCost,
    annualOMCost,
    totalAnnualOperatingCost,

    // Per AF Metrics
    annualizedCapitalCostPerAf,
    totalCostPerAf,
    netBenefitPerAf,

    // Benefits
    annualBenefit,
    annualNetBenefit,

    // ROI Analysis
    cashFlows,
    presentValueCosts,
    presentValueBenefits,
    npv,
    benefitCostRatio,
    roi,
  };

  // console.log("\n=== CALCULATION RESULTS ===");
  // console.log("\n--- GEOMETRY ---");
  // console.log(`Perimeter: ${perimeter.toFixed(2)} ft`);
  // console.log(`Levee Height: ${leveeHeight.toFixed(2)} ft`);
  // console.log(`Basin Area: ${basinAreaAcres.toFixed(2)} acres`);

  // console.log("\n--- EARTHWORK ---");
  // console.log(`Total Earthwork Volume: ${totalEarthworkVolume.toFixed(2)} cu yds`);

  // console.log("\n--- WETTED AREA ---");
  // console.log(`Wetted Area: ${wettedArea.areaAcres.toFixed(2)} acres`);
  // console.log(`Net Inside Dimensions: ${netLength.toFixed(2)} ft x ${netWidth.toFixed(2)} ft`);

  // console.log("\n--- RECHARGE ---");
  // console.log(`Operating Days Per Year: ${operatingDaysPerYear.toFixed(2)} days`);
  // console.log(`Daily Infiltration: ${dailyInfiltrationVolume.toFixed(2)} af/day`);
  // console.log(`Gross Annual Recharge: ${grossAnnualRecharge.toFixed(2)} af/yr`);
  // console.log(`Net Annual Recharge: ${netAnnualRecharge.toFixed(2)} af/yr`);
  // console.log(`Fill Rate: ${fillRate.toFixed(2)} cfs`);
  // console.log(`Required Pipe Size: ${requiredPipeSize.toFixed(2)} inches`);

  // console.log("\n--- CAPITAL COSTS ---");
  // console.log(`Land Cost: $${landCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
  // console.log(
  //   `Earthwork Cost: $${earthworkCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  // );
  // console.log(
  //   `Pipeline Cost: $${pipelineCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  // );
  // console.log(`Inlet Cost: $${inletCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
  // console.log(
  //   `Fencing Cost: $${fencingCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  // );
  // console.log(
  //   `Engineering Contingency: $${engineeringContingencyCost.toLocaleString("en-US", {
  //     minimumFractionDigits: 2,
  //   })}`
  // );
  // console.log(
  //   `Total Capital Cost: $${totalCapitalCost.toLocaleString("en-US", {
  //     minimumFractionDigits: 2,
  //   })}`
  // );

  // console.log("\n--- ANNUAL COSTS ---");
  // console.log(
  //   `Annual Capital Payment: $${annualCapitalPayment.toLocaleString("en-US", {
  //     minimumFractionDigits: 2,
  //   })}/yr`
  // );
  // console.log(
  //   `Annual Water Cost: $${annualWaterCost.toLocaleString("en-US", {
  //     minimumFractionDigits: 2,
  //   })}/yr`
  // );
  // console.log(
  //   `Annual O&M Cost: $${annualOMCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}/yr`
  // );
  // console.log(
  //   `Total Annual Operating Cost: $${totalAnnualOperatingCost.toLocaleString("en-US", {
  //     minimumFractionDigits: 2,
  //   })}/yr`
  // );

  // console.log("\n--- PER ACRE-FOOT METRICS ---");
  // console.log(
  //   `Annualized Capital Cost: $${annualizedCapitalCostPerAf.toFixed(2)}/af`
  // );
  // console.log(`Total Cost: $${totalCostPerAf.toFixed(2)}/af`);
  // console.log(`Net Benefit: $${netBenefitPerAf.toFixed(2)}/af`);

  // console.log("\n--- BENEFITS ---");
  // console.log(
  //   `Annual Benefit: $${annualBenefit.toLocaleString("en-US", { minimumFractionDigits: 2 })}/yr`
  // );
  // console.log(
  //   `Annual Net Benefit: $${annualNetBenefit.toLocaleString("en-US", {
  //     minimumFractionDigits: 2,
  //   })}/yr`
  // );

  // console.log("\n--- ROI ANALYSIS ---");
  // console.log(
  //   `NPV: $${npv.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  // );
  // console.log(`Benefit-Cost Ratio: ${benefitCostRatio.toFixed(2)}`);
  // console.log(`ROI: ${roi.toFixed(2)}%`);

  // console.log("\n=== END RESULTS ===\n");

  return outputs;
};