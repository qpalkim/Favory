import { ImageOff } from "lucide-react";
import { Favory } from "@/lib/types/favories";
import Link from "next/link";
import Image from "next/image";
import musicBanner from "@/assets/vector/musicBanner.svg";
import movieBanner from "@/assets/vector/movieBanner.svg";
import dramaBanner from "@/assets/vector/dramaBanner.svg";
import bookBanner from "@/assets/vector/bookBanner.svg";

const CATEGORY_BANNER = {
  MUSIC: musicBanner,
  MOVIE: movieBanner,
  DRAMA: dramaBanner,
  BOOK: bookBanner,
};

export default function Banner({ favory }: { favory: Favory; }) {
  return (
    <Link
      href={`/favories/${favory.mediaType.toLowerCase()}/${favory.id}`}
      aria-label={`${favory.mediaTitle} 감상평 상세 페이지로 이동`}
    >
      <div
        className="relative h-[222px] w-full overflow-hidden bg-gradient-to-b from-green-600 via-green-500 to-green-100 px-6 md:h-[416px] md:px-8 lg:h-[456px] lg:px-0"
      >
        <Image
          src={CATEGORY_BANNER[favory.mediaType]}
          alt=""
          aria-hidden
          fill
          priority
          className="animate-soft-glow absolute inset-0 top-0 h-full w-full object-cover"
        />
        <div className="relative z-10 mx-auto flex h-full w-full items-center justify-between lg:max-w-[1000px]">
          <div>
            <small className="md:text-md text-[10px] font-medium text-white lg:text-lg">
              최신 Favory
            </small>
            <h2 className="text-lg leading-tight font-semibold text-white md:text-2xl lg:text-3xl">
              {favory.title}
            </h2>
            <h3 className="text-md mt-2 leading-tight font-semibold text-white md:text-xl lg:mt-3 lg:text-2xl">
              {favory.mediaTitle}
            </h3>
            <p className="md:text-md text-[10px] font-medium text-white lg:text-lg">
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
              className="h-[82px] w-auto rounded-sm object-contain shadow-xl md:h-[182px] md:rounded-md lg:h-[232px]"
            />
          ) : (
            <div className="bg-black-10 flex aspect-square h-[82px] items-center justify-center rounded-sm shadow-xl md:h-[182px] md:rounded-md lg:h-[232px]">
              <ImageOff className="text-black-100 h-[24px] w-[24px] stroke-1 md:h-[32px] md:w-[32px]" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
