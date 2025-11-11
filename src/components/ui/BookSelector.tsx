"use client";
import { useRef, useState } from "react";
import { useClickOutside } from "@/lib/utils/useClickOutside";
import { X } from "lucide-react";
import Input from "./Input";

// 추후 타입 정의 필요
interface Book {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string | null;
}

export default function BookSelector() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [selected, setSelected] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  // 백엔드 연동 필요
  const handleSearch = async () => {
    const mockBooks: Book[] = [
      {
        id: "1",
        title: "Sample Book",
        authors: ["Sample Author"],
        publishedDate: "2024-01-01",
        thumbnail: "https://via.placeholder.com/150",
      },
    ];
    setBooks(mockBooks);
    setIsOpen(true);
  };

  const handleSelect = (book: Book) => {
    setSelected(book);
    setQuery("");
    setBooks([]);
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
          <div className="border-black-200 flex items-center justify-between rounded-md border bg-white px-3 py-2">
            <div className="flex max-w-[90%] items-center gap-2 overflow-hidden lg:gap-3">
              {selected.thumbnail && (
                // Image 컴포넌트 활용
                <img
                  src={selected.thumbnail}
                  alt={selected.title}
                  className="h-10 w-auto rounded object-cover lg:h-12"
                />
              )}
              <div className="overflow-hidden">
                <p className="text-md text-black-500 font-medium lg:text-lg">
                  {selected.title}
                </p>
                <p className="text-black-200 lg:text-md text-xs">
                  {selected.authors.join(", ") || "저자 정보 없음"} •{" "}
                  {selected.publishedDate?.slice(0, 4) || "연도 정보 없음"}
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

        {isOpen && books.length > 0 && (
          <div ref={ref}>
            <ul className="border-black-200 absolute top-full left-0 z-50 mt-1.5 max-h-[324px] w-full overflow-y-auto rounded-md border-1 bg-white shadow-lg">
              {books.map((book) => (
                <li
                  key={book.id}
                  onClick={() => handleSelect(book)}
                  className="hover:bg-black-10 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200 lg:gap-3"
                >
                  {book.thumbnail && (
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="h-10 w-auto rounded object-cover lg:h-12"
                    />
                  )}
                  <div className="overflow-hidden">
                    <p className="text-md text-black-500 font-medium lg:text-lg">
                      {book.title}
                    </p>
                    <p className="text-black-200 lg:text-md text-xs">
                      {book.authors.join(", ") || "저자 정보 없음"} •{" "}
                      {book.publishedDate?.slice(0, 4) || "연도 정보 없음"}
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
