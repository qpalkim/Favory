import { cookies } from "next/headers";

export const getAuth = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  const isLoggedIn = Boolean(accessToken?.value || refreshToken?.value);

  return {
    isLoggedIn,
    accessToken: accessToken?.value,
    refreshToken: refreshToken?.value,
  };
};
