import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartMenuState } from "../../../recoil/atoms";
import { useMyMediaQueries } from "../../app/hooks";
import { useCartItems } from "../../app/hooks/useCartItems";
import { FancyCurrency } from "../../misc/FancyCurrency";
import { CartMenuHeader } from "./CartMenuHeader";
import { CartMenuItem } from "./CartMenuItem";

export const CartMenu: FC = () => {
  const { cartItems, calculateTotal } = useCartItems();
  const [isOpen, setIsOpen] = useRecoilState(cartMenuState);
  const history = useHistory();

  const btnRef = useRef();
  const { isLargeScreen } = useMyMediaQueries();
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

        <DrawerFooter flexDir="column">
          {cartItems.length > 0 && (
            <Flex alignItems="center" ml="auto" mr="12px">
              <Text fontSize="18px" fontWeight="bold" mr="1rem">
                Total:
              </Text>
              <FancyCurrency
                fs={14}
                color="gray.800"
                value={calculateTotal()}
              />
            </Flex>
          )}

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
