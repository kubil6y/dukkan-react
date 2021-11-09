import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartMenuState } from "../../../recoil/atoms";
import { useIsLargeScreen } from "../../app/hooks/mediaQueries";
import { CartMenuHeader } from "./CartMenuHeader";
import { CartMenuItem } from "./CartMenuItem";

export const CartMenu: FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(cartMenuState);
  const history = useHistory();

  const btnRef = useRef();
  const isLargeScreen = useIsLargeScreen();
  const size = isLargeScreen ? "md" : "full";

  const onClose = () => setIsOpen(false);

  const goToCheckout = () => {
    // TODO
    // 1- must be signed in to go to checkout
    // 2- must be activated to make an order!
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
          <CartMenuItem initQty={3} />
        </DrawerBody>

        <DrawerFooter>
          <Button
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
