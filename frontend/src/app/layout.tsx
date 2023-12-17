"use client";

import "./globals.scss";
// import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
// const exa = localFont({ src: '../fonts/AVGARDD_2.woff' })

import { Poppins } from "next/font/google";
import { useEffect } from "react";
import clsx from "clsx";
import { SWRConfig } from "swr";
import axios from "axios";
import { SocketProvider } from "@/components/SocketProvider";
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from "notistack";
import { useSocket } from "@/hooks/useSocket";
import { Notif } from "@/components/common";

const exa = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
  display: "swap",
});

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

function Children({ children }) {
  const socket = useSocket();

  function onNotification(notification) {
    let id;

    function onJoin() {
      closeSnackbar(id);
    }

    id = enqueueSnackbar(
      <Notif
        hideAvatar={notification.type === "ACHIEVEMENT_UNLOCKED"}
        notification={notification}
        onJoin={onJoin}
        hideTime
      />,
    );
  }

  useEffect(() => {
    socket.on("notification", onNotification);

    return () => {
      socket.off("notification", onNotification);
    };
  }, []);

  return children;
}

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  });

  return (
    <SocketProvider>
      <SWRConfig
        value={{ fetcher: (url) => axios.get(url).then((res) => res.data) }}
      >
        <html lang="en" className="no-scrollbar">
          <body
            className={clsx(exa.className, "no-scrollbar select-none bg-bg01")}
          >
            <SnackbarProvider
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Children>{children}</Children>
            </SnackbarProvider>
          </body>
        </html>
      </SWRConfig>
    </SocketProvider>
  );
}
