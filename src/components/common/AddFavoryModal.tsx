import { BookOpen, Clapperboard, Music4, Tv, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Badge from "../ui/Badge";

const MEDIA_TYPE_OPTIONS = [
  { key: "music", label: "음악", icon: Music4 },
  { key: "movie", label: "영화", icon: Clapperboard },
  { key: "drama", label: "드라마", icon: Tv },
  { key: "book", label: "도서", icon: BookOpen },
];

export default function AddFavoryModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleSelect = (type: string) => {
    onClose();
    router.push(`/add/${type}`);
  };

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
        {MEDIA_TYPE_OPTIONS.map(({ key, label, icon: Icon }) => (
          <Badge key={key} size="lg" onClick={() => handleSelect(key)}>
            <Icon className="mr-1 h-[14px] w-[14px] md:h-[18px] md:w-[18px]" />
            {label}
          </Badge>
        ))}
      </div>
    </>
  );
}
