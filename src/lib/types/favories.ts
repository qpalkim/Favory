import z from "zod";

// 공통 카테고리 API 타입
const categorySchema = z.enum(["music", "movie", "drama", "book"]);

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

// 공통 Favory API 타입
const favorySchema = z.object({
  id: z.number().min(1),
  category: categorySchema,
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
export const faovoryDetailResponseSchema = favorySchema;

export type FavoryDetailResponse = z.infer<typeof faovoryDetailResponseSchema>;
