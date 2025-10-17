"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/logo/logo.svg";

const cards = [
  {
    position:
      "top-[10%] left-20 w-[172px] p-2 md:top-[15%] md:left-44 md:w-[272px]",
    text: "회원님 취향에 꼭 맞는 노래",
  },
  {
    position:
      "top-[40%] left-28 w-[172px] p-2 md:top-[42%] md:left-36 md:w-[272px]",
    text: "회원님을 위한 추천 도서",
  },
  {
    position: "top-[70%] left-20 w-[172px] p-2 md:left-44 md:w-[272px]",
    text: "회원님 맞춤형 추천 콘텐츠",
  },
];

export default function ThirdSection() {
  return (
    <motion.section
      className="mx-auto flex w-fit flex-col justify-center lg:w-full lg:flex-row-reverse lg:items-center lg:justify-between lg:px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="relative h-[210px] w-[312px] overflow-hidden rounded-lg bg-gradient-to-b from-green-200 to-green-500 shadow-2xl transition-transform duration-300 hover:scale-105 md:h-[290px] md:w-[488px]">
        <div className="absolute top-[40%] left-6 flex items-center justify-center rounded-full border border-green-600 bg-green-500 p-2 shadow-md md:left-8 md:p-3 md:shadow-lg">
          <Image
            src={logo}
            alt="로고 아이콘"
            className="aspect-square w-[28px] md:w-[42px]"
          />
        </div>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className={`absolute ${card.position}`}
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.2 }}
          >
            <div className="absolute inset-0 rounded-md bg-white/36 shadow-md"></div>
            <div className="relative z-50">
              <p className="text-black-500 mb-1 text-[10px] font-medium lg:text-sm">
                {card.text}
              </p>
              <div className="h-[4px] w-[132px] animate-pulse rounded-md bg-gray-300 md:h-[5px] md:w-[215px]"></div>
            </div>
          </motion.div>
        ))}
      </div>
      <h1 className="mt-6 text-lg font-semibold text-white md:mt-[52px] md:text-xl lg:mt-0 lg:text-2xl">
        취향에 꼭 맞는 <br />
        맞춤 작품을 추천해 드려요
      </h1>
    </motion.section>
  );
}
