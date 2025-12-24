"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Category } from "@/lib/types/search";
import { UserResponse } from "@/lib/types/users";
import { Favory } from "@/lib/types/favories";
import { useSearchFavoryList } from "@/lib/hooks/search";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import SearchBar from "../ui/SearchBar";
import FavoryItem from "../ui/FavoryItem";
import ProfileItem from "../ui/ProfileItem";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import SelectOption from "../ui/SelectOption";
import Pagination from "../ui/Pagination";
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

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  const { data, isLoading, isError } = useSearchFavoryList({
    keyword,
    category: category,
    sort: sortType,
    size: itemsPerPage,
    page: currentPage - 1,
  });
  const favories = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  const sortOptions = [
    { label: "최신순", value: "latest" },
    { label: "등록순", value: "oldest" },
  ];

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
            <button className="text-error-100 text-xs font-medium md:text-sm">
              모두 지우기
            </button>
          </div>

          <div className="mt-3 flex gap-2 md:mt-4">
            <Badge>검색어</Badge>
          </div>
        </div>

        {keyword &&
          (isLoading ? (
            <div>로딩 중입니다</div>
          ) : (
            <div>
              <div className="flex items-center justify-between md:hidden">
                <h4 className="text-black-500 md:text-2lg text-[15px] font-medium">
                  검색 결과 {data?.totalElements}개
                </h4>
                <SelectOption
                  options={sortOptions}
                  onSelect={(option) => {
                    setSortType(option.value as "latest" | "oldest");
                    setCurrentPage(1);
                  }}
                />
              </div>

              <h4 className="text-black-500 md:text-2lg hidden font-medium md:block">
                검색 결과 {data?.totalElements}개
              </h4>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {MEDIA_TYPES.map((item) => (
                    <Button
                      key={item.label}
                      size="sm"
                      variant={category === item.value ? "primary" : "outline"}
                      onClick={() => handleCategoryClick(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
                <div className="hidden md:block">
                  <SelectOption
                    options={sortOptions}
                    onSelect={(option) => {
                      setSortType(option.value as "latest" | "oldest");
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <div className="mt-6">
                {favories.length === 0 ? (
                  <div className="my-12">
                    <Empty type="search" />
                  </div>
                ) : category === "PROFILE" ? (
                  (favories as UserResponse[]).map((profile) => (
                    <ProfileItem key={profile.id} profile={profile} />
                  ))
                ) : (
                  (favories as Favory[]).map((favory) => (
                    <FavoryItem key={favory.id} favory={favory} />
                  ))
                )}
              </div>
            </div>
          ))}
      </div>

      {totalPages > 1 && (
        <div className="my-16 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
