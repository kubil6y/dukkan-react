import { selector } from "recoil";
import { USER_TOKEN } from "../constants";
import { userState } from "./atoms";
import { recoilKeys } from "./constants";

export const userInfo = selector({
  key: recoilKeys.userInfo,
  get: ({ get }) => {
    const user = get(userState);
    const isLoggedIn = Boolean(localStorage.getItem(USER_TOKEN));
    const isActivated = user !== null ? user.is_activated : false;

    return {
      isLoggedIn,
      isActivated,
    };
  },
});
