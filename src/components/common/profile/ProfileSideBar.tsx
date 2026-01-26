import { useState } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/cn";
import { useProfile } from "@/lib/contexts/ProfileContext";
import { MEDIA_TYPE_META } from "@/lib/utils/constants";
import ProfileImage from "@/components/ui/ProfileImage";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import EditProfileModal from "../modal/EditProfileModal";

export default function ProfileSideBar() {
  const { tab, setTab, user, isMyProfile } = useProfile();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const tabItems = Object.values(MEDIA_TYPE_META)
    .filter(({ id }) => isMyProfile || id !== "COMMENT");

  return (
    <>
      <section className="grid grid-cols-[minmax(0,416px)]">
        <div className="flex flex-col justify-center p-8">
          <div className="relative mx-auto">
            <ProfileImage
              size="xl"
              src={user.profileImageUrl}
              className="-mt-18"
            />
            {isMyProfile && (
              <Button
                ariaLabel="프로필 수정"
                onClick={() => setIsEditOpen(true)}
                className="absolute right-0 bottom-0 rounded-full p-0 md:h-8 md:w-8"
              >
                <Pencil className="h-4 w-4 text-white" />
              </Button>
            )}
          </div>
          <h1 className="mx-auto text-2lg my-6 font-semibold text-green-600">
            {user.nickname}
          </h1>
          {user.profileMessage && (
            <p className="mx-auto text-md text-black-500 mb-8">
              {user.profileMessage}
            </p>
          )}
          <nav aria-label="프로필 탭" className="flex w-full flex-col gap-2">
            {tabItems.map(({ id, label, icon: Icon }) => {
              const isActive = tab === id;

              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-lg px-6 py-4 text-lg transition-colors duration-200",
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
          </nav>
        </div>
      </section>

      {isEditOpen && (
        <Modal onClose={() => setIsEditOpen(false)}>
          <EditProfileModal onClose={() => setIsEditOpen(false)} />
        </Modal>
      )}
    </>
  );
}
