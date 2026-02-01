"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/logo/logo.svg";

const cards = [
  {
    position:
      "top-[10%] left-20 w-[172px] p-2 md:top-[15%] md:left-44 md:w-[272px]",
    text: "마음을 울린 노래 가사",
  },
  {
    position:
      "top-[40%] left-28 w-[172px] p-2 md:top-[42%] md:left-36 md:w-[272px]",
    text: "잊혀지지 않는 책 속의 한 구절",
  },
  {
    position: "top-[70%] left-20 w-[172px] p-2 md:left-44 md:w-[272px]",
    text: "인상 깊은 드라마 대사",
  },
];

export default function SecondSection() {
  return (
    <motion.section
      className="mx-auto flex w-fit flex-col justify-center lg:w-full lg:flex-row-reverse lg:items-center lg:justify-between lg:px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="group relative h-[210px] w-[312px] overflow-hidden rounded-lg bg-gradient-to-b from-green-200 to-green-500 shadow-2xl transition-transform duration-300 hover:scale-105 md:h-[290px] md:w-[488px]"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-300/40 via-green-400/20 to-green-600/40"
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tl from-green-400/30 via-transparent to-green-500/30"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="absolute top-[40%] left-6 flex items-center justify-center rounded-full border border-green-600 bg-green-500 p-2 shadow-md md:left-8 md:p-3 md:shadow-lg">
          <Image
            src={logo}
            alt="Favory 로고"
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
            <div className="absolute inset-0 rounded-md bg-white/36 shadow-md" />
            <div className="relative z-50">
              <p className="text-black-500 mb-1 text-[10px] font-medium lg:text-sm">
                {card.text}
              </p>
              <div className="h-[4px] w-[132px] animate-pulse rounded-md bg-gray-300 md:h-[5px] md:w-[215px]"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <h1 className="mt-6 text-lg font-semibold text-white md:mt-[52px] md:text-xl lg:mt-0 lg:text-2xl">
        노래 가사부터 영화 속 대사까지
        <br />
        영감이 된 모든 순간을 작성해 보세요
      </h1>
    </motion.section>
  );
}
