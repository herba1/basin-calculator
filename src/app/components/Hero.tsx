import Image from "next/image";
import cn from "../utils/cn";
import Button from "./Button";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="h-[calc(100svh-4rem)] px-3 pb-3 md:px-5 md:pb-5">
      <div className="hero__content relative flex h-full w-full flex-col justify-end px-3 pb-8 md:px-8 md:pb-8">
        <div className="image__container absolute top-0 left-0 -z-10 h-full w-full overflow-clip rounded-3xl">
          <div className="pointer-events-none absolute bottom-0 z-10 h-full w-full bg-linear-to-t from-black to-black/0 to-40% opacity-80"></div>
          <Image
            src={"/hero.jpg"}
            alt="farm with fields and mountains in the distance"
            width={800}
            height={600}
            loading="eager"
            className={cn("-z-10 h-full w-full object-cover blur-[2px]")}
          ></Image>
        </div>
        <div className="gap- flex w-full flex-col gap-3 text-white md:flex-row md:items-end md:justify-between">
          <h1 className="tracking-heading leading-heading max-w-sm text-5xl md:text-7xl lg:max-w-3xl xl:text-8xl">
            {t("title")}
          </h1>
          <div className="flex max-w-sm flex-col gap-5">
            <p className="tracking-body leading-none">{t("text")}</p>
            <Button className="py-3">{t("button")}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
