"use client";

import { Title, Header, RightBar } from "@/components/common";
import { History } from "@/app/user/[id]/page";

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

          <div className="no-scrollbar flex flex-1 flex-col justify-between overflow-auto px-2 xs:px-3 sm:px-5 lg:px-8">
            <div className="flex w-full flex-col items-center justify-center mt-10 xs:mt-14 sm:mt-20 md:mt-32">

              <div className="text-2xl xs:text-3xl sm:text-5xl xl:text-6xl font-thin tracking-widest mb-5 xs:mb-7 sm:mb-10 md:mb-16">
                Paddle smash
              </div>

              <div className="text-xs xs:text-sm sm:text-2xl font-light tracking-wide text-tx02 text-center sm:mx-10">
                Personalize your game by selecting a theme that matches your
                style. Use the slider below to preview and select from a variety
                of themes, ranging from classic to modern
              </div>
            </div>
          </div>
        </div>

        <RightBar menu={<History />} />
      </div>
    </main>
  );
}
