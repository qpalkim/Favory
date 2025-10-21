import { BookOpen, Clapperboard, Music4, Tv, X } from "lucide-react";
import Badge from "../ui/Badge";

export default function AddFavoryModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="">
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
        <Badge size="lg" onClick={onClose}>
          <Music4 className="mr-1 h-[14px] w-[14px] md:h-[18px] md:w-[18px]" />
          음악
        </Badge>
        <Badge size="lg" onClick={onClose}>
          <Clapperboard className="mr-1 h-[14px] w-[14px] md:h-[18px] md:w-[18px]" />
          영화
        </Badge>
        <Badge size="lg" onClick={onClose}>
          <Tv className="mr-1 h-[14px] w-[14px] md:h-[18px] md:w-[18px]" />
          드라마
        </Badge>
        <Badge size="lg" onClick={onClose}>
          <BookOpen className="mr-1 h-[14px] w-[14px] md:h-[18px] md:w-[18px]" />
          서적
        </Badge>
      </div>
    </div>
  );
}
