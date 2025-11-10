import ProfileImg from "./ProfileImg";

// 추후 타입 정의 필요
export interface Comment {
  // 작성자
  writer: {
    profileImg: string | null; // 작성자 프로필 이미지
    nickname: string; // 작성자 닉네임
    id: number; // 작성자 id
  };
  createdAt: string; // 댓글 생성 일시
  content: string; // 댓글 내용
  id: number; // 댓글 id
}

interface CommentItemProps {
  comment: Comment;
  profile?: boolean;
}

export default function CommentItem({
  comment,
  profile = false,
}: CommentItemProps) {
  return (
    <div className="border-black-100 flex cursor-pointer gap-2 overflow-hidden border-b py-6 last:border-b-0 lg:max-w-[660px]">
      <ProfileImg
        src={comment.writer.profileImg}
        className="pointer-events-none"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-black-500 md:text-md truncate text-sm leading-tight font-medium lg:text-lg">
          {comment.writer.nickname}
        </p>
        <p className="text-black-200 lg:text-md mt-0.5 truncate text-xs leading-tight font-light md:text-sm">
          {comment.createdAt}
        </p>
        <p
          className={`text-black-500 mt-2 text-sm leading-tight md:text-lg ${profile ? "line-clamp-2" : ""}`}
        >
          {comment.content}
        </p>
      </div>
    </div>
  );
}
