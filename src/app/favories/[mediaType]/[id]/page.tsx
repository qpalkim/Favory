import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/getAuth";
import FavoryDetailContainer from "@/components/common/FavoryDetailContainer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isLoggedIn } = await getAuth();
  if (!isLoggedIn) redirect("/login?reason=auth");

  const { id } = await params;
  const parsedId = Number(id);

  if (isNaN(parsedId)) notFound();

  return <FavoryDetailContainer id={parsedId} />;
}
