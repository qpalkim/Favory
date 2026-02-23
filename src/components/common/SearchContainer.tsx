"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { SearchCategory } from "@/lib/types/search";
import { User } from "@/lib/types/users";
import { Favory } from "@/lib/types/favories";
import { useSearchFavoryList } from "@/lib/hooks/useSearch";
import { CATEGORY_LABEL_MAP, SEARCH_MEDIA_CATEGORY_OPTIONS, SORT_OPTIONS } from "@/lib/utils/constants";
import { getCategoryFromLabel } from "@/lib/utils/getCategoryFromLabel";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import SearchRecentSection from "./SearchRecentSection";
import SearchBar from "../ui/SearchBar";
import FavoryItem from "../ui/FavoryItem";
import ProfileItem from "../ui/ProfileItem";
import Button from "../ui/Button";
import SelectOption from "../ui/SelectOption";
import Pagination from "../ui/Pagination";
import FavoryItemSkeleton from "../skeleton/FavoryItemSkeleton";
import ProfileItemSkeleton from "../skeleton/ProfileItemSkeleton";
import Empty from "../ui/Empty";
import RetryError from "../ui/RetryError";

export default function SearchContainer() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const keyword = searchParams.get("keyword")?.trim() ?? "";
  const isTagSearch = keyword.startsWith("#");

  const categoryLabel = searchParams.get("type");
  const category = getCategoryFromLabel<SearchCategory>(categoryLabel, CATEGORY_LABEL_MAP);

  const pageParam = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const currentPage = pageParam;

  const sortOption = (searchParams.get("sort") as "latest" | "oldest") ?? "latest";

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const itemsPerPage = isDesktop ? 8 : 6;

  const { data, isLoading, isFetching, isError, refetch } = useSearchFavoryList({
    keyword,
    category,
    sort: sortOption,
    size: itemsPerPage,
    page: currentPage - 1,
  });
  const isSearching = isLoading || isFetching;
  const totalPages = data?.totalPages ?? 0;

  const isProfileCategory = category === "PROFILE";

  const favoryList: Favory[] = !isProfileCategory && data ? (data.content as Favory[]) : [];

  const profileList: User[] = isProfileCategory && data ? (data.content as User[]) : [];

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (isTagSearch && category === "PROFILE") {
      params.delete("type");
      router.replace(`/search?${params.toString()}`);
    }
  }, [isTagSearch, category, router, searchParams]);

  useEffect(() => {
    if (!data) return;
    if (data.totalPages === 0) return;

    if (currentPage > data.totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(data.totalPages));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [data, currentPage, router, pathname, searchParams]);

  const handleSearchChange = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("keyword", term);
    params.delete("type");
    params.delete("page");
    router.push(`/search?${params.toString()}`);

    queryClient.invalidateQueries({
      queryKey: ["search", "recent"],
      exact: true,
    });
  };

  const handleCategoryChange = (type: SearchCategory | undefined) => {
    const label = type ? CATEGORY_LABEL_MAP[type] : null;
    const params = new URLSearchParams(searchParams.toString());

    if (label) params.set("type", label);
    else params.delete("type");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleSortChange = (value: "latest" | "oldest") => {
    if (sortOption === value) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.delete("page");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) params.delete("page");
    else params.set("page", String(page));

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  if (isError)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <RetryError
          onRetry={() => {
            refetch();
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
            <SearchBar onSearch={handleSearchChange} searchTerm={keyword} />
          </div>
        </section>

        <section className="lg:row-span-2">
          <SearchRecentSection onSearch={handleSearchChange} />
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
                onSelect={(option) => handleSortChange(option.value as "latest" | "oldest")}
              />
            </div>

            <h2 className="text-black-500 md:text-2lg hidden font-medium md:block">
              검색 결과 {data?.totalElements || 0}개
            </h2>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {SEARCH_MEDIA_CATEGORY_OPTIONS.map((item) => {
                  const isDisabled =
                    item.value === "PROFILE" && isTagSearch;

                  return (
                    <Button
                      key={item.label}
                      size="sm"
                      variant={category === item.value ? "primary" : "outline"}
                      onClick={() => handleCategoryChange(item.value)}
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
                  onSelect={(option) => handleSortChange(option.value as "latest" | "oldest")}
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
              <nav aria-label="감상평 페이지네이션" className="my-16 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onChange={handlePageChange}
                  disabled={isLoading || isFetching}
                />
              </nav>
            )}
          </section>
        )}
      </div>
    </section>
  );
}
