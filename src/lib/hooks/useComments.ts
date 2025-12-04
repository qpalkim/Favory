import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CommentListResponse } from "../types/comments";
import { getCommentList } from "../apis/comments";

// 댓글 목록 조회 훅
export const useCommentList = (favoryId: number) => {
  return useQuery<CommentListResponse>({
    queryKey: ["comments", favoryId],
    queryFn: () => getCommentList(favoryId),
    placeholderData: keepPreviousData,
  });
};
