import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <input
        placeholder="검색어를 입력해 주세요"
        className="bg-green-10 md:text-md text-black-500 placeholder:text-black-200 h-[36px] w-full rounded-md px-3 pl-10 text-sm focus:border-green-600 focus:shadow-[0_0_0_3px_rgba(7,102,83,0.4)] focus:outline-none md:h-[38px] lg:h-[46px] lg:max-w-[660px] lg:pl-11 lg:text-lg"
      />
      <Search className="text-black-200 absolute top-[9px] left-3 h-[18px] w-[18px] md:top-[10px] lg:top-[13px] lg:h-5 lg:w-5" />
    </div>
  );
}
