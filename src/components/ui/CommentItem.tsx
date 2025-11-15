import { CommentResponse } from "@/lib/types/comments";
import ProfileImg from "./ProfileImg";

interface CommentItemProps {
  comment: CommentResponse;
  profile?: boolean;
}

export default function CommentItem({
  comment,
  profile = false,
}: CommentItemProps) {
  return (
    <div className="border-black-100 flex gap-2 overflow-hidden border-b py-6 last:border-b-0 lg:max-w-[660px]">
      <ProfileImg src={comment.writer.image} className="pointer-events-none" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-col gap-0.5">
          <p className="text-black-500 md:text-md truncate text-sm leading-tight font-medium">
            {comment.writer.nickname}
          </p>
          <p className="text-black-200 truncate text-xs leading-tight font-light md:text-sm">
            {comment.updatedAt || comment.createdAt}
          </p>
        </div>
        <p
          className={`text-black-500 md:text-md mt-2 text-sm leading-tight ${profile ? "line-clamp-2" : ""}`}
        >
          {comment.content}
        </p>
      </div>
    </div>
  );
}
