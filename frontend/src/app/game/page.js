"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { DrawGame } from "./DrawGame";

function Name() {
  const [socket, setsocket] = useState({});
  const [waiting, setWat] = useState(false);
  const [data, setData] = useState(null);
  // const [key, setKey] = useState(null);

  useEffect(() => {
    const newsocket = io("http://localhost:8000", {
      withCredentials: true,
    });
    setsocket(newsocket);
    newsocket.on("connect", () => {
      console.log("connected");
    });
    newsocket.on("game.found", (data) => {
      // console.log('Received message:', data);
      setData(data);
    });
    const handleKeyPress = (event) => {
      // console.log(event.key);
      if (event.key === "ArrowUP"){
    //     setKey("UP")
        socket.emit("game.move", { direction: "up" });
      }
    }
    window.addEventListener("keydown",handleKeyPress)

    return () => {
      newsocket.disconnect();
      window.removeEventListener("keydown",handleKeyPress)
    };
  }, []);

  function clickhandler() {
    const mode = "classic";
    socket.emit("game.queue", { mode });
    console.log(socket);
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
    <div className="page text-pr01">
      {waiting ? (
        <div>
          <p>Waiting for server response...</p>
          <button onClick={clickhandler3}>cancel</button>
          {/* You can customize the waiting page content here */}
        </div>
      ) : (
        <div>
          <button onClick={clickhandler}>classic</button>
          <button onClick={clickhandler1}>mode 2</button>
          <button onClick={clickhandler2}>mode 3</button>
        </div>
      )}

      {data && (
        <div>
          <DrawGame data={data} />
        </div>
      )}
    </div>
  );
}

export default Name;
