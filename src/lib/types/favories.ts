import z from "zod";

// 공통 카테고리 API 타입
const mediaTypeSchema = z.enum(["MUSIC", "MOVIE", "DRAMA", "BOOK"]);

// 공통 작품 정보 API 타입
const mediaSchema = z.object({
  title: z.string().min(1),
  creator: z.string().nullable(),
  year: z.string().nullable(),
  coverImg: z.string().url().nullable(),
});

// 공통 태그 API 타입
const tagSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(1).max(10),
});

// 테스트 공통 Favory API 타입
const tempFavorySchema = z.object({
  id: z.number().min(1),
  category: mediaTypeSchema,
  media: mediaSchema,
  favoryTitle: z.string().min(1).max(20),
  content: z.string().min(1).max(500),
  tags: z.array(tagSchema).max(3).optional(), // 태그 최대 3개
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  writer: z.object({
    image: z.string().nullable(),
    nickname: z.string(),
    id: z.number(),
  }),
});

// Favory 상세 조회 API 타입
export const faovoryDetailResponseSchema = tempFavorySchema;

export type FavoryDetailResponse = z.infer<typeof faovoryDetailResponseSchema>;

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
