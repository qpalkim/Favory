import { useMutation } from "@tanstack/react-query";
import { SignUpRequest } from "../types/auth";
import { signUp } from "../apis/auth";

// 회원가입 훅
export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
  });
};
