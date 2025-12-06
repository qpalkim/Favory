import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  AddFavoryRequest,
  AddFavoryResponse,
  addFavoryResponseSchema,
  EditFavoryRequest,
  EditFavoryResponse,
  editFavoryResponseSchema,
  FavoryDetailResponse,
  favoryDetailResponseSchema,
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

// Faovry 등록 API
export const addFavory = async (data: AddFavoryRequest) => {
  const response = await axiosClientHelper.post<AddFavoryResponse>(
    "/favories",
    data,
  );
  return safeResponse(response.data, addFavoryResponseSchema);
};

// Favory 상세 조회 API
export const getFavoryDetail = async (id: number) => {
  const response = await axiosClientHelper.get<FavoryDetailResponse>(
    `/favories/${id}`,
  );
  return safeResponse(response.data, favoryDetailResponseSchema);
};

// Favory 수정 API
export const editFavory = async (
  id: number,
  data: EditFavoryRequest,
): Promise<EditFavoryResponse> => {
  const response = await axiosClientHelper.put<EditFavoryResponse>(
    `favories/${id}`,
    data,
  );
  return safeResponse(response.data, editFavoryResponseSchema);
};

// Favory 삭제 API
export const deleteFavory = async (id: number): Promise<void> => {
  await axiosClientHelper.delete(`/favories/${id}`);
};
