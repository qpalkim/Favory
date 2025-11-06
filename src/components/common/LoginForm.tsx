"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import logo from "@/assets/logo/logo_green_vertical.svg";

export default function LoginForm() {
  const [showPw, setShowPw] = useState(false);

  return (
    <main className="mx-auto max-w-[660px] min-w-[344px] rounded-xl bg-white shadow-lg md:rounded-2xl">
      <form className="space-y-[42px] px-4 py-[42px] lg:space-y-[52px] lg:px-6 lg:py-[52px]">
        <div className="flex flex-col items-center">
          <Link href="/" className="inline-block text-center">
            <Image
              src={logo}
              alt="로고 아이콘"
              className="w-[62px] drop-shadow-md md:w-[83px] lg:w-[110px]"
            />
          </Link>
          <p className="text-md text-black-500 mt-4 text-center md:text-lg lg:text-xl">
            오늘도 만나서 반가워요!
          </p>
        </div>

        <div className="space-y-6">
          <Input placeholder="이메일을 입력해 주세요" label="이메일" />
          <div className="relative">
            <Input
              placeholder="비밀번호를 입력해 주세요"
              type={showPw ? "text" : "password"}
              label="비밀번호"
            />
            <button
              type="button"
              className="absolute top-[41px] right-3 h-[18px] w-[18px] cursor-pointer md:top-[46px] lg:top-[47px] lg:h-6 lg:w-6"
              onClick={() => setShowPw(!showPw)}
              aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              {showPw ? (
                <Eye
                  className="text-black-200 hover:text-black-300 h-full w-full"
                  strokeWidth={1}
                />
              ) : (
                <EyeOff
                  className="text-black-200 hover:text-black-300 h-full w-full"
                  strokeWidth={1}
                />
              )}
            </button>
          </div>
        </div>

        <Button size="lg" type="submit" className="mb-2" disabled>
          로그인하기
        </Button>
        <Button size="lg" variant="outline">
          Google 간편 로그인하기
        </Button>

        <div className="mb-8 flex items-center gap-2 md:gap-4 lg:mb-10 lg:gap-6">
          <div className="bg-black-100 h-px flex-1 rounded"></div>
          <p className="lg:text-md text-black-500 text-center text-xs md:text-sm">
            회원이 아니신가요?&nbsp;
            <Link
              href="/signup"
              className="hover-text-shadow font-semibold text-green-600 underline"
            >
              회원가입하기
            </Link>
          </p>
          <div className="bg-black-100 h-px flex-1 rounded"></div>
        </div>
      </form>
    </main>
  );
}
