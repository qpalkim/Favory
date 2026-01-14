import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSideBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* 모바일 */}
      <div className="rounded-xl bg-white shadow-lg md:rounded-2xl lg:hidden">
        <ProfileHeader />
        <main className="flex-1">{children}</main>
      </div>

      <div className="flex max-w-[1200px] items-start justify-between gap-6">
        {/* PC */}
        <div className="hidden max-w-[416px] rounded-xl bg-white shadow-lg md:rounded-2xl lg:block">
          <ProfileSidebar />
        </div>
        <main className="hidden w-full max-w-[660px] lg:block">{children}</main>
      </div>
    </div>
  );
}
