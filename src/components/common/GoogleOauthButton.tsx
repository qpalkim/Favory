"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAddOauth } from "@/lib/hooks/useOauth";
import { toast } from "react-toastify";
import Script from "next/script";
import Button from "@/components/ui/Button";

export default function GoogleOauthButton() {
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

          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: async (res: google.accounts.id.CredentialResponse) => {
              if (!res.credential)
                return toast.error("구글 인증 중, 문제가 발생했습니다");
              try {
                await googleOauth({ token: res.credential });
                await queryClient.invalidateQueries({ queryKey: ["me"] });
                toast.success("구글 간편 가입에 성공했습니다");
                router.push("/favories");
              } catch {
                toast.error("구글 간편 가입에 실패했습니다");
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
        Google 간편 가입하기
      </Button>
    </>
  );
}
