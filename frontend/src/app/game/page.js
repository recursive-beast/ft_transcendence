"use client";
import Image from "next/image";
import clsx from "clsx";

import { Title, Header, RightBar } from "@/components/common";
import { History } from "@/app/user/[id]/page";
import classic from "@/images/thems/classic.png";

function Theme(props) {
  return (
    <div className={clsx("w-40 h-72 xs:w-48 xs:h-80 sm:w-96 sm:h-48 2xl:w-[26rem] 2xl:h-52 rounded-lg border flex-none", props.className)}>
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

          // menu={<HomeMenu onClick={() => setSetting(true)} />}
          />
        </div>

        <div className="mx-auto flex max-w-[1400px] flex-1 flex-col justify-between overflow-hidden">
          <div className="z-10 xl:hidden">
            <Header
            // menu={<HomeMenu onClick={() => setSetting(true)} />}
            />
          </div>

          <div className="flex flex-1 flex-col items-center px-2 xs:px-3 sm:px-5 lg:px-8">
            {/* flex container for title and description */}
            <div className="mt-10 flex w-full flex-col items-center justify-center xs:mt-14 sm:mt-20 md:mt-32">
              {/* title */}
              <div className="mb-5 text-2xl font-thin tracking-widest xs:mb-7 xs:text-3xl sm:mb-10 sm:text-5xl md:mb-16 xl:text-6xl">
                Paddle smash
              </div>

              {/* description */}
              <div className="text-center text-xs font-light tracking-wide text-tx02 xs:text-sm sm:mx-10 sm:text-2xl">
                Personalize your game by selecting a theme that matches your
                style. Use the slider below to preview and select from a variety
                of themes, ranging from classic to modern
              </div>
            </div>

            <dic className="flex-1 flex items-center space-x-10 overflow-auto w-full">
              <Theme className="bg-tx03"/>
              <Theme className="bg-[#EAD2AC]"/>
              <Theme className="bg-[#000]"/>
              <Theme className="bg-[#20C3D0]"/>
              <Theme className="bg-[#001642]"/>
              <Theme className="bg-[#1C4226]"/>
            </dic>
          </div>
        </div>

        <RightBar menu={<History />} />
      </div>
    </main>
  );
}
