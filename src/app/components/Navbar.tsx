"use client";

import { useNav } from "@/context/NavContext";
import Image from "next/image";
import Link from "next/link";
import cn from "../utils/cn";

const navLeftLinks = [
  { name: "Problem", url: "#problem", subLinks: [] },
  { name: "Solution", url: "#solution", subLinks: [] },
  { name: "Extra", url: "", subLinks: [] },
];

export default function NavigationMenu({ className = "" }) {
  const nav = useNav();

  return (
    <nav className={`${className} nav__container py-3 px-3`}>
      <ul className="nav__list flex nav__left">
        <Image
          src="/cwi_logo.svg"
          width={100}
          height={100}
          alt="none"
          className="w-19 mr-3"
        ></Image>
        {navLeftLinks.map((e) => {
          return (
            <NavLink key={e.name} href={e.url}>
              {e.name}
            </NavLink>
          );
        })}
      </ul>
      <ul className="nav__list flex nav__right">
        <button></button>

      </ul>
    </nav>
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
