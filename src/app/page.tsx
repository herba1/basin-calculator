import { Geist } from "next/font/google";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import CallToAction from "./components/Cta";

export default function Home() {
  return (
    <main className={`h-[5000px]`}>
      <Hero></Hero>
      <Problem></Problem>
      <CallToAction></CallToAction>
    </main>
  );
}
