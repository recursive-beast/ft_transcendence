"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import logoPic from "@/images/logos/logo.png";

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

export default function Game() {
  return (
    <main className=" bg-bg01 text-tx01">
      <section className="min-h-screen lg:h-screen bg-bg01 flex justify-between px-3 pt-3 pb-1 xl:p-0 sm:px-7 sm:py-5">
        <div className="flex flex-col">
          <WebHeader />
        </div>
      </section>
    </main>
  );
}
