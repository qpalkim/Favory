"use client";
import { useFavoryList } from "@/lib/hooks/useFavories";
import Banner from "./Banner";
import BannerSkeleton from "../skeleton/BannerSkeleton";

export default function BannerWrapper() {
  const { data, isLoading, isError } = useFavoryList({
    sort: "latest",
  });
  if (isLoading) return <BannerSkeleton />;
  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <>
      {data?.content[0] && <Banner type="latest" favory={data?.content[0]} />}
    </>
  );
}
