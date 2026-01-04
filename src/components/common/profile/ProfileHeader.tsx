import { ProfileCategory } from "@/lib/types/users";
import Tab, { TabItem } from "@/components/ui/Tab";
import ProfileImg from "@/components/ui/ProfileImg";

interface Props {
  tab: ProfileCategory;
  onTabChange: (tab: ProfileCategory) => void;
}

const TAB_ITEMS: TabItem[] = [
  { id: "MUSIC", label: "음악" },
  { id: "MOVIE", label: "영화" },
  { id: "DRAMA", label: "드라마" },
  { id: "BOOK", label: "도서" },
  { id: "COMMENT", label: "댓글" },
];

export default function ProfileHeader({ tab, onTabChange }: Props) {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <ProfileImg size="xl" src={null} className="-mt-8 md:-mt-12" />
      <p className="md:text-2lg mt-3 text-[15px] font-semibold text-green-600 md:mt-6">
        nickname
      </p>
      <p className="md:text-md text-black-500 mt-3 mb-4 text-sm md:mt-6 md:mb-8">
        프로필 메시지
      </p>
      <nav className="w-full">
        <Tab
          items={TAB_ITEMS}
          value={tab}
          onChange={(id) => onTabChange(id as ProfileCategory)}
        />
      </nav>
    </div>
  );
}
