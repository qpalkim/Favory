"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Heart, ImageOff } from "lucide-react";
import { useMyData } from "@/lib/hooks/useUsers";
import { useDeleteFavory, useFavoryDetail, useToggleLikeFavory } from "@/lib/hooks/useFavories";
import { useCommentList } from "@/lib/hooks/useComments";
import {
  CATEGORY_BUTTON,
  CREATOR_FALLBACK,
  CATEGORY_LABEL_MAP,
} from "@/lib/utils/constants";
import { getMediaSearchUrl } from "@/lib/utils/getMediaUrl";
import formatTime from "@/lib/utils/formatTime";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import ProfileImage from "../ui/ProfileImage";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import CommentSection from "./CommentSection";
import Modal from "../ui/Modal";
import DeleteItemModal from "./modal/DeleteItemModal";
import UserProfileModal from "./modal/UserProfileModal";
import FavoryDetailContainerSkeleton from "../skeleton/FavoryDetailContainerSkeleton";
import RetryError from "../ui/RetryError";

const PAGE_SIZE = 5;

export default function FavoryDetailContainer({ id }: { id: number }) {
  const router = useRouter();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const { data: me } = useMyData();
  const deleteFavory = useDeleteFavory(id);
  const toggleLikeFavory = useToggleLikeFavory(id);

  const {
    data: favoryDetail,
    isLoading: favoryDetailLoading,
    isError: favoryDetailError,
    refetch: favoryDetailRefetch,
  } = useFavoryDetail(id);

  const {
    data: commentList,
    isLoading: commentListLoading,
    isError: commentListError,
    refetch: commentListRefetch,
  } = useCommentList(id, { page: currentPage, size: PAGE_SIZE });

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteFavory.mutateAsync();
      setIsDeleteOpen(false);
      toast.success("감상평이 삭제되었습니다.");
      router.replace("/favories");
    } catch {
      setIsDeleting(false);
      toast.error("감상평 삭제에 실패했습니다.");
    }
  };

  const handleToggleLike = async () => {
    try {
      const result = await toggleLikeFavory.mutateAsync();

      if (result.liked) {
        toast.success("좋아요를 눌렀습니다.");
      } else {
        toast.success("좋아요를 취소했습니다.")
      }
    } catch {
      toast.error("좋아요 처리에 실패했습니다.")
    }
  };

  const handleMediaClick = () => {
    if (!favoryDetail) return;

    const url = getMediaSearchUrl(
      favoryDetail.mediaType,
      favoryDetail.mediaTitle,
    );
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  };

  const handleTagClick = (tagName: string) => {
    router.push(`/search?keyword=${encodeURIComponent(`#${tagName}`)}`)
  }

  if (favoryDetailLoading || commentListLoading)
    return <FavoryDetailContainerSkeleton />;

  if ((favoryDetailError || commentListError) && !isDeleting)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <RetryError
          onRetry={() => {
            favoryDetailRefetch();
            commentListRefetch();
          }}
        />
      </div>
    );

  if (!favoryDetail || !commentList) return null;

  const isMine = me?.id === favoryDetail.userId;

  const mediaTypeLabel = CATEGORY_LABEL_MAP[favoryDetail?.mediaType] || favoryDetail?.mediaType;

  const { icon: Icon, text } = CATEGORY_BUTTON[favoryDetail?.mediaType];

  return (
    <>
      <article className="mx-auto flex justify-between gap-6 lg:max-w-[1200px] lg:px-6">
        <div className="relative w-full lg:max-w-[660px]">
          <div className="max-h-[375px] overflow-hidden pb-[100%] md:max-h-[768px] lg:max-h-[660px]">
            {favoryDetail.mediaImageUrl ? (
              <div className="relative aspect-square w-full">
                <Image
                  src={favoryDetail.mediaImageUrl}
                  alt={`${favoryDetail.mediaTitle} 커버 이미지`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 660px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="bg-black-10 mx-auto flex h-[375px] w-full flex-col items-center justify-center md:h-[768px] lg:h-[660px]">
                <ImageOff className="text-black-100 h-[42px] w-[42px] stroke-1 md:h-[52px] md:w-[52px]" />
                <p className="text-black-200 md:text-md mt-2 text-sm">
                  작품 이미지가 없습니다
                </p>
              </div>
            )}
          </div>

          <section className="relative z-10 -mt-6 space-y-6 rounded-t-3xl bg-white p-6 shadow-lg md:-mt-18 md:p-8">
            <header className="flex items-center gap-2">
              <Image
                src={logo}
                className="w-[86px] md:w-[114px]"
                alt="Favory 로고"
              />
              <h1 className="text-black-500 md:text-2lg text-[15px] font-medium">
                {mediaTypeLabel} 감상평
              </h1>
            </header>

            <section className="flex justify-between">
              <div>
                <h2 className="text-black-500 md:text-2lg text-lg font-semibold break-words">
                  {favoryDetail.mediaTitle}
                </h2>
                <p className="text-black-200 text-md md:text-lg">
                  {favoryDetail.mediaCreator ||
                    CREATOR_FALLBACK[favoryDetail.mediaType]}{" "}
                  • {favoryDetail.mediaYear || "연도 정보 없음"}
                </p>
              </div>

              {isMine && (
                <Dropdown
                  options={[
                    {
                      label: "수정하기",
                      onClick: () => router.push(`/favories/${favoryDetail.mediaType.toLowerCase()}/${id}/edit`,),
                    },
                    {
                      label: "삭제하기", onClick: () => setIsDeleteOpen(true),
                    },
                  ]}
                />
              )}
            </section>

            <hr className="border-black-100 my-3 md:my-4" />
            <h3 className="text-black-500 md:text-2lg text-lg font-semibold">
              {favoryDetail.title}
            </h3>
            <p className="text-black-500 whitespace-pre-wrap break-words text-md mt-2 md:text-lg">
              {favoryDetail.content}
            </p>

            {!!favoryDetail.tags?.length && (
              <section>
                <h3 className="text-black-500 text-[15px] font-semibold md:text-lg">
                  태그
                </h3>
                <div className="mt-2 flex gap-1 md:gap-2">
                  {favoryDetail.tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      onClick={() => handleTagClick(tag.name)}
                    >
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            <section className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ProfileImage
                  src={favoryDetail.userImageUrl}
                  clickable
                  onClick={() => setIsProfileOpen(true)}
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-black-500 md:text-md truncate text-sm leading-tight font-medium">
                    {favoryDetail.userNickname}
                  </p>
                  <p className="text-black-200 truncate text-xs leading-tight font-light md:text-sm">
                    {formatTime(favoryDetail.createdAt)}
                    {favoryDetail.createdAt !== favoryDetail.updatedAt &&
                      "(수정됨)"}
                  </p>
                </div>
              </div>
            </section>

            <div className="my-[52px] flex justify-center gap-2 md:my-[96px]">
              <Button onClick={handleMediaClick}>
                <Icon className="h-4 w-4" />
                {text}
              </Button>
              <Button variant="outline" onClick={handleToggleLike}>
                <Heart className={`h-4 w-4 text-green-600 ${favoryDetail.likedByMe ? "fill-current" : ""}`} />
                좋아요 {favoryDetail.likeCount}
              </Button>
            </div>

            <CommentSection
              favoryId={favoryDetail.id}
              commentList={commentList}
              setCurrentPage={setCurrentPage}
              className="lg:hidden" />
          </section>
        </div >

        <CommentSection
          favoryId={favoryDetail.id}
          commentList={commentList}
          setCurrentPage={setCurrentPage}
          className="mt-[52px] hidden w-full lg:block lg:max-w-[416px]" />
      </article >

      {isDeleteOpen && (
        <Modal onClose={() => setIsDeleteOpen(false)}>
          <DeleteItemModal
            isComment={false}
            onClose={() => setIsDeleteOpen(false)}
            onDelete={handleDelete}
          />
        </Modal>
      )}

      {isProfileOpen && (
        <Modal onClose={() => setIsProfileOpen(false)}>
          <UserProfileModal
            onClose={() => setIsProfileOpen(false)}
            nickname={favoryDetail.userNickname}
            imageUrl={favoryDetail.userImageUrl}
          />
        </Modal>
      )}
    </>
  );
}
