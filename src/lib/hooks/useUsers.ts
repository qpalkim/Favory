import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ProfileImageUrlParams,
  profileImageUrlRequestSchema,
  UserResponse,
} from "../types/users";
import { getMyData, getUserData, putProfileImageUrl } from "../apis/users";

// 유저 정보 조회 훅
export const useUserData = (id?: number) => {
  return useQuery<UserResponse>({
    queryKey: ["users", id],
    queryFn: () => getUserData(id!),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

// 내 정보 조회 훅
export const useMyData = () => {
  return useQuery<UserResponse>({
    queryKey: ["me"],
    queryFn: getMyData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// 프로필 이미지 등록/수정 훅
export const useProfileImageUrl = () => {
  return useMutation({
    mutationFn: async (params: ProfileImageUrlParams) => {
      profileImageUrlRequestSchema.parse(params);
      return putProfileImageUrl(params);
    },
  });
};
