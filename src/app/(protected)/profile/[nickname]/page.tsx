"use client";
import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useMyData, useUserData } from "@/lib/hooks/useUsers";
import { ProfileCategory } from "@/lib/types/users";
import ProfileLayout from "@/components/common/profile/ProfileLayout";
import ProfileContent from "@/components/common/profile/ProfileContent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Page() {
  const [tab, setTab] = useState<ProfileCategory>("MUSIC");

  const { nickname } = useParams<{ nickname: string }>();
  const paramNickname = decodeURIComponent(nickname).replace(/^@/, "");

  const { data: me, isLoading, isError } = useMyData();

  const isMyProfile = !!me && paramNickname === me?.nickname;

  const {
    data: otherUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUserData(isMyProfile ? undefined : paramNickname);

  const user = isMyProfile ? me : otherUser;

  if (isLoading || isUserLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!me || !user) return notFound();
  if (isError || isUserError) return <div>에러가 발생했습니다</div>;

  return (
    <div className="mx-auto mt-8 min-h-screen max-w-[1200px] p-4 md:mt-16">
      <ProfileLayout
        user={user}
        tab={tab ?? "MUSIC"}
        onTabChange={setTab}
        isMyProfile={isMyProfile}
      >
        <ProfileContent tab={tab} />
      </ProfileLayout>
    </div>
  );
}
