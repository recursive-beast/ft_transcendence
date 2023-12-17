"use client";

import useSWR, { mutate } from "swr";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
import axios from "axios";

import {
  Title,
  Header,
  RightBar,
  Notificatin,
  Search,
} from "@/components/common";
import { PlayRate, Achievement, Ranking } from "@/app/home/page";
import { NewGame } from "@/app/chat/page";
import { Option } from "@/app/chat/page";

import Pic01 from "@/images/profils/01.jpg";
import Pic02 from "@/images/profils/02.jpg";
import Pic03 from "@/images/profils/03.png";
import { AvatarImage } from "@/components/AvatarImage";
import { useParams } from "next/navigation";
import clsx from "clsx";
import logoPic from "@/images/logos/logo.png";

function AddButton({ onClick, ...props }) {
  return (
    <button
      className="group flex items-center rounded-md border bg-bg01 px-1 py-[2px] text-tx02 transition-colors duration-[400ms]
      ease-linear hover:bg-tx01 hover:text-tx03 sm:px-2"
      onClick={onClick}
    >
      {/* button icon */}
      <Icon className="mr-1 h-5 w-5 sm:mr-2 sm:h-6 sm:w-6" icon={props.icon} />

      {/* button title >> visible in web vertion */}
      <div className="text-xs font-light uppercase tracking-widest text-tx01 group-hover:text-tx03 sm:text-base">
        {props.title}
      </div>
    </button>
  );
}

function ProfileInfo({ id }) {
  // import data
  const { data: user } = useSWR(`/users/${id}`);
  const { data: me } = useSWR("/users/me");
  const [options, setOptions] = useState(false);

  // Handle Add friend
  const addFriend = async () => {
    await axios.put(`/users/friends/${id}`);
    mutate(`/users/${id}`);
  };
  // Handle remove friend
  const removeFriend = async () => {
    await axios.delete(`/users/friends/${id}`);
    mutate(`/users/${id}`);
  };
  return (
    <section className="my-2 flex items-center xs:my-4">
      <div className="flex w-full items-center">
        {/* avatar */}
        <AvatarImage
          src={user?.avatar}
          id={user?.id}
          className="mr-2 h-14 w-14 xs:mr-3 xs:h-20 xs:w-20 sm:ml-4 sm:mr-4 sm:h-28 sm:w-28 xl:mr-6 2xl:mr-8"
        />

        {/* info */}
        <div className="flex w-full flex-col justify-between sm:flex-row">
          {/* name */}
          <div className="flex w-52 grow flex-col sm:mr-3">
            <div className="grow truncate text-base font-semibold capitalize tracking-widest text-tx05 xs:text-lg sm:text-xl sm:tracking-[3px]">
              {user?.displayName}
            </div>

            <div className="break-all text-xs font-light capitalize tracking-widest text-tx02 xs:text-sm sm:text-lg">
              {user?.fullName}
            </div>
          </div>

          {/* add friend */}
          <div className="flex items-center xl:mr-12">
            {user?.isFriend ? (
              <AddButton
                title="Remove Friend"
                icon="solar:user-cross-broken"
                onClick={removeFriend}
              />
            ) : (
              <AddButton
                title="Add Friend"
                icon="solar:user-plus-broken"
                onClick={addFriend}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function UserMenu() {
  const [notif, setNotif] = useState(false);
  const { data: notification } = useSWR("/notifications");

  const isUnseen = (notification) => !notification.seen;
  const shouldBounce = notification?.filter(isUnseen).length > 0;

  return (
    <div className="z-10 flex h-full flex-1 flex-col justify-between gap-2 sm:gap-3">
      {/* search and Notificatin */}
      <div>
        <div className="flex items-center justify-between px-1 py-3">
          {/* search */}
          <Search home={true} />

          {/* notif */}
          <button
            className={clsx(
              "hidden lg:block",
              shouldBounce && "animate-bounce",
            )}
            onClick={() => {
              setNotif(!notif);
            }}
          >
            <Icon
              className={clsx("mb-1 h-7 w-7 text-tx01", notif && "text-tx02")}
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

      {/* History */}
      <History />
    </div>
  );
}

function Match({ game }) {
  const { data: opponent } = useSWR(`/users/${game.opponentId}`);
  const { data: user } = useSWR(`/users/${game.userId}`);

  return (
    <div className="flex w-full items-center justify-start border-b border-bg01 bg-bg02 py-3">
      <Image
        alt=""
        className="mx-2 h-10 w-10 flex-none rounded-full border-[1.5px] border-tx02 object-cover p-[2px] xs:h-12 xs:w-12"
        src={user?.avatar}
        quality={100}
        width={56}
        height={56}
      />

      <div className="flex-none text-sm xs:text-base">
        {game.userscore} - {game.opponentscore}
      </div>

      <Image
        alt=""
        className="mx-2  h-10 w-10 flex-none rounded-full border-[1.5px] border-tx02 object-cover p-[2px] xs:h-12 xs:w-12"
        src={opponent?.avatar}
        quality={100}
        width={56}
        height={56}
      />

      <div className="truncate text-sm  text-tx05 xs:text-base">
        {opponent?.displayName}
      </div>
    </div>
  );
}

export function History() {
  const { id } = useParams();
  const { data: games } = useSWR(`/game/history/${id}`);

  return (
    <div
      className="custom-scrl-bar custom-scrl-bar-history max-h-[90% flex w-full flex-grow flex-col
                overflow-auto rounded-lg border border-tx03 lg:mb-24 lg:max-h-[85%]"
    >
      <div className="sticky top-0 w-full border-b bg-bg01 py-3 text-center text-lg font-light tracking-widest text-tx02">
        History Of Last Games
      </div>

      {/* matchs */}
      {games?.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-6 overflow-hidden bg-bg02">
          <Image alt="" src={logoPic} className="h-52 w-52" />

          <div className="text-center text-3xl font-extralight">No Matches</div>

          <div className="w-4/5 text-center text-sm text-tx02">
            Your friend has no matches yet
          </div>
        </div>
      ) : (
        // <div className="flex-1 items-start overflow-hidden bg-bg02">
        <>{games?.map((game, index) => <Match key={index} game={game} />)}</>
        // </div>
      )}
    </div>
  );
}

export default function Home({ params }) {
  return (
    <main className="flex h-screen max-h-screen flex-col bg-bg01 text-tx01 ">
      {/* top of the window */}
      <Title />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden xl:block">
          <Header home={true} menu={<UserMenu />} />
        </div>

        <div className="mx-auto flex max-w-[1400px] flex-1 flex-col justify-between overflow-hidden">
          <div className="z-10 xl:hidden">
            <Header home={true} menu={<UserMenu />} />
          </div>

          <div className="no-scrollbar flex flex-1 flex-col justify-between overflow-auto px-2 xs:px-3 sm:px-5 lg:px-8">
            <ProfileInfo id={params.id} />
            <PlayRate id={params.id} />
            <Ranking id={params.id} />
            <div>
              <Achievement id={params.id} />
            </div>
          </div>
        </div>

        <RightBar menu={<UserMenu />} />
      </div>
    </main>
  );
}
