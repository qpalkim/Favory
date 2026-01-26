import { createContext, useContext, useState } from "react";
import { ProfileCategory, User } from "../types/users";

type ProfileContextValue = {
  user: User;
  isMyProfile: boolean;
  tab: ProfileCategory;
  setTab: (tab: ProfileCategory) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export const ProfileProvider = ({
  user,
  isMyProfile,
  children,
}: {
  user: User;
  isMyProfile: boolean;
  children: React.ReactNode;
}) => {
  const [tab, setTab] = useState<ProfileCategory>("MUSIC");

  return (
    <ProfileContext.Provider
      value={{
        user,
        isMyProfile,
        tab,
        setTab,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within ProfileProvider");
  return context;
};
