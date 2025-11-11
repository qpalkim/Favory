"use client";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import MusicSelector from "@/components/ui/MusicSelector";
import MovieSelector from "@/components/ui/MovieSelector";
import DramaSelector from "@/components/ui/DramaSelector";
import BookSelector from "@/components/ui/BookSelector";

const categoryMap: Record<string, string> = {
  music: "음악",
  movie: "영화",
  drama: "드라마",
  book: "도서",
};

export default function AddFavoryForm({ category }: { category: string }) {
  const koreanCategory = categoryMap[category] || category;

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
            size="sm"
            required
          />
          <Input placeholder="태그를 작성해 보세요" label="태그" />
        </div>

        <Button size="lg" disabled>
          등록하기
        </Button>
      </form>
    </main>
  );
}
