import { LOCAL_USER_AUTH_TOKEN } from "./constants";

export const getUserAuthTokenLocalStorage = (): string => {
  const localToken = localStorage.getItem(LOCAL_USER_AUTH_TOKEN);
  return localToken ? JSON.parse(localToken) : "";
};

export const setUserAuthTokenLocalStorage = (token: string) => {
  localStorage.setItem(LOCAL_USER_AUTH_TOKEN, JSON.stringify(token));
};

export const clearUserAuthTokenLocalStorage = (): void => {
  localStorage.removeItem(LOCAL_USER_AUTH_TOKEN);
};
