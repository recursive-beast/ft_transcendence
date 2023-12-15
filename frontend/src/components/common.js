"use client";

import clsx from "clsx";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { faker } from "@faker-js/faker";
import useSWR, { mutate } from "swr";
import ms from "ms";

import logoPic from "@/images/logos/logo.png";
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
import { usePathname } from "next/navigation";
import { AvatarImage } from "./AvatarImage";
import { useSocket } from "@/hooks/useSocket";
import { useStatus } from "@/hooks/useStatus";

const friends = Array(50)
  .fill()
  .map(() => ({
    avatar: faker.internet.avatar(),
    fullname: faker.person.fullName(),
    displayName: faker.internet.displayName(),
    status: faker.helpers.arrayElement(["ONLINE", "OFFLINE", "INGAME"]),
  }));

function Notif({ notification }) {
  const { type, data, createdAt } = notification;
  const createdAtDate = new Date(createdAt);

  return (
    <div className="m-3 flex items-center justify-between">
      <div className="flex items-center">
        {/* image */}
        <Image
          className="mr-4 h-12 w-12 rounded-full border border-tx05 object-cover"
          src={data.user.avatar}
          quality={100}
          width={300}
          height={300}
        />

        {/* title & descriiption */}
        <div className="text-tx01">
          <div className="w-36 truncate capitalize tracking-widest xs:w-52 sm:w-40 lg:w-36">
            {data.user.displayName}
          </div>
          <div className="w-36 truncate text-xs font-extralight xs:w-52 sm:w-40 lg:w-36">
            {type === "FRIEND_ADD" && "added you as Friend"}
            {type === "GAME_INVITE" && "Invited you to a game"}
          </div>
          {type === "GAME_INVITE" && (
            // <Link
            //   className="mt-1 flex w-fit items-center rounded-lg border px-2 py-1 text-xs tracking-widest hover:bg-tx01 hover:text-tx04"
            //   href={data.url}
            // >
            //   join
            // </Link>
            <Link
            className="h-fit rounded-lg border px-2 font-extralight text-tx02 
                      transition-colors duration-[400ms] ease-linear hover:bg-tx01 hover:text-tx03"
          >
            Add
          </Link>
          )}
        </div>
      </div>
      {/* time */}
      <div className="w-8 text-center text-xs text-tx02">
        {ms(Date.now() - createdAtDate)}
      </div>
    </div>
  );
}

