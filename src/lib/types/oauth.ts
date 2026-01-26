import z from "zod";

// 공통 프로바이더 타입
export type OauthProvider = "LOCAL" | "GOOGLE";

// 간편 로그인 등록 API 타입
export const addOauthRequestSchema = z.object({
  token: z.string().min(1),
});

export type AddOauthRequest = z.infer<typeof addOauthRequestSchema>;
