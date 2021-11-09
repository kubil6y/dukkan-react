import { atom } from "recoil";
import { CART_ITEMS, USER_TOKEN } from "../constants";
import { CartItem, User } from "../types";
import { recoilKeys } from "./constants";

let token = "";
const localTokenValue = localStorage.getItem(USER_TOKEN);
if (localTokenValue !== null) {
  token = JSON.parse(localTokenValue);
}

let cartItems: CartItem[] = [];
const localInitCartItems = localStorage.getItem(CART_ITEMS);
if (localInitCartItems !== null) {
  cartItems = JSON.parse(localInitCartItems);
}

// userAuthTokenState is responsible for auth token state
export const userAuthTokenState = atom<string>({
  key: recoilKeys.userAuthTokenState,
  default: token,
});

// userState is responsible for user state
export const userState = atom<User | null>({
  key: recoilKeys.userState,
  default: null,
});

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
  default: cartItems,
});
