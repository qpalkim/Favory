import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  LoginRequest,
  LoginResponse,
  loginResponseSchema,
  SignUpRequest,
  SignUpResponse,
  signUpResponseSchema,
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
