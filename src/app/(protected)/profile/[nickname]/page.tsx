"use client";
import { AxiosError } from "axios";
import { notFound, useParams } from "next/navigation";
import { ProfileProvider } from "@/lib/contexts/ProfileContext";
import { useMyData, useUserData } from "@/lib/hooks/useUsers";
import ProfileLayout from "@/components/common/profile/ProfileLayout";
import ProfileContent from "@/components/common/profile/ProfileContent";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import RetryError from "@/components/ui/RetryError";

export default function Page() {
  const { nickname } = useParams<{ nickname: string }>();
  const paramNickname = decodeURIComponent(nickname).replace(/^@/, "");

  const { data: me, isLoading, isError, error, refetch } = useMyData();
  const isMyProfile = !!me && paramNickname === me?.nickname;

  const {
    data: otherUser,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
    refetch: userRefetch,
  } = useUserData(isMyProfile ? undefined : paramNickname);

  const user = isMyProfile ? me : otherUser;

  if (isLoading || isUserLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  const is404 = (err: unknown) => (err as AxiosError)?.response?.status === 404;
  if (isUserError && is404(userError)) return notFound();

  if (isError && is404(error)) return notFound();

  if (isError || isUserError)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <RetryError onRetry={isMyProfile ? refetch : userRefetch} />
      </div>
    );

  if (!me || !user) return notFound();

  return (
    <ProfileProvider user={user} isMyProfile={isMyProfile}>
      <section className="mx-auto mt-8 min-h-screen max-w-[1200px] p-4 md:mt-16">
        <ProfileLayout>
          <ProfileContent />
        </ProfileLayout>
      </section>
    </ProfileProvider>
  );
}
