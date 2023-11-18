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
    <div className="z-10 flex justify-center sm:justify-end lg:sticky ">
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

export function Title() {
  return (
    <div className="hidden h-12 w-full items-center justify-center border-b border-tx01 bg-bg02 text-xl font-light uppercase tracking-[10px] xs:tracking-[14px] lg:flex ">
      paddle smash
    </div>
  );
}

export function TopBar(props) {
  const [menu, setMenu] = useState(false);
  const [notif, setNotif] = useState(false);
  return (
    <div className="justify-center lg:hidden">
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
  const [selected, setSelected] = useState("home");
  return (
    <div className="flex items-center justify-between xl:h-[55vh] xl:flex-col">
      {[
        { text: "home", icon: "solar:home-2-broken" },
        { text: "game", icon: "solar:gamepad-broken" },
        { text: "chat", icon: "fluent:chat-28-regular" },
        { text: "leaderboard", icon: "solar:ranking-broken" },
      ].map((v) => {
        return (
          <button
            key={v.text}
            className="group flex w-11 flex-col items-center xs:w-14 sm:w-20"
            onClick={() => setSelected(v.text)}
          >
            {/* button icon */}
            <Icon
              className={clsx(
                "h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 lg:transition lg:duration-500 lg:group-hover:text-tx01  2xl:h-11 2xl:w-11",
                v.text === selected
                  ? "text-tx01"
                  : "text-tx02 xl:group-hover:-translate-y-1",
              )}
              icon={v.icon}
            />
            {/* button line >> visible in mobile */}
            <div
              className={clsx(
                "mt-2 h-[1.5px] w-full rounded-full bg-tx01 xs:mt-3",
                v.text === selected ? "visible" : "invisible xl:hidden",
              )}
            ></div>
            {/* button title >> visible in web vertion */}
            <div
              className={clsx(
                "hidden text-sm font-light uppercase tracking-[3px] text-tx01 lg:opacity-0  lg:transition lg:duration-700 lg:group-hover:opacity-100 xl:block",
                v.text === selected ? "invisible" : "visible",
              )}
            >
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
    <header className="border-b border-tx02 px-2 pt-3 xl:flex xl:h-full xl:w-36 xl:items-center xl:justify-center xl:border-b-0 xl:border-r xl:p-0 2xl:w-56">
      {/* top bar */}
      <TopBar home={props.home} menu={props.menu} />
      {/* nav */}
      <NavBar />
    </header>
  );
}

export function RightBar(props) {
  const [notif, setNotif] = useState(false);
  return (
    <section className="mb-4 hidden h-screen w-[22rem] justify-between border-l border-tx03 lg:flex px-5 py-8">
      {props.menu}
    </section>
  );
}

export function MenuBar(props) {
  return (
    <div className="z-10 flex justify-center sm:justify-end lg:sticky lg:items-center">
      <div
        className="absolute h-[80vh] w-full rounded-b-[2rem] border-y border-tx05 border-t-tx02 
    bg-bg01 shadow-2xl shadow-tx05/40 sm:right-0 sm:w-96 sm:rounded-tl-[2rem] sm:border-l sm:border-t-tx05 px-2 xs:px-5 sm:py-8 py-5"
      >
        {props.menu}
      </div>
    </div>
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
    <div className="no-scrollbar w-full overflow-auto rounded-3xl border-y border-tx02 lg:mb-14">
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
