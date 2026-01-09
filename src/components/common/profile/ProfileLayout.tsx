import { ProfileCategory, UserResponse } from "@/lib/types/users";
import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSideBar";

interface Props {
  tab: ProfileCategory;
  onTabChange: (tab: ProfileCategory) => void;
  children: React.ReactNode;
  isMyProfile: boolean;
  user: UserResponse | null; // 추후 null 타입 제거 예정
}

export default function ProfileLayout({
  tab,
  onTabChange,
  children,
  isMyProfile,
  user,
}: Props) {
  return (
    <div>
      {/* 모바일 */}
      <div className="rounded-xl bg-white shadow-lg md:rounded-2xl lg:hidden">
        <ProfileHeader
          user={user}
          tab={tab}
          onTabChange={onTabChange}
          isMyProfile={isMyProfile}
        />
        <main className="flex-1">{children}</main>
      </div>

      <div className="flex max-w-[1200px] items-start justify-between gap-6">
        {/* PC */}
        <div className="hidden max-w-[416px] rounded-xl bg-white shadow-lg md:rounded-2xl lg:block">
          <ProfileSidebar
            user={user}
            tab={tab}
            onTabChange={onTabChange}
            isMyProfile={isMyProfile}
          />
        </div>
        <main className="hidden w-full max-w-[660px] lg:block">{children}</main>
      </div>
    </div>
  );
}
