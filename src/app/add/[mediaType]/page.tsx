"use client";
import { notFound, useParams } from "next/navigation";
import AddFavoryForm from "@/components/common/AddFavoryForm";

const ALLOWED_MEDIA_TYPES = ["music", "movie", "drama", "book"];

export default function Page() {
  const params = useParams();
  const mediaType = Array.isArray(params?.mediaType)
    ? params.mediaType[0]
    : params?.mediaType;

  if (!mediaType || !ALLOWED_MEDIA_TYPES.includes(mediaType)) notFound();

  return (
    <section className="h-full bg-gradient-to-b from-green-600 via-green-500 to-green-100">
      <div className="px-4 py-[52px] md:px-0 md:py-[70px] lg:py-[100px]">
        <AddFavoryForm mediaType={mediaType} />
      </div>
    </section>
  );
}
