import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProfile } from "@/lib/contexts/ProfileContext";
import { useUserFavoryList } from "@/lib/hooks/useFavories";
import { MediaTypeCategory } from "@/lib/types/favories";
import { CATEGORY_LABEL_MAP, SORT_OPTIONS } from "@/lib/utils/constants";
import { getCategoryFromLabel } from "@/lib/utils/getCategoryFromLabel";
import SelectOption from "@/components/ui/SelectOption";
import Pagination from "@/components/ui/Pagination";
import FavoryItem from "@/components/ui/FavoryItem";
import FavoryItemSkeleton from "@/components/skeleton/FavoryItemSkeleton";
import Empty from "../../ui/Empty";
import RetryError from "@/components/ui/RetryError";

const PAGE_SIZE = 5;

export default function FavoryContent({ label }: { label: string }) {
  const { user, isMyProfile } = useProfile();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryLabel = searchParams.get("type");
  const category = getCategoryFromLabel<MediaTypeCategory>(categoryLabel, CATEGORY_LABEL_MAP);

  const pageParam = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const currentPage = pageParam;

  const sortOption = (searchParams.get("sort") as "latest" | "oldest") ?? "latest";

  const { data, isLoading, isFetching, isError, refetch } = useUserFavoryList(
    user.nickname, {
    page: currentPage - 1,
    size: PAGE_SIZE,
    sort: sortOption,
    type: category,
  });

  useEffect(() => {
    if (!data) return;
    if (data.totalPages === 0) return;

    if (currentPage > data.totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(data.totalPages));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [data, currentPage, router, pathname, searchParams]);

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

    router.push(`${pathname}?${params.toString()}`);
  }

  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <section className="p-6 lg:p-0" aria-label={`${label} 감상평 목록`}>
      {(isLoading || (data && data?.totalElements > 0)) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="min-w-0 flex-1 text-black-500 text-[15px] font-semibold md:text-lg">
            {isMyProfile
              ? `내가 등록한 ${label} 감상평 ${data?.totalElements ?? 0}개`
              : `${user.nickname}님이 등록한 ${label} 감상평 ${data?.totalElements ?? 0}개`}
          </h2>
          <SelectOption
            options={SORT_OPTIONS}
            disabled={isFetching}
            onSelect={(option) => handleSortChange(option.value as "latest" | "oldest")}
          />
        </div>
      )}

      {isLoading ? (
        <ul aria-hidden>
          {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <li key={idx}>
              <FavoryItemSkeleton profile />
            </li>
          ))}
        </ul>
      ) : data?.totalElements === 0 ? (
        <div className="my-12">
          <Empty type="myFavory" category={label} />
        </div>
      ) : (
        <ul>
          {data?.content.map((favory, idx) => {
            const isLast = idx === data.content.length - 1;

            return (
              <li
                key={favory.id}
                className={`border-black-100 ${isLast ? "" : "border-b"}`}
              >
                <FavoryItem favory={favory} profile />
              </li>
            );
          })}
        </ul>
      )}

      {!isLoading && data && data.totalPages > 1 && (
        <nav aria-label="감상평 페이지네이션" className="my-16 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onChange={handlePageChange}
            disabled={isLoading || isFetching}
          />
        </nav>
      )}
    </section>
  );
}
