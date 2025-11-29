import { ImageOff } from "lucide-react";
import { Favory } from "@/lib/types/favories";
import Image from "next/image";
import Link from "next/link";
import formatTime from "@/lib/utils/formatTime";
import ProfileImg from "./ProfileImg";
import Badge from "./Badge";

interface FavoryItemProps {
  favory: Favory;
  profile?: boolean;
}

export default function FavoryItem({
  favory: favory,
  profile = false,
}: FavoryItemProps) {
  return (
    <Link
      href={`/favories/${favory.mediaType.toLowerCase()}/${favory.id}`}
      className="border-black-100 flex gap-[10px] overflow-hidden border-b py-4 last:border-b-0 md:gap-4 md:py-6 lg:max-w-[660px]"
    >
      {!profile && (
        <ProfileImg
          src={favory.userImageUrl}
          className="pointer-events-none flex-shrink-0"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between">
          <h2 className="text-black-500 text-sm leading-tight font-semibold md:text-lg">
            {favory.mediaTitle}
          </h2>
          <p className="text-black-200 truncate text-[10px] leading-tight font-light md:text-xs">
            {formatTime(favory.updatedAt || favory.createdAt)}
          </p>
        </div>
        <p className="text-black-200 md:text-md mt-1 truncate text-xs leading-tight">
          {favory.mediaCreator || "정보 없음"} •{" "}
          {favory.mediaYear || "연도 정보 없음"}
        </p>
        <h3 className="text-black-500 mt-2 truncate text-sm leading-tight font-medium md:text-lg">
          {favory.title}
        </h3>
        <p className="text-black-500 md:text-md mt-1 truncate text-sm leading-tight">
          {favory.content}
        </p>
        <div className="mt-2 flex flex-wrap gap-1 overflow-hidden md:gap-2">
          {(favory.tags ?? []).map((tag) => (
            <Badge key={tag.id} onClick={() => {}}>
              #{tag.name}
            </Badge>
          ))}
        </div>
      </div>
      {favory.mediaImageUrl ? (
        <Image
          src={favory.mediaImageUrl}
          alt={favory.title}
          className="h-[72px] w-auto flex-shrink-0 rounded-sm object-cover md:h-[92px] md:rounded-md"
        />
      ) : (
        <div className="bg-black-10 flex h-[72px] w-[72px] flex-col items-center justify-center rounded-sm object-cover md:h-[92px] md:w-[92px] md:rounded-md">
          <ImageOff className="text-black-100 h-[24px] w-[24px] stroke-1 md:h-[32px] md:w-[32px]" />
        </div>
      )}
    </Link>
  );
}
