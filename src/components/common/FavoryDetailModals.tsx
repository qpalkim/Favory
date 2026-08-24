"use client";
import Modal from "../ui/Modal";
import DeleteItemModal from "./modal/DeleteItemModal";
import UserProfileModal from "./modal/UserProfileModal";

type FavoryDetailModalsProps = {
  isDeleteOpen: boolean;
  onDeleteClose: () => void;
  onDelete: () => void;
  isProfileOpen: boolean;
  onProfileClose: () => void;
  nickname: string;
  imageUrl: string | null;
};

export default function FavoryDetailModals({
  isDeleteOpen,
  onDeleteClose,
  onDelete,
  isProfileOpen,
  onProfileClose,
  nickname,
  imageUrl,
}: FavoryDetailModalsProps) {
  return (
    <>
      {isDeleteOpen && (
        <Modal onClose={onDeleteClose}>
          <DeleteItemModal
            isComment={false}
            onClose={onDeleteClose}
            onDelete={onDelete}
          />
        </Modal>
      )}

      {isProfileOpen && (
        <Modal onClose={onProfileClose}>
          <UserProfileModal
            onClose={onProfileClose}
            nickname={nickname}
            imageUrl={imageUrl}
          />
        </Modal>
      )}
    </>
  );
}
