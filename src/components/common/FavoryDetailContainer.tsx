"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ImageOff, Share } from "lucide-react";
import { useMyData } from "@/lib/hooks/useUsers";
import { useDeleteFavory, useFavoryDetail } from "@/lib/hooks/useFavories";
import { useCommentList } from "@/lib/hooks/useComments";
import {
  CATEGORY_BUTTON,
  CREATOR_FALLBACK,
  MEDIA_TYPE_LABEL_MAP,
} from "@/lib/utils/constants";
import { getMediaSearchUrl } from "@/lib/utils/getMediaUrl";
import formatTime from "@/lib/utils/formatTime";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import ProfileImage from "../ui/ProfileImage";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import Modal from "../ui/Modal";
import DeleteItemModal from "./modal/DeleteItemModal";
import UserProfileModal from "./modal/UserProfileModal";
import FavoryCommentList from "./FavoryCommentList";
import FavoryDetailContainerSkeleton from "../skeleton/FavoryDetailContainerSkeleton";
import Pagination from "../ui/Pagination";
import Empty from "../ui/Empty";
import RetryError from "../ui/RetryError";

export default function FavoryDetailContainer({ id }: { id: number }) {
  const router = useRouter();
  const { data: me } = useMyData();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 5;
  const deleteFavory = useDeleteFavory(id);

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
      toast.success("감상평이 삭제되었습니다");
      router.replace("/favories");
    } catch {
      setIsDeleting(false);
      toast.error("감상평 삭제에 실패했습니다");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 복사되었습니다");
    } catch {
      toast.error("링크 복사에 실패했습니다");
    }
  };

  const handleMediaClick = () => {
    if (!favoryDetail) return;

    const url = getMediaSearchUrl(
      favoryDetail.mediaType,
      favoryDetail.mediaTitle,
      favoryDetail.mediaCreator ?? undefined,
    );
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  };

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
  const mediaTypeLabel =
    MEDIA_TYPE_LABEL_MAP[favoryDetail?.mediaType] || favoryDetail?.mediaType;
  const { icon: Icon, text } = CATEGORY_BUTTON[favoryDetail?.mediaType];

  const CommentSection = (
    <section aria-label="댓글 영역" className="mt-6">
      <FavoryCommentList favoryId={favoryDetail.id} commentList={commentList} />
      {commentList.totalElements === 0 ? (
        <div className="my-12">
          <Empty type="comment" />
        </div>
      ) : (
        commentList.totalElements > PAGE_SIZE && (
          <nav aria-label="댓글 페이지네이션" className="my-16 flex justify-center">
            <Pagination
              currentPage={commentList.pageNumber + 1}
              totalPages={commentList.totalPages}
              onChange={(page) => setCurrentPage(page - 1)}
            />
          </nav>
        )
      )}
    </section>
  );

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
                      label: "삭제하기",
                      onClick: () => setIsDeleteOpen(true),
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
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(
                          `/search?keyword=${encodeURIComponent(`#${tag.name}`)}`,
                        );
                      }}
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
              <Button variant="outline" onClick={handleCopyLink}>
                <Share className="h-4 w-4" />
                링크 복사하기
              </Button>
            </div>

            <div className="lg:hidden">{CommentSection}</div>
          </section>
        </div >

        <aside className="mt-[52px] hidden w-full lg:block lg:max-w-[416px]" >
          {CommentSection}
        </aside>
      </article >

      {isDeleteOpen && (
        <Modal onClose={() => setIsDeleteOpen(false)}>
          <DeleteItemModal
            isComment={false}
            onClose={() => setIsDeleteOpen(false)}
            onDelete={handleDelete}
          />
        </Modal>
      )
      }

      {
        isProfileOpen && (
          <Modal onClose={() => setIsProfileOpen(false)}>
            <UserProfileModal
              onClose={() => setIsProfileOpen(false)}
              nickname={favoryDetail.userNickname}
              imageUrl={favoryDetail.userImageUrl}
            />
          </Modal>
        )
      }
    </>
  );
}
