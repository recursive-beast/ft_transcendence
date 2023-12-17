import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export function useStatus(id) {
  const socket = useSocket();
  const [status, setStatus] = useState("OFFLINE");

  function update(data) {
    if (data.id === id) setStatus(data.status);
  }

  useEffect(() => {
    socket.on("user.status", update);
    socket.emit("user.status", id);

    return () => {
      socket.off("user.status", update);
    };
  }, [id]);

  return status;
}
