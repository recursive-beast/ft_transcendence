"use client";
import Image from "next/image";
import clsx from "clsx";
import { Icon } from "@iconify/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
// import required modules
import { Navigation } from "swiper/modules";

import { Title, Header, RightBar } from "@/components/common";
import { History } from "@/app/user/[id]/page";
import classic from "@/images/thems/classic.png";
import beach from "@/images/thems/beach.png";
import ice from "@/images/thems/ice.png";
import space from "@/images/thems/space.png";
import jungle from "@/images/thems/jungle.png";
import underwater from "@/images/thems/Underwater.png";

import classic2 from "@/images/thems/classic2.png";
import beach2 from "@/images/thems/beach2.png";
import ice2 from "@/images/thems/ice2.png";
import space2 from "@/images/thems/space2.png";
import jungle2 from "@/images/thems/jungle2.png";
import underwater2 from "@/images/thems/Underwater2.png";

import classic_bg from "@/images/thems/classicbg.jpg";
import beach_bg from "@/images/thems/beachbg.jpg";
import ice_bg from "@/images/thems/icebg.jpg";
import space_bg from "@/images/thems/spacebg.jpg";
import jungle_bg from "@/images/thems/junglebg.jpg";
import underwater_bg from "@/images/thems/waterbg.jpg";
function Theme(props) {
  return (
    <div
      className={clsx(
        "h-72 w-40 flex-none rounded-lg border drop-shadow-2xl xs:h-80 xs:w-48 sm:h-48 sm:w-96 2xl:h-[20rem] 2xl:w-[40rem]",
      )}
    >
      <div className="hidden sm:block">
        <Image
          className="rounded-lg object-cover w-full h-full"
          src={props.pic}
          quality={100}
        />
      </div>

      <div className="sm:hidden">
        <Image
          className="flex-none rounded-lg object-cover"
          fill
          src={props.minPic}
          quality={100}
        />
      </div>
    </div>
  );
}

function Slide(props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-tx03">
      <Image className="opacity-80" src={props.bg} quality={100} fill />

      {/* flex container for title and description */}
      <div className={clsx("z-10 mt-10 flex w-fit flex-col items-center justify-center rounded-lg border px-8",
              "pb-8 backdrop-blur-md xs:mt-14 xs:px-10 sm:mt-20 sm:px-20 sm:pb-10 md:mt-32", props.className)}>
        <div className={clsx("text-center text-4xl font-semibold uppercase leading-[62px]", props.className)}>
          {props.title}
        </div>
        <div className="mb-3 text-center text-xs font-extralight tracking-wide text-tx04 xs:text-sm sm:text-2xl">
          {props.des}
        </div>
        <Theme pic={props.pic} minPic={props.minPic} />
      </div>
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

        <div className="flex flex-1 flex-col justify-between overflow-hidden">
          <div className="z-10 xl:hidden">
            <Header
            // menu={<HomeMenu onClick={() => setSetting(true)} />}
            />
          </div>

          <Swiper
            navigation={{
              nextEl: "#navigation-right",
              prevEl: "#navigation-left",
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            <div className="absolute top-5 z-10 w-full text-center text-2xl font-extralight tracking-widest text-tx01 xs:top-14 xs:text-3xl sm:top-32 sm:text-5xl xl:text-6xl">
              Paddle smash
            </div>

            <SwiperSlide>
              <Slide
                title="classic"
                des="Traditional Paddle Clash"
                className="text-tx02"
                pic={classic}
                minPic={classic2}
                bg={classic_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="beach"
                des="Traditional Paddle Clash"
                className="text-[#EAD2AC]"
                pic={beach}
                minPic={beach2}
                bg={beach_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="space"
                des="Traditional Paddle Clash"
                className="text-tx05"
                pic={space}
                minPic={space2}
                bg={space_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="ice"
                des="Traditional Paddle Clash"
                className="text-[#20C3D0]"
                pic={ice}
                minPic={ice2}
                bg={ice_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="underwater"
                des="Traditional Paddle Clash"
                className="text-[#001642]"
                pic={underwater}
                minPic={underwater2}
                bg={underwater_bg}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Slide
                title="jungle"
                des="Traditional Paddle Clash"
                className="text-[#1C4226]"
                pic={jungle}
                minPic={jungle2}
                bg={jungle_bg}
              />
            </SwiperSlide>

            {/* <div className="absolute right-0 top-0 z-10 hidden h-full w-36 bg-gradient-to-l from-bg01 from-5% via-bg01/60 xl:block"></div>
            <div className="absolute left-0 top-0 z-10 hidden h-full w-36 bg-gradient-to-r from-bg01 from-5% via-bg01/60 xl:block"></div> */}
            <button
              id="navigation-left"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 text-tx05 disabled:text-tx02 sm:left-5 xl:left-10"
            >
              <Icon
                className="h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14 shadow-sm rounded-full"
                icon="solar:double-alt-arrow-left-broken"
              />
            </button>
            <button
              id="navigation-right"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-tx05 disabled:text-tx02 sm:right-5 xl:right-10"
            >
              <Icon
                className="h-8 w-8 sm:h-12 sm:w-12 lg:h-14 lg:w-14 shadow-sm rounded-full"
                icon="solar:double-alt-arrow-right-broken"
              />
            </button>
          </Swiper>
        </div>
      </div>
    </main>
  );
}
