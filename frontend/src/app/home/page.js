"use client";

import {
  Title,
  Header,
  Friends,
  RightBar,
  Notificatin,
  Rank,
  Search,
  OTPInput,
} from "@/components/common";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import useSWR, { mutate } from "swr";
import axios from "axios";

//Profils
import Pic01 from "@/images/profils/01.jpg";
import Pic02 from "@/images/profils/02.jpg";
import Pic03 from "@/images/profils/03.png";
import Pic11 from "@/images/profils/11.jpg";
import Pic05 from "@/images/profils/05.jpg";
import Pic06 from "@/images/profils/06.jpg";
import Pic15 from "@/images/profils/15.jpg";

//achievements
import AvCmBack from "@/images/achievements/comeback.png";
import AvDemon from "@/images/achievements/demon.png";
import AvIron from "@/images/achievements/iron.png";
import AvMaster from "@/images/achievements/master.png";
import AvProdigy from "@/images/achievements/prodigy.png";
import AvShar from "@/images/achievements/shar.png";
import AvUnsto from "@/images/achievements/unsto.png";
import AvShoot from "@/images/achievements/shoot.png";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { AvatarInput } from "@/components/AvatarInput";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { AvatarImage } from "@/components/AvatarImage";
import { enqueueSnackbar } from "notistack";
import { StatusCodes } from "http-status-codes";

function MenuButton({ onClick, ...props }) {
  return (
    <button
      className="flex items-center space-x-2 rounded-lg border p-1 hover:bg-tx01 hover:text-tx04"
      onClick={onClick}
    >
      <Icon className="h-4 w-4 xs:h-5 xs:w-5" icon={props.icon} />
      <div className="text-base font-light capitalize xs:text-xl xs:tracking-[4px]">
        {props.title}
      </div>
    </button>
  );
}

function HomeMenu({ onClick }) {
  const [notif, setNotif] = useState(false);
  const router = useRouter();
  const socket = useSocket();

  return (
    <div className="z-10 flex h-full flex-1 flex-col justify-between gap-2 sm:gap-3">
      {/* search and Notificatin */}
      <div>
        <div className="flex items-center justify-between px-1 py-3">
          {/* search */}
          <Search home={true} />

          {/* notif */}
          <button
            className="hidden lg:block"
            onClick={() => {
              setNotif(!notif);
            }}
          >
            <Icon
              className={clsx("mb-1 h-7 w-7 text-tx01", notif && "text-tx02")}
              icon={
                notif
                  ? "icon-park-outline:close"
                  : "solar:notification-unread-broken"
              }
            />
          </button>
        </div>
        {notif && <Notificatin />}
      </div>

      {/* setting and log-out */}
      <div className="mb-5 flex items-center justify-between text-tx02">
        {/* setting button */}
        <MenuButton
          onClick={onClick}
          icon="solar:settings-broken"
          title="setting"
        />

        {/* log out button */}
        <MenuButton
          icon="fluent-mdl2:navigate-back"
          title="log out"
          onClick={async () => {
            await axios.get("/auth/logout");
            await mutate("/users/me");
            socket.disconnect();
            router.push("/");
          }}
        />
      </div>

      {/* Friends elements */}
      <Friends home={true} />
    </div>
  );
}

function ProfileInfo() {
  // import data
  const { data: me } = useSWR("/users/me");

  return (
    <section className="relative my-2 flex items-center justify-between xs:my-4">
      <div className="flex items-center">
        <AvatarImage
          src={me?.avatar}
          id={me?.id}
          className="mr-4 h-14 w-14 xs:ml-2 xs:mr-6 xs:h-20 xs:w-20 sm:ml-4 sm:mr-10 sm:h-28 sm:w-28"
        />

        <div className="flex flex-col">
          <div className="-mb-1 text-base font-extrabold uppercase text-tx02  xs:text-lg sm:text-xl">
            welcome
          </div>

          <div className="text-base font-semibold capitalize tracking-widest text-tx05 xs:text-lg sm:text-xl sm:tracking-[3px]">
            {me?.displayName}
          </div>

          <div className="text-[8px] font-light capitalize xs:text-xs sm:text-lg">
            The Paddle smash balls is waiting you
          </div>
        </div>
      </div>
    </section>
  );
}

