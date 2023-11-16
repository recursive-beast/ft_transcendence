"use client";

import clsx from "clsx";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";
import { useState } from "react";

import logoPic from "@/images/logos/logo.png";
import qrCode from "@/images/pics/qrcode.jpeg";
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
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

function Notif(props) {
  return (
    <div className="m-3 flex items-center justify-between">
      <div className="flex items-center">
        {/* image */}
        <Image
          className="mr-4 h-12 w-12 rounded-full border border-tx05 object-cover"
          src={props.pic}
          quality={100}
        />

        {/* title & descriiption */}
        <div className="text-tx01">
          <div className="w-36 truncate capitalize tracking-widest xs:w-52 sm:w-40 lg:w-36">
            {props.title}
          </div>
          <div className="w-36 truncate text-xs font-extralight xs:w-52 sm:w-40 lg:w-36">
            {props.desc}
          </div>
        </div>
      </div>
      {/* time */}
      <div className="w-8 text-center text-xs text-tx02">{props.time}</div>
    </div>
  );
}


export function Notificatin() {
  return (
    <div className="z-10 flex flex-col items-center sm:items-end lg:sticky lg:items-center">
      <div className="no-scrollbar absolute h-[30rem] w-full overflow-auto rounded-b-[2rem] border-y border-tx05 border-t-tx02 bg-bg01 shadow-2xl shadow-tx05/40 xs:h-[33rem] sm:w-80 sm:rounded-3xl sm:border sm:border-t-tx05">
        <div className="sticky  top-0 bg-bg01 px-5 py-3 text-base capitalize tracking-widest text-tx05">
          Recent Notification
        </div>
        <div className="px-2">
          <Notif
            pic={Pic02}
            title="syakoubi"
            desc="invited you to a game"
            time="5min"
          />
          <Notif
            pic={Pic02}
            title="syakoubi"
            desc="added you as Friend"
            time="15min"
          />
          <Notif
            pic={Pic05}
            title="mmessaou"
            desc="added you to the group 'zwaml'"
            time="5min"
          />
          <Notif
            pic={Pic01}
            title="mel-hous"
            desc="added you as Friend"
            time="30min"
          />
          <Notif
            pic={Pic03}
            title="aait-oma"
            desc="invited you to a game"
            time="1h"
          />
          <Notif
            pic={AvCmBack}
            title="comeback kid"
            desc="achievement unlocked"
            time="15min"
          />
          <Notif
            pic={Pic03}
            title="aait-oma"
            desc="added you as Friend"
            time="1h"
          />

          <Notif
            pic={Pic02}
            title="syakoubi"
            desc="invited you to a game"
            time="5min"
          />
          <Notif
            pic={Pic02}
            title="syakoubi"
            desc="added you as Friend"
            time="15min"
          />
          <Notif
            pic={Pic05}
            title="mmessaou"
            desc="added you to the group 'zwaml'"
            time="5min"
          />
          <Notif
            pic={Pic01}
            title="mel-hous"
            desc="added you as Friend"
            time="30min"
          />
          <Notif
            pic={Pic03}
            title="aait-oma"
            desc="invited you to a game"
            time="1h"
          />
          <Notif
            pic={AvCmBack}
            title="comeback kid"
            desc="achievement unlocked"
            time="15min"
          />
          <Notif
            pic={Pic03}
            title="aait-oma"
            desc="added you as Friend"
            time="1h"
          />
        </div>
      </div>
    </div>
  );
}

export function HomeMenu(props) {
  return (
    <div className={props.className}>
      {/* search  */}
      <div className="mb-3 flex items-center">
        <Icon
          className="h-5 w-5 text-tx01 xs:h-6 xs:w-6"
          icon="guidance:search"
        />
        <input
          className="ml-3 h-8 w-full border-b border-tx03 bg-bg01 text-base font-extralight xs:text-xl"
          defaultValue="Search"
        />
      </div>

      {/* setting and log-out */}
      <div className="mb-5 flex items-center justify-between text-tx02">
        <button
          className="flex items-center space-x-2 rounded-xl border-b p-1"
          // onClick={() => {}}
        >
          <Icon
            className="h-5 w-5 xs:h-6 xs:w-6"
            icon="solar:settings-broken"
          />
          <div className="text-base font-normal capitalize xs:text-xl xs:tracking-[5px]">
            setting
          </div>
        </button>

        <Link
          className="flex items-center space-x-2 rounded-xl border-b p-1"
          href={"/.."}
        >
          <Icon
            className="h-5 w-5 xs:h-6 xs:w-6"
            icon="fluent-mdl2:navigate-back"
          />
          <div className="text-base font-normal capitalize xs:text-xl xs:tracking-[5px]">
            log out
          </div>
        </Link>
      </div>

      {/* Friends elements */}
      <Friends />
    </div>
  );
}

export function Menu(props) {
  return (
    <div className="flex w-full flex-col items-center sm:absolute sm:right-0 sm:w-96 lg:hidden">
      {props.menu}
    </div>
  );
}
