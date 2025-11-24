import { useQuery } from "@tanstack/react-query";
import { UserResponse } from "../types/user";
import { getUserData } from "../apis/user";

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
