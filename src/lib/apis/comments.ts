import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  AddCommentRequest,
  AddCommentResponse,
  addCommentResponseSchema,
  CommentListResponse,
  commentListResponseSchema,
  EditCommentRequest,
  EditCommentResponse,
  editCommentResponseSchema,
  GetCommentListParams,
  MyCommentListResponse,
  myCommentListResponseSchema,
} from "../types/comments";

// 댓글 목록 조회 API
export const getCommentList = async (
  favoryId: number,
  params: GetCommentListParams,
) => {
  const response = await axiosClientHelper.get<CommentListResponse>(
    `/comments/favory/${favoryId}`,
    { params },
  );
  return safeResponse(response.data, commentListResponseSchema);
};

// 댓글 등록 요청 API
export const addComment = async (data: AddCommentRequest) => {
  const response = await axiosClientHelper.post<AddCommentResponse>(
    "/comments",
    data,
  );
  return safeResponse(response.data, addCommentResponseSchema);
};

// 댓글 수정 API
export const editComment = async (
  id: number,
  data: EditCommentRequest,
): Promise<EditCommentResponse> => {
  const response = await axiosClientHelper.put<EditCommentResponse>(
    `/comments/${id}`,
    data,
  );
  return safeResponse(response.data, editCommentResponseSchema);
};

// 댓글 삭제 API
export const deleteComment = async (id: number): Promise<void> => {
  await axiosClientHelper.delete(`/comments/${id}`);
};

// 닉네임 기반 댓글 목록 조회 API
export const getMyCommentList = async (
  nickname: string,
  params: GetCommentListParams,
) => {
  const response = await axiosClientHelper.get<MyCommentListResponse>(
    `/comments/${nickname}`,
    { params },
  );
  return safeResponse(response.data, myCommentListResponseSchema);
};
