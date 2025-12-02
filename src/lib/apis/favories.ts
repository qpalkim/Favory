import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  AddFavoryRequest,
  AddFavoryResponse,
  addFavoryResponseSchema,
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

// Faovry 등록 요청 API
export const addFavory = async (data: AddFavoryRequest) => {
  const response = await axiosClientHelper.post<AddFavoryResponse>(
    "/favories",
    data,
  );
  return safeResponse(response.data, addFavoryResponseSchema);
};
