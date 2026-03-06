import z from "zod";

// 공통 미디어 타입 API 타입
export const mediaTypeCategorySchema = z.enum(["MUSIC", "MOVIE", "DRAMA", "BOOK"]);

export type MediaTypeCategory = z.infer<typeof mediaTypeCategorySchema>;

// 공통 태그 API 타입
export const tagSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(1).max(10),
});

// 공통 Faovry API 타입
export const favorySchema = z.object({
  id: z.number().min(1),
  userId: z.number().min(1),
  userNickname: z.string(),
  userImageUrl: z.string().nullable(),
  mediaId: z.number(),
  mediaTitle: z.string(),
  mediaCreator: z.string().nullable(),
  mediaYear: z.number().nullable(),
  mediaType: mediaTypeCategorySchema,
  mediaImageUrl: z.string().nullable(),
  title: z.string(),
  content: z.string(),
  tags: z.array(tagSchema).nullable(),
  likeCount: z.number().min(0),
  likedByMe: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export type Favory = z.infer<typeof favorySchema>;

// Faovry 목록 조회 파라미터 API 타입
export const getFavoryListParamsSchema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
  sort: z.string().optional(),
  type: mediaTypeCategorySchema.optional(),
});

export type GetFavoryListParams = z.infer<typeof getFavoryListParamsSchema>;

// Faovry 목록 조회 API 타입
export const favoryListResponseSchema = z.object({
  content: z.array(favorySchema),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export type FavoryListResponse = z.infer<typeof favoryListResponseSchema>;

// Favory 등록 요청 API 타입
export const addFavoryRequestSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목은 필수 입력입니다" })
    .max(30, { message: "30자 이내로 작성해 주세요" }),
  content: z
    .string()
    .min(1, { message: "감상평은 필수 입력입니다" })
    .max(500, { message: "500자 이내로 작성해 주세요" }),
  tagNames: z
    .array(z.string().max(10, { message: "10자 이내로 입력해 주세요" }))
    .max(6, { message: "최대 6개까지 입력할 수 있습니다" })
    .optional(),
});

export type AddFavoryRequest = z.infer<typeof addFavoryRequestSchema>;

// Favory 등록 응답 API 타입
export const addFavoryResponseSchema = favorySchema;

export type AddFavoryResponse = z.infer<typeof addFavoryResponseSchema>;

// Favory 상세 조회 API 타입
export const favoryDetailResponseSchema = favorySchema;

export type FavoryDetailResponse = z.infer<typeof favoryDetailResponseSchema>;

// Favory 수정 요청 API 타입
export const editFavoryRequestSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목은 필수 입력입니다" })
    .max(30, { message: "30자 이내로 작성해 주세요" }),
  content: z
    .string()
    .min(1, { message: "감상평은 필수 입력입니다" })
    .max(500, { message: "500자 이내로 작성해 주세요" }),
  tagNames: z
    .array(z.string().max(10, { message: "10자 이내로 입력해 주세요" }))
    .max(6, { message: "최대 6개까지 입력할 수 있습니다" })
    .optional(),
});

export type EditFavoryRequest = z.infer<typeof editFavoryRequestSchema>;

// Favory 수정 응답 API 타입
export const editFavoryResponseSchema = favorySchema;

export type EditFavoryResponse = z.infer<typeof editFavoryResponseSchema>;

// Favory 좋아요 등록/취소 API 타입
export const toggleLikeFavoryResponseSchema = z.object({
  liked: z.boolean(),
});

export type ToggleLikeFavoryResponse = z.infer<typeof toggleLikeFavoryResponseSchema>;