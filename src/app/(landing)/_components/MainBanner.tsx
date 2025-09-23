"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import star from "@/assets/vector/star.svg";
import logo from "@/assets/logo/logo.svg";
import Button from "@/components/Button";

export default function MainBanner() {
  return (
    <motion.main
      className="relative h-68 w-full md:h-[600px] lg:h-[800px]"
      animate={{
        background: [
          "linear-gradient(to bottom, #1f4b2c 0%, #076653 25%, #e3ea8f 100%)",
          "linear-gradient(to bottom, #1f4b2c 0%, #076653 25%, #c0e890 100%)",
          "linear-gradient(to bottom, #1f4b2c 0%, #076653 25%, #e3ea8f 100%)",
        ],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <div className="relative mx-auto h-full w-full max-w-[1448px] px-6">
        <motion.div
          className="absolute top-[22%] left-[16%] h-9 w-9 -translate-y-1/2 blur-[2.5px] md:h-16 md:w-16"
          animate={{
            scale: [0.5, 0.8, 0, 0.5],
            opacity: [1, 1, 0.5, 1],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Image src={star} alt="별 아이콘" fill loading="lazy" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-[40%] h-9 w-9 -translate-y-1/2 blur-[2.5px] md:h-16 md:w-16 lg:-translate-y-1/3"
          animate={{
            scale: [1, 0, 1.2, 1],
            opacity: [1, 0.5, 1, 1],
            rotate: [0, -4, 4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Image src={star} alt="별 아이콘" fill loading="lazy" />
        </motion.div>
        <motion.div
          className="absolute top-1/4 right-8 h-19 w-19 -translate-y-1/2 md:h-40 md:w-40 lg:top-[30%] lg:h-56 lg:w-56"
          animate={{
            opacity: [1, 0.8, 1],
            filter: [
              "blur(2.5px) brightness(1)",
              "blur(2.5px) brightness(1.5)",
              "blur(2.5px) brightness(1)",
            ],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          <Image src={logo} alt="로고 아이콘" fill priority loading="eager" />
        </motion.div>
        <h1 className="font-leferiBold absolute top-[52%] left-9 text-[24px] text-white md:top-[57%] md:left-18 md:text-[48px] lg:top-[55%] lg:left-6 lg:text-[72px]">
          Favory
        </h1>
        <h2 className="absolute top-[65%] left-9 text-lg font-semibold text-white md:top-[70%] md:left-18 md:text-2xl lg:left-6 lg:text-4xl">
          내 취향을 담은 나만의 공간
        </h2>
        <Button
          href="/favories"
          className="absolute top-[79%] w-[240px] md:left-18 md:w-[400px] lg:left-6 lg:w-[500px]"
          ariaLabel="페이보리 목록 페이지로 이동하기"
        >
          지금 시작하기
        </Button>
      </div>
    </motion.main>
  );
}
