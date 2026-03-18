import Cookies from "js-cookie";

const STORAGE_KEYS = {
  TOKEN: "token",
  TOKEN_EXPIRES: "token-expires",
  XTOKEN: "x-token",
};

/**
 * 持久化 token 到 Cookie + localStorage
 */
export function persistToken(token: string, expiresAt: number): void {
  const expiresAtMs = expiresAt < 10000000000 ? expiresAt * 1000 : expiresAt;

  const hostname = window.location.hostname;
  const domain = hostname.includes("100.city") ? ".100.city" : undefined;

  const cookieOptions = {
    expires: new Date(expiresAtMs),
    path: "/",
    domain,
    secure: window.location.protocol === "https:",
    sameSite: "Lax" as const,
  };

  Cookies.set(STORAGE_KEYS.TOKEN, token, cookieOptions);
  Cookies.set(STORAGE_KEYS.XTOKEN, token, cookieOptions);
  localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES, expiresAtMs.toString());
}

/**
 * 清除所有认证数据
 */
export function clearAuthData(): void {
  localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES);
  localStorage.removeItem("user-basic-info");

  const cookieNames = [STORAGE_KEYS.TOKEN, STORAGE_KEYS.XTOKEN];
  const domains = [window.location.hostname, `.${window.location.hostname}`, undefined];

  cookieNames.forEach((name) => {
    domains.forEach((domain) => {
      Cookies.remove(name, { path: "/", domain });
    });
    Cookies.remove(name);
  });
}

/**
 * 判断是否已登录（token 存在且未过期）
 */
export function isLoggedIn(): boolean {
  const token = Cookies.get(STORAGE_KEYS.TOKEN);
  const tokenExpires = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES);

  if (!token || !tokenExpires) return false;
  return parseInt(tokenExpires) > Date.now();
}

/**
 * 获取当前 token
 */
export function getAuthToken(): string | null {
  return Cookies.get(STORAGE_KEYS.TOKEN) || null;
}
