import { AlertCircle } from "lucide-react";
import Button from "./Button";

export default function RetryError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[360px] items-center justify-center">
      <div className="flex flex-col items-center">
        <AlertCircle className="text-black-100 h-[52px] w-[52px] stroke-1 md:h-[82px] md:w-[82px]" />
        <h2 className="text-black-500 md:text-2lg mt-4 text-lg font-semibold md:mt-6 lg:text-xl">
          에러가 발생했습니다
        </h2>
        <p className="text-black-200 md:text-md mt-2 text-sm lg:text-lg">
          잠시 후에 다시 시도해 주세요
        </p>
        <div className="mt-6 flex w-full gap-2 md:mt-8">
          <Button variant="outline" href="/">
            홈으로 돌아가기
          </Button>
          <Button onClick={onRetry}>다시 시도하기</Button>
        </div>
      </div>
    </div>
  );
}
