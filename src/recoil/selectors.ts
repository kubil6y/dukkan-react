import { selector } from "recoil";
import { userState } from "./atoms";
import { recoilKeys } from "./constants";

export const userStateInfo = selector({
  key: recoilKeys.userStateInfo,
  get: ({ get }) => {
    const user = get(userState);
    const isLoggedIn = user !== null;
    const isActivated = user !== null ? user.is_activated : false;

    return {
      isLoggedIn,
      isActivated,
    };
  },
});
