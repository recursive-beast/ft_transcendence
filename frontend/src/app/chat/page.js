"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";

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

const friendsList = Array(30)
  .fill()
  .map(() => ({
    avatar: faker.internet.avatar(),
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
  return (
    <div>
      {groups.map((group, index) => {
        return (
          <div
            key={index}
            className="flex cursor-pointer border-b  border-tx03 p-2"
            onClick={() => {
              props.onConversation?.(group);
            }}
          >
            {/* flex div contain avatar, name and lastMessage */}
            <div className="flex flex-1 items-center">
              {/* avatar */}
              <Image
                className="mr-2 h-12 w-12 flex-none rounded-full border-[1.5px] border-tx02 object-cover p-[2px] xs:mr-3 xs:h-14 xs:w-14"
                src={group.avatar}
                // src={Pic03}
                quality={100}
                width={56}
                height={56}
              />

              {/* Group name and lastMessage time */}
              <div className="flex w-10 flex-grow flex-col">
                {/* name */}
                <div className="truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
                  {group.displayName}
                </div>

                {/* lastMessage */}
                <div className="truncate text-xs text-tx02 xs:text-sm">
                  {formatDistanceToNowStrict(group.messages.at(-1).date, {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>

            {/* div contain time end nbrMessages */}
            <div className="flex items-center justify-center -space-x-3 xs:-space-x-4 ">
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
            className="flex cursor-pointer border-b border-tx03 p-2"
            onClick={() => {
              props.onConversation?.(conversation);
            }}
          >
            {/* flex div contain avatar, name and lastMessage */}
            <div className="flex flex-1 items-center">
              {/* avatar */}
              <Image
                className={clsx(
                  "mr-2 h-12 w-12 flex-none rounded-full object-cover p-[3px] xs:mr-3 xs:h-14 xs:w-14",
                  status[conversation.status].border,
                )}
                src={conversation.avatar}
                // src={Pic03}
                quality={100}
                width={56}
                height={56}
              />

              <div className="flex flex-grow flex-col pr-1">
                {/* name and time */}
                <div className="flex items-center">
                  {/* name */}
                  <div className="w-10 flex-grow truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
                    {conversation.displayName}
                  </div>

                  {/* time */}
                  <div className="text-sm text-tx02">
                    {isToday(conversation.messages.at(-1).date)
                      ? format(conversation.messages.at(-1).date, "HH:mm")
                      : isYesterday(conversation.messages.at(-1).date)
                      ? "yesterday"
                      : format(conversation.messages.at(-1).date, "yyyy/MM/dd")}
                  </div>
                </div>

                {/* div contain last Message end nbrMessages */}
                <div className="flex items-center">
                  {/* lastMessage */}
                  <div className="w-10 flex-grow truncate text-xs text-tx02 xs:text-sm">
                    {conversation.messages.at(-1).text}
                  </div>

                  {/* nbrMessages */}
                  {conversation.unseen != 0 && (
                    <div className="ml-1 h-5 w-5 rounded-full bg-tx02 text-center text-sm font-semibold text-tx04">
                      {conversation.unseen}
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

function Option(props) {
  return (
    <button className="flex items-center border-b border-tx02 py-3 text-tx02 last:border-0 hover:text-tx01">
      <Icon className="ml-4 mr-3 h-6 w-6" icon={props.icon} />
      <div className="mr-4 grow font-light uppercase tracking-wider">
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
        className="sticky top-0 flex h-14 w-full flex-none items-center
            space-x-5 border-b border-tx01 bg-tx02 px-2 sm:h-16"
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
      <div className="flex flex-col gap-4 bg-bg02 py-8">
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
           opacity-0 hover:bg-bg02/80 hover:opacity-100 sm:w-2/5"
          >
            <Icon className="h-10 w-10 text-tx02" icon="solar:upload-broken" />
            <div className="text-xs font-light tracking-wider sm:text-sm">
              UPLOAD NEW
            </div>
          </button>
        </div>

        {/* title */}
        {newTitle ? (
          <div className="relative flex items-end justify-center gap-2 border-b-2 mx-3">
            <input
              className="w-full border-none bg-bg02 outline-none focus:border-none"
              value={props.conversation.displayName}
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
              {props.conversation.displayName}
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

        {/* members */}
        <div className="relative flex items-center justify-center text-tx02 font-light tracking-widest -m-3">
          Group -&nbsp; <span>{props.conversation.members}</span> &nbsp;Members
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

  return (
    <div className="flex flex-1">
      {/* conversation */}
      <div
        className={clsx(
          (!props.conversation || grInfo) && "hidden sm:flex",
          "no-scrollbar flex h-full w-full flex-1 flex-col justify-between overflow-auto bg-bg02",
        )}
      >
        {props.conversation ? (
          <div className="flex flex-1 flex-col">
            {/* Top Bar: Info */}
            <div className="sticky top-0 flex h-14 w-full items-center space-x-2 border-b bg-tx02 py-2 xs:h-16 sm:space-x-4">
              {/* Return Button */}
              <button onClick={onClick}>
                <Icon
                  className="ml-1 h-8 w-8 text-tx03 xs:ml-2 xs:h-9 xs:w-9 sm:ml-3"
                  icon="solar:arrow-left-broken"
                />
              </button>
              {/* Friend or group Info */}
              <button
                className="flex flex-grow items-center"
                onClick={() => (props.group ? setGrInfo(true) : undefined)}
              >
                {/* Avatar */}
                <Image
                  className={clsx(
                    "my-1 mr-2 h-11 w-11 rounded-full object-cover p-[1px] xs:h-[52px] xs:w-[52px] xs:p-[2px] lg:mr-3",
                    props.conversation &&
                      status[props.conversation.status].border,
                  )}
                  src={props.conversation.avatar}
                  quality={100}
                  width={56}
                  height={56}
                />

                <div className="flex flex-col items-start">
                  {/* Full Name */}
                  <div className="truncate text-sm font-semibold capitalize tracking-[widest] text-tx05 xs:text-base sm:tracking-[3px]">
                    {props.conversation && props.conversation.displayName}
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
              {props.conversation &&
                props.conversation.messages.map((message) => {
                  return (
                    <div className="my-3 flex items-start">
                      {props.group && !message.sent && (
                        <Image
                          className={clsx(
                            "ml-1 h-7 w-7 rounded-full object-cover",
                            status[message.status].border,
                          )}
                          src={message.avatar}
                          quality={100}
                          width={56}
                          height={56}
                        />
                      )}
                      <div className="flex w-full flex-col space-y-1">
                        {props.group && !message.sent && (
                          <div className="ml-1 mt-1 text-xs text-tx05">
                            {message.user}
                          </div>
                        )}
                        <div
                          className={clsx(
                            " flex w-fit max-w-[70%] flex-col rounded-lg px-2 py-[2px] 2xl:py-1",
                            message.sent
                              ? "ml-auto mr-5 rounded-tr-none bg-tx03"
                              : "mr-auto rounded-tl-none bg-tx02",
                            props.group ? "ml-1" : "ml-5",
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
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Input Message Section */}
            <div className="sticky bottom-0 flex w-full  items-center space-x-3 bg-bg03 px-3 py-2 xs:py-3 sm:px-5">
              <input className="h-7 flex-1 rounded-xl bg-tx02 text-base font-extralight xs:h-8 xs:text-xl" />

              <button>
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
      {grInfo && (
        <GroupInfo
          onClick={() => setGrInfo(false)}
          conversation={props.conversation}
        />
      )}
    </div>
  );
}

function FrList(props) {
  return (
    <div>
      {/* Map through the friendsList array to render each friend */}
      {friendsList.map((friend, index) => {
        return (
          <div
            key={index}
            className={clsx(
              "flex border-b border-tx03 p-2 hover:bg-tx03",
              !props.group && "cursor-pointer",
            )}
          >
            {/* Flex container for avatar and name */}
            <div className="flex flex-1 items-center">
              {/* Avatar */}
              <Image
                className="mr-2 h-12 w-12 flex-none rounded-full border-[1.5px] border-tx02 object-cover p-[2px] xs:mr-3 xs:h-14 xs:w-14"
                src={friend.avatar}
                quality={100}
                width={56}
                height={56}
              />

              {/* Friend Name */}
              <div className="truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
                {friend.displayName}
              </div>
            </div>

            {/* Checkbox for friend selection */}
            {props.group && <input className=" m-3" type="checkbox" />}
          </div>
        );
      })}
    </div>
  );
}

function CustomizeGroup() {
  // State to track the selected group type
  const [groupType, setGroupType] = useState("");

  //Handles the change event when the user selects a group type.
  const handleGroupTypeChange = (event) => {
    setGroupType(event.target.value);
  };

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
        <button className="flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-full border border-dashed border-tx01">
          <Icon className="h-10 w-10 text-tx02" icon="solar:upload-broken" />
          <div className="font-light tracking-wider">UPLOAD</div>
        </button>

        <div className="flex w-full flex-col space-y-6 px-5 text-xs font-light tracking-wider text-tx02 xs:space-y-8 xs:text-sm md:space-y-10">
          {/* Group Name Input */}
          <div>
            <label>Group Name:</label>
            <input className="h-6 w-full rounded-sm border-b bg-bg03 px-1 text-tx01 xs:h-8 sm:rounded-md"></input>
          </div>

          {/* Group Type Dropdown */}
          <div>
            <label>Select Group Type:</label>
            <select
              value={groupType}
              onChange={handleGroupTypeChange}
              className="h-6 w-full rounded-sm border-b bg-bg03 px-1 text-tx01 xs:h-8 sm:rounded-md"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="protected">Protected</option>
            </select>
          </div>

          {/* {/* Password Input Section (visible if group type is 'protected') */}
          <div
            className={clsx(
              groupType === "protected" ? "visible" : "invisible",
            )}
          >
            <label>Password:</label>
            <input className="h-6 w-full rounded-sm border-b bg-bg03 px-1 text-tx01 xs:h-8 sm:rounded-md"></input>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewGroup({ onGroupClick, ...props }) {
  // State to track the progress to the next step
  const [next, setNext] = useState(false);

  return (
    <div
      className="no-scrollbar relative flex h-full flex-grow flex-col justify-between space-y-2 overflow-auto
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
      {next ? <CustomizeGroup /> : <FrList group={true} />}

      {/* Next Button */}
      <button
        className="sticky bottom-5 left-[80%] flex h-11 w-11 flex-none items-center justify-center rounded-full bg-tx01"
        onClick={
          !next
            ? () => {
                setNext(true);
              }
            : onGroupClick
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
        <div className="no-scrollbar flex flex-grow flex-col overflow-auto border-tx03 bg-bg02 sm:w-1/2 sm:max-w-[25rem] sm:border-r  xl:flex-none">
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

          <FrList />
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

function Search() {
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
    setSearch(false);
  };
  // Set the search variable to true when the input focus
  const handleInputFocus = () => {
    setSearch(true);
  };

  return (
    <div className="flex h-7 grow items-center rounded-lg bg-tx03 xs:h-8">
      <button className="ml-3 w-10 xs:w-12" onClick={handleSearchClick}>
        <Icon
          className="h-4 w-4 text-tx02 xs:h-5 xs:w-5"
          icon={search ? "solar:arrow-left-broken" : "guidance:search"}
        />
      </button>

      <div className="grow pr-3 text-base font-light text-tx02  xs:text-xl">
        {!search && (
          <div onClick={handleSearchClick} className="absolute tracking-widest">
            Search
          </div>
        )}
        <input
          ref={inputRef}
          className="w-full border-none bg-tx03 outline-none focus:border-none"
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
        />
      </div>
    </div>
  );
}

export default function Home() {
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
                    src={Pic01}
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
