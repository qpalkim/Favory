import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
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
