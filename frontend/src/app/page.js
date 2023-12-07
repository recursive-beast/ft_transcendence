"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  forwardRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Link from "next/link";
import useSWR from "swr";

import heroImg from "@/images/pics/hero-bg.jpg";
import footerImg from "@/images/pics/footer.jpg";
import pressImg from "@/images/pics/press.svg";

// logos
import logoPic from "@/images/logos/logo.png";
import intrat from "@/images/logos/42_logo.png";
import git from "@/images/logos/github.png";
import linkedin from "@/images/logos/linkedin.png";
import google from "@/images/logos/google.png";

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
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import clsx from "clsx";
import { useRef } from "react";

// mouse traking
import { useMouse } from "../hooks/useMouse";
import { useLockBodyScroll, useWindowScroll } from "@uidotdev/usehooks";
import { MaskedLines } from "@/components/MaskedLines";
import { SplitText } from "@/components/SplitText";

function Title(props) {
  return (
    <div className="mb-5 text-sm font-medium uppercase tracking-[6px] lg:text-lg">
      {props.text}
    </div>
  );
}

function HeroSection({ animate, ...props }) {
  const [on, setOn] = useState(true);
  return (
    <>
      <header className="relative mb-36 flex h-screen items-stretch">
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
        <div className="z-10 mx-auto my-auto space-y-6 text-center">
          <div className="text-xs font-normal uppercase tracking-[6px] text-tx01 md:text-lg xl:text-xl 2xl:text-2xl">
            Paddle Smash
          </div>
          <div className=" -space-y-2 text-7xl font-semibold uppercase -tracking-wider text-tx01 sm:text-8xl lg:text-9xl 2xl:text-[160px]">
            <div className="overflow-hidden">
              <div
                className={clsx(
                  "transition-transform delay-500 duration-1000 touch:delay-0",
                  animate ? "translate-y-0" : "translate-y-full",
                )}
              >
                come
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className={clsx(
                  "transition-transform delay-500 duration-1000 touch:delay-0",
                  animate ? "translate-y-0" : "translate-y-full",
                )}
              >
                and
              </div>
            </div>
            <div className="overflow-hidden text-tx06">
              <div
                className={clsx(
                  "transition-transform delay-500 duration-1000 touch:delay-0",
                  animate ? "translate-y-0" : "translate-y-full",
                )}
              >
                smash
              </div>
            </div>
            <div className="overflow-hidden">
              <div
                className={clsx(
                  "transition-transform delay-500 duration-1000 touch:delay-0",
                  animate ? "translate-y-0" : "translate-y-full",
                )}
              >
                some
              </div>
            </div>
            <div className="overflow-hidden text-tx06">
              <div
                className={clsx(
                  "transition-transform delay-500 duration-1000 touch:delay-0",
                  animate ? "translate-y-0" : "translate-y-full",
                )}
              >
                balls
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* sticky elements */}
      <section className="fixed z-50 mb-36 flex h-screen items-stretch justify-between">
        {/* left side logo and start button */}
        <div className="fixed left-0 top-0 flex h-full justify-between">
          <div className="my-6 ml-3 flex flex-col justify-between md:ml-6 lg:my-8 xl:my-12 xl:ml-8 2xl:my-20 2xl:ml-14">
            <Image
              className="w-14 lg:w-16 xl:w-20 2xl:w-24"
              src={logoPic}
              alt="Logo of the game"
              width={100}
              height={100}
              {...props}
            />
            <button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  left: 0,
                  behavior: "smooth",
                })
              }
              className="group ml-6 hidden items-center lg:flex"
              {...props}
            >
              <Icon
                className="mr-2 w-6 text-tx01 lg:w-7 lg:transition lg:duration-500 lg:group-hover:text-tx02 xl:w-8 2xl:w-10"
                icon="solar:gamepad-broken"
                width="36"
              />
              <div className=" text-xs font-light uppercase tracking-normal text-tx01 md:text-sm lg:opacity-0 lg:transition lg:duration-700 lg:group-hover:opacity-100 2xl:text-lg">
                start
              </div>
            </button>
          </div>
        </div>

        {/* right side sound button */}
        <div
          className="fixed bottom-0 right-0 -mr-6 mb-20 mt-auto flex -rotate-90 space-x-2 xl:mr-1 2xl:mb-28"
          {...props}
        >
          <button
            onClick={() => setOn(!on)}
            className=" text-xs font-medium uppercase tracking-normal text-tx02 lg:text-sm 2xl:text-base"
          >
            sound
          </button>
          <div className=" w-10 text-xs font-medium uppercase tracking-normal text-tx01 lg:text-sm 2xl:text-base">
            {on ? "on" : "off"}
          </div>
        </div>
      </section>
    </>
  );
}

