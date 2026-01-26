import { AlertCircle } from "lucide-react";
import Button from "../../ui/Button";

interface DeleteItemModalProps {
  onClose: () => void;
  onDelete: () => void;
  isComment?: boolean;
}

export default function DeleteItemModal({
  onClose,
  onDelete,
  isComment = true,
}: DeleteItemModalProps) {
  return (
    <section aria-label="삭제 확인 모달" className="space-y-4 md:space-y-6">
      <div className="flex justify-center">
        <AlertCircle
          className="text-black-200 h-6 w-6 md:h-8 md:w-8"
          aria-label="삭제 경고 아이콘"
          strokeWidth={1.5}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-black-500 text-md font-semibold md:text-lg">
          {isComment
            ? "댓글을 삭제하시겠습니까?"
            : "Favory 감상평을 삭제하시겠습니까?"}
        </h2>
        <p className="text-black-200 md:text-md text-sm">
          삭제 후, 복구할 수 없습니다
        </p>
      </div>
      <div className="flex gap-2">
        <Button className="w-full" variant="outline" onClick={onClose} ariaLabel="삭제 취소">
          취소하기
        </Button>
        <Button className="w-full" onClick={onDelete} ariaLabel="삭제 확인">
          삭제하기
        </Button>
      </div>
    </section>
  );
}
