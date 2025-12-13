import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "../types/users";
import { getMyData, getUserData } from "../apis/users";

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
