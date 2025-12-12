import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  LoginRequest,
  LoginResponse,
  loginResponseSchema,
  RefreshTokenResponse,
  refreshTokenResponseSchema,
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

// 리프레시 토큰 갱신 요청 API
export const refreshToken = async () => {
  const response = await axiosClientHelper.post<RefreshTokenResponse>(
    "/refresh-token",
    {},
    { withCredentials: true },
  );
  return safeResponse(response.data, refreshTokenResponseSchema);
};
