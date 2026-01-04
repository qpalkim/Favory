import { Suspense } from "react";
import SearchContainer from "@/components/common/SearchContainer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <SearchContainer />
    </Suspense>
  );
}
