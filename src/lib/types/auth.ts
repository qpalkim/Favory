import z from "zod";

// 회원가입 요청 API 타입
export const signUpRequestSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "이메일은 필수 입력입니다" })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "유효한 이메일 형식이 아닙니다",
      }),
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
      .regex(/^[A-Za-z0-9]+$/, {
        message: "영문 또는 숫자로 작성해 주세요",
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
  profileImageUrl: z.string().url().nullable(),
  profileMessage: z.string().nullable(),
});

export type SignUpResponse = z.infer<typeof signUpResponseSchema>;

// 로그인 요청 API 타입
export const loginRequestSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일은 필수 입력입니다" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "유효한 이메일 형식이 아닙니다",
    }),
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
// 추후 유저 정보 반환 수정 필요
export const loginResponseSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  tokenType: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
