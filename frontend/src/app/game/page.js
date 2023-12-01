"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

function Name(){
  const [socket, setsocket] = useState({});
  const [waiting, setWat] = useState(false);
  const [srvRes, setRes] = useState(false);
  useEffect(() => {
    const newsocket = io('http://localhost:8000', {
    withCredentials: true
});
    setsocket(newsocket);
    newsocket.on("connect", () => {
      console.log("connected");
    });
    newsocket.on('game.found', (data) => {
      // console.log('Received message:', data);
      setRes(true);
    });

    return () => {
      newsocket.disconnect();
    };
  }, []);

  function clickhandler(){
    const mode = 'classic'
    socket.emit('game.queue', { mode }, (x) => console.log("response: ", x));
    console.log(socket);
    setWat(true);
  }
  function clickhandler1(){
    const mode = 'mode 1'
    socket.emit('game.queue', { mode });
    setWat(true);
  }
  function clickhandler2(){
    const mode = 'mode 2'
    socket.emit('game.queue', { mode });
    setWat(true);
  }
  function clickhandler3(){
    const mode = 'mode 2'
    socket.emit('cancel', { mode });
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

      {srvRes && (
        <div>
           <p>match fond</p>
        </div>
      )}
    </div>
  );
}

export default Name;