"use client";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin } from "@/lib/hooks/useAuth";
import { LoginRequest, loginRequestSchema } from "@/lib/types/auth";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo_green_vertical.svg";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import GoogleOauthButton from "./GoogleOauthButton";

export default function LoginForm() {
  const queryClient = useQueryClient();
  const { mutateAsync: login } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasShownToast = useRef(false);
  const [showPw, setShowPw] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "auth" && !hasShownToast.current) {
      toast.info("로그인 후, 이용 가능합니다");
      hasShownToast.current = true;
      window.history.replaceState(null, "", "/login");
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("로그인에 성공했습니다");
      router.push("/favories");
    } catch {
      setError("email", {
        type: "manual",
        message: "이메일 혹은 비밀번호를 확인해 주세요",
      });
      toast.error("로그인에 실패했습니다");
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
              alt="로고 아이콘"
              className="w-[62px] drop-shadow-md md:w-[83px]"
            />
          </Link>
          <p className="text-md text-black-500 text-center md:text-lg">
            오늘도 만나서 반가워요!
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

          <div className="relative mb-10">
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

          <Button
            size="lg"
            type="submit"
            className="mb-2"
            disabled={!isValid}
            isLoading={isSubmitting}
          >
            로그인하기
          </Button>
          <GoogleOauthButton type="login" />
        </form>

        <div className="mb-8 flex items-center gap-4">
          <div className="bg-black-100 h-px flex-1 rounded" />
          <p className="text-black-500 text-center text-xs md:text-sm">
            회원이 아니신가요?&nbsp;
            <Link
              href="/signup"
              className="hover-text-shadow font-semibold text-green-600 underline"
            >
              회원가입하기
            </Link>
          </p>
          <div className="bg-black-100 h-px flex-1 rounded" />
        </div>
      </div>
    </main>
  );
}
