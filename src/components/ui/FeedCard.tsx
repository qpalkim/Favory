import Image from "next/image";
import Link from "next/link";
import ProfileImg from "./ProfileImg";

// 추후 타입 정의 필요
interface FavoryDetail {
  id: string;
  category: string;
  title: string; // 작품명
  creator: string; // 가수/감독/방송사/작가
  year: string; // 연도
  coverImg: string; // 커버 이미지
  favoryTitle: string; // 감상평 제목
  content: string; // 감상평 내용
  nickname: string; // 작성자 닉네임
  profileImg: string | null; // 작성자 프로필 이미지
  createdAt: string; // 감상평 생성 일시
}

interface FeedCardProps {
  favoryDetail: FavoryDetail;
}

export default function FeedCard({ favoryDetail }: FeedCardProps) {
  return (
    <Link href={`favories/${favoryDetail.category}/${favoryDetail.id}`}>
      <div className="relative flex aspect-square h-full min-h-[160px] w-full min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl shadow-lg transition-transform duration-200 hover:scale-105">
        <Image
          src={favoryDetail.coverImg}
          alt={favoryDetail.title}
          className="h-full w-auto object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 w-full p-3 md:p-4 lg:p-5">
              <h2 className="lg:text-2lg truncate text-sm leading-tight font-semibold text-white md:text-lg">
                {favoryDetail.title}
              </h2>
              <p className="md:text-md mt-1 truncate text-xs leading-tight text-white lg:text-lg">
                {favoryDetail.creator} • {favoryDetail.year}
              </p>
            </div>
          </div>
          <div className="w-full flex-col justify-between bg-white p-3 md:p-4 lg:p-5">
            <h3 className="lg:text-2lg text-black-500 truncate text-sm leading-tight font-medium md:text-lg">
              {favoryDetail.favoryTitle}
            </h3>
            <p className="text-blck-500 text-md mt-1 hidden truncate leading-tight md:block lg:text-lg">
              {favoryDetail.content}
            </p>
            <div className="mt-1 flex items-center gap-1 md:mt-2 md:gap-2">
              <ProfileImg
                src={favoryDetail.profileImg}
                size="sm"
                className="pointer-events-none"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-black-500 md:text-md truncate text-xs leading-none lg:text-lg">
                  {favoryDetail.nickname}
                </p>
                <p className="text-black-200 lg:text-md truncate text-[9px] leading-none md:text-xs">
                  {favoryDetail.createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
