"use client";

import clsx from "clsx";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import ProfilePic from "@/images/profils/15.jpg";

function MbHeader(props) {
  return (
    <header className="flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
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

function MbProfileInfo(props) {
  return (
    <section className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Image
          className="object-cover w-14 h-14 xs:w-20 xs:h-20 sm:w-28 sm:h-28 rounded-full mr-4 xs:mr-6 sm:mr-10 xs:ml-2 sm:ml-4"
          src={ProfilePic}
          quality={100}
        />

        <div className="flex flex-col">
          <div className="text-tx02 text-base font-extrabold uppercase -mb-1  xs:text-lg sm:text-xl">
            welkome
          </div>

          <div className="text-tx05 text-base font-semibold capitalize tracking-widest sm:tracking-[3px] xs:text-lg sm:text-xl">
            megashoot
          </div>

          <div className="text-tx02 text-[8px] font-light capitalize xs:text-xs sm:text-lg">
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
      <div className="border border-tx05 text-[9px] xs:text-[11px] sm:text-lg w-fit rounded-lg sm:rounded-3xl py-1 px-1 xs:py-2 xs:px-3 sm:px-5 md:px-8">
        <div className=" text-tx01 uppercase tracking-wider">
          wins:<span className="text-tx02 capitalize"> last week: </span>{" "}
          <span className="text-tx05">{props.wins}</span>
        </div>

        <div className="flex items-end">
          <div className="flex mr-2 sm:mr-4">
            <div className="text-tx05 text-lg xs:text-xl sm:text-3xl">{props.nbrWin}</div>

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

      <div className="border border-tx05 text-[9px] xs:text-[11px] sm:text-lg w-fit rounded-lg sm:rounded-3xl py-1 px-1 xs:py-2 xs:px-3 sm:px-5 md:px-8">
        <div className=" text-tx01 uppercase tracking-wider">
          losses:<span className="text-tx02 capitalize"> last week: </span>{" "}
          <span className="text-tx05">{props.losses}</span>
        </div>

        <div className="flex items-end">
          <div className="flex mr-2 sm:mr-4">
            <div className="text-tx05 text-lg xs:text-xl sm:text-3xl">{props.nbrLos}</div>

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

function PlayRate(props) {
  return (
    <section className="flex justify-between space-x-1 xs:my-3 sm:mx-8 lg:mx-16 xl:mx-36">
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

export default function Home() {
  return (
    <main className="relative bg-bg01 text-tx01">
      <div className="fixed inset-0 bg-bg01  px-3 py-3 sm:px-7 sm:py-5">
        <MbHeader />
        <MbProfileInfo />
        <PlayRate />
      </div>
    </main>
  );
}
