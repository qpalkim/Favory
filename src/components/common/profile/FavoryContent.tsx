import { useState } from "react";
import { useProfile } from "@/lib/contexts/ProfileContext";
import { useUserFavoryList } from "@/lib/hooks/useFavories";
import { MediaType } from "@/lib/types/favories";
import { SORT_OPTIONS } from "@/lib/utils/constants";
import SelectOption from "@/components/ui/SelectOption";
import Pagination from "@/components/ui/Pagination";
import FavoryItem from "@/components/ui/FavoryItem";
import FavoryItemSkeleton from "@/components/skeleton/FavoryItemSkeleton";
import Empty from "../../ui/Empty";
import RetryError from "@/components/ui/RetryError";

interface FavoryContentProps {
  type: MediaType;
  label: string;
}

const PAGE_SIZE = 5;

export default function FavoryContent({ type, label }: FavoryContentProps) {
  const { user, isMyProfile } = useProfile();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<"latest" | "oldest">("latest");

  const { data, isLoading, isFetching, isError, refetch } = useUserFavoryList(
    user.nickname, {
    page: currentPage - 1,
    size: PAGE_SIZE,
    sort: sortOption,
    type,
  });

  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <section className="p-6 lg:p-0" aria-label={`${label} 감상평 목록`}>
      {(isLoading || (data && data?.totalElements > 0)) && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-black-500 text-[15px] font-semibold md:text-lg">
            {isMyProfile
              ? `내가 등록한 ${label} 감상평 ${data?.totalElements ?? 0}개`
              : `${user.nickname}님이 등록한 ${label} 감상평 ${data?.totalElements ?? 0}개`}
          </h2>
          <SelectOption
            options={SORT_OPTIONS}
            disabled={isFetching}
            onSelect={(option) => {
              if (sortOption === option.value) return;
              setSortOption(option.value as "latest" | "oldest");
              setCurrentPage(1);
            }}
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
            onChange={setCurrentPage}
            disabled={isLoading || isFetching}
          />
        </nav>
      )}
    </section>
  );
}
