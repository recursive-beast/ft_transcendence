"use client";
import Image from "next/image";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import useSWR from "swr";
// import required modules
import { Navigation } from "swiper/modules";

import { Title, Header, Search, Friends } from "@/components/common";
import { History } from "@/app/user/[id]/page";
import classic from "@/images/thems/classic_.jpg";
import beach from "@/images/thems/beach_.jpg";
import snow from "@/images/thems/snow.jpg";
import space from "@/images/thems/space_.jpg";
import jungle from "@/images/thems/jungle.jpg";
import sahara from "@/images/thems/sahara.jpg";

import classic_bg from "@/images/thems/classic_bg.png";
import beach_bg from "@/images/thems/beach_bg.png";
import ice_bg from "@/images/thems/snow_bg.png";
import space_bg from "@/images/thems/space_bg.png";
import jungle_bg from "@/images/thems/jungle_bg.png";
import sahara_bg from "@/images/thems/sahara_bg.png";
import Pic01 from "@/images/profils/01.jpg";

function Mode({ onClick, ...props }) {
  return (
    <button
      className="z-10 flex grow flex-col items-center justify-center gap-3 border-b
             text-tx05 last:border-0 hover:bg-bg01/60 sm:border-b-0 sm:border-r-[0.5px]"
      onClick={onClick}
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7" icon={props.icon} />
      <div className="text-xs font-light sm:text-sm xl:text-base ">
        {props.title}
      </div>
    </button>
  );
}

