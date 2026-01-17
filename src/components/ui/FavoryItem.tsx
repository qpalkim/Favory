import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageOff } from "lucide-react";
import { Favory } from "@/lib/types/favories";
import Image from "next/image";
import Link from "next/link";
import formatTime from "@/lib/utils/formatTime";
import ProfileImage from "./ProfileImage";
import Badge from "./Badge";
import Modal from "./Modal";
import UserProfileModal from "../common/UserProfileModal";

interface FavoryItemProps {
  favory: Favory;
  profile?: boolean;
}

export default function FavoryItem({
  favory: favory,
  profile = false,
}: FavoryItemProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="border-black-100 flex gap-[10px] overflow-hidden border-b py-4 last:border-b-0 md:gap-4 md:py-6 lg:max-w-[660px]">
        {!profile && (
          <ProfileImage
            src={favory.userImageUrl}
            className="flex-shrink-0"
            clickable
            onClick={() => setIsProfileOpen(true)}
          />
        )}
        <Link
          href={`/favories/${favory.mediaType.toLowerCase()}/${favory.id}`}
          className="flex min-w-0 flex-1 justify-between gap-3"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <h2 className="text-black-500 text-sm leading-tight font-semibold md:text-lg">
                {favory.mediaTitle}
              </h2>
              <p className="text-black-200 truncate text-[10px] leading-tight font-light md:text-xs">
                {formatTime(favory.createdAt)}
                {favory.createdAt !== favory.updatedAt && "(수정됨)"}
              </p>
            </div>
            <p className="text-black-200 md:text-md mt-1 truncate text-xs leading-tight">
              {favory.mediaCreator || "정보 없음"} •{" "}
              {favory.mediaYear || "연도 정보 없음"}
            </p>
            <h3 className="text-black-500 mt-2 truncate text-sm leading-tight font-medium md:text-lg hover:underline">
              {favory.title}
            </h3>
            <p className="text-black-500 md:text-md mt-1 truncate text-sm leading-tight">
              {favory.content}
            </p>
            <div className="mt-2 flex flex-wrap gap-1 overflow-hidden md:gap-2">
              {(favory.tags ?? []).map((tag) => (
                <Badge
                  key={tag.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(
                      `/search?keyword=${encodeURIComponent(`#${tag.name}`)}`,
                    );
                  }}
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </div>
          {favory.mediaImageUrl ? (
            <Image
              src={favory.mediaImageUrl}
              alt={favory.title}
              width={300}
              height={300}
              className="h-[72px] w-auto flex-shrink-0 rounded-sm object-cover md:h-[92px] md:rounded-md"
            />
          ) : (
            <div className="bg-black-10 flex h-[72px] w-[72px] flex-col items-center justify-center rounded-sm object-cover md:h-[92px] md:w-[92px] md:rounded-md">
              <ImageOff className="text-black-100 h-[24px] w-[24px] stroke-1 md:h-[32px] md:w-[32px]" />
            </div>
          )}
        </Link>
      </div>

      {isProfileOpen && (
        <Modal onClose={() => setIsProfileOpen(false)}>
          <UserProfileModal
            onClose={() => setIsProfileOpen(false)}
            nickname={favory.userNickname}
            imageUrl={favory.userImageUrl}
          />
        </Modal>
      )}
    </>
  );
}
