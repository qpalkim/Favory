"use client";
import { useState } from "react";
import { useFavoryList } from "@/lib/hooks/useFavories";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import FeedCard from "../ui/FeedCard";
import FeedCardSkeleton from "../skeleton/FeedCardSkeleton";
import Button from "../ui/Button";
import SelectOption from "../ui/SelectOption";
import Pagination from "../ui/Pagination";

export default function FavoryListContainer() {
  const [sortType, setSortType] = useState<"latest" | "oldest">("latest");
  const { data, isLoading, isError } = useFavoryList({
    sort: sortType,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const isPC = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const itemsPerPage = isPC ? 16 : isTablet ? 12 : 8;
  const skeletonCount = isPC ? 8 : isTablet ? 6 : 4;
  const favories = data?.content ?? [];
  const totalPages = Math.ceil(favories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = favories.slice(startIndex, startIndex + itemsPerPage);
  const sortOptions = [
    { label: "최신순", value: "latest" },
    { label: "등록순", value: "oldest" },
  ];

  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <div className="mx-auto max-w-[1200px] px-6">
      <div className="my-6 flex items-center justify-between md:my-8 lg:my-12">
        <div className="flex gap-1">
          <Button size="sm">전체</Button>
          <Button variant="outline" size="sm">
            음악
          </Button>
          <Button variant="outline" size="sm">
            영화
          </Button>
          <Button variant="outline" size="sm">
            드라마
          </Button>
          <Button variant="outline" size="sm">
            서적
          </Button>
        </div>
        <SelectOption
          options={sortOptions}
          onSelect={(option) =>
            setSortType(option.value as "latest" | "oldest")
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <FeedCardSkeleton key={idx} />
            ))
          : currentItems.map((favory) => (
              <FeedCard key={favory.id} favory={favory} />
            ))}
      </div>
      <div className="my-16 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