function Rate(props) {
  return (
    <>
      <div className="mr-[2px] flex w-full flex-col items-center rounded-lg border border-tx05 px-1 py-1 text-[9px] xs:w-52 xs:px-3 xs:py-2 xs:text-[11px] sm:w-72 sm:rounded-3xl sm:px-5 sm:text-sm md:ml-5 md:w-80 md:px-8 lg:w-72 lg:px-5 xl:ml-14 xl:w-80 xl:px-8 2xl:ml-36">
        <div>
          <div className="uppercase tracking-wider text-tx01">
            wins:<span className="capitalize text-tx02"> last week: </span>{" "}
            <span className="text-tx05">{props.wins}</span>
          </div>

          <div className="flex items-end">
            <div className="mr-2 flex sm:mr-4">
              <div className="text-lg text-tx05 xs:text-xl sm:text-3xl">
                {props.nbrWin}
              </div>

              <Icon
                className="h-[10px] w-[10px] text-[#24E5A5] "
                icon="fluent-mdl2:up"
              />
            </div>

            <div className="mb-1 mr-1 text-tx02 sm:mr-3">
              Wins Rate: <span className="text-[#24E5A5]">{props.wn}</span>{" "}
            </div>
            <div className="mb-1 text-tx02">
              Up: <span className="text-[#24E5A5]">{props.up}</span>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="ml-[2px] flex w-full flex-col items-center rounded-lg border border-tx05 px-1 py-1 text-[9px] xs:w-52 xs:px-3 xs:py-2 xs:text-[11px] sm:w-72 sm:rounded-3xl sm:px-5 sm:text-sm md:mr-5 md:w-80 md:px-8 lg:w-72 lg:px-5 xl:mr-14 xl:w-80 xl:px-8 2xl:mr-36">
        <div>
          <div className="uppercase tracking-wider text-tx01">
            losses:<span className="capitalize text-tx02"> last week: </span>{" "}
            <span className="text-tx05">{props.losses}</span>
          </div>

          <div className="flex items-end">
            <div className="mr-2 flex sm:mr-4">
              <div className="text-lg text-tx05 xs:text-xl sm:text-3xl">
                {props.nbrLos}
              </div>

              <Icon
                className="h-[10px] w-[10px] text-[#E55F61] "
                icon="fluent-mdl2:down"
              />
            </div>

            <div className="mb-1 mr-1 text-tx02 sm:mr-3">
              lost Rate: <span className="text-[#E55F61]">{props.los}</span>{" "}
            </div>
            <div className="mb-1 text-tx02">
              Up: <span className="text-[#E55F61]">{props.down}</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PlayRate() {
  return (
    <section className="flex justify-between xs:my-3 sm:my-4">
      <Rate
        wins="+6"
        nbrWin="58"
        wn="60%"
        up="30%"
        //
        losses="+12"
        nbrLos="12"
        los="40%"
        down="53%"
      />
    </section>
  );
}

function Achiv({ locked, className, ...props }) {
  return (
    <div
      className=" mt-12 grid h-36 w-28 grid-rows-4 justify-items-center rounded-2xl border-[0.5px] border-t-0 px-1 pb-1
      xs:h-40 xs:w-32 sm:h-48 sm:w-36"
    >
      <div
        className={clsx(
          "rounded-full",
          !locked && "drop-shadow-[0px_6px_10px_#C0C0C0]",
        )}
      >
        <Image
          className={clsx(
            "h-11 w-11 rounded-full xs:h-12 xs:w-12 sm:h-14 sm:w-14",
            !locked && " -translate-y-5 scale-[1.8]",
            locked &&
              "-translate-y-3 scale-[1.5]  p-2 opacity-70 shadow-inner shadow-tx05",
          )}
          src={props.pic}
          quality={100}
        />
      </div>

      <div className="mt-5 text-sm capitalize text-tx05 xs:mt-7 sm:mt-8 sm:text-base">
        {props.title}
      </div>

      <div className="mt-2 text-center text-[9px] font-normal text-tx05/70 xs:mt-4 sm:text-[10px]">
        {props.description}
      </div>
      <div
        className={clsx(
          "mt-4 flex items-center text-xs text-tx02 xs:mt-5 sm:text-sm",
          !locked && "opacity-0",
        )}
      >
        <Icon
          className="mr-1 h-4 w-4 text-tx06 sm:h-5 sm:w-5"
          icon="solar:lock-broken"
        />
        <div>Locked</div>
      </div>
    </div>
  );
}

export function Achievement() {
  const ref = useHorizontalScroll();

  return (
    <section
      ref={ref}
      className="custom-scrl-bar mb-4 grid grid-flow-col gap-2 space-x-3 overflow-x-auto overflow-y-hidden text-tx05 sm:gap-6 lg:pt-5"
    >
      <Achiv
        pic={AvMaster}
        title="Pong master"
        description="Win 100 games of Pong"
      />
      <Achiv
        pic={AvShar}
        title="Sharpshooter"
        description="Score 50 points in a single game of Pong"
        locked
      />
      <Achiv
        pic={AvShoot}
        title="Unstoppable"
        description="Win 10 games of Pong in a row"
      />
      <Achiv
        pic={AvCmBack}
        title="Comeback Kid"
        description="Win a game of Pong after being down by 5 points or more"
        locked
      />
      <Achiv
        pic={AvDemon}
        title="Speed Demon"
        description="Win a game of Pong with a speed setting of 10"
      />
      <Achiv
        pic={AvProdigy}
        title="Pong Prodigy"
        description="Win a game of Pong with a score of 10-0"
        locked
      />
      <Achiv
        pic={AvIron}
        title="Iron Defense"
        description="Win a game of Pong without letting the ball get past your paddle"
        locked
      />
    </section>
  );
}

export function Ranking(props) {
  return (
    <section className="my-4 w-full text-[10px] font-light capitalize text-tx01 xs:text-xs sm:text-base">
      <div>
        <Rank
          pos="x"
          pic={Pic01}
          name="player"
          games="games"
          rate="rate"
          level="level"
          first
        />
        <Rank
          pos="1"
          pic={Pic01}
          name="syakoubinato"
          games="105"
          rate="78%"
          level="11"
        />
        <Rank
          pos="3"
          pic={Pic11}
          name="badrbansh"
          games="99"
          rate="73%"
          level="10"
        />
        <Rank
          pos="5"
          pic={Pic15}
          name="megashoot"
          games="97"
          rate="60%"
          level="9"
          index
        />
        <Rank
          pos="6"
          pic={Pic06}
          name="aitlandlia"
          games="100"
          rate="55%"
          level="7"
        />
        <Rank
          pos="9"
          pic={Pic05}
          name="moonshot"
          games="123"
          rate="40%"
          level="6"
        />
      </div>
    </section>
  );
}

function SettingButton({ label, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        "w-28 rounded-lg border border-tx01 py-1 text-tx05 transition-colors duration-[400ms] ease-linear hover:bg-tx01 hover:text-tx03 xs:w-36 lg:w-48",
        className,
      )}
    >
      <div className=" tracking-widest">{label}</div>
    </button>
  );
}

