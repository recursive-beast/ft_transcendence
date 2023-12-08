"use client";

import { useSocket } from "@/hooks/useSocket";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

export function AvatarImage({ src, className, id }) {
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

  return (
    <Image
      className={clsx(
        "flex-none rounded-full border-[1.5px] object-cover p-[2px]",
        className,
        status === "ONLINE" && "border-[#24E5A5]",
        status === "OFFLINE" && "border-tx02",
        status === "INGAME" && "border-[#EB5A3A]",
      )}
      src={src}
      quality={100}
      width={300}
      height={300}
    />
  );
}
