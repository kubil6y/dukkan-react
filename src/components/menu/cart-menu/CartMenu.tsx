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

  const handleCheckout = () => {
    console.log("clicked checkout");
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

        <DrawerBody>
          <CartMenuItem />
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="facebook"
            width="100%"
            onClick={() => handleCheckout}
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
