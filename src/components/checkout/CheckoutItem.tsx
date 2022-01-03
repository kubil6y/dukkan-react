import { Td, Tr } from "@chakra-ui/react";
import { FC } from "react";
import { CartItem } from "../../types";

interface CheckoutItemProps {
  item: CartItem;
}

export const CheckoutItem: FC<CheckoutItemProps> = ({ item }) => {
  return (
    <Tr>
      <Td>{item.product.name}</Td>
      <Td>{item.product.price}</Td>
      <Td isNumeric>x{item.qty}</Td>
      <Td isNumeric>{(item.qty * item.product.price).toFixed(2)}$</Td>
    </Tr>
  );
};