function HeroSectionHover({ animate, ...props }) {
  const [on, setOn] = useState(true);
  return (
    <header className="relative mb-36 flex h-screen w-screen items-stretch">
      {/*"the text" */}
      <div
        className="mx-auto my-auto space-y-6 text-center"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <div className="text-xs font-normal uppercase tracking-[6px] md:text-lg xl:text-xl 2xl:text-2xl">
          Paddle Smash
        </div>
        <div className="-space-y-2 text-7xl font-semibold uppercase -tracking-wider sm:text-8xl lg:text-9xl 2xl:text-[160px]">
          <div className="overflow-hidden">
            <div
              className={clsx(
                "transition-transform delay-500 duration-1000 touch:delay-0",
                animate ? "translate-y-0" : "translate-y-full",
              )}
            >
              the
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={clsx(
                "transition-transform delay-500 duration-1000 touch:delay-0",
                animate ? "translate-y-0" : "translate-y-full",
              )}
            >
              ping
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={clsx(
                "transition-transform delay-500 duration-1000 touch:delay-0",
                animate ? "translate-y-0" : "translate-y-full",
              )}
            >
              pong
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={clsx(
                "transition-transform delay-500 duration-1000 touch:delay-0",
                animate ? "translate-y-0" : "translate-y-full",
              )}
            >
              balls
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={clsx(
                "transition-transform delay-500 duration-1000 touch:delay-0",
                animate ? "translate-y-0" : "translate-y-full",
              )}
            >
              👀
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function DescriptionSection() {
  return (
    <section className="mb-36">
      <div className="mx-auto w-11/12 sm:w-10/12 lg:w-3/4 xl:w-8/12">
        <Title text="Paddle Smash" />

        <MaskedLines className="group text-4xl font-semibold first:text-tx02 last:text-tx01 sm:text-5xl md:space-y-2 md:text-6xl 2xl:text-7xl">
          Experience timeless{" "}
          <span className="group-first:text-tx06/20 group-last:text-tx06">
            ping pong
          </span>{" "}
          joy with the classic game for extended amusement.
        </MaskedLines>
      </div>
    </section>
  );
}

function DescriptionSectionHover(props) {
  return (
    <section className="mb-36">
      <div
        className="mx-auto w-11/12 sm:w-10/12 lg:w-3/4 xl:w-8/12"
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
    <div className="pt-4 pb-6 border-b border-tx02 hover:bg-pr01 text-4xl font-semibold sm:text-5xl md:text-6xl 2xl:text-7xl group">
      <MaskedLines className="first:text-tx02 last:text-tx01 group-hover:first:text-tx04 group-hover:last:text-tx04 transition-colors">
        {props.txt1}
        <br />
        {props.txt2}
      </MaskedLines>
    </div>
  );
}

function FeaturesSection({ hover, ...props }) {
  return (
    <section
      className={clsx("mb-36", !hover && "relative z-30", "touch:z-10")}
      {...props}
    >
      <div className="mx-auto w-11/12 sm:w-10/12 lg:w-3/4 xl:w-8/12">
        <div className="border-b border-tx02 pb-2">
          <Title text="Features" />
        </div>

        <Feature txt1="Accelerating" txt2="gameplay" />
        <Feature txt1="classic" txt2="graphics" />
        <Feature txt1="Simple" txt2="Controls" />
        <Feature txt1="Realistic" txt2="physics" />
        <Feature txt1="Multiplayer" />
      </div>
    </section>
  );
}

function TechnologySection({ hover, ...props }) {
  return (
    <section
      className={clsx("mb-36", !hover && "relative z-30", "touch:z-0")}
      {...props}
    >
      <div className="mx-auto mb-10 flex w-11/12 flex-col sm:w-10/12 lg:w-3/4 xl:w-8/12">
        <Title text="frontend" />

        <div className="flex flex-wrap justify-between gap-4 sm:gap-6 lg:gap-10 xl:gap-14 2xl:gap-20">
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
                className="aspect-square w-10 object-contain sm:w-14 xl:w-16 2xl:w-20"
                src={v}
                alt="Logo"
                width={60}
              />
            );
          })}
        </div>
      </div>

      <div className="mx-auto mb-10 flex w-11/12 flex-col sm:w-10/12 lg:w-3/4 xl:w-8/12">
        <Title text="backend" />

        <div
          className="flex flex-wrap justify-between gap-4 sm:gap-6 lg:gap-10 xl:gap-14 2xl:gap-20"
          // {...props}
        >
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
                className="aspect-square w-10 object-contain sm:w-14 xl:w-16 2xl:w-20"
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
    <div ref={ref} className="mt-5 border-b border-tx02 pb-14">
      <div className="my-8 sm:my-14 xl:my-20">
        <MaskedLines className="space-y-1 text-2xl font-medium first:text-tx02 last:text-tx01 sm:space-y-4 sm:text-4xl md:text-6xl xl:text-7xl xl:font-semibold 2xl:text-8xl">
          {props.first}
          <br />
          <span className="ml-10 sm:ml-20 xl:ml-20">{props.last}</span>
        </MaskedLines>
      </div>

      <div className="mb-6 text-sm font-light uppercase tracking-widest sm:text-base">
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
      <div className="mx-auto w-11/12 border-b border-tx02 pb-2  sm:w-10/12 lg:w-3/4 xl:w-8/12">
        <Title text="team" />
      </div>

      <div className="relative mx-auto flex w-11/12 flex-col sm:w-10/12 lg:w-3/4 xl:w-8/12">
        {members.map((member, i) => (
          <TeamMember
            key={member.first + member.last}
            onActive={() => setActiveIndex(i)}
            {...member}
          />
        ))}

        <div className="absolute right-0 h-full w-fit">
          <div className=" sticky bottom-0 top-1/3 py-3">
            <ul className="flex w-20 flex-col items-center space-y-1 sm:w-28 sm:space-y-2 xl:w-36">
              {members.map((member, i) => (
                <li key={member.first + member.last}>
                  <Image
                    className={clsx(
                      "rounded-full transition-team duration-500",
                      activeIndex === i
                        ? "w-20 opacity-90 sm:w-28 xl:w-36"
                        : "w-14 opacity-70 grayscale sm:w-20 xl:w-24",
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

function FooterSection({ hover, ...props }) {
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

      <div className="z-10 mx-auto my-auto w-11/12 sm:w-10/12 lg:w-3/4 xl:w-3/5">
        <div className="mx-auto my-auto space-y-28 text-center">
          <div className="text-xs font-normal uppercase tracking-[6px] text-tx01 md:text-lg xl:text-xl 2xl:text-2xl">
            Paddle Smash
          </div>

          <div className=" -space-y-2 text-5xl font-semibold text-tx01 sm:text-8xl lg:text-9xl 2xl:text-[160px]">
            <div>Let&apos;s start</div>
            <div>the fun</div>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "absolute bottom-0 h-1/3  w-full bg-gradient-to-t from-bg01  via-bg01/60",
          hover && "z-30",
        )}
        {...props}
      ></div>
    </footer>
  );
}

function FooterSectionHover(props) {
  return (
    <footer className="relative flex h-[75vh]">
      <div className="mx-auto my-auto w-11/12 sm:w-10/12 lg:w-3/4 xl:w-3/5">
        <div
          className="mx-auto my-auto space-y-28 pb-10 text-center"
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          <div className="text-xs font-normal uppercase tracking-[6px] md:text-lg xl:text-xl 2xl:text-2xl">
            Paddle Smash
          </div>

          <div className="-space-y-2 text-5xl font-semibold sm:text-8xl lg:text-9xl 2xl:text-[140px]">
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

function StartButton({ onClick, onMouseEnter, onMouseLeave }) {
  const { data } = useSWR("/users/me");

  const className =
    "text-center text-tx01 text-xl lg:text-2xl font-extralight tracking-[4.80px] uppercase border border-tx01 rounded-full px-10 py-1 lg:px-14 lg:py-2 2xl:px-16 hover:text-tx03 hover:bg-tx01 ease-linear transition-colors duration-[400ms]  z-30 mt-10 lg:mt-48";

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex w-screen flex-col items-center justify-center bg-bg01 pb-40  lg:pb-64"
    >
      {data ? (
        <Link href="/home" className={className}>
          Start
        </Link>
      ) : (
        <button onClick={onClick} className={className}>
          Start
        </button>
      )}
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
      className="fixed bottom-8 left-2/4 z-40 hidden -translate-x-1/2 flex-col items-center justify-center rounded-full touch:flex"
      onContextMenu={preventContextMenu}
      {...props}
    >
      <Image className="w-full select-none" src={pressImg} alt="Logo" />
      <Icon
        className="absolute text-tx06"
        icon="mingcute:finger-press-line"
        width={26}
      />
    </button>
  );
});

function Blur() {
  return (
    <>
      <div className="fixed bottom-0 z-[19] hidden h-1/5 w-full bg-gradient-to-t from-bg01 from-30% via-bg01/80 touch:block"></div>
      <div className="fixed top-0 z-[19] hidden h-1/6 w-full bg-gradient-to-b from-bg01 from-10% via-bg01/60 touch:block"></div>
    </>
  );
}

function StartSection(props) {
  useLockBodyScroll();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-[60] flex h-screen w-screen flex-col items-center justify-center bg-bg01"
    >
      <motion.div
        initial={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="relative"
      >
        <Image
          src={logoPic}
          alt="Logo of the game"
          className="h-52 w-52 lg:h-72 lg:w-72"
        />
        <button
          onClick={props.onClick}
          className="absolute left-1/2 top-full -translate-x-1/2 translate-y-8 rounded-full border border-tx01 px-10 py-1 text-center text-xl font-extralight uppercase tracking-[4.80px]
          text-tx01 transition-colors duration-[400ms] ease-linear hover:bg-tx01 hover:text-tx03 lg:px-14 lg:py-2 lg:text-2xl 2xl:px-16 "
        >
          Start
        </button>
      </motion.div>
    </motion.div>
  );
}

function LoginSection({ onClick, ...props }) {
  useLockBodyScroll();

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-bg01/90"
      {...props}
    >
      <div className="no-scrollbar relative flex h-3/5 max-h-[45rem] w-11/12 flex-col items-center justify-between overflow-auto rounded-2xl border-[1.5px] border-tx05 bg-bg01 sm:h-2/3 sm:w-[30rem]">
        <button onClick={onClick}>
          <Icon
            className="absolute right-6 top-6 h-7 w-7 xs:h-8 xs:w-8 text-tx05"
            icon="icon-park-outline:close"
            width="36"
          />
        </button>

        <div className="text-base font-light uppercase tracking-[8px] sm:text-xl sm:tracking-[10px] lg:text-2xl">
          paddel smash
        </div>

        <Image
          src={logoPic}
          alt="Logo of the game"
          className="h-52 w-52 sm:h-64 sm:w-64"
        />

        <div>
          <div className="lg:text:2xl mb-6 mt-6 text-lg font-medium uppercase tracking-[5px] sm:text-xl">
            login with
          </div>

          <div>
            <Link
              className="group mb-4 flex items-center"
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/42`}
            >
              <Image
                className="mr-3 h-6 w-6 2xl:h-8 2xl:w-8"
                src={intrat}
                alt="intrat logo"
              />
              <div className="text-base font-light uppercase tracking-widest sm:text-xl lg:text-2xl">
                intra
              </div>
            </Link>

            <Link
              className="group mb-2 flex items-center"
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
            >
              <Image
                className="mr-3 h-6 w-6 2xl:h-8 2xl:w-8"
                src={google}
                alt="google logo"
              />
              <div className="text-base font-light uppercase tracking-widest sm:text-xl lg:text-2xl">
                google
              </div>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [overlay, setOverlay] = useState(true);
  const [slideUp, setSlideUp] = useState(false);
  const ref = useRef(null);
  const rect = ref.current?.getBoundingClientRect() || {};
  const [isPressed, setIsPressed] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const mouse = useMouse();
  const [scroll] = useWindowScroll();
  const [login, setLogin] = useState(false);

  return (
    <main
      className="relative flex flex-col"
      onMouseUp={() => setIsPressed(false)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <AnimatePresence>
        {overlay && (
          <StartSection
            onClick={() => {
              setIsHidden(false);
              setIsHover(true);
              setSlideUp(true);
              setOverlay(false);
            }}
          />
        )}
      </AnimatePresence>
      <div className="bg-bg01 text-tx01">
        <HeroSection
          animate={slideUp}
          onMouseEnter={() => setIsHidden(true)}
          onMouseLeave={() => setIsHidden(false)}
        />
        <DescriptionSection />
        <FeaturesSection
          onMouseEnter={() => setIsHidden(true)}
          onMouseLeave={() => setIsHidden(false)}
        />
        <TechnologySection
          onMouseEnter={() => setIsHidden(true)}
          onMouseLeave={() => setIsHidden(false)}
        />
        <TeamSection />
        <FooterSection
          onMouseEnter={() => setIsHidden(true)}
          onMouseLeave={() => setIsHidden(false)}
        />
        <StartButton
          onClick={() => setLogin(true)}
          onMouseEnter={() => setIsHidden(true)}
          onMouseLeave={() => setIsHidden(false)}
        />
        {login && (
          <LoginSection
            onClick={() => setLogin(false)}
            onMouseEnter={() => setIsHidden(true)}
            onMouseLeave={() => setIsHidden(false)}
          />
        )}
        <Blur />
      </div>
      <PressButton
        ref={ref}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
      />
      <motion.div
        id="masked"
        className="bg-pr01 absolute pb-64 z-20 descendant:!text-tx04 descendant:!border-tx04"
        animate={{
          "--x": `${mouse.x}px`,
          "--y": `${scroll.y + mouse.y}px`,
          "--scale": isHidden ? 0 : isHover ? 1 : 0.1,
          "--scale-touch": isPressed ? 1 : 0,
        }}
        style={{
          "--x-touch": `${rect.x + rect.width / 2}px`,
          "--y-touch": `${rect.top + rect.height / 2 + scroll.y}px`,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.5 }}
      >
        <HeroSectionHover
          animate={slideUp}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        />
        <DescriptionSectionHover
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        />
        <FeaturesSection hover />
        <TechnologySection hover />
        <TeamSection />
        <FooterSectionHover
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        />
      </motion.div>
    </main>
  );
}
