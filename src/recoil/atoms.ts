import { atom } from "recoil";
import { USER_TOKEN } from "../constants";
import { User } from "../types";

let token = "";
const localTokenValue = localStorage.getItem(USER_TOKEN);
if (localTokenValue !== null) {
  token = JSON.parse(localTokenValue);
}

export const userAuthTokenState = atom<string>({
  key: "userAuthTokenState",
  default: token,
});

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
