import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProfile } from "@/lib/contexts/ProfileContext";
import { useUserCommentList } from "@/lib/hooks/useComments";
import { SORT_OPTIONS } from "@/lib/utils/constants";
import SelectOption from "@/components/ui/SelectOption";
import Pagination from "@/components/ui/Pagination";
import CommentItem from "@/components/ui/CommentItem";
import CommentItemSkeleton from "@/components/skeleton/CommentItemSkeleton";
import Empty from "../../ui/Empty";
import RetryError from "@/components/ui/RetryError";

const PAGE_SIZE = 5;

export default function CommentContent() {
  const { user } = useProfile();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageParam = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const currentPage = pageParam;

  const sortOption = (searchParams.get("sort") as "latest" | "oldest") ?? "latest";

  const { data, isLoading, isFetching, isError, refetch } = useUserCommentList(
    user.nickname, {
    page: currentPage - 1,
    size: PAGE_SIZE,
    sort: sortOption,
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
    <section className="p-6 lg:p-0" aria-label="댓글 목록">
      {(isLoading || (data && data?.totalElements > 0)) && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-black-500 text-[15px] font-semibold md:text-lg">
            내가 등록한 댓글 {data?.totalElements ?? 0}개
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
              <CommentItemSkeleton />
            </li>
          ))}
        </ul>
      ) : data?.totalElements === 0 ? (
        <div className="my-12">
          <Empty type="myComment" />
        </div>
      ) : (
        <ul>
          {data?.content.map((comment, idx) => {
            const isLast = idx === data.content.length - 1;

            return (
              <li
                key={comment.id}
                className={`border-black-100 ${isLast ? "" : "border-b"}`}
              >
                <CommentItem comment={comment} profile />
              </li>
            );
          })}
        </ul>
      )}

      {!isLoading && data && data.totalPages > 1 && (
        <nav aria-label="댓글 페이지네이션" className="my-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onChange={handlePageChange}
            disabled={isFetching}
          />
        </nav>
      )}
    </section>
  );
}
