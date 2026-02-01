"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import star from "@/assets/vector/star.svg";
import logo from "@/assets/logo/logo.svg";
import Button from "@/components/ui/Button";

type FloatingStarProps = {
  className: string;
  animation: {
    scale: number[];
    opacity: number[];
    rotate: number[];
  };
};

function FloatingStar({ className, animation }: FloatingStarProps) {
  return (
    <motion.div
      className={className}
      animate={animation}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <Image src={star} alt="" aria-hidden fill loading="lazy" />
    </motion.div>
  )
}

export default function MainBanner() {
  return (
    <motion.section
      className="relative h-[222px] w-full md:h-[416px] lg:h-[456px]"
      animate={{
        background:
          "linear-gradient(to bottom, #1f4b2c 0%, #076653 25%, #e3ea8f 100%)",
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      <div className="relative mx-auto h-full w-full max-w-[1448px] px-6">
        <FloatingStar
          className="absolute top-[22%] left-[16%] h-8 w-8 -translate-y-1/2 blur-[2.5px] md:h-12 md:w-12 lg:w-16 lg:h-16"
          animation={{
            scale: [0.5, 0.8, 0, 0.5],
            opacity: [1, 1, 0.5, 1],
            rotate: [0, 4, -4, 0],
          }}
        />
        <FloatingStar
          className="absolute top-1/2 left-1/2 h-8 w-8 -translate-y-1/2 blur-[2.5px] md:h-12 md:w-12 md:-translate-y-1/4 lg:-translate-y-1/6 lg:w-16 lg:h-16"
          animation={{
            scale: [1, 0, 1.2, 1],
            opacity: [1, 0.5, 1, 1],
            rotate: [0, -4, 4, 0],
          }}
        />
        <motion.div
          className="absolute top-1/4 right-8 h-18 w-18 -translate-y-1/2 md:h-36 md:w-36 lg:top-[30%] lg:right-16 lg:h-40 lg:w-40"
          animate={{
            opacity: [1, 0.8, 1],
            filter: [
              "blur(1.5px) brightness(1)",
              "blur(1.5px) brightness(1.5)",
              "blur(1.5px) brightness(1)",
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
        <div className="absolute bottom-8 md:bottom-10 md:left-12 lg:left-40 space-y-1.5 md:space-y-2 lg:space-y-3">
          <h1 className="font-leferiBold text-2lg leading-tight text-white md:text-3xl lg:text-3xl">
            Favory
          </h1>
          <h2 className="text-lg leading-tight font-semibold text-white md:text-2xl lg:text-2xl">
            내 취향을 담은 나만의 공간
          </h2>
          <Button
            size="lg"
            href="/favories"
            className="w-[222px] md:w-[416px] lg:w-[456px]"
            ariaLabel="Favory 목록 페이지로 이동하기"
          >
            지금 시작하기
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
