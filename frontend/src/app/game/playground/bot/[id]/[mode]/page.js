"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "../../../DrawGame";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

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
      // console.log(event.key);
      // console.log("window.width =====",event.touches[0].screenX);
      
      if (event.key === "ArrowUp" && !isSmallDevice) direction = "up";
      if (event.key === "ArrowDown" && !isSmallDevice) direction = "down";
      if (event.key === "ArrowLeft" && isSmallDevice) direction = "down";
      if (event.key === "ArrowRight" && isSmallDevice) direction = "up";
      // if (!event.key && event.touches[0].clientX < event.touches[0].screenX/2)direction = "down";
      
      directions.unshift(direction);
      socket.emit("game.move", direction);
    };

    const handleKeyUp = (event) => {
      let direction;
      // console.log(event.targetTouches);//screenX  clientX
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
    // window.addEventListener("touchstart", handleKeyDown);
    // window.addEventListener("touchmove", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isSmallDevice]);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-tx01">
      {ready && (
        <>
          {/* game over */}
          <div className="hidden absolute text-8xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-14
          bg-bg01/80 backdrop-blur-sm text-tx01 rounded-xl z-20">Game over</div>

          {/* draw canvas */}
          <DrawGame data={ref} />
        </>
      )}
    </div>
  );
}
export default Name;