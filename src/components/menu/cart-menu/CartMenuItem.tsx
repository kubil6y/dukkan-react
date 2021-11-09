import { Flex, Image, Text, Icon, Input, Grid, Center } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../types";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useIsSmallScreen } from "../../app/hooks/mediaQueries";

export const CartMenuItem: FC<CartItem> = ({ product, initQty }) => {
  const isSmallScreen = useIsSmallScreen();
  const [qty, setQty] = useState(initQty);
  const history = useHistory();

  const goToProductDetails = () =>
    history.push(`/products/${product?.slug || ""}`);

  const handleMinus = () => {
    setQty((i) => i - 1);
  };
  const handlePlus = () => {
    setQty((i) => i + 1);
  };

  //templateColumns="80px 150px 120px 80px 50px"

  return !isSmallScreen ? (
    <Grid
      templateColumns="80px 150px 120px 80px 50px"
      alignItems="center"
      justifyContent="space-between"
      px="1rem"
    >
      <Image
        src="/products/keyboard.jpg"
        alt="keyboard lasjkf asldf kjasdlfkj"
        cursor="pointer"
        onClick={goToProductDetails}
      />

      <Text
        p="4px"
        fontSize="14px"
        fontStyle="bold"
        ml="1rem"
        cursor="pointer"
        onClick={goToProductDetails}
      >
        keyboard lasjkf asldf kjasdlfkj
      </Text>

      <Flex alignItems="center" justifyContent="center">
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
          mx="4px"
          width="55px"
          fontSize="13px"
          textAlign="center"
        />
        <Icon
          as={AiFillPlusCircle}
          onClick={handlePlus}
          cursor="pointer"
          w={4}
          h={4}
        />
      </Flex>

      <Text fontSize="16px" fontStyle="bold" color="red.400" textAlign="center">
        ${(qty * 3).toFixed(2)}
      </Text>

      <Center>
        <Icon as={FaTrashAlt} w={5} h={5} color="red.500" />
      </Center>
    </Grid>
  ) : (
    <div>
      <div>small screen</div>
    </div>
  );
};
