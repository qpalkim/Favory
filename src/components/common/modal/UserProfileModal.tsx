import { X } from "lucide-react";
import ProfileImage from "../../ui/ProfileImage";
import Button from "../../ui/Button";

interface UserProfileModalProps {
  imageUrl: string | null;
  nickname: string;
  onClose: () => void;
}

export default function UserProfileModal({
  imageUrl,
  nickname,
  onClose,
}: UserProfileModalProps) {
  return (
    <section aria-label="사용자 프로필 모달" className="space-y-6">
      <div className="flex justify-end">
        <button className="text-black-200 cursor-pointer"
          onClick={onClose}
          aria-label="모달 닫기 아이콘">
          <X
            className="h-5 w-5 md:h-6 md:w-6"
            strokeWidth={2}
          />
        </button>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <ProfileImage src={imageUrl} />
        <h2 className="text-black-500 font-medium text-md md:text-lg">{nickname}</h2>
      </div>
      <Button
        className="w-full"
        href={`/profile/@${nickname}`}
        ariaLabel={`${nickname} 프로필 페이지로 이동`}
      >
        프로필 구경하러 가기
      </Button>
    </section>
  );
}
