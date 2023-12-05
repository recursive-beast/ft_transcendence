"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "./DrawGame";
import { useWindowSize } from "@uidotdev/usehooks";

function Name() {
  const [socket, setsocket] = useState(null);
  const [waiting, setWat] = useState(false);
  const [ready, setReady] = useState(false);
  const windowSize = useWindowSize();
  const ref = useRef(null);
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
    if (socket) socket.on("game.found", (data) => {
      ref.current = data;
      setReady(true);
    });
    return () => {
      // TODO: cleanup socket listeners
    };
  }, [socket]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.repeat) return;

      if (event.key === " " ) {
        //     setKey("UP")
        socket.emit("game.move", " ");
      }
      if (event.key === "ArrowUp" && !isSmallDevice) {
        //     setKey("UP")
        socket.emit("game.move", "up");
      }
      if (event.key === "ArrowDown" && !isSmallDevice) {
        //     setKey("UP")
        socket.emit("game.move", "down");
      }
      if (event.key === "ArrowLeft" && isSmallDevice) {
        //     setKey("UP")
        socket.emit("game.move", "down");
      }
      if (event.key === "ArrowRight" && isSmallDevice) {
        //     setKey("UP")
        socket.emit("game.move", "up");
      }
    };

    const handleKeyUp= (event) => {
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
    <div className="page text-pr01 flex flex-col items-center justify-center h-screen">
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
        <div className="flex-1 flex items-center justify-center">
          <DrawGame data={ref} />
        </div>
      )}
    </div>
  );
}

export default Name;
