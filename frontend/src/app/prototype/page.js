"use client";

import { useEffect, useRef } from "react";

const height = 700;
const width = height * (16 / 9);
const paddle = {
  height: 150,
  width: 10,
};

/** @param {CanvasRenderingContext2D} context */
function draw(context) {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "black";
  context.fillRect(
    2,
    (height - paddle.height) / 2,
    paddle.width,
    paddle.height,
  );
  context.fillRect(width - paddle.width - 2, (height - paddle.height) / 2, paddle.width, paddle.height,);

  context.fillRect(width - paddle.width - 2, 100, paddle.width, paddle.height);
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

export default function Prototype() {
  return (
    <div className="mx-auto aspect-video-portrait max-h-screen md:aspect-video">
      <CanvasHorizontal />
      <CanvasVertical />
    </div>
  );
}
