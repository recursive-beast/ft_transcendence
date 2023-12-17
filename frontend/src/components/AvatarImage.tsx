"use client";

import { useStatus } from "@/hooks/useStatus";
import clsx from "clsx";
import Image from "next/image";

export function AvatarImage({ src, className, id }) {
  const status = useStatus(id);

  return (
    <Image
 alt=""
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
