"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Bg from "@/images/pics/chatbg.png";
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
import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  isBefore,
  isToday,
  isYesterday,
  sub,
  subDays,
} from "date-fns";

faker.seed(4);

const conversations = Array(50)
  .fill()
  .map(() => ({
    avatar: faker.internet.avatar(),
    messages: Array(50)
      .fill()
      .map(() => ({
        text: faker.lorem.sentence({ min: 3, max: 8 }),
        sent: faker.datatype.boolean(),
        date: faker.date.recent({ days: 2 }),
      })),
    unseen: faker.number.int({ min: 0, max: 3 }),
    fullname: faker.person.fullName(),
    displayName: faker.internet.displayName(),
    status: faker.helpers.arrayElement(["ONLINE", "OFFLINE", "INGAME"]),
  }));

const groups = Array(15)
  .fill()
  .map(() => ({
    avatar: faker.internet.avatar(),
    messages: Array(50)
      .fill()
      .map(() => ({
        text: faker.lorem.sentence({ min: 3, max: 15 }),
        sent: faker.datatype.boolean(),
        date: faker.date.recent(),
      })),
    members: faker.number.int({ min: 3, max: 8 }),
    displayName: faker.internet.displayName(),
    status: faker.helpers.arrayElement(["ONLINE", "OFFLINE", "INGAME"]),
  }));

