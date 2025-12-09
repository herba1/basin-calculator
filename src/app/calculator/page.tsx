"use client";

import { useState, useRef } from "react";
import cn from "../utils/cn";
import Button from "../components/Button";
import SoilSelector from "../components/SoilSelector";
import { handleCalculations } from "../utils/calculations";
import { useCalculatorStore } from "../store/calculator";

type InputFieldConfig = {
  type: "input";
  inputType?: "text" | "number";
  label: string;
  id: string;
  name: string;
  unitEnd?: string;
  unitStart?: string;
  placeholder?: string;
  defaultValue?: string;
};

type SelectFieldConfig = {
  type: "select";
  label: string;
  id: string;
  name: string;
  options: string[];
  defaultValue?: string;
  placeholder?: string;
};

type FieldConfig = InputFieldConfig | SelectFieldConfig;

type SectionConfig = {
  section: string;
  fields: FieldConfig[];
  advancedFields?: FieldConfig[];
};

const DATA: SectionConfig[] = [
  {
    section: "Basin Size and Design",
    fields: [
      {
        type: "input",
        inputType: "number",
        label: "Pond Area",
        id: "pond-area",
        name: "pond-area",
        unitEnd: "ac pond",
        placeholder: "160",
      },
      {
        type: "select",
        label: "Design",
        id: "design",
        name: "design",
        options: ["rectangular"],
        defaultValue: "rectangular",
      },
      {
        type: "input",
        inputType: "number",
        label: "Long Side",
        id: "long-side",
        name: "long-side",
        unitEnd: "ft",
        placeholder: "2,640",
      },
      {
        type: "input",
        inputType: "number",
        label: "Short Side",
        id: "short-side",
        name: "short-side",
        unitEnd: "ft",
        placeholder: "2,640",
      },
      {
        type: "input",
        inputType: "number",
        label: "Inside Slopes",
        id: "inside-slopes",
        name: "inside-slopes",
        unitEnd: ":1",
        placeholder: "4",
      },
      {
        type: "input",
        inputType: "number",
        label: "Outside Slopes",
        id: "outside-slopes",
        name: "outside-slopes",
        unitEnd: ":1",
        placeholder: "2",
      },
      {
        type: "input",
        inputType: "number",
        label: "Top of Levee",
        id: "top-of-levee",
        name: "top-of-levee",
        unitEnd: "ft",
        placeholder: "8",
      },
      {
        type: "input",
        inputType: "number",
        label: "Slope Across Pond",
        id: "slope-across-pond",
        name: "slope-across-pond",
        unitEnd: "ft",
        placeholder: "0",
      },
      {
        type: "input",
        inputType: "number",
        label: "Freeboard",
        id: "freeboard",
        name: "freeboard",
        unitEnd: "ft",
        placeholder: "1",
      },
      {
        type: "input",
        inputType: "number",
        label: "Water Depth",
        id: "water-depth",
        name: "water-depth",
        unitEnd: "ft",
        placeholder: "1",
      },
    ],
  },
  {
    section: "Water Availability",
    fields: [
      {
        type: "input",
        inputType: "number",
        label: "Wet Year Frequency",
        id: "wet-year-frequency",
        name: "wet-year-frequency",
        unitEnd: "%",
        placeholder: "30",
      },
      {
        type: "input",
        inputType: "number",
        label: "Duration During Wet Years",
        id: "duration-wet-years",
        name: "duration-wet-years",
        unitEnd: "month",
        placeholder: "4",
      },
    ],
  },
  {
    section: "Development Costs",
    fields: [
      {
        type: "input",
        inputType: "number",
        label: "Land Cost (Opportunity Cost)",
        id: "land-cost",
        name: "land-cost",
        unitStart: "$",
        unitEnd: "/ac",
        placeholder: "6,000",
      },
      {
        type: "input",
        inputType: "number",
        label: "Pipeline to Connect Pond to District System",
        id: "pipeline-length",
        name: "pipeline-length",
        unitEnd: "ft",
        placeholder: "2,640",
      },
      {
        type: "input",
        inputType: "number",
        label: "Earthwork Cost",
        id: "earthwork-cost",
        name: "earthwork-cost",
        unitStart: "$",
        unitEnd: "/cubic yd",
        placeholder: "12",
      },
      {
        type: "input",
        inputType: "number",
        label: "Interest Rate",
        id: "interest-rate",
        name: "interest-rate",
        unitEnd: "%",
        placeholder: "5",
      },
      {
        type: "input",
        inputType: "number",
        label: "Loan Duration",
        id: "loan-duration",
        name: "loan-duration",
        unitEnd: "year",
        placeholder: "10",
      },
    ],
  },
  {
    section: "Water Costs",
    fields: [
      {
        type: "input",
        inputType: "number",
        label: "Cost of Recharge Water",
        id: "recharge-water-cost",
        name: "recharge-water-cost",
        unitStart: "$",
        unitEnd: "/af",
        placeholder: "35",
      },
      {
        type: "input",
        inputType: "number",
        label: "Value of Stored Water",
        id: "stored-water-value",
        name: "stored-water-value",
        unitStart: "$",
        unitEnd: "/af",
        placeholder: "200",
      },
      {
        type: "input",
        inputType: "number",
        label: "O&M",
        id: "om-cost",
        name: "om-cost",
        unitStart: "$",
        unitEnd: "/af",
        placeholder: "5",
      },
    ],
    advancedFields: [
      {
        type: "input",
        inputType: "number",
        label: "Pipeline Unit Cost",
        id: "pipeline-unit-cost",
        name: "pipeline-unit-cost",
        unitStart: "$",
        unitEnd: "/ft",
        defaultValue: "200",
      },
      {
        type: "input",
        inputType: "number",
        label: "Pipeline Inlet Quantity",
        id: "pipeline-inlet-quantity",
        name: "pipeline-inlet-quantity",
        unitEnd: "ea",
        defaultValue: "1",
      },
      {
        type: "input",
        inputType: "number",
        label: "Pipeline Inlet Cost",
        id: "pipeline-inlet-cost",
        name: "pipeline-inlet-cost",
        unitStart: "$",
        unitEnd: "/ea",
        defaultValue: "20000",
      },
      {
        type: "input",
        inputType: "number",
        label: "Fencing Length",
        id: "fencing-length",
        name: "fencing-length",
        unitEnd: "ft",
        defaultValue: "0",
      },
      {
        type: "input",
        inputType: "number",
        label: "Engineering Contingency",
        id: "engineering-contingency",
        name: "engineering-contingency",
        unitEnd: "%",
        defaultValue: "20",
      },
      {
        type: "input",
        inputType: "number",
        label: "Discount Rate",
        id: "discount-rate",
        name: "discount-rate",
        unitEnd: "%",
        defaultValue: "5",
      },
      {
        type: "input",
        inputType: "number",
        label: "Evaporation Loss Rate",
        id: "evaporation-loss-rate",
        name: "evaporation-loss-rate",
        unitEnd: "%",
        defaultValue: "30",
      },
      {
        type: "input",
        inputType: "number",
        label: "Fencing Unit Cost",
        id: "fencing-unit-cost",
        name: "fencing-unit-cost",
        unitStart: "$",
        unitEnd: "/ft",
        defaultValue: "6",
      },
    ],
  },
];

