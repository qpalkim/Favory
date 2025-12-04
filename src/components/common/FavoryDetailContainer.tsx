"use client";
import { ImageOff, Music4, Share } from "lucide-react";
import { useFavoryDetail } from "@/lib/hooks/useFavories";
import { useCommentList } from "@/lib/hooks/useComments";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import formatTime from "@/lib/utils/formatTime";
import ProfileImg from "../ui/ProfileImg";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import CommentItem from "../ui/CommentItem";
import Empty from "./Empty";

export default function FavoryDetailContainer({ id }: { id: number }) {
  const {
    data: favoryDetail,
    isLoading: favoryDetailLoading,
    isError: favoryDetailError,
  } = useFavoryDetail(id);
  const {
    data: comments = [],
    isLoading: commentsLoading,
    isError: commentsError,
  } = useCommentList(id);

  if (favoryDetailLoading || commentsLoading) return <div>로딩 중입니다</div>;
  if (favoryDetailError || commentsError) return <div>에러가 발생했습니다</div>;
  if (!favoryDetail) return null;

  return (
    <div className="mx-auto flex justify-between gap-6 lg:max-w-[1200px] lg:px-6">
      <div className="relative w-full lg:max-w-[660px]">
        {favoryDetail.mediaImageUrl ? (
          <Image
            src={favoryDetail.mediaImageUrl}
            alt={favoryDetail.mediaTitle}
            width={300}
            height={300}
            className="max-h-[375px] w-full object-cover md:max-h-[768px] lg:max-h-[660px]"
          />
        ) : (
          <div className="bg-black-10 flex h-[375px] w-full flex-col items-center justify-center md:h-[768px] lg:h-[660px]">
            <ImageOff className="text-black-100 h-[42px] w-[42px] stroke-1 md:h-[52px] md:w-[52px]" />
            <p className="text-black-200 md:text-md mt-2 text-sm">
              작품 이미지가 없습니다
            </p>
          </div>
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
              {favoryDetail.mediaTitle}
            </h2>
            <p className="text-black-200 text-md md:text-lg">
              {favoryDetail.mediaCreator || "가수 정보 없음"} •&nbsp;
              {favoryDetail.mediaYear || "연도 정보 없음"}
            </p>
            <hr className="border-black-100 my-3 md:my-4" />
            <h3 className="text-black-500 md:text-2lg text-lg font-medium">
              {favoryDetail.title}
            </h3>
            <p className="text-black-500 text-md mt-2 leading-tight md:text-lg">
              {favoryDetail.content}
            </p>
          </div>

          {favoryDetail.tags?.length ? (
            <div>
              <h3 className="text-black-500 text-[15px] font-semibold md:text-lg">
                태그
              </h3>
              <div className="mt-2 flex gap-1 md:gap-2">
                {favoryDetail.tags.map((tag) => (
                  <Badge key={tag.id}>#{tag.name}</Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ProfileImg src={favoryDetail.userImageUrl} />
              <div className="flex flex-col gap-0.5">
                <p className="text-black-500 md:text-md truncate text-sm leading-tight font-medium">
                  {favoryDetail.userNickname}
                </p>
                <p className="text-black-200 truncate text-xs leading-tight font-light md:text-sm">
                  {formatTime(favoryDetail.createdAt || favoryDetail.updatedAt)}
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
              댓글 {comments.length}개
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
            {comments.length === 0 ? (
              <div className="my-12">
                <Empty type="comment" />
              </div>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* PC 환경 댓글 목록 영역 */}
      <div className="mt-[52px] hidden w-full lg:block lg:max-w-[416px]">
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
        {comments.length === 0 ? (
          <div className="my-12">
            <Empty type="comment" />
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}
