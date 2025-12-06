import { X } from "lucide-react";
import ProfileImg from "../ui/ProfileImg";
import Button from "../ui/Button";

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
    <div className="space-y-6">
      <div className="flex justify-end">
        <X
          className="text-black-200 h-5 w-5 cursor-pointer md:h-6 md:w-6"
          onClick={onClose}
          aria-label="모달 닫기 아이콘"
          strokeWidth={2}
        />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <ProfileImg src={imageUrl} />
        <p className="text-black-500 text-md md:text-lg">{nickname}</p>
      </div>
      <Button className="w-full" href={`/profile/@${nickname}`}>
        프로필 구경하러 가기
      </Button>
    </div>
  );
}
