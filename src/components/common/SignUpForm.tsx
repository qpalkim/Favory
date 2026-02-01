"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin, useSignUp } from "@/lib/hooks/useAuth";
import { SignUpRequest, signUpRequestSchema } from "@/lib/types/auth";
import { ErrorResponse } from "@/lib/types/errors";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo_green_vertical.svg";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import GoogleOauthButton from "./GoogleOauthButton";

export default function SignUpForm() {
  const queryClient = useQueryClient();
  const { mutateAsync: signUp } = useSignUp();
  const { mutateAsync: login } = useLogin();
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpRequest>({
    resolver: zodResolver(signUpRequestSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpRequest) => {
    try {
      await signUp(data);
      const { email, password } = data;
      await login({ email, password });
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("회원가입에 성공했습니다");
      router.push("/favories");
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const status = error.response?.status;
      const field = error.response?.data?.field;

      if (status === 400) {
        if (field === "email") {
          setError("email", {
            type: "manual",
            message: "이미 존재하는 이메일입니다",
          });
        } else if (field === "nickname") {
          setError("nickname", {
            type: "manual",
            message: "이미 존재하는 닉네임입니다",
          });
        }
        return;
      }
      toast.error("회원가입에 실패했습니다");
    }
  };

  const iconClass = "text-black-200 hover:text-black-300 h-full w-full"

  return (
    <main className="mx-auto max-w-[660px] min-w-[344px] rounded-xl bg-white shadow-lg md:rounded-2xl">
      <div className="space-y-10 px-4 py-10">
        <div className="flex flex-col items-center gap-4">
          <Link href="/" className="inline-block text-center">
            <Image
              src={logo}
              alt="Favory 로고"
              className="w-[62px] drop-shadow-md md:w-[83px]"
            />
          </Link>
          <p className="text-md text-black-500 text-center md:text-lg">
            서비스를 찾아주셔서 반가워요!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

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
                className="absolute top-[41px] right-3 h-[18px] w-[18px] cursor-pointer md:top-[46px]"
                onClick={() => setShowPw(!showPw)}
                aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPw ? (
                  <Eye className={iconClass} strokeWidth={1} />
                ) : (
                  <EyeOff className={iconClass} strokeWidth={1} />
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
                className="absolute top-[9px] right-3 h-[18px] w-[18px] cursor-pointer md:top-[10px]"
                onClick={() => setShowPwConfirm(!showPwConfirm)}
                aria-label={showPwConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPwConfirm ? (
                  <Eye className={iconClass} strokeWidth={1} />
                ) : (
                  <EyeOff className={iconClass} strokeWidth={1} />
                )}
              </button>
            </div>
          </div>

          <div className="mb-10">
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
          <GoogleOauthButton type="signup" />
        </form>

        <div className="mb-8 flex items-center gap-4">
          <div className="bg-black-100 h-px flex-1 rounded" />
          <p className="text-black-500 text-center text-xs md:text-sm">
            이미 회원이신가요?&nbsp;
            <Link
              href="/login"
              className="hover-text-shadow font-semibold text-green-600 underline"
            >
              로그인하기
            </Link>
          </p>
          <div className="bg-black-100 h-px flex-1 rounded" />
        </div>
      </div>
    </main>
  );
}
