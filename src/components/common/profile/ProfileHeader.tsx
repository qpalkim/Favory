import { useState } from "react";
import { Pencil } from "lucide-react";
import { useProfile } from "@/lib/contexts/ProfileContext";
import { ProfileCategory } from "@/lib/types/users";
import Tab, { TabItem } from "@/components/ui/Tab";
import { MEDIA_TYPE_META } from "@/lib/utils/constants";
import ProfileImage from "@/components/ui/ProfileImage";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import EditProfileModal from "../modal/EditProfileModal";

export default function ProfileHeader() {
  const { tab, setTab, user, isMyProfile } = useProfile();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const tabItems: TabItem[] = Object.values(MEDIA_TYPE_META)
    .filter(({ id }) => isMyProfile || id !== "COMMENT")
    .map(({ id, label }) => ({ id, label }));

  return (
    <>
      <section className="mx-auto flex flex-col items-center justify-center">
        <div className="relative">
          <ProfileImage
            size="xl"
            src={user.profileImageUrl}
            className="-mt-8 md:-mt-12"
          />
          {isMyProfile && (
            <Button
              ariaLabel="프로필 수정"
              onClick={() => setIsEditOpen(true)}
              className="absolute right-0 bottom-0 h-6 w-6 rounded-full p-0 md:h-8 md:w-8"
            >
              <Pencil className="h-3 w-3 text-white md:h-4 md:w-4" />
            </Button>
          )}
        </div>
        <h1 className="md:text-2lg my-3 text-[15px] font-semibold text-green-600 md:my-6">
          {user.nickname}
        </h1>
        {user.profileMessage && (
          <p className="md:text-md text-black-500 mb-4 text-sm md:mb-8">
            {user.profileMessage}
          </p>
        )}
        <nav aria-label="프로필 탭" className="w-full">
          <Tab
            items={tabItems}
            value={tab}
            onChange={(id) => setTab(id as ProfileCategory)}
          />
        </nav>
      </section>

      {isEditOpen && (
        <Modal onClose={() => setIsEditOpen(false)}>
          <EditProfileModal onClose={() => setIsEditOpen(false)} />
        </Modal>
      )}
    </>
  );
}
