import { notFound } from "next/navigation";
import FavoryDetailContainer from "@/components/common/FavoryDetailContainer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = Number(id);
  if (isNaN(parsedId)) notFound();

  return <FavoryDetailContainer id={parsedId} />;
}
