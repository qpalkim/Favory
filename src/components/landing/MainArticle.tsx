"use client";
import { useRef } from "react";
import { ChevronsDown } from "lucide-react";
import HeroSection from "./HeroSection";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";

export default function MainArticle() {
  const heroRef = useRef<HTMLDivElement>(null);

  const onScrollToMainSection = () => {
    heroRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <article className="from-black-500 bg-gradient-to-b via-green-500 to-green-100">
      <div onClick={onScrollToMainSection} className="pt-8 flex justify-center items-center cursor-pointer mx-auto transform transition-transform duration-200 ease-in-out hover:translate-y-2">
        <ChevronsDown className="w-4 h-4 scale-x-150 text-black-100" />
      </div>
      <section className="mx-auto max-w-[1168px] min-w-[312px] space-y-[100px] pb-40 md:space-y-[200px] lg:space-y-[300px]">
        <HeroSection scrollRef={heroRef} />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
      </section>
    </article>
  );
}
