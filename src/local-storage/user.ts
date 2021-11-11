import { User } from "../types";
import { LOCAL_USER } from "./constants";

export const getUserLocalStorage = (): User | null => {
  const localUser = localStorage.getItem(LOCAL_USER);
  return localUser ? JSON.parse(localUser) : null;
};

export const setUserLocalStorage = (user: User): void => {
  localStorage.setItem(LOCAL_USER, JSON.stringify(user));
};

export const clearUserLocalStorage = (): void => {
  localStorage.removeItem(LOCAL_USER);
};
