import { Flex, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { colors } from "../../themes/colors";

export const CartCount: FC = () => {
  return (
    <Flex className="nav-border" alignItems="center">
      <Icon as={FiShoppingCart} w={7} h={7} color="white" marginRight="4px" />
      <Flex
        ml="4px"
        flexDir="column"
        justifyContent="center"
        fontWeight="700"
        textAlign="center"
      >
        <Text fontSize="20px" color={colors.orangePrimary}>
          0
        </Text>
        <Text fontSize="14px" color="white" mt="-4px">
          Cart
        </Text>
      </Flex>
    </Flex>
  );
};
