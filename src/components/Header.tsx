import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo_white.svg";

export default function Header() {
  return (
    <header className="z-50 w-full bg-green-500 shadow-xl">
      <div className="relative mx-auto flex h-10 max-w-[1448px] items-center justify-between px-6 transition-all md:h-12 lg:h-14">
        <Link href="/">
          <Image
            src={logo}
            alt="헤더 로고"
            className="w-[73px] transition-opacity hover:opacity-80 md:w-[92px] lg:w-[110px]"
          />
        </Link>
        <Link
          href="/login"
          className="text-md lg:text-2lg font-semibold text-white transition-opacity hover:opacity-80 md:text-lg"
          aria-label="로그인 페이지로 이동"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
