import { Flex, Image, Text, Box, Icon, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
import { colors } from "../../../themes/colors";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../types";
import { CartMenuItemCounter } from "./CartMenuItemCounter";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

export const CartMenuItem: FC<CartItem> = ({
  product_id = 0,
  product_name = "keyboard lasjkf asldf kjasdlfkj",
  product_image = "/products/keyboard.jpg",
  product_qty = 3,
  product_price = 31.25,
  product_slug = "bhrtlrn-dyvuav",
  product_count = 5,
  product_brand = "Sony",
}) => {
  const [qty, setQty] = useState(product_qty);
  const history = useHistory();

  const goToProductDetails = () => history.push(`/products/${product_slug}`);

  const handleMinus = () => {
    setQty((i) => i - 1);
  };
  const handlePlus = () => {
    setQty((i) => i + 1);
  };

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Image
        src={product_image}
        alt={product_name}
        cursor="pointer"
        onClick={goToProductDetails}
        w="50px"
        h="50px"
      />

      <Text
        bg="red.500"
        fontSize="14px"
        fontStyle="bold"
        cursor="pointer"
        isTruncated
        mx="4px"
        noOfLines={1}
        onClick={goToProductDetails}
      >
        {product_name}
      </Text>

      <Flex alignItems="center">
        <Icon
          as={AiFillMinusCircle}
          onClick={handleMinus}
          cursor="pointer"
          w={4}
          h={4}
        />
        <Input
          value={qty}
          onChange={(e) => setQty(+e.target.value)}
          width="50px"
          fontSize="13px"
          textAlign="center"
          mx="8px"
        />
        <Icon
          as={AiFillPlusCircle}
          onClick={handlePlus}
          cursor="pointer"
          w={4}
          h={4}
        />
      </Flex>

      <Text fontSize="18px" fontStyle="bold" color="red.400">
        ${(qty * product_price).toFixed(2)}
      </Text>

      <Icon as={FaTrashAlt} w={5} h={5} color="red.500" />
    </Flex>
  );
};
