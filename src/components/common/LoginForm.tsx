import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import logo from "@/assets/logo/logo_green_vertical.svg";

export default function LoginForm() {
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
          <Input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            label="비밀번호"
          />
        </div>

        <Button size="lg" type="submit" className="mb-2">
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
