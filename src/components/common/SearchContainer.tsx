"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Category } from "@/lib/types/search";
import { UserResponse } from "@/lib/types/users";
import { Favory } from "@/lib/types/favories";
import {
  useDeleteRecentSearchList,
  useRecentSearchList,
  useSearchFavoryList,
} from "@/lib/hooks/useSearch";
import { SORT_OPTIONS } from "@/lib/utils/constants";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import SearchBar from "../ui/SearchBar";
import FavoryItem from "../ui/FavoryItem";
import ProfileItem from "../ui/ProfileItem";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import SelectOption from "../ui/SelectOption";
import Pagination from "../ui/Pagination";
import FavoryItemSkeleton from "../skeleton/FavoryItemSkeleton";
import Empty from "./Empty";

const MEDIA_TYPES: { label: string; value: Category | undefined }[] = [
  { label: "전체", value: undefined },
  { label: "음악", value: "MUSIC" },
  { label: "영화", value: "MOVIE" },
  { label: "드라마", value: "DRAMA" },
  { label: "서적", value: "BOOK" },
  { label: "프로필", value: "PROFILE" },
];

export default function SearchContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword")?.trim() ?? "";
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [sortType, setSortType] = useState<"latest" | "oldest">("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const isPC = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const itemsPerPage = isPC ? 10 : isTablet ? 8 : 6;
  const isTagSearch = keyword.startsWith("#");

  const { data, isLoading, isFetching, isError } = useSearchFavoryList({
    keyword,
    category: isTagSearch ? undefined : category,
    sort: sortType,
    size: itemsPerPage,
    page: currentPage - 1,
  });
  const content = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    setCurrentPage(1);

    if (keyword.startsWith("#")) {
      setCategory(undefined);
    }
  }, [keyword]);

  const isProfileCategory = category === "PROFILE";
  const favoryList: Favory[] = !isProfileCategory ? (content as Favory[]) : [];
  const profileList: UserResponse[] = isProfileCategory
    ? (content as UserResponse[])
    : [];

  const {
    data: recentSearchList,
    isLoading: isRecentSearchListLoading,
    isFetching: isRecentSearchListFetching,
  } = useRecentSearchList();
  const { mutate: deleteRecentSearchList } = useDeleteRecentSearchList();

  const handleSearch = (term: string) => {
    setCurrentPage(1);
    router.push(`/search?keyword=${encodeURIComponent(term)}`);
  };

  const handleCategoryClick = (type: Category | undefined) => {
    setCategory(type);
    setCurrentPage(1);
  };

  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <div className="mx-auto min-h-screen max-w-[1200px] p-4 md:mt-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[660px_minmax(0,416px)] lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <ArrowLeft
              className="h-6 w-6 cursor-pointer text-green-600 hover:text-green-500 lg:hidden"
              onClick={() => router.back()}
            />
            <SearchBar onSearch={handleSearch} searchTerm={keyword} />
          </div>
        </div>

        <div className="lg:row-span-2">
          <div className="flex items-center justify-between">
            <h4 className="text-black-500 md:text-2lg text-[15px] font-medium">
              최근 검색어
            </h4>
            <button
              className="text-error-100 cursor-pointer text-xs font-medium md:text-sm"
              onClick={() => deleteRecentSearchList()}
            >
              모두 지우기
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
            {isRecentSearchListLoading || isRecentSearchListFetching ? (
              <>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-black-100/40 h-8 w-12 animate-pulse rounded-md"
                  />
                ))}
              </>
            ) : recentSearchList && recentSearchList.length > 0 ? (
              recentSearchList.map((recentSearch, idx) => (
                <Badge
                  key={`${recentSearch}-${idx}`}
                  onClick={() => handleSearch(recentSearch)}
                >
                  {recentSearch}
                </Badge>
              ))
            ) : (
              <div className="my-6 flex w-full justify-center">
                <Empty type="recentSearch" />
              </div>
            )}
          </div>
        </div>

        {keyword && (
          <div>
            <div className="flex items-center justify-between md:hidden">
              <h4 className="text-black-500 md:text-2lg text-[15px] font-medium">
                검색 결과 {data?.totalElements || 0}개
              </h4>
              <SelectOption
                options={SORT_OPTIONS}
                disabled={isLoading || isFetching}
                onSelect={(option) => {
                  if (sortType === option.value) return;
                  setSortType(option.value as "latest" | "oldest");
                  setCurrentPage(1);
                }}
              />
            </div>

            <h4 className="text-black-500 md:text-2lg hidden font-medium md:block">
              검색 결과 {data?.totalElements || 0}개
            </h4>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {MEDIA_TYPES.map((item) => (
                  <Button
                    key={item.label}
                    size="sm"
                    variant={category === item.value ? "primary" : "outline"}
                    onClick={() => handleCategoryClick(item.value)}
                    disabled={isLoading || isFetching}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
              <div className="hidden md:block">
                <SelectOption
                  options={SORT_OPTIONS}
                  disabled={isLoading || isFetching}
                  onSelect={(option) => {
                    if (sortType === option.value) return;
                    setSortType(option.value as "latest" | "oldest");
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="mt-6">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <FavoryItemSkeleton key={idx} />
                ))
              ) : isProfileCategory ? (
                profileList.length === 0 ? (
                  <div className="my-24">
                    <Empty type="search" />
                  </div>
                ) : (
                  profileList.map((profile) => (
                    <ProfileItem key={profile.id} profile={profile} />
                  ))
                )
              ) : favoryList.length === 0 ? (
                <div className="my-24">
                  <Empty type="search" />
                </div>
              ) : (
                favoryList.map((favory) => (
                  <FavoryItem key={favory.id} favory={favory} />
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="my-16 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
            disabled={isLoading || isFetching}
          />
        </div>
      )}
    </div>
  );
}
