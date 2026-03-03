import z from "zod";

// 회원가입 요청 API 타입
export const signUpRequestSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "이메일은 필수 입력입니다" })
      .email({ message: "유효한 이메일 형식이 아닙니다" }),
    verifyToken: z.string(),
    password: z
      .string()
      .min(1, { message: "비밀번호는 필수 입력입니다" })
      .min(8, { message: "최소 8자 이상 입력해 주세요" })
      .regex(/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+/, {
        message: "영문, 숫자, 특수문자 포함 입력해 주세요",
      }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "비밀번호를 한번 더 입력해 주세요" }),
    nickname: z
      .string()
      .min(1, { message: "닉네임은 필수 입력입니다" })
      .min(3, { message: "3자에서 10자 사이로 입력해 주세요" })
      .max(10, { message: "3자에서 10자 사이로 입력해 주세요" })
      .regex(/^[a-z0-9]+$/, {
        message: "영문 소문자 또는 숫자로 작성해 주세요",
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirmation"],
  });

export type SignUpRequest = z.infer<typeof signUpRequestSchema>;

// 회원가입 응답 API 타입
export const signUpResponseSchema = z.object({
  id: z.number().min(1),
  email: z.string().min(1),
  nickname: z.string().min(1).max(10),
  createdAt: z.string().transform((str) => new Date(str).toISOString()),
  updatedAt: z.string().transform((str) => new Date(str).toISOString()),
});

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;

// 로그인 요청 API 타입
export const loginRequestSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일은 필수 입력입니다" })
    .email({ message: "유효한 이메일 형식이 아닙니다" }),
  password: z
    .string()
    .min(1, { message: "비밀번호는 필수 입력입니다" })
    .min(8, { message: "최소 8자 이상 입력해 주세요" })
    .regex(/(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+/, {
      message: "영문, 숫자, 특수문자 포함 입력해 주세요",
    }),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

// 로그인 응답 API 타입
export const loginResponseSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  tokenType: z.string(),
  user: z.object({
    id: z.number().min(1),
    email: z.string().min(1),
    nickname: z.string().min(1).max(10),
    createdAt: z.string().transform((str) => new Date(str).toISOString()),
    updatedAt: z.string().transform((str) => new Date(str).toISOString()),
  }),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

// 리프레시 토큰 갱신 응답 API 타입
export const refreshTokenResponseSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string(),
  tokenType: z.string(),
  user: z.object({
    id: z.number().min(1),
    email: z.string().min(1),
    nickname: z.string().min(1).max(10),
    createdAt: z.string().transform((str) => new Date(str).toISOString()),
    updatedAt: z.string().transform((str) => new Date(str).toISOString()),
  }),
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;

// 이메일 인증 번호 발송 요청 API 타입
export const sendEmailVerificationRequestSchema = z.object({
  email: z.string()
    .min(1, { message: "이메일은 필수 입력입니다" })
    .email({ message: "유효한 이메일 형식이 아닙니다" }),
})

export type SendEmailVerificationRequest = z.infer<typeof sendEmailVerificationRequestSchema>;

// 이메일 인증 번호 확인 요청 API 타입
export const verifyEmailCodeRequestSchema = z.object({
  email: z.string()
    .min(1, { message: "이메일은 필수 입력입니다" })
    .email({ message: "유효한 이메일 형식이 아닙니다" }),
  code: z.string().min(1, { message: "인증 번호를 입력해 주세요" })
    .length(6, { message: "6자리를 입력해 주세요" }),
})

export type VerifyEmailCodeRequest = z.infer<typeof verifyEmailCodeRequestSchema>;

// 이메일 인증 번호 확인 응답 API 타입
export const verifyEmailCodeResponseSchema = z.object({
  verifyToken: z.string(),
})

export type VerifyEmailCodeResponse = z.infer<typeof verifyEmailCodeResponseSchema>;