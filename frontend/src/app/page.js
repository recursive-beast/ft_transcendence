import Image from "next/image";
import logoPic from "../images/logos/logo.png";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center flex-col bg-bg01 ">
      <div className="relative">
        <Image src={logoPic} alt="Logo of the game" width={200} height={200} />
        <button
          className="text-center text-tx01 text-xl font-extralight tracking-[4.80px] uppercase border border-tx01 rounded-full px-10 py-1
                     hover:text-tx03 hover:bg-tx01 ease-linear transition-colors duration-[400ms] absolute top-full translate-y-8 left-1/2 -translate-x-1/2 "
        >
          Start
        </button>
      </div>
    </main>
  );
}
