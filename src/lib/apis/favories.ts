import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  FavoryListResponse,
  favoryListResponseSchema,
  GetFavoryListParams,
} from "../types/favories";

// Favory 목록 조회 API
export const getFavoryList = async (params: GetFavoryListParams) => {
  const response = await axiosClientHelper.get<FavoryListResponse>(
    "/favories",
    { params },
  );
  return safeResponse(response.data, favoryListResponseSchema);
};
