"use client";
import { useRef, useState } from "react";
import { useClickOutside } from "@/lib/utils/useClickOutside";
import { X } from "lucide-react";
import Input from "./Input";

// 추후 타입 정의 필요
interface Drama {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  network: string | null;
}

export default function DramaSelector() {
  const [query, setQuery] = useState("");
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [selected, setSelected] = useState<Drama | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  // 백엔드 연동 필요
  const handleSearch = async () => {
    const mockDramas: Drama[] = [
      {
        id: 1,
        name: "Sample Drama",
        first_air_date: "2024-01-01",
        poster_path: "https://via.placeholder.com/150",
        network: "Sample Network",
      },
    ];
    setDramas(mockDramas);
    setIsOpen(true);
  };

  const handleSelect = (drama: Drama) => {
    setSelected(drama);
    setQuery("");
    setDramas([]);
  };

  const handleUpload = async () => {
    if (!selected) return alert("드라마 선택과 감상평을 작성하세요.");

    console.log("업로드 데이터:", {
      dramaId: selected.id,
      dramaName: selected.name,
      network: selected.network,
    });
  };

  return (
    <div className="w-full space-y-2 lg:max-w-[660px]">
      <label className="text-md lg:text-2lg text-black-500 mb-2 flex items-center gap-1 font-medium md:mb-[10px] md:text-lg">
        작품명
        <span className="text-md lg:text-2lg text-error-100 md:text-lg">*</span>
      </label>

      {!selected ? (
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="작품 제목을 검색하여 선택해 주세요"
        />
      ) : (
        <div className="border-black-200 flex items-center justify-between rounded-md border bg-white px-3 py-2">
          <div className="flex max-w-[90%] items-center gap-2 overflow-hidden lg:gap-3">
            {selected.poster_path && (
              // Image 컴포넌트 활용
              <img
                src={`https://image.tmdb.org/t/p/w92${selected.poster_path}`}
                alt={selected.name}
                className="h-10 w-auto rounded object-cover lg:h-12"
              />
            )}
            <div className="overflow-hidden">
              <p className="text-md text-black-500 font-medium lg:text-lg">
                {selected.name}
              </p>
              <p className="text-black-200 lg:text-md text-xs">
                {selected.network || "방송사 정보 없음"} •{" "}
                {selected.first_air_date
                  ? selected.first_air_date.slice(0, 4)
                  : "연도 정보 없음"}
              </p>
            </div>
          </div>
          <button onClick={() => setSelected(null)} className="cursor-pointer">
            <X className="text-black-200 hover:text-black-300 h-4 w-4 transition-colors duration-200 lg:h-5 lg:w-5" />
          </button>
        </div>
      )}

      {isOpen && dramas.length > 0 && (
        <div ref={ref}>
          <ul className="border-black-200 max-h-[324px] overflow-y-auto rounded-md border-1 bg-white shadow-lg">
            {dramas.map((drama) => (
              <li
                key={drama.id}
                onClick={() => handleSelect(drama)}
                className="hover:bg-black-10 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200 lg:gap-3"
              >
                {drama.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${drama.poster_path}`}
                    alt={drama.name}
                    className="h-10 w-auto rounded object-cover lg:h-12"
                  />
                )}
                <div className="overflow-hidd">
                  <p className="text-md text-black-500 font-medium lg:text-lg">
                    {drama.name}
                  </p>
                  <p className="text-black-200 lg:text-md text-xs">
                    {drama.network || "방송사 정보 없음"} •{" "}
                    {drama.first_air_date
                      ? drama.first_air_date.slice(0, 4)
                      : "연도 정보 없음"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selected && (
        <div className="space-y-2">
          <button
            onClick={handleUpload}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            업로드 테스트
          </button>
        </div>
      )}
    </div>
  );
}
