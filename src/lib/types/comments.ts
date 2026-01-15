import z from "zod";

// 공통 댓글 응답 API 타입
export const commentResponseSchema = z.object({
  id: z.number(),
  favoryId: z.number(),
  userId: z.number(),
  userNickname: z.string(),
  userImageUrl: z.string().nullable(),
  content: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export type CommentResponse = z.infer<typeof commentResponseSchema>;

// 댓글 목록 조회 파라미터 API 타입
export const getCommentListParamsSchema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
  sort: z.string().optional(),
});

export type GetCommentListParams = z.infer<typeof getCommentListParamsSchema>;

// 댓글 목록 조회 응답 API 타입
export const commentListResponseSchema = z.object({
  content: z.array(commentResponseSchema),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export type CommentListResponse = z.infer<typeof commentListResponseSchema>;

// 댓글 등록 요청 API 타입
export const addCommentRequestSchema = z.object({
  favoryId: z.number(),
  userId: z.number(),
  content: z
    .string()
    .min(1)
    .max(100, { message: "100자 이내로 작성해 주세요" }),
});

export type AddCommentRequest = z.infer<typeof addCommentRequestSchema>;

// 댓글 등록 응답 API 타입
export const addCommentResponseSchema = commentResponseSchema;

export type AddCommentResponse = z.infer<typeof addCommentResponseSchema>;

// 댓글 수정 요청 API 타입
export const editCommentRequestSchema = z.object({
  content: z
    .string()
    .min(1)
    .max(100, { message: "100자 이내로 작성해 주세요" }),
});

export type EditCommentRequest = z.infer<typeof editCommentRequestSchema>;

// 댓글 수정 응답 API 타입
export const editCommentResponseSchema = commentResponseSchema;

export type EditCommentResponse = z.infer<typeof editCommentResponseSchema>;

// 닉네임 기반 댓글 목록 응답 API 타입
export const myCommentListResponseSchema = commentListResponseSchema;

export type MyCommentListResponse = z.infer<typeof myCommentListResponseSchema>;
