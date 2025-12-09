import { CommentListResponse } from "@/lib/types/comments";
import CommentItem from "../ui/CommentItem";
import ProfileImg from "../ui/ProfileImg";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import Empty from "./Empty";

export default function FavoryCommentList({
  commentList,
}: {
  commentList: CommentListResponse;
}) {
  return (
    <>
      <h5 className="text-black-500 text-[15px] font-semibold md:text-lg">
        댓글 {commentList?.length ?? 0}개
      </h5>
      <div className="mt-6 flex gap-2">
        <ProfileImg src={null} />
        <Textarea placeholder="100자 이내로 입력해 주세요" />
      </div>
      <div className="flex justify-end">
        <Button size="sm" className="mt-2" disabled>
          등록
        </Button>
      </div>
      <hr className="border-black-100 mt-6" />

      {commentList?.length === 0 ? (
        <div className="my-12">
          <Empty type="comment" />
        </div>
      ) : (
        commentList?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </>
  );
}
