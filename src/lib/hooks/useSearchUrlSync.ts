import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchCategory, SearchFavoryListResponse } from "../types/search";

type UseSearchUrlSyncParams = {
  canShowProfile: boolean;
  category: SearchCategory | undefined;
  isProfileCategory: boolean;
  sortOption: "latest" | "oldest" | "popular";
  currentPage: number;
  data: SearchFavoryListResponse | undefined;
};

// 검색 페이지의 URL 쿼리 상태를 실제 조건(프로필 노출 가능 여부, 페이지 범위, 정렬 옵션)에 맞게 동기화하는 훅
export const useSearchUrlSync = ({
  canShowProfile,
  category,
  isProfileCategory,
  sortOption,
  currentPage,
  data,
}: UseSearchUrlSyncParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 프로필 카테고리를 보여줄 수 없는 상태인데 type=PROFILE이 남아 있으면 제거
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (!canShowProfile && category === "PROFILE") {
      params.delete("type");
      router.replace(`/search?${params.toString()}`);
    }
  }, [canShowProfile, category, router, searchParams]);

  // 현재 페이지가 전체 페이지 수를 초과하면 마지막 페이지로 보정
  useEffect(() => {
    if (!data) return;
    if (data.totalPages === 0) return;

    if (currentPage > data.totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(data.totalPages));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [data, currentPage, router, pathname, searchParams]);

  // 프로필 카테고리에서는 인기순 정렬을 지원하지 않으므로 최신순으로 보정
  useEffect(() => {
    if (isProfileCategory && sortOption === "popular") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", "latest");

      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [isProfileCategory, sortOption, pathname, router, searchParams]);
};
