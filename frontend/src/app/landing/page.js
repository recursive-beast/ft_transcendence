"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { forwardRef, useState } from "react";

import heroImg from "@/images/pics/hero-bg.jpg";
import footerImg from "@/images/pics/footer.jpg";
import pressImg from "@/images/pics/press.svg";

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
import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import clsx from "clsx";
import { useRef } from "react";

// mouse traking
import { useMouse } from "./useMouse";
import { useWindowScroll } from "@uidotdev/usehooks";
import { MaskedLines } from "@/components/MaskedLines";
import { SplitText } from "@/components/SplitText";

function Title(props) {
  return (
    <div className="text-sm font-medium tracking-[6px] uppercase mb-5 lg:text-lg">
      {props.text}
    </div>
  );
}

function HeroSection() {
  const [on, setOn] = useState(true);
  return (
    <>
      <header className="relative h-screen flex items-stretch mb-36">
        {/* background image */}
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

        {/*"the text" */}
        <div className="space-y-6 my-auto text-center mx-auto z-10">
          <div className="text-tx01 font-normal uppercase text-xs tracking-[6px] md:text-lg xl:text-xl 2xl:text-2xl">
            Paddle Smash
          </div>
          <div className=" text-tx01 font-semibold uppercase -tracking-wider text-7xl -space-y-2 sm:text-8xl lg:text-9xl 2xl:text-[160px]">
            <div>come</div>
            <div>and</div>
            <div className="text-tx06">smash</div>
            <div>some</div>
            <div className="text-tx06">balls</div>
          </div>
        </div>
      </header>

      {/* sticky elements */}
      <section className="h-screen fixed flex items-stretch justify-between mb-36">
        {/* left side logo and start button */}
        <div className="flex justify-between fixed h-full top-0 left-0">
          <div className="flex flex-col justify-between my-6 ml-3 lg:my-8 xl:my-12 2xl:my-20 md:ml-6 xl:ml-8 2xl:ml-14">
            <Image
              className="w-14 lg:w-16 xl:w-20 2xl:w-24"
              src={logoPic}
              alt="Logo of the game"
              width={100}
              height={100}
            />
            <button className="group lg:flex items-center ml-6 hidden">
              <Icon
                className="text-tx01 mr-2 w-6 lg:w-7 xl:w-8 2xl:w-10 lg:transition lg:duration-500 lg:group-hover:text-tx02"
                icon="solar:gamepad-broken"
                width="36"
              />
              <div className=" text-tx01 font-light tracking-normal uppercase text-xs md:text-sm 2xl:text-lg lg:opacity-0 lg:group-hover:opacity-100 lg:transition lg:duration-700">
                start
              </div>
            </button>
          </div>
        </div>

        {/* right side sound button */}
        <div className="flex -rotate-90 mb-20 mt-auto space-x-2 -mr-6 fixed right-0 bottom-0 xl:mr-1 2xl:mb-28">
          <button
            onClick={() => setOn(!on)}
            className=" text-tx02 text-xs font-medium tracking-normal uppercase lg:text-sm 2xl:text-base"
          >
            sound
          </button>
          <div className=" text-tx01 text-xs font-medium tracking-normal uppercase w-10 lg:text-sm 2xl:text-base">
            {on ? "on" : "off"}
          </div>
        </div>
      </section>
    </>
  );
}

function HeroSectionHover(props) {
  const [on, setOn] = useState(true);
  return (
    <>
      <header className="relative h-screen w-screen flex items-stretch mb-36">
        {/*"the text" */}
        <div
          className="space-y-6 my-auto text-center mx-auto"
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          <div className="font-normal uppercase text-xs tracking-[6px] md:text-lg xl:text-xl 2xl:text-2xl">
            Paddle Smash
          </div>
          <div className="font-semibold uppercase -tracking-wider text-7xl -space-y-2 sm:text-8xl lg:text-9xl 2xl:text-[160px]">
            <div>the</div>
            <div>ping</div>
            <div>pong</div>
            <div>balls</div>
            <div>👀</div>
          </div>
        </div>
      </header>

      {/* sticky elements */}
      <section className="h-screen fixed flex items-stretch justify-between mb-36">
        {/* left side logo and start button */}
        <div className="flex justify-between fixed h-full top-0 left-0">
          <div className="flex flex-col justify-between my-6 ml-3 lg:my-8 xl:my-12 2xl:my-20 md:ml-6 xl:ml-8 2xl:ml-14">
            <Image
              className="w-14 lg:w-16 xl:w-20 2xl:w-24"
              src={logoPic}
              alt="Logo of the game"
              width={100}
              height={100}
            />
            <button className="group flex items-center ml-6">
              <Icon
                className="text-tx01 mr-2 w-6 lg:w-7 xl:w-8 2xl:w-10 lg:transition lg:duration-500 lg:group-hover:text-tx02"
                icon="solar:gamepad-broken"
                width="36"
              />
              <div className=" text-tx01 font-light tracking-normal uppercase text-xs md:text-sm 2xl:text-lg lg:opacity-0 lg:group-hover:opacity-100 lg:transition lg:duration-700">
                start
              </div>
            </button>
          </div>
        </div>

        {/* right side sound button */}
        <div className="flex -rotate-90 mb-20 mt-auto space-x-2 -mr-6 fixed right-0 bottom-0 xl:mr-1 2xl:mb-28">
          <button
            onClick={() => setOn(!on)}
            className=" text-tx02 text-xs font-medium tracking-normal uppercase lg:text-sm 2xl:text-base"
          >
            sound
          </button>
          <div className=" text-tx01 text-xs font-medium tracking-normal uppercase w-10 lg:text-sm 2xl:text-base">
            {on ? "on" : "off"}
          </div>
        </div>
      </section>
    </>
  );
}

