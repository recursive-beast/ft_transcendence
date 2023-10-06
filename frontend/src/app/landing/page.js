"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";

import heroImg from "@/images/pics/hero-bg.jpg";
import footerImg from "@/images/pics/footer.jpg";

// logos
import logoPic from "@/images/logos/logo.png";
import intrat from "@/images/logos/42_logo.png";
import git from "@/images/logos/github.png";
import linkedin from "@/images/logos/linkedin.png";

// backend logos
import dckCmp from "@/images/technologies/backend/docker-compose.png";
import dck from "@/images/technologies/backend/docker.png";
import nestJs from "@/images/technologies/backend/nestjs.png";
import postSql from "@/images/technologies/backend/postgresql.png";
import prisma from "@/images/technologies/backend/prisma.png";
import socket from "@/images/technologies/backend/socket-io.png";
import nodeJs from "@/images/technologies/backend/nodejs.png";
import typeScript from "@/images/technologies/backend/typescript.png";
// fronend logos
import css from "@/images/technologies/frontend/css.png";
import html from "@/images/technologies/frontend/html.png";
import javascript from "@/images/technologies/frontend/javascript.png";
import nextjs from "@/images/technologies/frontend/nextjs.png";
import react from "@/images/technologies/frontend/react.png";
import tailwindcss from "@/images/technologies/frontend/tailwindcss.png";
// team picturs
import aaitoma from "@/images/profile_images/aait-oma.png";
import melhous from "@/images/profile_images/mel-hous.png";
import mmessaou from "@/images/profile_images/mmessaou.png";
import syakoubi from "@/images/profile_images/syakoubi.png";
// scroll
import {
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
  useInView,
  useSpring,
} from "framer-motion";
// import clsx from "clsx";
import { SplitText } from "@cyriacbr/react-split-text";
import { useRef } from "react";

function AnimatedLine(props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: props.offset,
  });

  const transformed = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const percent = useSpring(transformed, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });
  const clipPath = useMotionTemplate`inset(-20% ${percent}% -20% 0)`;

  return (
    <motion.div style={{ clipPath }} ref={ref} className={props.className}>
      {props.children}
    </motion.div>
  );
}

