import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  searchTerm,
  onSearch,
}: {
  searchTerm: string;
  onSearch(term: string): void;
}) {
  const [value, setValue] = useState(searchTerm);

  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    onSearch(trimmedValue);
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <form role="search" onSubmit={handleSearchSubmit} className="relative w-full">
      <input
        type="search"
        inputMode="search"
        enterKeyHint="search"
        aria-label="검색어 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="검색어를 입력한 후, Enter를 눌러 주세요"
        className="peer bg-green-10 md:text-md text-black-500 placeholder:text-black-200 h-[36px] w-full rounded-md px-3 pl-10 text-sm focus:border-green-600 focus:shadow-[0_0_0_3px_rgba(7,102,83,0.4)] focus:outline-none md:h-[38px] lg:h-[46px] lg:max-w-[660px] lg:pl-11 lg:text-lg"
      />
      <Search aria-hidden className="text-black-200 absolute top-[9px] left-3 h-[18px] w-[18px] transition-colors duration-200 peer-focus:text-green-600 md:top-[10px] lg:top-[13px] lg:h-5 lg:w-5" />
    </form>
  );
}
