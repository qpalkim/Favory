import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({
  searchTerm,
  onSearch,
}: {
  searchTerm: string;
  onSearch(term: string): void;
}) {
  const [value, setValue] = useState(searchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

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
        ref={inputRef}
        inputMode="search"
        enterKeyHint="search"
        aria-label="검색어 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="검색어를 입력한 후, Enter를 눌러 주세요"
        className="peer bg-green-10 md:text-md text-black-500 placeholder:text-black-200 h-[36px] w-full rounded-md px-10 text-sm focus:border-green-600 focus:shadow-[0_0_0_3px_rgba(7,102,83,0.4)] focus:outline-none md:h-[38px] lg:max-w-[660px]"
      />
      <Search
        aria-hidden
        className="absolute left-3 top-[9px] z-10 md:top-[10px] text-black-200 h-4 w-4 md:h-[18px] md:w-[18px] transition-colors duration-200 peer-focus:text-green-600"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black-200 hover:text-green-600 cursor-pointer"
        >
          <X className="h-4 w-4 md:h-[18px] md:w-[18px]" />
        </button>
      )}
    </form>
  );
}
