"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import star from "@/assets/icon/star.svg";
import logo from "@/assets/logo/logo.svg";

export default function MainBanner() {
  return (
    <motion.main
      className="h-68 md:h-150 relative w-full"
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
      <div className="relative max-w-[1448px] mx-auto h-full w-full px-6">
        <motion.div
          className="absolute top-[22%] left-[16%] -translate-y-1/2 w-9 h-9 md:w-16 md:h-16 blur-[2.5px]"
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
          <Image src={star} alt="star 아이콘" fill loading="lazy" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-[40%] -translate-y-1/2 lg:-translate-y-1/3 w-9 h-9 md:w-16 md:h-16 blur-[2.5px]"
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
          <Image src={star} alt="star 아이콘" fill loading="lazy" />
        </motion.div>
        <motion.div
          className="absolute top-1/4 lg:top-[30%] right-8 -translate-y-1/2 w-19 h-19 md:w-40 md:h-40 lg:w-56 lg:h-56"
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
          <Image src={logo} alt="Favory 로고" fill priority loading="eager" />
        </motion.div>
        <h1 className="absolute top-1/2 md:top-[55%] lg:top-1/2 md:left-18 lg:left-6 left-9 text-[24px] md:text-[48px] lg:text-[72px] text-white font-leferiBold">
          Favory
        </h1>
        <h2 className="absolute top-[65%] md:top-[70%] lg:text-4xl md:left-18 left-9 lg:left-6 text-lg md:text-2xl text-white font-semibold">
          내 취향을 담은 나만의 공간
        </h2>
      </div>
    </motion.main>
  );
}
