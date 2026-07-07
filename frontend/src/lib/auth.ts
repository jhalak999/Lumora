const ACCESS_TOKEN_KEY = "lumora_access_token";
const REFRESH_TOKEN_KEY = "lumora_refresh_token";

export function setTokens(
  accessToken: string,
  refreshToken: string,
) {
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    accessToken,
  );

  localStorage.setItem(
    REFRESH_TOKEN_KEY,
    refreshToken,
  );
}

export function getAccessToken() {
  return localStorage.getItem(
    ACCESS_TOKEN_KEY,
  );
}

export function removeTokens() {
  localStorage.removeItem(
    ACCESS_TOKEN_KEY,
  );

  localStorage.removeItem(
    REFRESH_TOKEN_KEY,
  );
}