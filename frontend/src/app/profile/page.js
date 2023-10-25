"use client";

import clsx from "clsx";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
//Profils
import Pic01 from "@/images/profils/01.jpg";
import Pic02 from "@/images/profils/02.jpg";
import Pic03 from "@/images/profils/03.png";
import Pic11 from "@/images/profils/11.jpg";
import Pic05 from "@/images/profils/05.jpg";
import Pic06 from "@/images/profils/06.jpg";
import Pic15 from "@/images/profils/15.jpg";
//achievements
import AvCmBack from "@/images/achievements/comeback.png";
import AvDemon from "@/images/achievements/demon.png";
import AvIron from "@/images/achievements/iron.png";
import AvMaster from "@/images/achievements/master.png";
import AvProdigy from "@/images/achievements/prodigy.png";
import AvShar from "@/images/achievements/shar.png";
import AvUnsto from "@/images/achievements/unsto.png";
import AvShoot from "@/images/achievements/shoot.png";

function MbHeader() {
  return (
    <header className="flex flex-col">
      <div className="flex items-center justify-between mb-[12px] sm:mb-6">
        <div className="text-sm font-extralight tracking-[4px] capitalize left-0 xs:text-base sm:text-lg">
          paddle smash
        </div>

        <div className="flex space-x-4 xs:space-x-5 sm:space-x-7">
          <Icon
            className="text-tx01 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8"
            icon="guidance:search"
          />
          <Icon
            className="text-tx01 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8"
            icon="solar:notification-unread-broken"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pb-3 border-b border-tx02 xs:pb-4">
        {[
          "solar:home-2-broken",
          "solar:gamepad-broken",
          "solar:ranking-broken",
          "fluent:chat-28-regular",
        ].map((v) => {
          return (
            <Icon
              className="text-tx02 w-7 h-7 first:text-tx01 xs:w-8 xs:h-8 sm:w-10 sm:h-10"
              icon={v}
            />
          );
        })}
      </div>
    </header>
  );
}

function MbProfileInfo() {
  return (
    <section className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Image
          className="object-cover w-14 h-14 xs:w-20 xs:h-20 sm:w-28 sm:h-28 rounded-full mr-4 xs:mr-6 sm:mr-10 xs:ml-2 sm:ml-4"
          src={Pic15}
          quality={100}
        />

        <div className="flex flex-col">
          <div className="text-tx02 text-base font-extrabold uppercase -mb-1  xs:text-lg sm:text-xl">
            welkome
          </div>

          <div className="text-tx05 text-base font-semibold capitalize tracking-widest sm:tracking-[3px] xs:text-lg sm:text-xl">
            megashoot
          </div>

          <div className="text-[8px] font-light capitalize xs:text-xs sm:text-lg">
            The Paddle smash balls is waiting you
          </div>
        </div>
      </div>

      <Icon
        className="text-tx02 w-6 h-6 mx-1 sm:mx-10 xs:w-7 xs:h-7 sm:w-9 sm:h-9"
        icon="icon-park-outline:down-c"
      />
    </section>
  );
}

