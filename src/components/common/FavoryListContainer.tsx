"use client";
import { useEffect, useState } from "react";
import { useFavoryList } from "@/lib/hooks/useFavories";
import { MediaType } from "@/lib/types/favories";
import { SORT_OPTIONS } from "@/lib/utils/constants";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import FeedCard from "../ui/FeedCard";
import Button from "../ui/Button";
import SelectOption from "../ui/SelectOption";
import Pagination from "../ui/Pagination";
import FeedCardSkeleton from "../skeleton/FeedCardSkeleton";
import Empty from "../ui/Empty";
import RetryError from "../ui/RetryError";

const MEDIA_TYPES: { label: string; value: MediaType | undefined }[] = [
  { label: "전체", value: undefined },
  { label: "음악", value: "MUSIC" },
  { label: "영화", value: "MOVIE" },
  { label: "드라마", value: "DRAMA" },
  { label: "도서", value: "BOOK" },
];

export default function FavoryListContainer() {
  const [sortOption, setSortOption] = useState<"latest" | "oldest">("latest");
  const [mediaType, setMediaType] = useState<MediaType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const isPC = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const itemsPerPage = isPC ? 16 : isTablet ? 12 : 8;

  const { data, isLoading, isFetching, isError, refetch } = useFavoryList({
    page: currentPage - 1,
    size: itemsPerPage,
    sort: sortOption,
    type: mediaType,
  });

  const favories = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleMediaClick = (type: MediaType | undefined) => {
    if (mediaType === type) return;
    setMediaType(type);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <section aria-label="감상평 목록" className="mx-auto max-w-[1200px] px-4">
      <div className="my-6 flex items-center justify-between md:my-8 lg:my-12">
        <div role="group" aria-label="카테고리 필터" className="flex gap-1">
          {MEDIA_TYPES.map((item) => (
            <Button
              key={item.label}
              size="sm"
              variant={mediaType === item.value ? "primary" : "outline"}
              onClick={() => handleMediaClick(item.value)}
              disabled={isLoading || isFetching}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <SelectOption
          options={SORT_OPTIONS}
          disabled={isLoading || isFetching}
          onSelect={(option) => {
            if (sortOption == option.value) return;
            setSortOption(option.value as "latest" | "oldest");
            setCurrentPage(1);
          }}
        />
      </div>

      {isLoading ? (
        <div className="mb-16 grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:grid-cols-4">
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <FeedCardSkeleton key={idx} />
          ))}
        </div>
      ) : favories.length === 0 ? (
        <div className="my-12">
          <Empty type="favory" />
        </div>
      ) : (
        <>
          <div className="mb-16 grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:grid-cols-4">
            {favories.map((favory) => (
              <FeedCard key={favory.id} favory={favory} />
            ))}
          </div>

          {!isLoading && totalPages > 1 && (
            <nav aria-label="감상평 페이지네이션" className="my-16 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
                disabled={isLoading || isFetching}
              />
            </nav>
          )}
        </>
      )}
    </section>
  );
}
