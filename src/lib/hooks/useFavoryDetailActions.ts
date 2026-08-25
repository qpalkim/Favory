import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDeleteFavory, useToggleLikeFavory } from "./useFavories";
import { getMediaSearchUrl } from "../utils/getMediaUrl";
import { FavoryDetailResponse } from "../types/favories";

// 감상평 상세 페이지의 삭제/좋아요/미디어클릭/태그클릭 핸들러와 모달 상태를 관리하는 훅
export const useFavoryDetailActions = (
  id: number,
  favoryDetail: FavoryDetailResponse | undefined,
  isLoggedIn: boolean,
) => {
  const router = useRouter();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteFavory = useDeleteFavory(id);
  const toggleLikeFavory = useToggleLikeFavory(id);

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
    if (!isLoggedIn) {
      toast.info("로그인 후, 이용 가능합니다.");
      return;
    }

    try {
      const result = await toggleLikeFavory.mutateAsync();

      if (result.liked) {
        toast.success("좋아요를 눌렀습니다.");
      } else {
        toast.success("좋아요를 취소했습니다.");
      }
    } catch {
      toast.error("좋아요 처리에 실패했습니다.");
    }
  };

  const handleMediaClick = () => {
    if (!favoryDetail) return;

    const url = getMediaSearchUrl(
      favoryDetail.mediaType,
      favoryDetail.mediaTitle,
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleTagClick = (tagName: string) => {
    router.push(`/search?keyword=${encodeURIComponent(`#${tagName}`)}`);
  };

  return {
    isDeleteOpen,
    setIsDeleteOpen,
    isProfileOpen,
    setIsProfileOpen,
    isDeleting,
    handleDelete,
    handleToggleLike,
    handleMediaClick,
    handleTagClick,
  };
};
