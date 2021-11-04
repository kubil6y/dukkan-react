import { atom } from "recoil";
import { USER_TOKEN } from "../constants";
import { User } from "../types";

const userAuthTokenFromLocalStorage = localStorage.getItem(USER_TOKEN);

export const userAuthTokenState = atom<string>({
  key: "userAuthTokenState",
  default: userAuthTokenFromLocalStorage || "",
});

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
