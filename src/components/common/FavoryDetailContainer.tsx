import { Music4, Share } from "lucide-react";
import { FavoryDetailResponse } from "@/lib/types/favories";
import { CommentListResponse } from "@/lib/types/comments";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import ProfileImg from "../ui/ProfileImg";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import CommentItem from "../ui/CommentItem";

const tempFavories: FavoryDetailResponse = {
  id: 1,
  category: "music",
  media: {
    title: "Myself",
    creator: "Post Malone",
    year: "2019",
    coverImg: null,
  },
  favoryTitle: "드라이브할 때 꼭 들어야 하는 노래",
  content:
    "화려한 세상 속에서도 여전히 ‘나 자신’을 찾아 헤매는 외로움이 느껴지는 노래",
  tags: [
    {
      id: 1,
      name: "포말",
    },
    {
      id: 2,
      name: "내한와줘",
    },
    {
      id: 3,
      name: "드라이브",
    },
  ],
  createdAt: "4시간 전",
  updatedAt: "",
  writer: {
    id: 400,
    image: null,
    nickname: "fewfew",
  },
};

const tempComments: CommentListResponse = [
  {
    favoryId: 1,
    id: 1,
    content:
      "정말 드라이브하기 딱 좋은 노래네요! 평소에 잘 모르던 아티스트인데 이번에 한번 들어봐야겠어요 노래가 정말 좋아요~!",
    createdAt: "4시간 전",
    updatedAt: "",
    writer: {
      image: null,
      nickname: "qpalkim",
      id: 101,
    },
  },
  {
    favoryId: 1,
    id: 2,
    content: "가사 차분해서 밤에 듣기 너무 좋음",
    createdAt: "4시간 전",
    updatedAt: "",
    writer: {
      image: null,
      nickname: "banana",
      id: 101,
    },
  },
  {
    favoryId: 1,
    id: 3,
    content: "운동할 때도 은근 잘 맞는 노래임",
    createdAt: "4시간 전",
    updatedAt: "",
    writer: {
      image: null,
      nickname: "testest",
      id: 101,
    },
  },
];

export default function FavoryDetailContainer() {
  const { media, favoryTitle, content, tags, createdAt, updatedAt, writer } =
    tempFavories;

  return (
    <div className="mx-auto flex justify-between gap-6 lg:max-w-[1200px] lg:px-6">
      {/* Favory 상세 정보 */}
      <div className="relative w-full lg:max-w-[660px]">
        {media.coverImg && (
          <Image
            src={media.coverImg}
            className="max-h-[375px] w-full object-cover md:max-h-[768px] lg:max-h-[660px]"
            alt={media.title}
            fill
          />
        )}
        <div className="relative z-10 -mt-6 space-y-6 rounded-t-3xl bg-white p-6 shadow-lg md:-mt-18 md:p-8">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              className="w-[86px] md:w-[114px]"
              alt="로고 아이콘"
            />
            <h1 className="text-black-500 md:text-2lg text-[15px] font-medium">
              음악 감상평
            </h1>
          </div>

          <div>
            <h2 className="text-black-500 md:text-2lg text-lg font-semibold">
              {media.title}
            </h2>
            <p className="text-black-200 text-md md:text-lg">
              {media.creator} • {media.year}
            </p>
            <hr className="border-black-100 my-3 md:my-4" />
            <h3 className="text-black-500 md:text-2lg text-lg font-medium">
              {favoryTitle}
            </h3>
            <p className="text-black-500 text-md mt-2 leading-tight md:text-lg">
              {content}
            </p>
          </div>

          {tags && tags.length > 0 && (
            <div>
              <h3 className="text-black-500 text-[15px] font-semibold md:text-lg">
                태그
              </h3>
              <div className="mt-2 flex gap-1 md:gap-2">
                {tags.map((tag) => (
                  <Badge key={tag.id}>#{tag.name}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ProfileImg src={writer.image} />
              <div className="flex flex-col gap-0.5">
                <p className="text-black-500 md:text-md truncate text-sm leading-tight font-medium">
                  {writer.nickname}
                </p>
                <p className="text-black-200 truncate text-xs leading-tight font-light md:text-sm">
                  {updatedAt || createdAt}
                </p>
              </div>
            </div>
            <p className="text-black-200 text-xs md:text-sm">
              프로필 구경하러 가기
            </p>
          </div>

          <div className="my-[52px] flex justify-center gap-2 md:my-[96px]">
            <Button>
              <Music4 className="h-4 w-4" />
              지금 들으러 가기
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4" />
              링크 공유하기
            </Button>
          </div>

          {/* 모바일/태블릿 환경 댓글 목록 영역 */}
          <div className="lg:hidden">
            <h5 className="text-black-500 text-[15px] font-semibold md:text-lg">
              댓글 3개
            </h5>
            <div className="mt-6 flex gap-2">
              <ProfileImg src={null} />
              <Textarea placeholder="100자 이내로 입력해 주세요" />
            </div>
            <div className="flex justify-end">
              <Button size="sm" className="mt-2" disabled>
                등록
              </Button>
            </div>
            <hr className="border-black-100 mt-6" />
            {tempComments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>

      {/* PC 환경 댓글 목록 영역 */}
      <div className="mt-[52px] hidden lg:block lg:max-w-[416px]">
        <h5 className="text-black-500 text-[15px] font-semibold md:text-lg">
          댓글 3개
        </h5>
        <div className="mt-6 flex gap-2">
          <ProfileImg src={null} />
          <Textarea placeholder="100자 이내로 입력해 주세요" />
        </div>
        <div className="flex justify-end">
          <Button size="sm" className="mt-2" disabled>
            등록
          </Button>
        </div>
        <hr className="border-black-100 mt-6" />
        {tempComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
