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

function Notif() {
  const [notif, setNotif] = useState(false);
  return (
    <div className="">
      {/* Mobile button's */}
      <div className="flex items-center justify-between mb-[12px] sm:mb-6 lg:hidden">
        <div className="text-sm font-extralight tracking-[4px] capitalize left-0 xs:text-base sm:text-lg">
          paddle smash
        </div>
        <div className="flex space-x-4 xs:space-x-5 sm:space-x-7">
          <Icon
            className="text-tx01 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8"
            icon="guidance:search"
          />
          <button
            onClick={() => {
              setNotif(!notif);
            }}
          >
            <Icon
              className={clsx(
                "text-tx01 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8",
                notif && "text-tx02",
              )}
              icon={
                notif
                  ? "icon-park-outline:close"
                  : "solar:notification-unread-broken"
              }
            />
          </button>
        </div>
      </div>

      {/* Web button's */}
      <div className="hidden lg:flex items-center justify-between mb-10">
        <div className="flex items-center">
          <Icon className="text-tx01 w-7 h-7" icon="guidance:search" />
          <input
            className="bg-bg01 h-8 w-40 font-extralight text-xl ml-3"
            defaultValue="Search"
          />
        </div>
        <button
          onClick={() => {
            setNotif(!notif);
          }}
        >
          <Icon
            className={clsx(
              "text-tx01 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8",
              notif && "text-tx02",
            )}
            icon={
              notif
                ? "icon-park-outline:close"
                : "solar:notification-unread-broken"
            }
          />
        </button>
      </div>

      {/* NOTIF */}
      {notif && (
        <div className="flex flex-col items-center sm:items-end lg:items-center lg:-translate-y-5 lg:sticky z-10">
          <div className="bg-bg01 w-full h-3/5 sm:w-80 xs:h-[33rem] lg:w-72 border-y sm:border border-tx02 absolute rounded-b-[2rem] sm:rounded-3xl overflow-auto no-scrollbar shadow-2xl shadow-tx03">
            <div className="py-3  px-5 sticky top-0 bg-bg01 text-tx01 text-base tracking-widest capitalize">
              Recent Notification
            </div>
            <div className="px-2">
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
      )}
    </div>
  );
}

