import { FavoryDetail } from "./FeedCard";
import Image from "next/image";
import Link from "next/link";
import ProfileImg from "./ProfileImg";
import Badge from "./Badge";

interface FavoryItemProps {
  favoryDetail: FavoryDetail; // 임시 타입 import
  profile?: boolean;
}

export default function FavoryItem({
  favoryDetail,
  profile = false,
}: FavoryItemProps) {
  return (
    <Link
      href={`/favories/${favoryDetail.category}/${favoryDetail.id}`}
      className="border-black-100 flex gap-[10px] overflow-hidden border-b py-4 last:border-b-0 md:gap-4 md:py-6 lg:max-w-[660px]"
    >
      {!profile && (
        <ProfileImg
          src={favoryDetail.profileImg}
          className="pointer-events-none flex-shrink-0"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between">
          <h2 className="text-black-500 lg:text-2lg text-sm leading-tight font-semibold md:text-lg">
            {favoryDetail.title}
          </h2>
          <p className="text-black-200 lg:text-md truncate text-[10px] leading-tight font-light md:text-xs">
            {favoryDetail.createdAt}
          </p>
        </div>
        <p className="text-black-200 md:text-md mt-1 truncate text-xs leading-tight lg:text-lg">
          {favoryDetail.creator} • {favoryDetail.year}
        </p>
        <h3 className="text-black-500 lg:text-2lg text-md mt-2 truncate leading-tight font-medium md:text-lg">
          {favoryDetail.favoryTitle}
        </h3>
        <p className="text-black-500 md:text-md mt-1 truncate text-sm leading-tight lg:text-lg">
          {favoryDetail.content}
        </p>
        <div className="mt-2 flex flex-wrap gap-1 overflow-hidden md:gap-2">
          {(favoryDetail.tag ?? []).map((tag) => (
            <Badge key={tag.id} onClick={() => {}}>
              #{tag.name}
            </Badge>
          ))}
        </div>
      </div>
      <Image
        src={favoryDetail.coverImg}
        alt={favoryDetail.title}
        className="h-[72px] w-auto flex-shrink-0 rounded-sm object-cover md:h-[92px] md:rounded-md lg:h-[100px]"
      />
    </Link>
  );
}
