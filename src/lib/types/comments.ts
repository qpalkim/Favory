import z from "zod";

// 공통 댓글 응답 API 타입
export const commentResponseSchema = z.object({
  favoryId: z.number(),
  id: z.number(),
  content: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  writer: z.object({
    image: z.string().nullable(),
    nickname: z.string(),
    id: z.number(),
  }),
});

export type CommentResponse = z.infer<typeof commentResponseSchema>;

// 댓글 목록 조회 응답 API 타입
export const commentListResponseSchema = z.array(commentResponseSchema);

export type CommentListResponse = z.infer<typeof commentListResponseSchema>;
