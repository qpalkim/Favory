import { axiosClientHelper } from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import { AddOauthRequest, OauthProvider } from "../types/oauth";
import { UserResponse, userResponseSchema } from "../types/users";

// 구글 간편 로그인 등록 API
export const addOauthApps = async (
  provider: OauthProvider,
  data: AddOauthRequest,
) => {
  const response = await axiosClientHelper.post<UserResponse>(
    `/login/${provider}`,
    data,
  );
  return safeResponse(response.data, userResponseSchema);
};
