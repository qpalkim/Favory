import { useState } from "react";
import { Pencil } from "lucide-react";
import { ProfileCategory, UserResponse } from "@/lib/types/users";
import Tab, { TabItem } from "@/components/ui/Tab";
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

const TAB_ITEMS: TabItem[] = [
  { id: "MUSIC", label: "음악" },
  { id: "MOVIE", label: "영화" },
  { id: "DRAMA", label: "드라마" },
  { id: "BOOK", label: "도서" },
  { id: "COMMENT", label: "댓글" },
];

export default function ProfileHeader({
  tab,
  onTabChange,
  isMyProfile,
  user,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const getTabItems = (isMyProfile: boolean): TabItem[] => {
    if (!isMyProfile) {
      return TAB_ITEMS.filter((item) => item.id !== "COMMENT");
    }
    return TAB_ITEMS;
  };
  const tabItems = getTabItems(isMyProfile);

  if (!user) return <div>사용자 정보 없음</div>;

  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="relative">
          <ProfileImg
            size="xl"
            src={user.profileImageUrl}
            className="-mt-8 md:-mt-12"
          />
          {isMyProfile && (
            <Button
              onClick={() => setIsOpen(true)}
              className="absolute right-0 bottom-0 h-6 w-6 rounded-full p-0 md:h-8 md:w-8"
            >
              <Pencil className="h-3 w-3 text-white md:h-4 md:w-4" />
            </Button>
          )}
        </div>
        <p className="md:text-2lg my-3 text-[15px] font-semibold text-green-600 md:my-6">
          {user.nickname}
        </p>
        {user.profileMessage && (
          <p className="md:text-md text-black-500 mb-4 text-sm md:mb-8">
            {user.profileMessage}
          </p>
        )}
        <nav className="w-full">
          <Tab
            items={tabItems}
            value={tab}
            onChange={(id) => onTabChange(id as ProfileCategory)}
          />
        </nav>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <EditProfileModal onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
