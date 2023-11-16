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

import { Menu } from "@/components/menu";
import { Notificatin, HomeMenu } from "@/components/menu";

export function Title() {
  return (
    <div className="hidden h-12 w-full items-center justify-center border-b border-tx01 bg-bg02 text-xl font-light uppercase tracking-[10px] xs:tracking-[14px] lg:flex xl:h-16 xl:text-2xl">
      paddle smash
    </div>
  );
}

export function TopBar(props) {
  const [menu, setMenu] = useState(false);
  const [notif, setNotif] = useState(false);
  return (
    <div className="lg:hidden">
      {/* visible */}
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <div className="left-0 text-base font-light capitalize tracking-[5px] xs:text-base sm:text-lg lg:hidden">
          paddle smash
        </div>

        {/* button's */}
        {props.home && (
          <div className="flex space-x-4 xs:space-x-5 sm:space-x-7 lg:hidden">
            {/* notif */}
            <button
              onClick={() => {
                setNotif(!notif);
                setMenu(false);
              }}
            >
              <Icon
                className={clsx(
                  "h-5 w-5 text-tx01 xs:h-6 xs:w-6 sm:h-7 sm:w-7",
                  notif && "text-tx02",
                )}
                icon={
                  notif
                    ? "icon-park-outline:close"
                    : "solar:notification-unread-broken"
                }
              />
            </button>

            {/* menu */}
            <button
              onClick={() => {
                setMenu(!menu);
                setNotif(false);
              }}
            >
              <Icon
                className={clsx(
                  "h-5 w-5 text-tx01 xs:h-6 xs:w-6 sm:h-7 sm:w-7",
                  menu && "text-tx02",
                )}
                icon={menu ? "icon-park-outline:close" : "uiw:menu"}
              />
            </button>
          </div>
        )}
      </div>

      {/* hidden */}
      {menu && <MenuBar menu={props.menu} />}
      {notif && <Notificatin />}
    </div>
  );
}

