"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import useSWR, { mutate } from "swr";
import { useEffect, useState, useRef } from "react";
// import { useSocket } from "@/hooks/useSocket";
import * as Joi from "joi";

import logoPic from "@/images/logos/logo.png";
//games
import classic from "@/images/thems/logos/classic.png";
import beach from "@/images/thems/logos/beach.png";
import snow from "@/images/thems/logos/snow.png";
import sahara from "@/images/thems/logos/sahara.png";
import space from "@/images/thems/logos/space.png";
import jungle from "@/images/thems/logos/jungle.png";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

import {
  Title,
  Header,
  RightBar,
  Friends,
  status,
  Search,
} from "@/components/common";
import {
  differenceInMilliseconds,
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  isAfter,
  isBefore,
  isFuture,
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
import { enqueueSnackbar, useSnackbar } from "notistack";
import { differenceBy } from "lodash";
import { StatusCodes } from "http-status-codes";

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
        const avatars = members.map((member) => member.user.avatar);
        let avatarList = [];

        const two = avatars
          .slice(0, 2)
          .map((avatar, index) => (
            <Image
              key={index}
              alt=""
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
                alt=""
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

function BoxMessages({ onGroupClick, onClick, ...props }: any) {
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
      className="flex w-full items-center border-b border-tx02 py-3 text-tx02 last:border-0 hover:bg-bg02 hover:text-tx01"
      onClick={onClick}
    >
      <Icon className="ml-4 mr-3 h-6 w-6 flex-none" icon={props.icon} />
      <div className="truncatee mr-4 grow text-left font-light uppercase tracking-wider">
        {props.title}
      </div>
    </button>
  );
}

function NavOptions({ onClick, ...props }) {
  return (
    <button
      className="group flex h-full w-fit items-center rounded-l-md border-r px-3 text-tx02 hover:bg-bg02"
      onClick={onClick}
    >
      {/* button icon */}
      <Icon
        className="h-6 w-6 text-tx02 group-hover:mr-2 group-hover:text-tx01 2xl:h-8 2xl:w-8"
        icon={props.icon}
      />

      {/* button title >> visible in web vertion */}
      <div className="hidden text-xs font-light uppercase tracking-wider text-tx01 transition duration-500 group-hover:block">
        {props.title}
      </div>
    </button>
  );
}

function Options({ id }) {
  const [options, setOptions] = useState(false);
  const [newGm, setNewGame] = useState(false);
  const { data: user } = useSWR(`/users/${id}`);

  async function onBlock() {
    await axios.put(`/users/blocked/${id}`);
    mutate(`/users/${id}`);
  }

  async function onUnBlock() {
    await axios.delete(`/users/blocked/${id}`);
    mutate(`/users/${id}`);
  }

  return (
    <div className="absolute right-0 flex h-full items-center justify-center rounded-l-md border-l bg-bg03">
      {options && (
        <div className="flex h-full items-center">
          <NavOptions
            title="New Game"
            icon="solar:gamepad-broken"
            onClick={() => setNewGame(!newGm)}
          />
          {user.isBlocked ? (
            <NavOptions
              onClick={onUnBlock}
              title="unblock"
              icon="solar:user-block-rounded-broken"
            />
          ) : (
            <NavOptions
              onClick={onBlock}
              title="block"
              icon="solar:user-block-rounded-broken"
            />
          )}
        </div>
      )}

      <button
        className="h-full rounded-l-md px-2 hover:bg-bg02"
        onClick={() => {
          setOptions(!options);
          setNewGame(false);
        }}
      >
        {/* options buttion */}
        <Icon
          className="h-6 w-6 text-tx01 sm:h-7 sm:w-8"
          icon={
            !options
              ? "solar:alt-arrow-left-broken"
              : "solar:alt-arrow-right-broken"
          }
        />
      </button>

      {newGm && <NewGame id={id} onClick={() => setNewGame(!false)} />}
    </div>
  );
}

function GroupInfOptions({
  member,
  memberMe,
  conversation,
  open,
  onClose,
  onOpen,
}) {
  const [admin, setAdmin] = useState(member.role === "ADMIN");
  const socket = useSocket();

  const muted = isFuture(new Date(member.mutedUntil));

  function onUpgradeClick() {
    socket.emit("channel.upgrade", {
      channelId: conversation.id,
      userId: member.user.id,
    });
    onClose();
  }
  function onDowngradeClick() {
    socket.emit("channel.downgrade", {
      channelId: conversation.id,
      userId: member.user.id,
    });
    onClose();
  }
  function onBanClick() {
    socket.emit("channel.ban", {
      channelId: conversation.id,
      userId: member.user.id,
    });
    onClose();
  }
  function onMuteClick() {
    socket.emit("channel.mute", {
      channelId: conversation.id,
      userId: member.user.id,
    });
    onClose();
  }
  function onUnmuteClick() {
    socket.emit("channel.unmute", {
      channelId: conversation.id,
      userId: member.user.id,
    });
    onClose();
  }
  function onKickClick() {
    socket.emit("channel.kick", {
      channelId: conversation.id,
      userId: member.user.id,
    });
    onClose();
  }

  if (memberMe.id === member.id) return null;
  if (memberMe.role === "MEMBER") return null;
  if (memberMe.role === "ADMIN" && member.role !== "MEMBER") return null;

  return (
    <div>
      <button onClick={open ? onClose : onOpen}>
        <Icon
          className="mr-3 h-6 w-6 text-tx02 sm:h-7 sm:w-8"
          icon="circum:menu-kebab"
        />
      </button>
      <div
        className={clsx(
          "absolute right-5 top-full z-10 w-36 overflow-hidden rounded-lg border border-tx01 bg-bg01",
          open ? "block" : "hidden",
        )}
      >
        {/* admin */}
        {admin ? (
          <Option
            title="rm admin"
            icon="solar:shield-user-broken"
            onClick={() => {
              onDowngradeClick();
              setAdmin(!admin);
            }}
          />
        ) : (
          <Option
            title="set admin"
            icon="solar:shield-user-broken"
            onClick={() => {
              onUpgradeClick();
              setAdmin(!admin);
            }}
          />
        )}

        {/* Mute */}
        {muted ? (
          <Option
            title="unMute"
            icon="solar:muted-broken"
            onClick={onUnmuteClick}
          />
        ) : (
          <Option
            title="Mute"
            icon="solar:muted-broken"
            onClick={onMuteClick}
          />
        )}

        {/* Kick */}
        <Option
          title="kick"
          icon="ion:log-out-outline"
          onClick={() => {
            onClose();
            onKickClick();
          }}
        />

        {/* Block */}
        <Option
          title="ban"
          icon="solar:user-block-rounded-broken"
          onClick={() => {
            onClose();
            onBanClick();
          }}
        />
      </div>
    </div>
  );
}

function GroupInfo({ onClick, conversation, ...props }) {
  const [newTitle, setNewTitle] = useState(false);
  const [addMbr, setAddMbr] = useState(false);
  const [title, setTitle] = useState(conversation.title);
  // State to track the selected group type
  const [groupType, setGroupType] = useState(conversation.type);
  const { data: me } = useSWR("/users/me");
  const { data: friends } = useSWR("/users/friends");
  const [optionsId, setOptionsId] = useState(-1);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const socket = useSocket();

  useEffect(() => {
    setGroupType(conversation.type);
  }, [conversation]);

  //Handles the change event when the user selects a group type.
  const handleGroupTypeChange = (event) => {
    const type = event.target.value;
    setGroupType(type);

    if (type === "PUBLIC" || type === "PRIVATE")
      socket.emit("channel.type", { id: conversation.id, type });
  };

  const members = conversation.members;
  const memberMe = members.find((member) => member.user.id === me.id);

  function onExitClick() {
    socket.emit("channel.leave", conversation.id);
  }

  function onSetNewTitle() {
    socket.emit("channel.title", {
      channelId: conversation.id,
      newTitle: title,
    });
    setNewTitle(false);
  }

  async function onAvatarChange(avatar) {
    const id = conversation.id;

    await axios.postForm(`/chat/group/${id}`, { avatar });
    mutate("/chat/group");
    mutate(`/chat/group/${id}`);
  }

  function onAddMember(friend) {
    socket.emit("channel.add", {
      channelId: conversation.id,
      members: [friend.id],
    });
  }

  function onPasswordSend() {
    if (conversation.type === "PROTECTED") {
      socket.emit("channel.type", {
        id: conversation.id,
        type: groupType,
        newPassword,
        currentPassword,
      });
    } else {
      socket.emit("channel.type", {
        id: conversation.id,
        type: groupType,
        newPassword,
      });
    }
  }

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
            alt=""
            className="w-1/3 flex-none rounded-full sm:w-2/5"
            src={conversation.avatar}
            quality={100}
            width={56}
            height={56}
          />

          {/* Set Avatar Button */}
          <AvatarInput
            onChange={onAvatarChange}
            className="absolute flex h-full w-1/3 flex-col items-center justify-center gap-2 rounded-full border border-dashed border-tx01
           opacity-0 hover:bg-bg02/80 hover:opacity-100 sm:w-2/5 touch:bg-bg02/80 touch:opacity-100"
          >
            <Icon className="h-10 w-10 text-tx02" icon="solar:upload-broken" />
            <div className="text-[9px] font-light tracking-wider xs:text-xs sm:text-sm">
              UPLOAD NEW
            </div>
          </AvatarInput>
        </div>

        {/* title */}
        {newTitle ? (
          <div className="relative mx-3 flex items-end justify-center gap-2 border-b-2 sm:mx-5">
            <input
              className="w-full border-none bg-bg02 outline-none focus:border-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSetNewTitle()}
            />

            {/* Set Avatar Button */}
            <button onClick={onSetNewTitle}>
              <Icon
                className="h-5 w-5 text-tx02 xs:h-6 xs:w-6"
                icon="solar:check-read-broken"
              />
            </button>
          </div>
        ) : (
          <div className="relative flex items-end justify-center gap-2">
            <div className="text-base xs:text-lg">{conversation.title}</div>

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
          Group:&nbsp; <span>{conversation.type}</span>
        </div>
      </div>

      {/* Group Type and password */}
      {["ADMIN", "OWNER"].includes(memberMe.role) && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mb-3 flex flex-col gap-4 bg-bg02 px-5 py-8 font-light text-tx02"
        >
          <div>
            <label>Group Type:</label>
            <select
              value={groupType}
              onChange={handleGroupTypeChange}
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
              groupType === "PROTECTED" ? "block" : "hidden",
            )}
            // className=
          >
            {conversation.type === "PROTECTED" && (
              <label>Current Password:</label>
            )}
            {conversation.type === "PROTECTED" && (
              <input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mb-2 h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
                type="password"
                autoComplete="password-current"
              ></input>
            )}

            <label>New Password:</label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-2 h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
              type="password"
              autoComplete="password"
            ></input>

            <label>Confirm:</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
              type="password"
              autoComplete="password-confirm"
            ></input>

            <button
              disabled={newPassword && newPassword !== confirmPassword}
              className="mx-auto mt-4 rounded-full border border-tx01 p-1 px-2 text-center text-xs font-light uppercase tracking-wider text-tx01 transition-colors duration-[400ms] ease-linear
          hover:bg-tx01 hover:text-tx03 xs:text-sm "
              onClick={onPasswordSend}
            >
              Change Password
            </button>
          </div>
        </form>
      )}

      {/* Add New Freind */}
      {["ADMIN", "OWNER"].includes(memberMe.role) && (
        <div className="mb-3 flex flex-col bg-bg02">
          {/* button */}
          <div
            className="flex flex-1 cursor-pointer items-center border-b border-tx02 p-2 hover:bg-tx03"
            onClick={() => setAddMbr(!addMbr)}
          >
            {/* Avatar */}
            <Icon
              className="mr-2 h-10 w-10 flex-none rounded-full bg-tx02 p-[2px] text-tx04 xs:mr-3 xs:h-12 xs:w-12"
              icon="solar:user-plus-bold-duotone"
            />

            {/* Friend Name */}
            <div className="flex-grow truncate text-sm tracking-wide xs:text-base xs:tracking-widest">
              Add Members
            </div>

            <Icon
              className="mr-2 h-5 w-5 text-tx01 xs:h-6 xs:w-6"
              icon={
                addMbr
                  ? "solar:alt-arrow-up-broken"
                  : "solar:alt-arrow-down-broken"
              }
            />
          </div>

          {/* add Friends list */}
          {addMbr &&
            differenceBy(
              friends,
              conversation.members.map((member) => member.user),
              "id",
            ).map((friend, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full items-center border-b border-tx02 p-2 hover:bg-tx03"
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
                  <button
                    className="h-fit rounded-lg border px-2 font-extralight text-tx02
                            transition-colors duration-[400ms] ease-linear hover:bg-tx01 hover:text-tx03"
                    onClick={() => onAddMember(friend)}
                  >
                    Add
                  </button>
                </div>
              );
            })}
        </div>
      )}

      {/* members */}
      <div className="mb-3 bg-bg02">
        <div className="mx-3 my-2 text-sm font-light tracking-wide text-tx02 xs:text-base xs:tracking-widest">
          Group -&nbsp; <span>{conversation.members.length}</span>
          &nbsp;Members
        </div>
        {/* Friends List */}
        {conversation.members.map((member, index) => {
          return (
            <div
              className="relative flex items-center border-b border-tx02 p-2 hover:bg-tx03"
              key={index}
            >
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

              {/* Options Menu */}
              {
                <GroupInfOptions
                  open={member.user.id === optionsId}
                  member={member}
                  memberMe={memberMe}
                  conversation={conversation}
                  onClose={() => setOptionsId(-1)}
                  onOpen={() => setOptionsId(member.user.id)}
                />
              }
            </div>
          );
        })}
      </div>

      {/* exit */}
      <div className=" bg-bg02 text-pr01" onClick={onExitClick}>
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
  // State to control the visibility of group informations
  const [grInfo, setGrInfo] = useState(false);
  const ref = useRef(null);

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
  const members = conversation?.members;
  const memberMe = isGroup
    ? members?.find((member) => member.user.id === me.id)
    : null;
  const mutedUntil = new Date(memberMe?.mutedUntil || 0);
  const isMuted = isFuture(mutedUntil);

  const [muted, setMuted] = useState(isMuted);

  const isDifferentId = (user) => user.id !== me?.id;
  const user = conversation?.members.find(isDifferentId);
  const userId = user?.id;

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

    const updateMuted = () => {
      updateGroup();
      setMuted(true);
    };
    const updateUnMuted = () => {
      updateGroup();
      setMuted(false);
    };

    const exit = () => {
      updateGroup();
      setGrInfo(false);
      onClick();
    };

    socket.on("direct.message", updateDirect);
    socket.on("direct.message.seen", updateDirect);
    socket.on("channel.message", updateGroup);
    socket.on("channel.updated", updateGroup);
    socket.on("channel.upgraded", updateGroup);
    socket.on("channel.downgraded", updateGroup);
    socket.on("channel.kicked", updateGroup);
    socket.on("channel.muted", updateMuted);
    socket.on("channel.unmuted", updateUnMuted);
    socket.on("channel.added", updateGroup);
    socket.on("channel.exit", exit);
    socket.on("channel.banned", exit);
    socket.on("channel.kicked", exit);

    return () => {
      socket.off("direct.message", updateDirect);
      socket.off("direct.message.seen", updateDirect);
      socket.off("channel.message", updateGroup);
      socket.off("channel.updated", updateGroup);
      socket.off("channel.muted", updateMuted);
      socket.off("channel.unmuted", updateUnMuted);
      socket.off("channel.upgraded", updateGroup);
      socket.off("channel.downgraded", updateGroup);
      socket.off("channel.kicked", updateGroup);
      socket.off("channel.added", updateGroup);
      socket.off("channel.exit", exit);
      socket.off("channel.banned", exit);
      socket.off("channel.kicked", exit);
    };
  }, [id, muted]);

  useEffect(() => {
    if (isDirect) socket.emit("join.conversation", id);
    if (isGroup) socket.emit("room.join", id);
  }, [id, isDirect, isGroup, conversation]);

  const length = conversation?.messages.length;

  useEffect(() => {
    if (id && length) ref.current.scrollTo(0, 99999999999999);
  }, [id, length]);

  function onMessageSend() {
    if (isGroup) {
      socket.emit("channel.message", {
        groupConversationId: id,
        text: msgInput,
      });
    }

    if (isDirect) {
      const recieverId = conversation?.members.filter(
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
        ref={ref}
        className={clsx(
          (!conversation || grInfo) && "hidden sm:flex",
          "custom-scrl-bar custom-scrl-bar-chat flex h-full w-full flex-1 flex-col justify-between overflow-auto bg-bg02",
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
                      `/user/${conversation?.members.find(
                        (obj) => obj.id !== myID,
                      ).id}`,
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
                  id={
                    props.group
                      ? -1
                      : conversation?.members.find((obj) => obj.id !== myID).id
                  }
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
              {!props.group && userId !== undefined && <Options id={userId} />}
            </div>

            {/* Conversation Section */}
            <div className="flex grow flex-col justify-end">
              {conversation &&
                conversation.messages.map((message, index) => {
                  return (
                    <div key={index} className="my-1 flex items-start">
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
                            {message.sender.displayName}
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
                          <div className="break-all">
                            {Boolean(props.group)
                              ? message.text
                              : user?.blocked
                                  .map((elm) => elm.id)
                                  .includes(me.id) ||
                                user?.blockedBy
                                  .map((elm) => elm.id)
                                  .includes(me.id)
                              ? null
                              : message.text}
                          </div>
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
            <div className="sticky bottom-0 flex w-full items-center space-x-3 bg-bg03 px-3 py-2 xs:py-3 sm:px-5">
              <input
                disabled={
                  isMuted ||
                  (!props.group &&
                    (user?.blocked.map((elm) => elm.id).includes(me.id) ||
                      user?.blockedBy.map((elm) => elm.id).includes(me.id)))
                }
                value={msgInput}
                onChange={(event) => setMsgInput(event.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onMessageSend()}
                className="h-7 flex-1 rounded-xl border-none bg-tx02 px-2 text-base font-light outline-none focus:border-none xs:h-8 xs:text-xl lg:px-3"
              />

              <button
                onClick={onMessageSend}
                disabled={isMuted || msgInput.length === 0}
              >
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
            <Image alt="" src={logoPic} className="h-52 w-52" />

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
      {grInfo && props.group && conversation && (
        <GroupInfo
          onClick={() => setGrInfo(false)}
          conversation={conversation}
        />
      )}
    </div>
  );
}

function DirectConversationBox({ onClick, id, onConversation }) {
  const { data: user } = useSWR(`/users/${id}`);
  const socket = useSocket();
  const [msgInput, setMsgInput] = useState("");

  useEffect(() => {
    const onMessageRecieve = (message) => {
      onConversation(message.directConversation);
      mutate("/chat/direct");
    };

    socket.on("direct.message", onMessageRecieve);

    return () => {
      socket.off("direct.message", onMessageRecieve);
    };
  }, [id, socket, onConversation]);

  function onMessageSend() {
    socket.emit("direct.message", {
      recieverId: id,
      text: msgInput,
    });
  }

  return (
    <div className="flex flex-1">
      <div className="no-scrollbar flex h-full w-full flex-1 flex-col justify-between overflow-auto bg-bg02">
        <div className="flex flex-1 flex-col">
          <div className="sticky top-0 flex h-14 w-full items-center space-x-2 border-b bg-tx02 py-2 xs:h-16 sm:space-x-4">
            <button onClick={() => onClick()}>
              <Icon
                className="ml-1 h-8 w-8 text-tx03 xs:ml-2 xs:h-9 xs:w-9 sm:ml-3"
                icon="solar:arrow-left-broken"
              />
            </button>

            <Link href={`/user/${id}`} className="flex flex-grow items-center">
              <AvatarImage
                src={user?.avatar}
                id={id}
                className="my-1 mr-2 h-11 w-11 xs:h-[52px] xs:w-[52px] xs:p-[2px] lg:mr-3"
              />

              <div className="flex w-20 grow flex-col items-start">
                <div className="w-full truncate text-left text-sm font-semibold capitalize tracking-[widest] text-tx05 xs:text-base sm:tracking-[3px]">
                  {user?.fullName}
                </div>

                <div className="text-[8px] capitalize text-tx03 xs:text-[10px] sm:text-[14px]">
                  Click here to visit profile
                </div>
              </div>
            </Link>
            <Options id={id} />
          </div>

          <div className="flex grow flex-col justify-end" />

          <div className="sticky bottom-0 flex w-full  items-center space-x-3 bg-bg03 px-3 py-2 xs:py-3 sm:px-5">
            <input
              value={msgInput}
              onChange={(event) => setMsgInput(event.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onMessageSend()}
              className="h-7 flex-1 rounded-xl border-none bg-tx02 px-2 text-base outline-none focus:border-none xs:h-8 xs:text-xl lg:px-3"
            />

            <button onClick={onMessageSend} disabled={msgInput.length === 0}>
              <Icon
                className="pointer-events-none h-6 w-6 text-tx01 sm:h-7 sm:w-7"
                icon="fluent:send-32-filled"
              />
            </button>
          </div>
        </div>
      </div>
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
  avatar,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="mx-2">
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
          className="flex h-28 w-28 flex-col items-center justify-center gap-2 overflow-hidden rounded-full border border-dashed border-tx01"
        >
          {avatar ? (
            <Image
              alt=""
              className="h-full w-full object-cover"
              src={URL.createObjectURL(avatar)}
              width={300}
              height={300}
            />
          ) : (
            <>
              <Icon
                className="h-10 w-10 text-tx02"
                icon="solar:upload-broken"
              />
              <div className="font-light tracking-wider">UPLOAD</div>
            </>
          )}
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
              autoComplete="password"
            ></input>

            <label>Confirm:</label>
            <input
              onChange={(event) =>
                onPasswordConfirmChange?.(event.target.value)
              }
              value={passwordConfirm}
              className="h-6 w-full rounded-sm border-b border-none bg-bg03 px-1 text-tx01 outline-none focus:border-none xs:h-8 sm:rounded-md"
              type="password"
              autoComplete="password-confirm"
            ></input>
          </div>
        </div>
      </div>
    </form>
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

function NewGroup({ onGroupClick, onNewGroup, ...props }) {
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
    const result = createGroupSchema.validate(data, { allowUnknown: true });
    const { error, value } = result;
    const { groupType, title, members, password } = value;

    if (error) return enqueueSnackbar("Invalid input", { variant: "error" });

    let response;

    try {
      response = await axios.post("/chat/group", {
        type: groupType,
        title,
        members,
        password,
      });
    } catch (error) {
      const isSameTitle = error.response.status === StatusCodes.CONFLICT;
      const message = isSameTitle ? "Title already exists" : "Error";

      return enqueueSnackbar(message, { variant: "error" });
    }

    const id = response.data.id;
    response = await axios.postForm(`/chat/group/${id}`, { avatar });

    await mutate("/chat/group");
    enqueueSnackbar("Success", { variant: "success" });
    onNewGroup(response.data);
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
          avatar={avatar}
        />
      ) : (
        <div className="flex-grow">
          {friends?.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center gap-6">
              <Image alt="" src={logoPic} className="h-52 w-52" />

              <div className="text-center text-3xl font-extralight">
                Add Friends
              </div>

              <div className="w-4/5 text-center text-sm text-tx02">
                You have no Friends yet, Find new friends by using the search
                bar at the home page
              </div>
            </div>
          )}
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

function NewChat({ onChatClick, onNewGroup, onFriendClick }) {
  const [newGroup, setNewGroup] = useState(false);
  return (
    <>
      {newGroup ? (
        <NewGroup
          onNewGroup={onNewGroup}
          onGroupClick={() => setNewGroup(false)}
        />
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
          <Friends chat onClick={onFriendClick} />
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

function Theme({ onBreakClick, id, ...props }) {
  const socket = useSocket();
  const [breack, setBreack] = useState(0);
  const router = useRouter();
  return (
    <div className="flex w-full items-center border-b p-2 last:border-0">
      {/* Avatar */}
      <Image
        alt=""
        src={props.src}
        className="mr-2 h-12 w-12 object-cover xs:mr-3 xs:h-14 xs:w-14"
        quality={100}
        width={300}
        height={300}
      />

      {/* Breack point */}
      <div className="flex flex-grow justify-between">
        {[3, 5, 7, 9].map((value) => {
          return (
            <button
              className="h-6 w-6 rounded-lg border text-tx05 hover:bg-tx05 hover:text-tx04 sm:h-8 sm:w-8 xl:h-10 xl:w-10"
              key={value}
              onClick={() => {
                setBreack(value);
                socket.emit("invite", {
                  id,
                  mode: props.theme,
                  uid: uuidv4(),
                  value,
                });
                onBreakClick();
              }}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function NewGame({ id, onClick }) {
  const socket = useSocket();
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);
  useEffect(() => {
    socket.on("come", (body) => {
      router.push(`/game/playground/${body.mode}/${body.id}`);
    });

    return () => {
      socket.off("come");
    };
  }, []);
  return (
    <div
      className="absolute right-10 top-full flex h-fit w-48 flex-none flex-col rounded-lg
    border-2 bg-bg03 xs:w-56 sm:w-64"
    >
      {!waiting ? (
        <>
          <Theme
            id={id}
            src={classic}
            theme="classic"
            onBreakClick={() => setWaiting(true)}
          />
          <Theme
            id={id}
            src={beach}
            theme="beach"
            onBreakClick={() => setWaiting(true)}
          />
          <Theme
            id={id}
            src={snow}
            theme="snow"
            onBreakClick={() => setWaiting(true)}
          />
          <Theme
            id={id}
            src={sahara}
            theme="sahara"
            onBreakClick={() => setWaiting(true)}
          />
          <Theme
            id={id}
            src={space}
            theme="space"
            onBreakClick={() => setWaiting(true)}
          />
          <Theme
            id={id}
            src={jungle}
            theme="jungle"
            onBreakClick={() => setWaiting(true)}
          />
        </>
      ) : (
        <div className="my-3 flex h-full w-full flex-col items-center justify-center gap-8 text-xs sm:gap-4 sm:text-sm 2xl:gap-6 2xl:text-base">
          <div className="text-center text-lg font-extralight tracking-widest">
            Game pending
          </div>

          <div className="w-4/5 text-center font-light tracking-wide text-tx02">
            waiting for your friend to join the game, Make sure that your friend
            is present.
          </div>

          <Image
            alt=""
            className="mr-2 h-12 w-12 flex-none animate-pulse rounded-full border-[1.5px] border-tx02 object-cover p-[2px] xs:mr-3 xs:h-14 xs:w-14"
            src={classic}
            quality={100}
            width={300}
            height={300}
          />
          {/* cancle button */}
          <button
            onClick={() => {
              setWaiting(false);
              socket.emit("distroy.game");
            }}
            className={clsx(
              "z-10 mx-auto my-2 rounded-full border border-tx01 px-4 py-1 text-center text-sm font-light uppercase tracking-wider",
              "text-tx01 transition-colors duration-[400ms] ease-linear hover:bg-tx01 hover:text-tx03 sm:text-base",
            )}
          >
            cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { data } = useSWR("/users/me");
  const { data: direct } = useSWR("/chat/direct");
  const [group, setGroup] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [id, setId] = useState(null);

  async function onPublicGroupJoin(group, done) {
    try {
      const channelTitle = group.title;

      await axios.post("/chat/group/join", { channelTitle });
      setConversation(group);
      setId(null);
      mutate("/chat/group");
      mutate(`/chat/group/${group.id}`);
      setGroup(true);
      done();
    } catch (error) {
      const isBanned = error.response.status === StatusCodes.NOT_FOUND;

      if (isBanned)
        enqueueSnackbar("You're banned from the group", { variant: "error" });
    }
  }

  async function onProtectedGroupJoin(group, password, done) {
    try {
      const channelTitle = group.title;

      await axios.post("/chat/group/join", { channelTitle, password });
      setConversation(group);
      setId(null);
      mutate("/chat/group");
      mutate(`/chat/group/${group.id}`);
      setGroup(true);
      done();
    } catch (error) {
      enqueueSnackbar("Invalid Password", { variant: "error" });
    }
  }

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
                onNewGroup={(group) => {
                  setNewChat(false);
                  setConversation(group);
                  setGroup(true);
                  setId(null);
                }}
                onFriendClick={(friend) => {
                  setNewChat(false);

                  const isSameId = (user) => user.id === friend.id;
                  const isMember = (elem) => elem.members.some(isSameId);
                  const conversation = direct?.find(isMember);

                  if (conversation) {
                    setId(null);
                    setConversation(conversation);
                    setGroup(false);
                  } else {
                    setId(friend.id);
                    setConversation(null);
                    setGroup(false);
                  }
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
                    alt=""
                    className="my-1 h-11 w-11 rounded-full border-[1.5px] border-tx03
                    object-cover p-[1px] xs:h-[52px] xs:w-[52px] xs:p-[2px]"
                    src={data?.avatar}
                    quality={100}
                    width={56}
                    height={56}
                  />

                  {/* Search */}
                  <Search
                    chat={true}
                    onPublicGroupJoin={onPublicGroupJoin}
                    onProtectedGroupJoin={onProtectedGroupJoin}
                  />

                  {/* new Chat */}
                  <button
                    className="texe-tx02 hover:text-tx01"
                    onClick={() => {
                      setNewChat(true);
                      setConversation(null);
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
                      setId(null);
                    }}
                    onGroupConversation={(conversation) => {
                      setConversation(conversation);
                      setGroup(true);
                      setId(null);
                    }}
                  />
                </div>
              </div>
            )}

            {/* conversation */}
            {id === null && (
              <ConversationBox
                conversation={conversation}
                group={group}
                onClick={() => {
                  setConversation(null);
                }}
              />
            )}
            {id !== null && (
              <DirectConversationBox
                onConversation={(conversation) => {
                  setId(null);
                  setConversation(conversation);
                }}
                id={id}
                onClick={() => setId(null)}
              />
            )}
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
