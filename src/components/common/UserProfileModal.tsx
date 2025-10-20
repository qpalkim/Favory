import { X } from "lucide-react";
import ProfileImg from "../ui/ProfileImg";
import Button from "../ui/Button";

interface UserProfileModalProps {
  profileImg: string | null;
  nickname: string;
  onClose: () => void;
}

export default function UserProfileModal({
  profileImg,
  nickname,
  onClose,
}: UserProfileModalProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <X
          className="h-5 w-5 cursor-pointer md:h-6 md:w-6"
          onClick={onClose}
          aria-label="모달 닫기 아이콘"
          color="#777777"
          strokeWidth={2}
        />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <ProfileImg src={profileImg} />
        <p className="text-black-500 text-md md:text-lg">{nickname}</p>
      </div>
      <Button className="w-full">프로필 구경하러 가기</Button>
    </div>
  );
}
