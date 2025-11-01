import { BookOpen, Clapperboard, Music4, Tv } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import musicBanner from "@/assets/vector/musicBanner.svg";
import movieBanner from "@/assets/vector/movieBanner.svg";
import dramaBanner from "@/assets/vector/dramaBanner.svg";
import bookBanner from "@/assets/vector/bookBanner.svg";

// 추후 타입 정의 필요
interface BannerProps {
  category: "music" | "movie" | "drama" | "book";
  type: "ai" | "latest";
  id: string;
  title: string;
  creator: string;
  year: string;
  favoryTitle: string;
  coverImg: StaticImageData;
}

const CATEGORY_BANNER = {
  music: musicBanner,
  movie: movieBanner,
  drama: dramaBanner,
  book: bookBanner,
};

const CATEGORY_BUTTON = {
  music: { icon: Music4, text: "지금 들으러 가기" },
  movie: { icon: Clapperboard, text: "지금 보러 가기" },
  drama: { icon: Tv, text: "지금 보러 가기" },
  book: { icon: BookOpen, text: "지금 읽으러 가기" },
};

export default function Banner({
  category,
  type,
  id,
  title,
  creator,
  year,
  favoryTitle,
  coverImg,
}: BannerProps) {
  const Icon = CATEGORY_BUTTON[category].icon;
  const label = CATEGORY_BUTTON[category].text;

  const content = (
    <section
      aria-label={type === "ai" ? "맞춤형 추천 배너" : "최신 Favory"}
      className="relative h-[222px] w-full overflow-hidden bg-gradient-to-b from-green-600 via-green-500 to-green-100 px-6 md:h-[416px] md:px-8 lg:h-[456px] lg:px-0"
    >
      <Image
        src={CATEGORY_BANNER[category]}
        alt={`${category} 배너`}
        fill
        priority
        className="animate-soft-glow absolute inset-0 top-0 h-full w-full object-cover"
      />
      <div className="relative z-10 mx-auto flex h-full items-center justify-between lg:max-w-[1000px]">
        <div>
          <small className="md:text-md text-[10px] font-medium text-white lg:text-lg">
            {type === "ai" ? "맞춤형 추천 콘텐츠" : "최신 Favory"}
          </small>
          <h2 className="text-lg font-semibold text-white md:text-3xl">
            {/* 추후 구현 가능 시, 수정 필요 */}
            {type === "ai" ? "회원님의 취향에 꼭 맞는 작품" : favoryTitle}
          </h2>
          <h3 className="text-md mt-2 font-semibold text-white md:text-2xl lg:mt-3">
            {title}
          </h3>
          <p className="md:text-md text-[10px] font-medium text-white lg:text-lg">
            <span>{creator}</span>
            {" • "}
            <time dateTime={year}>{year}</time>
          </p>
          {type === "ai" ? (
            <Button
              className="mt-2 lg:mt-3"
              ariaLabel={`${category} ${label.replace("지금 ", "")}`}
            >
              <Icon className="h-4 w-4 text-white md:h-[18px] md:w-[18px] lg:h-[20px] lg:w-[20px]" />
              {label}
            </Button>
          ) : null}
        </div>
        <div className="relative flex h-[82px] items-center justify-center overflow-visible rounded-sm transition-transform duration-200 md:h-[182px] md:rounded-md lg:h-[232px]">
          <div className="absolute h-full w-full bg-white opacity-70 blur-md md:blur-lg" />
          <Image
            src={coverImg}
            alt={`${title} 커버 이미지`}
            className="relative h-full w-full rounded-md object-contain"
          />
        </div>
      </div>
    </section>
  );

  return type === "ai" ? (
    content
  ) : (
    <Link href={`/favories/${category}/${id}`}>{content}</Link>
  );
}
