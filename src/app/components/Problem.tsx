import { useTranslations } from "next-intl";
import cn from "../utils/cn";
import Image from "next/image";
import React, { CSSProperties } from "react";
import "../animations/textImage.css";

const IMAGES = [
  { src: "/ag2.png", alt: "img" },
  { src: "/ag4.png", alt: "img" },
  { src: "/ag1.png", alt: "img" },
];

function Article({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "article relative mx-auto h-full w-full max-w-3xl overflow-visible py-5",
        className,
      )}
    >
      <div className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 py-0 blur-[10px]">
        <div className="h-full rounded-[20%] w-full scale-x-105 bg-white"></div>
      </div>
      <div className="mx-3 flex flex-col gap-6 md:gap-10">{children}</div>
    </article>
  );
}

function ArticleHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="leading-heading tracking-heading relative z-10 text-3xl font-black lg:text-5xl">
      {children}
    </h1>
  );
}

function ArticleParagraphs({ texts }: { texts: string[] }) {
  return (
    <div className="relative z-10 flex flex-col gap-6 md:gap-10">
      {texts.map((text, i) => (
        <span key={i}>
          <p className={cn("tracking-body opacity-70 lg:text-xl")}>{text}</p>
        </span>
      ))}
    </div>
  );
}

function TextImageContainer({
  className = "",
  children,
  index = 0,
}: {
  className?: string;
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <div
      style={{ "--index": index } as CSSProperties}
      className={cn(
        "animation-float shadow-small absolute aspect-square h-[28vw] -translate-x-1/2 -translate-y-1/2 overflow-clip rounded-[20%] md:h-[10vw]",
        className,
      )}
    >
      {children}
    </div>
  );
}

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
    <section className={cn("relative overflow-x-clip", className)}>
      <div className="absolute top-0 z-10 h-full w-full overflow-x-clip">
        <div className="sticky top-0 left-0 h-lvh">
          <div className="absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2">
            <TextImageContainer
              index={0}
              className="translate-x-[16vw] translate-y-[-45vh] rotate-8 md:translate-x-[30vw]"
            >
              <Image
                className={cn("h-full w-full object-cover")}
                src={IMAGES[0].src}
                alt={IMAGES[0].alt}
                width={500}
                height={500}
              ></Image>
            </TextImageContainer>
            <TextImageContainer
              index={1}
              className="translate-x-[-52vw] -rotate-10 md:translate-x-[-40vw] md:scale-110"
            >
              <Image
                className={cn("h-full w-full object-cover")}
                src={IMAGES[1].src}
                alt={IMAGES[1].alt}
                width={500}
                height={500}
              ></Image>
            </TextImageContainer>
            <TextImageContainer
              index={3}
              className="translate-x-[15vw] translate-y-[27vh] rotate-15 md:translate-x-[26vw] md:scale-115"
            >
              <Image
                className={cn("h-full w-full object-cover")}
                src={IMAGES[2].src}
                alt={IMAGES[2].alt}
                width={500}
                height={500}
              ></Image>
            </TextImageContainer>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-fit overflow-x-visible py-30">
        <Article className="">
          <ArticleHeading>{problemHeading}</ArticleHeading>
          <ArticleParagraphs texts={problemTexts} />
        </Article>

        <Article className="mt-30">
          <ArticleHeading>{solutionHeading}</ArticleHeading>
          <ArticleParagraphs texts={solutionTexts} />
        </Article>
      </div>
    </section>
  );
}
