"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "./DrawGame";
import { useMediaQuery } from "@uidotdev/usehooks";

function Name() {
  const [socket, setsocket] = useState(null);
  const [waiting, setWat] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef(null);
  // const [key, setKey] = useState(null);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  useEffect(() => {
    const newsocket = io("http://localhost:8000", {
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
    const handleKeyPress = (event) => {
      console.log(event.key);
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
        socket.emit("game.move", "left");
      }
      if (event.key === "ArrowRight" && isSmallDevice) {
        //     setKey("UP")
        socket.emit("game.move", "right");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
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
    socket.emit("game.queue", { mode });
    setWat(true);
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
          <button onClick={clickhandler2}>mode 3</button>
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
