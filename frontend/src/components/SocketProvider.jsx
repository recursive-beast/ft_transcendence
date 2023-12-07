"use client";

import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
  withCredentials: true,
  autoConnect: false,
});

export const SocketContext = createContext(socket);

export function SocketProvider({ children }) {
  useEffect(() => {
    socket.connect();

    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
