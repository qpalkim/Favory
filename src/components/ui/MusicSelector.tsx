"use client";
import { useRef, useState } from "react";
import { useClickOutside } from "@/lib/utils/useClickOutside";
import { X } from "lucide-react";
import Input from "./Input";

// 추후 타입 정의 필요
interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
    release_date: string;
  };
}

export default function MusicSelector() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selected, setSelected] = useState<Track | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  // 백엔드 연동 필요
  const handleSearch = async () => {
    const mockTracks: Track[] = [
      {
        id: "1",
        name: "Sample Song",
        artists: [{ name: "Artist Name" }],
        album: {
          images: [{ url: "https://via.placeholder.com/150" }],
          release_date: "2024-01-01",
        },
      },
    ];
    setTracks(mockTracks);
    setIsOpen(true);
  };

  const handleSelect = (track: Track) => {
    setSelected(track);
    setQuery("");
    setTracks([]);
  };

  return (
    <div className="w-full space-y-2 lg:max-w-[660px]">
      <label className="text-md lg:text-2lg text-black-500 mb-2 flex items-center gap-1 font-medium md:mb-[10px] md:text-lg">
        곡명
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
            placeholder="노래 제목을 검색하여 선택해 주세요"
          />
        ) : (
          <div className="border-black-200 flex items-center justify-between rounded-md border bg-white px-3 py-2">
            <div className="flex max-w-[90%] items-center gap-2 overflow-hidden lg:gap-3">
              {selected.album.images[0] && (
                // Image 컴포넌트 활용
                <img
                  src={selected.album.images[0].url}
                  alt={selected.name}
                  className="h-10 w-10 rounded object-cover lg:h-12 lg:w-12"
                />
              )}
              <div className="overflow-hidden">
                <p className="text-md text-black-500 truncate font-medium lg:text-lg">
                  {selected.name}
                </p>
                <p className="text-black-200 lg:text-md truncate text-xs">
                  {selected.artists.map((a) => a.name).join(", ") ||
                    "가수 정보 없음"}{" "}
                  •{" "}
                  {selected.album.release_date.slice(0, 4) || "연도 정보 없음"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="cursor-pointer"
            >
              <X className="text-black-200 hover:text-black-300 h-4 w-4 transition-colors duration-200 lg:h-5 lg:w-5" />
            </button>
          </div>
        )}

        {isOpen && tracks.length > 0 && (
          <div ref={ref}>
            <ul className="border-black-200 absolute top-full left-0 z-50 mt-1.5 max-h-[324px] w-full overflow-y-auto rounded-md border-1 bg-white shadow-lg">
              {tracks.map((track) => (
                <li
                  key={track.id}
                  onClick={() => handleSelect(track)}
                  className="hover:bg-black-10 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200 lg:gap-3"
                >
                  {track.album.images[0] && (
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      className="h-10 w-10 rounded object-cover lg:h-12 lg:w-12"
                    />
                  )}
                  <div className="overflow-hidden">
                    <p className="text-md text-black-500 truncate font-medium lg:text-lg">
                      {track.name}
                    </p>
                    <p className="text-black-200 lg:text-md truncate text-xs">
                      {track.artists.map((a) => a.name).join(", ") ||
                        "가수 정보 없음"}{" "}
                      •{" "}
                      {track.album.release_date.slice(0, 4) || "연도 정보 없음"}
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
