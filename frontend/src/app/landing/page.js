"use client";

import Image from "next/image";
import logoPic from "@/images/logos/logo.png";
import { Icon } from "@iconify/react";
import { useState } from "react";
import heroImg from "@/images/pics/hero-bg.jpg";

export default function Home() {
  const [on, setOn] = useState(true);

  return (
    <main className="bg-bg01 ">
      {/* Herro section */}
      <header className="w-screen h-screen flex items-stretch mb-36">
        {/* background image */}
        <Image
          alt="Mountains"
          src={heroImg}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
        {/* left side logo and start button */}
        <div className="flex flex-col justify-between my-20 ml-20 sticky">
          <Image
            src={logoPic}
            alt="Logo of the game"
            width={100}
            height={100}
          />
          <button className="group flex items-center ml-6">
            <Icon
              className="text-tx01 group-hover:text-tx02 transition duration-500 mr-2"
              icon="solar:gamepad-broken"
              width="36"
            />
            <div className=" text-tx01 font-extralight tracking-[4.80px] uppercase opacity-0 group-hover:opacity-100 transition duration-700">
              start
            </div>
          </button>
        </div>

        {/* middle "the text" */}
        <div className="space-y-14 my-auto text-center mx-auto z-10">
          <div className=" text-tx01 text-xl font-extralight tracking-[4.80px] uppercase">
            Paddle Smash
          </div>
          <div className=" text-tx01 font-bold tracking-tighter text-9xl uppercase -space-y-2">
            <div>come</div>
            <div>and</div>
            <div className="text-tx06">smash</div>
            <div>some</div>
            <div className="text-tx06">balls</div>
          </div>
        </div>

        {/* right side sound button */}
        <div className="flex -rotate-90 mb-32 mt-auto space-x-2">
          <button
            onClick={() => setOn(!on)}
            className=" text-tx02 text-sm font-light tracking-[3px] uppercase"
          >
            sound
          </button>
          <div className=" text-tx01 text-sm font-light tracking-[3px] uppercase w-10">
            {on ? "on" : "off"}
          </div>
        </div>
      </header>

      {/* description section */}
      <section className="mb-36">
        <div className="w-3/4 mx-auto">
          <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase mb-8">
            Paddle Smash
          </div>

          <p className="text-tx02 text-3xl font-medium tracking-[3px] uppercase">
            Experience the timeless joy of <span className="text-tx06">ping pong</span> Enjoy a
            straightforward gameplay that captures the essence of the classic
            game while providing hours of entertainment
          </p>
        </div>
      </section>
      
      {/* Features section */}
      <section>
        <div className="w-3/4 mx-auto">
          <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase pb-8 border-b border-tx02">
          Paddle Smash
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
          Accelerating <br />gameplay
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
          Classic <br />graphics
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
          Simple <br />controls
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
          Multiplayer
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
          Realistic <br />physics
          </div>
        </div>
      </section>
    </main>
  );
}
