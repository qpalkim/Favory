import { createContext, useContext } from "react";
import { User } from "../types/users";

type ProfileContextValue = {
  user: User;
  isMyProfile: boolean;
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
  return (
    <ProfileContext.Provider
      value={{
        user,
        isMyProfile,
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
