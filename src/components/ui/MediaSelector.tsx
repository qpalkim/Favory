"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { MediaTypeCategory } from "@/lib/types/favories";
import { MediaItem } from "@/lib/types/media";
import { useMediaSearch } from "@/lib/hooks/useMedia";
import { useClickOutside } from "@/lib/utils/useClickOutside";
import Image from "next/image";
import Input from "./Input";
import LoadingSpinner from "./LoadingSpinner";

const MEDIA_CONFIG: Record<
  MediaTypeCategory,
  {
    label: string;
    desc: string;
    placeholder: string;
    creatorFallback: string;
    imageClassName: string;
  }
> = {
  MUSIC: {
    label: "곡명",
    desc: "노래 제목 또는 가수를 입력한 후, Enter를 눌러 주세요",
    placeholder: "예) Love wins all, IU",
    creatorFallback: "가수 정보 없음",
    imageClassName: "h-10 w-10 rounded object-cover lg:h-12 lg:w-12",
  },
  MOVIE: {
    label: "작품명",
    desc: "영화 제목을 입력한 후, Enter를 눌러 주세요",
    placeholder: "예) 타이타닉",
    creatorFallback: "감독 정보 없음",
    imageClassName: "h-10 w-auto rounded object-cover lg:h-12",
  },
  DRAMA: {
    label: "작품명",
    desc: "드라마 제목을 입력한 후, Enter를 눌러 주세요",
    placeholder: "예) 동백꽃 필 무렵",
    creatorFallback: "방송사 정보 없음",
    imageClassName: "h-10 w-auto rounded object-cover lg:h-12",
  },
  BOOK: {
    label: "도서명",
    desc: "도서 제목을 입력한 후, Enter를 눌러 주세요",
    placeholder: "예) 미드나잇 라이브러리",
    creatorFallback: "작가 정보 없음",
    imageClassName: "h-10 w-auto rounded object-cover lg:h-12",
  },
};

interface MediaSelectorProps {
  type: MediaTypeCategory;
  onSelect?: (item: MediaItem | null) => void;
  selected?: MediaItem | null;
  disabled?: boolean;
}

export default function MediaSelector({
  type,
  onSelect,
  selected: selectedProp,
  disabled = false,
}: MediaSelectorProps) {
  const config = MEDIA_CONFIG[type];

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

  const { data, refetch, isFetching } = useMediaSearch(
    {
      keyword: query,
      type: type,
      limit: 20,
    },
    false,
  );
  const items = data?.results || [];

  const handleSearch = () => {
    if (query.trim()) {
      refetch();
      setIsOpen(true);
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  const handleSelect = (item: MediaItem) => {
    setSelected(item);
    setQuery("");
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="w-full lg:max-w-[660px]">
      <label className="text-md md:text-lg text-black-500  flex items-center gap-1 font-medium">
        {config.label}
        <span className="text-md md:text-lg text-error-100">*</span>
      </label>
      <p className="text-sm md:text-md text-black-200 mb-2 md:mb-[10px]">{config.desc}</p>

      <div className="relative w-full">
        {!selected ? (
          <div className="w-full">
            <Input
              placeholder={config.placeholder}
              value={query}
              inputMode="search"
              enterKeyHint="search"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                if (e.key !== "Enter") return;

                e.preventDefault();
                e.stopPropagation()
                handleSearch();
              }}
            />
          </div>
        ) : (
          <div
            className={`border-black-200 flex items-center justify-between rounded-md border px-3 py-2 ${disabled ? "bg-green-10 cursor-not-allowed border-green-600" : "bg-white"}`}
          >
            <div className="flex max-w-[90%] items-center gap-2 overflow-hidden lg:gap-3">
              {selected.imageUrl && (
                <Image
                  src={selected.imageUrl}
                  alt={selected.title}
                  width={300}
                  height={300}
                  className={config.imageClassName}
                />
              )}
              <div className="overflow-hidden">
                <p className="text-sm text-black-500 truncate font-medium md:text-md">
                  {selected.title}
                </p>
                <p className="text-black-200 md:text-sm truncate text-xs">
                  {selected.creator || config.creatorFallback} •{" "}
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
                <X className="text-black-200 hover:text-black-300 h-4 w-4 transition-colors duration-200" />
              </button>
            )}
          </div>
        )}

        {isOpen && (
          <div ref={ref}>
            <ul className="border-black-200 absolute top-full left-0 z-50 mt-1.5 max-h-[324px] w-full overflow-y-auto rounded-md border-1 bg-white shadow-lg">
              {isFetching ? (
                <li className="flex items-center justify-center px-3 py-4">
                  <LoadingSpinner size="sm" />
                </li>
              ) : items.length > 0 ? (
                items.map((item) => (
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
                        className={config.imageClassName}
                      />
                    )}
                    <div className="overflow-hidden">
                      <p className="text-sm text-black-500 truncate font-medium md:text-md">
                        {item.title}
                      </p>
                      <p className="text-black-200 md:text-sm truncate text-xs">
                        {item.creator || config.creatorFallback} •{" "}
                        {item.year || "연도 정보 없음"}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="md:text-md text-black-200 flex items-center justify-center px-3 py-4 text-sm">
                  &quot;{query}&quot;에 대한 검색 결과가 없습니다.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}