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

export default function NavigationBar({ className = "" }) {
  const nav = useNav();
  const t = useTranslations("navigation");

  return (
    <nav
      className={`${className} nav__container flex h-18 min-h-fit items-center justify-between px-3 py-3 md:px-5`}
    >
      <ul className="nav__list nav__left flex items-center gap-3">
        <Link href={"/"} className="mr-6 w-19">
          <Image
            src="/cwi_logo.svg"
            width={100}
            height={100}
            alt="none"
            className="h-full w-full"
            loading="eager"
          ></Image>
        </Link>
        {navLeftLinks.map((e) => {
          return (
            <NavLink
              className="hidden md:inline-block"
              key={e.key}
              href={e.url}
            >
              {t(e.key)}
            </NavLink>
          );
        })}
      </ul>
      <ul className="nav__list nav__right flex items-center gap-3">
        <LanguageButton></LanguageButton>
        <Button className="ml-3 hidden px-6 py-2 md:inline-block">
          {t("button")}
        </Button>
        <NavigationTrigger className="md:hidden"></NavigationTrigger>
      </ul>
    </nav>
  );
}

// TODO
function NavigationMenu() {
  return (
    <menu>
      {/* <ul>{navLeftLinks.map((e) => {
        return
      })}</ul> */}
    </menu>
  );
}

function NavigationTrigger({ className = "" }) {
  const nav = useNav();
  const t = useTranslations("navigation");
  console.log(nav.isOpen);

  return (
    <button
      className={cn(
        "tracking-body hover:text-highlight ease font-bold transition-colors duration-150",
        className,
      )}
      onClick={() => {
        nav.setIsOpen(!nav.isOpen);
      }}
    >
      {!nav.isOpen ? t("menuOpen") : t("menuClose")}
    </button>
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
        "ease focus:text-highlight hover:text-highlight px-6 py-3 font-bold uppercase transition-colors duration-150",
        className,
      )}
      onClick={async () => {
        const locale = await cookieStore.get("locale");
        if (!locale?.value) {
          await cookieStore.set("locale", "es");
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
        "ease focus:text-highlight hover:text-highlight px-6 py-3 font-bold transition-colors duration-150",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
