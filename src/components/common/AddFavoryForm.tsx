"use client";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import MusicSelector from "@/components/ui/MusicSelector";
import MovieSelector from "@/components/ui/MovieSelector";
import DramaSelector from "@/components/ui/DramaSelector";
import BookSelector from "@/components/ui/BookSelector";
import Badge from "../ui/Badge";

const categoryMap: Record<string, string> = {
  music: "음악",
  movie: "영화",
  drama: "드라마",
  book: "도서",
};

export default function AddFavoryForm({ category }: { category: string }) {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const koreanCategory = categoryMap[category] || category;

  // 추후 API 연동 및 조건/에러 처리 필요
  const onKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmed = tagInput.trim();

      if (!trimmed) return;
      if (tags.includes(trimmed)) return;
      if (/\s/.test(trimmed)) return;

      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  return (
    <main className="mx-auto max-w-[660px] min-w-[344px] rounded-xl bg-white shadow-lg md:rounded-2xl">
      <form className="space-y-[42px] p-4 lg:space-y-[52px] lg:p-6">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="로고 아이콘"
            className="w-[86px] md:w-[114px] lg:w-[134px]"
          />
          <h2 className="text-black-500 md:text-2lg text-center text-[15px] font-semibold lg:text-xl">
            {koreanCategory} 감상평 등록하기
          </h2>
        </div>

        <div className="space-y-6">
          {category === "music" && <MusicSelector />}
          {category === "movie" && <MovieSelector />}
          {category === "drama" && <DramaSelector />}
          {category === "book" && <BookSelector />}
          <Input
            placeholder="감상평의 제목을 입력해 주세요"
            label="제목"
            required
          />
          <Textarea
            placeholder="감상평을 자유롭게 작성해 주세요"
            label="내용"
            variant="form"
            required
          />
          <div>
            <Input
              placeholder="태그를 작성해 보세요"
              label="태그"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={onKeyDownTag}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={tag}
                  clickable={false}
                  className="flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="text-black-200 hover:text-black-300 h-[10px] w-[10px] cursor-pointer md:h-3 md:w-3"
                    strokeWidth={2}
                    onClick={() =>
                      setTags((prev) => prev.filter((_, i) => i !== index))
                    }
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Button size="lg" disabled>
          등록하기
        </Button>
      </form>
    </main>
  );
}
