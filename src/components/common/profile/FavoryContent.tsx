import { useState } from "react";
import { useProfile } from "@/lib/contexts/ProfileContext";
import { useUserFavoryList } from "@/lib/hooks/useFavories";
import { MediaType } from "@/lib/types/favories";
import { SORT_OPTIONS } from "@/lib/utils/constants";
import SelectOption from "@/components/ui/SelectOption";
import Pagination from "@/components/ui/Pagination";
import FavoryItem from "@/components/ui/FavoryItem";
import FavoryItemSkeleton from "@/components/skeleton/FavoryItemSkeleton";
import Empty from "../Empty";
import RetryError from "@/components/ui/RetryError";

interface FavoryContentProps {
  type: MediaType;
  label: string;
}

export default function FavoryContent({ type, label }: FavoryContentProps) {
  const { user, isMyProfile } = useProfile();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<"latest" | "oldest">("latest");
  const size = 5;

  const { data, isLoading, isFetching, isError, refetch } = useUserFavoryList(
    user.nickname,
    {
      page: currentPage - 1,
      size,
      sort: sortType,
      type,
    },
  );

  if (isError) return <RetryError onRetry={refetch} />;

  return (
    <div className="p-6 lg:p-0">
      {(isLoading || (data && data?.totalElements > 0)) && (
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-black-500 text-[15px] font-semibold md:text-lg">
            {isMyProfile
              ? `내가 등록한 ${label} 감상평 ${data?.totalElements ?? 0}개`
              : `${user.nickname}님이 등록한 ${label} 감상평 ${data?.totalElements ?? 0}개`}
          </h5>
          <SelectOption
            options={SORT_OPTIONS}
            disabled={isFetching}
            onSelect={(option) => {
              if (sortType === option.value) return;
              setSortType(option.value as "latest" | "oldest");
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {isLoading ? (
        <div>
          {Array.from({ length: size }).map((_, idx) => (
            <FavoryItemSkeleton key={idx} profile />
          ))}
        </div>
      ) : data?.totalElements === 0 ? (
        <div className="my-12">
          <Empty type="myFavory" category={label} />
        </div>
      ) : (
        <>
          {data?.content.map((favory, idx) => {
            const isLast = idx === data.content.length - 1;

            return (
              <div
                key={favory.id}
                className={`border-black-100 ${isLast ? "" : "border-b"}`}
              >
                <FavoryItem favory={favory} profile />
              </div>
            );
          })}
        </>
      )}

      {!isLoading && data && data.totalPages > 1 && (
        <div className="my-16 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onChange={setCurrentPage}
            disabled={isLoading || isFetching}
          />
        </div>
      )}
    </div>
  );
}
