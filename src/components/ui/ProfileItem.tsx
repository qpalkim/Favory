import { UserResponse } from "@/lib/types/users";
import Link from "next/link";
import ProfileImg from "./ProfileImg";

interface ProfileItemProps {
  profile: UserResponse;
}

export default function ProfileItem({ profile }: ProfileItemProps) {
  return (
    <Link
      href={`/profile/@${encodeURIComponent(profile.nickname)}`}
      className="border-black-100 block w-full cursor-pointer overflow-hidden border-b py-4 last:border-b-0 md:py-6 lg:max-w-[660px]"
    >
      <div
        className={`flex gap-[10px] md:gap-4 ${profile.profileMessage ? "items-start" : "items-center"}`}
      >
        <ProfileImg
          src={profile.profileImageUrl}
          className="pointer-events-none"
        />
        <div className="min-w-0 flex-1">
          <p className="text-black-500 truncate text-sm leading-tight font-semibold md:text-lg">
            {profile.nickname}
          </p>
          {profile.profileMessage && (
            <p className="text-black-200 md:text-md mt-1 truncate text-xs leading-tight">
              {profile.profileMessage}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
