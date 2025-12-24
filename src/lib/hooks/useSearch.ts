import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  GetSearchFavoryListParams,
  SearchFavoryListResponse,
} from "../types/search";
import { getSearchFavoryList } from "../apis/search";

// Favory 검색 조회 훅
export const useSearchFavoryList = (params: GetSearchFavoryListParams) => {
  const { keyword, category, sort, page, size } = params;

  return useQuery<SearchFavoryListResponse>({
    queryKey: ["favories", "search", keyword, category, sort, page, size],
    queryFn: () => getSearchFavoryList(params),
    enabled: !!keyword,
    placeholderData: keepPreviousData,
  });
};
