import { useState } from "react";
import {
  BookOpen,
  Clapperboard,
  MessageCircleMore,
  Music4,
  Pencil,
  Tv,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { ProfileCategory, UserResponse } from "@/lib/types/users";
import ProfileImg from "@/components/ui/ProfileImg";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import EditProfileModal from "../EditProfileModal";

interface Props {
  tab: ProfileCategory;
  onTabChange: (tab: ProfileCategory) => void;
  isMyProfile: boolean;
  user: UserResponse | null; // 추후 null 타입 제거 예정
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

export default function ProfileSidebar({
  tab,
  onTabChange,
  isMyProfile,
  user,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const getTabItems = (isMyProfile: boolean) => {
    if (!isMyProfile) {
      return TAB_ITEMS.filter((item) => item.id !== "COMMENT");
    }
    return TAB_ITEMS;
  };
  const tabItems = getTabItems(isMyProfile);

  if (!user) return <div>사용자 정보 없음</div>;

  return (
    <>
      <div className="grid grid-cols-[416px_minmax(0,660px)]">
        <div className="flex flex-col items-center justify-center p-8">
          <div className="relative">
            <ProfileImg
              size="xl"
              src={user.profileImageUrl}
              className="-mt-18"
            />
            {isMyProfile && (
              <Button
                onClick={() => setIsOpen(true)}
                className="absolute right-0 bottom-0 rounded-full p-0 md:h-8 md:w-8"
              >
                <Pencil className="h-4 w-4 text-white" />
              </Button>
            )}
          </div>
          <p className="text-2lg my-6 font-semibold text-green-600">
            {user.nickname}
          </p>
          {user.profileMessage && (
            <p className="text-md text-black-500 mb-8">{user.profileMessage}</p>
          )}
          <div className="flex w-full flex-col gap-2">
            {tabItems.map(({ id, label, icon: Icon }) => {
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

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <EditProfileModal
            onClose={() => setIsOpen(false)}
            src={user.profileImageUrl}
          />
        </Modal>
      )}
    </>
  );
}
