import z from "zod";
import { mediaTypeSchema } from "./favories";

// 공통 미디어 API 타입
export const mediaItemSchema = z.object({
  title: z.string(),
  creator: z.string().nullable(),
  year: z.number().nullable(),
  imageUrl: z.string().nullable(),
  mediaType: mediaTypeSchema,
  externalId: z.string(),
});

export type MediaItem = z.infer<typeof mediaItemSchema>;

// 외부 API 미디어 검색 조회 파라미터 API 타입
export const getMediaSearchParamsSchema = z.object({
  keyword: z.string(),
  type: mediaTypeSchema,
  limit: z.number().optional(),
});

export type GetMediaSearchParams = z.infer<typeof getMediaSearchParamsSchema>;

// 외부 API 미디어 검색 조회 API 타입
export const mediaSearchResponseSchema = z.object({
  results: z.array(mediaItemSchema),
});

export type MediaSearchResponse = z.infer<typeof mediaSearchResponseSchema>;

// 미디어 존재 여부 조회 API 타입
export const mediaExistsResponseSchema = z.object({
  mediaId: z.number().nullable(),
});

export type MediaExistsResponse = z.infer<typeof mediaExistsResponseSchema>;

// 미디어 등록 요청 API 타입
export const addMediaRequestSchema = z.object({
  externalId: z.string(),
  mediaType: mediaTypeSchema,
  title: z.string(),
  creator: z.string().nullable(),
  year: z.number().nullable(),
  imageUrl: z.string().nullable(),
});

export type AddMediaRequest = z.infer<typeof addMediaRequestSchema>;

// 미디어 등록 응답 API 타입
export const addMediaResponseSchema = z.object({
  id: z.number(),
  externalId: z.string(),
  mediaType: mediaTypeSchema,
  title: z.string(),
  creator: z.string().nullable(),
  year: z.number().nullable(),
  imageUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AddMediaResponse = z.infer<typeof addMediaResponseSchema>;
