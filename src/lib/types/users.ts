import z from "zod";

export const profileCateogrySchema = z.enum([
  "MUSIC",
  "MOVIE",
  "DRAMA",
  "BOOK",
  "COMMENT",
]);

export type ProfileCategory = z.infer<typeof profileCateogrySchema>;

// 내 정보 및 유저 정보 조회 API 타입
export const userResponseSchema = z.object({
  id: z.number(),
  email: z.string().optional(),
  nickname: z.string().min(3).max(10),
  profileImageUrl: z.string().nullable(),
  profileMessage: z.string().max(30).nullable(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

// 프로필 이미지 등록/수정 요청 파라미터 API 타입
export const profileImageUrlParamsSchema = z.object({
  id: z.number(),
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

// 프로필 수정 요청 API 타입
export const editProfileRequestSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: "닉네임은 필수 입력입니다" })
    .min(3, { message: "3자에서 10자 사이로 입력해 주세요" })
    .max(10, { message: "3자에서 10자 사이로 입력해 주세요" })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "영문 또는 숫자로 작성해 주세요",
    })
    .optional(),
  profileImageUrl: z.string().optional(), // 추후 제거 예정
  profileMessage: z
    .string()
    .max(30, { message: "30자 이내로 작성해 주세요" })
    .optional(),
});

export type EditProfileRequest = z.infer<typeof editProfileRequestSchema>;

// 프로필 수정 응답 API 타입
export const editProfileResponseSchema = userResponseSchema;

export type EditProfileResponse = z.infer<typeof editProfileResponseSchema>;
