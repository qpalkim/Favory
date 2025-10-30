import { CircleAlert } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center">
        <CircleAlert className="text-black-100 h-[52px] w-[52px] stroke-1 md:h-[96px] md:w-[96px]" />
        <h2 className="text-black-500 md:text-2lg mt-4 text-lg font-semibold md:mt-6 lg:text-xl">
          404
        </h2>
        <p className="text-black-200 md:text-md mt-2 text-sm lg:text-lg">
          잘못된 주소 또는 없는 페이지입니다
        </p>
        <div className="mt-6 flex w-full gap-2 md:mt-8">
          <Button variant="outline" href="/">
            홈으로 돌아가기
          </Button>
          <Button href="/favories">목록 페이지로 돌아가기</Button>
        </div>
      </div>
    </div>
  );
}
