import { notFound } from "next/navigation";
import { safeResponse } from "@/lib/network/safeResponse";
import { favoryDetailResponseSchema } from "@/lib/types/favories";
import axiosServerHelper from "@/lib/network/axiosServerHelper";
import FavoryDetailContainer from "@/components/common/FavoryDetailContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = Number(id);
  if (isNaN(parsedId)) notFound();

  try {
    const response = await axiosServerHelper(`/favories/${parsedId}`);
    const favoryDetail = safeResponse(
      response.data,
      favoryDetailResponseSchema,
    );

    return {
      title: `${favoryDetail.mediaTitle} 감상평 | Favory`,
      description: `${favoryDetail.mediaTitle}에 대한 감상평, ${favoryDetail.content.slice(0, 120)}...`,
      openGraph: {
        type: "article",
        title: `${favoryDetail.mediaTitle} 감상평 | Favory`,
        description: `${favoryDetail.mediaTitle}에 대한 감상평, ${favoryDetail.content.slice(0, 120)}...`,
        url: `https://favory.vercel.app/favories/${favoryDetail.mediaType.toLowerCase()}/${parsedId}`,
        images: [
          {
            url: favoryDetail.mediaImageUrl ?? "/thumbnail.jpg",
            width: 800,
            height: 600,
            alt: `${favoryDetail.mediaTitle} 감상평 배너`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${favoryDetail.mediaTitle} 감상평 | Favory`,
        description: `${favoryDetail.mediaTitle}에 대한 감상평, ${favoryDetail.content.slice(0, 120)}...`,
        images: [favoryDetail.mediaImageUrl ?? "/thumbnail.jpg"],
      },
    };
  } catch {
    return {
      title: "오류 | Favory",
      description: "감상평을 불러오는 중 문제가 발생했습니다",
    };
  }
}

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
