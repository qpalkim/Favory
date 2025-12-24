import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  GetSearchFavoryListParams,
  SearchFavoryListResponse,
} from "../types/search";
import { getSearchFavoryList } from "../apis/search";

// Favory 검색 조회 훅
export const useSearchFavoryList = (params: GetSearchFavoryListParams) => {
  return useQuery<SearchFavoryListResponse>({
    queryKey: ["favories", "search", params],
    queryFn: () => getSearchFavoryList(params),
    placeholderData: keepPreviousData,
    enabled: !!params.keyword?.trim(),
  });
};
