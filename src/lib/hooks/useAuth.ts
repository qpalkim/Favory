import { useMutation } from "@tanstack/react-query";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  SendEmailVerificationRequest,
  SignUpRequest,
  VerifyEmailCodeRequest,
} from "../types/auth";
import { login, refreshToken, sendEmailVerification, signUp, verifyEmailCode } from "../apis/auth";

// 회원가입 훅
export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
  });
};

// 로그인 훅
export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
};

// 리프레시 토큰 갱신 훅
export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, Error, void>({
    mutationFn: refreshToken,
  });
};

// 이메일 인증 번호 발송 훅
export const useSendEmailVerification = () => {
  return useMutation({
    mutationFn: (data: SendEmailVerificationRequest) => sendEmailVerification(data),
  })
}

// 이메일 인증 번호 확인 훅
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: (data: VerifyEmailCodeRequest) => verifyEmailCode(data),
  })
}