"use client";

import { ScrollContext, ScrollProvider } from "@/components/ScrollProvider";
import "./globals.scss";
// import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
// const exa = localFont({ src: '../fonts/AVGARDD_2.woff' })

import { Poppins } from "next/font/google";
import { useContext } from "react";
import clsx from "clsx";

const exa = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function Content({ children }) {
  const [scroll] = useContext(ScrollContext);

  return (
    <html lang="en" className={clsx(!scroll && "overflow-hidden")}>
      <body className={exa.className + " no-scrollbar select-none"}>
        {children}
      </body>
    </html>
  );
}

export default function RootLayout(props) {
  return (
    <ScrollProvider defaultValue={false}>
      <Content {...props} />
    </ScrollProvider>
  );
}
