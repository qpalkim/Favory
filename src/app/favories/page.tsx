import { Suspense } from "react";
import BannerWrapper from "@/components/common/BannerWrapper";
import FavoryListContainer from "@/components/common/FavoryListContainer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Page() {
  return (
    <>
      <BannerWrapper />
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <FavoryListContainer />
      </Suspense >
    </>
  );
}
