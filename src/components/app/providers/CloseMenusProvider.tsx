import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartMenuState, userMenuState } from "../../../recoil/atoms";

// CloseMenusProvider, listens for page changes and when changed, closes user/cart menus
export const CloseMenusProvider = () => {
  const [cartMenuIsOpen, setCartMenuIsOpen] = useRecoilState(cartMenuState);
  const [userMenuIsOpen, setUserMenuIsOpen] = useRecoilState(userMenuState);
  const { pathname } = useLocation();

  const closeMenus = useCallback(() => {
    if (cartMenuIsOpen) setCartMenuIsOpen(false);
    if (userMenuIsOpen) setUserMenuIsOpen(false);
    // TODO dont know if this is gonna be an issue lel
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    closeMenus();
  }, [pathname, closeMenus]);

  return null;
};
