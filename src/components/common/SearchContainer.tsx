"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SearchBar from "../ui/SearchBar";
import Badge from "../ui/Badge";

export default function SearchContainer() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-[1200px] p-4 lg:flex lg:items-start lg:justify-between lg:gap-6">
      <div className="mt-4 flex h-full w-full items-center gap-3 lg:max-w-[660px]">
        <ArrowLeft
          className="h-6 w-6 cursor-pointer text-green-600 hover:text-green-500 lg:hidden"
          onClick={() => router.back()}
        />
        <SearchBar />
      </div>
      <div className="mt-6 w-full lg:mt-4 lg:w-[416px]">
        <div className="flex items-center justify-between">
          <h4 className="text-black-500 md:text-2lg text-[15px] font-medium">
            최근 검색어
          </h4>
          <button className="text-error-100 text-xs font-medium md:text-sm">
            모두 지우기
          </button>
        </div>
        <div className="mt-3 flex gap-2 md:mt-4">
          <Badge>검색어</Badge>
        </div>
      </div>
    </div>
  );
}
