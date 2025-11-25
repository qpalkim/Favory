import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FavoryListResponse, GetFavoryListParams } from "../types/favories";
import { getFavoryList } from "../apis/favories";

// Favory 목록 조회 훅
export const useFavoryList = (params: GetFavoryListParams) => {
  return useQuery<FavoryListResponse>({
    queryKey: ["favories", params],
    queryFn: () => getFavoryList(params),
    placeholderData: keepPreviousData,
  });
};
