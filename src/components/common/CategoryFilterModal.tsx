import { X } from "lucide-react";
import Button from "../ui/Button";

interface CategoryFilterModalProps {
  onClose: () => void;
  onApply: () => void;
}

export default function CategoryFilterModal({
  onClose,
  onApply,
}: CategoryFilterModalProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-black-500 text-lg font-semibold">필터</h4>
        <X
          className="text-black-200 h-5 w-5 cursor-pointer"
          onClick={onClose}
          aria-label="모달 닫기 아이콘"
          strokeWidth={2}
        />
      </div>
      <div>
        <p className="text-black-500 text-[15px] font-semibold">카테고리</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" onClick={onClose}>
            전체
          </Button>
          <Button size="sm" variant="outline" onClick={onClose}>
            음악
          </Button>
          <Button size="sm" variant="outline" onClick={onClose}>
            영화
          </Button>
          <Button size="sm" variant="outline" onClick={onClose}>
            드라마
          </Button>
          <Button size="sm" variant="outline" onClick={onClose}>
            도서
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="w-full" variant="outline" onClick={onClose}>
          초기화
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            onApply();
            onClose();
          }}
        >
          적용하기
        </Button>
      </div>
    </div>
  );
}
