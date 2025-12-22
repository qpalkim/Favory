"use client";
import { useMyData } from "@/lib/hooks/useUsers";
import LoggedInHeader from "./LoggeedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";
import LoggedInHeaderSkeleton from "../skeleton/LoggedInHeaderSkeleton";

export default function Header() {
  const { data: me, isLoading } = useMyData();

  if (isLoading) return <LoggedInHeaderSkeleton />;

  return me ? (
    <LoggedInHeader image={me.profileImageUrl} nickname={me.nickname} />
  ) : (
    <LoggedOutHeader />
  );
}
