export const ACCESS_TOKEN_COOKIE_NAME = "auth.token.centraalProfielStrategy";
export const REFRESH_TOKEN_COOKIE_NAME =
  "auth._refresh_token.centraalProfielStrategy";
export const ID_TOKEN_NAME = "auth.token.idToken";
export const USERID_COOKIE_NAME = "auth.userId";

export const useAuthCookies = () => {
  const accessToken = useCookie(ACCESS_TOKEN_COOKIE_NAME);
  const refreshToken = useCookie(REFRESH_TOKEN_COOKIE_NAME);
  const idToken = useCookie(ID_TOKEN_NAME);
  const userId = useCookie(USERID_COOKIE_NAME);

  const deleteCookies = () => {
    accessToken.value = null;
    refreshToken.value = null;
  };

  return { accessToken, refreshToken, idToken, userId, deleteCookies };
};
