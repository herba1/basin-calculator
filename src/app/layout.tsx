import type { Metadata } from "next";
import "./globals.css";
import { NavProvider } from "@/context/NavContext";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "California Water Insitute",
  description: "The California Water Institute (CWI) is located at California State University, Fresno and focuses on all aspects of sustainable water resource management solutions through outreach, entrepreneurship, education, testing, and interdisciplinary research.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.className} relative antialiased`}>
        <NextIntlClientProvider>
          <NavProvider>
            <NavigationBar></NavigationBar>
            {children}
            <Footer></Footer> 
          </NavProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
