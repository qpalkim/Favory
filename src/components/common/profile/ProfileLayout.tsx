import ProfileHeader from "./ProfileHeader";
import ProfileSideBar from "./ProfileSideBar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="rounded-xl bg-white shadow-lg md:rounded-2xl lg:hidden">
        <ProfileHeader />
        <section className="flex-1">{children}</section>
      </div>

      <div className="flex max-w-[1200px] items-start justify-between gap-6">
        <div className="hidden max-w-[416px] rounded-xl bg-white shadow-lg md:rounded-2xl lg:block">
          <ProfileSideBar />
        </div>
        <section className="hidden w-full max-w-[660px] lg:block">{children}</section>
      </div>
    </div>
  );
}
