"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import star from "@/assets/vector/star.svg";
import logo from "@/assets/logo/logo.svg";
import Button from "@/components/ui/Button";

export default function MainBanner() {
  return (
    <motion.section
      className="relative h-[272px] w-full md:h-[600px] lg:h-[820px]"
      animate={{
        background: [
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
          className="absolute top-1/4 right-8 h-19 w-19 -translate-y-1/2 md:h-40 md:w-40 lg:top-[30%] lg:right-16 lg:h-56 lg:w-56"
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
        <div className="absolute bottom-8 space-y-1.5 md:bottom-25 md:left-18 md:space-y-2 lg:space-y-3">
          <h1 className="font-leferiBold text-[24px] text-white md:text-[48px] lg:text-[68px]">
            Favory
          </h1>
          <h2 className="text-lg font-semibold text-white md:text-2xl lg:text-3xl">
            내 취향을 담은 나만의 공간
          </h2>
          <Button
            size="lg"
            href="/favories"
            className="w-[240px] md:w-[368px] lg:w-[612px]"
            ariaLabel="Favory 목록 페이지로 이동하기"
          >
            지금 시작하기
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
