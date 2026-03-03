import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  LoginRequest,
  LoginResponse,
  loginResponseSchema,
  RefreshTokenResponse,
  refreshTokenResponseSchema,
  SendEmailVerificationRequest,
  SignUpRequest,
  SignUpResponse,
  signUpResponseSchema,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  verifyEmailCodeResponseSchema,
} from "../types/auth";

// 회원가입 요청 API
export const signUp = async (data: SignUpRequest) => {
  const response = await axiosClientHelper.post<SignUpResponse>(
    "/signup",
    data,
  );
  return safeResponse(response.data, signUpResponseSchema);
};

// 로그인 요청 API
export const login = async (data: LoginRequest) => {
  const response = await axiosClientHelper.post<LoginResponse>("/login", data);
  return safeResponse(response.data, loginResponseSchema);
};

// 리프레시 토큰 갱신 요청 API
export const refreshToken = async () => {
  const response = await axiosClientHelper.post<RefreshTokenResponse>(
    "/refresh-token",
    {},
    { withCredentials: true },
  );
  return safeResponse(response.data, refreshTokenResponseSchema);
};

// 이메일 인증 번호 발송 요청 API
export const sendEmailVerification = async (data: SendEmailVerificationRequest) => {
  const response = await axiosClientHelper.post<void>("/auth/email/send", data);
  return response.data;
}

// 이메일 인증 번호 확인 요청 API
export const verifyEmailCode = async (data: VerifyEmailCodeRequest) => {
  const response = await axiosClientHelper.post<VerifyEmailCodeResponse>("/auth/email/verify", data);
  return safeResponse(response.data, verifyEmailCodeResponseSchema);
} 
