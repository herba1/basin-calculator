"use client";

import { useNav } from "@/context/NavContext";
import Image from "next/image";
import Link from "next/link";
import cn from "../utils/cn";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";

const navLeftLinks = [
  { key: "problem", url: "#problem", subLinks: [] },
  { key: "solution", url: "#solution", subLinks: [] },
  { key: "extra", url: "", subLinks: [] },
];

export default function NavigationMenu({ className = "" }) {
  const nav = useNav();
  const t = useTranslations("navigation");

  return (
    <nav className={`${className} nav__container flex justify-between py-3 px-3`}>
      <ul className="nav__list flex nav__left">
        <Link href={"/"} className=" w-19 mr-3">
          <Image
            src="/cwi_logo.svg"
            width={100}
            height={100}
            alt="none"
            className=" w-full h-full "
            loading="eager"
          ></Image>
        </Link>
        {navLeftLinks.map((e) => {
          return (
            <NavLink key={e.key} href={e.url}>
              {t(e.key)}
            </NavLink>
          );
        })}
      </ul>
      <ul className="nav__list flex nav__right">
        <LanguageButton></LanguageButton>
        <Button className="px-6 py-3">{t('button')}</Button>
      </ul>
    </nav>
  );
}

function LanguageButton({ className = "" }) {
  const router = useRouter();
  const [curLocale, setCurLocale] = useState<"en" | "es">("en");

  useEffect(() => {
    const init = async () => {
      const locale = await cookieStore.get("locale");
      console.log(locale);
      if (locale?.value) setCurLocale(locale?.value as "en" | "es");
    };

    init();
  }, []);

  return (
    <button
      className={cn(
        " px-6 py-3 uppercase transition-colors duration-150 ease focus:text-highlight font-bold hover:text-highlight",
        className
      )}
      onClick={async () => {
        const locale = await cookieStore.get("locale");
        if (!locale?.value) {
          setCurLocale("es");
          router.refresh();
          return;
        }

        if (locale?.value === "en") {
          await cookieStore.set("locale", "es");
          setCurLocale("es");
          router.refresh();
        } else {
          await cookieStore.set("locale", "en");
          setCurLocale("en");
          router.refresh();
        }
      }}
    >
      {curLocale}
    </button>
  );
}

function NavLink({
  href = "/",
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      className={cn(
        " px-6 py-3 transition-colors duration-150 ease focus:text-highlight font-bold hover:text-highlight",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
