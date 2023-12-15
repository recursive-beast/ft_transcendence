"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "../../../DrawGame";
import { useWindowSize } from "@uidotdev/usehooks";
import { useSocket } from "@/hooks/useSocket";

export default function Name() {
  const [ready, setReady] = useState(false);
  const [gameOver, setGameOver] = useState(false); // Add game over state
  const [winner, setWinner] = useState("");
  const windowSize = useWindowSize();
  const ref = useRef(null);
  const socket = useSocket();

  const isSmallDevice = windowSize.width <= 768;
  const getGameData = (data) => {
    ref.current = data;
    setReady(true);
  };

  const handleGameOver = (data) => {
    setWinner(data)
    setGameOver(true); // Set game over state to true
    socket.emit("end");
  };

  useEffect(() => {
    socket.on("game.found", getGameData);
    socket.on("game.over", handleGameOver);
    socket.emit("play.ai");
    return () => {
      socket.off("game.found", getGameData);
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
          <DrawGame data={ref} bot={true}/>
        </>
      )}
      {gameOver && ( // Render the div only if ready and not game over
        <>
        {/* game over */}
        <div className="absolute text-8xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-14
        bg-bg01/80 backdrop-blur-sm text-tx01 text-center rounded-xl z-20">Game over <br/> {winner}</div>

        {/* draw canvas */}
        <DrawGame data={ref} bot={true}/>
      </>
      )}
    </div>
  );
}
// export default Name;
