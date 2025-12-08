import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo_white.svg";

export default function LoggedOutHeader() {
  return (
    <header className="fixed z-50 w-full bg-green-500 shadow-lg">
      <div className="relative mx-auto flex h-10 max-w-[1448px] items-center justify-between px-4 transition-all md:h-12">
        <Link href="/favories">
          <Image
            src={logo}
            alt="헤더 로고"
            className="w-[86px] transition-opacity hover:opacity-80 md:w-[101px]"
          />
        </Link>
        <Link
          href="/login"
          className="text-md md:text-2lg font-semibold text-white transition-opacity hover:opacity-80"
          aria-label="로그인 페이지로 이동"
        >
          로그인
        </Link>
      </div>
    </header>
  );
}
