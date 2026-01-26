"use client";
import { notFound, useParams } from "next/navigation";
import { MEDIA_TYPE_LABEL_MAP } from "@/lib/utils/constants";
import { MediaType } from "@/lib/types/favories";
import AddFavoryForm from "@/components/common/AddFavoryForm";

export default function Page() {
  const params = useParams();
  const mediaType = params.mediaType;

  if (typeof mediaType !== "string") notFound();

  const upperMediaType = mediaType.toUpperCase();

  if (!(upperMediaType in MEDIA_TYPE_LABEL_MAP)) notFound();

  return (
    <section aria-label="감상평 등록 페이지" className="min-h-screen bg-gradient-to-b from-green-600 via-green-500 to-green-100 px-4 py-[52px] md:px-0 md:py-[70px] lg:py-[100px]">
      <AddFavoryForm mediaType={upperMediaType as MediaType} />
    </section>
  );
}
