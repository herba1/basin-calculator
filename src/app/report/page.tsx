"use client";

import { useCalculatorStore } from "../store/calculator";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";

type MetricRowProps = {
  label: string;
  value: string;
};

function MetricRow({ label, value }: MetricRowProps) {
  return (
    <div className="flex justify-between border-b border-neutral-200 py-3">
      <span className="tracking-body text-black/60">{label}</span>
      <span className="tracking-body font-medium">{value}</span>
    </div>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-12">
      <h2 className="leading-heading tracking-heading mb-4 text-2xl font-semibold">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function ReportPage() {
  const { reportData } = useCalculatorStore();
  const router = useRouter();
  const npv = useSpring(0, { bounce: 0, duration: 1000 });

  const displayNpv = useTransform(npv, (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value),
  );

  useEffect(() => {
    if (reportData) {
      npv.set(reportData.npv);
    }
  }, [reportData, npv]);

  if (!reportData) {
    return (
      <div className="flex min-h-lvh items-center justify-center p-6">
        <div className="text-center">
          <h1 className="leading-heading tracking-heading mb-4 text-3xl font-semibold">
            No Report Available
          </h1>
          <p className="tracking-body mb-6 text-black/60">
            Please complete the calculator first
          </p>
          <Button onClick={() => router.push("/calculator")}>
            Go to Calculator
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const formatNumber = (value: number, decimals = 2) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);

  return (
    <div className="min-h-lvh p-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="leading-heading tracking-heading mb-2 text-4xl font-semibold md:text-5xl lg:text-6xl">
            Basin Recharge Report
          </h1>
          <p className="tracking-body text-black/60">
            Project feasibility analysis and financial projections
          </p>
        </div>

        {/* Main Value - Centered and Large */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm tracking-wider text-black/60 uppercase">
            Net Present Value
          </p>
          <motion.p
            initial={{ y: "30%", opacity: 0, scale: 0.7, filter: "blur(4px)" }}
            animate={{ y: "0%", opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              type:'spring',
              duration:1,
            }}
            className="leading-heading tracking-heading mb-2 text-6xl font-bold md:text-7xl lg:text-8xl"
          >
            {displayNpv}
          </motion.p>
          <p className="tracking-body text-black/60">
            Total value creation over project lifetime
          </p>
        </div>

        {/* ROI Metrics */}
        <Section title="Return on Investment">
          <div>
            <MetricRow
              label="Benefit-Cost Ratio"
              value={formatNumber(reportData.benefitCostRatio, 2)}
            />
            <MetricRow
              label="ROI"
              value={`${formatNumber(reportData.roi, 2)}%`}
            />
            <MetricRow
              label="Annual Net Benefit"
              value={formatCurrency(reportData.annualNetBenefit)}
            />
            <MetricRow
              label="Total Capital Cost"
              value={formatCurrency(reportData.totalCapitalCost)}
            />
          </div>
        </Section>

        {/* Recharge Performance */}
        <Section title="Recharge Performance">
          <div>
            <MetricRow
              label="Net Annual Recharge"
              value={`${formatNumber(reportData.netAnnualRecharge, 2)} af/yr`}
            />
            <MetricRow
              label="Gross Annual Recharge"
              value={`${formatNumber(reportData.grossAnnualRecharge, 2)} af/yr`}
            />
            <MetricRow
              label="Operating Days Per Year"
              value={`${formatNumber(reportData.operatingDaysPerYear, 0)} days`}
            />
          </div>
        </Section>

        {/* Unit Economics */}
        <Section title="Unit Economics">
          <div>
            <MetricRow
              label="Total Cost per AF"
              value={`${formatCurrency(reportData.totalCostPerAF)}/af`}
            />
            <MetricRow
              label="Net Benefit per AF"
              value={`${formatCurrency(reportData.netBenefitPerAF)}/af`}
            />
            <MetricRow
              label="Annualized Capital Cost"
              value={`${formatCurrency(reportData.annualizedCapitalCost)}/af`}
            />
          </div>
        </Section>

        {/* Basin Design */}
        <Section title="Basin Design">
          <div>
            <MetricRow
              label="Basin Area"
              value={`${formatNumber(reportData.basinArea, 2)} ac`}
            />
            <MetricRow
              label="Wetted Area"
              value={`${formatNumber(reportData.wettedArea, 2)} ac`}
            />
            <MetricRow
              label="Levee Height"
              value={`${formatNumber(reportData.leveeHeight, 2)} ft`}
            />
            <MetricRow
              label="Required Pipe Size"
              value={`${formatNumber(reportData.requiredPipeSize, 0)} in`}
            />
          </div>
        </Section>

        {/* Annual Operating Costs */}
        <Section title="Annual Operating Costs">
          <div>
            <MetricRow
              label="Annual Capital Payment"
              value={`${formatCurrency(reportData.annualCapitalPayment)}/yr`}
            />
            <MetricRow
              label="Annual Water Cost"
              value={`${formatCurrency(reportData.annualWaterCost)}/yr`}
            />
            <MetricRow
              label="Annual O&M Cost"
              value={`${formatCurrency(reportData.annualOMCost)}/yr`}
            />
          </div>
        </Section>

        {/* Actions */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => router.push("/calculator")} className="py-3">
            New Calculation
          </Button>
          <Button
            onClick={() => window.print()}
            className="border-1 border-neutral-200 bg-white py-3 text-black shadow-md hover:bg-neutral-50"
          >
            Print Report
          </Button>
        </div>
      </div>
    </div>
  );
}
