"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "../DrawGame";
import { useWindowSize } from "@uidotdev/usehooks";
import { useSocket } from "@/hooks/useSocket";

function Name(){
  const [ready, setReady] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const windowSize = useWindowSize();
  const ref = useRef(null);
  const socket = useSocket();
  // let winner  = "";

  const isSmallDevice = windowSize.width <= 768;
  const getGmaeData = (data) => {
  ref.current = data;
  setReady(true);
}
const handleGameOver = (data) => {
  console.log(data);
  setWinner(data)
  setGameOver(true);
  socket.emit("end");
}
  useEffect(() => {
    // console.log("rendered");
    socket.on("game.found", getGmaeData);
    socket.on("game.over", handleGameOver);
    socket.emit("ready");
    socket.emit("start");
    return () => {
      // TODO: cleanup socket listeners
      socket.emit("kill.interval");
      socket.off("game.found", getGmaeData);
      socket.off("game.over", handleGameOver);
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
    <div className="flex h-screen flex-col items-center justify-center text-tx01">
    {ready && !gameOver && ( // Render the div only if ready and not game over
      <>
        {/* draw canvas */}
        <DrawGame data={ref}/>
      </>
    )}
    {gameOver && ( // Render the div only if ready and not game over
      <>
      {/* game over */}
      <div className="absolute text-8xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-14
      bg-bg01/80 backdrop-blur-sm text-tx01 text-center rounded-xl z-20">Game over <br/> {winner}</div>

      {/* draw canvas */}
      <DrawGame data={ref} />
    </>
    )}
  </div>
);
};

export default Name;
