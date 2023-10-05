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
} from "framer-motion";

export default function Home() {
  const [on, setOn] = useState(true);

  let { scrollYProgress } = useScroll();
  let heroScroll = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // let { scrollYProgress } = useScroll();
  let footerScroll = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="bg-bg01 pb-36">
      {/* Hero section */}
      <header className="h-screen flex items-stretch mb-36">
        {/* background image */}
        <motion.div style={{ heroScroll }} className="absolute inset-0">
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

          <p className="text-tx02 text-3xl font-medium tracking-[3px] uppercase">
            Experience the timeless joy of{" "}
            <span className="text-tx06">ping pong</span> Enjoy a straightforward
            gameplay that captures the essence of the classic game while
            providing hours of entertainment
          </p>
        </div>
      </section>

      {/* Features section */}
      <section className="mb-36">
        <div className="w-3/4 mx-auto">
          <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase pb-8 border-b border-tx02">
            Paddle Smash
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
            Accelerating <br />
            gameplay
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
            Classic <br />
            graphics
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
            Simple <br />
            controls
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
            Multiplayer
          </div>

          <div className="text-tx02 text-3xl font-semibold tracking-[3px] uppercase py-6 border-b">
            Realistic <br />
            physics
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
      <section className="mb-36">
        <div className="w-3/4 mx-auto flex flex-col mb-36">
          <div className="text-tx01 text-lg font-light tracking-[4.80px] uppercase pb-8 border-b border-tx02">
            team
          </div>

          {/* team info */}
          <div className="flex flex-col relative">
            <div className="pb-24 border-b border-tx02">
              <div className="text-tx02 text-5xl font-medium tracking-[3px] uppercase mt-16 mb-8 leading-normal">
                mohammed <br />
                <span className="ml-40">messaoudi</span>
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
              <div className="text-tx02 text-5xl font-medium tracking-[3px] uppercase mt-16 mb-8 leading-normal">
                soufian <br />
                <span className="ml-40">yakoubi</span>
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
              <div className="text-tx02 text-5xl font-medium tracking-[3px] uppercase mt-16 mb-8 leading-normal">
                Mohammed Badr <br />
                <span className="ml-40">Eddine El Housni</span>
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
              <div className="text-tx02 text-5xl font-medium tracking-[3px] uppercase mt-16 mb-8 leading-normal">
                Abdeljalil <br />
                <span className="ml-40">Ait Omar</span>
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
      <section className="flex h-screen mb-36 relative">
        <motion.div style={{ footerScroll }} className="absolute top-0 left-0 w-full h-full">
          <Image
            className="opacity-25"
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

        <div className="z-10 space-y-14 my-auto text-center mx-auto">
          <div className=" text-tx01 text-2xl font-light tracking-[4.80px] uppercase">
            Paddle Smash
          </div>
          <div className=" text-tx01 font-extrabold tracking-tighter text-9xl uppercase -space-y-2 w-3/4 mx-auto text-center">
            chi l3ibatika b7al haka fiha chi klmat
          </div>
        </div>
      </section>
    </main>
  );
}
