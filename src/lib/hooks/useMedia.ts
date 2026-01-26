import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AddMediaRequest,
  AddMediaResponse,
  GetMediaSearchParams,
  MediaExistsResponse,
  MediaSearchResponse,
} from "../types/media";
import { addMedia, getMediaExists, getMediaSearch } from "../apis/media";

// 외부 API 미디어 검색 조회 훅
export const useMediaSearch = (
  params: GetMediaSearchParams,
  enabled = true,
) => {
  return useQuery<MediaSearchResponse>({
    queryKey: ["media", params.keyword, params.type, params.limit],
    queryFn: () => getMediaSearch(params),
    enabled,
  });
};

// 미디어 존재 여부 조회 훅
export const useMediaExists = (externalId: string) => {
  return useQuery<MediaExistsResponse>({
    queryKey: ["media", externalId],
    queryFn: () => getMediaExists(externalId),
    enabled: !!externalId,
  });
};

// 미디어 등록 훅
export const useAddMedia = () => {
  return useMutation<AddMediaResponse, unknown, AddMediaRequest>({
    mutationFn: addMedia,
  });
};
