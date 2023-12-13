"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import useSWR, { mutate } from "swr";
import { useEffect, useState, useRef } from "react";
import * as Joi from "joi";

import logoPic from "@/images/logos/logo.png";
//Profils
import Pic01 from "@/images/profils/01.jpg";
import Pic02 from "@/images/profils/02.jpg";
import Pic03 from "@/images/profils/03.png";
import Pic11 from "@/images/profils/11.jpg";
import Pic05 from "@/images/profils/05.jpg";
import Pic06 from "@/images/profils/06.jpg";
import Pic15 from "@/images/profils/15.jpg";
import { faker } from "@faker-js/faker";

import {
  Title,
  Header,
  RightBar,
  Friends,
  status,
  Search,
} from "@/components/common";
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
import { AvatarImage } from "@/components/AvatarImage";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import axios from "axios";
import { AvatarInput } from "@/components/AvatarInput";
import { useSnackbar } from "notistack";

faker.seed(2);

const conversations = Array(20)
  .fill()
  .map(() => ({
    avatar: faker.internet.avatar(),
    messages: Array(30)
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

const groups = Array(10)
  .fill()
  .map(() => ({
    avatar: faker.internet.avatar(),
    messages: Array(50)
      .fill()
      .map(() => ({
        text: faker.lorem.sentence({ min: 3, max: 15 }),
        sent: faker.datatype.boolean(0.3),
        date: faker.date.recent(),
        user: faker.internet.displayName(),
        status: faker.helpers.arrayElement(["ONLINE", "OFFLINE", "INGAME"]),
        avatar: faker.internet.avatar(),
      })),
    members: faker.number.int({ min: 3, max: 8 }),
    displayName: faker.internet.displayName(),
    status: "OFFLINE",
  }));

function GroupMessage(props) {
  const { data: groups } = useSWR("/chat/group");
  const { data: me } = useSWR("/users/me");
  const socket = useSocket();

  useEffect(() => {
    if (!groups) return;

    for (const group of groups) {
      socket.emit("room.join", group.id);
    }
  }, [groups]);

  return (
    <div>
      {groups?.map((group, index) => {
        const members = group.members.filter(
          (member) => member.user.id !== me?.id,
        );
        console.log(members);
        const avatars = members.map((member) => member.user.avatar);
        let avatarList = [];

        const two = avatars
          .slice(0, 2)
          .map((avatar) => (
            <Image
              src={avatar}
              className="w-6 rounded-full border border-tx01 object-cover xs:w-8"
              width={300}
              height={300}
            />
          ));

        avatarList = avatarList.concat(two);

        if (avatars.length > 2) {
          const count = avatars.length - 2;

          avatarList.push(
            <div className="flex h-6 w-6 items-center justify-center rounded-full border  border-tx01 bg-tx02 text-tx04 xs:h-8 xs:w-8">
              +{count}
            </div>,
          );
        }

        return (
          <div
            key={index}
            className="flex cursor-pointer border-b border-tx03 p-2 hover:bg-bg03"
            onClick={() => {
              props.onConversation?.(group);
            }}
          >
            {/* flex div contain avatar, name and lastMessage */}
            <div className="flex flex-1 items-center">
              {/* avatar */}
              {/* use Image <= img */}
              <Image
                className="mr-2 h-12 w-12 flex-none rounded-full border-[1.5px] border-tx02 object-cover p-[2px] xs:mr-3 xs:h-14 xs:w-14"
                src={group?.avatar}
                quality={100}
                width={300}
                height={300}
              />

              {/* Group name and lastMessage time */}
              <div className="flex w-10 flex-grow flex-col">
                {/* name */}
                <div className="truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
                  {group.title}
                </div>

                {/* lastMessage */}
                {group.messages.length > 0 && (
                  <div className="truncate text-xs text-tx02 xs:text-sm">
                    {formatDistanceToNowStrict(
                      new Date(group.messages.at(-1).createdAt),
                      {
                        addSuffix: true,
                      },
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* div contain time end nbrMessages */}
            <div className="flex items-center justify-center -space-x-3 xs:-space-x-4 ">
              {avatarList}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DirectMessage(props) {
  const { data } = useSWR("/chat/direct");
  const { data: data1 } = useSWR("/users/me");
  const [myID, setMyId] = useState(0);
  if (data1 && !myID) setMyId(data1.id);

  return (
    <div>
      {data?.map((conversation, index) => {
        return (
          <div
            key={index}
            className="flex cursor-pointer border-b border-tx03 p-2 hover:bg-bg03"
            onClick={() => {
              props.onConversation?.(conversation);
            }}
          >
            {/* flex div contain avatar, name and lastMessage */}
            <div className="flex flex-1 items-center">
              {/* avatar */}
              <AvatarImage
                src={
                  conversation?.members.find((obj) => obj.id !== myID).avatar
                }
                id={conversation?.members.find((obj) => obj.id !== myID).id}
                className="mr-2 h-12 w-12 xs:mr-3 xs:h-14 xs:w-14"
              />

              <div className="flex flex-grow flex-col pr-1">
                {/* name and time */}
                <div className="flex items-center">
                  {/* name */}
                  <div className="w-10 flex-grow truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
                    {
                      conversation.members.find((obj) => obj.id !== myID)
                        .displayName
                    }
                  </div>

                  {/* time */}
                  <div className="text-sm text-tx02">
                    {isToday(new Date(conversation.messages.at(-1).createdAt))
                      ? format(
                          new Date(conversation.messages.at(-1).createdAt),
                          "HH:mm",
                        )
                      : isYesterday(
                          new Date(conversation.messages.at(-1).createdAt),
                        )
                      ? "yesterday"
                      : format(
                          new Date(conversation.messages.at(-1).createdAt),
                          "yyyy/MM/dd",
                        )}
                  </div>
                </div>

                {/* div contain last Message end nbrMessages */}
                <div className="flex items-center">
                  {/* lastMessage */}
                  <div className="w-10 flex-grow truncate text-xs text-tx02 xs:text-sm">
                    {conversation.messages.at(-1).text}
                  </div>

                  {/* nbrMessages */}
                  {conversation.messages.filter(
                    (message) =>
                      message.senderId != myID && message.seen === false,
                  ).length != 0 && (
                    <div className="ml-1 h-5 w-5 rounded-full bg-tx02 text-center text-sm font-semibold text-tx04">
                      {
                        conversation.messages.filter(
                          (message) =>
                            message.senderId != myID && message.seen === false,
                        ).length
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BoxMessages({ onGroupClick, onClick, ...props }) {
  return (
    <div
      className={clsx(
        props.activ && "h-[40%] shrink grow border-b border-tx02",
        !props.activ && "h-fit",
      )}
    >
      <div className="no-scrollbar h-full overflow-auto">
        <div
          className="sticky top-0 flex h-10 w-full items-center justify-between space-x-3
            border-b border-tx02 bg-bg03 px-2 sm:h-12"
        >
          <button
            className="h-full flex-grow text-left text-base capitalize tracking-[3px] text-tx01"
            onClick={onClick}
          >
            <div>{props.title}</div>
          </button>
        </div>

        {props.activ && props.messages}
      </div>
    </div>
  );
}

export function Option({ onClick, ...props }) {
  return (
    <button
      className="flex w-full items-center border-b border-tx02 py-3 text-tx02 last:border-0 hover:text-tx01"
      onClick={onClick}
    >
      <Icon className="ml-4 mr-3 h-6 w-6" icon={props.icon} />
      <div className="mr-4 grow text-left font-light uppercase tracking-wider">
        {props.title}
      </div>
    </button>
  );
}

function Options() {
  return (
    <div className="absolute right-5 top-full rounded-lg border border-tx01 bg-bg02 ">
      {/* New Game */}
      <Option title="new game" icon="solar:gamepad-broken" />

      {/* Block */}
      <Option title="block" icon="solar:user-block-rounded-broken" />
    </div>
  );
}

function GroupInfo({ onClick, ...props }) {
  const [newTitle, setNewTitle] = useState(false);
  return (
    <div className="no-scrollbar flex flex-grow flex-col overflow-auto border-tx03 bg-bg03 sm:w-1/2 sm:max-w-[25rem] sm:border-l xl:flex-none">
      {/* Header and close */}
      <div
        className="sticky top-0 z-10 flex h-14 w-full flex-none
            items-center space-x-5 border-b border-tx01 bg-tx02 px-2 sm:h-16"
      >
        {/* Return Button */}
        <button onClick={onClick}>
          <Icon
            className="ml-1 h-5 w-5 text-tx03 xs:ml-2 xs:h-6 xs:w-6 sm:ml-3"
            icon="icon-park-outline:close"
          />
        </button>

        {/* Title */}
        <div className="text-left text-base capitalize tracking-widest text-tx03 xs:text-lg xs:tracking-[3px]">
          Group info
        </div>
      </div>

      {/* Avatar and title */}
      <div className="mb-3 flex flex-col gap-4 bg-bg02 py-8">
        {/* avatar */}
        <div className="relative flex items-center justify-center">
          <Image
            className="w-1/3 flex-none rounded-full sm:w-2/5"
            src={props.conversation.avatar}
            quality={100}
            width={56}
            height={56}
          />

          {/* Set Avatar Button */}
          <button
            className="absolute flex h-full w-1/3 flex-col items-center justify-center gap-2 rounded-full border border-dashed border-tx01
           opacity-0 hover:bg-bg02/80 hover:opacity-100 sm:w-2/5 touch:bg-bg02/80 touch:opacity-100"
          >
            <Icon className="h-10 w-10 text-tx02" icon="solar:upload-broken" />
            <div className="text-[9px] font-light tracking-wider xs:text-xs sm:text-sm">
              UPLOAD NEW
            </div>
          </button>
        </div>

        {/* title */}
        {newTitle ? (
          <div className="relative mx-3 flex items-end justify-center gap-2 border-b-2 sm:mx-5">
            <input
              className="w-full border-none bg-bg02 outline-none focus:border-none"
              value={props.conversation.title}
            />

            {/* Set Avatar Button */}
            <button onClick={() => setNewTitle(false)}>
              <Icon
                className="h-5 w-5 text-tx02 xs:h-6 xs:w-6"
                icon="solar:check-read-broken"
              />
            </button>
          </div>
        ) : (
          <div className="relative flex items-end justify-center gap-2">
            <div className="text-base xs:text-lg">
              {props.conversation.title}
            </div>

            {/* Set Avatar Button */}
            <button onClick={() => setNewTitle(true)}>
              <Icon
                className="mb-1 h-5 w-5 text-tx02 xs:h-6 xs:w-6"
                icon="solar:pen-broken"
              />
            </button>
          </div>
        )}

        {/* type */}
        <div className="relative -m-3 flex items-center justify-center font-light tracking-widest text-tx02">
          Group:&nbsp; <span>{props.conversation.type}</span>
        </div>
      </div>

      {/* Group Type and password */}
      <div className="mb-3 flex flex-col gap-4 bg-bg02 px-5 py-8 font-light text-tx02">
        <div>
          <label>Group Type:</label>
          <select
            value={props.conversation.type}
            className="h-6 w-full rounded-sm border-b bg-bg03 px-1 text-tx01 xs:h-8 sm:rounded-md"
          >
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
            <option value="PROTECTED">PROTECTED</option>
          </select>
        </div>

        {/* {/* Password Input Section (visible if group type is 'protected') */}
        <div
          className={clsx(
            "flex flex-col",
            props.conversation.type === "PROTECTED" ? "block" : "hidden",
          )}
          // className=
        >
          <label>Current Password:</label>
          <input
            className="mb-2 h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
            type="password"
          ></input>

          <label>New Password:</label>
          <input
            className="mb-2 h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
            type="password"
          ></input>

          <label>Confirm:</label>
          <input
            className="h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
            type="password"
          ></input>

          <button
            className="mx-auto mt-4 rounded-full border border-tx01 p-1 px-2 text-center text-xs font-light uppercase tracking-wider text-tx01 transition-colors duration-[400ms] ease-linear
          hover:bg-tx01 hover:text-tx03 xs:text-sm "
          >
            Change Password
          </button>
        </div>
      </div>

      {/* members */}
      <div className=" mb-3 bg-bg02">
        <div className="mx-3 my-2 text-sm font-light tracking-wide text-tx02 xs:text-base xs:tracking-widest">
          Group -&nbsp; <span>{props.conversation.members.length}</span>
          &nbsp;Members
        </div>
        <div
          className="flex cursor-pointer border-b border-tx02 p-2 hover:bg-tx03"
          // onClick={() => setNewGroup(true)}
        >
          <div className="flex flex-1 items-center">
            {/* Avatar */}
            <Icon
              className="mr-2 h-10 w-10 flex-none rounded-full bg-tx02 p-[2px] text-tx04 xs:mr-3 xs:h-12 xs:w-12"
              icon="solar:user-plus-bold-duotone"
            />

            {/* Friend Name */}
            <div className="truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
              Add Member
            </div>
          </div>
        </div>

        {props.conversation.members.map((member, index) => {
          return (
            <div
              className="flex cursor-pointer border-b border-tx02 p-2 hover:bg-tx03"
              key={index}
            >
              {console.log(member.id)}
              {/* Flex container for avatar and name */}
              <div className="flex flex-1 items-center">
                {/* Avatar */}
                <AvatarImage
                  src={member.user.avatar}
                  id={member.user.id}
                  className="mr-2 h-12 w-12 xs:mr-3 xs:h-14 xs:w-14"
                />

                {/* Friend Name */}
                <div className="truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
                  {member.user.displayName}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* exit */}
      <div className=" bg-bg02 text-pr01">
        <div className="flex cursor-pointer p-2 hover:bg-tx03">
          <div className="flex flex-1 items-center">
            {/* Icone */}
            <Icon
              className="mr-2 h-10 w-10 flex-none rounded-full bg-tx02 p-2 xs:mr-3 xs:h-12 xs:w-12"
              icon="solar:exit-broken"
            />

            {/* text */}
            <div className="truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
              Exit group
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationBox({ onClick, ...props }) {
  // State to control the visibility of options
  const [options, setOptions] = useState(false);
  // State to control the visibility of group informations
  const [grInfo, setGrInfo] = useState(false);

  const id = props.conversation?.id;
  const isDirect = props.conversation?.isDirect;
  const isGroup = props.conversation?.isGroup;

  const { data: me } = useSWR("/users/me");
  const { data: direct } = useSWR(isDirect ? `/chat/direct/${id}` : null);
  const { data: group } = useSWR(isGroup ? `/chat/group/${id}` : null);
  const [myID, setMyId] = useState(0);
  const router = useRouter();
  const socket = useSocket();
  const [msgInput, setMsgInput] = useState("");

  const conversation = isDirect ? direct : isGroup ? group : null;

  if (me && !myID) setMyId(me.id);

  useEffect(() => {
    const updateDirect = () => {
      mutate("/chat/direct");
      mutate(`/chat/direct/${id}`);
    };
    const updateGroup = () => {
      mutate("/chat/group");
      mutate(`/chat/group/${id}`);
    };

    socket.on("direct.message", updateDirect);
    socket.on("direct.message.seen", updateDirect);
    socket.on("channel.message", updateGroup);

    return () => {
      socket.off("direct.message", updateDirect);
      socket.off("direct.message.seen", updateDirect);
      socket.off("channel.message", updateGroup);
    };
  }, [id]);

  useEffect(() => {
    if (isDirect) socket.emit("join.conversation", id);
  }, [id, isDirect]);

  function onMessageSend() {
    if (isGroup) {
      socket.emit("channel.message", {
        groupConversationId: id,
        text: msgInput,
      });
    }

    if (isDirect) {
      const recieverId = conversation.members.filter(
        (member) => member.id !== me.id,
      )[0].id;

      socket.emit("direct.message", {
        recieverId,
        text: msgInput,
      });
    }

    setMsgInput("");
  }

  return (
    <div className="flex flex-1">
      {/* conversation */}
      <div
        className={clsx(
          (!conversation || grInfo) && "hidden sm:flex",
          "no-scrollbar flex h-full w-full flex-1 flex-col justify-between overflow-auto bg-bg02",
        )}
      >
        {conversation ? (
          <div className="flex flex-1 flex-col">
            {/* Top Bar: Info */}
            <div className="sticky top-0 flex h-14 w-full items-center space-x-2 border-b bg-tx02 py-2 xs:h-16 sm:space-x-4">
              {/* Return Button */}
              <button
                onClick={() => {
                  setGrInfo(false);
                  onClick();
                }}
              >
                <Icon
                  className="ml-1 h-8 w-8 text-tx03 xs:ml-2 xs:h-9 xs:w-9 sm:ml-3"
                  icon="solar:arrow-left-broken"
                />
              </button>
              {/* Friend or group Info */}
              <button
                className="flex flex-grow items-center"
                onClick={() => {
                  if (props.group) setGrInfo(true);
                  else {
                    setGrInfo(false);
                    router.push(
                      `/user/${
                        conversation?.members.find((obj) => obj.id !== myID).id
                      }`,
                    );
                  }
                }}
              >
                {/* Avatar */}
                <AvatarImage
                  src={
                    props.group
                      ? conversation?.avatar
                      : conversation?.members.find((obj) => obj.id !== myID)
                          .avatar
                  }
                  id={conversation?.members.find((obj) => obj.id !== myID).id}
                  className="my-1 mr-2 h-11 w-11 xs:h-[52px] xs:w-[52px] xs:p-[2px] lg:mr-3"
                />

                <div className="flex w-20 grow flex-col items-start">
                  {/* Full Name */}
                  <div className="w-full truncate text-left text-sm font-semibold capitalize tracking-[widest] text-tx05 xs:text-base sm:tracking-[3px]">
                    {conversation &&
                      (props.group
                        ? conversation.title
                        : conversation.members.find((obj) => obj.id != myID)
                            .fullName)}
                  </div>

                  <div className="text-[8px] capitalize text-tx03 xs:text-[10px] sm:text-[14px]">
                    {props.group
                      ? "Click here to get group info"
                      : "Click here to visit profile"}
                  </div>
                </div>
              </button>
              {/* Options Menu */}
              {!props.group && (
                <div>
                  <button
                    onClick={() => {
                      setOptions(!options);
                    }}
                  >
                    <Icon
                      className="mr-3 h-6 w-6 text-tx03 sm:h-7 sm:w-8"
                      icon="circum:menu-kebab"
                    />
                  </button>
                  {options && <Options />}
                </div>
              )}
            </div>

            {/* Conversation Section */}
            <div className="flex grow flex-col justify-end">
              {conversation &&
                conversation.messages.map((message) => {
                  return (
                    <div className="my-1 flex items-start">
                      {props.group && message.senderId != myID && (
                        <AvatarImage
                          src={message.sender.avatar}
                          id={message.sender.id}
                          className="ml-1 h-7 w-7"
                        />
                      )}
                      <div className="flex w-full flex-col space-y-1">
                        {props.group && message.senderId != myID && (
                          <div className="ml-1 mt-1 text-xs text-tx05">
                            {message.senderId.displayName}
                          </div>
                        )}
                        <div
                          className={clsx(
                            " flex w-fit max-w-[70%] flex-col rounded-lg px-2 py-[2px] 2xl:py-1",
                            message.senderId === myID
                              ? "ml-auto mr-5 rounded-tr-none bg-tx03"
                              : "mr-auto rounded-tl-none bg-tx02",
                            props.group ? "ml-1" : "ml-5",
                          )}
                        >
                          <span>{message.text}</span>
                          <span
                            className={clsx(
                              "ml-auto text-xs",
                              message.senderId === myID
                                ? "text-tx02"
                                : "text-tx03",
                            )}
                          >
                            {isToday(new Date(message.createdAt))
                              ? format(new Date(message.createdAt), "HH:mm")
                              : isYesterday(new Date(message.createdAt))
                              ? "yesterday " +
                                format(new Date(message.createdAt), "HH:mm")
                              : format(
                                  new Date(message.createdAt),
                                  "yyyy/MM/dd HH:mm",
                                )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Input Message Section */}
            <div className="sticky bottom-0 flex w-full  items-center space-x-3 bg-bg03 px-3 py-2 xs:py-3 sm:px-5">
              <input
                value={msgInput}
                onChange={(event) => setMsgInput(event.target.value)}
                className="h-7 flex-1 rounded-xl border-none bg-tx02 px-2 text-base outline-none focus:border-none xs:h-8 xs:text-xl lg:px-3"
              />

              <button onClick={onMessageSend} disabled={msgInput.length === 0}>
                <Icon
                  className="h-6 w-6 text-tx01 sm:h-7 sm:w-7"
                  icon="fluent:send-32-filled"
                />
              </button>
            </div>
          </div>
        ) : (
          // No Conversation Selected
          <div className="flex h-full flex-col items-center justify-center gap-6">
            <Image src={logoPic} alt="Logo of the game" className="h-52 w-52" />

            <div className="text-center text-3xl font-extralight">
              Select Conversation
            </div>

            <div className="w-1/2 text-center text-sm text-tx02">
              No conversation selected. Please choose a conversation to start
              chatting.
            </div>
          </div>
        )}
      </div>

      {/* Group Info */}
      {grInfo && props.group && (
        <GroupInfo
          onClick={() => setGrInfo(false)}
          conversation={conversation}
        />
      )}
    </div>
  );
}

function CustomizeGroup({
  onGroupTypeChange,
  onTitleChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onAvatarChange,
  groupType,
  title,
  password,
  passwordConfirm,
}) {
  return (
    <div className="mx-2">
      <div className="flex h-full flex-col items-center justify-center gap-7">
        {/* Title Section */}
        <div className="text-center text-2xl font-light tracking-widest xs:text-3xl">
          Customize Your Group
        </div>

        {/* Description Section */}
        <div className=" text-center text-xs text-tx02 xs:text-sm">
          Give your new group a personality with a name and an avatar. You can
          always change it later.
        </div>

        {/* Set Avatar Button */}
        <AvatarInput
          onChange={onAvatarChange}
          className="flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-full border border-dashed border-tx01"
        >
          <Icon className="h-10 w-10 text-tx02" icon="solar:upload-broken" />
          <div className="font-light tracking-wider">UPLOAD</div>
        </AvatarInput>

        <div className="flex w-full flex-col space-y-6 px-5 text-xs font-light tracking-wider text-tx02 xs:space-y-8 xs:text-sm md:space-y-10">
          {/* Group Name Input */}
          <div>
            <label>Group Name:</label>
            <input
              onChange={(event) => onTitleChange?.(event.target.value)}
              value={title}
              className="h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
            ></input>
          </div>

          {/* Group Type Dropdown */}
          <div>
            <label>Select Group Type:</label>
            <select
              value={groupType}
              onChange={(event) => onGroupTypeChange?.(event.target.value)}
              className="h-6 w-full rounded-sm border-b bg-bg03 px-1 text-tx01 xs:h-8 sm:rounded-md"
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
              <option value="PROTECTED">Protected</option>
            </select>
          </div>

          {/* {/* Password Input Section (visible if group type is 'protected') */}
          <div
            className={clsx(
              groupType === "PROTECTED" ? "visible" : "invisible",
            )}
          >
            <label>Password:</label>
            <input
              onChange={(event) => onPasswordChange?.(event.target.value)}
              value={password}
              className="mb-2 h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
              type="password"
            ></input>

            <label>Confirm:</label>
            <input
              onChange={(event) =>
                onPasswordConfirmChange?.(event.target.value)
              }
              value={passwordConfirm}
              className="h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
              type="password"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

const createGroupSchema = Joi.object({
  groupType: Joi.string().valid("PUBLIC", "PRIVATE", "PROTECTED").required(),
  title: Joi.string().required(),
  password: Joi.when("groupType", {
    is: Joi.valid("PROTECTED"),
    then: Joi.string().required(),
  }),
  passwordConfirm: Joi.when("groupType", {
    is: Joi.valid("PROTECTED"),
    then: Joi.valid(Joi.ref("password")),
  }),
  avatar: Joi.invalid(null),
});

function NewGroup({ onGroupClick, ...props }) {
  // State to track the progress to the next step
  const [next, setNext] = useState(false);
  const { data: friends } = useSWR("/users/friends");
  const [selectedFriends, setSelectedFriends] = useState([]);

  const [groupType, setGroupType] = useState("PUBLIC");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [avatar, setAvatar] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const data = {
    groupType,
    title,
    password,
    passwordConfirm,
    members: selectedFriends.map((friend) => friend.id),
    avatar,
  };

  async function createGroup() {
    const { error, value } = createGroupSchema.validate(data, {
      allowUnknown: true,
    });

    if (error) return enqueueSnackbar("Invalid input", { variant: "error" });

    const response = await axios.post("/chat/group", {
      type: value.groupType,
      title: value.title,
      members: value.members,
      password: value.password,
    });

    const formData = new FormData();

    formData.append("avatar", value.avatar);

    await axios.post(`/chat/group/${response.data.id}`, formData);
    await mutate("/chat/group");

    enqueueSnackbar("Success", { variant: "success" });
  }

  const handleChange = (e, friend) => {
    if (e.target.checked) {
      setSelectedFriends([...selectedFriends, friend]);
    } else {
      setSelectedFriends(selectedFriends.filter((f) => f.id !== friend.id));
    }
  };

  return (
    <div
      className="no-scrollbar relative flex h-full w-full flex-grow flex-col justify-between space-y-2 overflow-auto
     border-tx03 bg-bg02 sm:w-[45%] sm:max-w-[25rem] sm:border-r xl:w-2/5 xl:flex-none"
    >
      {/* Top Section */}
      <div
        className="sticky top-0 flex h-14 w-full flex-none items-center
            space-x-3 border-b border-tx01 bg-bg03 px-2 sm:h-16"
      >
        {/* Return Button */}
        <button
          onClick={
            next
              ? () => {
                  setNext(false);
                }
              : onGroupClick
          }
        >
          <Icon
            className="ml-1 h-8 w-8 text-tx01 xs:ml-2 xs:h-9 xs:w-9 sm:ml-3"
            icon="solar:arrow-left-broken"
          />
        </button>

        {/* Title */}
        <div className="text-left text-base capitalize tracking-widest text-tx02 xs:text-lg xs:tracking-[3px]">
          {next ? "new group" : "Add group members"}
        </div>
      </div>
      {/* Render either CustomizeGroup or FrList based on the 'next' state */}
      {next ? (
        <CustomizeGroup
          onGroupTypeChange={setGroupType}
          onTitleChange={setTitle}
          onPasswordChange={setPassword}
          onPasswordConfirmChange={setPasswordConfirm}
          onAvatarChange={setAvatar}
          groupType={groupType}
          title={title}
          password={password}
          passwordConfirm={passwordConfirm}
        />
      ) : (
        <div className="flex-grow">
          {/* Friends */}
          {friends?.map((friend, index) => {
            return (
              <div
                key={index}
                className="flex w-full border-b border-tx03 p-2 hover:bg-tx03"
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

                {/* Checkbox for friend selection */}
                <input
                  className=" m-3"
                  type="checkbox"
                  onChange={(e) => handleChange(e, friend)}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Next Button */}
      <button
        className={`sticky bottom-5 left-[80%] flex h-11 w-11 flex-none items-center justify-center rounded-full ${
          selectedFriends.length === 0
            ? "cursor-not-allowed bg-tx02"
            : "bg-tx01"
        }`}
        disabled={selectedFriends.length === 0}
        onClick={
          !next
            ? () => {
                setNext(true);
              }
            : () => createGroup()
        }
      >
        <Icon
          className="h-8 w-8 text-tx03"
          icon={next ? "solar:check-read-broken" : "solar:arrow-right-broken"}
        />
      </button>
    </div>
  );
}

function NewChat({ onChatClick }) {
  const [newGroup, setNewGroup] = useState(false);
  return (
    <>
      {newGroup ? (
        <NewGroup onGroupClick={() => setNewGroup(false)} />
      ) : (
        <div className="no-scrollbar flex w-full flex-grow flex-col overflow-auto border-tx03 bg-bg02 sm:w-1/2 sm:max-w-[25rem] sm:border-r  xl:flex-none">
          <div
            className="sticky top-0 flex h-14 w-full flex-none items-center
            space-x-3 border-b border-tx01 bg-bg03 px-2 sm:h-16"
          >
            {/* Return Button */}
            <button onClick={onChatClick}>
              <Icon
                className="ml-1 h-8 w-8 text-tx01 xs:ml-2 xs:h-9 xs:w-9 sm:ml-3"
                icon="solar:arrow-left-broken"
              />
            </button>

            {/* Title */}
            <div className="text-left text-base capitalize tracking-widest text-tx02 xs:text-lg xs:tracking-[3px]">
              new chat
            </div>
          </div>

          {/* Flex container new group*/}
          <div
            className="flex cursor-pointer border-b border-tx02 p-2 hover:bg-tx03"
            onClick={() => setNewGroup(true)}
          >
            <div className="flex flex-1 items-center">
              {/* Avatar */}
              <Icon
                className="mr-2 h-12 w-12 flex-none rounded-full bg-tx02 p-[2px] text-tx04 xs:mr-3 xs:h-14 xs:w-14"
                icon="solar:users-group-two-rounded-bold-duotone"
              />

              {/* Friend Name */}
              <div className="truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
                New Group
              </div>
            </div>
          </div>

          <div className="mx-3 my-4 text-base font-light tracking-wide text-tx02 xs:text-lg xs:tracking-widest">
            New Direct Message
          </div>

          {/* <FrList /> */}
          <Friends />
        </div>
      )}
    </>
  );
}

function Messages(props) {
  const [directMsg, setDirectMsg] = useState(true);
  const [groupMsg, setGroupMsg] = useState(true);

  return (
    <div
      className={clsx(
        "flex h-full flex-grow flex-col space-y-2 border-tx03 bg-bg02",
      )}
    >
      {/* Direct Msgs */}
      <BoxMessages
        onClick={() => {
          directMsg && groupMsg ? setGroupMsg(false) : setGroupMsg(true);
          !directMsg ? setDirectMsg(true) : undefined;
        }}
        activ={directMsg}
        title="Direct Messages"
        messages={<DirectMessage onConversation={props.onDirectConversation} />}
      />

      {/* Group Msgs */}
      <BoxMessages
        onClick={() => {
          groupMsg && directMsg ? setDirectMsg(false) : setDirectMsg(true);
          !groupMsg ? setGroupMsg(true) : undefined;
        }}
        activ={groupMsg}
        title="Group Messages"
        group={true}
        messages={<GroupMessage onConversation={props.onGroupConversation} />}
      />
    </div>
  );
}

export default function Home() {
  const { data } = useSWR("/users/me");
  const [group, setGroup] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [conversation, setConversation] = useState(null);

  return (
    <main className="flex h-screen max-h-screen flex-col bg-bg01 text-tx01">
      {/* top of the window */}
      <Title />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden xl:block">
          <Header />
        </div>

        <div className="sm:bg-bg0 mx-auto flex max-w-[1500px] flex-1 flex-col">
          {/* Header */}
          <div className="xl:hidden">
            <Header />
          </div>

          {/* content */}
          <div className="flex h-52 flex-1 bg-bg01 p-3 sm:p-5">
            {newChat ? (
              <NewChat
                onChatClick={() => {
                  setNewChat(false);
                }}
              />
            ) : (
              <div
                className={clsx(
                  conversation && "hidden lg:flex",
                  "flex w-full flex-col border-tx03 bg-bg02 sm:max-w-[25rem] sm:border-r xl:flex-none",
                )}
              >
                {/* Serach and new cnv */}
                <div className="flex h-14 items-center space-x-2 border-b border-tx01 bg-tx02 px-3 py-2 xs:h-16">
                  {/* My Avatar */}
                  <Image
                    className="my-1 h-11 w-11 rounded-full border-[1.5px] border-tx03
                    object-cover p-[1px] xs:h-[52px] xs:w-[52px] xs:p-[2px]"
                    src={data?.avatar}
                    quality={100}
                    width={56}
                    height={56}
                  />

                  {/* Search */}
                  <Search />

                  {/* new Chat */}
                  <button
                    className="texe-tx02 hover:text-tx01"
                    onClick={() => {
                      setNewChat(true);
                    }}
                  >
                    <Icon
                      className="h-6 w-6 text-tx03 xs:h-7 xs:w-7"
                      icon="iconoir:chat-add"
                    />
                  </button>
                </div>

                {/* messages */}
                <div className="h-10 flex-grow">
                  <Messages
                    onDirectConversation={(conversation) => {
                      setConversation(conversation);
                      setGroup(false);
                    }}
                    onGroupConversation={(conversation) => {
                      setConversation(conversation);
                      setGroup(true);
                    }}
                  />
                </div>
              </div>
            )}

            {/* conversation */}
            <ConversationBox
              conversation={conversation}
              group={group}
              onClick={() => {
                setConversation(null);
              }}
            />
          </div>
        </div>

        {/* <div>
          <RightBar
            menu={
              <div className="flex h-3/4 w-full items-center justify-center ">
                <Friends />
              </div>
            }
          />
        </div> */}
      </div>
    </main>
  );
}
