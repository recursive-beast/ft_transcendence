"use client";

import Image from "next/image";
import Link from "next/link";

import logoPic from "@/images/logos/logo.png";

export default function Home() {
  return (
    <main className="relative bg-bg01 text-tx01">
      {/* verivication Section */}
      {
        <div className="fixed inset-0 flex items-center justify-center bg-bg01">
          <div className="bg-bg01 border-[1.5px] border-tx05 rounded-2xl flex flex-col items-center justify-between w-11/12  h-4/5 sm:w-[30rem] xs:h-2/3 relative overflow-auto no-scrollbar max-h-[45rem]">
            <div className="font-light tracking-[8px] uppercase text-base sm:text-xl sm:tracking-[10px] lg:text-2xl my-5 sm:my-10">
              paddel smash
            </div>

            <div className="text-center">
              <div className="text-sm font-medium tracking-[3px] uppercase  mb-2 xs:text-base">
                authenticate your account
              </div>
              <div className="text-xs font-light uppercase mb-3 xs:mb-6 xs:text-sm ">
                enter the code generated by your authenticator app
              </div>
            </div>

            <Image
              src={logoPic}
              alt="Logo of the game"
              className="h-32 w-32 xs:h-52 xs:w-52 sm:h-64 sm:w-64"
            />

            <div className="flex flex-col items-center mb-8 sm:mb-16">
              <div className="flex space-x-2 xs:space-x-2 mb-5 xs:mb-12">
                <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-12 xs:h-16 xs:rounded-2xl border-none outline-none focus:border-none" />
                <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-12 xs:h-16 xs:rounded-2xl border-none outline-none focus:border-none" />
                <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-12 xs:h-16 xs:rounded-2xl border-none outline-none focus:border-none" />
                <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-12 xs:h-16 xs:rounded-2xl border-none outline-none focus:border-none" />
                <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-12 xs:h-16 xs:rounded-2xl border-none outline-none focus:border-none" />
                <input className="bg-tx01 w-7 h-10 rounded-lg xs:w-12 xs:h-16 xs:rounded-2xl border-none outline-none focus:border-none" />
              </div>

              <div>
                <Link className="mb-3" href={"../profile"}>
                  <div className="text-xl font-extralight tracking-[6px] xs:text-3xl">
                    virify
                  </div>
                </Link>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      }
    </main>
  );
}
