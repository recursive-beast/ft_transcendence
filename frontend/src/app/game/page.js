"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "./DrawGame";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

function Name() {
  const [socket, setsocket] = useState(null);
  const [waiting, setWat] = useState(false);
  const [ready, setReady] = useState(false);
  const windowSize = useWindowSize();
  const ref = useRef(null);
  const router = useRouter();

  // const [key, setKey] = useState(null);
  const isSmallDevice = windowSize.width <= 768;

  useEffect(() => {
    const newsocket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      withCredentials: true,
    });

    setsocket(newsocket);

    return () => newsocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

      socket.on("game.found", (data) => {
        ref.current = data;
        setReady(true);
      });
      socket.on("game.over", () => {
        router.push("/game/over");
      });

    return () => {
      // TODO: cleanup socket listeners
    };
  }, [socket]);

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

      directions = directions.filter(elem => elem !== direction);

      if (directions.length > 0)
        socket.emit("game.move", directions[0]);
      else
        socket.emit("game.move", null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [socket, isSmallDevice]);

  function clickhandler() {
    const mode = "classic";
    socket.emit("game.queue", { mode });
    setWat(true);
  }
  function clickhandler1() {
    const mode = "mode 1";
    socket.emit("game.queue", { mode });
    setWat(true);
  }
  function clickhandler2() {
    const mode = "mode 2";
    socket.emit("play.ia", { mode });
    setWat(true);
    // setReady(true);
  }
  function clickhandler3() {
    const mode = "mode 2";
    socket.emit("cancel", { mode });
    setWat(false);
  }
  // return(
  //   <div className="page text-pr01">
  //     <button onClick={clickhandler}>classic</button>
  //     <button onClick={clickhandler1}>mode 2</button>
  //     <button onClick={clickhandler2}>mode 3</button>

  //   </div>
  // );
  return (
    <div className="page flex h-screen flex-col items-center justify-center text-pr01">
      {waiting ? (
        <div>
          <p>Waiting for server response...</p>
          <button onClick={clickhandler3}>cancel</button>
          {/* You can customize the waiting page content here */}
        </div>
      ) : (
        <div className="grid">
          <button onClick={clickhandler}>classic</button>
          <button onClick={clickhandler1}>mode 2</button>
          <button onClick={clickhandler2}>computer</button>
        </div>
      )}

      {ready && (
        <div className="flex flex-1 items-center justify-center">
          <DrawGame data={ref} />
        </div>
      )}
    </div>
  );
}

export default Name;
