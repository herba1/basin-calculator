import { useTranslations } from "next-intl";
import Button from "./Button";
import cn from "../utils/cn";
import Link from "next/link";
import Image from "next/image";

const FOOTER_DATA = {
  about: {
    key: "about",
    title: {
      key: "title",
    },
    description: {
      key: "description",
    },
  },
  generalLinks: {
    key: "generalLinks",
    links: [
      { key: "home", url: "#" },
      { key: "calculator", url: "#" },
      { key: "contact", url: "#" },
    ],
  },
  cwiLinks: {
    key: "cwiLinks",
    links: [
      { key: "about", url: "#" },
      { key: "research", url: "#" },
      { key: "education", url: "#" },
      { key: "news", url: "#" },
      { key: "events", url: "#" },
    ],
  },
  divisionsLinks: {
    key: "divisionsLinks",
    links: [
      { key: "cit", url: "#" },
      { key: "wet", url: "#" },
      { key: "dre", url: "#" },
    ],
  },
  newsletter: {
    key: "newsletter",
    button: { key: "button", url: "#" },
    text: { key: "text" },
  },
  socials: {
    key: "connect",
    links: [
      {
        key: "x",
        url: "https://twitter.com/FSCWI",
        icon: "/xlogo.svg",
        alt: "X social media Logo",
      },
      {
        key: "youtube",
        url: "https://www.youtube.com/@FSCWI",
        icon: "/youtubeicon.webp",
        alt: "YouTube Logo",
      },
      {
        key: "linkedin",
        url: "https://www.linkedin.com/company/california-water-institute/",
        icon: "/linkedinicon.png",
        alt: "LinkedIn Logo",
      },
    ],
  },
};

export default function Footer() {
  const t = useTranslations("footer");
  console.log(`${FOOTER_DATA.divisionsLinks.key}.header`);
  return (
    <footer className="grid grid-cols-2 gap-10 px-4 pt-20 pb-5 lg:grid-cols-12 lg:gap-x-6 lg:px-0 lg:pb-20">
      {/* About Section - Mobile: full width, Desktop: col 2-4 */}
      <article className="col-span-2 lg:col-span-3 lg:col-start-2">
        <FooterHeader>
          {t(`${FOOTER_DATA.about.key}.${FOOTER_DATA.about.title.key}`)}
        </FooterHeader>
        <p className="tracking-body max-w-lg text-black/60">
          {t(`${FOOTER_DATA.about.key}.${FOOTER_DATA.about.description.key}`)}
        </p>
      </article>

      {/* General Links - Mobile: col 1, Desktop: col 6-7 */}
      <FooterNav className="col-span-1 lg:col-span-2 lg:col-start-6">
        <FooterHeader>
          {t(`${FOOTER_DATA.generalLinks.key}.header`)}
        </FooterHeader>
        <ul>
          {FOOTER_DATA.generalLinks.links.map((link) => {
            return (
              <li key={link.key}>
                <FooterLink href={link.url}>
                  {t(`generalLinks.links.${link.key}`)}
                </FooterLink>
              </li>
            );
          })}
        </ul>
      </FooterNav>

      {/* CWI Links - Mobile: col 2, Desktop: col 8-9 */}
      <FooterNav className="col-span-1 lg:col-span-2 lg:col-start-8">
        <FooterHeader>{t(`${FOOTER_DATA.cwiLinks.key}.header`)}</FooterHeader>
        <ul>
          {FOOTER_DATA.cwiLinks.links.map((link) => {
            return (
              <li key={link.key}>
                <FooterLink href={link.url}>
                  {t(`cwiLinks.links.${link.key}`)}
                </FooterLink>
              </li>
            );
          })}
        </ul>
      </FooterNav>

      {/* Logo - Mobile: bottom, Desktop: col 10-11 at top */}
      <div className="order-last col-span-2 w-full object-contain lg:order-none lg:col-span-2 lg:col-start-10 lg:row-start-1">
        <Image
          src={"/cwi_logo.svg"}
          alt="California Water Institute"
          className="pointer-events-none object-contain select-none"
          width={500}
          height={500}
        ></Image>
      </div>

      {/* Newsletter - Mobile: full width below about, Desktop: continues in col 2-4, aligned to bottom */}
      <div className="col-span-2 flex flex-col gap-2 overflow-visible lg:col-span-3 lg:col-start-2 lg:self-end">
        <p className="tracking-body mx-auto w-full text-center text-black/60 ">
          {t(
            `${FOOTER_DATA.newsletter.key}.${FOOTER_DATA.newsletter.text.key}`,
          )}
        </p>
        <Button className="w-full bg-red-600 py-3">
          {t(
            `${FOOTER_DATA.newsletter.key}.${FOOTER_DATA.newsletter.button.key}`,
          )}
        </Button>
      </div>

      {/* Divisions - Mobile: full width, Desktop: below General Links in col 6-7, aligned to bottom */}
      <FooterNav className="col-span-2 lg:col-span-4 lg:col-start-6 lg:self-end">
        <FooterHeader>
          {t(`${FOOTER_DATA.divisionsLinks.key}.header`)}
        </FooterHeader>
        <ul>
          {FOOTER_DATA.divisionsLinks.links.map((link) => {
            return (
              <li key={link.key}>
                <FooterLink href={link.url}>
                  {t(`${FOOTER_DATA.divisionsLinks.key}.links.${link.key}`)}
                </FooterLink>
              </li>
            );
          })}
        </ul>
      </FooterNav>

      {/* Connect/Socials - Mobile: centered, Desktop: below logo in col 10-11, aligned to bottom */}
      <div className="connect col-span-2 flex flex-col items-center justify-center gap-2 lg:col-span-2 lg:col-start-10 lg:items-start lg:self-end">
        <FooterHeader className="text-center lg:text-left">
          {t(`${FOOTER_DATA.socials.key}`)}
        </FooterHeader>
        <ul className="flex max-w-md justify-center gap-12 lg:justify-start lg:gap-[3vw]">
          {FOOTER_DATA.socials.links.map((social) => (
            <li key={social.key} className="h-8 w-full">
              <a
                target="_blank"
                className="inline-block h-full w-full"
                rel="noopener noreferrer"
                href={social.url}
              >
                <Image
                  alt={social.alt}
                  className="h-full w-full object-contain"
                  width={50}
                  height={50}
                  src={social.icon}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function FooterNav({
  className,
  children,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <nav className={cn("", className)}>{children}</nav>;
}

function FooterHeader({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("tracking-body font-bold", className)}>{children}</h3>
  );
}

function FooterLink({
  className,
  href,
  children,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      {...props}
      className={cn("tracking-body text-black/60", className)}
    >
      {children}
    </Link>
  );
}
