import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import { LoginResponse, loginResponseSchema } from "../types/auth";
import { AddOauthRequest, OauthProvider } from "../types/oauth";

// 간편 로그인 등록 API
export const addOauthApps = async (
  provider: OauthProvider,
  data: AddOauthRequest,
) => {
  const response = await axiosClientHelper.post<LoginResponse>(
    `/login/${provider}`,
    data,
  );
  return safeResponse(response.data, loginResponseSchema);
};
