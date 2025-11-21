import z from "zod";

// 유저 정보 조회 API 타입
export const userResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string().min(3).max(10),
  profileImageUrl: z.string().url().nullable(),
  profileMessage: z.string().nullable(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
