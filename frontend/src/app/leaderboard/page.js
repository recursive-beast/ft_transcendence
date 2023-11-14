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

function Rank({ index, first, ...props }) {
  return (
    <div
      className={clsx(
        "my-1 flex w-full items-center sm:my-3",
        index && "text-tx05", first && "sticky top-0 bg-bg01 my-0 sm:my-0"
      )}
    >
      <div
        className={clsx(
          "mr-2 xs:mr-3 sm:mr-4 w-4 text-xs xs:text-base sm:w-3 sm:text-xl text-center",
          first && "invisible",
        )}
      >
        {props.pos}
      </div>
      <div
        className={clsx(
          "flex w-full items-center justify-between rounded-xl border border-tx02 p-[2px] pr-4",
          index && "border-tx06",
          first && "border-0 text-tx02",
        )}
      >
        <Image
          className={clsx(
            "mr-2 h-7 w-7 rounded-full object-cover xs:ml-2 xs:h-10 xs:w-10 sm:ml-4 sm:mr-10 md:h-16 md:w-16",
            first && "invisible",
          )}
          src={props.pic}
          quality={100}
        />
        <div className="w-20 sm:w-28 text-left">
          {props.name}
        </div>
        <div className="w-9 xs:w-11 sm:w-16 text-center">{props.rate}</div>
        <div className="w-9 xs:w-11 sm:w-16 text-center">{props.games}</div>
        <div className="w-9 xs:w-11 sm:w-16 text-center">{props.level}</div>
      </div>
    </div>
  );
}

function Ranking(props) {
  return (
    <section className="no-scrollbar my-4 w-full overflow-auto text-[10px] font-light capitalize text-tx01 xs:text-xs sm:text-base">
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
    <div className="flex items-end justify-center gap-2 xs:gap-3 mb-5 xs:mb-8 sm:mt-5 sm:gap-12 lg:gap-16 2xl:gap-20 2xl:mt-8 2xl:mb-16">
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

        <div className="mx-2 flex flex-1 flex-col xs:mx-3 sm:mx-5 lg:mx-8">
          {/* content */}
          <div className=" hidden bg-bg01 lg:block">
            <MbHeader />
          </div>
          <FirstPlaces />
          <Ranking />
        </div>

        <div>
          <RightBar
            onSettingClick={() => {
              setSetting(true);
            }}
          />
        </div>
      </div>
    </main>
  );
}
