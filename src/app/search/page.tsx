import { Suspense } from "react";
import SearchContainer from "@/components/common/SearchContainer";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중입니다</div>}>
      <SearchContainer />
    </Suspense>
  );
}
