import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  AddCommentRequest,
  AddCommentResponse,
  addCommentResponseSchema,
  CommentListResponse,
  commentListResponseSchema,
} from "../types/comments";

// 댓글 목록 조회 API
export const getCommentList = async (favoryId: number) => {
  const response = await axiosClientHelper.get<CommentListResponse>(
    `/comments/favory/${favoryId}`,
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
