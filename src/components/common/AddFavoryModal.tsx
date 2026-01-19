import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { MEDIA_TYPE_META } from "@/lib/utils/constants";
import Badge from "../ui/Badge";

export default function AddFavoryModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleSelect = (mediaType: string) => {
    onClose();
    router.push(`/add/${mediaType}`);
  };

  const mediaButtons = Object.values(MEDIA_TYPE_META).filter((button) => button.id !== "COMMENT",);

  return (
    <>
      <div className="flex items-center justify-between">
        <h4 className="text-black-500 text-lg font-semibold md:text-[20px]">
          새 Favory 작성하기
        </h4>
        <X
          className="text-black-200 h-5 w-5 cursor-pointer md:h-6 md:w-6"
          onClick={onClose}
          aria-label="모달 닫기 아이콘"
          strokeWidth={2}
        />
      </div>
      <p className="text-black-200 text-md md:mt-1 md:text-lg">
        카테고리를 선택해 주세요
      </p>
      <div className="mt-6 flex gap-2">
        {mediaButtons.map(({ id, label, icon: Icon }) => (
          <Badge key={id} size="lg" onClick={() => handleSelect(id.toLowerCase())}>
            <Icon className="mr-1 h-[14px] w-[14px] md:h-[18px] md:w-[18px]" />
            {label}
          </Badge>
        ))}
      </div>
    </>
  );
}
