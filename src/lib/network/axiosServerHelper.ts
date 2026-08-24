import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { getExpirationDate } from "./getExpirationDate";

const axiosServerHelper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosServerHelper.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (accessToken?.value)
    config.headers.Authorization = `Bearer ${accessToken.value}`;

  return config;
});

axiosServerHelper.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error)) return Promise.reject(error);

    const { response, config } = error;

    if (response?.status === 401 || response?.status === 403) {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      const cookieStore = await cookies();
      const refreshToken = cookieStore.get("refreshToken")?.value;
      const currentAccessToken = cookieStore.get("accessToken")?.value;
      if (!refreshToken) return Promise.reject(error);

      let res;

      try {
        res = await fetch(`${baseURL}/refresh-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentAccessToken}`,
          },
          body: JSON.stringify({
            refreshToken: refreshToken,
          }),
        }).then((value) => value.json());
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }

      const newAccessToken = res.accessToken;
      const newRefreshToken = res.refreshToken;

      if (!config) return Promise.reject(error);
      if (!newAccessToken) return Promise.reject(error);

      const accessTokenExp = getExpirationDate(newAccessToken);
      const refreshTokenExp = newRefreshToken
        ? getExpirationDate(newRefreshToken)
        : undefined;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: accessTokenExp || undefined,
      });

      if (newRefreshToken) {
        cookieStore.set("refreshToken", newRefreshToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          expires: refreshTokenExp || undefined,
        });
      }

      config.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosServerHelper(config);
    }
    return Promise.reject(error);
  },
);

export default axiosServerHelper;
