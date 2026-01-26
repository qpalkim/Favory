import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  AddMediaRequest,
  AddMediaResponse,
  addMediaResponseSchema,
  GetMediaSearchParams,
  MediaExistsResponse,
  mediaExistsResponseSchema,
  MediaSearchResponse,
  mediaSearchResponseSchema,
} from "../types/media";

// 외부 API 미디어 검색 조회 API
export const getMediaSearch = async (params: GetMediaSearchParams) => {
  const response = await axiosClientHelper.get<MediaSearchResponse>(
    "/media/search",
    { params },
  );
  return safeResponse(response.data, mediaSearchResponseSchema);
};

// 미디어 존재 여부 조회 API
export const getMediaExists = async (externalId: string) => {
  const response = await axiosClientHelper.get<MediaExistsResponse>(
    "/media/exists",
    { params: { externalId } },
  );
  return safeResponse(response.data, mediaExistsResponseSchema);
};

// 미디어 등록 API
export const addMedia = async (data: AddMediaRequest) => {
  const response = await axiosClientHelper.post<AddMediaResponse>(
    "/media",
    data,
  );
  return safeResponse(response.data, addMediaResponseSchema);
};
