import { atom } from "recoil";
import { getCartItemsLocalStorage } from "../local-storage";
import { CartItem } from "../types";
import { recoilKeys } from "./constants";

// userAuthTokenState is responsible for auth token state
// userMenuState is responsible for whether user menu is on/off
export const userMenuState = atom<boolean>({
  key: recoilKeys.userMenuState,
  default: false,
});

// cartMenuState is responsible for whether user menu is on/off
export const cartMenuState = atom<boolean>({
  key: recoilKeys.cartMenuState,
  default: false,
});

// cartState is responsible for items added to cart
export const cartState = atom<CartItem[]>({
  key: recoilKeys.cartState,
  default: getCartItemsLocalStorage(),
});
