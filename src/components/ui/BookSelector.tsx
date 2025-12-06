"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { MediaItem } from "@/lib/types/media";
import { useMediaSearch } from "@/lib/hooks/useMedia";
import { useClickOutside } from "@/lib/utils/useClickOutside";
import Image from "next/image";
import Input from "./Input";

interface BookSelectorProps {
  onSelect?: (item: MediaItem | null) => void;
  selected?: MediaItem | null;
  disabled?: boolean;
}

export default function BookSelector({
  onSelect,
  selected: selectedProp,
  disabled = false,
}: BookSelectorProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MediaItem | null>(
    selectedProp || null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(selectedProp || null);
  }, [selectedProp]);

  useClickOutside(ref, () => setIsOpen(false));

  const { data, refetch } = useMediaSearch(
    {
      keyword: query,
      type: "BOOK",
      limit: 20,
    },
    false,
  );
  const items = data?.results || [];

  const handleSearch = async () => {
    if (query.trim()) {
      refetch();
      setIsOpen(true);
    }
  };

  const handleSelect = (item: MediaItem) => {
    setSelected(item);
    setQuery("");
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="w-full space-y-2 lg:max-w-[660px]">
      <label className="text-md lg:text-2lg text-black-500 mb-2 flex items-center gap-1 font-medium md:mb-[10px] md:text-lg">
        도서명
        <span className="text-md lg:text-2lg text-error-100 md:text-lg">*</span>
      </label>

      <div className="relative w-full">
        {!selected ? (
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="도서 제목을 검색하여 선택해 주세요"
          />
        ) : (
          <div
            className={`border-black-200 flex items-center justify-between rounded-md border px-3 py-2 ${disabled ? "cursor-not-allowed border-green-600 bg-green-500/7" : "bg-white"}`}
          >
            <div className="flex max-w-[90%] items-center gap-2 overflow-hidden lg:gap-3">
              {selected.imageUrl && (
                <Image
                  src={selected.imageUrl}
                  alt={selected.title}
                  width={300}
                  height={300}
                  className="h-10 w-auto rounded object-cover lg:h-12"
                />
              )}
              <div className="overflow-hidden">
                <p className="text-md text-black-500 font-medium lg:text-lg">
                  {selected.title}
                </p>
                <p className="text-black-200 lg:text-md text-xs">
                  {selected.creator || "작가 정보 없음"} •{" "}
                  {selected.year || "연도 정보 없음"}
                </p>
              </div>
            </div>
            {!disabled && (
              <button
                onClick={() => {
                  setSelected(null);
                  if (onSelect) onSelect(null);
                }}
                className="cursor-pointer"
              >
                <X className="text-black-200 hover:text-black-300 h-4 w-4 transition-colors duration-200 lg:h-5 lg:w-5" />
              </button>
            )}
          </div>
        )}

        {isOpen && items.length > 0 && (
          <div ref={ref}>
            <ul className="border-black-200 absolute top-full left-0 z-50 mt-1.5 max-h-[324px] w-full overflow-y-auto rounded-md border-1 bg-white shadow-lg">
              {items.map((item) => (
                <li
                  key={item.externalId}
                  onClick={() => handleSelect(item)}
                  className="hover:bg-black-10 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200 lg:gap-3"
                >
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="h-10 w-auto rounded object-cover lg:h-12"
                    />
                  )}
                  <div className="overflow-hidden">
                    <p className="text-md text-black-500 font-medium lg:text-lg">
                      {item.title}
                    </p>
                    <p className="text-black-200 lg:text-md text-xs">
                      {item.creator || "저자 정보 없음"} •{" "}
                      {item.year || "연도 정보 없음"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
