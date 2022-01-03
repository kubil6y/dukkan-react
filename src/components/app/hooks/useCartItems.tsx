import { useEffect } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { LOCAL_CART_ITEMS } from "../../../local-storage";
import { cartState } from "../../../recoil/atoms";
import { CartItem, CreateOrderDTO } from "../../../types";
import { useCustomToast } from "./useCustomToast";

interface UseCartItems {
  cartItems: CartItem[];
  setCartItems: SetterOrUpdater<CartItem[]>;
  doesProductExistsOnCart(productID: number): boolean;
  addCartItem(item: CartItem): void;
  deleteCartItemByUUID(uuid: string): void;
  updateQtyOfCartItem(uuid: string, qty: number): void;
  clearCartItems(): void;
  calculateTotal(): number;
  getCreateOrderData(): CreateOrderDTO;
}

export function useCartItems(): UseCartItems {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const toast = useCustomToast();

  useEffect(() => {
    localStorage.setItem(LOCAL_CART_ITEMS, JSON.stringify(cartItems));
  }, [cartItems]);

  function doesProductExistsOnCart(productID: number): boolean {
    for (let i = 0; i < cartItems.length; i++) {
      if (productID === cartItems[i].product.id) {
        return true;
      }
    }
    return false;
  }

  function addCartItem(item: CartItem): void {
    if (item.qty <= 0) return;
    if (doesProductExistsOnCart(item.product.id)) {
      toast({
        title: "Product already exists on your cart",
        status: "warning",
        position: "top-left",
      });
      return;
    }
    setCartItems((prevState) => [...prevState, item]);
  }

  function updateQtyOfCartItem(uuid: string, qty: number): void {
    // validate qty of product
    const item = cartItems.find((item) => item.uuid === uuid);
    if (!item) {
      toast({
        title: "Item could not be found",
        status: "error",
      });
      return;
    }

    const newState = cartItems.map((item) =>
      item.uuid === uuid ? { ...item, qty: qty } : item
    );
    setCartItems(newState);
  }

  function deleteCartItemByUUID(uuid: string): void {
    const newState = cartItems.filter((item) => item.uuid !== uuid);
    setCartItems(newState);
  }

  function clearCartItems(): void {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is already empty!",
        status: "warning",
        position: "top-left",
      });
      return;
    }
    toast({
      title: "Your cart has been cleared",
      status: "info",
      position: "top-left",
    });
    setCartItems([]);
  }

  function calculateTotal(): number {
    if (cartItems.length === 0) return 0;
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].qty * cartItems[i].product.price;
    }
    return total;
  }

  function getCreateOrderData(): CreateOrderDTO {
    const orderItems =
      cartItems.length > 0
        ? cartItems.map((item) => ({
            quantity: item.qty,
            product_id: item.product.id,
          }))
        : [];
    return {
      payment_method: "cash",
      order_items: orderItems,
    };
  }

  return {
    cartItems,
    setCartItems,
    doesProductExistsOnCart,
    addCartItem,
    deleteCartItemByUUID,
    updateQtyOfCartItem,
    clearCartItems,
    calculateTotal,
    getCreateOrderData,
  };
}
