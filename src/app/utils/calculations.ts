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

export const handleCalculations = (form:HTMLFormElement): null=> {
    if(!form) return null;
    const formData = new FormData(form);
    const inputs = Object.fromEntries(formData.entries());
    console.log(inputs)
    return null;
}