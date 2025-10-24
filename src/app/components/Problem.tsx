import { useTranslations } from "next-intl";

export default function Problem({ className = "" }) {
  const t = useTranslations("problem");

  // Access the problem array
  const problemTexts = t.raw("text") as string[];
  const problemHeading = t.raw("heading") as string[];

  return (
    <section>
        <h1 className="">{problemHeading}</h1>
      <div>
        {problemTexts.map((e, i) => {
          return <p key={i}>{e}</p>;
        })}
      </div>
    </section>
  );
}
