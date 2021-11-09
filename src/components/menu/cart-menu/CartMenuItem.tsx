import { Flex, Image, Text, Icon, Grid, Center } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../types";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useIsSmallScreen } from "../../app/hooks/mediaQueries";
import { useCartItems } from "../../app/hooks/useCartItems";
import { FancyCurrency } from "../../misc/FancyCurrency";
import { useSetRecoilState } from "recoil";
import { cartMenuState } from "../../../recoil/atoms";

interface CartMenuItemProps {
  item: CartItem;
}

export const CartMenuItem: FC<CartMenuItemProps> = ({ item }) => {
  const { updateQtyOfCartItem, deleteCartItemByUUID } = useCartItems();
  const [qty, setQty] = useState(item.qty);
  const setIsCartOpen = useSetRecoilState(cartMenuState);

  const history = useHistory();
  const isSmallScreen = useIsSmallScreen();

  const goToProductDetails = () => {
    setIsCartOpen(false);
    history.push(`/products/${item.product.slug}`);
  };

  const handleMinus = () => {
    if (qty <= 1) {
      return;
    }
    updateQtyOfCartItem(item.uuid, qty - 1);
    setQty((c) => c - 1);
  };
  const handlePlus = () => {
    if (item.product.count <= qty) {
      return;
    }
    updateQtyOfCartItem(item.uuid, qty + 1);
    setQty((c) => c + 1);
  };

  const handleDeleteItem = () => deleteCartItemByUUID(item.uuid);

  return !isSmallScreen ? (
    <Grid
      templateColumns="80px 150px 120px 80px 50px"
      alignItems="center"
      justifyContent="space-between"
      px="1rem"
    >
      {/* product image */}
      <Image
        src="/products/keyboard.jpg"
        alt={item.product.name}
        cursor="pointer"
        onClick={goToProductDetails}
      />

      {/* product name */}
      <Text p="4px" fontSize="14px" fontStyle="bold" ml="1rem" isTruncated>
        {item.product.name}
      </Text>

      {/* quantity counter */}
      <Flex alignItems="center" justifyContent="center">
        <Icon
          as={AiFillMinusCircle}
          onClick={handleMinus}
          cursor="pointer"
          w={4}
          h={4}
        />
        <Text mx="4px" width="40px" fontSize="13px" textAlign="center">
          {item.qty}
        </Text>
        <Icon
          as={AiFillPlusCircle}
          onClick={handlePlus}
          cursor="pointer"
          w={4}
          h={4}
        />
      </Flex>

      {/* price */}
      <FancyCurrency color="red.400" fs={11} value={item.product.price * qty} />

      <Center cursor="pointer" onClick={handleDeleteItem}>
        <Icon as={FaTrashAlt} w={5} h={5} color="red.500" />
      </Center>
    </Grid>
  ) : (
    <div>
      <div>small screen</div>
    </div>
  );
};
