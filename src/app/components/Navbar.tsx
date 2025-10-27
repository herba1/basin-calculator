"use client";

import { useNav } from "@/context/NavContext";
import Image from "next/image";
import Link from "next/link";
import cn from "../utils/cn";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const navLeftLinks = [
  { key: "problem", url: "#problem", subLinks: [] },
  { key: "solution", url: "#solution", subLinks: [] },
  {
    key: "extra",
    url: "",
    subLinks: [
      { key: "extra", url: "#extra" },
      { key: "about", url: "#about" },
      { key: "research", url: "#research" },
      { key: "education", url: "#education" },
    ],
  },
];

export default function NavigationBar({ className = "" }) {
  const nav = useNav();
  const t = useTranslations("navigation");

  return (
    <nav
      className={`${className} nav__container bg-background relative top-0 z-40 flex h-16 min-h-fit items-center justify-between px-3 md:px-5`}
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
          if (e.subLinks.length > 0) {
            return (
              <div key={e.key} className="hidden md:inline-block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "ease focus:text-highlight hover:text-highlight cursor-pointer px-6 py-3 font-bold transition-colors duration-150",
                        className,
                      )}
                    >
                      {t(`${e.key}.${e.subLinks[0].key}`)}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="navbar__link__dropdown rounded-md border-0 bg-white outline-0 outline-white">
                    <DropdownMenuGroup>
                      {e.subLinks.map((e1, i) => {
                        if (i != 0)
                          return (
                            <NavLink
                              className="block"
                              href={e1.url}
                              key={e1.key}
                            >
                              {t(`${e.key}.${e1.key}`)}
                            </NavLink>
                          );
                      })}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          }
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
      <NavigationMenu></NavigationMenu>
      <div
        data-is-open={nav.isOpen}
        className={cn(
          "nav__backdrop pointer-events-none absolute top-full left-0 -z-10 h-lvh w-full bg-black/20 backdrop-blur-xs",
        )}
      ></div>
    </nav>
  );
}

// TODO
function NavigationMenu() {
  const { isOpen } = useNav();
  const t = useTranslations("navigation");
  return (
    <menu
      data-is-open={isOpen}
      id="navmenu"
      className={cn(
        "absolute top-full left-0 z-0 w-full origin-top overflow-clip rounded-b-3xl bg-white",
        !isOpen && "pointer-events-none",
      )}
    >
      <div className="menu__content px-3 py-5">
        <ul className="content flex flex-col gap-4">
          {navLeftLinks.map((item, index) => {
            if (item.subLinks.length > 0) {
              return (
                <NavigationMenuItemAccordion
                  key={index}
                  title={t(`${item.key}.${item.subLinks[0].key}`)}
                  data={item}
                ></NavigationMenuItemAccordion>
              );
            }
            return (
              <NavigationMenuItem key={index}>
                {t(`${item.key}`)}
              </NavigationMenuItem>
            );
          })}
        </ul>
        <Button className="mt-20 w-full">Calculate ROI</Button>
      </div>
    </menu>
  );
}

function NavigationMenuItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { isOpen, setIsOpen } = useNav();
  return (
    <li
      className={cn(
        "bg-secondary border-secondary-dark tracking-body overflow-clip rounded-2xl border-1 px-3 py-4 text-3xl inset-shadow-sm",
        className,
      )}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {children}
    </li>
  );
}

function NavigationMenuItemAccordion({
  className = "",
  title = "Accordion",
  data,
}: {
  className?: string;
  title: string;
  data: { key: string; url: string; subLinks: { key: string; url: string }[] };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNav();
  const t = useTranslations(`navigation.${data.key}`);

  return (
    <div
      data-is-open={isOpen}
      className={cn(
        "bg-secondary navmenu__accordion border-secondary-dark tracking-body overflow-clip rounded-2xl border-1 px-3 py-4 text-3xl inset-shadow-sm",
        className,
      )}
    >
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex h-full w-full items-center justify-between"
      >
        <span>{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      <NavigationMenuItemAccordionContent isOpen={isOpen}>
        {data.subLinks.map((item, index) => {
          if (index > 0)
            return (
              <Link
                onClick={() => {
                  nav.setIsOpen(!nav.isOpen);
                  setIsOpen(!isOpen);
                }}
                className="pt-3 text-black/60"
                key={index}
                href={item.url}
              >
                {t(item.key)}
              </Link>
            );
        })}
      </NavigationMenuItemAccordionContent>
    </div>
  );
}

function NavigationMenuItemAccordionContent({
  className = "",
  children,
  isOpen,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}) {
  return (
    <div
      data-is-open={isOpen}
      aria-disabled={!isOpen}
      className={cn(
        "collapsable navmenu__accordion__content flex h-fit flex-col overflow-clip",
        className,
        !isOpen && "pointer-events-none",
      )}
    >
      {children}
    </div>
  );
}

function NavigationTrigger({ className = "" }) {
  const nav = useNav();
  const t = useTranslations("navigation");

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
