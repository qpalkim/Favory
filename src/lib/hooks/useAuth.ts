import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse, SignUpRequest } from "../types/auth";
import { login, signUp } from "../apis/auth";

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
