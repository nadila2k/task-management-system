const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const LEGACY_TOKEN_KEY = "token";

// Match backend JWT_ACCESS_EXPIRES_IN=15m and JWT_REFRESH_EXPIRES_IN=7d
const ACCESS_MAX_AGE = 15 * 60;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60;

export function setCookie(name, value, maxAgeSeconds) {
  if (!value) return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length !== 2) return null;

  const rawValue = parts.pop().split(";").shift();

  try {
    return decodeURIComponent(rawValue);
  } catch {
    return rawValue;
  }
}

export function deleteCookie(name) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export function getAccessToken() {
  return getCookie(ACCESS_TOKEN_KEY) || getCookie(LEGACY_TOKEN_KEY);
}

export function getRefreshToken() {
  return getCookie(REFRESH_TOKEN_KEY);
}

export function persistAuthSession({ accessToken, refreshToken }) {
  if (accessToken) {
    setCookie(ACCESS_TOKEN_KEY, accessToken, ACCESS_MAX_AGE);
    deleteCookie(LEGACY_TOKEN_KEY);
  }
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_KEY, refreshToken, REFRESH_MAX_AGE);
  }
}

export function clearAuthSession() {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
  deleteCookie(LEGACY_TOKEN_KEY);
}

export function hasAuthSession() {
  return Boolean(getAccessToken());
}

export function hasPersistedSession() {
  return Boolean(getAccessToken() || getRefreshToken());
}
