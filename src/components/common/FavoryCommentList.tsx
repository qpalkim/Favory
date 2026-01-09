import { useState } from "react";
import { toast } from "react-toastify";
import { useMyData } from "@/lib/hooks/useUsers";
import { useAddComment } from "@/lib/hooks/useComments";
import { CommentListResponse } from "@/lib/types/comments";
import CommentItem from "../ui/CommentItem";
import ProfileImage from "../ui/ProfileImage";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

export default function FavoryCommentList({
  favoryId,
  commentList,
}: {
  favoryId: number;
  commentList: CommentListResponse;
}) {
  const { data: me } = useMyData();
  const [addContent, setAddContent] = useState("");
  const addComment = useAddComment();
  const isOverLimit = addContent.length > 100;

  const handleAddComment = () => {
    if (!me) {
      toast.info("로그인 후, 이용 가능합니다");
      return;
    }

    addComment.mutate(
      {
        favoryId: favoryId,
        userId: me.id,
        content: addContent.trim(),
      },
      {
        onSuccess: () => {
          toast.success("댓글이 등록되었습니다");
          setAddContent("");
        },
        onError: () => {
          toast.error("댓글 등록에 실패했습니다");
        },
      },
    );
  };

  return (
    <>
      <h5 className="text-black-500 text-[15px] font-semibold md:text-lg">
        댓글 {commentList?.totalElements ?? 0}개
      </h5>
      <div className="mt-6 flex gap-2">
        <ProfileImage src={me?.profileImageUrl || null} />
        <div className="w-full">
          <Textarea
            placeholder="댓글을 작성해 보세요"
            value={addContent}
            onChange={(e) => setAddContent(e.target.value)}
            className="flex-1"
            error={isOverLimit ? "100자 이내로 작성해 주세요" : ""}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          size="sm"
          className="mt-2"
          onClick={handleAddComment}
          disabled={addContent.trim() === "" || isOverLimit}
          isLoading={addComment.isPending}
        >
          등록
        </Button>
      </div>
      <hr className="border-black-100 mt-6" />

      {commentList?.content.map((comment, index) => {
        const isLast = index === commentList.content.length - 1;

        return (
          <div
            key={comment.id}
            className={`border-black-100 ${isLast ? "" : "border-b"}`}
          >
            <CommentItem key={comment.id} comment={comment} userId={me?.id} />
          </div>
        );
      })}
    </>
  );
}
