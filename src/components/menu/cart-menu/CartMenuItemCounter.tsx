import { FC, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Flex, Icon, Input } from "@chakra-ui/react";

interface CartMenuItemCounterProps {
  value: number;
  itemCount: number;
}

export const CartMenuItemCounter: FC<CartMenuItemCounterProps> = ({
  value,
  itemCount,
}) => {
  const [qty, setQty] = useState(value);

  const handleMinus = () => console.log("clicked minus");
  const handlePlus = () => console.log("clicked plus");

  return (
    <Flex alignItems="center">
      <Icon as={AiFillMinusCircle} onClick={handleMinus} />
      <Input
        value={value}
        onChange={(e) => setQty(+e.target.value)}
        width="40px"
      />
      <Icon as={AiFillPlusCircle} onClick={handlePlus} />
    </Flex>
  );
};
