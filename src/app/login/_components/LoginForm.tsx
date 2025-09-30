import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import logo from "@/assets/logo/logo.svg";

export default function LoginForm() {
  return (
    <main className="mx-auto max-w-[660px] min-w-[344px] rounded-[16px] bg-white shadow-lg">
      <div className="space-y-12 px-5 py-10 md:px-6 md:py-15 lg:px-10 lg:py-18">
        <div className="mb-11">
          <Image
            src={logo}
            alt="로고"
            className="mx-auto w-16 drop-shadow-lg md:w-20 lg:w-26"
          />
          <h1 className="font-leferiBold mt-3 text-center text-[18px] text-green-600 md:text-xl md:text-[24px] lg:mt-5 lg:text-[28px]">
            Favory
          </h1>
          <h4 className="text-md lg:text-2lg mt-3 text-center md:text-lg lg:mt-4">
            오늘도 만나서 반가워요!
          </h4>
        </div>
        <div className="space-y-5">
          <Input placeholder="이메일을 입력해 주세요" label="이메일" />
          <Input
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            label="비밀번호"
          />
        </div>
        <div>
          <Button className="mb-2 w-full">로그인하기</Button>
          <Button variant="outline" className="w-full">
            Google 간편 로그인하기
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-black-100 h-px flex-1"></div>
          <p className="lg:text-md text-center text-sm">
            회원이 아니신가요?&nbsp;
            <Link
              href="/signup"
              className="hover-text-shadow font-semibold text-green-600 underline"
            >
              회원가입하기
            </Link>
          </p>
          <div className="bg-black-100 h-px flex-1"></div>
        </div>
      </div>
    </main>
  );
}
