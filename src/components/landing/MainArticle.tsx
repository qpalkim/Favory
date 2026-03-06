"use client";
import { useRef } from "react";
import { ChevronsDown } from "lucide-react";
import HeroSection from "./HeroSection";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";

export default function MainArticle() {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleScrollToHero = () => {
    heroRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main
      aria-label="Favory 메인 아티클"
      className="bg-gradient-to-b from-black-500 via-green-500 to-green-100"
    >
      <div className="pt-8 flex justify-center items-center mx-auto">
        <button
          type="button"
          onClick={handleScrollToHero}
          aria-label="아래 메인 콘텐츠로 이동하기"
          className="transform transition-transform duration-200 ease-in-out hover:translate-y-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        >
          <ChevronsDown
            className="w-4 h-4 scale-x-150 text-black-100"
            aria-hidden
          />
        </button>
      </div>

      <section className="mx-auto max-w-[1168px] min-w-[312px] space-y-[100px] pb-40 md:space-y-[200px] lg:space-y-[300px]">
        <HeroSection scrollRef={heroRef} />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </section>
    </main>
  );
}
