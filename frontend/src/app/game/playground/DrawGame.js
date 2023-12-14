"use client";

import { forwardRef, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/navigation";
import clsx from "clsx";

// mmessaou
import beach from "@/images/thems/logos/sumerr.png";
import beach_bg from "@/images/thems/game/beach.jpg";
import bot from "@/images/profils/bot.png";
import Image from "next/image";
import useSWR from "swr";
import { Icon } from "@iconify/react";
import { useState } from "react";

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
let ballx = 0;
let bally = 0;

const obj = {
  classic: {
    img: "img url",
    canvasbackground: "#262522",
    paddleColor: "#b7ab98",
    ballColor: "#f2937d",
    netColor: "#625d53",
    bordercolor: "border-[#ffffff]",
    bgImage: beach_bg,
  },
  beach: {
    img: "img ",
    canvasbackground: "#f0ebd8",
    paddleColor: "#2d95b5",
    ballColor: "#ffcc5d",
    netColor: "#625d53",
    bordercolor: "border-[#625d53]",
    bgImage: beach_bg,
  },
  snow: {
    img: "img ",
    canvasbackground: "#e0fdff",
    paddleColor: "#17816a",
    ballColor: "#a1d0fc",
    netColor: "#00aeb0",
    bordercolor: "border-[#625d53]",
    bgImage: beach_bg,
  },
  space: {
    img: "img ",
    paddleColor: "#7b469d",
    canvasbackground: "#262522",
    ballColor: "#ffb320",
    netColor: "#ffffff",
    bordercolor: "border-[#625d53]",
    bgImage: beach_bg,
  },
};

export const DrawGame = ({ data }) => {
  const [myScore, setMyScore] = useState(0);
  const [score, setScore] = useState(0);
  const { mode } = useParams();
  const color = obj[mode];

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
    context.fillRect(0, height / 2 - 1, width, 2);
  }

  // update score
  /** @param {CanvasRenderingContext2D} context */
  function draw(context) {
    // update score
    setScore(data.current.player1.score);
    setMyScore(data.current.player2.score);

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
      40,
    );

    // if ( data.current.ia === 0)
    // {
    context.roundRect(
      data.current.player2.x,
      data.current.player2.y,
      data.current.player2.width,
      data.current.player2.height,
      40,
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
    // if (data.current.ball.space === 0){
    //   ballx = data.current.ball.x;
    //   bally = data.current.ball.y;
    // }
    // if (data.current.ball.space === 1){
    //   if (ballx <= 0 || ballx > width)
    //     data.current.ball.velocityX *= -1;
    //     if (ballx <= 0 || ballx > height)
    //     data.current.ball.velocityY *= -1;
    //   ballx +=  data.current.ball.velocityX;
    //   bally +=  data.current.ball.velocityY;
    // }

    drawCircle(
      context,
      data.current.ball.x,
      data.current.ball.y,
      16,
      color.ballColor,
    );
    // console.log("x = " ,Math.round(data.current.ball.x), "y   ===  ",Math.round(data.current.ball.y));
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
        className={clsx(
          "hidden h-full w-full overflow-hidden rounded-md border object-contain md:block",
          color.bordercolor,
        )}
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
        className={clsx(
          "h-full w-full overflow-hidden rounded-md border object-contain md:hidden",
          color.bordercolor,
        )}
      />
    );
  }

  function Side(props) {
    const points = Array.from({ length: props.breakpoint }, (_, i) => i + 1);
    return (
      <div
        className={clsx(
          "flex flex-col-reverse items-center",
          props.me ? "sm:flex-row-reverse" : "sm:flex-row",
        )}
      >
        {/* scoor & name */}
        <div className="space-y-2 sm:mx-3 sm:space-y-3">
          <div
            className="my-2 w-24 truncate rounded-md border border-tx02 bg-bg03 text-center text-xs font-light
                  xs:w-32 xs:text-sm sm:w-40 sm:text-base xl:w-52 xl:text-lg"
          >
            {props.name}
          </div>

          {/* scoor */}
          <div className="flex items-center justify-between">
            {points.map((item) => (
              <div
                key={item}
                className={clsx(
                  "h-2 w-2 rounded-full border border-tx05 sm:h-3 sm:w-3 xl:h-4 xl:w-4",
                  item <= props.points ? "bg-tx01" : "bg-bg03",
                )}
              />
            ))}
          </div>
        </div>

        {/* BOT avatar */}
        <Image
          className="w-12 flex-none rounded-full border border-tx05 object-cover sm:w-16 xl:w-20"
          src={props.src}
          quality={100}
          width={300}
          height={300}
        />
      </div>
    );
  }

  function Scoor(props) {
    const { data: me } = useSWR("/users/me");
    const socket = useSocket();
    const router = useRouter();
    return (
      <section className="my-3 flex items-baseline xs:my-5 sm:my-7 sm:items-center sm:space-x-6 xl:space-x-8">
        {/* leave */}
        <button
          className="group absolute left-3 top-2 flex items-center space-x-2 sm:left-5 sm:top-5 md:top-auto"
          onClick={() => {
            socket.emit("end");
            router.push(`/game`);
          }}
        >
          <Icon
            className="h-6 w-6 text-tx01 group-hover:text-[#E55F61] sm:h-7 sm:w-7 lg:h-8 lg:w-8 "
            icon="solar:arrow-left-broken"
          />
          <div className="hidden font-light tracking-widest text-tx02 sm:group-hover:block">
            Leave
          </div>
        </button>

        {/* opponent */}
        <Side name="BOT" src={bot} breakpoint={7} points={score} />

        {/* theme logo */}
        <Image
          className="w-14 flex-none rounded-lg border border-tx05 object-cover sm:w-20 xl:w-24"
          src={beach}
          quality={100}
          width={300}
          height={300}
        />

        {/* ME */}
        <Side
          name={me?.displayName}
          src={me?.avatar}
          me={true}
          breakpoint={7}
          points={myScore}
        />
      </section>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center overflow-hidden text-tx01">
      <Scoor />

      <div className="relative flex w-full flex-1 items-center justify-center p-8">
        <Image
          className="object-cover opacity-60"
          src={color.bgImage}
          quality={100}
          fill
        />
        <div className="z-10 rounded-lg border border-tx02 bg-bg03/30 p-4 backdrop-blur-sm xs:p-6 sm:p-8 lg:p-10">
          <div className="aspect-video-portrait max-h-[60vh] md:aspect-video">
            <CanvasHorizontal />
            <CanvasVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawGame;
