import Image from "next/image";
import Link from "next/link";
import logoSm from "@/assets/logo/logo_white_sm.svg";
import logoMd from "@/assets/logo/logo_white_md.svg";
import logoLg from "@/assets/logo/logo_white_lg.svg";

export default function Header() {
  return (
    <header className="w-full bg-green-500 z-50 shadow-xl">
      <div className="relative max-w-[1400px] mx-auto lg:h-18 md:h-15 h-13 flex items-center justify-between md:px-18 px-6">
        <Link href="/">
          <Image src={logoSm} alt="모바일 헤더 로고" className="md:hidden " />
          <Image
            src={logoMd}
            alt="태블릿 헤더 로고"
            className="hidden md:block lg:hidden"
          />
          <Image src={logoLg} alt="PC 헤더 로고" className="hidden lg:block" />
        </Link>
        <Link href="/login">
          <h4 className="font-semibold text-white text-md md:text-2lg">
            로그인
          </h4>
        </Link>
      </div>
    </header>
  );
}
