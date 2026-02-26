import { ImageOff } from "lucide-react";
import { Favory } from "@/lib/types/favories";
import Link from "next/link";
import Image from "next/image";
import bannerMusic from "@/assets/vector/banner_music.svg";
import bannerMovie from "@/assets/vector/banner_movie.svg";
import bannerDrama from "@/assets/vector/banner_drama.svg";
import bannerBook from "@/assets/vector/banner_book.svg";

const CATEGORY_BANNER = {
  MUSIC: bannerMusic,
  MOVIE: bannerMovie,
  DRAMA: bannerDrama,
  BOOK: bannerBook,
};

export default function Banner({ favory }: { favory: Favory; }) {
  return (
    <Link
      href={`/favories/${favory.mediaType.toLowerCase()}/${favory.id}`}
      aria-label={`${favory.mediaTitle} 감상평 상세 페이지로 이동`}
    >
      <div
        className="relative h-[222px] w-full overflow-hidden px-6 md:h-[416px] md:px-8 lg:h-[456px] lg:px-0"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-100"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-600/30 via-transparent to-transparent"
          aria-hidden
        />
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-100/20 blur-3xl md:h-96 md:w-96"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(to_top,#fafafa_0%,rgba(250,250,250,0.7)_25%,rgba(250,250,250,0.2)_55%,transparent_100%)] md:h-64"
          aria-hidden
        />
        <Image
          src={CATEGORY_BANNER[favory.mediaType]}
          alt=""
          aria-hidden
          fill
          priority
          className="animate-soft-glow absolute inset-0 top-0 h-full w-full object-cover mix-blend-soft-light opacity-70"
        />
        <div className="relative z-10 mx-auto flex h-full w-full items-center justify-between lg:max-w-[1000px]">
          <div>
            <small className="md:text-md text-[10px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] lg:text-lg">
              최신 Favory
            </small>
            <h2 className="text-lg leading-tight font-semibold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:text-2xl lg:text-3xl">
              {favory.title}
            </h2>
            <h3 className="text-md mt-2 leading-tight font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] md:text-xl lg:mt-3 lg:text-2xl">
              {favory.mediaTitle}
            </h3>
            <p className="md:text-md text-[10px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] lg:text-lg">
              {favory.mediaCreator || "정보 없음"} •{" "}
              {favory.mediaYear || "연도 정보 없음"}
            </p>
          </div>
          {favory.mediaImageUrl ? (
            <Image
              src={favory.mediaImageUrl}
              alt={`${favory.mediaTitle} 커버 이미지`}
              width={300}
              height={300}
              className="h-[82px] w-auto rounded-sm object-contain shadow-[0_4px_20px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)] md:h-[182px] md:rounded-md md:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.15)] lg:h-[232px]"
            />
          ) : (
            <div className="bg-black-10 flex aspect-square h-[82px] items-center justify-center rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm md:h-[182px] md:rounded-md lg:h-[232px]">
              <ImageOff className="text-black-100 h-[24px] w-[24px] stroke-1 md:h-[32px] md:w-[32px]" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