export function Notificatin() {
  const { data: notifs } = useSWR("/notifications");
  const socket = useSocket();

  useEffect(() => {
    const update = () => mutate("/notification");

    socket.on("notification", update);
    return () => socket.off("notification", update);
  }, []);

  return (
    <div className="z-10 flex justify-center sm:justify-end lg:sticky ">
      <div className="no-scrollbar absolute h-[30rem] w-full overflow-auto rounded-b-[2rem] border-y border-tx05 border-t-tx02 bg-bg01 shadow-2xl shadow-tx05/40 xs:h-[33rem] sm:w-80 sm:rounded-3xl sm:border sm:border-t-tx05">
        <div className="sticky  top-0 bg-bg01 px-5 py-3 text-base capitalize tracking-widest text-tx05">
          Recent Notification
        </div>
        <div className="px-2">
          {notifs?.map((notification) => (
            <Notif key={notification.id} notification={notification} />
          ))}
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
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between xl:h-[55vh] xl:flex-col">
      {[
        { path: "/home", text: "home", icon: "solar:home-2-broken" },
        { path: "/game", text: "game", icon: "solar:gamepad-broken" },
        { path: "/chat", text: "chat", icon: "solar:chat-round-line-broken" },
        {
          path: "/leaderboard",
          text: "leaderboard",
          icon: "solar:ranking-broken",
        },
      ].map((v) => {
        return (
          <Link
            href={v.path}
            key={v.text}
            className="group flex w-11 flex-col items-center xs:w-14 sm:w-20"
          >
            {/* button icon */}
            <Icon
              className={clsx(
                "h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 lg:transition lg:duration-500 lg:group-hover:text-tx01  2xl:h-11 2xl:w-11",
                v.path === pathname
                  ? "text-tx01"
                  : "text-tx02 xl:group-hover:-translate-y-1",
              )}
              icon={v.icon}
            />
            {/* button line >> visible in mobile */}
            <div
              className={clsx(
                "mt-2 h-[1.5px] w-full rounded-full bg-tx01 xs:mt-3",
                v.path === pathname ? "visible" : "invisible xl:hidden",
              )}
            ></div>
            {/* button title >> visible in web vertion */}
            <div
              className={clsx(
                "hidden text-sm font-light uppercase tracking-[3px] text-tx01 lg:opacity-0  lg:transition lg:duration-700 lg:group-hover:opacity-100 xl:block",
                v.path === pathname ? "invisible" : "visible",
              )}
            >
              {v.text}
            </div>
          </Link>
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
    <section className="mb-4 hidden h-screen w-[22rem] items-center justify-between border-l border-tx03 px-5 py-8 lg:flex">
      {props.menu}
    </section>
  );
}

export function MenuBar(props) {
  return (
    <div className="z-10 flex justify-center sm:justify-end lg:sticky lg:items-center">
      <div
        className="absolute h-[80vh] w-full rounded-b-[2rem] border-y border-tx05 border-t-tx02
    bg-bg01 px-2 py-5 shadow-2xl shadow-tx05/40 xs:px-5 sm:right-0 sm:w-96 sm:rounded-tl-[2rem] sm:border-l sm:border-t-tx05 sm:py-8"
      >
        {props.menu}
      </div>
    </div>
  );
}

export function Rank({ index, first, ...props }) {
  return (
    <div
      className={clsx(
        "flex w-full items-center",
        index && "text-tx05",
        !first && "my-1 sm:my-3",
        first && "sticky top-0 border-b border-tx03 bg-bg01",
      )}
    >
      <div
        className={clsx(
          "mr-2 w-4 text-center text-xs xs:mr-3 xs:text-base sm:mr-4 sm:w-3 sm:text-xl",
          first && "invisible",
        )}
      >
        {props.pos}
      </div>
      <div
        className={clsx(
          "flex w-full items-center justify-between rounded-full border border-tx02 p-1 xs:pr-4",
          index && "border-tx06",
          first && "border-0 text-tx02",
        )}
      >
        <Image
          className={clsx(
            "mr-2 h-7 w-7 rounded-full border border-tx02 object-cover p-[2px]  xs:m-1 xs:h-10 xs:w-10 sm:mr-12 sm-h:h-12 sm-h:w-12 md-h:h-14 md-h:w-14",
            first && "invisible",
          )}
          src={props.pic}
          quality={100}
        />
        {/* <AvatarImage
          src={user.avatar}
          id={user.id}
          className="mx-2 h-10 w-10"
        /> */}

        <div className="w-20 text-left sm:w-28">{props.name}</div>
        <div className="w-9 text-center xs:w-11 sm:w-16">{props.rate}</div>
        <div className="w-9 text-center xs:w-11 sm:w-16">{props.games}</div>
        <div className="w-9 text-center xs:w-11 sm:w-16">{props.level}</div>
      </div>
    </div>
  );
}

export const status = {
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

export function Search(props) {
  const [text, setText] = useState("");
  const { data } = useSWR(encodeURI(`/search/users?search=${text}`));
  const [search, setSearch] = useState(false);
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    setSearch(!search);
    // Focus on the input field when the "Search" button or text is clicked
    if (!search) {
      inputRef.current.focus();
    }
  };
  // Set the search variable to false when the input loses focus
  const handleInputBlur = () => {
    // setSearch(false);
  };
  // Set the search variable to true when the input focus
  const handleInputFocus = () => {
    setSearch(true);
  };
  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={clsx(props.home && "mx-3")}>
      <div
        className={clsx(
          "flex h-7 grow items-center xs:h-8",
          props.home ? "bg-bg01" : " rounded-lg bg-tx03",
          search && props.home && "border-b ",
        )}
      >
        <button className="ml-3 w-10 xs:w-12" onClick={handleSearchClick}>
          <Icon
            className="h-4 w-4 text-tx02 xs:h-5 xs:w-5"
            icon={search ? "solar:arrow-left-broken" : "guidance:search"}
          />
        </button>

        <div className="grow pr-3 text-base font-light text-tx02 xs:text-xl">
          {!search && text === "" && (
            <div
              onClick={handleSearchClick}
              className="absolute tracking-widest"
            >
              Search
            </div>
          )}
          <input
            ref={inputRef}
            className={clsx(
              "w-full border-none outline-none focus:border-none",
              props.home ? "mx-3 bg-bg01" : " bg-tx03",
            )}
            type="search"
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            value={text}
          />
        </div>
      </div>
      {search && data && (
        <div className="relative">
          <div
            className={clsx(
              "no-scrollbar absolute z-10 max-h-52 w-full overflow-y-auto rounded-lg border",
              props.home ? "rounded-t-none border-t-0 bg-bg01" : "mt-2 bg-tx03",
              props.game && "max-h-44",
            )}
          >
            {data?.map((user, index) => {
              return (
                <Link
                  href={`/user/${user.id}`}
                  key={index}
                  className="flex cursor-pointer items-center border-b border-bg03 hover:bg-bg03"
                >
                  <AvatarImage
                    src={user.avatar}
                    id={user.id}
                    className="mx-2 h-10 w-10"
                  />

                  <div
                    key={user.id}
                    className="truncate py-3 pr-2 text-base font-light text-tx01"
                  >
                    <div>{user.displayName}</div>

                    <div className="text-sm text-tx02">{user.fullName}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Friend({ friend, game, onClick }) {
  const status = useStatus(friend.id);
  const Component = game ? "button" : Link;
  const componentProps = game
    ? { onClick: () => onClick(friend) }
    : { href: `/user/${friend.id}` };

  if (game && status !== "ONLINE") return null;

  return (
    <Component
      {...componentProps}
      className="flex w-full cursor-pointer border-b border-tx03 p-2 hover:bg-tx03"
    >
      {/* Flex container for avatar and name */}
      <div className="flex flex-1 items-center">
        {/* Avatar */}
        <AvatarImage
          src={friend.avatar}
          id={friend.id}
          className="mr-2 h-12 w-12 xs:mr-3 xs:h-14 xs:w-14"
        />

        {/* Friend Name */}
        <div className="truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
          {friend.displayName}
        </div>
      </div>
    </Component>
  );
}

export function Friends(props) {
  const { data } = useSWR("/users/friends");
  return (
    <div
      className={clsx(
        props.home &&
          "no-scrollbar max-h-[80%] w-full flex-grow overflow-auto rounded-lg border-y border-tx02 lg:mb-14",
      )}
    >
      {/* Title in home page */}
      {props.home && (
        <div className="sticky top-0 flex items-center justify-between bg-bg03 px-2 py-3 text-base capitalize tracking-[3px] text-tx02">
          <div>friends</div>
          <Icon className="h-6 w-6" icon="ph:caret-up-down-bold" />
        </div>
      )}

      {data?.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-6">
          <Image src={logoPic} alt="Logo of the game" className="h-52 w-52" />

          <div className="text-center text-3xl font-extralight">
            Add Friends
          </div>

          <div className="w-4/5 text-center text-sm text-tx02">
            You have no Friends yet, Find new friends by using the search bar at
            the home page
          </div>
        </div>
      ) : (
        <>
          {data?.map((friend) => (
            <Friend friend={friend} onClick={props.onClick} game={props.game} key={friend.id} />
          ))}
        </>
      )}
    </div>
  );
}

export function OTPInput({ onChange, fullValue, index, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const indexToFocus = Math.max(0, fullValue.length - 1);

    if (indexToFocus === index) ref.current.focus();
  }, [fullValue, index]);

  function onInputChange(event) {
    const updated = event.target.value;
    const left = fullValue.substring(0, index);
    const right = fullValue.substring(index + 1);
    let result = left + updated + right;

    result = result.replace(/\D+/g, "");

    if (result.length <= 6) onChange(result);
  }

  return (
    <input
      ref={ref}
      onChange={onInputChange}
      value={fullValue[index] || ""}
      className={className}
    />
  );
}
