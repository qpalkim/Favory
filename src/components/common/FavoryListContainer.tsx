"use client";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFavoryList } from "@/lib/hooks/useFavories";
import { MediaTypeCategory } from "@/lib/types/favories";
import { CATEGORY_LABEL_MAP, MEDIA_TYPE_CATEGORY_OPTIONS, SORT_OPTIONS } from "@/lib/utils/constants";
import { getCategoryFromLabel } from "@/lib/utils/getCategoryFromLabel";
import useMediaQuery from "@/lib/utils/useMediaQuery";
import FeedCard from "../ui/FeedCard";
import Button from "../ui/Button";
import SelectOption from "../ui/SelectOption";
import Pagination from "../ui/Pagination";
import FeedCardSkeleton from "../skeleton/FeedCardSkeleton";
import Empty from "../ui/Empty";
import RetryError from "../ui/RetryError";

export default function FavoryListContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createParams = useCallback(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const categoryLabel = searchParams.get("type");
  const category = getCategoryFromLabel<MediaTypeCategory>(categoryLabel, CATEGORY_LABEL_MAP);
  const pageParam = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  const sortParam = searchParams.get("sort") as "latest" | "oldest" | null;
  const [sortOption, setSortOption] = useState<"latest" | "oldest">(sortParam ?? "latest");
  const currentPage = pageParam;

  const isPC = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const itemsPerPage = isPC ? 16 : isTablet ? 12 : 8;

  const { data, isLoading, isFetching, isError, refetch } = useFavoryList({
    page: currentPage - 1,
    size: itemsPerPage,
    sort: sortOption,
    type: category,
  });
  const favoryList = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleCategoryChange = (type: MediaTypeCategory | undefined) => {
    const label = type ? CATEGORY_LABEL_MAP[type] : null;
    const params = createParams();

    if (label) params.set("type", label);
    else params.delete("type");

    params.delete("page");
    const query = params.toString();
    router.push(query ? `/favories?${query}` : "/favories");
  };

  const handleSortChange = (value: "latest" | "oldest") => {
    if (sortOption === value) return;

    setSortOption(value);

    const params = createParams();
    params.set("sort", value);
    params.set("page", "1");
    router.push(`/favories?${params.toString()}`);
  }

  const handlePageChange = (page: number) => {
    const params = createParams();

    params.set("page", String(page));
    router.push(`/favories?${params.toString()}`);
  };

  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <section aria-label="감상평 목록" className="mx-auto max-w-[1200px] px-4">
      <div className="my-6 flex items-center justify-between md:my-8 lg:my-12">
        <div role="group" aria-label="카테고리 필터" className="flex gap-1">
          {MEDIA_TYPE_CATEGORY_OPTIONS.map((item) => (
            <Button
              key={item.label}
              size="sm"
              variant={category === item.value ? "primary" : "outline"}
              onClick={() => handleCategoryChange(item.value)}
              disabled={isLoading || isFetching}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <SelectOption
          options={SORT_OPTIONS}
          disabled={isLoading || isFetching}
          onSelect={(option) => handleSortChange(option.value as "latest" | "oldest")}
        />
      </div>

      {isLoading ? (
        <div className="mb-16 grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:grid-cols-4">
          {Array.from({ length: itemsPerPage }).map((_, idx) => (
            <FeedCardSkeleton key={idx} />
          ))}
        </div>
      ) : favoryList.length === 0 ? (
        <div className="my-12">
          <Empty type="favory" />
        </div>
      ) : (
        <>
          <div className="mb-16 grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-4 lg:grid-cols-4">
            {favoryList.map((favory) => (
              <FeedCard key={favory.id} favory={favory} />
            ))}
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
        </>
      )}
    </section>
  );
}
