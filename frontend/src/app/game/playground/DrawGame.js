"use client";

import { forwardRef, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";


const height = 700;
const width = height * (16 / 9);
const paddle = {
  height: 150,
  width: 15,
};
const net = {
  x: (50 * width) / 100 - 2 / 2,
  y: 0,
  width: 2,
  height: 10,
  color: "black",
};

const obj = {
  "classic" : {
    img: "img url",
    canvasbackground: "#262522",
    paddleColor: "#b7ab98",
    ballColor: "#f2937d",
    netColor: "#625d53",
    bordercolor: "border-[#ffffff]",
  },
  "beach" : {
    img: "img ",
    canvasbackground: "#f0ebd8",
    paddleColor: "#2d95b5",
    ballColor: "#ffcc5d",
    netColor: "#625d53",
    bordercolor: "border-[#625d53]",
  },
  "Glacier" : {
    img: "img ",
    canvasbackground: "#e0fdff",
    paddleColor: "#17816a",
    ballColor: "#a1d0fc",
    netColor: "#00aeb0",
    bordercolor: "border-[#625d53]",
    
  },
  "StellarShowdown" : {
    img: "img ",
    paddleColor: "#7b469d",
    canvasbackground: "#262522",
    ballColor: "#ffb320",
    netColor: "#ffffff",
    bordercolor: "border-[#625d53]",
  },
}

export const DrawGame = ({data}) => {
  const {mode} = useParams();
  const  color = obj[mode];

  function drawCircle(context, x, y, r, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, r, 0, Math.PI * 2);
    // context.closePath();
    context.fill();
  }

  function Drawnet(context) {
    context.fillStyle = color.netColor;
    if (width >= height) {
      for (let i = 0; i < height; i += 15) {
        context.fillRect(net.x, net.y + i, net.width, net.height);
      }
    } else {
      for (let i = 0; i < width; i += 15) {
        context.fillRect(net.x + i, net.y, net.height, net.width);
      }
    }
    context.fillRect(0,(height/2) - 1, width,2);
  }
  /** @param {CanvasRenderingContext2D} context */
  function draw(context) {
    // console.log(data.current);
    context.fillStyle = color.canvasbackground;
    context.fillRect(0, 0, width, height);
    context.beginPath();
    Drawnet(context);
    context.fillStyle = color.paddleColor;
    // console.log(data.player1)
    context.roundRect(
    data.current.player1.x,
    data.current.player1.y,
    data.current.player1.width,
    data.current.player1.height,
    40
    );
    
    // if ( data.current.ia === 0)
    // {
      context.roundRect(
        data.current.player2.x,
        data.current.player2.y,
        data.current.player2.width,
        data.current.player2.height,
        40
        );
        context.fill();
    // }
    // else{
    //   ;
    //   context.fillRect(
    //   data.current.player2.x,
    //   data.current.player2.y,
    //   data.current.player2.width,
    //   data.current.player2.height,
    //   );
    // }

    drawCircle(context,data.current.ball.x,data.current.ball.y, 16, color.ballColor);
    // console.log(Math.sqrt((0.0981*(height * width)/100)*(1/Math.PI)));
    //   context.fillRect(width - paddle.width - 2, 100, paddle.width, paddle.height);
  }

  function CanvasHorizontal() {
    const ref = useRef(null);

    useEffect(() => {
      /** @type {HTMLCanvasElement} */
      const canvas = ref.current;
      const context = canvas.getContext("2d");

      function frame() {
        draw(context);
        id = requestAnimationFrame(frame);
      }

      let id = requestAnimationFrame(frame);

      return () => cancelAnimationFrame(id);
    }, []);

    return (
      <canvas
        width={width}
        height={height}
        ref={ref}
        className={clsx("hidden h-full w-full object-contain md:block border rounded-md overflow-hidden", color.bordercolor)}
      />
    );
  }

  function CanvasVertical() {
    const ref = useRef(null);

    useEffect(() => {
      /** @type {HTMLCanvasElement} */
      const canvas = ref.current;
      const context = canvas.getContext("2d");

      function frame() {
        context.translate(canvas.width, 0);
        context.rotate(Math.PI / 2);
        draw(context);
        context.resetTransform();
        id = requestAnimationFrame(frame);
      }

      let id = requestAnimationFrame(frame);

      return () => cancelAnimationFrame(id);
    }, []);

    return (
      <canvas
        width={height}
        height={width}
        ref={ref}
        className={clsx("h-full w-full object-contain md:hidden border rounded-md overflow-hidden", color.bordercolor)}
      />
    );
  }

  return (
    <div className="mx-auto aspect-video-portrait max-h-screen md:aspect-video">
      <CanvasHorizontal />
      <CanvasVertical />
    </div>
  );
};

export default DrawGame;
