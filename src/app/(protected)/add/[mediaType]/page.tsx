"use client";
import { notFound, useParams } from "next/navigation";
import { ALLOWED_MEDIA_TYPES } from "@/lib/utils/constants";
import { MediaType } from "@/lib/types/favories";
import AddFavoryForm from "@/components/common/AddFavoryForm";

export default function Page() {
  const params = useParams();
  const mediaType = params.mediaType as string;
  if (!mediaType || !ALLOWED_MEDIA_TYPES.includes(mediaType)) notFound();
  const upperMediaType = mediaType.toUpperCase() as MediaType;

  return (
    <section className="h-full bg-gradient-to-b from-green-600 via-green-500 to-green-100">
      <div className="px-4 py-[52px] md:px-0 md:py-[70px] lg:py-[100px]">
        <AddFavoryForm mediaType={upperMediaType} />
      </div>
    </section>
  );
}
