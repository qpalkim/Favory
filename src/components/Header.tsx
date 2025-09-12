import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/logo_white.svg";

export default function Header() {
  return (
    <header className="w-full bg-green-500 z-50 shadow-xl">
      <div className="relative max-w-[1448px] mx-auto lg:h-14 md:h-12 h-10 flex items-center justify-between px-6 transition-all">
        <Link href="/">
          <Image
            src={logo}
            alt="헤더 로고"
            className="w-[73px] md:w-[92px] lg:w-[110px] hover:opacity-80 transition-opacity"
          />
        </Link>
        <Link
          href="/login"
          className="font-semibold text-white text-md md:text-lg lg:text-2lg hover:opacity-80 transition-opacity"
          aria-label="로그인 페이지로 이동"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
