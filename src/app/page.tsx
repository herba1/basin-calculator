import { Geist } from "next/font/google";
import Hero from "./components/Hero";



export default function Home() {
  return (
    <main
      className={`h-[2000px]`}
    >
      <Hero></Hero>

    </main>
  );
}
