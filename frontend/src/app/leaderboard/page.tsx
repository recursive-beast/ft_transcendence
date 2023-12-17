"use client";

import { Title, Header, RightBar, Rank } from "@/components/common";
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
import useSWR from "swr";

function LeaderMenu(props) {
  return (
    // <div className="h-3/5 min-h-[30rem] grid w-full grid-rows-6 items-center justify-center justify-items-center rounded-2xl border border-t-0 border-tx01 bg-gradient-to-t from-tx02/80 px-1 py-10 text-tx05">
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-t-0 border-tx01 bg-gradient-to-t from-tx02/80 py-5 text-tx05 lg:gap-3 lg:py-10 xl:gap-4">
      {/* pic */}
      <div>
        <Image
          alt=""
          className=" h-36 w-36 rounded-full border border-tx01 object-cover"
          src={props.pic}
          quality={100}
        />
      </div>

      {/* name */}
      <div className="w-40 text-2xl capitalize tracking-[0.2rem]">
        {props.name}
      </div>

      {/* position */}
      <div className="border- w-40 text-xl font-extralight tracking-widest">
        <div className="mb-1">Position</div>

        <div className="text-tx01">{props.pos}</div>
      </div>

      {/* rate */}
      <div className="border- w-40 text-xl font-extralight tracking-widest">
        <div className="mb-1">Rate</div>

        <div className="text-tx01">{props.rate}</div>
      </div>

      {/* games */}
      <div className="border- w-40 text-xl font-extralight tracking-widest">
        <div className="mb-1">Games</div>

        <div className="text-tx01">{props.games}</div>
      </div>

      {/* wins */}
      <div className="border- w-40 text-xl font-extralight tracking-widest">
        <div className="mb-1">Wins</div>

        <div className="text-tx01">{props.wins}</div>
      </div>
    </div>
  );
}

function Ranking(props) {
  const { data: rankings } = useSWR("/game/leaderboard");
  const { data: me } = useSWR("/users/me");

  return (
    <section className="custom-scrl-bar custom-scrl-bar-lead my-4 w-full overflow-auto rounded-3xl border-y-[0.5px] border-tx05 px-3 text-[10px] font-light capitalize text-tx01 xs:text-xs sm:text-base">
      <Rank
        pos="x"
        pic={Pic01}
        name="player"
        games="games"
        rate="rate"
        wins="wins"
        first
      />
      {rankings?.map((ranking, index) => (
        <Rank
          key={index}
          pos={index + 1}
          pic={ranking.user.avatar}
          name={ranking.user.displayName}
          games={ranking.gamesPlayed}
          rate={`${ranking.winRatio.toFixed(2)}%`}
          wins={ranking.user.wins.length}
          index={ranking.user.id === me?.id}
        />
      ))}
    </section>
  );
}

function Place({ className, index, ...props }: any) {
  return (
    <div
      className={clsx(
        "mt-16 flex flex-col items-center justify-center xs:gap-2 gap-1 rounded-2xl border border-t-0 border-tx05 px-1 pb-1 xs:mt-20 lg:mt-24",
        className,
        index && "border-tx06",
      )}
    >
      {/* pic */}
      <div>
        <Image
          alt=""
          className={clsx(
            "h-7 w-7 -translate-y-5 scale-[1.8] rounded-full border object-cover xs:h-11  xs:w-11 xs:-translate-y-9 sm:h-14 sm:w-14 lg:h-16 lg:w-16 lg:xs:-translate-y-11 -mt-2",
            props.brColor,
          )}
          src={props.pic}
          quality={100}
          width={300}
          height={300}
        />
      </div>

      {/* name */}
      <div className="text-[10px] capitalize tracking-widest text-tx05 xs:text-xs  sm:text-sm lg:text-base">
        {props.name}
      </div>

      {/* games & up */}
      <div className="flex justify-between w-full text-[9px] xs:text-xs sm:text-sm font-light text-tx01">
        {/* games */}
        <div className="flex items-center">
          <Icon
            className="mr-[2px] flex-none h-3 w-3 xs:h-4 xs:w-4 xs:mr-1 lg:h-5 lg:w-5 "
            icon="solar:gamepad-broken"
          />
          <div>{props.games}</div>
        </div>
        {/* up */}
        <div className="flex items-center">
          <Icon
            className="mr-[2px] flex-none h-3 w-3 xs:h-4 xs:w-4 xs:mr-1 lg:h-5 lg:w-5 "
            icon="iconoir:page-up"
          />
          <div>{props.up}</div>
        </div>
      </div>

      {/* wins */}
      <div className="text-xs font-light xs:text-sm sm:text-lg lg:text-xl">
        <div className="flex items-center">
          <Icon
            className="mr-1 h-3 w-3 xs:h-5 xs:w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
            icon="openmoji:trophy"
          />
          <div>{props.wins}</div>
        </div>
      </div>

      {/* icone */}
      <div>
        <Icon
          className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 lg:h-9 lg:w-9"
          icon={props.place}
        />
      </div>
    </div>
  );
}

function FirstPlaces(props) {
  const { data: rankings } = useSWR("/game/leaderboard");

  const first = rankings?.[0];
  const second = rankings?.[1];
  const third = rankings?.[2];

  return (
    <div className="mb-5 flex items-end justify-center gap-2 xs:mb-8 xs:gap-3 sm:mt-5 sm:gap-12 lg:gap-16 2xl:mb-16 2xl:mt-8 2xl:gap-20">
      {/*  */}
      {third && (
        <Place
          className="h-24 w-20 bg-gradient-to-t from-[#C0C0C0]/50 text-[#C0C0C0] xs:h-36 xs:w-28 sm:h-48 sm:w-40 lg:h-52 lg:w-44"
          brColor="border-[#C0C0C0]"
          pic={third.user.avatar}
          name={third.user.displayName}
          games={third.gamesPlayed}
          up={`${third.winRatio.toFixed(2)}%`}
          wins={third.user.wins.length}
          place="tabler:circle-3-filled"
        />
      )}
      {first && (
        <Place
          className="mb-4 h-32 w-[90px] bg-gradient-to-t from-[#F1B31C]/50 text-[#F1B31C] xs:h-44 xs:w-[122px] sm:h-56 sm:w-44 xl:h-60 xl:w-48"
          brColor="border-[#F1B31C]"
          pic={first.user.avatar}
          name={first.user.displayName}
          games={first.gamesPlayed}
          up={`${first.winRatio.toFixed(2)}%`}
          wins={first.user.wins.length}
          place="tabler:circle-1-filled"
        />
      )}
      {second && (
        <Place
          className="h-28 w-20 bg-gradient-to-t from-[#CD7F32]/50 text-[#CD7F32] xs:h-40 xs:w-28 sm:h-52 sm:w-40 xl:h-56 xl:w-44"
          brColor="border-[#CD7F32]"
          pic={second.user.avatar}
          name={second.user.displayName}
          games={second.gamesPlayed}
          up={`${second.winRatio.toFixed(2)}%`}
          wins={second.user.wins.length}
          place="tabler:circle-2-filled"
        />
      )}
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

        <div className="mx-auto flex max-w-[1400px] flex-1 flex-col px-2 xs:px-3 sm:px-5 lg:px-8">
          {/* content */}
          <div className="xl:hidden">
            <Header />
          </div>
          <FirstPlaces />
          <Ranking />
        </div>
      </div>
    </main>
  );
}
