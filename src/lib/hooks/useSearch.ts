import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GetSearchFavoryListParams,
  RecentSearchListResponse,
  SearchFavoryListResponse,
} from "../types/search";
import {
  deleteSearchRecent,
  getRecentSearchList,
  getSearchFavoryList,
} from "../apis/search";

// Favory 검색 조회 훅
export const useSearchFavoryList = (params: GetSearchFavoryListParams) => {
  const { keyword, category, sort, page, size } = params;

  return useQuery<SearchFavoryListResponse>({
    queryKey: ["favories", "search", keyword, category, sort, page, size],
    queryFn: () => getSearchFavoryList(params),
    placeholderData: keepPreviousData,
    enabled: !!keyword,
  });
};

// 최근 검색어 조회 훅
export const useRecentSearchList = () => {
  return useQuery<RecentSearchListResponse>({
    queryKey: ["search", "recent"],
    queryFn: getRecentSearchList,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

// 최근 검색어 전체 삭제 요청 훅
export const useDeleteRecentSearchList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSearchRecent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search", "recent"] });
    },
  });
};
