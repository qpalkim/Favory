import { useState } from "react";
import { toast } from "react-toastify";
import { CommentResponse } from "@/lib/types/comments";
import { useDeleteComment, useEditComment } from "@/lib/hooks/useComments";
import formatTime from "@/lib/utils/formatTime";
import ProfileImg from "./ProfileImg";
import Dropdown from "./Dropdown";
import Textarea from "./Textarea";
import Button from "./Button";
import Modal from "./Modal";
import UserProfileModal from "../common/UserProfileModal";
import DeleteItemModal from "../common/DeleteItemModal";

interface CommentItemProps {
  comment: CommentResponse;
  userId?: number | undefined;
  profile?: boolean;
}

export default function CommentItem({
  comment,
  userId,
  profile = false,
}: CommentItemProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const editComment = useEditComment(comment.id);
  const deleteComment = useDeleteComment();
  const isMine = userId === comment.userId;
  const isOverLimit = editedContent.length > 100;

  const handleSave = () => {
    if (editedContent.trim() === "") return;
    editComment.mutate(
      { content: editedContent },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("댓글이 수정되었습니다");
        },
        onError: () => {
          toast.error("댓글 수정에 실패했습니다");
        },
      },
    );
  };

  const handleDelete = () => {
    deleteComment.mutate(comment.id, {
      onSuccess: () => {
        toast.success("댓글이 삭제되었습니다");
      },
      onError: () => {
        toast.error("댓글 삭제에 실패했습니다");
      },
    });
  };

  const handleCancel = () => {
    setEditedContent(comment.content);
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex gap-2 py-6 lg:max-w-[660px]">
        <ProfileImg
          src={comment.userImageUrl}
          clickable
          onClick={() => setIsProfileOpen(true)}
        />
        <div className="relative flex flex-1">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-col gap-0.5">
              <p className="text-black-500 md:text-md truncate text-sm leading-tight font-medium">
                {comment.userNickname}
              </p>
              <p className="text-black-200 truncate text-xs leading-tight font-light md:text-sm">
                {formatTime(comment.updatedAt || comment.createdAt)}
              </p>
            </div>

            {isMine && isEditing ? (
              <div className="mt-2 w-full">
                <Textarea
                  className="min-h-[72px] md:min-h-[92px]"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  error={isOverLimit ? "100자 이내로 작성해 주세요" : ""}
                  placeholder="댓글을 작성해 보세요"
                />
                <div className="mt-2 flex justify-end gap-1">
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    취소
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={
                      !editedContent.trim() ||
                      editedContent.trim() === comment.content.trim() ||
                      isOverLimit
                    }
                    isLoading={editComment.isPending}
                  >
                    수정
                  </Button>
                </div>
              </div>
            ) : (
              <p
                className={`text-black-500 md:text-md mt-2 text-sm leading-tight ${profile ? "line-clamp-2" : ""}`}
              >
                {comment.content}
              </p>
            )}
          </div>

          {isMine && !isEditing && (
            <div className="absolute top-0 right-0">
              <Dropdown
                options={[
                  { label: "수정하기", onClick: () => setIsEditing(true) },
                  { label: "삭제하기", onClick: () => setIsDeleteOpen(true) },
                ]}
              />
            </div>
          )}
        </div>
      </div>

      {isProfileOpen && (
        <Modal onClose={() => setIsProfileOpen(false)}>
          <UserProfileModal
            onClose={() => setIsProfileOpen(false)}
            nickname={comment.userNickname}
            imageUrl={comment.userImageUrl}
          />
        </Modal>
      )}

      {isDeleteOpen && (
        <Modal onClose={() => setIsDeleteOpen(false)}>
          <DeleteItemModal
            isComment
            onClose={() => setIsDeleteOpen(false)}
            onDelete={handleDelete}
          />
        </Modal>
      )}
    </>
  );
}
