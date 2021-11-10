import {
  Flex,
  Image,
  Text,
  Icon,
  Grid,
  Center,
  Divider,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../types";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useMyMediaQueries } from "../../app/hooks";
import { useCartItems } from "../../app/hooks/useCartItems";
import { FancyCurrency } from "../../misc/FancyCurrency";

interface CartMenuItemProps {
  item: CartItem;
}

export const CartMenuItem: FC<CartMenuItemProps> = ({ item }) => {
  const { updateQtyOfCartItem, deleteCartItemByUUID } = useCartItems();
  const [qty, setQty] = useState(item.qty);

  const history = useHistory();
  const { isSmallScreen } = useMyMediaQueries();

  const goToProductDetails = () => {
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

  // CartItem counter icon styles
  const isPlusIconDisabled = item.product.count <= qty;
  const isMinusIconDisabled = qty <= 1;
  const plusIconColor = isPlusIconDisabled ? "gray.300" : "gray.700";
  const minusIconColor = isMinusIconDisabled ? "gray.300" : "gray.700";
  const plusIconCursor = isPlusIconDisabled ? "cursor" : "pointer";
  const minusIconCursor = isMinusIconDisabled ? "cursor" : "pointer";

  return !isSmallScreen ? (
    <>
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
            color={minusIconColor}
            onClick={handleMinus}
            cursor={minusIconCursor}
            w={4}
            h={4}
          />
          <Text mx="4px" width="40px" fontSize="13px" textAlign="center">
            {item.qty}
          </Text>
          <Icon
            as={AiFillPlusCircle}
            color={plusIconColor}
            onClick={handlePlus}
            cursor={plusIconCursor}
            w={4}
            h={4}
          />
        </Flex>

        {/* price */}
        <FancyCurrency
          color="red.400"
          fs={11}
          value={item.product.price * qty}
        />

        <Center cursor="pointer" onClick={handleDeleteItem}>
          <Icon as={FaTrashAlt} w={5} h={5} color="red.500" />
        </Center>
      </Grid>
      <Divider my="12px" />
    </>
  ) : (
    <>
      <Grid templateColumns="80% 20%" alignItems="center">
        <Flex width="100%" flexDirection="column" justifyContent="center">
          <Flex alignItems="center" justifyContent="space-between">
            <Image
              maxH="50px"
              src="/products/keyboard.jpg"
              alt={item.product.name}
              cursor="pointer"
              onClick={goToProductDetails}
            />

            {/* quantity counter */}
            <Flex alignItems="center" justifyContent="center">
              <Icon
                color={minusIconColor}
                as={AiFillMinusCircle}
                onClick={handleMinus}
                cursor={minusIconCursor}
                w={4}
                h={4}
              />
              <Text mx="4px" width="40px" fontSize="13px" textAlign="center">
                {item.qty}
              </Text>
              <Icon
                color={plusIconColor}
                as={AiFillPlusCircle}
                onClick={handlePlus}
                cursor={plusIconCursor}
                w={4}
                h={4}
              />
            </Flex>
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            {/* product name */}
            <Text
              p="4px"
              fontSize="14px"
              fontStyle="bold"
              ml="1rem"
              isTruncated
            >
              {item.product.name}
            </Text>

            {/* price */}
            <FancyCurrency
              color="red.400"
              fs={11}
              value={item.product.price * qty}
            />
          </Flex>
        </Flex>

        <Center cursor="pointer" onClick={handleDeleteItem}>
          <Icon as={FaTrashAlt} w={5} h={5} color="red.500" />
        </Center>
      </Grid>
      <Divider my="8px" />
    </>
  );
};