function NavBar() {
  return (
    <div className="flex items-center justify-between pb-3 xs:pb-4 xl:h-[55vh] xl:flex-col">
      {[
        { text: "home", icon: "solar:home-2-broken" },
        { text: "game", icon: "solar:gamepad-broken" },
        { text: "chat", icon: "fluent:chat-28-regular" },
        { text: "leaderboard", icon: "solar:ranking-broken" },
      ].map((v) => {
        return (
          <button key={v.text} className="group flex flex-col items-center">
            <Icon
              className="h-7 w-7 text-tx01 xs:h-8 xs:w-8 sm:h-10 sm:w-10 lg:transition lg:duration-500 lg:group-hover:text-tx02 xl:group-hover:-translate-y-1 2xl:h-11 2xl:w-11"
              icon={v.icon}
            />
            <div className="hidden text-sm font-light uppercase tracking-[3px] text-tx01 lg:opacity-0  lg:transition lg:duration-700 lg:group-hover:opacity-100 xl:block">
              {v.text}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function Header(props) {
  return (
    <header className="border-b border-tx02 pt-3 xs:px-2 xl:flex xl:h-full xl:w-36 xl:items-center xl:justify-center xl:border-b-0 xl:border-r xl:p-0 2xl:w-56">
      {/* top bar */}
      <TopBar home={props.home} menu={props.menu} />
      {/* nav */}
      <NavBar />
    </header>
  );
}

export function RightBarr(props) {
  const [notif, setNotif] = useState(false);
  return (
    <section className="hidden h-screen w-[22rem] justify-center border-l border-tx03 px-4 lg:block">
      {props.menu}
    </section>
  );
}

export function MenuBar(props) {
  return (
    <div className="flex w-full flex-col items-center justify-between sm:absolute sm:right-0 sm:w-96 lg:hidden absolute  h-[80vh]
    rounded-b-[2rem] border-y border-tx05 border-t-tx02 bg-bg01 px-5 py-3
      shadow-2xl shadow-tx05/40 sm:rounded-tl-[2rem] sm:border-l sm:border-t-tx05 sm:py-8">
      {/* <div
        className="absolute flex h-[80vh] w-full flex-col justify-between overflow-auto rounded-b-[2rem] border-y border-tx05 border-t-tx02 bg-bg01 px-5 py-3
      shadow-2xl shadow-tx05/40 sm:rounded-tl-[2rem] sm:border-l sm:border-t-tx05 sm:py-8"
      > */}
        {props.menu}
      {/* </div> */}
    </div>
  );
}

export function BarButton(props) {
  return (
    <div className="border-b border-tx02 last:border-0">
      <button
        className="my-4 flex w-40 items-center justify-center space-x-3 sm:w-44"
        onClick={props.onClick}
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" icon={props.icon} />
        <div className="text-sm font-light capitalize tracking-[5px] sm:text-base">
          {props.title}
        </div>
      </button>
    </div>
  );
}

export function ProfileInfo(props) {
  const [bar, setBar] = useState(false);
  return (
    <section className="relative my-2 flex items-center justify-between xs:my-4">
      <div className="flex items-center">
        <Image
          className="mr-4 h-14 w-14 rounded-full object-cover xs:ml-2 xs:mr-6 xs:h-20 xs:w-20 sm:ml-4 sm:mr-10 sm:h-28 sm:w-28"
          src={Pic15}
          quality={100}
        />

        <div className="flex flex-col">
          <div className="-mb-1 text-base font-extrabold uppercase text-tx02  xs:text-lg sm:text-xl">
            welkome
          </div>

          <div className="text-base font-semibold capitalize tracking-widest text-tx05 xs:text-lg sm:text-xl sm:tracking-[3px]">
            megashoot
          </div>

          <div className="text-[8px] font-light capitalize xs:text-xs sm:text-lg">
            The Paddle smash balls is waiting you
          </div>
        </div>
      </div>
    </section>
  );
}

export function Rate(props) {
  return (
    <>
      <div className="mr-[2px] flex w-full flex-col items-center rounded-lg border border-tx05 px-1 py-1 text-[9px] xs:w-52 xs:px-3 xs:py-2 xs:text-[11px] sm:w-72 sm:rounded-3xl sm:px-5 sm:text-sm md:ml-5 md:w-80 md:px-8 lg:w-72 lg:px-5 xl:ml-14 xl:w-80 xl:px-8 2xl:ml-36">
        <div>
          <div className="uppercase tracking-wider text-tx01">
            wins:<span className="capitalize text-tx02"> last week: </span>{" "}
            <span className="text-tx05">{props.wins}</span>
          </div>

          <div className="flex items-end">
            <div className="mr-2 flex sm:mr-4">
              <div className="text-lg text-tx05 xs:text-xl sm:text-3xl">
                {props.nbrWin}
              </div>

              <Icon
                className="h-[10px] w-[10px] text-[#24E5A5] "
                icon="fluent-mdl2:up"
              />
            </div>

            <div className="mb-1 mr-1 text-tx02 sm:mr-3">
              Wins Rate: <span className="text-[#24E5A5]">{props.wn}</span>{" "}
            </div>
            <div className="mb-1 text-tx02">
              Up: <span className="text-[#24E5A5]">{props.up}</span>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="ml-[2px] flex w-full flex-col items-center rounded-lg border border-tx05 px-1 py-1 text-[9px] xs:w-52 xs:px-3 xs:py-2 xs:text-[11px] sm:w-72 sm:rounded-3xl sm:px-5 sm:text-sm md:mr-5 md:w-80 md:px-8 lg:w-72 lg:px-5 xl:mr-14 xl:w-80 xl:px-8 2xl:mr-36">
        <div>
          <div className="uppercase tracking-wider text-tx01">
            losses:<span className="capitalize text-tx02"> last week: </span>{" "}
            <span className="text-tx05">{props.losses}</span>
          </div>

          <div className="flex items-end">
            <div className="mr-2 flex sm:mr-4">
              <div className="text-lg text-tx05 xs:text-xl sm:text-3xl">
                {props.nbrLos}
              </div>

              <Icon
                className="h-[10px] w-[10px] text-[#E55F61] "
                icon="fluent-mdl2:down"
              />
            </div>

            <div className="mb-1 mr-1 text-tx02 sm:mr-3">
              lost Rate: <span className="text-[#E55F61]">{props.los}</span>{" "}
            </div>
            <div className="mb-1 text-tx02">
              Up: <span className="text-[#E55F61]">{props.down}</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PlayRate() {
  return (
    <section className="flex justify-between xs:my-3 sm:my-4">
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

export function Rank({ index, ...props }) {
  return (
    <div
      className={clsx(
        "my-1 flex w-full items-center sm:my-3",
        index && "text-tx05",
      )}
    >
      <div className="mr-2 w-2 text-xs xs:text-base sm:w-3 sm:text-xl ">
        {props.pos}
      </div>
      <div
        className={clsx(
          " flex w-full items-center justify-between rounded-xl border border-tx02 p-[2px] pr-4",
          index && "border-tx06",
        )}
      >
        <Image
          className="mr-2 h-7 w-7  rounded-full object-cover xs:ml-2 xs:h-10 xs:w-10 sm:ml-4 sm:mr-10 md:h-16 md:w-16"
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

export function Ranking(props) {
  return (
    <section className="my-4 w-full text-[10px] font-light capitalize text-tx01 xs:text-xs sm:text-base">
      <div className="m-1 flex items-center justify-between pr-4 uppercase text-tx02">
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

const icons = {
  ONLINE: {
    name: "octicon:dot-fill-16",
    color: "text-[#24E5A5]",
  },
  OFFLINE: {
    name: "octicon:dot-fill-16",
    color: "text-tx03",
  },
  INGAME: {
    name: "arcticons:gameturbo",
    color: "text-[#EB5A3A]",
  },
};

function Friend(props) {
  return (
    <div className="m-3 flex items-center justify-between">
      <div className="flex items-center">
        <Image
          className="mr-4 h-8 w-8 rounded-full object-cover"
          src={props.pic}
          quality={100}
        />
        <div className="font-extralight tracking-widest">{props.name}</div>
      </div>
      <Icon
        className={clsx("h-5 w-5", icons[props.status].color)}
        icon={icons[props.status].name}
      />
    </div>
  );
}

export function Friends(props) {
  return (
    <div className="no-scrollbar h-[80%] w-full overflow-auto rounded-3xl border-y border-tx02">
      <div className="sticky top-0 flex items-center justify-between bg-bg01 px-2 py-5 pb-2 text-base capitalize tracking-[3px] text-tx02">
        <div>friends</div>
        <Icon className="h-6 w-6" icon="ph:caret-up-down-bold" />
      </div>
      <div>
        <Friend pic={Pic01} name="syakoubinato" status="ONLINE" />
        <Friend pic={Pic02} name="badrbansh" status="OFFLINE" />
        <Friend pic={Pic15} name="megashoot" status="INGAME" />
        <Friend pic={Pic11} name="aitlandlia" status="ONLINE" />
        <Friend pic={Pic06} name="moonshot" status="INGAME" />

        <Friend pic={Pic01} name="syakoubinato" status="ONLINE" />
        <Friend pic={Pic02} name="badrbansh" status="OFFLINE" />
        <Friend pic={Pic15} name="megashoot" status="INGAME" />
        <Friend pic={Pic11} name="aitlandlia" status="ONLINE" />
        <Friend pic={Pic06} name="moonshot" status="INGAME" />

        <Friend pic={Pic01} name="syakoubinato" status="ONLINE" />
        <Friend pic={Pic02} name="badrbansh" status="OFFLINE" />
        <Friend pic={Pic15} name="megashoot" status="INGAME" />
        <Friend pic={Pic11} name="aitlandlia" status="ONLINE" />
        <Friend pic={Pic06} name="moonshot" status="INGAME" />

        <Friend pic={Pic01} name="syakoubinato" status="ONLINE" />
        <Friend pic={Pic02} name="badrbansh" status="OFFLINE" />
        <Friend pic={Pic15} name="megashoot" status="INGAME" />
        <Friend pic={Pic11} name="aitlandlia" status="ONLINE" />
        <Friend pic={Pic06} name="moonshot" status="INGAME" />
      </div>
    </div>
  );
}