type InputFieldProps = {
  className?: string;
  unitEnd?: string;
  unitStart?: string;
  label?: string;
  name?: string;
  id?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function InputField({
  className,
  unitEnd,
  unitStart,
  label,
  name,
  id,
  ...props
}: InputFieldProps) {
  return (
    <div className={cn("mb-4 flex flex-col gap-2", className)}>
      <label htmlFor={id} className={cn("tracking-body text-sm text-black/60")}>
        {label}
      </label>
      <div className="flex items-center rounded-md border-1 border-neutral-200 shadow-md outline-neutral-600 focus-within:outline-1">
        {unitStart && <span className="z-10 -mr-4 ml-4">{unitStart}</span>}
        <input
          name={name}
          id={id}
          className={cn(
            `w-full p-4 outline-none`,
            `autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]`,
          )}
          {...props}
        ></input>
        {unitEnd && (
          <span className="tracking-body z-10 p-4 text-nowrap text-black/60">
            {unitEnd}
          </span>
        )}
      </div>
    </div>
  );
}

type SelectFieldProps = {
  className?: string;
  label?: string;
  name?: string;
  id?: string;
  options: string[];
  defaultValue?: string;
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

function SelectField({
  className,
  label,
  name,
  id,
  options,
  defaultValue,
  placeholder = "Select an option",
  ...props
}: SelectFieldProps) {
  return (
    <div className={cn("mb-4 flex flex-col gap-2", className)}>
      <label htmlFor={id} className={cn("tracking-body text-sm text-black/60")}>
        {label}
      </label>
      <div className="flex rounded-md border-1 border-neutral-200 shadow-md outline-neutral-600 focus-within:outline-1">
        <select
          name={name}
          id={id}
          defaultValue={defaultValue}
          className={cn(`w-full p-4 outline-none`)}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

type FormSectionProps = {
  section: SectionConfig;
};

function FormSection({ section }: FormSectionProps) {
  const renderField = (field: FieldConfig) => {
    if (field.type === "input") {
      return (
        <InputField
          key={field.id}
          label={field.label}
          id={field.id}
          name={field.name}
          type={field.inputType || "text"}
          unitEnd={field.unitEnd}
          unitStart={field.unitStart}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
        />
      );
    } else if (field.type === "select") {
      return (
        <SelectField
          key={field.id}
          label={field.label}
          id={field.id}
          name={field.name}
          options={field.options}
          defaultValue={field.defaultValue}
          placeholder={field.placeholder}
        />
      );
    }
    return null;
  };

  return (
    <div className="form__content p-5">
      {section.fields.map(renderField)}
      {section.advancedFields && section.advancedFields.map(renderField)}
    </div>
  );
}

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const { soilData } = useCalculatorStore();

  const currentSection = DATA[currentStep - 1];
  const totalSteps = DATA.length + 1; // +1 for soil selection step
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
  };

  const handlePrevious = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-lvh">
      <div className="mx-auto max-w-xl rounded-md border-1 border-neutral-200 shadow-md shadow-black/20">
        {currentStep === 0 ? (
          <>
            <div className="header sticky top-0 z-20 w-full overflow-clip rounded-md border-1 border-neutral-200 bg-white shadow-sm shadow-black/20">
              <div className="info flex justify-between p-4">
                <h3 className="tracking-body">Soil Selection</h3>
                <span className="tracking-body text-black/60">
                  {currentStep + 1}/{totalSteps}
                </span>
              </div>
              <div className="progress-bar-container h-2 w-full bg-neutral-200">
                <div
                  className="progress-bar bg-highlight h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="p-6">
              <SoilSelector />
            </div>
          </>
        ) : (
          <form ref={formRef} id="calculator" className="">
            <div className="header sticky top-0 z-20 w-full overflow-clip rounded-md border-1 border-neutral-200 bg-white shadow-sm shadow-black/20">
              <div className="info flex justify-between p-4">
                <h3 className="tracking-body">{currentSection.section}</h3>
                <span className="tracking-body text-black/60">
                  {currentStep + 1}/{totalSteps}
                </span>
              </div>
              <div className="progress-bar-container h-2 w-full bg-neutral-200">
                <div
                  className="progress-bar bg-highlight h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <FormSection section={currentSection} />
          </form>
        )}
        <div className="form__actions p-6 flex justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={cn("py-2", currentStep === 0 && "invisible")}
          >
            Previous
          </Button>
          {currentStep === totalSteps - 1 ? (
            <Button
              onClick={() => {
                if (formRef.current && soilData) {
                  handleCalculations(formRef.current, soilData);
                }
              }}
              className="py-2"
              disabled={!soilData}
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={currentStep === 0 && !soilData}
              className="py-2"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
