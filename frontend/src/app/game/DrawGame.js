"use client";

import { useEffect, useRef } from "react";

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
export const DrawGame = ({data}) => {
  
  function drawCircle(context, x, y, r, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, r, 0, Math.PI * 2);
    // context.closePath();
    context.fill();
  }

  function Drawnet(context) {
    if (width >= height) {
      for (let i = 0; i < height; i += 15) {
        context.fillRect(net.x, net.y + i, net.width, net.height);
      }
    } else {
      for (let i = 0; i < width; i += 15) {
        context.fillRect(net.x + i, net.y, net.height, net.width);
      }
    }
  }
  /** @param {CanvasRenderingContext2D} context */
  function draw(context) {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "black";

    // console.log(data.player1)
    context.fillRect(
      data.player1.x,
      data.player1.y,
      data.player1.width,
      data.player1.height,
    );

    context.fillRect(
      data.player2.x,
      data.player2.y,
      data.player2.width,
      data.player2.height,
    );

    drawCircle(context, data.ball.x, data.ball.y, 16, "black");
    Drawnet(context);
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
        className="hidden h-full w-full object-contain md:block"
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
        className="h-full w-full object-contain md:hidden"
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