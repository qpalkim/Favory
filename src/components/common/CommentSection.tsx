import { CommentListResponse } from "@/lib/types/comments";
import FavoryCommentList from "./FavoryCommentList";
import Pagination from "../ui/Pagination";
import Empty from "../ui/Empty";

interface CommentSectionProps {
  favoryId: number;
  commentList: CommentListResponse
  setCurrentPage: (page: number) => void;
  className: string;
}

const PAGE_SIZE = 5;

export default function CommentSection({ favoryId, commentList, setCurrentPage, className }: CommentSectionProps) {
  return (
    <section aria-label="댓글 영역" className={`mt-6 ${className}`}>
      <FavoryCommentList favoryId={favoryId} commentList={commentList} />

      {commentList.totalElements === 0 ? (
        <div className="my-12">
          <Empty type="comment" />
        </div>
      ) : (
        commentList.totalElements > PAGE_SIZE && (
          <nav aria-label="댓글 페이지네이션" className="my-16 flex justify-center">
            <Pagination
              currentPage={commentList.pageNumber + 1}
              totalPages={commentList.totalPages}
              onChange={(page) => setCurrentPage(page - 1)}
            />
          </nav>
        )
      )}
    </section>
  )
}