function SettingInput({ long, label, ...props }) {
  return (
    <div className="space-y-1 xs:space-y-2">
      <div className="text-xs tracking-normal xs:text-sm ">{label}</div>
      <input
        className={clsx(
          "h-6 w-24 rounded-sm border-none bg-tx02 px-2 outline-none focus:border-none xs:h-8 xs:w-36 sm:h-10 sm:w-44 sm:rounded-md lg:w-60",
          long && "w-40 xs:w-56 sm:w-80 lg:w-80",
        )}
        {...props}
      ></input>
    </div>
  );
}

function SettingSection({ onClick, ...props }) {
  const { data: me } = useSWR("/users/me");
  const [active, setActive] = useState("profile");
  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [qrcode, setQrCode] = useState();
  const [otp, setOTP] = useState("");

  async function onSave() {
    try {
      await axios.patch("/users/me", {
        displayName,
        fullName: firstName + " " + lastName,
      });

      if (avatar) await axios.postForm("users/me/avatar", { avatar });

      mutate("/users/me");
      enqueueSnackbar("Success", { variant: "success" });
      onClick();
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  }

  async function onOTPEnable() {
    try {
      await axios.patch("/auth/otp/enable", { otp });
      await mutate("/users/me");
      enqueueSnackbar("Success", { variant: "success" });
      setOTP("");
    } catch (error) {
      const status = error.response.status;
      const isInvalidOTP = status === StatusCodes.UNPROCESSABLE_ENTITY;
      const message = isInvalidOTP ? "Invalid one time password" : "Error";

      enqueueSnackbar(message, { variant: "error" });
    }
  }

  async function onOTPDisable() {
    try {
      await axios.patch("/auth/otp/disable");
      await mutate("/users/me");
      enqueueSnackbar("Success", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  }

  useEffect(() => {
    axios
      .patch("/auth/otp/generate")
      .then((res) => setQrCode(res.data.qr_code));
  }, []);

  return (
    <section className="fixed inset-0 z-20 flex items-center justify-center bg-bg01/90">
      <div className="flex h-4/5 w-11/12 flex-col rounded-2xl border-[1.5px] border-tx05 bg-bg01 px-2 xs:h-3/4 xs:px-4  sm:w-[30rem] sm:px-8 lg:h-2/3 lg:w-[40rem]">
        {/* fix */}
        <dev className="border-b border-tx03 pb-4 text-sm xs:pb-6 xs:text-base sm:pb-10 sm:text-lg">
          {/* top */}
          <div className="my-4 flex w-full items-center justify-between font-normal capitalize tracking-widest text-tx05 xs:my-7 sm:my-10 sm:tracking-[3px]">
            <div>account settings</div>
            <div className="flex justify-center space-x-2 xs:space-x-4 lg:space-x-6">
              {/* save button */}
              <button
                onClick={onSave}
                className="w-12 rounded-lg border border-tx01 xs:w-16 sm:w-20 sm:p-0"
              >
                <div className="font-light">Save</div>
              </button>

              {/* close button */}
              <button onClick={onClick}>
                <Icon
                  className="h-6 w-6 text-tx05 xs:h-7 xs:w-7"
                  icon="icon-park-outline:close"
                />
              </button>
            </div>
          </div>

          {/* button's */}
          <div className="my-2 flex items-center justify-between font-light text-tx05 sm:px-4 lg:mx-8">
            <SettingButton
              label="Profile"
              className={active === "profile" && "bg-tx02"}
              onClick={() => setActive("profile")}
            />
            <SettingButton
              label="Two-Factor"
              className={active === "two-factor" && "bg-tx02"}
              onClick={() => setActive("two-factor")}
            />
          </div>
        </dev>

        {/* setting */}
        <div className="no-scrollbar flex-1 overflow-auto pt-10 sm:mx-5 lg:mx-11">
          {/* profile */}
          {active === "profile" && (
            <div className="flex flex-col justify-between text-sm tracking-widest xs:text-base sm:text-lg">
              {/* avatar */}
              <div className="mb-8 xs:mb-12 lg:mb-16">
                <div className="mb-3 lg:mb-5">Your Avatar</div>
                <div className="flex items-end">
                  <Image
                    className="mr-4 h-16 w-16 rounded-full object-cover xs:ml-2 xs:mr-6 xs:h-20 xs:w-20 sm:ml-4 sm:mr-10 sm:h-28 sm:w-28"
                    src={avatar ? URL.createObjectURL(avatar) : me?.avatar}
                    quality={100}
                    width={56}
                    height={56}
                  />
                  <div>
                    <AvatarInput
                      onChange={setAvatar}
                      className="w-28 rounded-lg border border-tx01 py-1 tracking-widest text-tx05 transition-colors duration-[400ms] ease-linear hover:bg-tx01 hover:text-tx03 xs:w-36 lg:w-48"
                    >
                      Upload New
                    </AvatarInput>
                    <div className="text-[0.51rem] font-light tracking-normal xs:text-[0.67rem] lg:mt-2 lg:text-xs">
                      Avatar help your friends recognize you
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>

              {/* information */}
              <div>
                <div className="mb-3 xs:mb-6">Your Informatin</div>
                <div className="mb-4 flex justify-between xs:mb-7 lg:mb-10">
                  <SettingInput
                    label="First Name"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(
                        e.target.value.trimStart().replace(/ +/g, " "),
                      )
                    }
                  />
                  <SettingInput
                    label="Last Name"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(
                        e.target.value.trimStart().replace(/ +/g, " "),
                      )
                    }
                  />
                </div>
                <SettingInput
                  label="User Name"
                  long
                  value={displayName}
                  onChange={(e) =>
                    setDisplayName(
                      e.target.value.trimStart().replace(/ +/g, " "),
                    )
                  }
                />
              </div>
            </div>
          )}

          {/* two-factor */}
          {active === "two-factor" && (
            <div className="flex flex-col justify-between">
              {/* text */}
              <div className="mb-4 xs:mb-12 lg:mb-16">
                <div className="mb-3 text-xs capitalize xs:text-sm xs:tracking-widest sm:text-lg lg:mb-5 lg:text-xl">
                  set up two-factor authentication
                </div>

                <div className="text-justify text-[0.5rem] capitalize text-tx02 xs:text-[0.65rem] sm:text-xs lg:text-sm">
                  to be able to authorize transactions you need to scan this QR
                  code with your authentication app and enter the verification
                  code below
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Image
                    className="my-5 h-32 w-32 rounded-xl xs:h-40 xs:w-40 sm:my-6 sm:h-44 sm:w-44 lg:my-9 lg:h-52 lg:w-52"
                    src={qrcode}
                    quality={100}
                    width={300}
                    height={300}
                  />

                  {!me.otpIsEnabled && (
                    <div className="mb-3 text-xs capitalize xs:text-sm xs:tracking-widest sm:text-lg lg:mb-5 lg:text-xl">
                      verification code
                    </div>
                  )}

                  <div className="flex flex-col items-center">
                    {!me.otpIsEnabled && (
                      <div className="mb-5 flex space-x-1 xs:mb-12">
                        {Array(6)
                          .fill()
                          .map((_, index) => (
                            <OTPInput
                              key={index}
                              onChange={setOTP}
                              fullValue={otp}
                              index={index}
                              className="h-10 w-7 rounded-lg border-none bg-tx01 text-center text-tx04 outline-none focus:border-none xs:h-14 xs:w-10 xs:rounded-2xl"
                            />
                          ))}
                      </div>
                    )}

                    <div>
                      <button
                        disabled={!me.otpIsEnabled && !otp}
                        onClick={me.otpIsEnabled ? onOTPDisable : onOTPEnable}
                        className="mb-3 text-xl font-extralight tracking-[6px] xs:text-3xl"
                      >
                        {me.otpIsEnabled ? "disable" : "enable"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [setting, setSetting] = useState(false);
  return (
    <main className="flex h-screen max-h-screen flex-col bg-bg01 text-tx01 ">
      {/* top of the window */}
      <Title />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden xl:block">
          <Header
            home={true}
            menu={<HomeMenu onClick={() => setSetting(true)} />}
          />
        </div>

        <div className="mx-auto flex max-w-[1400px] flex-1 flex-col justify-between overflow-hidden">
          <div className="z-10 xl:hidden">
            <Header
              home={true}
              menu={<HomeMenu onClick={() => setSetting(true)} />}
            />
          </div>

          <div className="no-scrollbar flex flex-1 flex-col justify-between overflow-auto px-2 xs:px-3 sm:px-5 lg:px-8">
            <ProfileInfo />
            <PlayRate />
            <Ranking />
            <div>
              <Achievement />
            </div>
          </div>
        </div>

        <RightBar menu={<HomeMenu onClick={() => setSetting(true)} />} />
      </div>

      {setting && (
        <SettingSection
          onClick={() => {
            setSetting(false);
          }}
        />
      )}
    </main>
  );
}
