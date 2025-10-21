import { FileUp, Upload } from "lucide-react";
import Button from "../ui/Button";
import ProfileImg from "../ui/ProfileImg";
import Input from "../ui/Input";

interface EditProfileModalProps {
  src: string | null;
  onClose: () => void;
  onApply: () => void;
}

export default function EditProfileModal({
  src,
  onClose,
  onApply,
}: EditProfileModalProps) {
  return (
    <div className="space-y-6 md:space-y-8">
      <h4 className="text-black-500 text-lg font-semibold md:text-[20px]">
        프로필 수정하기
      </h4>
      <div className="flex items-center gap-3 md:gap-4">
        <ProfileImg src={src} size="lg" />
        <Button variant="outline">
          <FileUp
            className="h-4 w-4 text-green-600 md:h-[18px] md:w-[18px]"
            strokeWidth={1.5}
          />
          이미지 불러오기
        </Button>
      </div>
      <Input label="닉네임" required placeholder="닉네임을 입력해 주세요" />
      <Input
        label="한 줄 소개"
        placeholder="나와 어울리는 한 줄을 입력해 보세요"
      />
      <div className="flex gap-2">
        <Button className="w-full" variant="outline" onClick={onClose}>
          취소하기
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            onApply();
            onClose();
          }}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
}
