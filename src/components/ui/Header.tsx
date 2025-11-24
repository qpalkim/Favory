"use client";
import { useUserData } from "@/lib/hooks/useUser";
import LoggedInHeader from "./LoggeedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

export default function Header() {
  // 추후 내 정보 조회 적용 시, 제거 예정
  const storedId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const userId = storedId ? Number(storedId) : undefined;
  const { data: user } = useUserData(userId);

  return user?.id ? (
    <LoggedInHeader image={user.profileImageUrl} nickname={user.nickname} />
  ) : (
    <LoggedOutHeader />
  );
}
