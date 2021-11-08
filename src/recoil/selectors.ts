import { selector } from "recoil";
import { cartState } from "./atoms";
import { recoilKeys } from "./constants";

export const cartInfoState = selector({
  key: recoilKeys.cartInfoState,
  get: ({ get }) => {
    const carts = get(cartState);
    const count = carts.length;
    return {
      count,
    };
  },
});
