import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/getAuth";
import FavoryDetailContainer from "@/components/common/FavoryDetailContainer";

export default async function Page({ params }: { params: { id: string } }) {
  const { isLoggedIn } = await getAuth();
  if (!isLoggedIn) redirect("/login?reason=auth");

  const parsedId = Number(params.id);
  if (isNaN(parsedId)) notFound();

  return <FavoryDetailContainer id={parsedId} />;
}
