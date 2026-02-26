"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAddOauth } from "@/lib/hooks/useOauth";
import { toast } from "react-toastify";
import Script from "next/script";
import Image from "next/image";
import Button from "@/components/ui/Button";
import google from "@/assets/logo/logo_google.png";

type GoogleOauthButtonProps = {
  type: "signup" | "login";
};

const TEXT = {
  signup: {
    button: "Google로 가입하기",
    success: "Google 간편 가입에 성공했습니다.",
    fail: "Google 간편 가입에 실패했습니다.",
  },
  login: {
    button: "Google로 로그인하기",
    success: "Google 간편 로그인에 성공했습니다.",
    fail: "Google 간편 로그인에 실패했습니다.",
  },
};

const isUnsupportedBrowser = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("edg") || ua.includes("firefox");
}

export default function GoogleOauthButton({ type }: GoogleOauthButtonProps) {
  const [ready, setReady] = useState(false);
  const { mutateAsync: googleOauth } = useAddOauth("GOOGLE");
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleGooglePrompt = () => {
    if (isUnsupportedBrowser() || !window.google || !ready) {
      toast.info("현재 브라우저에서는 지원하지 않습니다.");
      return;
    }

    try {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isDismissedMoment()) return;
        if (notification.isSkippedMoment()) return;
        if (notification.isNotDisplayed()) return;
      });
    } catch (err) {
      if ((err as DOMException).name !== "AbortError") {
        toast.error("Google 인증 중, 문제가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          if (!window.google) return;

          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: async (res: google.accounts.id.CredentialResponse) => {
              if (!res.credential)
                return toast.error("Google 인증 중, 문제가 발생했습니다.");
              try {
                await googleOauth({ token: res.credential });
                await queryClient.invalidateQueries({ queryKey: ["me"] });
                toast.success(TEXT[type].success);
                router.push("/favories");
              } catch {
                toast.error(TEXT[type].fail);
              }
            },
          });
          setReady(true);
        }}
      />
      <Button
        size="lg"
        variant="outline"
        onClick={handleGooglePrompt}
      >
        <Image src={google} alt="Google 로고 아이콘" className="h-4 w-4 mr-2 md:h-5 md:w-5" />
        {TEXT[type].button}
      </Button>
    </>
  );
}
