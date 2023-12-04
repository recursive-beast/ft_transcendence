"use client";

import "./globals.scss";
// import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
// const exa = localFont({ src: '../fonts/AVGARDD_2.woff' })

import { Poppins } from "next/font/google";
import { useEffect } from "react";
import clsx from "clsx";
import { SWRConfig } from "swr";
import { fetcher } from "@/common";

const exa = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  });

  return (
    <SWRConfig value={{ fetcher }}>
      <html lang="en">
        <body
          className={clsx(exa.className, "no-scrollbar select-none bg-bg01")}
        >
          {children}
        </body>
      </html>
    </SWRConfig>
  );
}
