import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  EditProfileRequest,
  EditProfileResponse,
  editProfileResponseSchema,
  ProfileImageUrlParams,
  ProfileImageUrlRequest,
  ProfileImageUrlResponse,
  profileImageUrlResponseSchema,
  UserResponse,
  userResponseSchema,
} from "../types/users";

// 유저 정보 조회 API
export const getUserData = async (id: number) => {
  const response = await axiosClientHelper.get<UserResponse>(`/users/${id}`);
  return safeResponse(response.data, userResponseSchema);
};

// 내 정보 조회 API
export const getMyData = async () => {
  const response = await axiosClientHelper.get<UserResponse>("/users/me");
  return safeResponse(response.data, userResponseSchema);
};

// 프로필 이미지 등록/수정 요청 API
export const putProfileImageUrl = async (
  params: ProfileImageUrlParams & ProfileImageUrlRequest,
) => {
  const formData = new FormData();
  formData.append("file", params.file);

  const response = await axiosClientHelper.put<ProfileImageUrlResponse>(
    `/users/${params.id}/profile-image`,
    formData,
  );
  return safeResponse(response.data, profileImageUrlResponseSchema);
};

// 프로필 수정 요청 API
export const editMyData = async (
  id: number,
  data: EditProfileRequest,
): Promise<EditProfileResponse> => {
  const response = await axiosClientHelper.patch<EditProfileResponse>(
    `/users/${id}`,
    data,
  );
  return safeResponse(response.data, editProfileResponseSchema);
};
