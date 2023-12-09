"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "../DrawGame";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

function Name(){
  const [ready, setReady] = useState(false);
  const windowSize = useWindowSize();
  const ref = useRef(null);
  const router = useRouter();
  const socket = useSocket();

  const isSmallDevice = windowSize.width <= 768;
  const getGmaeData = (data) => {
    console.log(data);
  ref.current = data;
  setReady(true);
}
const gameOver = () => {
  router.push("/game/over");
}
  useEffect(() => {
    // console.log("rendered");
    socket.on("game.found", getGmaeData);
    socket.on("game.over", gameOver);
    socket.emit("ready");
    socket.emit("start");
    return () => {
      // TODO: cleanup socket listeners
      socket.emit("kill.interval");
      socket.off("game.found", getGmaeData);
      socket.off("game.over", gameOver);
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
      console.log(13);
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
    <div className="page flex h-screen flex-col items-center justify-center text-pr01">
      {ready && (
        <div className="flex flex-1 items-center justify-center">
          <DrawGame data={ref} />
        </div>
      )}
    </div>
  );
};

export default Name;
