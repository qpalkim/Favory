import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AddCommentRequest,
  AddCommentResponse,
  CommentListResponse,
} from "../types/comments";
import { addComment, getCommentList } from "../apis/comments";

// 댓글 목록 조회 훅
export const useCommentList = (favoryId: number) => {
  return useQuery<CommentListResponse>({
    queryKey: ["comments", favoryId],
    queryFn: () => getCommentList(favoryId),
    placeholderData: keepPreviousData,
  });
};

// 댓글 등록 훅
export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation<AddCommentResponse, unknown, AddCommentRequest>({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
