import z from "zod";

// 공통 카테고리 API 타입
export const mediaTypeSchema = z.enum(["MUSIC", "MOVIE", "DRAMA", "BOOK"]);

// 공통 태그 API 타입
const tagSchema = z.object({
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
  mediaType: mediaTypeSchema,
  mediaImageUrl: z.string().nullable(),
  title: z.string(),
  content: z.string(),
  tags: z.array(tagSchema).optional(),
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
  userId: z.number(),
  mediaId: z.number(),
  title: z
    .string()
    .min(1, { message: "제목은 필수 입력입니다" })
    .max(20, { message: "20자 이내로 작성해 주세요" }),
  content: z
    .string()
    .min(1, { message: "감상평은 필수 입력입니다" })
    .max(500, { message: "500자 이내로 작성해 주세요" }),
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
    .max(20, { message: "20자 이내로 작성해 주세요" }),
  content: z
    .string()
    .min(1, { message: "감상평은 필수 입력입니다" })
    .max(500, { message: "500자 이내로 작성해 주세요" }),
});

export type EditFavoryRequest = z.infer<typeof editFavoryRequestSchema>;

// Favory 수정 응답 API 타입
export const editFavoryResponseSchema = favorySchema;

export type EditFavoryResponse = z.infer<typeof editFavoryResponseSchema>;
