"use client";
import { useMyData } from "@/lib/hooks/useUsers";
import LoggedInHeader from "./LoggeedInHeader";
import LoggedOutHeader from "./LoggedOutHeader";

export default function Header() {
  const { data: me } = useMyData();

  return me ? (
    <LoggedInHeader image={me.profileImageUrl} nickname={me.nickname} />
  ) : (
    <LoggedOutHeader />
  );
}
