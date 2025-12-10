import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basin Calculator",
  description: "Calculate the costs and benefits of building a recharge basin.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
