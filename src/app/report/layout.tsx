
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basin Recharge | Report ",
  description: "View the detailed report of your basin recharge calculations.",
};

export default function Layout({children}: {children: React.ReactNode}) {

    return <>{children}</>

}