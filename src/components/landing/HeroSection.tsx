"use client";
import { motion } from "framer-motion";
import { Music4, Clapperboard, Tv, BookOpen } from "lucide-react";
import wave from "@/assets/vector/wave.svg";
import ellipse from "@/assets/vector/ellipse.svg";
import polygon from "@/assets/vector/polygon.svg";
import line from "@/assets/vector/line.svg";

function SectionCard({
  title,
  gradient,
  children,
}: {
  title: string;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div initial="initial" whileHover="hover">
      <div
        className={`relative aspect-square w-[116px] overflow-hidden rounded-lg md:rounded-xl ${gradient} px-3 py-2 shadow-2xl transition-transform duration-300 hover:scale-105 md:w-[218px] md:px-4 md:py-4`}
      >
        <h4 className="text-2lg font-medium text-white md:text-2xl">{title}</h4>
        {children}
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <motion.section
      className="mx-auto flex w-fit flex-col justify-center pt-[210px] lg:w-full lg:flex-row lg:items-center lg:justify-between lg:px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="grid grid-cols-2 gap-4">
        <SectionCard
          title="Music"
          gradient="bg-gradient-to-b from-green-200 to-green-600"
        >
          <motion.img
            src={wave.src}
            alt="물결 장식"
            className="absolute right-0 bottom-0 h-[62px] object-cover md:h-[114px] md:w-[218px]"
            onContextMenu={(e) => e.preventDefault()}
            animate={{ scale: 1.2 }}
            variants={{
              hover: {
                scale: 1.4,
                x: [-12, 12],
                transition: {
                  duration: 1.5,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.img
            src={wave.src}
            alt="물결 장식"
            className="absolute right-0 -bottom-3 h-[45px] object-cover md:h-[82px] md:w-[218px]"
            onContextMenu={(e) => e.preventDefault()}
            animate={{ scale: 1.2 }}
            variants={{
              hover: {
                scale: 1.4,
                x: [-12, 12],
                transition: {
                  duration: 1.5,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <Music4
            strokeWidth={1}
            className="absolute right-3 bottom-2 z-50 h-[28px] w-[28px] text-white md:h-[52px] md:w-[52px]"
          />
        </SectionCard>

        <SectionCard
          title="Movie"
          gradient="bg-gradient-to-b from-green-400 to-green-600"
        >
          <motion.img
            src={ellipse.src}
            alt="큰 원 장식"
            className="absolute -right-[30%] -bottom-[30%] w-[116px] md:w-[218px]"
            onContextMenu={(e) => e.preventDefault()}
            animate={{ scale: 1 }}
            variants={{
              hover: {
                scale: 1.1,
                y: [0, -8],
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.img
            src={ellipse.src}
            alt="중간 원 장식"
            className="absolute -right-[30%] -bottom-[30%] w-[90px] md:w-[180px]"
            onContextMenu={(e) => e.preventDefault()}
            animate={{ scale: 1 }}
            variants={{
              hover: {
                scale: 1.1,
                y: [0, -6],
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.img
            src={ellipse.src}
            alt="작은 원 장식"
            className="absolute -right-[10%] -bottom-[10%] w-[40px] md:-right-[30%] md:-bottom-[30%] md:w-[142px]"
            onContextMenu={(e) => e.preventDefault()}
            animate={{ scale: 1 }}
            variants={{
              hover: {
                scale: 1.1,
                y: [0, -4],
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <Clapperboard
            strokeWidth={1}
            className="absolute right-3 bottom-2 z-50 h-[28px] w-[28px] text-white md:h-[52px] md:w-[52px]"
          />
        </SectionCard>

        <SectionCard
          title="Drama"
          gradient="bg-gradient-to-b from-green-300 to-green-400"
        >
          <motion.img
            src={polygon.src}
            alt="삼각형 장식"
            className="absolute top-1/3 -left-2 aspect-square w-[62px] md:-left-8 md:w-[132px]"
            onContextMenu={(e) => e.preventDefault()}
            animate={{ scale: 1 }}
            variants={{
              hover: {
                scale: 1.1,
                x: [-6, 6],
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.img
            src={polygon.src}
            alt="삼각형 장식"
            className="absolute top-1/3 left-[45%] aspect-square w-[62px] md:left-[42%] md:w-[132px]"
            onContextMenu={(e) => e.preventDefault()}
            animate={{ scale: 1 }}
            variants={{
              hover: {
                scale: 1.1,
                x: [-12, 12],
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <Tv
            strokeWidth={1}
            className="absolute right-3 bottom-2 z-50 h-[28px] w-[28px] text-white md:h-[52px] md:w-[52px]"
          />
        </SectionCard>

        <SectionCard
          title="Book"
          gradient="bg-gradient-to-b from-green-100 to-green-500"
        >
          <motion.img
            src={line.src}
            alt="선 장식"
            className="absolute top-[10%] right-0 aspect-square w-[79px] md:top-[4%] md:-right-8 md:w-[196px]"
            onContextMenu={(e) => e.preventDefault()}
            animate={{ scale: 1 }}
            variants={{
              hover: {
                scale: 1.1,
                rotate: -20,
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.img
            src={ellipse.src}
            alt="작은 원 장식"
            className="absolute top-[70%] -left-2 aspect-square w-[45px] md:-left-8 md:w-[96px]"
            onContextMenu={(e) => e.preventDefault()}
            animate={{ scale: 1 }}
            variants={{
              hover: {
                scale: 1.1,
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <BookOpen
            strokeWidth={1}
            className="absolute right-3 bottom-2 z-50 h-[28px] w-[28px] text-white md:h-[52px] md:w-[52px]"
          />
        </SectionCard>
      </div>
      <h1 className="mt-6 text-right text-lg font-semibold text-white md:mt-[52px] md:text-xl lg:mt-0 lg:text-2xl">
        내가 좋아하는 음악, 영화, 드라마, 도서를
        <br />한 곳에 모아 저장해 보세요
      </h1>
    </motion.section>
  );
}
