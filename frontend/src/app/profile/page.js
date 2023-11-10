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

function Notificatin() {
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

function Menu(props) {
  return (
    <div className="flex w-full flex-col items-center sm:absolute sm:right-0 sm:w-96 lg:hidden">
      <div className="no-scrollbar absolute flex h-[80vh] w-full flex-col justify-between overflow-auto rounded-b-[2rem] border-y border-tx05 border-t-tx02 bg-bg01 px-5 py-3 shadow-2xl shadow-tx05/40 sm:rounded-tl-[2rem] sm:border-l sm:border-t-tx05 sm:py-8">
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
            onClick={props.onSettingClick}
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
      </div>
    </div>
  );
}

function MbHeader(props) {
  const [menu, setMenu] = useState(false);
  const [notif, setNotif] = useState(false);
  return (
    <header className="flex flex-col border-b border-tx03 pt-3 lg:pt-0 xl:hidden">
      {/* top bar */}
      <div className="xl:hidden">
        {/* visible */}
        <div className="mb-4 flex items-center justify-between sm:mb-6">
          <div className="left-0 text-base font-light capitalize tracking-[5px] xs:text-base sm:text-lg lg:hidden">
            paddle smash
          </div>

          {/* button's */}
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
        </div>

        {/* hidden */}
        {menu && <Menu onSettingClick={props.onSettingClick} />}
        {notif && <Notificatin />}
      </div>

      {/* nav bar */}
      <div className="flex items-center justify-between pb-3 xs:pb-4">
        {[
          "solar:home-2-broken",
          "solar:gamepad-broken",
          "solar:ranking-broken",
          "fluent:chat-28-regular",
        ].map((v) => {
          return (
            <Icon
              key={v}
              className="h-7 w-7 text-tx02 first:text-tx01 xs:h-8 xs:w-8 sm:h-10 sm:w-10"
              icon={v}
            />
          );
        })}
      </div>
    </header>
  );
}

function WebHeader() {
  return (
    <header className="hidden h-full w-36 flex-col items-center border-r border-tx02 xl:flex 2xl:w-56">
      {/* logo */}
      <div className="flex h-[30vh] items-center justify-center 2xl:h-[25vh]">
        <Image className="w-32 2xl:w-36" src={logoPic} alt="Logo of the game" />
      </div>

      {/* nav */}
      <div className="flex flex-1 items-center justify-between">
        <div className="mb-20 flex h-[40vh] flex-col items-center justify-between">
          {[
            { text: "home", icon: "solar:home-2-broken" },
            { text: "game", icon: "solar:gamepad-broken" },
            { text: "chat", icon: "fluent:chat-28-regular" },
            { text: "leaderboard", icon: "solar:ranking-broken" },
          ].map((v) => {
            return (
              <button key={v.text} className="group flex flex-col items-center">
                <Icon
                  className="w-6 text-tx01 group-hover:-translate-y-1 lg:w-7 lg:transition lg:duration-500 lg:group-hover:text-tx02 xl:w-8 2xl:w-10"
                  icon={v.icon}
                  width="36"
                />
                <div className=" text-sm font-light uppercase tracking-[3px] text-tx01  lg:opacity-0 lg:transition lg:duration-700 lg:group-hover:opacity-100">
                  {v.text}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function BarButton(props) {
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

function ProfileInfo(props) {
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

function Rate(props) {
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

function PlayRate() {
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

function Rank({ index, ...props }) {
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

function Ranking(props) {
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

function Achiv({ locked, className, ...props }) {
  return (
    <div
      className=" mt-12 grid h-36 w-28 grid-rows-4 justify-items-center rounded-2xl border-[0.5px] border-t-0 px-1 pb-1
      xs:h-40 xs:w-32 sm:h-48 sm:w-36"
    >
      <div
        className={clsx(
          "rounded-full",
          !locked && "drop-shadow-[0px_6px_10px_#C0C0C0]",
        )}
      >
        <Image
          className={clsx(
            "h-11 w-11 rounded-full xs:h-12 xs:w-12 sm:h-14 sm:w-14",
            !locked && " -translate-y-5 scale-[1.8]",
            locked &&
              "-translate-y-3 scale-[1.5]  p-2 opacity-70 shadow-inner shadow-tx05",
          )}
          src={props.pic}
          quality={100}
        />
      </div>

      <div className="mt-5 text-sm capitalize text-tx05 xs:mt-7 sm:mt-8 sm:text-base">
        {props.title}
      </div>

      <div className="mt-2 text-center text-[9px] font-normal text-tx05/70 xs:mt-4 sm:text-[10px]">
        {props.description}
      </div>
      <div
        className={clsx(
          "mt-4 flex items-center text-xs text-tx02 xs:mt-5 sm:text-sm",
          !locked && "opacity-0",
        )}
      >
        <Icon
          className="mr-1 h-4 w-4 text-tx06 sm:h-5 sm:w-5"
          icon="solar:lock-broken"
        />
        <div>Locked</div>
      </div>
    </div>
  );
}

function Achievement() {
  const ref = useHorizontalScroll();

  return (
    <section
      ref={ref}
      className="no-scrollbar mb-4 grid grid-flow-col gap-2 space-x-3 overflow-x-auto overflow-y-hidden text-tx05 sm:gap-6 lg:pt-5"
    >
      <Achiv
        pic={AvMaster}
        title="Pong master"
        description="Win 100 games of Pong"
      />
      <Achiv
        pic={AvShar}
        title="Sharpshooter"
        description="Score 50 points in a single game of Pong"
        locked
      />
      <Achiv
        pic={AvShoot}
        title="Unstoppable"
        description="Win 10 games of Pong in a row"
      />
      <Achiv
        pic={AvCmBack}
        title="Comeback Kid"
        description="Win a game of Pong after being down by 5 points or more"
        locked
      />
      <Achiv
        pic={AvDemon}
        title="Speed Demon"
        description="Win a game of Pong with a speed setting of 10"
      />
      <Achiv
        pic={AvProdigy}
        title="Pong Prodigy"
        description="Win a game of Pong with a score of 10-0"
        locked
      />
      <Achiv
        pic={AvIron}
        title="Iron Defense"
        description="Win a game of Pong without letting the ball get past your paddle"
        locked
      />
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

function RightBar(props) {
  const [notif, setNotif] = useState(false);
  return (
    <section className="hidden h-screen w-[22rem] flex-col justify-between border-l border-tx03 px-4 lg:flex">
      {/* search and notif */}
      <div>
        <div className="mr-3 mt-5 flex items-center justify-between 2xl:mt-10">
          {/* search */}
          <div className="mb-3 flex items-center">
            <Icon className="htext-tx01 h-7 w-7" icon="guidance:search" />
            <input
              className="ml-3 h-8 w-full border-b border-tx03 bg-bg01 text-base font-extralight xs:text-xl"
              defaultValue="Search"
            />
          </div>

          {/* notif */}
          <button
            onClick={() => {
              setNotif(!notif);
            }}
          >
            <Icon
              className={clsx("htext-tx01 h-7 w-7", notif && "text-tx02")}
              icon={
                notif
                  ? "icon-park-outline:close"
                  : "solar:notification-unread-broken"
              }
            />
          </button>
        </div>
        {notif && <Notificatin />}
      </div>

      {/* setting and log-out */}
      <div className="mb-5 flex items-center justify-between text-tx02">
        <button
          className="flex items-center space-x-2 rounded-xl border-b p-1"
          onClick={props.onSettingClick}
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
      <div className="no-scrollbar mb-20 h-[70%] w-full overflow-auto rounded-3xl border-y border-tx02 2xl:mb-36">
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
    </section>
  );
}

function SettingButton({ label, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        "w-28 rounded-lg border border-tx01 py-1 text-tx05 transition-colors duration-[400ms] ease-linear hover:bg-tx01 hover:text-tx03 xs:w-36 lg:w-48",
        className,
      )}
    >
      <div className=" tracking-widest">{label}</div>
    </button>
  );
}

function SettingInput({ long, ...props }) {
  return (
    <div className="space-y-1 xs:space-y-2">
      <div className="text-xs tracking-normal xs:text-sm ">{props.label}</div>
      <input
        className={clsx(
          "h-6 w-24 rounded-sm bg-tx02 xs:h-8 xs:w-36 sm:h-10 sm:w-44 sm:rounded-md lg:w-60",
          long && "w-40 xs:w-56 sm:w-80 lg:w-80",
        )}
      ></input>
    </div>
  );
}

function SettingSection({ onClick, ...props }) {
  const [active, setActive] = useState("profile");

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-bg01/90 z-20">
      <div className="flex h-4/5 w-11/12 flex-col rounded-2xl border-[1.5px] border-tx05 bg-bg01 px-2 xs:h-3/4 xs:px-4  sm:w-[30rem] sm:px-8 lg:h-2/3 lg:w-[40rem]">
        {/* fix */}
        <dev className="border-b border-tx03 pb-4 text-sm xs:pb-6 xs:text-base sm:pb-10 sm:text-lg">
          {/* top */}
          <div className="my-4 flex w-full items-center justify-between font-normal capitalize tracking-widest text-tx05 xs:my-7 sm:my-10 sm:tracking-[3px]">
            <div>account settings</div>
            <div className="flex justify-center space-x-2 xs:space-x-4 lg:space-x-6">
              <button className="w-12 rounded-lg border border-tx01 xs:w-16 sm:w-20 sm:p-0">
                <div className="font-light">Save</div>
              </button>

              <button onClick={onClick}>
                <Icon
                  className="h-6 w-6 text-tx05 xs:h-7 xs:w-7"
                  icon="icon-park-outline:close"
                />
              </button>
            </div>
          </div>

          {/* bottom */}
          <div className="my-2 flex items-center justify-between font-light text-tx05 sm:px-4 lg:mx-8">
            <SettingButton
              label="Profile"
              className={active === "profile" && "bg-tx02"}
              onClick={() => setActive("profile")}
            />
            <SettingButton
              label="Two-Factor"
              className={active === "two-factor" && "bg-tx02"}
              onClick={() => setActive("two-factor")}
            />
          </div>
        </dev>

        {/* setting */}
        <div className="no-scrollbar flex-1 overflow-auto pt-10 sm:mx-5 lg:mx-11">
          {/* profile */}
          {active === "profile" && (
            <div className="flex flex-col justify-between text-sm tracking-widest xs:text-base sm:text-lg">
              {/* avatar */}
              <div className="mb-8 xs:mb-12 lg:mb-16">
                <div className="mb-3 lg:mb-5">Your Avatar</div>
                <div className="flex items-end">
                  <Image
                    className="mr-4 h-16 w-16 rounded-full object-cover xs:ml-2 xs:mr-6 xs:h-20 xs:w-20 sm:ml-4 sm:mr-10 sm:h-28 sm:w-28"
                    src={Pic15}
                    quality={100}
                  />
                  <div>
                    <SettingButton label="Upload New" />
                    <div className="text-[0.51rem] font-light tracking-normal xs:text-[0.67rem] lg:mt-2 lg:text-xs">
                      Avatar help your friends recognize you
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>

              {/* information */}
              <div>
                <div className="mb-3 xs:mb-6">Your Informatin</div>
                <div className="mb-4 flex justify-between xs:mb-7 lg:mb-10">
                  <SettingInput label="First Name" />
                  <SettingInput label="Last Name" />
                </div>
                <SettingInput label="User Name" long />
              </div>
            </div>
          )}

          {/* two-factor */}
          {active === "two-factor" && (
            <div className="flex flex-col justify-between">
              {/* text */}
              <div className="mb-4 xs:mb-12 lg:mb-16">
                <div className="mb-3 text-xs capitalize xs:text-sm xs:tracking-widest sm:text-lg lg:mb-5 lg:text-xl">
                  set up two-factor authentication
                </div>

                <div className="text-justify text-[0.5rem] capitalize text-tx02 xs:text-[0.65rem] sm:text-xs lg:text-sm">
                  to be able to authorize transactions you need to scane this QR
                  code with your authentication app and enter the verification
                  code below
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="my-5 h-32 w-32 rounded-xl xs:h-40 xs:w-40 sm:my-6 sm:h-44 sm:w-44 lg:my-9 lg:h-52 lg:w-52"
                    src={qrCode}
                    quality={100}
                  />

                  <div className="mb-3 text-xs capitalize xs:text-sm xs:tracking-widest sm:text-lg lg:mb-5 lg:text-xl">
                    verification code
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="mb-5 flex space-x-1 xs:mb-12">
                      <input className="h-10 w-7 rounded-lg bg-tx01 xs:h-14 xs:w-10 xs:rounded-2xl" />
                      <input className="h-10 w-7 rounded-lg bg-tx01 xs:h-14 xs:w-10 xs:rounded-2xl" />
                      <input className="h-10 w-7 rounded-lg bg-tx01 xs:h-14 xs:w-10 xs:rounded-2xl" />
                      <input className="h-10 w-7 rounded-lg bg-tx01 xs:h-14 xs:w-10 xs:rounded-2xl" />
                      <input className="h-10 w-7 rounded-lg bg-tx01 xs:h-14 xs:w-10 xs:rounded-2xl" />
                      <input className="h-10 w-7 rounded-lg bg-tx01 xs:h-14 xs:w-10 xs:rounded-2xl" />
                    </div>

                    <div>
                      <Link className="mb-3" href={"../profile"}>
                        <div className="text-xl font-extralight tracking-[6px] xs:text-3xl">
                          virify
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FriendsSection({ onClick }) {
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-bg01/50 lg:hidden">
      <div className="no-scrollbar absolute bottom-0 h-[80vh] w-64 overflow-auto rounded-t-3xl border border-b-0 border-tx05 bg-bg01 shadow-2xl shadow-tx05/70 xs:h-3/4 xs:w-80">
        <div className="sticky top-0 flex items-center justify-between bg-bg01 px-2 py-5 pb-2 text-base capitalize tracking-[3px] text-tx01 xs:px-5">
          <div>friends</div>
          <button onClick={onClick}>
            <Icon className="h-6 w-6" icon="solar:close-circle-broken" />
          </button>
        </div>
        <div className=" xs:px-6">
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
    </section>
  );
}

export default function Home() {
  const [setting, setSetting] = useState(false);
  const [friends, setFriends] = useState(false);

  return (
    <main className="flex h-screen max-h-screen flex-col bg-bg01 text-tx01">
      {/* top of the window */}
      <div className="hidden h-12 w-full items-center justify-center border-b border-tx01 bg-bg02 text-xl font-light uppercase tracking-[10px] xs:tracking-[14px] lg:flex xl:h-16 xl:text-2xl">
        paddle smash
      </div>

      {/* header */}
      <div className="z-10 mx-2 xs:mx-3 sm:mx-5 lg:mx-8 lg:hidden">
        <MbHeader
          onSettingClick={() => {
            setSetting(true);
          }}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div>
          <WebHeader />
        </div>

        <div className="no-scrollbar mx-2 flex flex-1 flex-col justify-between overflow-auto xs:mx-3 sm:mx-5 lg:mx-8">
          {/* content */}
          <div className="sticky top-0 hidden bg-bg01 lg:block">
            <MbHeader />
          </div>
          <ProfileInfo />
          <PlayRate />
          <Ranking />
          <div>
            <Achievement />
          </div>
        </div>

        <div>
          <RightBar
            onSettingClick={() => {
              setSetting(true);
            }}
          />
        </div>
      </div>

      {setting && (
        <SettingSection
          onClick={() => {
            setSetting(false);
          }}
        />
      )}
    </main>
  );
}
