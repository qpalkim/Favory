import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  EditProfileRequest,
  ProfileImageUrlParams,
  profileImageUrlParamsSchema,
  ProfileImageUrlRequest,
  profileImageUrlRequestSchema,
  UserResponse,
} from "../types/users";
import {
  editMyData,
  getMyData,
  getUserData,
  putProfileImageUrl,
} from "../apis/users";

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      params: ProfileImageUrlParams & ProfileImageUrlRequest,
    ) => {
      profileImageUrlParamsSchema.parse({ id: params.id });
      profileImageUrlRequestSchema.parse({ file: params.file });
      return putProfileImageUrl(params);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({
        queryKey: ["users", variables.id],
      });
    },
  });
};

// 프로필 수정 훅
export const useEditMyData = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditProfileRequest) => editMyData(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
  });
};
