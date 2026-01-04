import {
  BookOpen,
  Clapperboard,
  MessageCircleMore,
  Music4,
  Tv,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { ProfileCategory } from "@/lib/types/users";
import ProfileImg from "@/components/ui/ProfileImg";

interface Props {
  tab: ProfileCategory;
  onTabChange: (tab: ProfileCategory) => void;
}

const TAB_ITEMS: {
  id: ProfileCategory;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "MUSIC", label: "음악", icon: Music4 },
  { id: "MOVIE", label: "영화", icon: Clapperboard },
  { id: "DRAMA", label: "드라마", icon: Tv },
  { id: "BOOK", label: "도서", icon: BookOpen },
  { id: "COMMENT", label: "댓글", icon: MessageCircleMore },
];

export default function ProfileSidebar({ tab, onTabChange }: Props) {
  return (
    <div className="grid grid-cols-[416px_minmax(0,660px)]">
      <div className="flex flex-col items-center justify-center p-8">
        <ProfileImg size="xl" src={null} className="-mt-18" />
        <p className="text-2lg mt-6 font-semibold text-green-600">nickname</p>
        <p className="text-md text-black-500 mt-6 mb-8">프로필 메시지</p>
        <div className="flex w-full flex-col gap-2">
          {TAB_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = tab === id;

            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                role="tab"
                aria-selected={isActive}
                className={cn(
                  "text-md flex cursor-pointer items-center gap-4 rounded-lg px-6 py-4 transition-colors duration-200",
                  isActive
                    ? "bg-green-10 font-semibold text-green-600"
                    : "text-black-200 hover:opacity-80 hover:transition-opacity",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-green-600" : "text-black-200",
                  )}
                />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
