const COOKIE_KEY = 'login';

export function isLoggedInCookie(): boolean {
  return document.cookie
    .split('; ')
    .some((row) => row === `${COOKIE_KEY}=true`);
}

export function setLoginCookie(): void {
  document.cookie = `${COOKIE_KEY}=true; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
}

export function clearLoginCookie(): void {
  document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
}