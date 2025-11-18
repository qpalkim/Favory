"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/lib/hooks/useAuth";
import { SignUpRequest, signUpRequestSchema } from "@/lib/types/auth";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo_green_vertical.svg";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignUpForm() {
  const { mutateAsync: signUp } = useSignUp();
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpRequest>({
    resolver: zodResolver(signUpRequestSchema),
    mode: "onChange",
  });

  // 추후 토스트 성공/실패 알림 처리
  const onSubmit = async (data: SignUpRequest) => {
    try {
      await signUp(data);
      console.log("회원가입에 성공했습니다");
    } catch (err) {
      const error = err as AxiosError;
      const status = error?.response?.status;
      console.error(status, "회원가입에 실패했습니다");
    }
  };

  return (
    <main className="mx-auto max-w-[660px] min-w-[344px] rounded-xl bg-white shadow-lg md:rounded-2xl">
      <div className="space-y-[42px] px-4 py-[42px] lg:space-y-[52px] lg:px-6 lg:py-[52px]">
        <div className="flex flex-col items-center">
          <Link href="/" className="inline-block text-center">
            <Image
              src={logo}
              alt="로고 아이콘"
              className="w-[62px] drop-shadow-md md:w-[83px] lg:w-[110px]"
            />
          </Link>
          <p className="text-md text-black-500 mt-4 text-center md:text-lg lg:text-xl">
            서비스를 찾아주셔서 반가워요!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Input
              label="이메일"
              placeholder="이메일을 입력해 주세요"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          <div className="mb-6 space-y-2">
            <div className="relative">
              <Input
                label="비밀번호"
                placeholder="비밀번호를 입력해 주세요"
                type={showPw ? "text" : "password"}
                {...register("password", {
                  onBlur: () => trigger("password"),
                })}
                error={errors.password?.message}
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
            <div className="relative">
              <Input
                placeholder="비밀번호를 한번 더 입력해 주세요"
                type={showPwConfirm ? "text" : "password"}
                {...register("passwordConfirmation", {
                  onBlur: () => trigger("passwordConfirmation"),
                })}
                error={errors.passwordConfirmation?.message}
              />
              <button
                type="button"
                className="absolute top-[9px] right-3 h-[18px] w-[18px] cursor-pointer md:top-[10px] lg:top-[11px] lg:h-6 lg:w-6"
                onClick={() => setShowPwConfirm(!showPwConfirm)}
                aria-label={showPwConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPwConfirm ? (
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

          <div className="mb-[42px]">
            <Input
              label="닉네임"
              placeholder="닉네임을 입력해 주세요"
              type="text"
              {...register("nickname")}
              error={errors.nickname?.message}
            />
          </div>

          <Button
            size="lg"
            type="submit"
            className="mb-2"
            disabled={!isValid}
            isLoading={isSubmitting}
          >
            회원가입하기
          </Button>
          <Button size="lg" variant="outline">
            Google 간편 가입하기
          </Button>
        </form>

        <div className="mb-8 flex items-center gap-2 md:gap-4 lg:mb-10 lg:gap-6">
          <div className="bg-black-100 h-px flex-1 rounded"></div>
          <p className="lg:text-md text-black-500 text-center text-xs md:text-sm">
            이미 회원이신가요?&nbsp;
            <Link
              href="/login"
              className="hover-text-shadow font-semibold text-green-600 underline"
            >
              로그인하기
            </Link>
          </p>
          <div className="bg-black-100 h-px flex-1 rounded"></div>
        </div>
      </div>
    </main>
  );
}
