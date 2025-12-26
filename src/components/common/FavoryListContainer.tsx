"use client";
import { useState } from "react";
import { useFavoryList } from "@/lib/hooks/useFavories";
import { MediaType } from "@/lib/types/favories";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import FeedCard from "../ui/FeedCard";
import Button from "../ui/Button";
import SelectOption from "../ui/SelectOption";
import Pagination from "../ui/Pagination";
import FeedCardSkeleton from "../skeleton/FeedCardSkeleton";
import Empty from "./Empty";

const MEDIA_TYPES: { label: string; value: MediaType | undefined }[] = [
  { label: "전체", value: undefined },
  { label: "음악", value: "MUSIC" },
  { label: "영화", value: "MOVIE" },
  { label: "드라마", value: "DRAMA" },
  { label: "서적", value: "BOOK" },
];

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "등록순", value: "oldest" },
];

export default function FavoryListContainer() {
  const [sortType, setSortType] = useState<"latest" | "oldest">("latest");
  const [mediaType, setMediaType] = useState<MediaType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const isPC = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const itemsPerPage = isPC ? 16 : isTablet ? 12 : 8;

  const { data, isLoading, isError } = useFavoryList({
    page: currentPage - 1,
    size: itemsPerPage,
    sort: sortType,
    type: mediaType,
  });

  const favories = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  const skeletonCount = isPC ? 8 : isTablet ? 6 : 4;

  const handleMediaClick = (type: MediaType | undefined) => {
    setMediaType(type);
    setCurrentPage(1);
  };

  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <div className="mx-auto max-w-[1200px] px-4">
      <div className="my-6 flex items-center justify-between md:my-8 lg:my-12">
        <div className="flex gap-1">
          {MEDIA_TYPES.map((item) => (
            <Button
              key={item.label}
              size="sm"
              variant={mediaType === item.value ? "primary" : "outline"}
              onClick={() => handleMediaClick(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <SelectOption
          options={SORT_OPTIONS}
          onSelect={(option) => {
            setSortType(option.value as "latest" | "oldest");
            setCurrentPage(1);
          }}
        />
      </div>

      {isLoading ? (
        <div className="mb-6 grid grid-cols-2 gap-x-2 gap-y-3 md:mb-8 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:mb-12 lg:grid-cols-4">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <FeedCardSkeleton key={idx} />
          ))}
        </div>
      ) : favories.length === 0 ? (
        <div className="my-12">
          <Empty type="favory" />
        </div>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-2 gap-x-2 gap-y-3 md:mb-8 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:mb-12 lg:grid-cols-4">
            {favories.map((favory) => (
              <FeedCard key={favory.id} favory={favory} />
            ))}
          </div>

          {!isLoading && totalPages > 1 && (
            <div className="my-16 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
