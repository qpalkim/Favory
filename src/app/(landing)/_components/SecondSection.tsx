import { BookOpen, Clapperboard, Music4, Tv, User } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo/logo_white.svg";

export default function SecondSection() {
  return (
    <section className="mx-auto flex w-fit flex-col justify-center px-4 lg:w-full lg:flex-row lg:items-center lg:justify-between">
      <div className="relative flex h-[210px] w-[312px] items-center justify-center overflow-hidden rounded-xl bg-white bg-radial from-green-600 to-green-500 shadow-2xl md:h-[290px] md:w-[488px] lg:h-[412px] lg:w-[694px]">
        <div className="border-black-200 absolute aspect-square w-[100px] rounded-full border border-dashed md:w-[160px] lg:w-[232px]"></div>
        <div className="border-black-200 absolute aspect-square w-[200px] rounded-full border md:w-[312px] lg:w-[432px]"></div>
        <div className="border-black-200 absolute aspect-square w-[280px] rounded-full border md:w-[450px] lg:w-[632px]"></div>
        <Image
          src={logo}
          alt="로고 아이콘"
          className="z-50 w-[92px] md:w-[127px] lg:w-[182px]"
        />
        <div className="absolute top-[25%] left-[55%] rounded-full border border-green-600 bg-green-100 p-2 shadow-md md:p-3">
          <Music4
            className="h-[15px] w-[15px] md:h-[19px] md:w-[19px] lg:h-[28px] lg:w-[28px]"
            color="#1f4b2c"
            strokeWidth={1}
            aria-label="음악 아이콘"
          />
        </div>
        <div className="absolute top-[62%] left-[30%] rounded-full border border-green-200 bg-white p-2 shadow-md md:p-3">
          <Clapperboard
            className="h-[15px] w-[15px] md:h-[19px] md:w-[19px] lg:h-[28px] lg:w-[28px]"
            color="#c3e956"
            strokeWidth={1}
            aria-label="영화 아이콘"
          />
        </div>
        <div className="absolute top-[50%] left-[77%] rounded-full border border-white bg-green-500 p-2 shadow-md md:p-3">
          <Tv
            className="h-[15px] w-[15px] md:h-[19px] md:w-[19px] lg:h-[28px] lg:w-[28px]"
            color="white"
            strokeWidth={1}
            aria-label="드라마 아이콘"
          />
        </div>
        <div className="absolute top-[80%] left-[68%] rounded-full border border-green-600 bg-green-100 p-2 shadow-md md:p-3">
          <BookOpen
            className="h-[15px] w-[15px] md:h-[19px] md:w-[19px] lg:h-[28px] lg:w-[28px]"
            color="#1f4b2c"
            strokeWidth={1}
            aria-label="책 아이콘"
          />
        </div>
        <div className="absolute top-[10%] left-[20%] rounded-full border border-white bg-green-600 p-2 shadow-md md:p-3">
          <User
            className="h-[24px] w-[24px] md:h-[36px] md:w-[36px] lg:h-[52px] lg:w-[52px]"
            color="white"
            strokeWidth={1}
            aria-label="유저 아이콘"
          />
        </div>
      </div>
      <h1 className="mt-6 text-right text-lg font-semibold text-white md:mt-[52px] md:text-xl lg:mt-0 lg:text-2xl">
        다른 사람에게 내 취향을
        <br />
        쉽고 빠르게 공유해 보세요
      </h1>
    </section>
  );
}
