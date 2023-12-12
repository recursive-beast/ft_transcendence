"use client";

import useSWR, { mutate } from "swr";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
import axios from "axios";

import { Title, Header, RightBar } from "@/components/common";
import { PlayRate, Achievement, Ranking } from "@/app/home/page";
import { Option } from "@/app/chat/page";

import Pic01 from "@/images/profils/01.jpg";
import Pic02 from "@/images/profils/02.jpg";
import Pic03 from "@/images/profils/03.png";
import { AvatarImage } from "@/components/AvatarImage";

function NavOptions({ onClick, ...props }) {
  return (
    <button
      className="group flex w-28 flex-col items-center text-tx02"
      onClick={onClick}
    >
      {/* button icon */}
      <Icon
        className="2xl:w-11text-tx02 h-9 w-9 lg:transition lg:duration-500
          lg:group-hover:text-tx01 xl:group-hover:-translate-y-1 2xl:h-11"
        icon={props.icon}
      />

      {/* button title >> visible in web vertion */}
      <div
        className="text-xs font-light uppercase tracking-widest text-tx01 lg:opacity-0
               lg:transition lg:duration-700 lg:group-hover:opacity-100"
      >
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
    <section className="relative my-2 flex items-center justify-between xs:my-4">
      <div className="flex flex-1 items-center justify-between">
        {/* info */}
        <div className="flex items-center">
          {/* avatar */}
          <AvatarImage
          src={user?.avatar}
          id={user?.id}
          className="mr-4 h-14 w-14 xs:ml-2 xs:mr-6 xs:h-20 xs:w-20 sm:ml-4 sm:mr-10 sm:h-28 sm:w-28"
        />

          {/* name */}
          <div className="flex flex-col">
            <div className="text-base font-semibold capitalize tracking-widest text-tx05 xs:text-lg sm:text-xl sm:tracking-[3px]">
              {user?.displayName}
            </div>

            <div className="text-xs font-light capitalize tracking-widest text-tx02 xs:text-sm sm:text-lg">
              {user?.fullName}
            </div>
          </div>
        </div>

        {/* options */}
        <div className="relative xs:mr-2 sm:mr-4 xl:hidden">
          <button className="ml-3" onClick={() => setOptions(!options)}>
            <Icon
              className="h-5 w-5 text-tx02 xs:h-7 xs:w-7 sm:h-9 sm:w-9"
              icon={
                options
                  ? "solar:round-alt-arrow-up-broken"
                  : "solar:round-alt-arrow-down-broken"
              }
            />
          </button>

          {options && (
            <div className="absolute right-0 z-10 mt-2 w-52 rounded-lg border bg-bg01">
              {user?.isFriend ? (
                <Option
                  title="Remove Friend"
                  icon="solar:user-cross-broken"
                  onClick={removeFriend}
                />
              ) : (
                <Option
                  title="Add Friend"
                  icon="solar:user-plus-broken"
                  onClick={addFriend}
                />
              )}
              <Option title="New Game" icon="solar:gamepad-broken" />
              <Option title="Chat" icon="solar:chat-round-line-broken" />
              {/* <Option title="Block" icon="solar:user-block-broken" /> */}
            </div>
          )}
        </div>
        <div className="hidden items-center justify-between xl:flex">
          {user?.isFriend ? (
            <NavOptions
              title="Remove Friend"
              icon="solar:user-cross-broken"
              onClick={removeFriend}
            />
          ) : (
            <NavOptions
              title="Add Friend"
              icon="solar:user-plus-broken"
              onClick={addFriend}
            />
          )}
          <NavOptions title="New Game" icon="solar:gamepad-broken" />
          <NavOptions title="Chat" icon="solar:chat-round-line-broken" />
          {/* <NavOptions title="Block" icon="solar:user-block-broken" /> */}
        </div>
      </div>
    </section>
  );
}

function Match() {
  return (
    <div className="mx-1 flex items-center mb-5">
      <Image
        className="mx-2 h-12 w-12 flex-none rounded-full border-[1.5px] border-tx02 object-cover p-[2px]"
        src={Pic01}
        quality={100}
        width={56}
        height={56}
      />

      <div className="flex-none">7 - 5</div>

      <Image
        className="mx-2 h-12 w-12 flex-none rounded-full border-[1.5px] border-tx02 object-cover p-[2px]"
        src={Pic02}
        quality={100}
        width={56}
        height={56}
      />

      <div className="truncate text-tx05">name-nnnnnnnnxnn</div>
    </div>
  );
}

export function History() {
  return (
    <div className="h-2/3">
      <div className="mb-5 w-full border-b pb-2 text-center text-lg font-light tracking-widest text-tx02">
        History Of Last Games
      </div>
      <Match />
      <Match />
      <Match />
      <Match />
      <Match />
      <Match />
      <Match />
      <Match />
      <Match />
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
          <Header
            home={true}
            menu={<History />}
          />
        </div>

        <div className="mx-auto flex max-w-[1400px] flex-1 flex-col justify-between overflow-hidden">
          <div className="z-10 xl:hidden">
            <Header
              home={true}
              menu={<History />}
            />
          </div>

          <div className="no-scrollbar flex flex-1 flex-col justify-between overflow-auto px-2 xs:px-3 sm:px-5 lg:px-8">
            <ProfileInfo id={params.id} />
            <PlayRate />
            <Ranking />
            <div>
              <Achievement />
            </div>
          </div>
        </div>

        <RightBar menu={<History />} />
      </div>
    </main>
  );
}
