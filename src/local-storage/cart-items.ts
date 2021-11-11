import { CartItem } from "../types";
import { LOCAL_CART_ITEMS } from "./constants";

export const getCartItemsLocalStorage = (): CartItem[] => {
  const localCartItems = localStorage.getItem(LOCAL_CART_ITEMS);
  return localCartItems ? JSON.parse(localCartItems) : [];
};

export const setCartItemsLocalStorage = (cartItems: CartItem[]): void => {
  localStorage.setItem(LOCAL_CART_ITEMS, JSON.stringify(cartItems));
};

export const clearCartItemsLocalStorage = (): void => {
  localStorage.removeItem(LOCAL_CART_ITEMS);
};
