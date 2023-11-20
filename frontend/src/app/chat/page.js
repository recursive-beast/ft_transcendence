"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
//Profils
import Pic01 from "@/images/profils/01.jpg";
import Pic02 from "@/images/profils/02.jpg";
import Pic03 from "@/images/profils/03.png";
import Pic11 from "@/images/profils/11.jpg";
import Pic05 from "@/images/profils/05.jpg";
import Pic06 from "@/images/profils/06.jpg";
import Pic15 from "@/images/profils/15.jpg";
import { faker } from "@faker-js/faker";

import { Title, Header, RightBar, Friends, status } from "@/components/common";
import { format } from "date-fns";

faker.seed(4);

const conversations = Array(50)
  .fill()
  .map(() => ({
    avatar: faker.internet.avatar(),
    messages: Array(50)
      .fill()
      .map(() => ({
        text: faker.lorem.text(),
        sent: faker.datatype.boolean(),
        date: faker.date.anytime(),
      })),
    unseen: faker.number.int({ min: 0, max: 3 }),
    fullname: faker.person.fullName(),
    displayName: faker.internet.displayName(),
    status: faker.helpers.arrayElement(["ONLINE", "OFFLINE", "INGAME"]),
  }));

function DirectMessages(props) {
  return (
    <div className="no-scrollbar mt-5 h-full w-full overflow-auto rounded-3xl border-y border-tx01 sm:w-80">
      <div className="sticky top-0 flex items-center justify-between border-b border-tx03 bg-bg01 px-2 py-4 text-base capitalize tracking-[3px] text-tx02">
        <div>Direct Messages</div>
        <Icon className="h-6 w-6" icon="ph:caret-up-down-bold" />
      </div>

      {props.activ && (
        <div>
          {conversations.map((conversation, index) => {
            return (
              <div
                key={index}
                className="flex w-full items-center justify-between p-2"
              >
                {/* flex div contain avatar, name and lastMessage */}
                <div className="flex items-center">
                  {/* avatar */}
                  <Image
                    className={clsx(
                      "mr-2 h-12 w-12 rounded-full border object-cover xs:mr-3 xs:h-14 xs:w-14",
                      status[conversation.status].border,
                    )}
                    // src={conversation.avatar}
                    src={Pic03}
                    quality={100}
                    width={56}
                    height={56}
                  />

                  {/* name and lastMessage */}
                  <div className="flex w-36 flex-1 flex-col xs:w-48">
                    {/* name */}
                    <div className=" truncate text-base tracking-widest">
                      {conversation.displayName}
                    </div>

                    {/* lastMessage */}
                    <div className="truncate text-sm text-tx02">
                      {conversation.messages.at(-1).text}
                    </div>
                  </div>
                </div>

                {/* div contain time end nbrMessages */}
                <div className="flex flex-col items-end">
                  {/* time */}
                  <div className="text-sm text-tx02">
                    {format(conversation.messages.at(-1).date, "HH:mm")}
                  </div>

                  {/* nbrMessages */}
                  {conversation.unseen != 0 && (
                    <div className="h-5 w-5 rounded-full bg-tx02 text-center text-sm font-semibold text-tx04">
                      {conversation.unseen}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DirectMessage() {
  return;
}

export default function Home() {
  return (
    <main className="flex h-screen max-h-screen flex-col bg-bg01 text-tx01">
      {/* top of the window */}
      <Title />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden xl:block">
          <Header />
        </div>

        <div className="mx-auto flex max-w-[1400px] flex-1 flex-col px-2 xs:px-3 sm:px-5 lg:px-8">
          {/* Header */}
          <div className="xl:hidden">
            <Header />
          </div>

          {/* content */}
          <div className="flex h[80%] mb-5 overflow-hidden flex-col space-y-2">
            <div className="h-[50%]">
              <DirectMessages activ={true} />
            </div>
            <div className="hs-[50%]">
              <DirectMessages activ={true} />
            </div>
          </div>
        </div>

        <div>
          <RightBar
            menu={
              <div className="flex h-3/4 w-full items-center justify-center ">
                <Friends />
              </div>
            }
          />
        </div>
      </div>
    </main>
  );
}