function Modes(props) {
  const { data: me } = useSWR("/users/me");
  const [friend, setFriend] = useState(null);
  const [breack, setBreack] = useState("");
  const [mode, setMode] = useState("");
  const { data: users } = useSWR("/users");
  const [src, setSrc] = useState(Pic01);

  useEffect(() => {
    if (!users || mode !== "queue") return;

    let i = 0;
    let id;

    const update = () => {
      if (users && i >= users.length) i = 0;
      else i++;

      setSrc(users[i].avatar);
      id = setTimeout(update, 200);
      return id;
    };

    id = update();

    return () => clearTimeout(id);
  }, [mode, users]);

  return (
    <>
      {" "}
      <div className="flex h-72 w-48 flex-none overflow-hidden rounded-lg border-2 drop-shadow-2xl xs:h-80 xs:w-56 sm:h-48 sm:w-96 2xl:h-[20rem] 2xl:w-[40rem]">
        <Image className="opacity" fill src={props.pic} quality={100} />

        {!mode && (
          <div className="z-10 flex flex-1 flex-col items-stretch bg-bg01/40 sm:flex-row">
            <Mode
              icon="fa6-solid:user-group"
              title="invite friend"
              onClick={() => setMode("friend")}
            />
            <Mode
              icon="bxs:bot"
              title="play with bot"
              onClick={() => setMode("bot")}
            />
            <Mode
              icon="bxs:time-five"
              title="join a queue"
              onClick={() => setMode("queue")}
            />
          </div>
        )}

        {mode === "friend" && (
          <div className="z-10 flex flex-1 flex-col space-y-2 bg-bg01/90">
            <div className="no-scrollbar flex-1 overflow-auto">
              {/* if no friend selected >> select a frend and move to shoose breack point */}
              {!friend ? (
                <Friends game={true} onClick={setFriend} />
              ) : (
                <>
                  {/* if no Breack point selected >> select a breck point and move to waiting friend */}
                  {!breack ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-xs sm:gap-5 sm:text-sm xl:text-base">
                      <div className="text-center text-xl font-extralight tracking-widest sm:text-2xl xl:text-3xl">
                        Break Point
                      </div>

                      <div className="w-4/5 text-center font-light tracking-wide text-tx02">
                        Select one of the options below to set a breack Point
                        for the game
                      </div>

                      <div className="flex gap-3 sm:gap-5 xl:gap-7">
                        {[
                          { value: "3" },
                          { value: "5" },
                          { value: "7" },
                          { value: "9" },
                        ].map((v) => {
                          return (
                            <button
                              className="h-6 w-6 rounded-lg border text-tx05 hover:bg-tx05 hover:text-tx04 sm:h-8 sm:w-8 xl:h-10 xl:w-10"
                              key={v.value}
                              onClick={() => setBreack(v.value)}
                            >
                              {v.value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-xs sm:gap-4 sm:text-sm 2xl:gap-6 2xl:text-base">
                      <div className="text-center text-lg font-extralight tracking-widest sm:text-2xl xl:text-3xl">
                        Game pending
                      </div>

                      <div className="w-4/5 text-center font-light tracking-wide text-tx02">
                        waiting for your friend to join the game, Make sure that
                        your friend is present.
                      </div>

                      <Image
                        className="mr-2 h-12 w-12 flex-none animate-pulse rounded-full border-[1.5px] border-tx02 object-cover p-[2px] xs:mr-3 xs:h-14 xs:w-14 2xl:h-16 2xl:w-16"
                        src={friend.avatar}
                        quality={100}
                        width={56}
                        height={56}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {mode === "queue" && (
          <div className="z-10 flex flex-1 flex-col items-center justify-center bg-bg01/90">
            <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-xs sm:gap-3 sm:text-sm xl:text-base 2xl:gap-6">
              <div className="text-center text-xl font-extralight tracking-widest sm:text-2xl xl:text-3xl">
                Finding Match
              </div>

              <div className="w-4/5 text-center font-light tracking-wide text-tx02">
                Queueing up your match, thanks for your patience.
              </div>

              <div className="flex items-center -space-x-2">
                {/* my avatar */}
                <Image
                  className="h-12 w-12 flex-none rounded-full border-[1.5px] border-tx05 object-cover p-[2px] xs:h-14 xs:w-14 2xl:h-16 2xl:w-16"
                  src={me.avatar}
                  quality={100}
                  width={56}
                  height={56}
                />

                <div
                  className="z-10 h-fit text-3xl font-bold tracking-tighter text-tx01"
                  style={{
                    textShadow:
                      "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                  }}
                >
                  VS
                </div>

                {/* random avatar */}
                <Image
                  className="h-12 w-12 flex-none rounded-full border-[1.5px] border-tx05 object-cover p-[2px] xs:h-14 xs:w-14 2xl:h-16 2xl:w-16"
                  src={src}
                  quality={100}
                  width={56}
                  height={56}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          setMode("");
          setFriend(null);
          setBreack("");
        }}
        className={clsx(
          "z-10 mx-auto my-2 rounded-full border border-tx05 px-4 py-1 text-center text-sm font-light uppercase tracking-wider",
          "text-tx05 transition-colors duration-[400ms] ease-linear hover:bg-tx05 hover:text-tx03 sm:text-base",
          mode ? "visible" : "invisible",
        )}
      >
        cancel
      </button>
    </>
  );
}

function Slide(props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-tx03">
      <Image className="opacity-80" src={props.bg} quality={100} fill />

      {/* flex container for title and description */}
      <div
        className={clsx(
          "z-10 mt-10 flex w-fit flex-col items-center justify-center rounded-lg border px-8",
          "backdrop-blur-md xs:mt-14 xs:px-10 sm:mt-20 sm:px-20 md:mt-32",
          props.className,
        )}
      >
        <div
          className={clsx(
            "text-center text-4xl font-semibold uppercase leading-[62px]",
            props.className,
          )}
        >
          {props.title}
        </div>
        <div className="mb-3 text-center text-xs font-extralight tracking-wide text-tx04 xs:text-sm sm:text-2xl">
          {props.des}
        </div>
        <Modes pic={props.pic} />
      </div>
    </div>
  );
}

export default function Home({ params }) {
  return (
    <main className="flex h-screen max-h-screen flex-col bg-bg01 text-tx01 ">
      {/* top of the window */}
      <Title />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden xl:block">
          <Header
          // menu={<HomeMenu onClick={() => setSetting(true)} />}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-hidden">
          <div className="z-10 xl:hidden">
            <Header
            // menu={<HomeMenu onClick={() => setSetting(true)} />}
            />
          </div>

          <Swiper
            navigation={{
              nextEl: "#navigation-right",
              prevEl: "#navigation-left",
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            <div className="absolute top-5 z-10 w-full text-center text-2xl font-light tracking-widest text-tx05 xs:top-14 xs:text-3xl sm:top-32 sm:text-5xl xl:text-6xl">
              Paddle smash
            </div>

            <SwiperSlide>
              <Slide
                title="classic"
                des="Traditional Paddle Clash"
                className="text-tx01"
                pic={classic}
                bg={classic_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="beach"
                des="Beachfront Clash Fiesta"
                className="text-[#EAD2AC]"
                pic={beach}
                bg={beach_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="snow"
                des="Frosty Paddle Blizzard"
                className="text-tx05"
                pic={snow}
                bg={ice_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="sahara"
                des="Sahara Sand Paddle Duel"
                className="text-tx02"
                pic={sahara}
                bg={sahara_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="space"
                des="Cosmic Paddle Encounter"
                className="text-tx05"
                pic={space}
                bg={space_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="jungle"
                des="Jungle Canopy Paddle Safari"
                className="text-[#1C4226]"
                pic={jungle}
                bg={jungle_bg}
              />
            </SwiperSlide>

            {/* <div className="absolute right-0 top-0 z-10 hidden h-full w-36 bg-gradient-to-l from-bg01 from-5% via-bg01/60 xl:block"></div>
            <div className="absolute left-0 top-0 z-10 hidden h-full w-36 bg-gradient-to-r from-bg01 from-5% via-bg01/60 xl:block"></div> */}
            <button
              id="navigation-left"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 text-tx05 disabled:text-tx02 sm:left-5 xl:left-10"
            >
              <Icon
                className="h-8 w-8 rounded-full shadow-sm sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                icon="solar:double-alt-arrow-left-broken"
              />
            </button>
            <button
              id="navigation-right"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-tx05 disabled:text-tx02 sm:right-5 xl:right-10"
            >
              <Icon
                className="h-8 w-8 rounded-full shadow-sm sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                icon="solar:double-alt-arrow-right-broken"
              />
            </button>
          </Swiper>
        </div>
      </div>
    </main>
  );
}
