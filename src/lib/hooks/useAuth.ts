import { useMutation } from "@tanstack/react-query";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  SignUpRequest,
} from "../types/auth";
import { login, refreshToken, signUp } from "../apis/auth";

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
