export type BasinInputs = {
  // Basin Size and Design
  pondArea: number;              // acres
  design: 'rectangular';
  longSide: number;              // ft
  shortSide: number;             // ft
  insideSlopes: number;          // ratio (e.g., 4 means 4:1)
  outsideSlopes: number;         // ratio
  topOfLevee: number;            // ft
  slopeAcrossPond: number;       // ft
  freeboard: number;             // ft
  waterDepth: number;            // ft
  soilType: string;
  infiltrationRate: number;      // ft/day

  // Water Availability
  wetYearFrequency: number;      // % (0-100)
  durationWetYears: number;      // months

  // Development Costs
  landCostPerAcre: number;       // $/acre
  pipelineLength: number;        // ft
  earthworkCostPerCuYd: number;  // $/cu yd
  interestRate: number;          // % (0-100)
  loanDuration: number;          // years

  // Water Costs
  rechargeWaterCost: number;     // $/af
  storedWaterValue: number;      // $/af
  omCostPerAf: number;           // $/af

  // Advanced
  pipelineUnitCost: number;      // $/ft
  pipelineInletQuantity: number; // count
  pipelineInletCost: number;     // $/ea
  fencingLength: number;         // ft
  fencingCostPerFt: number;      // $/ft (Note: missing from your inputs, add or hardcode at $6)
  engineeringContingency: number; // % (0-100)
  discountRate: number;          // % (0-100)
  evaporationLossRate: number;   // % (0-100)
}

export type CalculatorOutputs = {
  // Geometry
  perimeter: number;                    // ft
  leveeHeight: number;                  // ft
  basinAreaAcres: number;               // acres

  // Earthwork
  centerLeveeVolume: number;            // cu yds
  insideLeveeVolume: number;            // cu yds
  outsideLeveeVolume: number;           // cu yds
  totalEarthworkVolume: number;         // cu yds

  // Wetted Area
  insideSlopeWidth: number;             // ft
  leveeFootprint: number;               // ft
  netInsideLength: number;              // ft
  netInsideWidth: number;               // ft
  wettedAreaAcres: number;              // acres
  wettedAreaSqYds: number;              // sq yds

  // Recharge
  operatingDaysPerYear: number;         // days
  dailyInfiltrationVolume: number;      // af/day
  grossAnnualRecharge: number;          // af/yr
  netAnnualRecharge: number;            // af/yr
  rechargeFlowRate: number;             // cfs
  fillRate: number;                     // cfs
  requiredPipeSize: number;             // inches

  // Capital Costs
  landCost: number;                     // $
  earthworkCost: number;                // $
  pipelineCost: number;                 // $
  inletCost: number;                    // $
  fencingCost: number;                  // $
  subtotalCapitalCost: number;          // $
  engineeringContingencyCost: number;   // $
  totalCapitalCost: number;             // $

  // Annual Costs
  annualCapitalPayment: number;         // $/yr
  annualWaterCost: number;              // $/yr
  annualOMCost: number;                 // $/yr
  totalAnnualOperatingCost: number;     // $/yr

  // Per AF Metrics
  annualizedCapitalCostPerAf: number;   // $/af
  totalCostPerAf: number;               // $/af
  netBenefitPerAf: number;              // $/af

  // Benefits
  annualBenefit: number;                // $/yr
  annualNetBenefit: number;             // $/yr

  // ROI Analysis
  cashFlows: CashFlow[];                // yearly breakdown
  presentValueCosts: number;            // $
  presentValueBenefits: number;         // $
  npv: number;                          // $
  benefitCostRatio: number;             // ratio
  roi: number;                          // %
}

export type CashFlow = {
  year: number;
  costs: number;
  benefits: number;
  netBenefit: number;
}