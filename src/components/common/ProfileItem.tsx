import Link from "next/link";
import ProfileImg from "../ui/ProfileImg";

// 추후 타입 정의 필요
interface User {
  id: number;
  nickname: string; // 유저 닉네임
  bio: string | null; // 유저 한 줄 소개
  profileImg: string | null; // 유저 프로필 이미지
}

interface ProfileItemProps {
  user: User;
}

export default function ProfileItem({ user }: ProfileItemProps) {
  return (
    <Link
      href={`/profile/@${encodeURIComponent(user.nickname)}`}
      className="border-black-100 block w-full cursor-pointer overflow-hidden border-b py-4 last:border-b-0 md:py-6 lg:max-w-[660px]"
    >
      <div
        className={`flex gap-[10px] md:gap-4 ${user.bio ? "items-start" : "items-center"}`}
      >
        <ProfileImg src={user.profileImg} className="pointer-events-none" />
        <div className="min-w-0 flex-1">
          <p className="text-black-500 lg:text-2lg truncate text-sm leading-tight font-semibold md:text-lg">
            {user.nickname}
          </p>
          {user.bio && (
            <p className="text-black-200 md:text-md mt-1 truncate text-xs leading-tight lg:text-lg">
              {user.bio}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
