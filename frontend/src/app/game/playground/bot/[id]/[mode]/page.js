"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "../../../DrawGame";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { Title } from "@/components/common";

// mmessaou
import beach from "@/images/thems/logos/sumerr.png";
import beach_bg from "@/images/thems/game/beach.jpg";
import bot from "@/images/profils/bot.png";
import Image from "next/image";
import useSWR from "swr";
import clsx from "clsx";
import { Icon } from "@iconify/react";

function Side(props) {
  const points = Array.from({ length: props.breakpoint }, (_, i) => i + 1);
  return (
    <div
      className={clsx(
        "flex flex-col-reverse items-center",
        props.me ? "sm:flex-row-reverse" : "sm:flex-row",
      )}
    >
      {/* scoor & name */}
      <div className="space-y-2 sm:mx-3 sm:space-y-3">
        <div
          className="my-2 w-24 truncate rounded-md border border-tx02 bg-bg03 text-center text-xs font-light
                xs:w-32 xs:text-sm sm:w-40 sm:text-base xl:w-52 xl:text-lg"
        >
          {props.name}
        </div>

        {/* scoor */}
        <div className="flex items-center justify-between">
          {points.map((item) => (
            <div
              key={item}
              className={clsx(
                "h-2 w-2 rounded-full border border-tx05 sm:h-3 sm:w-3 xl:h-4 xl:w-4",
                item < 3 ? "bg-tx01" : "bg-bg03",
              )}
            />
          ))}
        </div>
      </div>

      {/* BOT avatar */}
      <Image
        className="w-12 flex-none rounded-full border border-tx05 object-cover sm:w-16 xl:w-20"
        src={props.src}
        quality={100}
        width={300}
        height={300}
      />
    </div>
  );
}

function Scoor(props) {
  const { data: me } = useSWR("/users/me");
  return (
    <section className="my-3 flex items-baseline xs:my-5 sm:my-7 sm:items-center sm:space-x-6 xl:space-x-8">
      {/* leave */}
      <button className="absolute top-2 left-3 flex group space-x-2 sm:top-5 md:top-auto sm:left-5 items-center">
        <Icon
          className="sm:h-7 sm:w-7 w-6 h-6 lg:h-8 lg:w-8 text-tx01 group-hover:text-[#E55F61] "
          icon="solar:arrow-left-broken"
        />
        <div className="hidden sm:group-hover:block font-light tracking-widest text-tx02">Leave</div>
      </button>

      {/* opponent */}
      <Side name="BOT" src={bot} breakpoint={7} />

      {/* theme logo */}
      <Image
        className="w-14 flex-none rounded-lg border border-tx05 object-cover sm:w-20 xl:w-24"
        src={beach}
        quality={100}
        width={300}
        height={300}
      />

      {/* ME */}
      <Side name={me?.displayName} src={me?.avatar} me={true} breakpoint={7} />
    </section>
  );
}

function Name() {
  const [ready, setReady] = useState(false);
  const windowSize = useWindowSize();
  const ref = useRef(null);
  const router = useRouter();
  const socket = useSocket();

  const isSmallDevice = windowSize.width <= 768;
  const getGmaeData = (data) => {
    // console.log(data);
    ref.current = data;
    setReady(true);
  };
  const gameOver = () => {
    socket.emit("end");
    router.push("/game/over");
  };
  useEffect(() => {
    // console.log("rendered");
    socket.on("game.found", getGmaeData);
    // socket.on("game.over", gameOver);
    socket.emit("play.ai");
    return () => {
      // TODO: cleanup socket listeners
      // socket.emit("kill.interval");
      socket.off("game.found", getGmaeData);
      // socket.off("game.over", gameOver);
    };
  }, []);

  useEffect(() => {
    let directions = [];

    const handleKeyDown = (event) => {
      if (event.repeat) return;

      if (event.key === " ") {
        socket.emit("game.move", " ");
        return;
      }

      let direction;

      if (event.key === "ArrowUp" && !isSmallDevice) direction = "up";
      if (event.key === "ArrowDown" && !isSmallDevice) direction = "down";
      if (event.key === "ArrowLeft" && isSmallDevice) direction = "down";
      if (event.key === "ArrowRight" && isSmallDevice) direction = "up";

      directions.unshift(direction);
      socket.emit("game.move", direction);
    };

    const handleKeyUp = (event) => {
      let direction;

      if (event.key === "ArrowUp" && !isSmallDevice) direction = "up";
      if (event.key === "ArrowDown" && !isSmallDevice) direction = "down";
      if (event.key === "ArrowLeft" && isSmallDevice) direction = "down";
      if (event.key === "ArrowRight" && isSmallDevice) direction = "up";

      directions = directions.filter((elem) => elem !== direction);

      if (directions.length > 0) socket.emit("game.move", directions[0]);
      else socket.emit("game.move", null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isSmallDevice]);

  return (
    <div className="flex h-screen flex-col items-center overflow-hidden text-tx01">
      <Scoor />

      {ready && (
        <div className="relative flex w-full flex-1 items-center justify-center p-8">
          <Image
            className="object-cover opacity-60"
            src={beach_bg}
            quality={100}
            fill
          />
          <div className="z-10 rounded-lg border border-tx02 bg-bg03/30 p-4 backdrop-blur-sm xs:p-6 sm:p-8 lg:p-10">
            <DrawGame data={ref} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Name;
