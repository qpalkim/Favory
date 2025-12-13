import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import { UserResponse, userResponseSchema } from "../types/users";

// 유저 정보 조회 API
export const getUserData = async (id: number) => {
  const response = await axiosClientHelper.get<UserResponse>(`users/${id}`);
  return safeResponse(response.data, userResponseSchema);
};

// 내 정보 조회 API
export const getMyData = async () => {
  const response = await axiosClientHelper.get<UserResponse>("/users/me");
  return safeResponse(response.data, userResponseSchema);
};
