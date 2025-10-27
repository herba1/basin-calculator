"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Button from "./Button";

export default function CallToAction() {
  const t = useTranslations("cta");
  return (
    <section className="relative mx-3 mt-20 overflow-clip rounded-b-3xl md:mx-5">
      <figure className="img__container pointer-events-none absolute top-0 left-0 h-lvh w-full overflow-clip mask-t-from-50%">
        <Image
          src={"/ag3.png"}
          width={609}
          height={399}
          className="h-full w-full scale-105 object-cover blur-xs"
          alt="fields with mountains"
        ></Image>
      </figure>
      <div className="relative z-10 grid h-lvh place-content-center items-center">
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="leading-heading tracking-heading text-5xl font-bold md:text-9xl">
            {t("h1t")}
          </h1>
          <h1 className="leading-heading tracking-heading text-5xl font-bold md:text-9xl">
            {t("h1b")}
          </h1>
          <p className="tracking-body mt-3">{t("subtitle")}</p>
          <div className="relative mt-3 inline-block h-fit w-fit">
            <span className="absolute glowing top-0 left-0 inline-block h-full w-full blur-md"></span>
            <Button className="relative h-fit py-3 leading-none">
              {t("button")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
