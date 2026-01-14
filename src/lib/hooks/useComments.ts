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
  EditCommentRequest,
  GetCommentListParams,
  MyCommentListResponse,
} from "../types/comments";
import {
  addComment,
  deleteComment,
  editComment,
  getCommentList,
  getMyCommentList,
} from "../apis/comments";

// 댓글 목록 조회 훅
export const useCommentList = (
  favoryId: number,
  params: GetCommentListParams,
) => {
  return useQuery<CommentListResponse>({
    queryKey: ["comments", favoryId, params],
    queryFn: () => getCommentList(favoryId, params),
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

// 댓글 수정 훅
export const useEditComment = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditCommentRequest) => editComment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

// 댓글 삭제 훅
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

// 닉네임 기반 댓글 목록 조회 훅
export const useMyCommentList = (
  nickname: string,
  params: GetCommentListParams,
) => {
  return useQuery<MyCommentListResponse>({
    queryKey: ["comments", nickname, params],
    queryFn: () => getMyCommentList(nickname, params),
  });
};
