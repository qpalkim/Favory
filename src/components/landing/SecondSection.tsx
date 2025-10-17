"use client";
import { motion } from "framer-motion";
import { BookOpen, Clapperboard, Music4, Tv, User } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo/logo_white.svg";

const icons = [
  {
    component: Music4,
    position: "top-[20%] left-[56%]",
    color: "#1f4b2c",
    bg: "bg-green-100",
  },
  {
    component: Clapperboard,
    position: "top-[62%] left-[32%]",
    color: "#076653",
    bg: "bg-white",
  },
  {
    component: Tv,
    position: "top-[45%] left-[78%]",
    color: "white",
    bg: "bg-green-500",
  },
  {
    component: BookOpen,
    position: "top-[78%] left-[68%]",
    color: "#1f4b2c",
    bg: "bg-green-200",
  },
  {
    component: User,
    position: "top-[10%] left-[20%]",
    color: "white",
    bg: "bg-green-600",
    big: true,
  },
];

export default function SecondSection() {
  return (
    <motion.section
      className="mx-auto flex w-fit flex-col justify-center lg:w-full lg:flex-row lg:items-center lg:justify-between lg:px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="relative flex h-[210px] w-[312px] items-center justify-center overflow-hidden rounded-lg bg-white bg-radial from-green-600 to-green-500 shadow-2xl transition-transform duration-300 hover:scale-105 md:h-[290px] md:w-[488px]">
        <div className="border-black-200 absolute aspect-square w-[100px] rounded-full border border-dashed md:w-[160px]"></div>
        <div className="border-black-200 absolute aspect-square w-[200px] rounded-full border md:w-[312px]"></div>
        <div className="border-black-200 absolute aspect-square w-[280px] rounded-full border md:w-[450px]"></div>
        <Image
          src={logo}
          alt="로고 아이콘"
          className="z-50 w-[92px] md:w-[127px]"
        />
        {icons.map((IconObj, i) => {
          const Icon = IconObj.component;
          return (
            <motion.div
              key={i}
              className={`absolute ${IconObj.position} rounded-full border shadow-md ${IconObj.bg} ${
                IconObj.big ? "p-2 md:p-3" : "p-2 md:p-3"
              }`}
              style={{ borderColor: IconObj.color }}
              initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: i * 0.2,
              }}
            >
              <Icon
                className={`${
                  IconObj.big
                    ? "h-[24px] w-[24px] md:h-[36px] md:w-[36px]"
                    : "h-[15px] w-[15px] md:h-[19px] md:w-[19px]"
                }`}
                color={IconObj.color}
                strokeWidth={1}
              />
            </motion.div>
          );
        })}
      </div>
      <h1 className="mt-6 text-right text-lg font-semibold text-white md:mt-[52px] md:text-xl lg:mt-0 lg:text-2xl">
        다른 사람에게 내 취향을
        <br />
        쉽고 빠르게 공유해 보세요
      </h1>
    </motion.section>
  );
}
