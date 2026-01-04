import { ProfileCategory } from "@/lib/types/users";
import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSideBar";

interface Props {
  tab: ProfileCategory;
  onTabChange: (tab: ProfileCategory) => void;
  children: React.ReactNode;
}

export default function ProfileLayout({ tab, onTabChange, children }: Props) {
  return (
    <div>
      {/* 모바일 */}
      <div className="rounded-xl bg-white shadow-lg md:rounded-2xl lg:hidden">
        <ProfileHeader tab={tab} onTabChange={onTabChange} />
        <main className="flex-1">{children}</main>
      </div>

      <div className="flex max-w-[1200px] justify-between gap-6">
        {/* PC */}
        <div className="hidden max-w-[416px] rounded-xl bg-white shadow-lg md:rounded-2xl lg:block">
          <ProfileSidebar tab={tab} onTabChange={onTabChange} />
        </div>
        <main className="hidden w-full max-w-[660px] lg:block">{children}</main>
      </div>
    </div>
  );
}
