import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { MEDIA_TYPE_META } from "@/lib/utils/constants";
import Badge from "../../ui/Badge";

interface AddFavoryModalProps {
  onClose: () => void;
}

export default function AddFavoryModal({ onClose }: AddFavoryModalProps) {
  const router = useRouter();

  const handleSelect = (mediaType: string) => {
    onClose();
    router.push(`/add/${mediaType}`);
  };

  const mediaButtons = Object.values(MEDIA_TYPE_META).filter((button) => button.id !== "COMMENT");

  return (
    <section aria-label="새 감상평 작성">
      <div className="flex items-center justify-between">
        <h4 className="text-black-500 text-lg font-semibold md:text-2lg">
          새 Favory 작성하기
        </h4>
        <button onClick={onClose}
          aria-label="모달 닫기"
          className="text-black-200 cursor-pointer">
          <X
            className="h-5 w-5 md:h-6 md:w-6"
            strokeWidth={2}
          />
        </button>
      </div>
      <p className="text-black-200 text-md md:mt-1 md:text-lg">
        카테고리를 선택해 주세요
      </p>
      <div className="mt-6 flex gap-2">
        {mediaButtons.map(({ id, label, icon: Icon }) => (
          <Badge key={id} size="lg" onClick={() => handleSelect(id.toLowerCase())} ariaLabel={`${label} 카테고리 선택`}>
            <Icon className="mr-1 h-[14px] w-[14px] md:h-[18px] md:w-[18px]" />
            {label}
          </Badge>
        ))}
      </div>
    </section>
  );
}
