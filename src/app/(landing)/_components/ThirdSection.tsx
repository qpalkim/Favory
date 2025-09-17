import Image from "next/image";
import logo from "@/assets/logo/logo.svg";

export default function ThirdSection() {
  return (
    <section className="mx-auto flex w-fit flex-col justify-center px-4 lg:w-full lg:flex-row-reverse lg:items-center lg:justify-between">
      <div className="relative h-[210px] w-[312px] overflow-hidden rounded-xl bg-white bg-gradient-to-b from-green-200 to-green-500 shadow-2xl md:h-[290px] md:w-[488px] lg:h-[412px] lg:w-[694px]">
        <div className="absolute top-[40%] left-6 flex items-center justify-center rounded-full border border-green-600 bg-green-500 p-2 shadow-md md:left-8 md:p-3 md:shadow-lg lg:left-12 lg:p-4">
          <Image
            src={logo}
            alt="로고 아이콘"
            className="aspect-square w-[28px] md:w-[42px] lg:w-[60px]"
          />
        </div>
        <div className="absolute top-[10%] left-20 w-[172px] p-2 md:top-[15%] md:left-44 md:w-[272px] lg:left-60 lg:w-[360px]">
          <div className="absolute inset-0 rounded-lg bg-white opacity-[0.36] shadow-md"></div>
          <div className="relative z-50">
            <p className="text-medium mb-1 text-[10px] text-black lg:text-sm">
              회원님 취향에 꼭 맞는 노래
            </p>
            <div className="h-[4px] w-[132px] rounded-md bg-gray-300 md:h-[5px] md:w-[215px] lg:h-[8px] lg:w-[306px]"></div>
          </div>
        </div>
        <div className="absolute top-[40%] left-28 w-[172px] p-2 md:top-[42%] md:left-36 md:w-[272px] lg:left-48 lg:w-[360px]">
          <div className="absolute inset-0 rounded-lg bg-white opacity-[0.36] shadow-md"></div>
          <div className="relative z-50">
            <p className="text-medium mb-1 text-[10px] text-black lg:text-sm">
              회원님을 위한 추천 도서
            </p>
            <div className="h-[4px] w-[132px] rounded-md bg-gray-300 md:h-[5px] md:w-[215px] lg:h-[8px] lg:w-[306px]"></div>
          </div>
        </div>
        <div className="absolute top-[70%] left-20 w-[172px] p-2 md:left-44 md:w-[272px] lg:left-60 lg:w-[360px]">
          <div className="absolute inset-0 rounded-lg bg-white opacity-[0.36] shadow-md"></div>
          <div className="relative z-50">
            <p className="text-medium mb-1 text-[10px] text-black lg:text-sm">
              회원님 취향에 꼭 맞는 노래
            </p>
            <div className="h-[4px] w-[132px] rounded-md bg-gray-300 md:h-[5px] md:w-[215px] lg:h-[8px] lg:w-[306px]"></div>
          </div>
        </div>
      </div>
      <h1 className="mt-6 text-lg font-semibold text-white md:mt-[52px] md:text-xl lg:mt-0 lg:text-2xl">
        내가 좋아할 만한 <br />
        맞춤 작품을 추천해 드려요
      </h1>
    </section>
  );
}
