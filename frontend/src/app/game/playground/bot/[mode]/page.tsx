"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "../../DrawGame";
import { useWindowSize } from "@uidotdev/usehooks";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/navigation";

export function GameOver(props) {
  const router = useRouter();
  return (
    <div className="absolute left-0 top-0 z-20 flex h-screen w-full items-center justify-center bg-bg01/30 backdrop-blur-sm">
      <div className="flex w-48 flex-col gap-3 rounded-md border-2 bg-bg01/50 py-3 text-center backdrop-blur-xl xs:w-56 xs:py-5 sm:w-72 lg:w-96 lg:gap-5">
        {/* Game over <br /> {props.winner} */}
        <div className="flex flex-col items-center font-light tracking-wider sm:gap-2">
          <span className="text-2xl text-tx02 sm:text-4xl lg:text-6xl">
            GAME OVER
          </span>
          <span className="text-xl uppercase sm:text-2xl lg:text-4xl">
            {props.winner}
          </span>
        </div>
        <button
          onClick={() => {
            router.push("/game");
          }}
          className="z-10 mx-auto rounded-full border border-tx01 px-3 py-[1px] text-center text-sm font-light uppercase tracking-wider
          text-tx01 transition-colors duration-[400ms] ease-linear hover:bg-tx01 hover:text-tx03 sm:text-base lg:text-lg"
        >
          leave
        </button>
      </div>
    </div>
  );
}

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
    setWinner(data);
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
      socket.emit("end");
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
      {ready && (
        <>
          {gameOver && <GameOver winner={winner} />}
          {/* draw canvas */}
          <DrawGame data={ref} bot={true} />
        </>
      )}
    </div>
  );
}
// export default Name;
