import z from "zod";

// 공통 댓글 응답 API 타입
export const commentResponseSchema = z.object({
  id: z.number(),
  favoryId: z.number(),
  userId: z.number(),
  userNickname: z.string(),
  userImageUrl: z.string(), // 추가
  content: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string(),
});

export type CommentResponse = z.infer<typeof commentResponseSchema>;

// 댓글 목록 조회 응답 API 타입
export const commentListResponseSchema = z.array(commentResponseSchema);

export type CommentListResponse = z.infer<typeof commentListResponseSchema>;
