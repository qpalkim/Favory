"use client";
import { notFound, useParams } from "next/navigation";
import AddFavoryForm from "@/components/common/AddFavoryForm";

const ALLOWED_CATEGORIES = ["music", "movie", "drama", "book"];

export default function Page() {
  const params = useParams();
  const category = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category;

  if (!category || !ALLOWED_CATEGORIES.includes(category)) notFound();

  return (
    <section className="bg-gradient-to-b from-green-600 via-green-500 to-green-100">
      <div className="px-4 py-[52px] md:px-0 md:py-[70px] lg:py-[100px]">
        <AddFavoryForm category={category} />
      </div>
    </section>
  );
}
