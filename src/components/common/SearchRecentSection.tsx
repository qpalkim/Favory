"use client";
import { AxiosError } from "axios";
import { useDeleteRecentSearchList, useRecentSearchList } from "@/lib/hooks/useSearch";
import Badge from "../ui/Badge";
import Empty from "../ui/Empty";
import RetryError from "../ui/RetryError";

interface SearchRecentSectionProps {
  onSearch: (term: string) => void;
}

export default function SearchRecentSection({ onSearch }: SearchRecentSectionProps) {
  const {
    data: recentSearchList,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useRecentSearchList();

  const uniqueRecentList = [...new Set(recentSearchList ?? [])];

  const { mutate: deleteRecentSearchList } = useDeleteRecentSearchList();

  const isLoadingState = isLoading || isFetching;

  const isForbidden = isError && (error as AxiosError).response?.status === 403;

  if (isError && !isForbidden) return <RetryError onRetry={refetch} />;


  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-black-500 md:text-2lg text-[15px] font-medium">
          최근 검색어
        </h2>
        {uniqueRecentList.length > 0 && (
          <button
            type="button"
            aria-label="최근 검색어 전체 삭제"
            disabled={isLoadingState}
            className="text-error-100 cursor-pointer text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 md:text-sm"
            onClick={() => deleteRecentSearchList()}
          >
            모두 지우기
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
        {isLoadingState ? (
          <>
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-black-100/40 h-8 w-12 animate-pulse rounded-md"
              />
            ))}
          </>
        ) : isForbidden ? (
          <div className="my-6 flex w-full justify-center">
            <p className="text-black-200 md:text-md mt-2 text-center text-sm whitespace-pre-line">
              로그인 후, 이용 가능합니다
            </p>
          </div>
        ) : uniqueRecentList.length > 0 ? (
          uniqueRecentList.map((term, idx) => (
            <Badge
              key={`${term}-${idx}`}
              onClick={() => onSearch(term)}
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
    </>
  )
} 