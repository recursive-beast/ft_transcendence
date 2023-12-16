"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "../../DrawGame";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

function GameOver(props) {
  return (
    <div
      className="absolute left-1/2 top-1/2  z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-bg01/80 p-5
  text-center text-2xl text-tx01 backdrop-blur-sm xl:p-14 xl:text-8xl"
    >
      Game over <br /> {props.winner}
    </div>
  );
}

function Name({ params }) {
  const [ready, setReady] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const windowSize = useWindowSize();
  const ref = useRef(null);
  const router = useRouter();
  const socket = useSocket();

  const isSmallDevice = windowSize.width <= 768;
  const getGmaeData = (data) => {
    ref.current = data;
    setReady(true);
  };
  const handleGameOver = (data) => {
    setWinner(data);
    setGameOver(true);
    socket.emit("end");
  };
  const handlefriendleft = () => {
    router.push("/game");
  };
  useEffect(() => {
    socket.on("game.found", getGmaeData);
    socket.on("game.over", handleGameOver);
    socket.on("friend.left", handlefriendleft);
    socket.emit("in", params.id);
    socket.emit("ready");
    socket.emit("start");
    return () => {
      // TODO: cleanup socket listeners
      socket.emit("kill.interval");
      socket.off("game.found", getGmaeData);
      socket.off("game.over", handleGameOver);
      socket.off("friend.left", handlefriendleft);
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
      {ready &&
        !gameOver && ( // Render the div only if ready and not game over
          <>
            {/* draw canvas */}
            <DrawGame data={ref} />
          </>
        )}
      {gameOver && ( // Render the div only if ready and not game over
        <>
          {/* game over */}
          {/* <div
            className="absolute left-1/2 top-1/2  z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-bg01/80 p-5
      text-center text-2xl text-tx01 backdrop-blur-sm xl:p-14 xl:text-8xl"
          >
            Game over <br /> {winner}
          </div> */}
          <GameOver />

          {/* draw canvas */}
          <DrawGame data={ref} />
        </>
      )}
    </div>
  );
}

export default Name;