function GroupMessage(props) {
  return (
    <div>
      {groups.map((group, index) => {
        return (
          <div
            key={index}
            className="flex cursor-pointer items-center justify-between p-2"
            onClick={() => {
              props.onConversation?.(group);
            }}
          >
            {/* flex div contain avatar, name and lastMessage */}
            <div className="flex items-center">
              {/* avatar */}
              <Image
                className="mr-2 h-12 w-12 rounded-full border-[1.5px] border-tx02 object-cover p-[2px] xs:mr-3 xs:h-14 xs:w-14"
                // src={group.avatar}
                src={Pic03}
                quality={100}
                width={56}
                height={56}
              />

              {/* Group name and lastMessage time */}
              <div className="flex flex-col overflow-hidden">
                {/* name */}
                <div className=" truncate text-base tracking-widest">
                  {group.displayName}
                </div>

                {/* lastMessage */}
                <div className="truncate text-sm text-tx02">
                  {formatDistanceToNowStrict(group.messages.at(-1).date, {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>

            {/* div contain time end nbrMessages */}
            <div className="flex items-center justify-center -space-x-4">
              <div>
                <Image
                  src={Pic05}
                  className="w-6 rounded-full border border-tx01 object-cover xs:w-8"
                />
              </div>

              <div>
                <Image
                  src={Pic01}
                  className="w-6 rounded-full border border-tx01 object-cover xs:w-8"
                />
              </div>

              <div>
                {group.members === 3 ? (
                  <Image
                    src={Pic11}
                    className="h-6 w-6 rounded-full border border-tx01 object-cover xs:h-8 xs:w-8"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border  border-tx01 bg-tx02 text-tx04 xs:h-8 xs:w-8">{`+${
                    group.members - 2
                  }`}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DirectMessage(props) {
  return (
    <div>
      {conversations.map((conversation, index) => {
        return (
          <div
            key={index}
            className="flex cursor-pointer items-center justify-between p-2 "
            onClick={() => {
              props.onConversation?.(conversation);
              console.log(conversation);
            }}
          >
            {/* flex div contain avatar, name and lastMessage */}
            <div className="flex flex-initial items-center overflow-hidden">
              {/* avatar */}
              <Image
                className={clsx(
                  "mr-2 h-12 w-12 flex-none rounded-full object-cover p-[3px] xs:mr-3 xs:h-14 xs:w-14",
                  status[conversation.status].border,
                )}
                // src={conversation.avatar}
                src={Pic03}
                quality={100}
                width={56}
                height={56}
              />

              {/* name and lastMessage */}
              <div className="flex flex-col overflow-hidden">
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
                {isToday(conversation.messages.at(-1).date)
                  ? format(conversation.messages.at(-1).date, "HH:mm")
                  : isYesterday(conversation.messages.at(-1).date)
                  ? "yesterday"
                  : format(conversation.messages.at(-1).date, "yyyy/MM/dd")}
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
  );
}

function BoxMessages({ onClick, ...props }) {
  return (
    <div
      className={clsx(
        "w-full max-w-[25rem] p-1 sm:px-2",
        props.activ && "h-[49%] shrink grow",
        !props.activ && "h-fit",
      )}
    >
      <div className="no-scrollbar h-full w-full overflow-auto rounded-3xl border-y border-tx01">
        <button
          className="sticky top-0 flex w-full items-center justify-between border-b border-tx03 bg-bg01 px-2 py-4 text-base capitalize tracking-[3px] text-tx02"
          onClick={onClick}
        >
          <div>{props.title}</div>
          <div>{props.iconBtn}</div>
        </button>

        {props.activ && props.messages}
      </div>
    </div>
  );
}

function ConversationBox(props) {
  return (
    <div className="no-scrollbar hidden h-full flex-1 flex-col justify-between overflow-auto sm:flex sm:bg-bg02">
      {/* top bar, friend info */}
      <button className="sticky top-0 flex w-full items-center border-b bg-bg03 py-2">
        {/* avatar */}
        <Image
          className="mx-4 my-1 h-10 w-10 rounded-full border-2 border-tx02 object-cover p-[2px] xs:h-12 xs:w-12 sm:h-16 sm:w-16 xl:h-20 xl:w-20"
          src={Pic15}
          quality={100}
        />

        <div className="flex flex-col items-start">
          {/* full name */}
          <div className="text-base font-semibold capitalize tracking-[widest] text-tx05 xs:text-lg sm:text-xl sm:tracking-[3px]">
            megashoot
          </div>

          <div className="text-[12px] font-light capitalize text-tx02 md:text-[14px]">
            Click here to visit profile
          </div>
        </div>
      </button>

      {/* conversation */}
      <div>
        {props.conversation &&
          props.conversation.messages.map((message) => {
            return (
              <div
                className={clsx(
                  "my-3 flex w-fit max-w-[70%] flex-col rounded-lg px-2 py-[2px] 2xl:py-1",
                  message.sent
                    ? "ml-auto mr-5 rounded-tr-none bg-tx03"
                    : "ml-5 mr-auto rounded-tl-none bg-tx02",
                )}
              >
                <span>{message.text}</span>
                <span
                  className={clsx(
                    "ml-auto text-xs",
                    message.sent ? "text-tx02" : "text-tx03",
                  )}
                >
                  {isToday(message.date)
                    ? format(message.date, "HH:mm")
                    : isYesterday(message.date)
                    ? "yesterday " + format(message.date, "HH:mm")
                    : format(message.date, "yyyy/MM/dd HH:mm")}
                </span>
              </div>
            );
          })}
      </div>

      {/* input message */}
      <div className="sticky bottom-0 flex w-full  items-center space-x-3 bg-bg03 px-5 py-3">
        <input className=" h-8 flex-1 rounded-xl bg-tx02 text-base font-extralight xs:text-xl" />

        <button>
          <Icon className=" h-7 w-7 text-tx01" icon="fluent:send-32-filled" />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [directMsg, setDirectMsg] = useState(true);
  const [groupMsg, setGroupMsg] = useState(true);
  const [conversation, setConversation] = useState(null);

  return (
    <main className="flex h-screen max-h-screen flex-col bg-bg01 text-tx01">
      {/* top of the window */}
      <Title />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden xl:block">
          <Header />
        </div>

        <div className="sm:bg-bg0 mx-auto flex max-w-[1400px] flex-1 flex-col">
          {/* Header */}
          <div className="xl:hidden">
            <Header />
          </div>

          {/* content */}
          <div className="flex h-96 w-full flex-1 justify-center bg-bg01 p-3 sm:justify-between sm:p-5">
            {/* Messages */}
            <div className="flex h-full w-full max-w-md flex-col items-center justify-between space-y-2 overflow-hidden border-tx03 bg-bg02 sm:w-2/5 sm:border-r">
              {/* Direct Msgs */}
              <BoxMessages
                onClick={() => {
                  setDirectMsg(true);
                  setGroupMsg(false);
                }}
                activ={directMsg}
                title="Direct Messages"
                iconBtn={
                  <Icon className="h-6 w-6" icon="ph:caret-up-down-bold" />
                }
                messages={
                  <DirectMessage
                    onConversation={(conversation) =>
                      setConversation(conversation)
                    }
                  />
                }
              />

              {/* Group Msgs */}
              <BoxMessages
                onClick={() => {
                  setDirectMsg(false);
                  setGroupMsg(true);
                }}
                activ={groupMsg}
                title="Group Messages"
                iconBtn={
                  <Icon className="h-6 w-6" icon="ph:caret-up-down-bold" />
                }
                messages={
                  <GroupMessage
                    onConversation={(conversation) =>
                      setConversation(conversation)
                    }
                  />
                }
              />
            </div>

            {/* conversation */}
            <ConversationBox conversation={conversation} />
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
