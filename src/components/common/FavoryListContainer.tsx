"use client";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryLabel = searchParams.get("type");
  const category = getCategoryFromLabel<MediaTypeCategory>(categoryLabel, CATEGORY_LABEL_MAP);

  const pageParam = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const currentPage = pageParam;

  const sortOption = (searchParams.get("sort") as "latest" | "oldest" | "popular") ?? "latest";

  const isPC = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const itemsPerPage = isPC ? 16 : isTablet ? 12 : 8;

  const { data, isLoading, isFetching, isError, refetch } = useFavoryList({
    page: currentPage - 1,
    size: itemsPerPage,
    sort: sortOption,
    type: category,
  });
  const favoryList = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (!data) return;
    if (data.totalPages === 0) return;

    if (currentPage > data.totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(data.totalPages));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [data, currentPage, router, pathname, searchParams]);

  const handleCategoryChange = (type: MediaTypeCategory | undefined) => {
    const label = type ? CATEGORY_LABEL_MAP[type] : null;
    const params = new URLSearchParams(searchParams.toString());

    if (label) params.set("type", label);
    else params.delete("type");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleSortChange = (value: "latest" | "oldest" | "popular") => {
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
          value={sortOption}
          disabled={isLoading || isFetching}
          onSelect={(option) => handleSortChange(option.value as "latest" | "oldest" | "popular")}
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
