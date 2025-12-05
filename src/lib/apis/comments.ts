import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
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
