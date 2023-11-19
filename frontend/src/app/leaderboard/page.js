"use client";

import {
  Title,
  Header,
  RightBar,
  Rank,
} from "@/components/common";
import clsx from "clsx";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";

//Profils
import Pic01 from "@/images/profils/01.jpg";
import Pic02 from "@/images/profils/02.jpg";
import Pic03 from "@/images/profils/03.png";
import Pic11 from "@/images/profils/11.jpg";
import Pic05 from "@/images/profils/05.jpg";
import Pic06 from "@/images/profils/06.jpg";
import Pic15 from "@/images/profils/15.jpg";

function LeaderMenu(props) {
  return (
    <div className="grid h-[35rem] w-72 grid-rows-4 items-center justify-center justify-items-center rounded-2xl border border-t-0 border-tx01 bg-gradient-to-t from-tx02/80 px-1 py-10 text-tx05 md-h:h-[40rem]">
      {/* pic */}
      <div>
        <Image
          className=" h-36 w-36 rounded-full border border-tx01 object-cover"
          src={props.pic}
          quality={100}
        />
      </div>

      {/* name */}
      <div className="text-2xl capitalize tracking-[0.2rem]">{props.name}</div>

      {/* level */}
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between text-xl font-extralight tracking-widest">
          <div>Level</div>
          <div className=" text-tx01">{props.level}</div>
        </div>

        <div className="h-1 w-full rounded-full bg-bg01 bg-gradient-to-r from-tx01"></div>
      </div>

      {/* position */}
      <div className="w-full text-xl font-extralight tracking-widest">
        <div className="mb-2">My Position</div>

        <div className="text-tx01">{props.pos}</div>
      </div>

      {/* games */}
      <div className="w-full text-xl font-extralight tracking-widest">
        <div className="mb-2">Games</div>

        <div className="text-tx01">{props.games}</div>
      </div>
    </div>
  );
}

function Ranking(props) {
  return (
    <section className="no-scrollbar my-4 w-full overflow-auto rounded-3xl border-y-[0.5px] border-tx05 px-3 text-[10px] font-light capitalize text-tx01 xs:text-xs sm:text-base">
      <Rank
        pos="x"
        pic={Pic01}
        name="player"
        games="games"
        rate="rate"
        level="level"
        first
      />
      <Rank
        pos="5"
        pic={Pic15}
        name="megashoot"
        games="97"
        rate="60%"
        level="9"
        index
      />
      <Rank
        pos="6"
        pic={Pic06}
        name="aitlandlia"
        games="100"
        rate="55%"
        level="7"
      />
      <Rank
        pos="7"
        pic={Pic05}
        name="EmilyDavis"
        games="123"
        rate="40%"
        level="6"
      />
      <Rank
        pos="8"
        pic={Pic11}
        name="Benjnmith"
        games="100"
        rate="55%"
        level="7"
      />
      <Rank
        pos="9"
        pic={Pic15}
        name="Oliviarown"
        games="123"
        rate="40%"
        level="6"
      />
      <Rank
        pos="10"
        pic={Pic06}
        name="aitlandlia"
        games="100"
        rate="55%"
        level="7"
      />
      <Rank
        pos="11"
        pic={Pic05}
        name="EmilyDavis"
        games="123"
        rate="40%"
        level="6"
      />
      <Rank
        pos="12"
        pic={Pic11}
        name="Benjnmith"
        games="100"
        rate="55%"
        level="7"
      />
      <Rank
        pos="13"
        pic={Pic15}
        name="Oliviarown"
        games="123"
        rate="40%"
        level="6"
      />
      <Rank
        pos="14"
        pic={Pic06}
        name="aitlandlia"
        games="100"
        rate="55%"
        level="7"
      />
      <Rank
        pos="15"
        pic={Pic05}
        name="EmilyDavis"
        games="123"
        rate="40%"
        level="6"
      />
      <Rank
        pos="16"
        pic={Pic11}
        name="Benjnmith"
        games="100"
        rate="55%"
        level="7"
      />
      <Rank
        pos="17"
        pic={Pic15}
        name="Oliviarown"
        games="123"
        rate="40%"
        level="6"
      />
    </section>
  );
}

