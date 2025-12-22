import z from "zod";

// 내 정보 및 유저 정보 조회 API 타입
export const userResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string().min(3).max(10),
  profileImageUrl: z.string().nullable(),
  profileMessage: z.string().nullable(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

// 프로필 이미지 등록/수정 요청 파라미터 API 타입
export const profileImageUrlParamsSchema = z.object({
  id: z.number(),
  file: z.instanceof(File),
});

export type ProfileImageUrlParams = z.infer<typeof profileImageUrlParamsSchema>;

// 프로필 이미지 등록/수정 요청 API 타입
export const profileImageUrlRequestSchema = z.object({
  file: z.instanceof(File),
});

export type ProfileImageUrlRequest = z.infer<
  typeof profileImageUrlRequestSchema
>;

// 프로필 이미지 등록/수정 응답 API 타입
export const profileImageUrlResponseSchema = z.unknown(); // 응답 스키마 정의 필요

export type ProfileImageUrlResponse = z.infer<
  typeof profileImageUrlResponseSchema
>;
