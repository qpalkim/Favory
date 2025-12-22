import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/getAuth";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoggedIn } = await getAuth();
  if (!isLoggedIn) redirect("/login?reason=auth");

  return <>{children}</>;
}
