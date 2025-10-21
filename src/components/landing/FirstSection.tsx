"use client";
import { motion } from "framer-motion";
import { BookOpen, Clapperboard, Music4, Tv } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function SkeletonRow({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <motion.div
      className="flex h-[32px] w-[215px] gap-2 rounded-md bg-white shadow-md md:h-[50px] md:w-[336px]"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="bg-black-100 flex min-h-[32px] min-w-[32px] items-center justify-center rounded-tl-md rounded-bl-md md:w-[50px]">
        <Icon
          strokeWidth={1}
          className="h-[14px] w-[14px] text-green-600 md:h-[19px] md:w-[19px]"
          aria-label={`${label} 아이콘`}
        />
      </div>
      <div className="py-1 md:py-2 lg:py-3">
        <div className="bg-black-100 h-[4px] w-[32px] animate-pulse rounded-md md:h-[5px] md:w-[52px]"></div>
        <div className="bg-black-100 mt-[2px] h-[3px] w-[20px] animate-pulse rounded-md md:mt-1 md:h-[4px] md:w-[24px]"></div>
        <div className="bg-black-100 mt-1 h-[4px] w-[132px] animate-pulse rounded-md md:h-[5px] md:w-[208px]"></div>
        <div className="bg-black-100 mt-[2px] h-[4px] w-[120px] animate-pulse rounded-md md:mt-1 md:h-[4px] md:w-[180px]"></div>
      </div>
    </motion.div>
  );
}

export default function FirstSection() {
  const skeletonItems = [
    { icon: Music4, label: "음악" },
    { icon: Clapperboard, label: "영화" },
    { icon: Tv, label: "드라마" },
    { icon: BookOpen, label: "책" },
  ];

  return (
    <motion.section
      className="mx-auto flex w-fit flex-col justify-center lg:w-full lg:flex-row-reverse lg:items-center lg:justify-between lg:px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="flex h-[210px] w-[312px] flex-col items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-b from-green-100 to-green-500 p-3 shadow-2xl transition-transform duration-300 hover:scale-105 md:h-[290px] md:w-[488px] md:p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.4,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {skeletonItems.map((item) => (
          <SkeletonRow key={item.label} Icon={item.icon} label={item.label} />
        ))}
      </motion.div>
      <h1 className="mt-6 text-lg font-semibold text-white md:mt-[52px] md:text-xl lg:mt-0 lg:text-2xl">
        느낀 점을 작성하여
        <br />
        짧은 감상 기록을 남겨 보세요
      </h1>
    </motion.section>
  );
}