function Place({ className, index, ...props }) {
  return (
    <div
      className={clsx(
        "mt-16 grid grid-rows-5 items-center justify-center justify-items-center rounded-2xl border border-t-0 border-tx05 px-1 pb-1 xs:mt-20 lg:mt-24",
        className,
        index && "border-tx06",
      )}
    >
      {/* pic */}
      <div>
        <Image
          className={clsx(
            "h-7 w-7 -translate-y-5 scale-[1.8] rounded-full border object-cover xs:h-11  xs:w-11 xs:-translate-y-9 sm:h-14 sm:w-14 lg:h-16 lg:w-16 lg:xs:-translate-y-11",
            props.brColor,
          )}
          src={props.pic}
          quality={100}
        />
      </div>

      {/* name */}
      <div className="text-xs capitalize tracking-wide text-tx05 xs:text-sm xs:tracking-widest sm:text-base lg:text-xl lg:tracking-[0.2rem]">
        {props.name}
      </div>

      {/* games & up */}
      <div className="grid grid-cols-2 items-center text-[9px] font-light text-tx01 xs:gap-4 xs:text-sm sm:text-lg lg:text-xl">
        {/* games */}
        <div className="flex items-center">
          <Icon
            className="mr-1 h-3 w-3 xs:h-5 xs:w-5 sm:mr-2 sm:h-6 sm:w-6 lg:h-7 lg:w-7 "
            icon="solar:gamepad-broken"
          />
          <div>{props.games}</div>
        </div>
        {/* up */}
        <div className="flex items-center">
          <Icon
            className="mr-1 h-3 w-3 xs:h-5 xs:w-5 sm:mr-2 sm:h-6 sm:w-6 lg:h-7 lg:w-7 "
            icon="iconoir:page-up"
          />
          <div>{props.up}</div>
        </div>
      </div>

      {/* level */}
      <div className="text-xs font-light xs:text-lg sm:text-xl lg:text-2xl">
        <div className="flex items-center">
          <Icon
            className="mr-1 h-3 w-3 xs:h-5 xs:w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
            icon="openmoji:trophy"
          />
          <div>{props.level}</div>
        </div>
      </div>

      {/* icone */}
      <div>
        <Icon
          className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 lg:h-9 lg:w-9"
          icon="pepicons-pencil:trophy-circle"
        />
      </div>
    </div>
  );
}

function FirstPlaces(props) {
  return (
    <div className="mb-5 flex items-end justify-center gap-2 xs:mb-8 xs:gap-3 sm:mt-5 sm:gap-12 lg:gap-16 2xl:mb-16 2xl:mt-8 2xl:gap-20">
      {/*  */}
      <Place
        className="h-24 w-20 bg-gradient-to-t from-[#C0C0C0]/50 text-[#C0C0C0] xs:h-36 xs:w-28 sm:h-48 sm:w-40 lg:h-52 lg:w-44"
        brColor="border-[#C0C0C0]"
        pic={Pic03}
        name="badrbansh"
        games="99"
        up="78%"
        level="10"
      />
      <Place
        className="mb-4 h-32 w-[90px] bg-gradient-to-t from-[#F1B31C]/50 text-[#F1B31C] xs:h-44 xs:w-[122px] sm:h-56 sm:w-44 xl:h-60 xl:w-48"
        brColor="border-[#F1B31C]"
        pic={Pic05}
        name="syakoubinato"
        games="105"
        up="78%"
        level="11"
      />
      <Place
        className="h-28 w-20 bg-gradient-to-t from-[#CD7F32]/50 text-[#CD7F32] xs:h-40 xs:w-28 sm:h-52 sm:w-40 xl:h-56 xl:w-44"
        brColor="border-[#CD7F32]"
        pic={Pic02}
        name="moradikon"
        games="102"
        up="75%"
        level="10"
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex h-screen max-h-screen flex-col bg-bg01 text-tx01">
      {/* top of the window */}
      <Title />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden xl:block">
          <Header />
        </div>

        <div className="px-2 flex flex-1 flex-col xs:px-3 sm:px-5 lg:px-8 max-w-[1400px] mx-auto">
          {/* content */}
          <div className="xl:hidden">
            <Header />
          </div>
          <FirstPlaces />
          <Ranking />
        </div>

        <div>
          <RightBar
            menu={
              <LeaderMenu
                pic={Pic15}
                name="megashoot"
                level="9"
                pos="5th"
                games="97"
              />
            }
          />
        </div>
      </div>
    </main>
  );
}
