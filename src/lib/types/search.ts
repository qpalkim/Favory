import z from "zod";
import { mediaTypeSchema, tagSchema } from "./favories";
import { userResponseSchema } from "./users";

// 공통 카테고리 API 타입
export const categorySchema = z.enum([
  "MUSIC",
  "MOVIE",
  "DRAMA",
  "BOOK",
  "PROFILE",
]);

export type Category = z.infer<typeof categorySchema>;

// 공통 검색 결과 Faovry API 타입
export const searchFavorySchema = z.object({
  id: z.number().min(1),
  userId: z.number().min(1),
  userNickname: z.string(),
  userImageUrl: z.string().nullable(),
  mediaTitle: z.string(),
  mediaCreator: z.string().nullable(),
  mediaYear: z.number().nullable(),
  mediaType: mediaTypeSchema,
  mediaImageUrl: z.string().nullable(),
  title: z.string(),
  content: z.string(),
  tags: z.array(tagSchema).nullable(),
  createdAt: z.string(),
});

export type SearchFavory = z.infer<typeof searchFavorySchema>;

// 검색 결과 조회 파라미터 API 타입
export const getSearchFavoryListParamsSchema = z.object({
  keyword: z.string(),
  category: z.enum(["MUSIC", "MOVIE", "DRAMA", "BOOK", "PROFILE"]).optional(),
  sort: z.enum(["latest", "oldest"]).optional(),
  page: z.number().optional(),
  size: z.number().optional(),
});

export type GetSearchFavoryListParams = z.infer<
  typeof getSearchFavoryListParamsSchema
>;

// 검색 결과 조회 응답 API 타입
export const searchFavoryListResponseSchema = z.object({
  content: z.union([z.array(searchFavorySchema), z.array(userResponseSchema)]),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export type SearchFavoryListResponse = z.infer<
  typeof searchFavoryListResponseSchema
>;
