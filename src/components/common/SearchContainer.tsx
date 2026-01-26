"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Category } from "@/lib/types/search";
import { User } from "@/lib/types/users";
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
import ProfileItemSkeleton from "../skeleton/ProfileItemSkeleton";
import Empty from "../ui/Empty";
import RetryError from "../ui/RetryError";

const MEDIA_TYPES: { label: string; value: Category | undefined }[] = [
  { label: "전체", value: undefined },
  { label: "음악", value: "MUSIC" },
  { label: "영화", value: "MOVIE" },
  { label: "드라마", value: "DRAMA" },
  { label: "도서", value: "BOOK" },
  { label: "프로필", value: "PROFILE" },
];

export default function SearchContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword")?.trim() ?? "";
  const isTagSearch = keyword.startsWith("#");

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [sortOption, setSortOption] = useState<"latest" | "oldest">("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const itemsPerPage = isDesktop ? 8 : 6;

  const { data, isLoading, isFetching, isError, refetch } = useSearchFavoryList(
    {
      keyword,
      category: category,
      sort: sortOption,
      size: itemsPerPage,
      page: currentPage - 1,
    },
  );
  const isSearching = isLoading || isFetching;
  const totalPages = data?.totalPages ?? 0;

  const isProfileCategory = category === "PROFILE";
  const favoryList: Favory[] =
    !isProfileCategory && data ? (data.content as Favory[]) : [];
  const profileList: User[] =
    isProfileCategory && data ? (data.content as User[]) : [];

  const {
    data: recentSearchList,
    isLoading: isRecentLoading,
    isFetching: isRecentFetching,
    isError: isRecentError,
    refetch: refetchRecent,
  } = useRecentSearchList();

  const { mutate: deleteRecentSearchList } = useDeleteRecentSearchList();
  const isRecentListLoading = isRecentLoading || isRecentFetching;

  useEffect(() => {
    setCurrentPage(1);
    if (isTagSearch && category === "PROFILE") {
      setCategory(undefined);
    }
  }, [keyword, category, isTagSearch]);

  const handleSearch = (term: string) => {
    setCurrentPage(1);
    router.push(`/search?keyword=${encodeURIComponent(term)}`);
  };

  const handleCategory = (type: Category | undefined) => {
    setCategory(type);
    setCurrentPage(1);
  };

  if (isError)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <RetryError
          onRetry={() => {
            refetch();
            refetchRecent();
          }}
        />
      </div>
    );

  return (
    <section className="mx-auto min-h-screen max-w-[1200px] p-4 md:mt-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[660px_minmax(0,416px)] lg:justify-between">
        <section>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="뒤로 가기" onClick={() => router.back()} className="lg:hidden">
              <ArrowLeft
                className="h-6 w-6 cursor-pointer text-green-600 hover:text-green-500"
              /></button>
            <SearchBar onSearch={handleSearch} searchTerm={keyword} />
          </div>
        </section>

        <section className="lg:row-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-black-500 md:text-2lg text-[15px] font-medium">
              최근 검색어
            </h2>
            {recentSearchList && recentSearchList.length > 0 && (
              <button
                type="button"
                aria-label="최근 검색어 전체 삭제"
                disabled={isRecentListLoading}
                className="text-error-100 cursor-pointer text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 md:text-sm"
                onClick={() => deleteRecentSearchList()}
              >
                모두 지우기
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
            {isRecentListLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-black-100/40 h-8 w-12 animate-pulse rounded-md"
                  />
                ))}
              </>
            ) : isRecentError ? (
              <div className="my-6 flex w-full justify-center">
                <p className="text-black-200 md:text-md mt-2 text-center text-sm whitespace-pre-line">
                  로그인 후, 이용 가능합니다
                </p>
              </div>
            ) : recentSearchList && recentSearchList.length > 0 ? (
              recentSearchList.map((term, idx) => (
                <Badge
                  key={`${term}-${idx}`}
                  onClick={() => handleSearch(term)}
                >
                  {term}
                </Badge>
              ))
            ) : (
              <div className="my-6 flex w-full justify-center">
                <Empty type="recentSearch" />
              </div>
            )}
          </div>
        </section>

        {keyword && (
          <section>
            <div className="flex items-center justify-between md:hidden">
              <h2 className="text-black-500 md:text-2lg text-[15px] font-medium">
                검색 결과 {data?.totalElements || 0}개
              </h2>
              <SelectOption
                options={SORT_OPTIONS}
                disabled={isLoading || isFetching}
                onSelect={(option) => {
                  if (sortOption === option.value) return;
                  setSortOption(option.value as "latest" | "oldest");
                  setCurrentPage(1);
                }}
              />
            </div>

            <h2 className="text-black-500 md:text-2lg hidden font-medium md:block">
              검색 결과 {data?.totalElements || 0}개
            </h2>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {MEDIA_TYPES.map((item) => {
                  const isDisabled =
                    item.value === "PROFILE" && isTagSearch;

                  return (
                    <Button
                      key={item.label}
                      size="sm"
                      variant={category === item.value ? "primary" : "outline"}
                      onClick={() => handleCategory(item.value)}
                      disabled={isSearching || isDisabled}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </div>
              <div className="hidden md:block">
                <SelectOption
                  options={SORT_OPTIONS}
                  disabled={isLoading || isFetching}
                  onSelect={(option) => {
                    if (sortOption === option.value) return;
                    setSortOption(option.value as "latest" | "oldest");
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="mt-6">
              {isSearching ? (
                isProfileCategory ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <ProfileItemSkeleton key={idx} />
                  ))
                ) : (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <FavoryItemSkeleton key={idx} />
                  ))
                )
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
          </section>
        )}
      </div>
    </section>
  );
}
