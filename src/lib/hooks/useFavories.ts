import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AddFavoryRequest,
  AddFavoryResponse,
  FavoryListResponse,
  GetFavoryListParams,
} from "../types/favories";
import { addFavory, getFavoryList } from "../apis/favories";

// Favory 목록 조회 훅
export const useFavoryList = (params: GetFavoryListParams) => {
  return useQuery<FavoryListResponse>({
    queryKey: ["favories", params],
    queryFn: () => getFavoryList(params),
    placeholderData: keepPreviousData,
  });
};

// Favory 등록 요청 훅
export const useAddFavory = () => {
  const queryClient = useQueryClient();
  return useMutation<AddFavoryResponse, unknown, AddFavoryRequest>({
    mutationFn: addFavory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favories"] });
    },
  });
};
