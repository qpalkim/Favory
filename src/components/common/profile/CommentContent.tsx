import { useState } from "react";
import { useMyCommentList } from "@/lib/hooks/useComments";
import { SORT_OPTIONS } from "@/lib/utils/constants";
import Pagination from "@/components/ui/Pagination";
import SelectOption from "@/components/ui/SelectOption";
import CommentItem from "@/components/ui/CommentItem";
import CommentItemSkeleton from "@/components/skeleton/CommentItemSkeleton";
import Empty from "../Empty";

export default function CommentContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<"latest" | "oldest">("latest");
  const size = 5;

  const { data, isLoading, isFetching, isError } = useMyCommentList({
    page: currentPage - 1,
    size,
    sort: sortType,
  });

  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-black-500 text-[15px] font-semibold md:text-lg">
          내가 등록한 댓글 {data?.totalElements ?? 0}개
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

      {isLoading ? (
        <div>
          {Array.from({ length: 5 }).map((_, idx) => (
            <CommentItemSkeleton key={idx} />
          ))}
        </div>
      ) : data?.totalElements === 0 ? (
        <div className="my-12">
          <Empty type="myComment" />
        </div>
      ) : (
        <>
          {data?.content.map((comment, index) => {
            const isLast = index === data.content.length - 1;

            return (
              <div
                key={comment.id}
                className={`border-black-100 ${isLast ? "" : "border-b"}`}
              >
                <CommentItem comment={comment} profile />
              </div>
            );
          })}
        </>
      )}

      {!isLoading && data && data.totalPages > 1 && (
        <div className="my-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onChange={setCurrentPage}
            disabled={isFetching}
          />
        </div>
      )}
    </div>
  );
}
