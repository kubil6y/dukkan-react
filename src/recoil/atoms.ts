import { atom } from "recoil";
import { USER_TOKEN } from "../constants";
import { User } from "../types";
import { recoilKeys } from "./constants";

let token = "";
const localTokenValue = localStorage.getItem(USER_TOKEN);
if (localTokenValue !== null) {
  token = JSON.parse(localTokenValue);
}

export const userAuthTokenState = atom<string>({
  key: recoilKeys.userAuthTokenState,
  default: token,
});

export const userState = atom<User | null>({
  key: recoilKeys.userState,
  default: null,
});

export const userMenuState = atom<boolean>({
  key: recoilKeys.userMenuState,
  default: false,
});
