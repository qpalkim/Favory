import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AddFavoryRequest,
  AddFavoryResponse,
  EditFavoryRequest,
  FavoryDetailResponse,
  FavoryListResponse,
  GetFavoryListParams,
  UserFavoryListResponse,
} from "../types/favories";
import {
  addFavory,
  deleteFavory,
  editFavory,
  getFavoryDetail,
  getFavoryList,
  getUserFavoryList,
} from "../apis/favories";

// Favory 목록 조회 훅
export const useFavoryList = (params: GetFavoryListParams) => {
  return useQuery<FavoryListResponse>({
    queryKey: ["favories", params],
    queryFn: () => getFavoryList(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
    retry: 1,
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

// Favory 상세 조회 훅
export const useFavoryDetail = (id: number) => {
  return useQuery<FavoryDetailResponse>({
    queryKey: ["favories", id],
    queryFn: () => getFavoryDetail(id),
  });
};

// Favory 수정 요청 훅
export const useEditFavory = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EditFavoryRequest) => editFavory(id, data),
    onSuccess: (editFavory) => {
      queryClient.setQueryData(["favories", id], editFavory);
      queryClient.invalidateQueries({ queryKey: ["favories"] });
    },
  });
};

// Favory 삭제 요청 훅
export const useDeleteFavory = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteFavory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favories"] });
    },
  });
};

// 닉네임 기반 Favory 목록 조회 훅
export const useUserFavoryList = (
  nickname: string,
  params: GetFavoryListParams,
) => {
  return useQuery<UserFavoryListResponse>({
    queryKey: ["favories", nickname, params],
    queryFn: () => getUserFavoryList(nickname, params),
  });
};