function DescriptionSection() {
  return (
    <section className="mb-36">
      <div className="w-11/12 mx-auto sm:w-10/12 lg:w-3/4 xl:w-8/12">
        <Title text="Paddle Smash" />

        <MaskedLines className="text-4xl font-semibold sm:text-5xl md:text-6xl 2xl:text-7xl md:space-y-2 first:text-tx02 last:text-tx01 group">
          Experience timeless{" "}
          <span className="group-first:text-tx06/20 group-last:text-tx06">
            ping pong
          </span>{" "}
          joy with classic gameplay for hours of entertainment
        </MaskedLines>
      </div>
    </section>
  );
}

function DescriptionSectionHover(props) {
  return (
    <section className="mb-36">
      <div
        className="w-11/12 mx-auto sm:w-10/12 lg:w-3/4 xl:w-8/12"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <Title text="Paddle Smash" />

        <div className="relative text-4xl font-semibold sm:text-5xl md:text-6xl 2xl:text-7xl">
          <div>
            <SplitText className=" md:space-y-2">
              Endure the ceaseless monotony of ping pong with its tired,
              overused gameplay.
            </SplitText>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature(props) {
  return (
    <div className="pt-4 pb-6 border-b border-tx02 hover:bg-pr01 text-4xl font-semibold sm:text-5xl md:text-6xl 2xl:text-7xl">
      {props.hover ? (
        <div>
          {props.txt1}
          <br />
          {props.txt2}
        </div>
      ) : (
        <MaskedLines
          className={clsx(" first:text-tx02 last:text-tx01", props.hover && "")}
        >
          {props.txt1}
          <br />
          {props.txt2}
        </MaskedLines>
      )}
    </div>
  );
}

function FeaturesSection(props) {
  return (
    <section className="mb-36">
      <div className="w-11/12 mx-auto sm:w-10/12 lg:w-3/4 xl:w-8/12">
        <div className="pb-2 border-b border-tx02">
          <Title text="Features" />
        </div>

        <Feature txt1="Accelerating" txt2="gameplay" hover={props.hover} />
        <Feature txt1="classic" txt2="graphics" hover={props.hover} />
        <Feature txt1="Simple" txt2="Controls" hover={props.hover} />
        <Feature txt1="Realistic" txt2="physics" hover={props.hover} />
        <Feature txt1="Multiplayer" hover={props.hover} />
      </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section className="mb-36">
      <div className="flex flex-col mb-10 w-11/12 mx-auto sm:w-10/12 lg:w-3/4 xl:w-8/12">
        <Title text="frontend" />

        <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-10 xl:gap-14 2xl:gap-20">
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
                key={v.src}
                className="aspect-square object-contain w-10 sm:w-14 xl:w-16 2xl:w-20"
                src={v}
                alt="Logo"
                width={60}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col mb-10 w-11/12 mx-auto sm:w-10/12 lg:w-3/4 xl:w-8/12">
        <Title text="backend" />

        <div className="flex flex-wrap gap-4 sm:gap-6 lg:gap-10 xl:gap-14 2xl:gap-20">
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
                key={v.src}
                className="aspect-square object-contain w-10 sm:w-14 xl:w-16 2xl:w-20"
                src={v}
                alt="Logo"
                width={60}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TeamMember(props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (value) => value > 0 && props?.onActive(),
  );

  return (
    <div ref={ref} className="pb-14 mt-5 border-b border-tx02">
      <div className="my-8 sm:my-14 xl:my-20">
        <MaskedLines className="text-2xl font-medium sm:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl xl:font-semibold space-y-1 sm:space-y-4 first:text-tx02 last:text-tx01">
          {props.first}
          <br />
          <span className="ml-10 sm:ml-20 xl:ml-20">{props.last}</span>
        </MaskedLines>
      </div>

      <div className="font-light tracking-widest uppercase text-sm sm:text-base mb-6">
        {props.role}
      </div>

      <div className="space-x-5 lg:space-x-7 2xl:space-x-9">
        <button>
          <Image
            className="h-7 w-7 lg:h-8 lg:w-8 2xl:h-10 2xl:w-10"
            src={intrat}
            alt="intrat logo"
            width={40}
            height={40}
          />
        </button>

        <button>
          <Image
            className="h-7 w-7 lg:h-8 lg:w-8 2xl:h-10 2xl:w-10"
            src={git}
            alt="git hub logo"
            width={40}
            height={40}
          />
        </button>

        <button>
          <Image
            className="h-7 w-7 lg:h-8 lg:w-8 2xl:h-10 2xl:w-10"
            src={linkedin}
            alt="Linkedin logo"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
}

const members = [
  {
    first: "Mohammed",
    last: "Messaoudi",
    role: "ui/ux & Frontend",
    img: mmessaou,
  },
  {
    first: "Soufiane",
    last: "Yakoubi",
    role: "backend & team manager",
    img: syakoubi,
  },
  {
    first: "Badr eddine",
    last: "El Housni",
    role: "full stack",
    img: melhous,
  },
  {
    first: "Abdeljalil",
    last: "Ait Omar",
    role: "full stack",
    img: aaitoma,
  },
];

function TeamSection(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="mb-36">
      <div className="w-11/12 mx-auto sm:w-10/12 lg:w-3/4 xl:w-8/12  pb-2 border-b border-tx02">
        <Title text="team" />
      </div>

      <div className="relative flex flex-col w-11/12 mx-auto sm:w-10/12 lg:w-3/4 xl:w-8/12">
        {members.map((member, i) => (
          <TeamMember
            key={member.first + member.last}
            onActive={() => setActiveIndex(i)}
            {...member}
          />
        ))}

        <div className="w-fit h-full absolute right-0">
          <div className=" py-3 sticky top-1/3 bottom-0">
            <ul className="space-y-1 sm:space-y-2 flex flex-col items-center w-20 sm:w-28 xl:w-36">
              {members.map((member, i) => (
                <li key={member.first + member.last}>
                  <Image
                    className={clsx(
                      "rounded-full transition-team duration-500",
                      activeIndex === i
                        ? "opacity-90 w-20 sm:w-28 xl:w-36"
                        : "grayscale opacity-70 w-14 sm:w-20 xl:w-24",
                    )}
                    src={member.img}
                    alt="Logo of the game"
                    quality={100}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="relative flex h-[75vh]">
      {/* background image */}
      <Image
        className="opacity-50"
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

      <div className="w-11/12 mx-auto my-auto sm:w-10/12 lg:w-3/4 xl:w-3/5 z-10">
        <div className="space-y-28 my-auto text-center mx-auto">
          <div className="text-tx01 font-normal uppercase text-xs tracking-[6px] md:text-lg xl:text-xl 2xl:text-2xl">
            Paddle Smash
          </div>

          <div className=" text-tx01 font-semibold text-5xl -space-y-2 sm:text-8xl lg:text-9xl 2xl:text-[160px]">
            <div>Let&apos;s start</div>
            <div>the fun</div>
          </div>

          {/* <button
            className="text-center text-tx01 text-xl font-extralight tracking-[4.80px] uppercase border border-tx01 rounded-full px-10 py-1
                     hover:text-tx03 hover:bg-tx01 ease-linear transition-colors duration-[400ms]"
          >
            Start
          </button> */}
        </div>
      </div>
      <div className="w-full h-1/3 bottom-0  bg-gradient-to-t from-bg01 from-10% via-bg01/60  absolute"></div>
    </footer>
  );
}

function FooterSectionHover(props) {
  return (
    <footer className="relative flex h-[75vh]">
      <div className="w-11/12 mx-auto my-auto sm:w-10/12 lg:w-3/4 xl:w-3/5">
        <div
          className="space-y-28 my-auto text-center mx-auto pb-10"
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          <div className="font-normal uppercase text-xs tracking-[6px] md:text-lg xl:text-xl 2xl:text-2xl">
            Paddle Smash
          </div>

          <div className="font-semibold text-5xl -space-y-2 sm:text-8xl lg:text-9xl 2xl:text-[140px]">
            <div>Run away before</div>
            <div>you get depressed</div>
          </div>

          {/* <button
            className="text-center  text-xl font-extralight tracking-[4.80px] uppercase border  rounded-full px-10 py-1
                      hover:bg-bg01/20 ease-linear transition-colors duration-[400ms]"
          >
            risk it
          </button> */}
          {/* <div /> */}
        </div>
      </div>
    </footer>
  );
}

function StartButton(props) {
  return (
    <div className="w-screen flex justify-center items-center flex-col pb-64 bg-bg01">
      <div className="relative">
        {/* <Image src={logoPic} alt="Logo of the game" width={150} height={150} /> */}
        <button
          {...props}
          className="text-center text-tx01 text-2xl font-extralight tracking-[4.80px] uppercase border border-tx01 rounded-full px-14 py-2
                 hover:text-tx03 hover:bg-tx01 ease-linear transition-colors duration-[400ms] absolute top-full translate-y-8 left-1/2 -translate-x-1/2 z-50"
        >
          Start
        </button>
      </div>
    </div>
  );
}

const PressButton = forwardRef(function PressButton(props, ref) {
  function preventContextMenu(e) {
    e.preventDefault();
    e.stopPropagation(); // not necessary in my case, could leave in case stopImmediateProp isn't available?
    // e.stopImmediatePropagation();
    return false;
  }
  return (
    <button
      id="press-button"
      ref={ref}
      className="flex flex-col items-center justify-center rounded-full fixed bottom-8 left-2/4 -translate-x-1/2 touch"
      onContextMenu={preventContextMenu}
      {...props}
    >
      <Image className="w-full select-none" src={pressImg} alt="Logo" />
      <Icon
        className="text-tx06 absolute"
        icon="mingcute:finger-press-line"
        width={26}
      />
    </button>
  );
});

function Blur() {
  return (
    <>
      <div className="w-full h-1/5 bottom-0 fixed bg-gradient-to-t from-bg01 from-30% via-bg01/80 touch"></div>
      <div className="w-full h-1/6 top-0 fixed bg-gradient-to-b from-bg01 from-10% via-bg01/60 touch"></div>
    </>
  );
}

function StartSection(props) {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-bg01 fixed z-50">
      <div className="relative">
        <Image src={logoPic} alt="Logo of the game" width={200} height={200} />
        <button
          onClick={props.onClick}
          className="text-center text-tx01 text-2xl font-extralight tracking-[4.80px] uppercase border border-tx01 rounded-full px-14 py-2
                 hover:text-tx03 hover:bg-tx01 ease-linear transition-colors duration-[400ms] absolute top-full translate-y-8 left-1/2 -translate-x-1/2 "
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const rect = ref.current?.getBoundingClientRect() || {};
  const [size, setSize] = useState(50);
  const [isPressed, setIsPressed] = useState(false);
  const mouse = useMouse();
  const [scroll] = useWindowScroll();

  return (
    <main className="relative flex flex-col">
      {!visible && <StartSection onClick={() => setVisible(true)} />}
      {visible && (
        <>
          <div className="bg-bg01 text-tx01">
            <HeroSection />
            <DescriptionSection />
            <FeaturesSection />
            <TechnologySection />
            <TeamSection />
            <FooterSection />
            <StartButton
              onMouseEnter={() => setSize(0)}
              onMouseLeave={() => setSize(50)}
            />
            <PressButton />
            <Blur />
          </div>

          <motion.div
            id="masked"
            className={clsx(
              "bg-pr01 absolute pb-64 z-40",
              isPressed && "is-pressed",
            )}
            animate={{
              "--x": `${mouse.x}px`,
              "--y": `${scroll.y + mouse.y}px`,
              "--size": `${size}px`,
            }}
            style={{
              "--x-touch": `${rect.x + rect.width / 2}px`,
              "--y-touch": `${rect.top + rect.height / 2 + scroll.y}px`,
            }}
            transition={{ type: "tween", ease: "circOut", duration: 0.5 }}
          >
            <HeroSectionHover
              onMouseEnter={() => setSize(500)}
              onMouseLeave={() => setSize(50)}
            />
            <DescriptionSectionHover
              onMouseEnter={() => setSize(500)}
              onMouseLeave={() => setSize(50)}
            />
            <FeaturesSection hover />
            <TechnologySection />
            <TeamSection />
            <FooterSectionHover
              onMouseEnter={() => setSize(500)}
              onMouseLeave={() => setSize(50)}
            />
            <PressButton
              ref={ref}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onTouchStart={() => setIsPressed(true)}
              onTouchEnd={() => setIsPressed(false)}
            />
          </motion.div>
        </>
      )}
    </main>
  );
}
