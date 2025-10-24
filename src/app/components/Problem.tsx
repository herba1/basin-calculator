import { useTranslations } from "next-intl";
import cn from "../utils/cn";

export default function Problem({ className = "" }) {
  const t = useTranslations("problem");
  const t2 = useTranslations("solution");

  // Access the problem array
  const problemTexts = t.raw("text") as string[];
  const problemHeading = t.raw("heading") as string[];

  // Access the problem array
  const solutionTexts = t2.raw("text") as string[];
  const solutionHeading = t2.raw("heading") as string[];

  return (
    <section className={cn("relative mx-3", className)}>
        <div className="absolute top-0 h-full w-full">
            <div className="sticky top-0 h-lvh"></div>

        </div>

      <article className="article mx-auto pt-10 max-w-xl">
        <h1 className="leading-heading tracking-heading pt-8 text-3xl font-black">
          {problemHeading}
        </h1>
        <div className="flex flex-col">
          <br></br>
          {problemTexts.map((e, i) => {
            return (
              <span key={i}>
                <p className={cn("tracking-body opacity-70")}>{e}</p>
                <br></br>
              </span>
            );
          })}
        </div>
      </article>

      <article className="article mx-auto mt-25 max-w-xl">
        <h1 className="leading-heading tracking-heading text-3xl font-black">
          {solutionHeading}
        </h1>
        <div className="flex flex-col">
          <br></br>
          {solutionTexts.map((e, i) => {
            return (
              <span key={i}>
                <p className={cn("tracking-body opacity-70")}>{e}</p>
                <br></br>
              </span>
            );
          })}
        </div>
      </article>
    </section>
  );
}