function Rate(props) {
  return (
    <>
      <div className="border border-tx05 text-[9px] xs:text-[11px] sm:text-sm w-full sm:w-2/5 lg:w-2/6  rounded-lg sm:rounded-3xl py-1 px-1 xs:py-2 xs:px-3 sm:px-5 md:px-8">
        <div className=" text-tx01 uppercase tracking-wider">
          wins:<span className="text-tx02 capitalize"> last week: </span>{" "}
          <span className="text-tx05">{props.wins}</span>
        </div>

        <div className="flex items-end">
          <div className="flex mr-2 sm:mr-4">
            <div className="text-tx05 text-lg xs:text-xl sm:text-3xl">
              {props.nbrWin}
            </div>

            <Icon
              className="text-[#24E5A5] w-[10px] h-[10px] "
              icon="fluent-mdl2:up"
            />
          </div>

          <div className="text-tx02 mb-1 mr-1 sm:mr-3">
            Wins Rate: <span className="text-[#24E5A5]">{props.wn}</span>{" "}
          </div>
          <div className="text-tx02 mb-1">
            Up: <span className="text-[#24E5A5]">{props.up}</span>{" "}
          </div>
        </div>
      </div>

      <div className="border border-tx05 text-[9px] xs:text-[11px] sm:text-sm rounded-lg w-full sm:w-2/5 lg:w-2/6 sm:rounded-3xl py-1 px-1 xs:py-2 xs:px-3 sm:px-5 md:px-8">
        <div className=" text-tx01 uppercase tracking-wider">
          losses:<span className="text-tx02 capitalize"> last week: </span>{" "}
          <span className="text-tx05">{props.losses}</span>
        </div>

        <div className="flex items-end">
          <div className="flex mr-2 sm:mr-4">
            <div className="text-tx05 text-lg xs:text-xl sm:text-3xl">
              {props.nbrLos}
            </div>

            <Icon
              className="text-[#E55F61] w-[10px] h-[10px] "
              icon="fluent-mdl2:down"
            />
          </div>

          <div className="text-tx02 mb-1 mr-1 sm:mr-3">
            lost Rate: <span className="text-[#E55F61]">{props.los}</span>{" "}
          </div>
          <div className="text-tx02 mb-1">
            Up: <span className="text-[#E55F61]">{props.down}</span>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

function PlayRate() {
  return (
    <section className="flex justify-between space-x-1 xs:my-3 sm:my-10 sm:mx-8 lg:mx-16 xl:mx-36">
      <Rate
        wins="+6"
        nbrWin="58"
        wn="60%"
        up="30%"
        //
        losses="+12"
        nbrLos="12"
        los="40%"
        down="53%"
      />
    </section>
  );
}

function Rank({ index, ...props }) {
  return (
    <div
      className={clsx(
        "w-full flex items-center my-[4px] sm:my-3",
        index && "text-tx05",
      )}
    >
      <div className="mr-2 sm:w-3 text-xs xs:text-base sm:text-xl w-2 ">
        {props.pos}
      </div>
      <div
        className={clsx(
          " w-full flex items-center justify-between border rounded-xl border-tx02 p-[2px] pr-4",
          index && "border-tx06",
        )}
      >
        <Image
          className="object-cover w-7 h-7  xs:w-10 xs:h-10 md:w-16 md:h-16 rounded-full mr-2 sm:mr-10 xs:ml-2 sm:ml-4"
          src={props.pic}
          quality={100}
        />
        <div className="w-24 text-left">{props.name}</div>
        <div className="w-9 text-center">{props.games}</div>
        <div className="w-9 text-center">{props.rate}</div>
        <div className="w-9 text-center">{props.level}</div>
      </div>
    </div>
  );
}

function Ranking(props) {
  return (
    <section className="text-tx01 text-[10px] xs:text-xs sm:text-base font-light capitalize my-4 w-full">
      <div className="text-tx02 flex m-1 items-center justify-between uppercase pr-4">
        <div className="mr-7 xs:mr-12 sm:mx-16"></div>
        <div className="w-32 text-center">player</div>
        <div className="w-9 text-center">games</div>
        <div className="w-9 text-center">rate</div>
        <div className="w-9 text-center">level</div>
      </div>
      <div>
        <Rank
          pos="1"
          pic={Pic01}
          name="syakoubinato"
          games="105"
          rate="78%"
          level="11"
        />
        <Rank
          pos="3"
          pic={Pic11}
          name="badrbansh"
          games="99"
          rate="73%"
          level="10"
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
          pos="9"
          pic={Pic05}
          name="moonshot"
          games="123"
          rate="40%"
          level="6"
        />
      </div>
    </section>
  );
}

function Achiv(props) {
  return (
    <div className=" mt-12 pb-2 flex flex-col items-center justify-between w-28 h-36 border-[0.5px] border-t-0 rounded-2xl">
      <div className="drop-shadow-[0px_2px_25px_rgba(202,241,90,1)] "><Image
        className="scale-[2.5] -translate-y-5 w-8 h-8  xs:w-10 xs:h-10 md:w-16 md:h-16 bg-origin-border"
        src={props.pic}
        quality={100}
      /></div>

      <div className="text-base text-tx05">title</div>

      <div className="text-[9px] text-tx05/70 text-center font-normal ">
        Win a game of Pong without letting the ball get past your paddle
      </div>
      <div className="text-sm text-tx02 flex items-center">
        <Icon
          className="text-tx06 mr-2 w-[18px] h-[18px] mx-1 sm:mx-10 xs:w-7 xs:h-7 sm:w-9 sm:h-9"
          icon="solar:lock-broken"
        />
        <div>Locked</div>
      </div>
    </div>
  );
}

function Achievement() {
  return (
    <section className="text-tx05 mb-2">
      <Achiv pic={AvMaster} />
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative bg-bg01 text-tx01">
      <div className="fixed justify-stretch inset-0 bg-bg01  px-3 py-3 sm:px-7 sm:py-5">
        <MbHeader />
        <MbProfileInfo />
        <PlayRate />
        <Ranking />
        <Achievement />
      </div>
    </main>
  );
}
