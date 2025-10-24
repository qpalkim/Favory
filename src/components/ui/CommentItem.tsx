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
    <div
      className={`border-black-100 flex cursor-pointer gap-[10px] overflow-hidden border-b p-6 last:border-b-0 md:gap-4 md:px-[42px] lg:max-w-[660px] ${profile ? "lg:p-6" : "lg:px-0 lg:py-6"}`}
    >
      <ProfileImg
        src={comment.writer.profileImg}
        className="pointer-events-none"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-black-500 md:text-md truncate text-xs leading-tight lg:text-lg">
          {comment.writer.nickname}
        </p>
        <p className="text-black-200 lg:text-md truncate text-[10px] leading-tight md:text-xs">
          {comment.createdAt}
        </p>
        <p className="text-black-500 mt-2 text-sm leading-tight md:text-lg">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