export default function Home() {
  const [on, setOn] = useState(true);

  let { scrollYProgress } = useScroll();
  let heroScroll = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // let { scrollYProgress } = useScroll();
  let footerScroll = useTransform(scrollYProgress, [0, 1], ["-70%", "0%"]);

  return (
    <main className="bg-bg01 pb-20">
      {/* Hero section */}
      <header className="h-screen flex items-stretch mb-36">
        {/* background image */}
        <motion.div className="absolute inset-0">
          <Image
            className="opacity-60"
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
        </motion.div>

        {/*"the text" */}
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
      </header>

      {/* sticky elements */}
      <section className="h-screen fixed flex items-stretch justify-between mb-36 z-10">
        {/* left side logo and start button */}
        <div className="flex justify-between fixed h-full top-0 left-0">
          <div className="flex flex-col justify-between my-20 ml-16">
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
        </div>
        {/* right side sound button */}
        <div className="flex -rotate-90 mb-32 mt-auto space-x-2 mr-6 fixed right-0 bottom-0">
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
      </section>

      {/* description section */}
      <section className="mb-36">
        <div className="w-3/4 mx-auto">
          <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase mb-8">
            Paddle Smash
          </div>

          <div className="relative text-6xl font-bold ">
            <div className="text-tx02">
              <SplitText className=" space-y-3 -tracking-widest">
                Experience the timeless joy of ping pong Enjoy a straightforward
                gameplay that captures the essence of the classic game while
                providing hours of entertainment.
              </SplitText>
            </div>

            <div className="text-tx01">
              <div className="absolute top-0 left-0 w-full h-full">
                <SplitText
                  LineWrapper={({ children }) => (
                    <AnimatedLine offset={["start 80%", "end 70%"]}>
                      {children}
                    </AnimatedLine>
                  )}
                  className=" space-y-3 -tracking-widest"
                >
                  Experience the timeless joy of ping pong Enjoy a
                  straightforward gameplay that captures the essence of the
                  classic game while providing hours of entertainment.
                </SplitText>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="mb-36">
        <div className="w-3/4 mx-auto">
          <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase pb-8 border-b border-tx02">
            Paddle Smash
          </div>

          <div className="text-tx02 pt-4 pb-6 border-b">
            <div className="relative text-6xl font-bold ">
              <div className="text-tx02">
                <div className=" space-y-3 -tracking-widest">Accelerating</div>
                <div className=" space-y-3 -tracking-widest">gameplay</div>
              </div>

              <div className="text-tx01">
                <div className="absolute top-0 left-0 w-full h-full">
                  <AnimatedLine
                    offset={["start 90%", "end 0%"]}
                    className=" -tracking-widest"
                  >
                    Accelerating
                  </AnimatedLine>
                  <AnimatedLine
                    offset={["start 90%", "end 0%"]}
                    className=" -tracking-widest"
                  >
                    gameplay
                  </AnimatedLine>
                </div>
              </div>
            </div>
          </div>

          <div className="text-tx02 pt-4 pb-6 border-b">
            <div className="relative text-6xl font-bold ">
              <div className="text-tx02">
                <div className=" space-y-3 -tracking-widest">Clsasic</div>
                <div className=" space-y-3 -tracking-widest">graphics</div>
              </div>

              <div className="text-tx01">
                <div className="absolute top-0 left-0 w-full h-full">
                  <AnimatedLine
                    offset={["start 90%", "end 0%"]}
                    className=" -tracking-widest"
                  >
                    Clsasic
                  </AnimatedLine>
                  <AnimatedLine
                    offset={["start 90%", "end 0%"]}
                    className=" -tracking-widest"
                  >
                    graphics
                  </AnimatedLine>
                </div>
              </div>
            </div>
          </div>

          <div className="text-tx02 pt-4 pb-6 border-b">
            <div className="relative text-6xl font-bold ">
              <div className="text-tx02">
                <div className=" space-y-3 -tracking-widest">Simple</div>
                <div className=" space-y-3 -tracking-widest">Controls</div>
              </div>

              <div className="text-tx01">
                <div className="absolute top-0 left-0 w-full h-full">
                  <AnimatedLine
                    offset={["start 90%", "end 0%"]}
                    className=" -tracking-widest"
                  >
                    Simple
                  </AnimatedLine>
                  <AnimatedLine
                    offset={["start 90%", "end 0%"]}
                    className=" -tracking-widest"
                  >
                    Controls
                  </AnimatedLine>
                </div>
              </div>
            </div>
          </div>

          <div className="text-tx02 pt-4 pb-6 border-b">
            <div className="relative text-6xl font-bold ">
              <div className="text-tx02">
                <div className=" space-y-3 -tracking-widest">Multiplayer</div>
              </div>

              <div className="text-tx01">
                <div className="absolute top-0 left-0 w-full h-full">
                  <AnimatedLine
                    offset={["start 90%", "end 0%"]}
                    className=" -tracking-widest"
                  >
                    Multiplayer
                  </AnimatedLine>
                </div>
              </div>
            </div>
          </div>

          <div className="text-tx02 pt-4 pb-6 border-b">
            <div className="relative text-6xl font-bold ">
              <div className="text-tx02">
                <div className=" space-y-3 -tracking-widest">Realistic</div>
                <div className=" space-y-3 -tracking-widest">physics</div>
              </div>

              <div className="text-tx01">
                <div className="absolute top-0 left-0 w-full h-full">
                  <AnimatedLine
                    offset={["start 90%", "end 0%"]}
                    className=" -tracking-widest"
                  >
                    Realistic
                  </AnimatedLine>
                  <AnimatedLine
                    offset={["start 90%", "end 0%"]}
                    className=" -tracking-widest"
                  >
                    physics
                  </AnimatedLine>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* technology section */}
      <section className="mb-36">
        <div className="w-3/4 mx-auto flex items-center space-x-16 mb-10">
          <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase mr-16 min-w-[180px]">
            frontend
          </div>

          {[
            nextjs,
            javascript,
            react,
            socket,
            tailwindcss,
            typeScript,
            html,
            css,
          ].map((v) => {
            return (
              <Image
                className="aspect-square object-contain"
                src={v}
                alt="Logo"
                width={60}
              />
            );
          })}
        </div>

        <div className="w-3/4 mx-auto flex items-center space-x-16">
          <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase mr-16 min-w-[180px]">
            backend
          </div>

          {[
            dckCmp,
            dck,
            nodeJs,
            postSql,
            prisma,
            socket,
            nestJs,
            typeScript,
          ].map((v) => {
            return (
              <Image
                className="aspect-square object-contain"
                src={v}
                alt="Logo"
                width={60}
              />
            );
          })}
        </div>
      </section>

      {/* team section */}
      <section className="mb-36 bg-bg01">
        <div className="w-3/4 mx-auto flex flex-col mb-36">
          <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase pb-8 border-b border-tx02">
            team
          </div>

          {/* team info */}
          <div className="flex flex-col relative">
            <div className="pb-24 border-b border-tx02">
              <div className="relative text-5xl font-medium uppercase mt-16 mb-8 leading-normal -tracking-widest">
                <div className="text-tx02">
                  <div className=" space-y-3">mohammed</div>
                  <div className=" space-y-3 ml-40">messaoudi</div>
                </div>

                <div className="text-tx01">
                  <div className="absolute top-0 left-0 w-full h-full ">
                    <AnimatedLine
                      offset={["start 90%", "end 0%"]}
                      className=" -tracking-widest "
                    >
                      mohammed
                    </AnimatedLine>
                    <AnimatedLine
                      offset={["start 90%", "end 0%"]}
                      className=" -tracking-widest ml-40"
                    >
                      messaoudi
                    </AnimatedLine>
                  </div>
                </div>
              </div>

              <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase mb-8">
                ui/ux & Frontend
              </div>

              <div className="space-x-10">
                <button>
                  <Image
                    src={intrat}
                    alt="intrat logo"
                    width={40}
                    height={40}
                  />
                </button>

                <button>
                  <Image src={git} alt="git hub logo" width={40} height={40} />
                </button>

                <button>
                  <Image
                    src={linkedin}
                    alt="Linkedin logo"
                    width={40}
                    height={40}
                  />
                </button>
              </div>
            </div>

            <div className="pb-24 border-b border-tx02">
              <div className="relative text-5xl font-medium uppercase mt-16 mb-8 leading-normal -tracking-widest">
                <div className="text-tx02">
                  <div className=" space-y-3">soufian</div>
                  <div className=" space-y-3 ml-40">yakoubi</div>
                </div>

                <div className="text-tx01">
                  <div className="absolute top-0 left-0 w-full h-full ">
                    <AnimatedLine
                      offset={["start 90%", "end 0%"]}
                      className=" -tracking-widest "
                    >
                      soufian
                    </AnimatedLine>
                    <AnimatedLine
                      offset={["start 90%", "end 0%"]}
                      className=" -tracking-widest ml-40"
                    >
                      yakoubi
                    </AnimatedLine>
                  </div>
                </div>
              </div>

              <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase mb-8">
                backend & team manager
              </div>

              <div className="space-x-10">
                <button>
                  <Image
                    src={intrat}
                    alt="intrat logo"
                    width={40}
                    height={40}
                  />
                </button>

                <button>
                  <Image src={git} alt="git hub logo" width={40} height={40} />
                </button>

                <button>
                  <Image
                    src={linkedin}
                    alt="Linkedin logo"
                    width={40}
                    height={40}
                  />
                </button>
              </div>
            </div>

            <div className="pb-24 border-b border-tx02">
              <div className="relative text-5xl font-medium uppercase mt-16 mb-8 leading-normal -tracking-widest">
                <div className="text-tx02">
                  <div className=" space-y-3">Mohammed Badr</div>
                  <div className=" space-y-3 ml-40">Eddine El Housni</div>
                </div>

                <div className="text-tx01">
                  <div className="absolute top-0 left-0 w-full h-full ">
                    <AnimatedLine
                      offset={["start 90%", "end 0%"]}
                      className=" -tracking-widest "
                    >
                      Mohammed Badr
                    </AnimatedLine>
                    <AnimatedLine
                      offset={["start 90%", "end 0%"]}
                      className=" -tracking-widest ml-40"
                    >
                      Eddine El Housni
                    </AnimatedLine>
                  </div>
                </div>
              </div>

              <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase mb-8">
                full stack
              </div>

              <div className="space-x-10">
                <button>
                  <Image
                    src={intrat}
                    alt="intrat logo"
                    width={40}
                    height={40}
                  />
                </button>

                <button>
                  <Image src={git} alt="git hub logo" width={40} height={40} />
                </button>

                <button>
                  <Image
                    src={linkedin}
                    alt="Linkedin logo"
                    width={40}
                    height={40}
                  />
                </button>
              </div>
            </div>

            <div className="pb-24 border-b border-tx02">             
              <div className="relative text-5xl font-medium uppercase mt-16 mb-8 leading-normal -tracking-widest">
                <div className="text-tx02">
                  <div className=" space-y-3">Abdeljalil</div>
                  <div className=" space-y-3 ml-40">Ait Omar</div>
                </div>

                <div className="text-tx01">
                  <div className="absolute top-0 left-0 w-full h-full ">
                    <AnimatedLine
                      offset={["start 90%", "end 0%"]}
                      className=" -tracking-widest "
                    >
                      Abdeljalil
                    </AnimatedLine>
                    <AnimatedLine
                      offset={["start 90%", "end 0%"]}
                      className=" -tracking-widest ml-40"
                    >
                      Ait Omar
                    </AnimatedLine>
                  </div>
                </div>
              </div>

              <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase mb-8">
                full stack
              </div>

              <div className="space-x-10">
                <button>
                  <Image
                    src={intrat}
                    alt="intrat logo"
                    width={40}
                    height={40}
                  />
                </button>

                <button>
                  <Image src={git} alt="git hub logo" width={40} height={40} />
                </button>

                <button>
                  <Image
                    src={linkedin}
                    alt="Linkedin logo"
                    width={40}
                    height={40}
                  />
                </button>
              </div>
            </div>

            {/* profile pics */}
            <div className="w-fit h-full absolute right-10">
              <div className="w-fit py-10 sticky top-1/3 bottom-0">
                <ul className="space-y-3 flex flex-col items-center">
                  <li>
                    <Image
                      className="rounded-full opacity-90"
                      src={mmessaou}
                      alt="Logo of the game"
                      width={100}
                      quality={100}
                    />
                  </li>
                  <li>
                    <Image
                      className="rounded-full opacity-60 grayscale"
                      src={syakoubi}
                      alt="Logo of the game"
                      width={80}
                      quality={100}
                    />
                  </li>
                  <li>
                    <Image
                      className="rounded-full opacity-60 grayscale"
                      src={melhous}
                      alt="Logo of the game"
                      width={80}
                      quality={100}
                    />
                  </li>
                  <li>
                    <Image
                      className="rounded-full opacity-60 grayscale"
                      src={aaitoma}
                      alt="Logo of the game"
                      width={80}
                      quality={100}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer section */}
      <section className="flex flex-col h-screen mb-20 relative">
        <motion.div className="absolute top-0 left-0 w-full h-full">
          <Image
            className="opacity-40"
            alt="Mountains"
            src={footerImg}
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </motion.div>

        <div className="z-10 my-auto text-center mx-auto">
          <div className=" text-tx01 text-2xl font-light tracking-[4.80px] uppercase mb-20">
            Paddle Smash
          </div>
          <div className=" text-tx01 font-extrabold tracking-tighter text-9xl uppercase -space-y-2 w-3/4 mx-auto text-center mb-32">
            chi l3ibatika b7al haka fiha chi klmat
          </div>

          <button
            className="text-center text-tx01 text-xl font-extralight tracking-[4.80px] uppercase border border-tx01 rounded-full px-10 py-1
                     hover:text-tx03 hover:bg-tx01 ease-linear transition-colors duration-[400ms] "
          >
            Start
          </button>
        </div>
      </section>

      {/* footer section */}
      <section className="flex">
        <div className="w-3/6 mx-auto space-y-5 my-5">
          <div className="text-tx01 font-light text-5xl tracking-[5px]">
            1337
          </div>

          <div className="text-tx02 font-light text-5xl tracking-[3px] uppercase">
            Future Is Loading...
          </div>
        </div>
      </section>
    </main>
  );
}
