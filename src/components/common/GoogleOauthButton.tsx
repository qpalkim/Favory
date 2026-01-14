"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAddOauth } from "@/lib/hooks/useOauth";
import { toast } from "react-toastify";
import Script from "next/script";
import Button from "@/components/ui/Button";

type GoogleOauthButtonProps = {
  type: "signup" | "login";
};

const TEXT = {
  signup: {
    button: "Google 간편 가입하기",
    success: "구글 간편 가입에 성공했습니다",
    fail: "구글 간편 가입에 실패했습니다",
  },
  login: {
    button: "Google 간편 로그인하기",
    success: "구글 간편 로그인에 성공했습니다",
    fail: "구글 간편 로그인에 실패했습니다",
  },
};

export default function GoogleOauthButton({ type }: GoogleOauthButtonProps) {
  const [ready, setReady] = useState(false);
  const { mutateAsync: googleOauth } = useAddOauth("GOOGLE");
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleClick = () => {
    if (!window.google || !ready) return;

    try {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment())
          return;
        if (notification.isDismissedMoment()) return;
      });
    } catch (err) {
      if ((err as DOMException).name !== "AbortError") {
        toast.error("구글 인증 중, 문제가 발생했습니다");
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
          console.log(
            "Google Client Id:",
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          );

          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: async (res: google.accounts.id.CredentialResponse) => {
              if (!res.credential)
                return toast.error("구글 인증 중, 문제가 발생했습니다");
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
        onClick={handleClick}
        disabled={!ready}
      >
        {TEXT[type].button}
      </Button>
    </>
  );
}
