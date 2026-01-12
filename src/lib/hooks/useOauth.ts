import { useMutation } from "@tanstack/react-query";
import { AddOauthRequest, OauthProvider } from "../types/oauth";
import { addOauthApps } from "../apis/oauth";

// 구글 간편 로그인 등록 훅
export const useAddOauth = (provider: OauthProvider) => {
  return useMutation({
    mutationFn: (data: AddOauthRequest) => addOauthApps(provider, data),
  });
};