function MbHeader() {
  return (
    <header className="flex flex-col xl:hidden lg:pt-10">
      <div className="lg:hidden">
        <Notif />
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
              key={v}
              className="text-tx02 w-7 h-7 first:text-tx01 xs:w-8 xs:h-8 sm:w-10 sm:h-10"
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
    <header className="hidden  h-screen xl:flex flex-col items-center w-36 2xl:w-56 border-r border-tx02">
      <div className="my-20 xl:my-24 2xl:my-28">
        <div className=" h-72">
          <Image
            className="w-28 xl:w-32 2xl:w-36"
            src={logoPic}
            alt="Logo of the game"
          />
        </div>

        <div className="flex flex-col items-center justify-between h-96 pb-3  xs:pb-4">
          {[
            { text: "home", icon: "solar:home-2-broken" },
            { text: "game", icon: "solar:gamepad-broken" },
            { text: "chat", icon: "fluent:chat-28-regular" },
            { text: "leaderboard", icon: "solar:ranking-broken" },
          ].map((v) => {
            return (
              <button key={v.text} className="group flex flex-col items-center">
                <Icon
                  className="text-tx01 w-6 lg:w-7 xl:w-8 2xl:w-10 lg:transition lg:duration-500 lg:group-hover:text-tx02 group-hover:-translate-y-1"
                  icon={v.icon}
                  width="36"
                />
                <div className=" text-tx01 font-light tracking-[3px] uppercase text-sm  lg:opacity-0 lg:group-hover:opacity-100 lg:transition lg:duration-700">
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

function ProfileInfo() {
  return (
    <section className="flex items-center justify-between my-2 xs:my-5 ">
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
        className="text-tx02 w-6 h-6 mx-1 sm:mx-10 xs:w-7 xs:h-7 sm:w-9 sm:h-9 lg:hidden"
        icon="icon-park-outline:down-c"
      />
    </section>
  );
}

function Rate(props) {
  return (
    <>
      <div className="flex flex-col items-center border border-tx05 text-[9px] xs:text-[11px] sm:text-sm rounded-lg w-full xs:w-52 sm:w-72 md:w-80 lg:w-72 xl:w-80 lg:px-5 xl:px-8 sm:rounded-3xl py-1 px-1 xs:py-2 xs:px-3 sm:px-5 md:px-8 mr-[2px] md:ml-5 xl:ml-14 2xl:ml-36">
        <div>
          <div className="text-tx01 uppercase tracking-wider">
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
      </div>

      <div className="flex flex-col items-center border border-tx05 text-[9px] xs:text-[11px] sm:text-sm rounded-lg w-full xs:w-52 sm:w-72 md:w-80 lg:w-72 xl:w-80 lg:px-5 xl:px-8 sm:rounded-3xl py-1 px-1 xs:py-2 xs:px-3 sm:px-5 md:px-8 ml-[2px] md:mr-5 xl:mr-14 2xl:mr-36">
        <div>
          <div className="text-tx01 uppercase tracking-wider">
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
      </div>
    </>
  );
}

function PlayRate() {
  return (
    <section className="flex justify-between xs:my-3 sm:my-10">
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
        "w-full flex items-center my-1 sm:my-3",
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
    <section className="text-tx01 text-[10px] xs:text-xs sm:text-base font-light capitalize my-4 xs:mt-8 w-full">
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

function Achiv({ locked, className, ...props }) {
  return (
    <div
      className=" px-1 mt-12 pb-1 grid grid-rows-4 justify-items-center w-28 h-36 border-[0.5px] border-t-0 rounded-2xl
      xs:w-32 xs:h-40 sm:w-36 sm:h-48"
    >
      <div
        className={clsx(
          "rounded-full",
          !locked && "drop-shadow-[0px_6px_10px_#C0C0C0]",
        )}
      >
        <Image
          className={clsx(
            "w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full",
            !locked && " scale-[1.8] -translate-y-5",
            locked &&
              "-translate-y-3 scale-[1.5]  shadow-inner p-2 shadow-tx05 opacity-70",
          )}
          src={props.pic}
          quality={100}
        />
      </div>

      <div className="capitalize text-sm sm:text-base text-tx05 mt-5 xs:mt-7 sm:mt-8">
        {props.title}
      </div>

      <div className="text-[9px] sm:text-[10px] text-tx05/70 text-center font-normal mt-2 xs:mt-4">
        {props.description}
      </div>
      <div
        className={clsx(
          "text-xs sm:text-sm text-tx02 flex items-center mt-4 xs:mt-5",
          !locked && "opacity-0",
        )}
      >
        <Icon
          className="text-tx06 mr-1 w-4 h-4 sm:w-5 sm:h-5"
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
      className="text-tx05 mb-2 grid grid-flow-col gap-2 sm:gap-6 space-x-3 overflow-x-auto overflow-y-hidden no-scrollbar lg:pt-7 2xl:pt-9"
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
    <div className="flex items-center justify-between m-3">
      <div className="flex items-center">
        <Image
          className="object-cover w-8 h-8 rounded-full mr-4"
          src={props.pic}
          quality={100}
        />
        <div className="tracking-widest font-extralight">{props.name}</div>
      </div>
      <Icon
        className={clsx("w-5 h-5", icons[props.status].color)}
        icon={icons[props.status].name}
      />
    </div>
  );
}

function RightBar(props) {
  return (
    <section className="hidden h-screen lg:flex flex-col items-center px-8 w-80  border-l border-tx03">
      {/* top elements */}
      <div className="w-full lg:mt-12 xl:mt-16 2xl:mt-22 mb-10">
        {/* notif and Search */}
        <Notif />

        {/* setting and log-out */}
        <div className="flex flex-col items-start space-y-3 mb-5 ml-2 text-tx02">
          <button className="flex space-x-3" onClick={props.onSettingClick}>
            <Icon className="w-7 h-7" icon="solar:settings-broken" />
            <div className="font-normal text-xl tracking-[5px] capitalize">
              setting
            </div>
          </button>

          <Link className="flex space-x-3" href={"/.."}>
            <Icon className="w-7 h-7" icon="fluent-mdl2:navigate-back" />
            <div className="font-normal text-xl tracking-[5px] capitalize">
              log out
            </div>
          </Link>
        </div>
      </div>

      {/* mbttom elements */}
      <div className="h-3/5 w-64 border-y border-tx03 overflow-auto no-scrollbar">
        <div className="py-5 px-2 flex items-center justify-between sticky top-0 bg-bg01 text-tx02 text-base tracking-[3px] capitalize pb-2">
          <div>friends</div>
          <Icon className="w-6 h-6" icon="ph:caret-up-down-bold" />
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
        "text-tx05 py-1 w-28 xs:w-36 lg:w-48 border hover:bg-tx01 hover:text-tx03 ease-linear transition-colors duration-[400ms] border-tx01 rounded-lg",
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
      <div className="text-xs xs:text-sm tracking-normal ">{props.label}</div>
      <input
        className={clsx(
          "bg-tx02 h-6 w-24 xs:h-8 sm:h-10 sm:rounded-md xs:w-36 sm:w-44 lg:w-60 rounded-sm",
          long && "w-40 xs:w-56 sm:w-80 lg:w-80",
        )}
      ></input>
    </div>
  );
}

function SettingSection({ onClick, ...props }) {
  const [active, setActive] = useState("profile");

  return (
    <section className="bg-bg01/90 fixed inset-0 flex items-center justify-center duration-700">
      <div className="flex flex-col bg-bg01 border-[1.5px] border-tx05 rounded-2xl w-11/12 h-4/5 xs:h-3/4 lg:h-2/3 sm:w-[30rem]  lg:w-[40rem] px-2 xs:px-4 sm:px-8">
        {/* fix */}
        <dev className="pb-4 xs:pb-6 sm:pb-10 text-sm xs:text-base sm:text-lg border-b border-tx03">
          {/* top */}
          <div className="flex items-center justify-between w-full my-4 xs:my-7 sm:my-10 text-tx05 font-normal capitalize tracking-widest sm:tracking-[3px]">
            <div>account settings</div>
            <div className="flex justify-center space-x-2 xs:space-x-4 lg:space-x-6">
              <button className="w-12 xs:w-16 sm:w-20 sm:p-0 border border-tx01 rounded-lg">
                <div className="font-light">Save</div>
              </button>

              <button onClick={onClick}>
                <Icon
                  className="text-tx05 w-6 h-6 xs:w-7 xs:h-7"
                  icon="icon-park-outline:close"
                />
              </button>
            </div>
          </div>

          {/* bottom */}
          <div className="text-tx05 font-light flex items-center justify-between sm:px-4 my-2 lg:mx-8">
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
        <div className="flex-1 pt-10 sm:mx-5 lg:mx-11 overflow-auto no-scrollbar">
          {/* profile */}
          {active === "profile" && (
            <div className="flex flex-col justify-between text-sm xs:text-base sm:text-lg tracking-widest">
              {/* avatar */}
              <div className="mb-8 xs:mb-12 lg:mb-16">
                <div className="mb-3 lg:mb-5">Your Avatar</div>
                <div className="flex items-end">
                  <Image
                    className="object-cover w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 rounded-full mr-4 xs:mr-6 sm:mr-10 xs:ml-2 sm:ml-4"
                    src={Pic15}
                    quality={100}
                  />
                  <div>
                    <SettingButton label="Upload New" />
                    <div className="text-[0.51rem] xs:text-[0.67rem] lg:text-xs lg:mt-2 tracking-normal font-light">
                      Avatar help your friends recognize you
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>

              {/* information */}
              <div>
                <div className="mb-3 xs:mb-6">Your Informatin</div>
                <div className="flex justify-between mb-4 lg:mb-10 xs:mb-7">
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
                <div className="mb-3 lg:mb-5 text-xs xs:text-sm sm:text-lg lg:text-xl xs:tracking-widest capitalize">
                  set up two-factor authentication
                </div>

                <div className="text-tx02 text-justify text-[0.5rem] xs:text-[0.65rem] sm:text-xs lg:text-sm capitalize">
                  to be able to authorize transactions you need to scane this QR
                  code with your authentication app and enter the verification
                  code below
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="rounded-xl w-32 h-32 xs:w-40 xs:h-40 sm:w-44 sm:h-44 lg:w-52 lg:h-52 my-5 sm:my-6 lg:my-9"
                    src={qrCode}
                    quality={100}
                  />

                  <div className="mb-3 lg:mb-5 text-xs xs:text-sm sm:text-lg lg:text-xl xs:tracking-widest capitalize">
                    verification code
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex space-x-1 mb-5 xs:mb-12">
                      <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-10 xs:h-14 xs:rounded-2xl" />
                      <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-10 xs:h-14 xs:rounded-2xl" />
                      <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-10 xs:h-14 xs:rounded-2xl" />
                      <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-10 xs:h-14 xs:rounded-2xl" />
                      <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-10 xs:h-14 xs:rounded-2xl" />
                      <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-10 xs:h-14 xs:rounded-2xl" />
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

export default function Home() {
  const [setting, setSetting] = useState(false);

  return (
    <main className=" bg-bg01 text-tx01">
      <section className="min-h-screen lg:h-screen bg-bg01 flex justify-between px-3 pt-3 pb-1 xl:p-0 sm:px-7 sm:py-5">
        <div className="flex flex-col">
          <WebHeader />
        </div>

        <div className=" w-full lg:w-2/3 max-w-[1300px] mx-auto">
          <MbHeader />
          <div className="flex flex-col justify-between lg:my-12 xl:my-16 2xl:my-22 lg:px-4">
            <ProfileInfo />
            <PlayRate />
            <Ranking />
            <Achievement />
          </div>
        </div>

        <RightBar
          onSettingClick={() => {
            setSetting(true);
          }}
        />
        {setting && (
          <SettingSection
            onClick={() => {
              setSetting(false);
            }}
          />
        )}
      </section>
    </main>
  );
}
