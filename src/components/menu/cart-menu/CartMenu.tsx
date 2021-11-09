import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartMenuState } from "../../../recoil/atoms";
import { useIsLargeScreen } from "../../app/hooks/mediaQueries";
import { useCartItems } from "../../app/hooks/useCartItems";
import { CartMenuHeader } from "./CartMenuHeader";
import { CartMenuItem } from "./CartMenuItem";

export const CartMenu: FC = () => {
  const { cartItems } = useCartItems();
  const [isOpen, setIsOpen] = useRecoilState(cartMenuState);
  const history = useHistory();

  const btnRef = useRef();
  const isLargeScreen = useIsLargeScreen();
  const size = isLargeScreen ? "md" : "full";

  const onClose = () => setIsOpen(false);

  const goToCheckout = () => {
    // TODO
    console.log("clicked");
    history.push("/checkout");
  };

  return (
    <Drawer
      size={size}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef.current}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color="white" />
        <CartMenuHeader />

        <DrawerBody px="4px">
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <CartMenuItem item={item} key={item.uuid} />
            ))}
        </DrawerBody>

        <DrawerFooter>
          <Button
            mt="10px"
            colorScheme="facebook"
            width="100%"
            onClick={goToCheckout}
            letterSpacing="wider"
            textTransform="uppercase"
          >
            checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
