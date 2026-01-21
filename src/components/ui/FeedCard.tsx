import { useState } from "react";
import { Favory } from "@/lib/types/favories";
import { CREATOR_FALLBACK } from "@/lib/utils/constants";
import Image from "next/image";
import Link from "next/link";
import formatTime from "@/lib/utils/formatTime";
import ProfileImage from "./ProfileImage";
import Modal from "./Modal";
import UserProfileModal from "../common/modal/UserProfileModal";

interface FeedCardProps {
  favory: Favory;
}

export default function FeedCard({ favory }: FeedCardProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <Link
        href={`favories/${favory.mediaType.toLowerCase()}/${favory.id}`}
        className="relative flex aspect-square h-full min-h-[160px] w-full min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
      >
        {favory.mediaImageUrl ? (
          <Image
            src={favory.mediaImageUrl}
            alt={favory.mediaTitle}
            width={300}
            height={300}
            className="h-full w-auto object-cover"
          />
        ) : (
          <div className="bg-black-10 absolute inset-0 mt-10 flex w-full justify-center" />
        )}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="relative flex-1">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 w-full p-3 md:p-4 lg:p-5">
              <h2 className="truncate text-sm leading-tight font-semibold text-white md:text-lg">
                {favory.mediaTitle}
              </h2>
              <p className="md:text-md mt-1 truncate text-xs leading-tight text-white">
                {favory.mediaCreator || CREATOR_FALLBACK[favory.mediaType]} •{" "}
                {favory.mediaYear || "연도 정보 없음"}
              </p>
            </div>
          </div>
          <div className="w-full flex-col justify-between bg-white p-3 md:p-4 lg:p-5">
            <h3 className="text-black-500 truncate text-sm leading-tight font-medium md:text-lg">
              {favory.title}
            </h3>
            <p className="text-black-500 text-md mt-1 hidden truncate leading-tight md:block">
              {favory.content}
            </p>
            <div className="mt-1 flex items-center gap-2 md:mt-2">
              <ProfileImage
                src={favory.userImageUrl}
                size="sm"
                clickable
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsProfileOpen(true);
                }}
              />
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="text-black-500 md:text-md truncate text-xs leading-tight">
                  {favory.userNickname}
                </p>
                <p className="text-black-200 truncate text-[10px] leading-tight font-light md:text-xs">
                  {formatTime(favory.createdAt)}
                  {favory.createdAt !== favory.updatedAt && "(수정됨)"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>

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
