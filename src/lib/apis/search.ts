import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  GetSearchFavoryListParams,
  RecentSearchListResponse,
  recentSearchListResponseSchema,
  SearchFavoryListResponse,
  searchFavoryListResponseSchema,
} from "../types/search";

// Favory 검색 조회 API
export const getSearchFavoryList = async (
  params: GetSearchFavoryListParams,
) => {
  const response = await axiosClientHelper.get<SearchFavoryListResponse>(
    "/search",
    { params },
  );
  return safeResponse(response.data, searchFavoryListResponseSchema);
};

// 최근 검색어 조회 API
export const getRecentSearchList = async () => {
  const response =
    await axiosClientHelper.get<RecentSearchListResponse>("/search/recent");
  return safeResponse(response.data, recentSearchListResponseSchema);
};

// 최근 검색어 전체 삭제 API
export const deleteSearchRecent = async () => {
  await axiosClientHelper.delete("/search/recent");
};
