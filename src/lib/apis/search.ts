import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  GetSearchFavoryListParams,
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
